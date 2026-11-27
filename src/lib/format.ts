const FPS = 24;
const DURATION = 150;

export function formatTimecode(progress: number) {
  const clamped = Math.min(1, Math.max(0, progress));
  const totalFrames = Math.round(clamped * DURATION * FPS);
  const frames = totalFrames % FPS;
  const totalSeconds = Math.floor(totalFrames / FPS);
  const seconds = totalSeconds % 60;
  const minutes = Math.floor(totalSeconds / 60) % 60;
  const hours = Math.floor(totalSeconds / 3600);
  const pad = (value: number) => value.toString().padStart(2, "0");
  return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}:${pad(frames)}`;
}

export function pageProgress() {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  if (max <= 0) return 0;
  return window.scrollY / max;
}
