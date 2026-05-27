import { useState, useEffect, useRef } from 'react';
import { useEntity } from '@hakit/core';
import { X, Search, Music2 } from 'lucide-react';
import { useMALibrary, type MAItem, toPlayUri } from '../hooks/useMALibrary';

interface BrowsePanelProps {
  open: boolean;
  onClose: () => void;
  entityId: string;
  deviceName: string;
}

function ItemArt({ image, size = 80 }: { image: string | null; size?: number }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        flexShrink: 0,
        background: image ? undefined : 'var(--card-2)',
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--text-4)',
        overflow: 'hidden',
      }}
    >
      {!image && <Music2 size={size * 0.34} strokeWidth={1.2} />}
    </div>
  );
}

function TypePill({ type }: { type: string }) {
  const colors: Record<string, string> = {
    track: 'var(--info)',
    album: 'var(--ok)',
    playlist: 'var(--accent)',
    artist: 'var(--warm)',
  };
  const c = colors[type] ?? 'var(--text-3)';
  return (
    <span
      style={{
        fontSize: 9,
        fontWeight: 700,
        textTransform: 'uppercase',
        letterSpacing: '0.07em',
        color: c,
        background: `color-mix(in srgb, ${c} 18%, transparent)`,
        padding: '2px 7px',
        borderRadius: 4,
        flexShrink: 0,
      }}
    >
      {type}
    </span>
  );
}

function PlayTile({ item, onPlay }: { item: MAItem; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        textAlign: 'left',
        padding: 0,
        color: 'var(--text)',
        flexShrink: 0,
        width: 92,
      }}
    >
      <ItemArt image={item.image} size={92} />
      <div style={{ minWidth: 0, width: '100%' }}>
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            lineHeight: 1.25,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.name}
        </div>
        {item.subtitle && (
          <div
            style={{
              fontSize: 10,
              color: 'var(--text-3)',
              marginTop: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.subtitle}
          </div>
        )}
      </div>
    </button>
  );
}

function SearchRow({ item, onPlay }: { item: MAItem; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '10px 0',
        borderBottom: '1px solid var(--border)',
        background: 'none',
        cursor: 'pointer',
        color: 'var(--text)',
        width: '100%',
        textAlign: 'left',
      }}
    >
      <ItemArt image={item.image} size={46} />
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontSize: 14,
            fontWeight: 500,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {item.name}
        </div>
        {item.subtitle && (
          <div
            style={{
              fontSize: 12,
              color: 'var(--text-3)',
              marginTop: 2,
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {item.subtitle}
          </div>
        )}
      </div>
      <TypePill type={item.media_type} />
    </button>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyService = (args: Record<string, unknown>) => void;

export function BrowsePanel({ open, onClose, entityId, deviceName }: BrowsePanelProps) {
  const [query, setQuery] = useState('');
  const { playlists, recentlyPlayed, searchResults, loading, error, load, search } = useMALibrary();
  const inputRef = useRef<HTMLInputElement>(null);
  const player = useEntity(entityId as `media_player.${string}`);

  useEffect(() => {
    if (open) {
      void load();
      setQuery('');
      setTimeout(() => inputRef.current?.focus(), 250);
    }
  }, [open, load]);

  useEffect(() => {
    const t = setTimeout(() => void search(query), 350);
    return () => clearTimeout(t);
  }, [query, search]);

  if (!open) return null;

  const isSearching = query.trim().length > 0;

  function playItem(item: MAItem) {
    (player?.service.playMedia as unknown as AnyService)({
      serviceData: {
        media_content_id: toPlayUri(item.uri),
        media_content_type: item.media_type,
      },
    });
    onClose();
  }

  return (
    <div
      onClick={onClose}
      style={{
        position: 'absolute',
        inset: 0,
        zIndex: 100,
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        display: 'flex',
        alignItems: 'flex-end',
        animation: 'fadeIn 180ms ease',
      }}
    >
      <style>{`
        @keyframes slideUp { from { transform: translateY(48px); opacity: 0 } to { transform: translateY(0); opacity: 1 } }
      `}</style>
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: '100%',
          height: '74%',
          background: 'var(--bg)',
          borderTop: '1px solid var(--border-2)',
          borderRadius: '24px 24px 0 0',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          animation: 'slideUp 240ms cubic-bezier(0.22,1,0.36,1)',
          boxShadow: '0 -24px 64px rgba(0,0,0,0.45)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '20px 28px 0',
            flexShrink: 0,
          }}
        >
          <div>
            <div className='label' style={{ marginBottom: 4 }}>
              Now playing on {deviceName}
            </div>
            <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '-0.02em' }}>Browse</div>
          </div>
          <button className='ibtn' onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        {/* Search bar */}
        <div style={{ padding: '14px 28px 0', flexShrink: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              background: 'var(--card)',
              border: '1px solid var(--border)',
              borderRadius: 14,
              padding: '11px 16px',
            }}
          >
            <Search size={16} color='var(--text-3)' strokeWidth={1.5} style={{ flexShrink: 0 }} />
            <input
              ref={inputRef}
              type='text'
              placeholder='Search artists, songs, playlists…'
              value={query}
              onChange={e => setQuery(e.target.value)}
              style={{
                flex: 1,
                background: 'none',
                border: 'none',
                outline: 'none',
                fontSize: 15,
                color: 'var(--text)',
                fontFamily: 'var(--font)',
              }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                style={{ color: 'var(--text-3)', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Scrollable body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px 28px 28px' }}>
          {/* Loading / error states */}
          {loading && !isSearching && (
            <div style={{ color: 'var(--text-3)', fontSize: 14, textAlign: 'center', marginTop: 48 }}>Loading…</div>
          )}
          {error && (
            <div style={{ color: 'var(--alert)', fontSize: 13, padding: '12px 0' }}>
              Couldn't reach Music Assistant ({error}). Check that the MA integration is running.
            </div>
          )}

          {/* Default: Recently Played + Playlists */}
          {!loading && !error && !isSearching && (
            <>
              {recentlyPlayed.length > 0 && (
                <section style={{ marginBottom: 32 }}>
                  <div className='label' style={{ marginBottom: 14 }}>
                    Recently played
                  </div>
                  <div style={{ display: 'flex', gap: 14, overflowX: 'auto', paddingBottom: 6 }}>
                    {recentlyPlayed.slice(0, 24).map(item => (
                      <PlayTile key={item.item_id} item={item} onPlay={() => playItem(item)} />
                    ))}
                  </div>
                </section>
              )}

              {playlists.length > 0 && (
                <section>
                  <div className='label' style={{ marginBottom: 14 }}>
                    Your playlists
                  </div>
                  <div
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fill, minmax(96px, 1fr))',
                      gap: 14,
                    }}
                  >
                    {playlists.map(item => (
                      <PlayTile key={item.item_id} item={item} onPlay={() => playItem(item)} />
                    ))}
                  </div>
                </section>
              )}

              {!loading && !error && recentlyPlayed.length === 0 && playlists.length === 0 && (
                <div style={{ color: 'var(--text-3)', fontSize: 14, textAlign: 'center', marginTop: 48 }}>
                  No library content found. Make sure Spotify is linked in Music Assistant.
                </div>
              )}
            </>
          )}

          {/* Search results */}
          {isSearching && (
            <div>
              {searchResults.length === 0 && query.length > 1 && (
                <div style={{ color: 'var(--text-3)', fontSize: 14, textAlign: 'center', marginTop: 48 }}>No results for "{query}"</div>
              )}
              {searchResults.map((item, i) => (
                <SearchRow key={`${item.item_id}-${i}`} item={item} onPlay={() => playItem(item)} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
