import React, { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { WMonogram } from "./WMonogram.tsx";

interface HeroW3DProps {
  eventSource?: React.RefObject<HTMLElement | null>;
  onReady?: () => void;
}

export const HeroW3D: React.FC<HeroW3DProps> = ({ eventSource, onReady }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [frameloop, setFrameloop] = useState<"always" | "never">("always");
  const [inView, setInView] = useState(true);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.05 }
    );
    observer.observe(el);

    const handleVisibility = () => {
      if (document.hidden) {
        setFrameloop("never");
      } else if (inView) {
        setFrameloop("always");
      }
    };

    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [inView]);

  useEffect(() => {
    setFrameloop(inView && !document.hidden ? "always" : "never");
  }, [inView]);

  const handleCreated = () => {
    requestAnimationFrame(() => {
      onReady?.();
    });
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    >
      <Canvas
        dpr={[1, 1.75]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
        }}
        camera={{ position: [0, 0, 7], fov: 35 }}
        frameloop={frameloop}
        onCreated={handleCreated}
        eventSource={eventSource as React.RefObject<HTMLElement> | undefined}
      >
        <WMonogram />
      </Canvas>
    </div>
  );
};

export default HeroW3D;
