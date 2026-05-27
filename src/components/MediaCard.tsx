import { useEntity } from '@hakit/core';
import { Shuffle, SkipBack, Play, Pause, SkipForward, Repeat, Volume2, Music } from 'lucide-react';

export function MediaCard() {
  const player = useEntity('media_player.kitchen_speaker_2');

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

  const speakerLabel = state === 'off' || state === 'unavailable' ? 'Kitchen · Offline' : 'Kitchen · Sonos';

  function setVolume(e: React.ChangeEvent<HTMLInputElement>) {
    player?.service.volumeSet({ serviceData: { volume_level: Number(e.target.value) / 100 } });
  }

  return (
    <div className='card'>
      <div className='card-h'>
        <span className='card-title'>Now playing</span>
        <span className='card-action'>{speakerLabel}</span>
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
          <span style={{ fontSize: 14, color: 'var(--text-2)', marginTop: 2 }}>{artist || ' '}</span>
          {/* Progress bar */}
          <div style={{ marginTop: 8, height: 3, background: 'rgba(255,255,255,0.06)', borderRadius: 2, position: 'relative' }}>
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
    </div>
  );
}
