import React, { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox, useTexture } from "@react-three/drei";

interface LaptopProps {
  textureUrl: string;
  onClick?: () => void;
}

export const Laptop: React.FC<LaptopProps> = ({ textureUrl, onClick }) => {
  const texture = useTexture(textureUrl);

  useMemo(() => {
    if (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.anisotropy = 4;
      texture.needsUpdate = true;
    }
  }, [texture]);

  const bodyMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#1B2233",
        metalness: 0.6,
        roughness: 0.35,
      }),
    []
  );

  const screenMaterial = useMemo(
    () =>
      new THREE.MeshBasicMaterial({
        map: texture,
        toneMapped: false,
      }),
    [texture]
  );

  // Opened to 102 degrees: tilted backwards by 12 degrees from vertical (90 deg)
  const lidAngle = (-12 * Math.PI) / 180;

  return (
    <group onClick={onClick}>
      {/* Laptop Base: 3.2 wide, 0.14 thick, 2.1 deep */}
      <RoundedBox
        args={[3.2, 0.14, 2.1]}
        radius={0.05}
        material={bodyMaterial}
        castShadow
        receiveShadow
      />

      {/* Hinge at the base's back edge: z = -1.05, y = 0.07 */}
      <group position={[0, 0.07, -1.05]} rotation={[lidAngle, 0, 0]}>
        {/* Lid: 3.2 wide, 2.05 tall, 0.08 deep */}
        <RoundedBox
          args={[3.2, 2.05, 0.08]}
          radius={0.05}
          position={[0, 1.025, 0]}
          material={bodyMaterial}
          castShadow
        />

        {/* Screen: 3.0 wide, 1.875 tall (1440:900), 0.045 in front of lid face */}
        <mesh position={[0, 1.025, 0.045]} material={screenMaterial}>
          <planeGeometry args={[3.0, 1.875]} />
        </mesh>
      </group>
    </group>
  );
};
