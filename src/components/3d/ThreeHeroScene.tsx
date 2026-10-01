import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { useReducedMotion } from "motion/react";

export const ThreeHeroScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;
    const container = containerRef.current;
    if (!container) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 2. Geometry & Materials: Floating Luxury Geometric Torus Knot & Orbit Rings
    const group = new THREE.Group();
    scene.add(group);

    // Outer Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(6.5, 1.8, 120, 24, 2, 3);
    const knotMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97736, // Ember
      emissive: 0x24140b,
      roughness: 0.25,
      metalness: 0.85,
      wireframe: true,
    });
    const knotMesh = new THREE.Mesh(knotGeometry, knotMaterial);
    group.add(knotMesh);

    // Inner Core Spherical Particles
    const particleCount = 180;
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const emberColor = new THREE.Color(0xd97736);
    const goldColor = new THREE.Color(0xf59e0b);
    const boneColor = new THREE.Color(0xf1ece4);

    for (let i = 0; i < particleCount; i++) {
      const radius = 10 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);

      const pickedColor =
        i % 3 === 0 ? emberColor : i % 3 === 1 ? goldColor : boneColor;
      colors[i * 3] = pickedColor.r;
      colors[i * 3 + 1] = pickedColor.g;
      colors[i * 3 + 2] = pickedColor.b;
    }

    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.18,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    // Subtle 3D Gyroscopic Ring
    const ringGeometry = new THREE.TorusGeometry(9, 0.05, 16, 100);
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.25,
    });
    const ringMesh = new THREE.Mesh(ringGeometry, ringMaterial);
    ringMesh.rotation.x = Math.PI / 3;
    group.add(ringMesh);

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xd97736, 3, 50);
    pointLight1.position.set(10, 10, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x38bdf8, 2, 50);
    pointLight2.position.set(-15, -10, 10);
    scene.add(pointLight2);

    // 4. Mouse Interactive Parallax
    let targetRotationX = 0;
    let targetRotationY = 0;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0004;
      mouseY = (event.clientY - windowHalfY) * 0.0004;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // 5. Resize Handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // 6. Animation Loop with Damped Lerp
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous slow luxury rotation
      knotMesh.rotation.x = elapsedTime * 0.12;
      knotMesh.rotation.y = elapsedTime * 0.18;
      particles.rotation.y = -elapsedTime * 0.05;
      ringMesh.rotation.z = elapsedTime * 0.08;

      // Mouse interactive lerp
      targetRotationX += (mouseY - targetRotationX) * 0.05;
      targetRotationY += (mouseX - targetRotationY) * 0.05;

      group.rotation.x = targetRotationX + Math.sin(elapsedTime * 0.5) * 0.08;
      group.rotation.y = targetRotationY + Math.cos(elapsedTime * 0.5) * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      knotGeometry.dispose();
      knotMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      ringGeometry.dispose();
      ringMaterial.dispose();
      renderer.dispose();
    };
  }, [shouldReduceMotion]);

  if (shouldReduceMotion) return null;

  return (
    <div
      ref={containerRef}
      className="absolute top-1/2 right-[-5%] -translate-y-1/2 w-[340px] sm:w-[480px] lg:w-[620px] h-[340px] sm:h-[480px] lg:h-[620px] pointer-events-none -z-10 opacity-70 blur-[0.5px] select-none"
      aria-hidden="true"
    />
  );
};
