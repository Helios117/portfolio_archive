'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

interface GreekBustProps {
  scale?: number;
}

// Procedural Greek Bust - A stylized marble bust created with geometry
export function GreekBust({ scale = 1 }: GreekBustProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { viewport, pointer } = useThree();

  // Create marble-like material
  const marbleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f5f5f0',
      roughness: 0.3,
      metalness: 0.1,
      envMapIntensity: 0.8,
    });
  }, []);

  // Create gold accent material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      roughness: 0.2,
      metalness: 0.9,
      emissive: '#D4AF37',
      emissiveIntensity: 0.1,
    });
  }, []);

  // Parallax effect - tilt toward cursor
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.1;
    
    // Parallax tilt based on mouse position
    const targetRotationX = pointer.y * 0.15;
    const targetRotationZ = -pointer.x * 0.1;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.05
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationZ,
      0.05
    );
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.2}
      floatIntensity={0.5}
    >
      <group ref={groupRef} scale={scale}>
        {/* Head - Main sphere */}
        <mesh position={[0, 1.8, 0]} material={marbleMaterial}>
          <sphereGeometry args={[0.5, 64, 64]} />
        </mesh>

        {/* Face features - Nose */}
        <mesh position={[0, 1.75, 0.45]} rotation={[0.3, 0, 0]} material={marbleMaterial}>
          <coneGeometry args={[0.08, 0.25, 4]} />
        </mesh>

        {/* Brow ridge */}
        <mesh position={[0, 1.95, 0.35]} rotation={[0.5, 0, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.35, 0.06, 0.15]} />
        </mesh>

        {/* Eye sockets */}
        <mesh position={[-0.15, 1.85, 0.38]} material={marbleMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>
        <mesh position={[0.15, 1.85, 0.38]} material={marbleMaterial}>
          <sphereGeometry args={[0.07, 16, 16]} />
        </mesh>

        {/* Lips */}
        <mesh position={[0, 1.6, 0.42]} rotation={[0.2, 0, 0]} material={marbleMaterial}>
          <capsuleGeometry args={[0.03, 0.12, 4, 8]} />
        </mesh>

        {/* Chin */}
        <mesh position={[0, 1.45, 0.3]} material={marbleMaterial}>
          <sphereGeometry args={[0.15, 32, 32]} />
        </mesh>

        {/* Neck */}
        <mesh position={[0, 1.1, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.2, 0.25, 0.5, 32]} />
        </mesh>

        {/* Shoulders/Chest base */}
        <mesh position={[0, 0.7, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.5, 0.6, 0.4, 32]} />
        </mesh>

        {/* Pedestal top */}
        <mesh position={[0, 0.35, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.55, 0.6, 0.3, 32]} />
        </mesh>

        {/* Pedestal middle */}
        <mesh position={[0, 0, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.45, 0.5, 0.4, 32]} />
        </mesh>

        {/* Pedestal base */}
        <mesh position={[0, -0.35, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.6, 0.65, 0.3, 32]} />
        </mesh>

        {/* Golden laurel wreath accent - left side */}
        <mesh position={[-0.35, 2.1, 0.1]} rotation={[0, 0, 0.3]} material={goldMaterial}>
          <torusGeometry args={[0.2, 0.02, 8, 32, Math.PI]} />
        </mesh>
        
        {/* Golden laurel wreath accent - right side */}
        <mesh position={[0.35, 2.1, 0.1]} rotation={[0, 0, -0.3]} material={goldMaterial}>
          <torusGeometry args={[0.2, 0.02, 8, 32, Math.PI]} />
        </mesh>

        {/* Laurel leaves - left */}
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={`leaf-l-${i}`}
            position={[-0.4 - i * 0.05, 2.05 + i * 0.08, 0.1]} 
            rotation={[0.2, 0.5, 0.8 + i * 0.15]}
            material={goldMaterial}
          >
            <capsuleGeometry args={[0.015, 0.06, 2, 4]} />
          </mesh>
        ))}

        {/* Laurel leaves - right */}
        {[...Array(5)].map((_, i) => (
          <mesh 
            key={`leaf-r-${i}`}
            position={[0.4 + i * 0.05, 2.05 + i * 0.08, 0.1]} 
            rotation={[0.2, -0.5, -0.8 - i * 0.15]}
            material={goldMaterial}
          >
            <capsuleGeometry args={[0.015, 0.06, 2, 4]} />
          </mesh>
        ))}

        {/* Hair - curly texture using multiple small spheres */}
        {[...Array(30)].map((_, i) => {
          const angle = (i / 30) * Math.PI * 2;
          const row = Math.floor(i / 10);
          const radius = 0.45 + row * 0.05;
          const y = 2.0 + row * 0.1;
          
          return (
            <mesh
              key={`hair-${i}`}
              position={[
                Math.cos(angle) * radius,
                y + Math.sin(i * 3) * 0.05,
                Math.sin(angle) * radius - 0.1,
              ]}
              material={marbleMaterial}
            >
              <sphereGeometry args={[0.08 - row * 0.02, 8, 8]} />
            </mesh>
          );
        })}
      </group>
    </Float>
  );
}

// Greek Column/Pillar
export function GreekPillar({ scale = 1, position = [0, 0, 0] as [number, number, number] }) {
  const groupRef = useRef<THREE.Group>(null);

  const marbleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#f0ebe3',
      roughness: 0.4,
      metalness: 0.05,
    });
  }, []);

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Capital (top) */}
        <mesh position={[0, 2.2, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.8, 0.15, 0.8]} />
        </mesh>
        <mesh position={[0, 2.05, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.35, 0.3, 0.15, 32]} />
        </mesh>

        {/* Fluted column shaft */}
        <mesh position={[0, 1, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.25, 0.3, 2, 20]} />
        </mesh>

        {/* Fluting details */}
        {[...Array(12)].map((_, i) => {
          const angle = (i / 12) * Math.PI * 2;
          return (
            <mesh
              key={`flute-${i}`}
              position={[Math.cos(angle) * 0.28, 1, Math.sin(angle) * 0.28]}
              material={marbleMaterial}
            >
              <boxGeometry args={[0.04, 2, 0.08]} />
            </mesh>
          );
        })}

        {/* Base */}
        <mesh position={[0, -0.15, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.35, 0.4, 0.3, 32]} />
        </mesh>
        <mesh position={[0, -0.35, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.9, 0.1, 0.9]} />
        </mesh>
      </group>
    </Float>
  );
}

export default GreekBust;
