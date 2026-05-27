import { useState, useEffect } from 'react';

const BASE_W = 1920;
const BASE_H = 1080;

export function useScale() {
  const [scale, setScale] = useState(() => Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
  useEffect(() => {
    const handle = () => setScale(Math.min(window.innerWidth / BASE_W, window.innerHeight / BASE_H));
    window.addEventListener('resize', handle);
    return () => window.removeEventListener('resize', handle);
  }, []);
  return scale;
}
