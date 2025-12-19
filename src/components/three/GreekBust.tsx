'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeliosBustProps {
  scale?: number;
  isDark?: boolean;
}

// Helios - The Sun God Bust with Radiant Crown
export function GreekBust({ scale = 1, isDark = true }: HeliosBustProps) {
  const groupRef = useRef<THREE.Group>(null);
  const crownRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Create marble-like material
  const marbleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#f5f5f0' : '#e8dcc8',
      roughness: isDark ? 0.3 : 0.35,
      metalness: isDark ? 0.1 : 0.15,
      envMapIntensity: isDark ? 0.8 : 1.0,
    });
  }, [isDark]);

  // Create gold accent material - more radiant for Helios
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.15,
      metalness: 0.95,
      emissive: '#FF8C00',
      emissiveIntensity: isDark ? 0.4 : 0.5,
    });
  }, [isDark]);

  // Glowing sun material for the crown rays
  const sunGlowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFA500',
      roughness: 0.1,
      metalness: 0.8,
      emissive: '#FF4500',
      emissiveIntensity: isDark ? 0.6 : 0.7,
      transparent: true,
      opacity: 0.9,
    });
  }, [isDark]);

  // Parallax effect - tilt toward cursor
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.08;
    
    // Parallax tilt based on mouse position
    const targetRotationX = pointer.y * 0.12;
    const targetRotationZ = -pointer.x * 0.08;
    
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

    // Animate crown rays
    if (crownRef.current) {
      crownRef.current.rotation.z = time * 0.3;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.15}
      floatIntensity={0.4}
    >
      <group ref={groupRef} scale={scale}>
        {/* Head - Main sphere with more defined features */}
        <mesh position={[0, 1.8, 0]} material={marbleMaterial}>
          <sphereGeometry args={[0.52, 64, 64]} />
        </mesh>

        {/* Forehead - slightly prominent */}
        <mesh position={[0, 2.0, 0.25]} material={marbleMaterial}>
          <sphereGeometry args={[0.35, 32, 32]} />
        </mesh>

        {/* Face features - Noble Nose */}
        <mesh position={[0, 1.75, 0.48]} rotation={[0.3, 0, 0]} material={marbleMaterial}>
          <coneGeometry args={[0.07, 0.28, 4]} />
        </mesh>

        {/* Nose bridge */}
        <mesh position={[0, 1.85, 0.42]} rotation={[0.2, 0, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.06, 0.15, 0.1]} />
        </mesh>

        {/* Brow ridge - more defined */}
        <mesh position={[0, 1.98, 0.38]} rotation={[0.4, 0, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.4, 0.08, 0.12]} />
        </mesh>

        {/* Eye sockets - deeper set */}
        <mesh position={[-0.16, 1.88, 0.4]} material={marbleMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>
        <mesh position={[0.16, 1.88, 0.4]} material={marbleMaterial}>
          <sphereGeometry args={[0.08, 16, 16]} />
        </mesh>

        {/* Cheekbones */}
        <mesh position={[-0.28, 1.7, 0.28]} material={marbleMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>
        <mesh position={[0.28, 1.7, 0.28]} material={marbleMaterial}>
          <sphereGeometry args={[0.12, 16, 16]} />
        </mesh>

        {/* Lips */}
        <mesh position={[0, 1.58, 0.44]} rotation={[0.1, 0, 0]} material={marbleMaterial}>
          <capsuleGeometry args={[0.035, 0.1, 4, 8]} />
        </mesh>

        {/* Chin - strong */}
        <mesh position={[0, 1.42, 0.32]} material={marbleMaterial}>
          <sphereGeometry args={[0.16, 32, 32]} />
        </mesh>

        {/* Jaw line */}
        <mesh position={[-0.2, 1.5, 0.2]} rotation={[0, 0.3, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
        </mesh>
        <mesh position={[0.2, 1.5, 0.2]} rotation={[0, -0.3, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.15, 0.1, 0.2]} />
        </mesh>

        {/* Neck - strong */}
        <mesh position={[0, 1.05, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.22, 0.28, 0.55, 32]} />
        </mesh>

        {/* Shoulders/Chest base */}
        <mesh position={[0, 0.65, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.55, 0.65, 0.45, 32]} />
        </mesh>

        {/* Shoulder definition */}
        <mesh position={[-0.4, 0.7, 0]} rotation={[0, 0, 0.3]} material={marbleMaterial}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>
        <mesh position={[0.4, 0.7, 0]} rotation={[0, 0, -0.3]} material={marbleMaterial}>
          <sphereGeometry args={[0.2, 16, 16]} />
        </mesh>

        {/* Pedestal top */}
        <mesh position={[0, 0.3, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.58, 0.65, 0.25, 32]} />
        </mesh>

        {/* Pedestal middle with decorative groove */}
        <mesh position={[0, 0.05, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.5, 0.55, 0.25, 32]} />
        </mesh>

        {/* Pedestal base */}
        <mesh position={[0, -0.2, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.62, 0.7, 0.25, 32]} />
        </mesh>

        {/* === HELIOS SUN CROWN === */}
        <group ref={crownRef} position={[0, 2.35, 0]}>
          {/* Central sun disc */}
          <mesh material={goldMaterial}>
            <sphereGeometry args={[0.12, 32, 32]} />
          </mesh>

          {/* Main radiant rays - 12 rays like clock positions */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const rayLength = i % 2 === 0 ? 0.35 : 0.25; // Alternating lengths
            const rayWidth = i % 2 === 0 ? 0.025 : 0.018;
            
            return (
              <group key={`ray-${i}`} rotation={[0, 0, angle]}>
                <mesh 
                  position={[0, rayLength / 2 + 0.12, 0]}
                  material={i % 2 === 0 ? sunGlowMaterial : goldMaterial}
                >
                  <boxGeometry args={[rayWidth, rayLength, 0.015]} />
                </mesh>
                {/* Ray tip - pointed */}
                <mesh 
                  position={[0, rayLength + 0.12, 0]}
                  rotation={[0, 0, Math.PI]}
                  material={sunGlowMaterial}
                >
                  <coneGeometry args={[rayWidth * 1.5, 0.06, 4]} />
                </mesh>
              </group>
            );
          })}

          {/* Inner glow ring */}
          <mesh material={goldMaterial}>
            <torusGeometry args={[0.15, 0.02, 8, 32]} />
          </mesh>
        </group>

        {/* Hair - simplified curly Greek style (removed separate spheres, using smoother mesh) */}
        <mesh position={[0, 2.0, -0.15]} material={marbleMaterial}>
          <sphereGeometry args={[0.45, 32, 32, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        </mesh>
        
        {/* Side hair */}
        <mesh position={[-0.35, 1.8, 0]} material={marbleMaterial}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>
        <mesh position={[0.35, 1.8, 0]} material={marbleMaterial}>
          <sphereGeometry args={[0.18, 16, 16]} />
        </mesh>

        {/* Decorative sun emblem on chest */}
        <group position={[0, 0.55, 0.55]} rotation={[Math.PI * 0.1, 0, 0]}>
          <mesh material={goldMaterial}>
            <circleGeometry args={[0.08, 16]} />
          </mesh>
          {[...Array(8)].map((_, i) => (
            <mesh
              key={`chest-ray-${i}`}
              position={[
                Math.cos((i / 8) * Math.PI * 2) * 0.12,
                Math.sin((i / 8) * Math.PI * 2) * 0.12,
                0.01,
              ]}
              rotation={[0, 0, (i / 8) * Math.PI * 2]}
              material={goldMaterial}
            >
              <boxGeometry args={[0.015, 0.05, 0.01]} />
            </mesh>
          ))}
        </group>
      </group>
    </Float>
  );
}

// Greek Column/Pillar - Enhanced
export function GreekPillar({ scale = 1, position = [0, 0, 0] as [number, number, number], isDark = true }) {
  const groupRef = useRef<THREE.Group>(null);

  const marbleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#f0ebe3' : '#ddd0bc',
      roughness: isDark ? 0.4 : 0.4,
      metalness: isDark ? 0.05 : 0.1,
    });
  }, [isDark]);

  const goldAccent = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      roughness: 0.3,
      metalness: 0.7,
      emissive: '#D4AF37',
      emissiveIntensity: isDark ? 0.1 : 0.15,
    });
  }, [isDark]);

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef} position={position} scale={scale}>
        {/* Capital (top) - Ionic style */}
        <mesh position={[0, 2.25, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.85, 0.12, 0.85]} />
        </mesh>
        
        {/* Volutes (scrolls) */}
        <mesh position={[-0.35, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={marbleMaterial}>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
        </mesh>
        <mesh position={[0.35, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]} material={marbleMaterial}>
          <torusGeometry args={[0.1, 0.03, 8, 16]} />
        </mesh>

        <mesh position={[0, 2.0, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.32, 0.28, 0.15, 32]} />
        </mesh>

        {/* Gold ring accent */}
        <mesh position={[0, 1.92, 0]} material={goldAccent}>
          <torusGeometry args={[0.29, 0.015, 8, 32]} />
        </mesh>

        {/* Fluted column shaft */}
        <mesh position={[0, 1, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.25, 0.3, 1.8, 20]} />
        </mesh>

        {/* Fluting details */}
        {[...Array(16)].map((_, i) => {
          const angle = (i / 16) * Math.PI * 2;
          return (
            <mesh
              key={`flute-${i}`}
              position={[Math.cos(angle) * 0.27, 1, Math.sin(angle) * 0.27]}
              material={marbleMaterial}
            >
              <boxGeometry args={[0.03, 1.8, 0.06]} />
            </mesh>
          );
        })}

        {/* Base with gold accent */}
        <mesh position={[0, 0.05, 0]} material={goldAccent}>
          <torusGeometry args={[0.32, 0.015, 8, 32]} />
        </mesh>
        
        <mesh position={[0, -0.1, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.35, 0.4, 0.25, 32]} />
        </mesh>
        <mesh position={[0, -0.3, 0]} material={marbleMaterial}>
          <boxGeometry args={[0.95, 0.12, 0.95]} />
        </mesh>
      </group>
    </Float>
  );
}

export default GreekBust;
