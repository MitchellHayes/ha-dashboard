import { useMemo } from 'react';
import { useHass } from '@hakit/core';

export function useHassPhoto(entityPicturePath: string | null | undefined): string {
  const hassUrl = useHass(s => s.hassUrl);
  const auth = useHass(s => s.auth);

  return useMemo(() => {
    if (!entityPicturePath) return '';
    if (/^https?:\/\//.test(entityPicturePath)) return entityPicturePath;
    if (!hassUrl || !auth) return '';
    const base = hassUrl.replace(/\/$/, '');
    return `${base}${entityPicturePath}?access_token=${auth.data.access_token}`;
  }, [entityPicturePath, hassUrl, auth]);
}
