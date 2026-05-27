import { useState, useEffect } from 'react';
import { useEntity } from '@hakit/core';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2, Music, Heart, ChevronRight, Speaker } from 'lucide-react';
import { fetchPlaylistImage } from '../hooks/useMALibrary';

type Device = {
  id: 'kitchen' | 'deck' | 'all';
  name: string;
  entity: `media_player.${string}`;
  group?: boolean;
};

const DEVICES: Device[] = [
  { id: 'kitchen', name: 'Kitchen', entity: 'media_player.kitchen_speaker_2' },
  { id: 'deck', name: 'Deck', entity: 'media_player.deck' },
  { id: 'all', name: 'All', entity: 'media_player.all_2', group: true },
];

type Pinned = {
  id: string;
  name: string;
  subtitle: string;
  uri: `spotify://playlist/${string}`;
  gradient: string;
};

const PINNED: Pinned[] = [
  {
    id: 'p1',
    name: 'Daily Mix 1',
    subtitle: 'Made for you',
    uri: 'spotify://playlist/37i9dQZEVXcGzFtjSOqLXX',
    gradient: 'linear-gradient(135deg, #ff6f3c 0%, #b6371f 100%)',
  },
  {
    id: 'p2',
    name: 'On Repeat',
    subtitle: 'Your top tracks',
    uri: 'spotify://playlist/37i9dQZF1EJtU4ZS77QWrj',
    gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
  },
  {
    id: 'p3',
    name: 'Discover Weekly',
    subtitle: 'Fresh picks',
    uri: 'spotify://playlist/37i9dQZF1EpujlP7LCginZ',
    gradient: 'linear-gradient(135deg, #1a936f 0%, #114b5f 100%)',
  },
];

function DeviceChip({ device, active, onClick }: { device: Device; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      title={device.entity}
      style={{
        padding: '5px 11px',
        fontSize: 12,
        fontWeight: active ? 600 : 500,
        background: active ? 'var(--accent-dim)' : 'var(--card-2)',
        border: `1px solid ${active ? 'rgba(245,166,35,0.45)' : 'var(--border)'}`,
        color: active ? 'var(--accent-2)' : 'var(--text-2)',
        borderRadius: 999,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 5,
        cursor: 'pointer',
        transition: 'background 120ms, border-color 120ms, color 120ms',
      }}
    >
      {device.group && <Speaker size={12} strokeWidth={1.6} />}
      {device.name}
    </button>
  );
}

function PinnedTile({ pinned, image, onPlay }: { pinned: Pinned; image?: string; onPlay: () => void }) {
  return (
    <button
      onClick={onPlay}
      title={pinned.uri}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 6,
        padding: 8,
        borderRadius: 10,
        background: 'var(--card-2)',
        border: '1px solid var(--border)',
        color: 'var(--text)',
        cursor: 'pointer',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          width: '100%',
          aspectRatio: '1 / 1',
          borderRadius: 6,
          background: image ? undefined : pinned.gradient,
          backgroundImage: image ? `url(${image})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'flex-end',
          padding: 6,
        }}
      >
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            background: 'rgba(0,0,0,0.45)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#fff',
          }}
        >
          <Play size={10} strokeWidth={2} />
        </span>
      </div>
      <div style={{ minWidth: 0, width: '100%' }}>
        <div
          style={{
            fontSize: 11,
            fontWeight: 600,
            lineHeight: 1.2,
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
        >
          {pinned.name}
        </div>
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
          {pinned.subtitle}
        </div>
      </div>
    </button>
  );
}

interface MediaCardProps {
  onBrowseOpen: (entityId: string, deviceName: string) => void;
}

export function MediaCard({ onBrowseOpen }: MediaCardProps) {
  const [deviceId, setDeviceId] = useState<Device['id']>('kitchen');
  const [pinnedImages, setPinnedImages] = useState<Record<string, string>>({});
  const active = DEVICES.find(d => d.id === deviceId) ?? DEVICES[0];

  useEffect(() => {
    void Promise.all(
      PINNED.map(async p => {
        const id = p.uri.replace('spotify://playlist/', '');
        const img = await fetchPlaylistImage(id);
        if (img) setPinnedImages(prev => ({ ...prev, [p.id]: img }));
      })
    );
  }, []);

  // All three must be called unconditionally (Rules of Hooks)
  const kitchen = useEntity(DEVICES[0].entity);
  const deck = useEntity(DEVICES[1].entity);
  const allGrp = useEntity(DEVICES[2].entity);
  const playerByDevice: Record<Device['id'], typeof kitchen> = { kitchen, deck, all: allGrp };
  const player = playerByDevice[deviceId];

  const state = player?.state;
  const attrs = player?.attributes ?? {};
  const isPlaying = state === 'playing';
  const title = (attrs as { media_title?: string }).media_title ?? '';
  const artist = (attrs as { media_artist?: string }).media_artist ?? '';
  const volume = Math.round(((attrs as { volume_level?: number }).volume_level ?? 0) * 100);
  const duration = (attrs as { media_duration?: number }).media_duration ?? 0;
  const position = (attrs as { media_position?: number }).media_position ?? 0;
  const progress = duration > 0 ? Math.min(100, Math.round((position / duration) * 100)) : 0;
  const entityPicture = (attrs as { entity_picture?: string }).entity_picture;
  const shuffle = (attrs as { shuffle?: boolean }).shuffle ?? false;
  const repeat = (attrs as { repeat?: string }).repeat ?? 'off';

  function setVolume(e: React.ChangeEvent<HTMLInputElement>) {
    player?.service.volumeSet({ serviceData: { volume_level: Number(e.target.value) / 100 } });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type AnyService = (args: Record<string, unknown>) => void;

  function playPinned(pinned: Pinned) {
    (player?.service.playMedia as unknown as AnyService)({
      serviceData: {
        media_content_id: pinned.uri,
        media_content_type: 'playlist',
      },
    });
  }

  function shuffleLiked() {
    (player?.service.playMedia as unknown as AnyService)({
      serviceData: {
        media_content_id: 'spotify://library/liked_songs',
        media_content_type: 'playlist',
      },
    });
    player?.service.shuffleSet({ serviceData: { shuffle: true } });
  }

  return (
    <div className='card'>
      <div className='card-h'>
        <span className='card-title'>Now playing</span>
        <div style={{ display: 'inline-flex', gap: 6 }}>
          {DEVICES.map(d => (
            <DeviceChip key={d.id} device={d} active={d.id === deviceId} onClick={() => setDeviceId(d.id)} />
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 14 }}>
        {/* Album art */}
        <div
          style={{
            width: 78,
            height: 78,
            borderRadius: 12,
            flexShrink: 0,
            background: entityPicture ? undefined : 'linear-gradient(135deg, #5a3a1c 0%, #2d1d10 50%, #1a1100 100%)',
            backgroundImage: entityPicture ? `url(${entityPicture})` : undefined,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-2)',
            overflow: 'hidden',
          }}
        >
          {!entityPicture && <Music size={28} strokeWidth={1.2} />}
        </div>

        <div className='col-flex grow' style={{ justifyContent: 'center', minWidth: 0 }}>
          <span style={{ fontSize: 16, fontWeight: 600, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {title || (state === 'idle' ? 'Nothing playing' : state === 'off' ? 'Speaker off' : '—')}
          </span>
          <span style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 2 }}>{artist || ' '}</span>
          <div style={{ marginTop: 8, height: 3, background: 'var(--track)', borderRadius: 2, position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                bottom: 0,
                width: `${progress}%`,
                background: 'var(--accent)',
                borderRadius: 2,
                transition: 'width 1s linear',
              }}
            />
          </div>
        </div>
      </div>

      {/* Transport */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, marginTop: 10 }}>
        <button
          className='ibtn sm'
          style={{ color: shuffle ? 'var(--accent)' : 'var(--text-3)' }}
          onClick={() => player?.service.shuffleSet({ serviceData: { shuffle: !shuffle } })}
        >
          <Shuffle size={15} />
        </button>
        <button className='ibtn' onClick={() => player?.service.mediaPreviousTrack()}>
          <SkipBack size={20} />
        </button>
        <button className='ibtn primary' onClick={() => player?.service.mediaPlayPause()}>
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button className='ibtn' onClick={() => player?.service.mediaNextTrack()}>
          <SkipForward size={20} />
        </button>
        <button
          className='ibtn sm'
          style={{ color: repeat !== 'off' ? 'var(--accent)' : 'var(--text-3)' }}
          onClick={() => player?.service.repeatSet({ serviceData: { repeat: repeat === 'off' ? 'all' : 'off' } })}
        >
          <Repeat size={15} />
        </button>
      </div>

      {/* Volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 10 }}>
        <Volume2 size={15} color='var(--text-3)' strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <input
          type='range'
          min='0'
          max='100'
          value={volume}
          className='slider'
          onChange={setVolume}
          style={{ '--p': `${volume}%` } as React.CSSProperties}
        />
        <span className='mono' style={{ fontSize: 14, color: 'var(--text-3)', width: 28, textAlign: 'right', flexShrink: 0 }}>
          {volume}
        </span>
      </div>

      {/* Start something */}
      <div style={{ marginTop: 12 }}>
        <div className='between' style={{ marginBottom: 8 }}>
          <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-3)' }}>
            Start something
          </span>
          <button
            onClick={() => onBrowseOpen(active.entity, active.name)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 2,
              fontSize: 11,
              color: 'var(--text-3)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          >
            Browse <ChevronRight size={11} />
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {PINNED.map(p => (
            <PinnedTile key={p.id} pinned={p} image={pinnedImages[p.id]} onPlay={() => playPinned(p)} />
          ))}
        </div>

        <button className='liked-pill' onClick={shuffleLiked}>
          <Heart size={13} fill='currentColor' style={{ color: 'var(--accent)' }} />
          <span>Shuffle Liked Songs</span>
          <Shuffle size={12} style={{ color: 'var(--text-3)' }} />
        </button>
      </div>
    </div>
  );
}
