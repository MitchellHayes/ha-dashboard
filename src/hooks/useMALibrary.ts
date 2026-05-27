import { useState, useCallback } from 'react';

const HA_URL = (import.meta.env.VITE_HA_URL as string).replace(/\/$/, '');
const HA_TOKEN = import.meta.env.VITE_HA_TOKEN as string;

async function maGet(path: string): Promise<unknown> {
  const r = await fetch(`${HA_URL}/api/mass${path}`, {
    headers: { Authorization: `Bearer ${HA_TOKEN}` },
  });
  if (!r.ok) throw new Error(`${r.status}`);
  return r.json();
}

function resolveUrl(s: string): string {
  // MA sometimes returns a path-only URL like /api/mass/... — prepend HA origin
  if (s.startsWith('/')) return `${HA_URL}${s}`;
  return s;
}

function parseImage(raw: unknown): string | null {
  if (!raw || typeof raw !== 'object') return null;
  const r = raw as Record<string, unknown>;
  // Direct string
  if (typeof r.image === 'string' && r.image) return resolveUrl(r.image);
  // Object: { path, url, thumb, ... }
  if (r.image && typeof r.image === 'object') {
    const img = r.image as Record<string, unknown>;
    for (const key of ['path', 'url', 'thumb', 'large', 'small']) {
      if (typeof img[key] === 'string' && img[key]) return resolveUrl(img[key] as string);
    }
  }
  // metadata.images array (Spotify SDK shape)
  const meta = r.metadata as Record<string, unknown> | undefined;
  if (meta && Array.isArray(meta.images) && meta.images.length > 0) {
    const first = meta.images[0] as Record<string, unknown>;
    const u = first.url ?? first.path;
    if (typeof u === 'string' && u) return resolveUrl(u);
  }
  return null;
}

export interface MAItem {
  item_id: string;
  name: string;
  image: string | null;
  uri: string;
  media_type: string;
  subtitle: string;
}

function toItem(raw: unknown): MAItem {
  const r = (raw ?? {}) as Record<string, unknown>;
  const mediaType = String(r.media_type ?? '');

  let subtitle = '';
  if (mediaType === 'track' || mediaType === 'album') {
    const artists = Array.isArray(r.artists)
      ? r.artists.map((a: unknown) => String((a as Record<string, unknown>).name ?? '')).join(', ')
      : '';
    subtitle = artists;
  } else if (mediaType === 'playlist') {
    subtitle = r.owner ? String(r.owner) : 'Playlist';
  } else if (mediaType === 'artist') {
    subtitle = 'Artist';
  }

  return {
    item_id: String(r.item_id ?? ''),
    name: String(r.name ?? ''),
    image: parseImage(r),
    uri: String(r.uri ?? ''),
    media_type: mediaType,
    subtitle,
  };
}

function toItems(raw: unknown): MAItem[] {
  if (Array.isArray(raw)) return raw.map(toItem);
  if (raw && typeof raw === 'object') {
    const r = raw as Record<string, unknown>;
    if (Array.isArray(r.items)) return r.items.map(toItem);
  }
  return [];
}

// MA uses "spotify//..." internally; HA play_media expects "spotify://..."
export function toPlayUri(uri: string): string {
  return uri.replace(/^([a-z_]+)\/\//, '$1://');
}

// Fetch artwork for a single Spotify playlist by ID (for pinned tiles).
// Tries two MA endpoint shapes since the path changed between MA versions.
export async function fetchPlaylistImage(spotifyId: string): Promise<string | null> {
  const attempts = [`/music/playlists/spotify/${spotifyId}`, `/music/playlists/${encodeURIComponent(`spotify//playlist/${spotifyId}`)}`];
  for (const path of attempts) {
    try {
      const raw = await maGet(path);
      const img = parseImage(raw);
      if (img) return img;
    } catch {
      // try next
    }
  }
  return null;
}

export function useMALibrary() {
  const [playlists, setPlaylists] = useState<MAItem[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<MAItem[]>([]);
  const [searchResults, setSearchResults] = useState<MAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [pl, rp] = await Promise.all([maGet('/music/playlists'), maGet('/music/recently_played')]);
      setPlaylists(toItems(pl));
      setRecentlyPlayed(toItems(rp));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed');
    } finally {
      setLoading(false);
    }
  }, []);

  const search = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    try {
      const resp = await maGet(`/music/search?query=${encodeURIComponent(query)}&limit=25`);
      if (Array.isArray(resp)) {
        setSearchResults(resp.map(toItem));
      } else if (resp && typeof resp === 'object') {
        const r = resp as Record<string, unknown>;
        const merged: MAItem[] = [];
        for (const key of ['tracks', 'playlists', 'albums', 'artists']) {
          if (Array.isArray(r[key])) merged.push(...(r[key] as unknown[]).map(toItem));
        }
        setSearchResults(merged);
      }
    } catch {
      setSearchResults([]);
    }
  }, []);

  return { playlists, recentlyPlayed, searchResults, loading, error, load, search };
}
