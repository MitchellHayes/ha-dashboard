import { useEffect, useState } from 'react';

function getHassAuth(): { hassUrl: string; token: string } | null {
  try {
    const raw = localStorage.getItem('hassTokens');
    if (!raw) return null;
    const parsed = JSON.parse(raw) as { hassUrl?: string; access_token?: string };
    if (!parsed.hassUrl || !parsed.access_token) return null;
    return { hassUrl: parsed.hassUrl.replace(/\/$/, ''), token: parsed.access_token };
  } catch {
    return null;
  }
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
