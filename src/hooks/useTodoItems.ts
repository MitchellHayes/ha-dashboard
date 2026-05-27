import { useState, useEffect, useCallback } from 'react';
import { useHass } from '@hakit/core';

export interface TodoItem {
  uid: string;
  summary: string;
  status: 'needs_action' | 'completed';
}

// callService is typed over HAKit's known domains; todo is not in that set,
// so we cast to a loose type for these two calls only.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCall = (args: Record<string, unknown>) => Promise<any>;

export function useTodoItems(entityId: string) {
  const callService = useHass(s => s.helpers.callService) as unknown as AnyCall;
  // Watch the entity state (item count) so any external change triggers a refetch.
  const entityState = useHass(s => (s.entities as Record<string, { state: string }>)[entityId]?.state);
  const [items, setItems] = useState<TodoItem[]>([]);

  const fetchItems = useCallback(async () => {
    try {
      const resp = await callService({
        domain: 'todo',
        service: 'get_items',
        target: { entity_id: entityId },
        serviceData: { status: 'needs_action' },
        returnResponse: true,
      });
      const raw: TodoItem[] = resp?.response?.[entityId]?.items ?? [];
      setItems(raw);
    } catch {
      // silently ignore
    }
  }, [callService, entityId]);

  // Refetch whenever HA pushes a state change for this todo entity.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => {
    void fetchItems();
  }, [entityState, fetchItems]);

  // Fallback poll in case a change doesn't alter the item count (e.g. rename).
  useEffect(() => {
    const id = setInterval(fetchItems, 30_000);
    return () => clearInterval(id);
  }, [fetchItems]);

  const completeItem = useCallback(
    (uid: string) => {
      void callService({
        domain: 'todo',
        service: 'update_item',
        target: { entity_id: entityId },
        serviceData: { item: uid, status: 'completed' },
      });
      setItems(prev => prev.map(i => (i.uid === uid ? { ...i, status: 'completed' as const } : i)));
    },
    [callService, entityId]
  );

  return { items, refetch: fetchItems, completeItem };
}
