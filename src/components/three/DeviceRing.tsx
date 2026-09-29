import React, {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import * as THREE from "three";
import { Canvas, useFrame } from "@react-three/fiber";
import { useNavigate, Link } from "react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import { CASE_STUDIES } from "../../content/work.ts";
import { Laptop } from "./Laptop.tsx";
import { Phone } from "./Phone.tsx";

interface RingInnerProps {
  onIndexChange: (index: number) => void;
  targetAngleRef: React.MutableRefObject<number | null>;
  isUserControlledRef: React.MutableRefObject<boolean>;
  onStationClick: (slug: string) => void;
  isHoveredRef: React.MutableRefObject<boolean>;
  dragDeltaRef: React.MutableRefObject<number>;
  isDraggingRef: React.MutableRefObject<boolean>;
}

const RADIUS = 4.2;
const STATION_COUNT = CASE_STUDIES.length; // 4
const ANGLE_STEP = (2 * Math.PI) / STATION_COUNT;

const RingInner: React.FC<RingInnerProps> = ({
  onIndexChange,
  targetAngleRef,
  isUserControlledRef,
  onStationClick,
  isHoveredRef,
  dragDeltaRef,
  isDraggingRef,
}) => {
  const ringRef = useRef<THREE.Group>(null);
  const velocityRef = useRef<number>(0);
  const hoverLeaveTimerRef = useRef<number>(0);
  const lastIndexRef = useRef<number>(0);

  useFrame((_, delta) => {
    if (!ringRef.current) return;

    // If an animated target angle is set (e.g. from keyboard / button navigation)
    if (targetAngleRef.current !== null) {
      const current = ringRef.current.rotation.y;
      const target = targetAngleRef.current;
      const diff = target - current;

      if (Math.abs(diff) < 0.002) {
        ringRef.current.rotation.y = target;
        targetAngleRef.current = null;
      } else {
        // Easing toward target
        ringRef.current.rotation.y += diff * Math.min(delta * 7, 0.35);
      }
    } else if (isDraggingRef.current) {
      // Applied directly in pointer move
    } else {
      // Inertia decay
      if (Math.abs(velocityRef.current) > 0.0005) {
        ringRef.current.rotation.y += velocityRef.current;
        velocityRef.current *= 0.92;
      } else {
        velocityRef.current = 0;
        // Resume auto-rotation unless hovered or user permanently stopped it via keyboard
        if (!isUserControlledRef.current && !isHoveredRef.current) {
          ringRef.current.rotation.y += 0.12 * delta;
        }
      }
    }

    // Process drag movement
    if (dragDeltaRef.current !== 0) {
      ringRef.current.rotation.y += dragDeltaRef.current;
      velocityRef.current = dragDeltaRef.current;
      dragDeltaRef.current = 0;
    }

    // Determine front station (closest to camera at z = +9.5)
    // Front angle is 0 rad. Station i is at angle = i * ANGLE_STEP + rotation.y
    const rot = ringRef.current.rotation.y;
    let closestIndex = 0;
    let minDistance = Infinity;

    for (let i = 0; i < STATION_COUNT; i++) {
      const stationAngle = (i * ANGLE_STEP + rot) % (2 * Math.PI);
      // Normalize angle to [-PI, PI]
      let normalized = stationAngle;
      while (normalized > Math.PI) normalized -= 2 * Math.PI;
      while (normalized < -Math.PI) normalized += 2 * Math.PI;

      const dist = Math.abs(normalized);
      if (dist < minDistance) {
        minDistance = dist;
        closestIndex = i;
      }
    }

    if (closestIndex !== lastIndexRef.current) {
      lastIndexRef.current = closestIndex;
      onIndexChange(closestIndex);
    }
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight
        color="#F2EEE6"
        intensity={1.0}
        position={[4, 6, 6]}
      />
      <pointLight
        color="#FF6A3D"
        intensity={25}
        distance={14}
        position={[0, 2, -6]}
      />

      <group ref={ringRef}>
        {CASE_STUDIES.map((project, i) => {
          const angle = i * ANGLE_STEP;
          const x = Math.sin(angle) * RADIUS;
          const z = Math.cos(angle) * RADIUS;

          return (
            <group
              key={project.slug}
              position={[x, 0, z]}
              rotation={[0, angle, 0]}
            >
              {/* Laptop at center */}
              <Laptop
                textureUrl={project.desktopImage}
                onClick={() => onStationClick(project.slug)}
              />
              {/* Phone at local [1.55, -0.35, 0.6], rotated y = -0.25 */}
              <group position={[1.55, -0.35, 0.6]} rotation={[0, -0.25, 0]}>
                <Phone
                  textureUrl={project.mobileImage}
                  onClick={() => onStationClick(project.slug)}
                />
              </group>
            </group>
          );
        })}
      </group>
    </>
  );
};

export const DeviceRing: React.FC = () => {
  const navigate = useNavigate();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [announcement, setAnnouncement] = useState("");

  const targetAngleRef = useRef<number | null>(null);
  const isUserControlledRef = useRef<boolean>(false);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragDeltaRef = useRef<number>(0);
  const dragStartPos = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const totalDragDist = useRef<number>(0);
  const hoverTimeoutRef = useRef<number | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
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
    return () => observer.disconnect();
  }, []);

  const handleIndexChange = useCallback((idx: number) => {
    setActiveIndex(idx);
    const p = CASE_STUDIES[idx];
    setAnnouncement(`${p.name}, ${idx + 1} of 4`);
  }, []);

  const handleStationClick = useCallback(
    (slug: string) => {
      if (totalDragDist.current < 5) {
        navigate(`/work/${slug}`);
      }
    },
    [navigate]
  );

  const rotateToStation = useCallback((targetIndex: number) => {
    isUserControlledRef.current = true;
    const clampedIndex = (targetIndex + STATION_COUNT) % STATION_COUNT;
    // Station i is in front when rotation.y = -i * ANGLE_STEP
    targetAngleRef.current = -clampedIndex * ANGLE_STEP;
  }, []);

  const handlePrev = useCallback(() => {
    rotateToStation(activeIndex - 1);
  }, [activeIndex, rotateToStation]);

  const handleNext = useCallback(() => {
    rotateToStation(activeIndex + 1);
  }, [activeIndex, rotateToStation]);

  // Pointer drag controls
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    totalDragDist.current = 0;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartPos.current.x;
    dragStartPos.current = { x: e.clientX, y: e.clientY };
    totalDragDist.current += Math.abs(dx);
    dragDeltaRef.current = dx * 0.006;
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // Ignored
    }
  };

  const handlePointerEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    isHoveredRef.current = true;
  };

  const handlePointerLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      isHoveredRef.current = false;
    }, 1200);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
    } else if (e.key === "Enter") {
      e.preventDefault();
      navigate(`/work/${CASE_STUDIES[activeIndex].slug}`);
    }
  };

  const currentProject = CASE_STUDIES[activeIndex];

  return (
    <div
      ref={containerRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Project ring"
      tabIndex={0}
      onKeyDown={handleKeyDown}
      className="relative w-full h-[min(620px,72dvh)] focus:outline-none focus-visible:ring-2 focus-visible:ring-ember rounded-3xl overflow-hidden select-none"
    >
      {/* 3D Canvas */}
      <div
        className={`w-full h-full ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onPointerEnter={handlePointerEnter}
        onPointerLeave={handlePointerLeave}
      >
        <Canvas
          aria-hidden="true"
          dpr={[1, 1.75]}
          gl={{
            antialias: true,
            alpha: true,
            powerPreference: "high-performance",
          }}
          camera={{ position: [0, 0.6, 9.5], fov: 35 }}
          frameloop={inView ? "always" : "never"}
        >
          <Suspense fallback={null}>
            <RingInner
              onIndexChange={handleIndexChange}
              targetAngleRef={targetAngleRef}
              isUserControlledRef={isUserControlledRef}
              onStationClick={handleStationClick}
              isHoveredRef={isHoveredRef}
              dragDeltaRef={dragDeltaRef}
              isDraggingRef={isDraggingRef}
            />
          </Suspense>
        </Canvas>
      </div>

      {/* Front station overlay (bottom-left of stage, HTML) */}
      <div className="absolute bottom-6 left-6 z-20 w-full max-w-[360px] max-md:left-4 max-md:right-4 max-md:bottom-4 max-md:max-w-none">
        <div className="glass p-6 text-left transition-opacity duration-300">
          <h3 className="text-xl font-bold font-display text-bone tracking-tight mb-1">
            {currentProject.name}
          </h3>
          <p className="text-sm font-sans text-bone-subtle mb-4">
            {currentProject.metaLine}
          </p>
          <div className="flex items-center gap-4">
            <Link
              to={`/work/${currentProject.slug}`}
              className="inline-flex items-center justify-center px-5 h-10 rounded-full bg-ember text-ink font-sans font-semibold text-sm hover:shadow-[var(--shadow-ember)] active:scale-97 active:bg-ember-press transition-all"
            >
              View case study
            </Link>
            <a
              href={currentProject.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sm font-sans font-medium text-ember underline underline-offset-4 hover:underline hover:decoration-2 transition-all"
            >
              <span>Visit live site</span>
              <ArrowUpRight size={15} />
              <span className="sr-only">(opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>

      {/* Accessible Polite Live Region */}
      <div aria-live="polite" className="sr-only">
        {announcement}
      </div>

      {/* Ring Controls (visible buttons bottom-right) */}
      <div className="absolute bottom-6 right-6 z-20 flex items-center gap-2 max-md:hidden">
        <button
          type="button"
          onClick={handlePrev}
          aria-label="Previous project"
          className="w-11 h-11 rounded-full glass border border-line flex items-center justify-center text-bone hover:border-ember hover:text-ember transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <button
          type="button"
          onClick={handleNext}
          aria-label="Next project"
          className="w-11 h-11 rounded-full glass border border-line flex items-center justify-center text-bone hover:border-ember hover:text-ember transition-colors"
        >
          <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default DeviceRing;
