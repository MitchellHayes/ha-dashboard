import { useEffect, useState } from 'react';

function getHassAuth(): { hassUrl: string; token: string } | null {
  const hassUrl = import.meta.env.VITE_HA_URL as string | undefined;
  const token = import.meta.env.VITE_HA_TOKEN as string | undefined;
  if (!hassUrl || !token) return null;
  return { hassUrl: hassUrl.replace(/\/$/, ''), token };
}

export function useHassPhoto(entityPicturePath: string | null | undefined): string {
  const [objectUrl, setObjectUrl] = useState('');

  useEffect(() => {
    if (!entityPicturePath) return;

    // Absolute URL (e.g. external CDN) — use directly, no auth needed
    if (/^https?:\/\//.test(entityPicturePath)) {
      setObjectUrl(entityPicturePath);
      return;
    }

    const auth = getHassAuth();
    if (!auth) return;

    let cancelled = false;
    let blobUrl = '';

    void (async () => {
      try {
        const res = await fetch(`${auth.hassUrl}${entityPicturePath}`, {
          headers: { Authorization: `Bearer ${auth.token}` },
        });
        if (!res.ok || cancelled) return;
        const blob = await res.blob();
        if (cancelled) return;
        blobUrl = URL.createObjectURL(blob);
        setObjectUrl(blobUrl);
      } catch {
        // leave empty — caller shows fallback
      }
    })();

    return () => {
      cancelled = true;
      if (blobUrl) URL.revokeObjectURL(blobUrl);
    };
  }, [entityPicturePath]);

  return objectUrl;
}
