'use client';

import { useRef, useMemo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface HeliosChariotProps {
  scale?: number;
  isDark?: boolean;
}

// Helios Sun - Radiant celestial body
function HeliosSun({ isDark = true }: { isDark?: boolean }) {
  const sunRef = useRef<THREE.Group>(null);
  const raysRef = useRef<THREE.Group>(null);
  const coronaRef = useRef<THREE.Mesh>(null);

  // Sun core material
  const sunCoreMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.1,
      metalness: 0.9,
      emissive: '#FF8C00',
      emissiveIntensity: isDark ? 0.8 : 1.0,
    });
  }, [isDark]);

  // Sun glow material
  const sunGlowMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFA500',
      roughness: 0.0,
      metalness: 0.8,
      emissive: '#FF4500',
      emissiveIntensity: isDark ? 1.0 : 1.2,
      transparent: true,
      opacity: 0.6,
    });
  }, [isDark]);

  // Ray material
  const rayMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.2,
      metalness: 0.95,
      emissive: '#FF6B00',
      emissiveIntensity: isDark ? 0.6 : 0.8,
    });
  }, [isDark]);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (raysRef.current) {
      raysRef.current.rotation.z = time * 0.3;
    }
    
    if (coronaRef.current) {
      coronaRef.current.scale.setScalar(1 + Math.sin(time * 2) * 0.05);
    }
  });

  return (
    <group ref={sunRef} position={[0, 1.0, 0.1]}>
      {/* Sun core */}
      <mesh material={sunCoreMaterial}>
        <sphereGeometry args={[0.45, 64, 64]} />
      </mesh>

      {/* Corona glow */}
      <mesh ref={coronaRef} material={sunGlowMaterial}>
        <sphereGeometry args={[0.55, 32, 32]} />
      </mesh>

      {/* Outer glow */}
      <mesh material={sunGlowMaterial}>
        <sphereGeometry args={[0.68, 32, 32]} />
      </mesh>

      {/* Sun rays - 12 rotating rays only */}
      <group ref={raysRef}>
        {[...Array(12)].map((_, i) => {
          const angle = (i * 30) * (Math.PI / 180);
          return (
            <mesh
              key={i}
              position={[
                Math.cos(angle) * 0.68,
                Math.sin(angle) * 0.68,
                0
              ]}
              rotation={[0, 0, angle - Math.PI / 2]}
              material={rayMaterial}
            >
              <coneGeometry args={[0.07, 0.45, 6]} />
            </mesh>
          );
        })}
      </group>

      {/* Point light for glow effect */}
      <pointLight
        color="#FFD700"
        intensity={isDark ? 2 : 3}
        distance={8}
        decay={2}
      />
    </group>
  );
}

// Greek/Roman Chariot - Curved design with proper scaling
function Chariot({ isDark = true }: { isDark?: boolean }) {
  const chariotRef = useRef<THREE.Group>(null);

  // Bronze/gold material for chariot
  const bronzeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#CD7F32' : '#B87333',
      roughness: 0.3,
      metalness: 0.9,
      emissive: '#8B4513',
      emissiveIntensity: isDark ? 0.1 : 0.15,
      side: THREE.FrontSide,
    });
  }, [isDark]);

  // Gold accent material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.2,
      metalness: 0.95,
      emissive: '#D4AF37',
      emissiveIntensity: isDark ? 0.2 : 0.3,
    });
  }, [isDark]);

  // Rich wood material
  const woodMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#5D4037' : '#6D4C41',
      roughness: 0.6,
      metalness: 0.05,
      side: THREE.DoubleSide,
    });
  }, [isDark]);

  // Dark leather/fabric - only for interior
  const leatherMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#2C1810' : '#3E2723',
      roughness: 0.8,
      metalness: 0.0,
      side: THREE.BackSide,
    });
  }, [isDark]);

  return (
    <group ref={chariotRef} position={[0, -0.25, 0]} rotation={[0, Math.PI * 0.15, 0]} scale={1.15}>
      {/* Main chariot body - curved shell */}
      <mesh position={[0, 0.45, -0.1]} rotation={[0.15, 0, 0]} material={bronzeMaterial}>
        <cylinderGeometry args={[0.9, 0.7, 0.8, 32, 1, true, -Math.PI * 0.7, Math.PI * 1.4]} />
      </mesh>

      {/* Inner lining - using BackSide to show inside only */}
      <mesh position={[0, 0.45, -0.1]} rotation={[0.15, 0, 0]} material={leatherMaterial}>
        <cylinderGeometry args={[0.89, 0.69, 0.79, 32, 1, true, -Math.PI * 0.7, Math.PI * 1.4]} />
      </mesh>

      {/* Chariot floor - curved */}
      <mesh position={[0, 0.08, 0.15]} rotation={[-0.05, 0, 0]} material={woodMaterial}>
        <cylinderGeometry args={[0.75, 0.75, 0.1, 32, 1, false, -Math.PI * 0.5, Math.PI]} />
      </mesh>

      {/* Front curved panel - ornate */}
      <mesh position={[0, 0.5, -0.68]} rotation={[0.15, 0, 0]} material={goldMaterial}>
        <boxGeometry args={[1.5, 0.7, 0.06]} />
      </mesh>

      {/* Decorative ridge on front */}
      <mesh position={[0, 0.85, -0.65]} rotation={[0.15, 0, 0]} material={goldMaterial}>
        <boxGeometry args={[1.6, 0.08, 0.08]} />
      </mesh>

      {/* Side rails - curved bronze */}
      <mesh position={[-0.72, 0.55, 0.1]} rotation={[0, 0.1, 0.1]} material={bronzeMaterial}>
        <boxGeometry args={[0.06, 0.6, 0.9]} />
      </mesh>
      <mesh position={[0.72, 0.55, 0.1]} rotation={[0, -0.1, -0.1]} material={bronzeMaterial}>
        <boxGeometry args={[0.06, 0.6, 0.9]} />
      </mesh>

      {/* Decorative corner finials */}
      <mesh position={[-0.7, 0.9, -0.35]} material={goldMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh position={[0.7, 0.9, -0.35]} material={goldMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>
      <mesh position={[-0.7, 0.9, 0.5]} material={goldMaterial}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>
      <mesh position={[0.7, 0.9, 0.5]} material={goldMaterial}>
        <sphereGeometry args={[0.06, 16, 16]} />
      </mesh>

      {/* Sun disc emblem on front */}
      <mesh position={[0, 0.55, -0.6]} material={goldMaterial}>
        <circleGeometry args={[0.2, 32]} />
      </mesh>
      <mesh position={[0, 0.55, -0.62]} material={goldMaterial}>
        <torusGeometry args={[0.22, 0.025, 16, 32]} />
      </mesh>

      {/* Decorative rays on emblem */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * 0.28,
              0.55 + Math.sin(angle) * 0.28,
              -0.61
            ]}
            rotation={[0, 0, angle]}
            material={goldMaterial}
          >
            <boxGeometry args={[0.12, 0.025, 0.02]} />
          </mesh>
        );
      })}

      {/* Chariot wheels - larger and more detailed */}
      <group position={[-0.95, -0.1, 0.15]}>
        <Wheel isDark={isDark} />
      </group>
      <group position={[0.95, -0.1, 0.15]}>
        <Wheel isDark={isDark} />
      </group>

      {/* Axle - decorative */}
      <mesh position={[0, -0.1, 0.15]} rotation={[0, 0, Math.PI / 2]} material={bronzeMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 2.1, 16]} />
      </mesh>
      
      {/* Axle caps */}
      <mesh position={[-1.05, -0.1, 0.15]} rotation={[0, 0, Math.PI / 2]} material={goldMaterial}>
        <cylinderGeometry args={[0.08, 0.06, 0.08, 16]} />
      </mesh>
      <mesh position={[1.05, -0.1, 0.15]} rotation={[0, 0, Math.PI / 2]} material={goldMaterial}>
        <cylinderGeometry args={[0.08, 0.06, 0.08, 16]} />
      </mesh>

      {/* Decorative scrollwork on sides */}
      <mesh position={[-0.75, 0.3, -0.2]} rotation={[0, Math.PI / 2, 0]} material={goldMaterial}>
        <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
      </mesh>
      <mesh position={[0.75, 0.3, -0.2]} rotation={[0, -Math.PI / 2, 0]} material={goldMaterial}>
        <torusGeometry args={[0.12, 0.02, 8, 16, Math.PI]} />
      </mesh>
    </group>
  );
}

// Chariot wheel component - More detailed
function Wheel({ isDark = true }: { isDark?: boolean }) {
  const wheelRef = useRef<THREE.Group>(null);

  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#8B4513',
      roughness: 0.5,
      metalness: 0.3,
    });
  }, []);

  const hubMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#CD7F32',
      roughness: 0.3,
      metalness: 0.7,
    });
  }, []);

  const spokeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      roughness: 0.3,
      metalness: 0.8,
    });
  }, []);

  useFrame((state) => {
    if (wheelRef.current) {
      wheelRef.current.rotation.x = state.clock.getElapsedTime() * 0.4;
    }
  });

  return (
    <group ref={wheelRef} rotation={[0, Math.PI / 2, 0]}>
      {/* Outer rim */}
      <mesh material={rimMaterial}>
        <torusGeometry args={[0.5, 0.06, 16, 32]} />
      </mesh>
      
      {/* Inner rim detail */}
      <mesh material={hubMaterial}>
        <torusGeometry args={[0.45, 0.03, 12, 32]} />
      </mesh>
      
      {/* Hub - larger and more ornate */}
      <mesh material={hubMaterial}>
        <cylinderGeometry args={[0.12, 0.12, 0.15, 16]} />
      </mesh>
      
      {/* Hub cap */}
      <mesh position={[0, 0, 0.08]} material={spokeMaterial}>
        <sphereGeometry args={[0.08, 16, 16]} />
      </mesh>

      {/* Spokes - 8 detailed spokes */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        return (
          <group key={i}>
            <mesh
              position={[Math.cos(angle) * 0.28, Math.sin(angle) * 0.28, 0]}
              rotation={[0, 0, angle]}
              material={spokeMaterial}
            >
              <boxGeometry args={[0.42, 0.025, 0.025]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Main Helios Chariot component with Sun
export default function HeliosChariot({ scale = 1, isDark = true }: HeliosChariotProps) {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  // Parallax effect
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Slow rotation
    groupRef.current.rotation.y = time * 0.05 + Math.PI * 0.1;
    
    // Parallax tilt based on mouse position
    const targetRotationX = pointer.y * 0.08;
    const targetRotationZ = -pointer.x * 0.05;
    
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      targetRotationX,
      0.03
    );
    groupRef.current.rotation.z = THREE.MathUtils.lerp(
      groupRef.current.rotation.z,
      targetRotationZ,
      0.03
    );
  });

  return (
    <Float
      speed={1.2}
      rotationIntensity={0.1}
      floatIntensity={0.3}
    >
      <group ref={groupRef} scale={scale}>
        {/* The Sun above */}
        <HeliosSun isDark={isDark} />
        
        {/* The Chariot below */}
        <Chariot isDark={isDark} />
      </group>
    </Float>
  );
}

// Export pillars for scene decoration (keeping from original)
export function GreekPillar({ 
  scale = 1, 
  position = [0, 0, 0] as [number, number, number],
  isDark = true 
}: { 
  scale?: number; 
  position?: [number, number, number];
  isDark?: boolean;
}) {
  const pillarRef = useRef<THREE.Group>(null);

  const marbleMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#e8e4dc' : '#ddd0bc',
      roughness: isDark ? 0.4 : 0.45,
      metalness: isDark ? 0.1 : 0.12,
    });
  }, [isDark]);

  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#D4AF37',
      roughness: 0.3,
      metalness: 0.8,
      emissive: '#8B7500',
      emissiveIntensity: isDark ? 0.1 : 0.15,
    });
  }, [isDark]);

  return (
    <group ref={pillarRef} position={position} scale={scale}>
      {/* Base */}
      <mesh position={[0, -1.2, 0]} material={marbleMaterial}>
        <boxGeometry args={[0.6, 0.15, 0.6]} />
      </mesh>
      <mesh position={[0, -1.05, 0]} material={marbleMaterial}>
        <boxGeometry args={[0.5, 0.1, 0.5]} />
      </mesh>

      {/* Column shaft with fluting effect */}
      <mesh position={[0, 0, 0]} material={marbleMaterial}>
        <cylinderGeometry args={[0.18, 0.22, 2.1, 20]} />
      </mesh>

      {/* Capital */}
      <mesh position={[0, 1.1, 0]} material={marbleMaterial}>
        <cylinderGeometry args={[0.22, 0.18, 0.15, 20]} />
      </mesh>
      <mesh position={[0, 1.2, 0]} material={marbleMaterial}>
        <boxGeometry args={[0.45, 0.08, 0.45]} />
      </mesh>

      {/* Gold ring accent */}
      <mesh position={[0, 1.0, 0]} material={goldMaterial}>
        <torusGeometry args={[0.2, 0.015, 8, 32]} />
      </mesh>
      <mesh position={[0, -0.95, 0]} material={goldMaterial}>
        <torusGeometry args={[0.24, 0.015, 8, 32]} />
      </mesh>
    </group>
  );
}
