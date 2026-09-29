import React, { useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { Float, Environment, Lightformer } from "@react-three/drei";
import { W_POINTS } from "./wShape.ts";

export const WMonogram: React.FC = () => {
  const groupRef = useRef<THREE.Group>(null);

  const geometry = useMemo(() => {
    const shape = new THREE.Shape();
    const [firstX, firstY] = W_POINTS[0];
    shape.moveTo(firstX, firstY);
    for (let i = 1; i < W_POINTS.length; i++) {
      shape.lineTo(W_POINTS[i][0], W_POINTS[i][1]);
    }
    shape.closePath();

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.6,
      bevelEnabled: true,
      bevelThickness: 0.08,
      bevelSize: 0.06,
      bevelSegments: 6,
      steps: 1,
      curveSegments: 1,
    };

    const geom = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    geom.center();
    return geom;
  }, []);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: "#141C30",
      metalness: 0.85,
      roughness: 0.28,
      clearcoat: 1,
      clearcoatRoughness: 0.15,
    });
  }, []);

  useFrame((state, delta) => {
    if (!groupRef.current) return;
    const targetX = -0.08 + state.pointer.y * 0.15;
    const targetY = -0.28 + state.pointer.x * 0.25;

    groupRef.current.rotation.x = THREE.MathUtils.damp(
      groupRef.current.rotation.x,
      targetX,
      4,
      delta
    );
    groupRef.current.rotation.y = THREE.MathUtils.damp(
      groupRef.current.rotation.y,
      targetY,
      4,
      delta
    );
  });

  return (
    <>
      <ambientLight intensity={0.15} />
      <directionalLight
        color="#F2EEE6"
        intensity={1.2}
        position={[3, 4, 5]}
      />
      {/* Ember rim lights */}
      <pointLight
        color="#FF6A3D"
        intensity={40}
        distance={12}
        position={[-3, 1, -2.5]}
      />
      <pointLight
        color="#FF6A3D"
        intensity={18}
        distance={10}
        position={[3.2, -1.5, -2]}
      />

      {/* Local Lightformer reflection environment */}
      <Environment resolution={256}>
        <Lightformer
          form="rect"
          intensity={2}
          color="#F2EEE6"
          scale={[6, 1, 1]}
          position={[0, 4, 3]}
        />
        <Lightformer
          form="rect"
          intensity={3}
          color="#FF6A3D"
          scale={[2, 6, 1]}
          position={[-5, 0, -2]}
        />
      </Environment>

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.6}>
        <group ref={groupRef} rotation={[-0.08, -0.28, 0]}>
          <mesh
            geometry={geometry}
            material={material}
            scale={0.85}
            castShadow
            receiveShadow
          />
        </group>
      </Float>
    </>
  );
};
