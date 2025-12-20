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
    <group ref={sunRef} position={[-0.3, 1.0, 0]}>
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

      {/* Sun rays - 12 rotating rays - facing viewer */}
      <group ref={raysRef} rotation={[0, Math.PI / 2, 0]}>
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

// Greek/Roman Chariot - Greek Pottery Style with flowing curves
function Chariot({ isDark = true }: { isDark?: boolean }) {
  const chariotRef = useRef<THREE.Group>(null);

  // Bronze/gold material for chariot body
  const bronzeMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#CD7F32' : '#B87333',
      roughness: 0.3,
      metalness: 0.9,
      emissive: '#8B4513',
      emissiveIntensity: isDark ? 0.1 : 0.15,
      side: THREE.DoubleSide,
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
      side: THREE.DoubleSide,
    });
  }, [isDark]);

  // Dark interior material
  const darkMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#1a1a1a' : '#2d2d2d',
      roughness: 0.8,
      metalness: 0.1,
      side: THREE.DoubleSide,
    });
  }, [isDark]);

  // Create the chariot body shape using a custom curve
  const chariotShape = useMemo(() => {
    const shape = new THREE.Shape();
    
    // Start at bottom back
    shape.moveTo(0.5, 0);
    
    // Curve up for the back wall (high curve like in reference)
    shape.bezierCurveTo(0.55, 0.3, 0.5, 0.7, 0.35, 1.0);
    
    // Top of back wall curves forward
    shape.bezierCurveTo(0.2, 1.1, 0, 1.05, -0.2, 0.9);
    
    // Front curves down and forward (sweeping front like in reference)
    shape.bezierCurveTo(-0.5, 0.7, -0.8, 0.5, -1.0, 0.35);
    
    // Front tip curves down
    shape.bezierCurveTo(-1.1, 0.25, -1.15, 0.15, -1.1, 0.05);
    
    // Bottom edge with decorative wave (flame/feather pattern)
    shape.bezierCurveTo(-1.0, 0.0, -0.8, 0.08, -0.6, 0.0);
    shape.bezierCurveTo(-0.4, -0.05, -0.2, 0.05, 0, 0.0);
    shape.bezierCurveTo(0.2, -0.03, 0.4, 0.02, 0.5, 0);
    
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    steps: 1,
    depth: 0.8,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelSegments: 3,
  }), []);

  return (
    <group ref={chariotRef} position={[0, -0.1, 0]} rotation={[0, Math.PI * 0.1, 0]} scale={1.0}>
      
      {/* Main chariot body - extruded shape */}
      <mesh position={[0.3, 0, -0.4]} material={bronzeMaterial}>
        <extrudeGeometry args={[chariotShape, extrudeSettings]} />
      </mesh>
      
      {/* Inner dark panel for depth */}
      <mesh position={[0.28, 0.02, -0.38]} scale={[0.92, 0.92, 0.95]} material={darkMaterial}>
        <extrudeGeometry args={[chariotShape, { ...extrudeSettings, depth: 0.76, bevelEnabled: false }]} />
      </mesh>
      
      {/* Gold trim along top edge */}
      <mesh position={[0.3, 0.03, -0.4]} scale={[1.02, 1.02, 1.01]}>
        <extrudeGeometry args={[chariotShape, { ...extrudeSettings, depth: 0.02, bevelEnabled: false }]} />
        <meshStandardMaterial {...goldMaterial} />
      </mesh>
      
      {/* Floor of chariot */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]} material={darkMaterial}>
        <planeGeometry args={[0.9, 0.7]} />
      </mesh>
      
      {/* Decorative gold band along bottom */}
      {[...Array(6)].map((_, i) => {
        const t = i / 5;
        const x = 0.4 - t * 1.3;
        const y = 0.05 + Math.sin(t * Math.PI) * 0.03;
        return (
          <mesh key={`bottom-${i}`} position={[x, y, 0]} material={goldMaterial}>
            <sphereGeometry args={[0.025, 8, 8]} />
          </mesh>
        );
      })}
      
      {/* Left side decorative elements - flame/feather pattern */}
      {[...Array(5)].map((_, i) => {
        const t = i / 4;
        const x = 0.3 - t * 1.1;
        const baseY = 0.1 + t * 0.15;
        return (
          <mesh 
            key={`flame-left-${i}`} 
            position={[x, baseY, -0.42]}
            rotation={[0, 0, -0.3 - t * 0.4]}
            material={goldMaterial}
          >
            <coneGeometry args={[0.03, 0.15 + t * 0.1, 4]} />
          </mesh>
        );
      })}
      
      {/* Right side decorative elements */}
      {[...Array(5)].map((_, i) => {
        const t = i / 4;
        const x = 0.3 - t * 1.1;
        const baseY = 0.1 + t * 0.15;
        return (
          <mesh 
            key={`flame-right-${i}`} 
            position={[x, baseY, 0.42]}
            rotation={[0, 0, -0.3 - t * 0.4]}
            material={goldMaterial}
          >
            <coneGeometry args={[0.03, 0.15 + t * 0.1, 4]} />
          </mesh>
        );
      })}
      
      {/* Chariot wheels - larger and properly oriented */}
      <group position={[0.15, 0, -0.65]}>
        <GreekWheel isDark={isDark} />
      </group>
      <group position={[0.15, 0, 0.65]}>
        <GreekWheel isDark={isDark} />
      </group>

      {/* Axle */}
      <mesh position={[0.15, 0, 0]} rotation={[Math.PI / 2, 0, 0]} material={bronzeMaterial}>
        <cylinderGeometry args={[0.04, 0.04, 1.4, 16]} />
      </mesh>
      
      {/* Axle caps */}
      <mesh position={[0.15, 0, -0.72]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.06, 0.05, 0.06, 16]} />
      </mesh>
      <mesh position={[0.15, 0, 0.72]} rotation={[Math.PI / 2, 0, 0]} material={goldMaterial}>
        <cylinderGeometry args={[0.06, 0.05, 0.06, 16]} />
      </mesh>
      
      {/* Connection point to horses (at front) */}
      <mesh position={[-0.85, 0.15, 0]} rotation={[0, 0, -0.2]} material={bronzeMaterial}>
        <cylinderGeometry args={[0.02, 0.025, 0.4, 8]} />
      </mesh>
    </group>
  );
}

// Greek-style wheel with detailed spokes and decorative hub
function GreekWheel({ isDark = true }: { isDark?: boolean }) {
  const wheelRef = useRef<THREE.Group>(null);

  const rimMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: '#8B4513',
      roughness: 0.4,
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

  const darkMaterial = useMemo(() => {
    return new THREE.MeshStandardMaterial({
      color: isDark ? '#1a1a1a' : '#2d2d2d',
      roughness: 0.9,
      metalness: 0.0,
    });
  }, [isDark]);

  useFrame((state) => {
    if (wheelRef.current) {
      // Rotate clockwise around Z axis
      wheelRef.current.rotation.z = -state.clock.getElapsedTime() * 0.5;
    }
  });

  return (
    <group ref={wheelRef}>
      {/* Outer rim - in XY plane (default torus orientation) */}
      <mesh material={rimMaterial}>
        <torusGeometry args={[0.55, 0.065, 16, 32]} />
      </mesh>
      
      {/* Inner rim detail */}
      <mesh material={hubMaterial}>
        <torusGeometry args={[0.48, 0.03, 12, 32]} />
      </mesh>
      
      {/* Hub - cylinder along Z axis */}
      <mesh rotation={[Math.PI / 2, 0, 0]} material={hubMaterial}>
        <cylinderGeometry args={[0.14, 0.14, 0.12, 24]} />
      </mesh>
      
      {/* Hub center cap */}
      <mesh position={[0, 0, 0.07]} rotation={[Math.PI / 2, 0, 0]} material={spokeMaterial}>
        <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
      </mesh>
      
      {/* Hub center dark circle */}
      <mesh position={[0, 0, 0.08]} rotation={[Math.PI / 2, 0, 0]} material={darkMaterial}>
        <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
      </mesh>
      
      {/* Hub decorative ring */}
      <mesh material={spokeMaterial}>
        <torusGeometry args={[0.12, 0.015, 8, 24]} />
      </mesh>
      
      {/* 8 spokes - radial from center to rim in XY plane */}
      {[...Array(8)].map((_, i) => {
        const angle = (i * 45) * (Math.PI / 180);
        const spokeLength = 0.36;
        const spokeRadius = 0.14 + spokeLength / 2; // Start from hub edge
        return (
          <mesh
            key={i}
            position={[
              Math.cos(angle) * spokeRadius,
              Math.sin(angle) * spokeRadius,
              0
            ]}
            rotation={[0, 0, angle]}
            material={spokeMaterial}
          >
            <boxGeometry args={[spokeLength, 0.035, 0.025]} />
          </mesh>
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
