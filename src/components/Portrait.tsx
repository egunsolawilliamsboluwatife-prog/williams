"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Component, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import { sceneState, type Quality } from "@/lib/state";

const NAVY = "/williams-navy-bokeh.jpg";
const GREY = "/williams-warm-grey.jpg";

const vert = /* glsl */ `
uniform sampler2D uDepth;
uniform vec2 uPointer;
uniform float uStrength;
out vec2 vUv;
out float vDepth;
void main() {
  vUv = uv;
  float depth = texture(uDepth, uv).r;
  vDepth = depth;
  vec3 pos = position;
  pos.z += depth * uStrength;
  pos.x += uPointer.x * depth * 0.06;
  pos.y += uPointer.y * depth * 0.045;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
`;

const frag = /* glsl */ `
precision highp float;
uniform sampler2D uNavy;
uniform sampler2D uGrey;
uniform sampler2D uDepth;
uniform float uHover;
uniform vec2 uPointer;
in vec2 vUv;
in float vDepth;
out vec4 fragColor;

vec3 toLinear(vec3 c) { return pow(max(c, vec3(0.0)), vec3(2.2)); }
vec3 toSrgb(vec3 c) { return pow(max(c, vec3(0.0)), vec3(1.0 / 2.2)); }

void main() {
  vec3 navy = toLinear(texture(uNavy, vUv).rgb);
  vec3 grey = toLinear(texture(uGrey, vUv).rgb);
  vec3 base = mix(navy, grey, uHover);
  float dx = texture(uDepth, vUv + vec2(0.005, 0.0)).r - texture(uDepth, vUv - vec2(0.005, 0.0)).r;
  float dy = texture(uDepth, vUv + vec2(0.0, 0.005)).r - texture(uDepth, vUv - vec2(0.0, 0.005)).r;
  vec3 n = normalize(vec3(-dx * 3.4, -dy * 3.4, 1.0));
  vec3 key = normalize(vec3(-0.45 + uPointer.x * 0.85, 0.62 + uPointer.y * 0.55, 0.8));
  float diff = clamp(dot(n, key), 0.0, 1.0);
  float rim = pow(1.0 - clamp(n.z, 0.0, 1.0), 2.5);
  float subject = smoothstep(0.12, 0.72, vDepth);
  vec3 col = base * (0.34 + diff * 0.9);
  col += vec3(0.78, 0.88, 1.0) * rim * (0.28 + subject * 0.55);
  col += vec3(0.92, 0.24, 0.22) * pow(rim, 1.6) * 0.16;
  float vig = smoothstep(1.15, 0.28, distance(vUv, vec2(0.58, 0.64)));
  col *= mix(0.76, 1.0, vig);
  fragColor = vec4(toSrgb(col), 1.0);
}
`;

function makeDepth() {
  const w = 256;
  const h = 144;
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.NoColorSpace;
  tex.wrapS = THREE.ClampToEdgeWrapping;
  tex.wrapT = THREE.ClampToEdgeWrapping;
  if (!ctx) return tex;
  const image = ctx.createImageData(w, h);
  const gauss = (v: number, m: number, s: number) => Math.exp(-0.5 * ((v - m) / s) ** 2);
  for (let y = 0; y < h; y += 1) {
    for (let x = 0; x < w; x += 1) {
      const u = x / (w - 1);
      const v = y / (h - 1);
      const face = gauss(u, 0.62, 0.11) * gauss(v, 0.32, 0.14);
      const head = gauss(u, 0.6, 0.17) * gauss(v, 0.36, 0.2) * 0.7;
      const neck = gauss(u, 0.58, 0.08) * gauss(v, 0.5, 0.08) * 0.5;
      const torso = gauss(u, 0.55, 0.26) * gauss(v, 0.72, 0.22) * 0.42;
      const d = Math.min(1, face * 1.35 + head + neck + torso);
      const g = Math.round(d * 255);
      const i = (y * w + x) * 4;
      image.data[i] = g;
      image.data[i + 1] = g;
      image.data[i + 2] = g;
      image.data[i + 3] = 255;
    }
  }
  ctx.putImageData(image, 0, 0);
  tex.needsUpdate = true;
  return tex;
}

function loadPhoto(url: string) {
  const tex = new THREE.TextureLoader().load(url);
  tex.colorSpace = THREE.NoColorSpace;
  tex.anisotropy = 8;
  return tex;
}

function PortraitMesh({ quality }: { quality: Quality }) {
  const group = useRef<THREE.Group>(null);
  const hover = useRef(0);
  const over = useRef(false);
  const reduced = sceneState.reduced;
  const segments = quality === "high" ? 96 : 36;
  const depth = useMemo(() => makeDepth(), []);
  const navy = useMemo(() => loadPhoto(NAVY), []);
  const grey = useMemo(() => loadPhoto(GREY), []);

  const uniforms = useMemo(
    () => ({
      uNavy: { value: navy },
      uGrey: { value: grey },
      uDepth: { value: depth },
      uHover: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uStrength: { value: quality === "high" ? 0.42 : 0.22 },
    }),
    [navy, grey, depth, quality],
  );

  useEffect(() => {
    return () => {
      depth.dispose();
      navy.dispose();
      grey.dispose();
    };
  }, [depth, grey, navy]);

  const bokeh = useMemo(() => {
    const count = quality === "high" ? 80 : 24;
    const positions = new Float32Array(count * 3);
    const speeds = new Float32Array(count);
    for (let i = 0; i < count; i += 1) {
      positions[i * 3] = (Math.random() - 0.5) * 1.9;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 1.15;
      positions[i * 3 + 2] = Math.random() * 0.7 - 0.15;
      speeds[i] = 0.03 + Math.random() * 0.06;
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.userData = { speeds, count };
    return geometry;
  }, [quality]);

  useEffect(() => () => bokeh.dispose(), [bokeh]);

  useFrame((state, dt) => {
    const rig = group.current;
    if (!rig) return;
    const step = Math.min(dt, 0.05);
    const sway = (sceneState.about - 0.5) * 0.45;
    const baseY = -0.32;
    const baseX = 0.16;
    if (reduced) {
      rig.rotation.x = baseX;
      rig.rotation.y = baseY;
    } else {
      rig.rotation.y = THREE.MathUtils.damp(rig.rotation.y, baseY + state.pointer.x * 0.62, 4.5, step);
      rig.rotation.x = THREE.MathUtils.damp(rig.rotation.x, baseX - state.pointer.y * 0.4 + sway, 4.5, step);
    }
    const target = over.current && !reduced ? 1 : 0;
    hover.current = THREE.MathUtils.damp(hover.current, target, 3.2, step);
    uniforms.uHover.value = hover.current;
    uniforms.uPointer.value.set(reduced ? 0 : state.pointer.x, reduced ? 0 : state.pointer.y);

    if (!reduced && quality === "high") {
      const attr = bokeh.getAttribute("position") as THREE.BufferAttribute;
      const arr = attr.array as Float32Array;
      const speeds = bokeh.userData.speeds as Float32Array;
      const count = bokeh.userData.count as number;
      for (let i = 0; i < count; i += 1) {
        arr[i * 3 + 1] += speeds[i] * step;
        if (arr[i * 3 + 1] > 0.7) arr[i * 3 + 1] = -0.7;
      }
      attr.needsUpdate = true;
    }
  });

  return (
    <group ref={group}>
      <mesh position={[0.16, -0.03, -0.38]} rotation={[0.02, 0.22, 0]}>
        <planeGeometry args={[1.55, 0.88]} />
        <meshBasicMaterial map={grey} toneMapped={false} />
      </mesh>
      <mesh
        onPointerOver={() => {
          over.current = true;
        }}
        onPointerOut={() => {
          over.current = false;
        }}
      >
        <planeGeometry args={[1.62, 0.92, segments, segments]} />
        <shaderMaterial
          glslVersion={THREE.GLSL3}
          toneMapped={false}
          uniforms={uniforms}
          vertexShader={vert}
          fragmentShader={frag}
        />
      </mesh>
      <points geometry={bokeh}>
        <pointsMaterial
          color="#d5e2ff"
          size={quality === "high" ? 0.032 : 0.02}
          transparent
          opacity={0.7}
          depthWrite={false}
          sizeAttenuation
          toneMapped={false}
        />
      </points>
    </group>
  );
}

function PortraitCanvas({ quality, live }: { quality: Quality; live: boolean }) {
  return (
    <Canvas
      className="portrait-canvas"
      dpr={quality === "high" ? [1, 1.6] : 1}
      frameloop={live && !sceneState.reduced ? "always" : "demand"}
      gl={{
        antialias: quality === "high",
        alpha: true,
        powerPreference: "high-performance",
        stencil: false,
        toneMapping: THREE.NoToneMapping,
      }}
      camera={{ position: [0, 0, 1.72], fov: 28, near: 0.1, far: 10 }}
      onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
    >
      <PortraitMesh quality={quality} />
    </Canvas>
  );
}

class PortraitBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    if (this.state.failed) {
      return (
        <img
          src={NAVY}
          alt="Williams, freelance video editor in Lagos"
          width={1048}
          height={592}
        />
      );
    }
    return this.props.children;
  }
}

export default function Portrait({ quality }: { quality: Quality }) {
  const slot = useRef<HTMLDivElement>(null);
  const [live, setLive] = useState(false);

  useEffect(() => {
    const node = slot.current;
    if (!node) return;
    const observer = new IntersectionObserver(([entry]) => setLive(entry.isIntersecting), { rootMargin: "160px" });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={slot} className="portrait-fill">
      <PortraitBoundary>
        <PortraitCanvas quality={quality} live={live} />
      </PortraitBoundary>
    </div>
  );
}
