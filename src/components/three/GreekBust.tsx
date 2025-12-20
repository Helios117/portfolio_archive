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

  // Create gold accent material
  const goldMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#FFD700',
      roughness: 0.15,
      metalness: 0.95,
      emissive: '#FF8C00',
      emissiveIntensity: isDark ? 0.4 : 0.5,
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

    // Slow rotate crown rays
    if (crownRef.current) {
      crownRef.current.rotation.z = time * 0.15;
    }
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={0.15}
      floatIntensity={0.4}
    >
      <group ref={groupRef} scale={scale}>
        
        {/* === SIMPLE SPHERE HEAD === */}
        <mesh position={[0, 1.7, 0]} material={marbleMaterial}>
          <sphereGeometry args={[0.5, 64, 64]} />
        </mesh>

        {/* === NECK === */}
        <mesh position={[0, 1.05, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.18, 0.24, 0.5, 32]} />
        </mesh>

        {/* === SHOULDERS/CHEST === */}
        <mesh position={[0, 0.7, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.45, 0.52, 0.4, 32]} />
        </mesh>

        {/* Shoulder curves */}
        <mesh position={[-0.32, 0.75, 0]} rotation={[0, 0, 0.4]} material={marbleMaterial}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>
        <mesh position={[0.32, 0.75, 0]} rotation={[0, 0, -0.4]} material={marbleMaterial}>
          <sphereGeometry args={[0.14, 16, 16]} />
        </mesh>

        {/* === PEDESTAL === */}
        <mesh position={[0, 0.4, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.48, 0.52, 0.2, 32]} />
        </mesh>

        <mesh position={[0, 0.2, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.44, 0.46, 0.2, 32]} />
        </mesh>

        <mesh position={[0, 0, 0]} material={marbleMaterial}>
          <cylinderGeometry args={[0.5, 0.56, 0.2, 32]} />
        </mesh>

        {/* === SUN CROWN WITH RAYS === */}
        <group ref={crownRef} position={[0, 2.4, 0]}>
          
          {/* Central sun disc - front and back */}
          <mesh material={goldMaterial}>
            <circleGeometry args={[0.15, 32]} />
          </mesh>
          <mesh rotation={[0, Math.PI, 0]} material={goldMaterial}>
            <circleGeometry args={[0.15, 32]} />
          </mesh>
          
          {/* Sun disc rim */}
          <mesh material={goldMaterial}>
            <torusGeometry args={[0.15, 0.02, 16, 32]} />
          </mesh>

          {/* 12 sun rays emanating from disc */}
          {[...Array(12)].map((_, i) => {
            const angle = (i / 12) * Math.PI * 2;
            const rayLength = 0.22;
            
            return (
              <mesh
                key={`ray-${i}`}
                position={[
                  Math.cos(angle) * (0.15 + rayLength / 2 + 0.02),
                  Math.sin(angle) * (0.15 + rayLength / 2 + 0.02),
                  0
                ]}
                rotation={[0, 0, angle + Math.PI / 2]}
                material={goldMaterial}
              >
                <coneGeometry args={[0.025, rayLength, 8]} />
              </mesh>
            );
          })}
        </group>

        {/* Small sun emblem on chest */}
        <group position={[0, 0.6, 0.45]} rotation={[0.15, 0, 0]}>
          <mesh material={goldMaterial}>
            <circleGeometry args={[0.05, 16]} />
          </mesh>
          {/* Small rays on chest emblem */}
          {[...Array(8)].map((_, i) => {
            const angle = (i / 8) * Math.PI * 2;
            return (
              <mesh
                key={`chest-ray-${i}`}
                position={[
                  Math.cos(angle) * 0.08,
                  Math.sin(angle) * 0.08,
                  0.01
                ]}
                rotation={[0, 0, angle + Math.PI / 2]}
                material={goldMaterial}
              >
                <coneGeometry args={[0.008, 0.04, 4]} />
              </mesh>
            );
          })}
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
