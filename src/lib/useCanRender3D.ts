import { useEffect, useState } from "react";

export function useCanRender3D(): boolean {
  // Return false during the first render so the poster always paints first
  const [canRender, setCanRender] = useState(false);

  useEffect(() => {
    function evaluate(): boolean {
      if (typeof window === "undefined") return false;

      const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
      const widthQuery = window.matchMedia("(min-width: 768px)");
      const pointerQuery = window.matchMedia("(pointer: fine)");

      if (motionQuery.matches) return false;
      if (!widthQuery.matches) return false;
      if (!pointerQuery.matches) return false;

      // saveData check
      const conn = (navigator as unknown as { connection?: { saveData?: boolean } }).connection;
      if (conn?.saveData === true) return false;

      // hardwareConcurrency > 4
      if ((navigator.hardwareConcurrency ?? 8) <= 4) return false;

      // deviceMemory >= 4
      const deviceMem = (navigator as unknown as { deviceMemory?: number }).deviceMemory ?? 8;
      if (deviceMem < 4) return false;

      // WebGL2 context check
      try {
        const canvas = document.createElement("canvas");
        const gl = canvas.getContext("webgl2");
        if (!gl) return false;
      } catch {
        return false;
      }

      return true;
    }

    setCanRender(evaluate());

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const widthQuery = window.matchMedia("(min-width: 768px)");
    const pointerQuery = window.matchMedia("(pointer: fine)");

    const listener = () => {
      setCanRender(evaluate());
    };

    motionQuery.addEventListener("change", listener);
    widthQuery.addEventListener("change", listener);
    pointerQuery.addEventListener("change", listener);

    return () => {
      motionQuery.removeEventListener("change", listener);
      widthQuery.removeEventListener("change", listener);
      pointerQuery.removeEventListener("change", listener);
    };
  }, []);

  return canRender;
}
