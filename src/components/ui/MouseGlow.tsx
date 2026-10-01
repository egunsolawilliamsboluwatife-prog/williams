import React, { useEffect, useState } from "react";
import { useReducedMotion } from "motion/react";

export const MouseGlow: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -200, y: -200 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion) return;

    let targetX = -200;
    let targetY = -200;
    let currentX = -200;
    let currentY = -200;
    let animId: number;

    const onMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!visible) setVisible(true);
    };

    const onMouseLeave = () => {
      setVisible(false);
    };

    const loop = () => {
      currentX += (targetX - currentX) * 0.12;
      currentY += (targetY - currentY) * 0.12;
      setPos({ x: currentX, y: currentY });
      animId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animId);
    };
  }, [shouldReduceMotion, visible]);

  if (shouldReduceMotion || !visible) return null;

  return (
    <div
      className="fixed pointer-events-none z-30 transition-opacity duration-500 ease-out"
      style={{
        left: pos.x,
        top: pos.y,
        width: 600,
        height: 600,
        transform: "translate(-50%, -50%)",
        background:
          "radial-gradient(circle 300px at center, rgba(217, 119, 54, 0.045), rgba(56, 189, 248, 0.02) 40%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
};
