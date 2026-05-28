import { useState } from 'react';
import { useEntity } from '@hakit/core';
import { SkipBack, Play, Pause, SkipForward, Volume2, Music, Speaker } from 'lucide-react';

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
  uri: `spotify://playlist/${string}`;
  gradient: string;
  image?: string;
};

const PINNED: Pinned[] = [
  {
    id: 'p1',
    name: 'Discover Weekly',
    uri: 'spotify://playlist/37i9dQZEVXcGzFtjSOqLXX',
    gradient: 'linear-gradient(135deg, #1a936f 0%, #114b5f 100%)',
    image: 'https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/dw/cover/en',
  },
  {
    id: 'p2',
    name: 'Mitchell+Michelle',
    uri: 'spotify://playlist/37i9dQZF1EJtU4ZS77QWrj',
    gradient: 'linear-gradient(135deg, #ff6f3c 0%, #b6371f 100%)',
    image: 'https://blend-playlist-covers.spotifycdn.com/v2/blend_DEFAULT-tangerine-red-en.jpg',
  },
  {
    id: 'p3',
    name: 'On Repeat',
    uri: 'spotify://playlist/37i9dQZF1EpujlP7LCginZ',
    gradient: 'linear-gradient(135deg, #2b5876 0%, #4e4376 100%)',
    image: 'https://pickasso.spotifycdn.com/image/ab67c0de0000deef/dt/v1/img/repeat/or/en',
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
            width: 18,
            height: 18,
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
        ></div>
      </div>
    </button>
  );
}

export function MediaCard() {
  const [deviceId, setDeviceId] = useState<Device['id']>('kitchen');

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

  function setVolume(e: React.ChangeEvent<HTMLInputElement>) {
    player?.service.volumeSet({ serviceData: { volume_level: Number(e.target.value) / 100 } });
  }

  type AnyService = (args: Record<string, unknown>) => void;

  function playPinned(pinned: Pinned) {
    (player?.service.playMedia as unknown as AnyService)({
      serviceData: {
        media_content_id: pinned.uri,
        media_content_type: 'playlist',
      },
    });
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
            width: 72,
            height: 72,
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

      {/* Transport + volume */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 12 }}>
        <button className='ibtn' aria-label='Previous track' onClick={() => player?.service.mediaPreviousTrack()}>
          <SkipBack size={20} />
        </button>
        <button className='ibtn primary' aria-label={isPlaying ? 'Pause' : 'Play'} onClick={() => player?.service.mediaPlayPause()}>
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </button>
        <button className='ibtn' aria-label='Next track' onClick={() => player?.service.mediaNextTrack()}>
          <SkipForward size={20} />
        </button>
        <div style={{ width: 1, height: 24, background: 'var(--border)', margin: '0 6px' }} aria-hidden='true' />
        <Volume2 size={16} color='var(--text-3)' strokeWidth={1.5} style={{ flexShrink: 0 }} />
        <input
          type='range'
          min='0'
          max='100'
          value={volume}
          className='slider'
          onChange={setVolume}
          style={{ '--p': `${volume}%`, flex: 1, minWidth: 0 } as React.CSSProperties}
          aria-label='Volume'
          aria-valuetext={`${volume} percent`}
        />
        <span className='mono' style={{ fontSize: 13, color: 'var(--text-3)', width: 22, textAlign: 'right', flexShrink: 0 }}>
          {volume}
        </span>
      </div>

      <div style={{ marginTop: 12 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {PINNED.map(p => (
            <PinnedTile key={p.id} pinned={p} image={p.image} onPlay={() => playPinned(p)} />
          ))}
        </div>
      </div>
    </div>
  );
}
