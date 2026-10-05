import React, { useEffect, useRef, useState } from "react";
import { Play, Pause } from "@phosphor-icons/react";
import { useReducedMotion } from "motion/react";
import { HERO_VIDEO_SRC, HERO_VIDEO_POSTER } from "../../config/site.ts";

interface VideoBackgroundProps {
  videoSrc?: string;
  posterSrc?: string;
  className?: string;
  overlayOpacity?: string;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSrc = HERO_VIDEO_SRC,
  posterSrc = HERO_VIDEO_POSTER,
  className = "",
  overlayOpacity = "bg-ink/75",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [isPlaying, setIsPlaying] = useState(!shouldReduceMotion);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (shouldReduceMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    // Auto-play safely
    video.play().catch(() => {
      // Autoplay blocked by browser policy without user gesture
      setIsPlaying(false);
    });

    // Pause when hero is scrolled out of view to save battery and GPU cycles
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          video.pause();
        } else if (isPlaying) {
          video.play().catch(() => {});
        }
      },
      { threshold: 0.15 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [shouldReduceMotion, isPlaying]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 w-full h-full overflow-hidden pointer-events-none select-none z-0 ${className}`}
    >
      {/* 1. HTML5 Ambient Video with Poster Fallback */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={posterSrc}
        onLoadedData={() => setIsLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <source src={videoSrc} type="video/mp4" />
      </video>

      {/* 2. Poster Fallback for instant load before video buffer */}
      <div
        style={{ backgroundImage: `url(${posterSrc})` }}
        className={`absolute inset-0 w-full h-full bg-cover bg-center transition-opacity duration-1000 ${
          isLoaded ? "opacity-0" : "opacity-100"
        }`}
      />

      {/* 3. Luxury Scrim Layer: High contrast gradient ensures WCAG AA text legibility */}
      <div className={`absolute inset-0 ${overlayOpacity} backdrop-blur-[1px]`} />

      {/* 4. Vignette & Bottom Section Blend (Seamless transition to the rest of the dark site) */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/60 via-transparent to-navy" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(6,11,24,0.85)_100%)]" />

      {/* 5. Minimal Play/Pause Accessibility Control (Pointer events enabled on button only) */}
      <div className="absolute bottom-6 right-6 z-20 pointer-events-auto">
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? "Pause background video" : "Play background video"}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-navy/80 hover:bg-navy border border-line hover:border-line-strong text-bone-subtle hover:text-bone text-[11px] font-mono backdrop-blur-md transition-all cursor-pointer shadow-lg group"
        >
          {isPlaying ? (
            <>
              <Pause size={12} weight="fill" className="text-ember group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Pause video</span>
            </>
          ) : (
            <>
              <Play size={12} weight="fill" className="text-ember group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">Play video</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoBackground;
