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

    let cancelled = false;
    let blobUrl = '';

    void (async () => {
      try {
        let url: string;
        if (/^https?:\/\//.test(entityPicturePath)) {
          // Absolute URL — use directly, no auth needed.
          // await defers setState out of the synchronous effect body.
          await Promise.resolve();
          url = entityPicturePath;
        } else {
          const auth = getHassAuth();
          if (!auth) return;
          const res = await fetch(`${auth.hassUrl}${entityPicturePath}`, {
            headers: { Authorization: `Bearer ${auth.token}` },
          });
          if (!res.ok || cancelled) return;
          const blob = await res.blob();
          if (cancelled) return;
          blobUrl = URL.createObjectURL(blob);
          url = blobUrl;
        }
        if (!cancelled) setObjectUrl(url);
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
