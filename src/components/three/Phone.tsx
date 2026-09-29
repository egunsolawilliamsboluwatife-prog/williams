import React, { useMemo } from "react";
import * as THREE from "three";
import { RoundedBox, useTexture } from "@react-three/drei";

interface PhoneProps {
  textureUrl: string;
  onClick?: () => void;
}

export const Phone: React.FC<PhoneProps> = ({ textureUrl, onClick }) => {
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

  return (
    <group onClick={onClick}>
      {/* Phone body: 0.95 wide, 2.02 tall, 0.09 deep, radius 0.12 */}
      <RoundedBox
        args={[0.95, 2.02, 0.09]}
        radius={0.12}
        material={bodyMaterial}
        castShadow
        receiveShadow
      />

      {/* Screen: 0.87 wide, 1.88 tall (390:844), 0.05 in front */}
      <mesh position={[0, 0, 0.05]} material={screenMaterial}>
        <planeGeometry args={[0.87, 1.88]} />
      </mesh>
    </group>
  );
};
