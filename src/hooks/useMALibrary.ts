import { useState, useCallback } from 'react';
import { useHass } from '@hakit/core';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyCall = (args: Record<string, unknown>) => Promise<any>;

export interface MAItem {
  item_id: string;
  name: string;
  image: string | null;
  uri: string; // media_content_id — pass directly to play_media
  media_type: string; // media_content_type
  subtitle: string;
}

function itemFromBrowse(raw: Record<string, unknown>): MAItem {
  const mediaClass = String(raw.media_class ?? '');
  const subtitle = mediaClass ? mediaClass.charAt(0).toUpperCase() + mediaClass.slice(1) : '';
  return {
    item_id: String(raw.media_content_id ?? raw.uri ?? Math.random()),
    name: String(raw.title ?? raw.name ?? ''),
    image: typeof raw.thumbnail === 'string' && raw.thumbnail ? raw.thumbnail : null,
    uri: String(raw.media_content_id ?? raw.uri ?? ''),
    media_type: String(raw.media_content_type ?? raw.media_type ?? ''),
    subtitle,
  };
}

function extractChildren(resp: unknown, entityId: string): MAItem[] {
  if (!resp || typeof resp !== 'object') return [];
  const r = resp as Record<string, unknown>;

  // HAKit wraps service responses as resp.response[entityId]
  const wrapped = (r.response as Record<string, unknown> | undefined)?.[entityId] as Record<string, unknown> | undefined;
  const node = wrapped ?? r;
  const children = node.children;

  if (!Array.isArray(children)) return [];
  return (children as Record<string, unknown>[]).filter(c => c.can_play || c.can_expand).map(itemFromBrowse);
}

export function useMALibrary(entityId: string) {
  const callService = useHass(s => s.helpers.callService) as unknown as AnyCall;
  const [playlists, setPlaylists] = useState<MAItem[]>([]);
  const [recentlyPlayed, setRecentlyPlayed] = useState<MAItem[]>([]);
  const [searchResults, setSearchResults] = useState<MAItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const browseMedia = useCallback(
    (contentId?: string, contentType?: string) => {
      const serviceData: Record<string, unknown> = {};
      if (contentId !== undefined) serviceData.media_content_id = contentId;
      if (contentType !== undefined) serviceData.media_content_type = contentType;
      return callService({
        domain: 'media_player',
        service: 'browse_media',
        target: { entity_id: entityId },
        serviceData,
        returnResponse: true,
      });
    },
    [callService, entityId]
  );

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const root = await browseMedia();
      const rootSections = extractChildren(root, entityId);

      // Navigate into the Spotify provider section if present
      const spotifySection = rootSections.find(s => s.name.toLowerCase().includes('spotify') || s.uri.toLowerCase().includes('spotify'));
      const sections = spotifySection
        ? extractChildren(await browseMedia(spotifySection.uri, spotifySection.media_type), entityId)
        : rootSections;

      const recentSection = sections.find(s => s.name.toLowerCase().includes('recent') || s.uri.toLowerCase().includes('recent'));
      const playlistSection = sections.find(s => s.name.toLowerCase().includes('playlist') || s.uri.toLowerCase().includes('playlist'));

      const [recentResp, playlistResp] = await Promise.all([
        recentSection ? browseMedia(recentSection.uri, recentSection.media_type) : null,
        playlistSection ? browseMedia(playlistSection.uri, playlistSection.media_type) : null,
      ]);

      const isSpotify = (i: MAItem) => i.uri.toLowerCase().includes('spotify');
      setRecentlyPlayed(recentResp ? extractChildren(recentResp, entityId).filter(isSpotify) : []);
      setPlaylists(playlistResp ? extractChildren(playlistResp, entityId).filter(isSpotify) : []);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }, [browseMedia, entityId]);

  const search = useCallback(
    async (query: string) => {
      if (!query.trim()) {
        setSearchResults([]);
        return;
      }
      try {
        // Spotify-scoped search via MA's spotify:// URI scheme
        const resp = await browseMedia(`spotify://search/${encodeURIComponent(query)}`, 'search');
        const results = extractChildren(resp, entityId);
        if (results.length > 0) {
          setSearchResults(results);
          return;
        }
      } catch {
        // fall through to generic search
      }
      try {
        const resp = await browseMedia(`search://${encodeURIComponent(query)}`, 'search');
        setSearchResults(extractChildren(resp, entityId).filter(i => i.uri.toLowerCase().includes('spotify')));
      } catch {
        setSearchResults([]);
      }
    },
    [browseMedia, entityId]
  );

  return { playlists, recentlyPlayed, searchResults, loading, error, load, search };
}
