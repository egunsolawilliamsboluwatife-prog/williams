"use client";

import { AdaptiveDpr } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import * as THREE from "three";
import { sceneState, type Quality } from "@/lib/state";

const LAYERS = [
  { name: "Story", color: "#f4f1ea" },
  { name: "Cut", color: "#d5deef" },
  { name: "Motion", color: "#9eb6f0" },
  { name: "Sound", color: "#9dceba" },
  { name: "Color", color: "#e53935" },
] as const;

function FilmRig({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null);
  const count = quality === "high" ? 7 : 5;
  const ticks = quality === "high" ? 16 : 8;

  const frames = useMemo(() => {
    return Array.from({ length: count }, (_, index) => {
      const t = index / (count - 1) - 0.5;
      return {
        key: index,
        x: t * 2.55,
        y: -Math.abs(t) * 0.05,
        z: -Math.abs(t) * 0.95,
        rot: -t * 0.22,
        hot: Math.abs(t) < 0.12,
      };
    });
  }, [count]);

  useFrame((state, dt) => {
    const rig = group.current;
    if (!rig) return;
    const narrow = state.size.width < 860;
    const visible = sceneState.hero > 0.04 && sceneState.stackVisible < 0.5 && sceneState.finale < 0.5;
    rig.visible = visible;
    rig.position.set(narrow ? 0 : 1.9, narrow ? 1.45 : 0.02, 0);
    rig.scale.setScalar(narrow ? 0.52 : 0.86);
    if (!visible) return;
    const still = sceneState.reduced || quality === "low";
    const step = Math.min(dt, 0.05);
    rig.rotation.y = (still ? -0.18 : -0.18 + Math.sin(state.clock.elapsedTime * 0.22) * 0.045) + (still ? 0 : state.pointer.x * 0.04);
    rig.rotation.x = still ? 0 : state.pointer.y * 0.03;
    const iris = rig.getObjectByName("iris");
    if (iris && !still) iris.rotation.z -= step * 0.035;
  });

  return (
    <group ref={group}>
      {frames.map((frame) => (
        <group key={frame.key} position={[frame.x, frame.y, frame.z]} rotation={[0, frame.rot, 0]}>
          <mesh>
            <planeGeometry args={[0.92, 0.54]} />
            <meshBasicMaterial color={frame.hot ? "#4e6aa0" : "#31486e"} toneMapped={false} />
          </mesh>
          <mesh position={[0, 0, 0.02]}>
            <planeGeometry args={[0.72, 0.36]} />
            <meshBasicMaterial color={frame.hot ? "#9bb4dc" : "#6d86b0"} toneMapped={false} />
          </mesh>
          {quality === "high"
            ? [-0.18, -0.06, 0.06, 0.18].map((y) => (
                <mesh key={y} position={[-0.4, y, 0.03]}>
                  <circleGeometry args={[0.028, 10]} />
                  <meshBasicMaterial color="#101624" toneMapped={false} />
                </mesh>
              ))
            : null}
        </group>
      ))}
      <mesh position={[0, 0, 0.28]}>
        <boxGeometry args={[0.014, 0.7, 0.01]} />
        <meshBasicMaterial color="#e53935" toneMapped={false} />
      </mesh>
      <group name="iris" position={[0, 0, 0.48]}>
        <mesh>
          <ringGeometry args={[0.46, 0.52, quality === "high" ? 80 : 32]} />
          <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        <mesh>
          <ringGeometry args={[0.92, 1.0, quality === "high" ? 80 : 32]} />
          <meshBasicMaterial color="#f0ebe2" side={THREE.DoubleSide} toneMapped={false} />
        </mesh>
        {Array.from({ length: ticks }, (_, index) => {
          const angle = (index / ticks) * Math.PI * 2;
          const radius = 0.72;
          return (
            <mesh key={index} position={[Math.cos(angle) * radius, Math.sin(angle) * radius, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.11, 0.018, 0.012]} />
              <meshBasicMaterial color="#f7f4ee" toneMapped={false} />
            </mesh>
          );
        })}
      </group>
    </group>
  );
}

function StackRig() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const rig = group.current;
    if (!rig) return;
    const show = sceneState.stackVisible > 0.5 && sceneState.finale < 0.5;
    rig.visible = show;
    if (!show) return;
    const narrow = state.size.width < 860;
    const progress = sceneState.stack;
    rig.position.set(narrow ? 0 : 1.95, narrow ? 0.85 : 0.05, 0);
    rig.scale.setScalar(narrow ? 0.58 : 1.05);
    rig.rotation.y = -0.72 + progress * 0.16;
    rig.rotation.x = 0.72 - progress * 0.06;
    rig.children.forEach((child, index) => {
      const dir = index - 2;
      child.position.y = dir * (0.12 + progress * 0.62);
      child.position.z = (2 - index) * 0.045 * (1 - progress);
    });
  });

  return (
    <group ref={group} visible={false}>
      {LAYERS.map((layer) => (
        <group key={layer.name}>
          <mesh>
            <boxGeometry args={[2.4, 0.09, 1.35]} />
            <meshBasicMaterial color="#5d739e" toneMapped={false} />
          </mesh>
          <mesh position={[-1.14, 0.012, 0]}>
            <boxGeometry args={[0.09, 0.12, 1.38]} />
            <meshBasicMaterial color={layer.color} toneMapped={false} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

function Dust({ count }: { count: number }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let index = 0; index < count; index += 1) {
      positions[index * 3] = (Math.random() - 0.5) * 8;
      positions[index * 3 + 1] = Math.random() * 6 - 3;
      positions[index * 3 + 2] = (Math.random() - 0.5) * 2;
      speeds[index] = 0.2 + Math.random() * 0.5;
    }
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.userData = { speeds, count };
    return geometry;
  }, [count]);

  useEffect(() => () => geo.dispose(), [geo]);

  useFrame((_, dt) => {
    const points = ref.current;
    if (!points) return;
    points.visible = sceneState.finale > 0.5;
    if (!points.visible || sceneState.reduced) return;
    const attr = geo.getAttribute("position") as THREE.BufferAttribute;
    const arr = attr.array as Float32Array;
    const speeds = geo.userData.speeds as Float32Array;
    const step = Math.min(dt, 0.05);
    for (let index = 0; index < count; index += 1) {
      arr[index * 3 + 1] += speeds[index] * step;
      if (arr[index * 3 + 1] > 3.2) arr[index * 3 + 1] = -3.2;
    }
    attr.needsUpdate = true;
  });

  return (
    <points ref={ref} geometry={geo} visible={false}>
      <pointsMaterial color="#f6f3ec" size={0.02} sizeAttenuation transparent opacity={0.8} depthWrite={false} toneMapped={false} />
    </points>
  );
}

function Presence({ target }: { target: RefObject<HTMLDivElement | null> }) {
  const ready = useRef(0);
  const last = useRef(-1);
  useFrame((_, dt) => {
    ready.current = sceneState.reduced ? 1 : Math.min(1, ready.current + Math.min(dt, 0.05) / 0.65);
    const presence = Math.max(sceneState.hero, sceneState.stackVisible, sceneState.finale);
    const opacity = ready.current * presence;
    if (!target.current || Math.abs(opacity - last.current) < 0.02) return;
    last.current = opacity;
    target.current.style.opacity = opacity.toFixed(3);
  });
  return null;
}

function StageCanvas({ quality }: { quality: Quality }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(true);

  useEffect(() => {
    const id = window.setInterval(() => {
      const on = sceneState.hero > 0.05 || sceneState.stackVisible > 0.5 || sceneState.finale > 0.5;
      setLive((prev) => (prev === on ? prev : on));
    }, 180);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="stage" ref={wrapRef} aria-hidden="true">
      <Canvas
        dpr={quality === "high" ? [1, 1.5] : 1}
        frameloop={quality === "high" && !sceneState.reduced && live ? "always" : "demand"}
        gl={{ antialias: quality === "high", alpha: true, powerPreference: "high-performance", stencil: false }}
        camera={{ position: [0, 0.04, 7.5], fov: 32, near: 0.1, far: 40 }}
        onCreated={({ gl, invalidate }) => {
          gl.setClearColor(0x000000, 0);
          sceneState.invalidate = invalidate;
          invalidate();
        }}
      >
        <Presence target={wrapRef} />
        {quality === "high" ? <AdaptiveDpr pixelated /> : null}
        <FilmRig quality={quality} />
        <StackRig />
        {quality === "high" ? <Dust count={120} /> : null}
      </Canvas>
    </div>
  );
}

class StageBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) return null;
    return this.props.children;
  }
}

export default function Stage({ quality }: { quality: Quality }) {
  return (
    <StageBoundary>
      <StageCanvas quality={quality} />
    </StageBoundary>
  );
}
