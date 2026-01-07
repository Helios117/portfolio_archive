'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo } from 'react';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

interface EarthProps {
  isDark: boolean;
}

function Continents({ color }: { color: string }) {
  // Simplified geometric continents for a stylized 3D icon look
  const material = useMemo(() => new THREE.MeshStandardMaterial({
    color: color,
    roughness: 0.8,
    metalness: 0.1,
    flatShading: true
  }), [color]);

  return (
    <group rotation={[0.2, 0.5, 0]}>
      {/* North America */}
      <mesh position={[-0.4, 0.5, 0.7]} rotation={[0.1, -0.2, 0]} material={material}>
        <sphereGeometry args={[0.3, 7, 7]} />
      </mesh>
      {/* South America */}
      <mesh position={[-0.2, -0.4, 0.75]} rotation={[0, -0.1, 0]} material={material}>
        <sphereGeometry args={[0.25, 7, 7]} />
      </mesh>
      {/* Europe/Africa */}
      <mesh position={[0.6, 0.1, 0.6]} rotation={[0, 0.3, 0]} material={material}>
        <sphereGeometry args={[0.35, 7, 7]} />
      </mesh>
      {/* Asia */}
      <mesh position={[0.8, 0.5, 0.2]} rotation={[0, 0.5, 0]} material={material}>
        <sphereGeometry args={[0.4, 7, 7]} />
      </mesh>
    </group>
  );
}

function EarthModel({ isDark }: { isDark: boolean }) {
  const earthRef = useRef<THREE.Group>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Ocean material - shiny and reflective
  const oceanMaterial = useMemo(() => new THREE.MeshPhysicalMaterial({
    color: isDark ? '#1a3b5c' : '#2E6F9E',
    roughness: 0.2,
    metalness: 0.1,
    transmission: 0,
    reflectivity: 1,
    clearcoat: 1,
    clearcoatRoughness: 0.1,
  }), [isDark]);

  useFrame((state) => {
    if (!earthRef.current || !lightRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate Earth slowly
    earthRef.current.rotation.y = time * 0.1;

    // Orbit the light to match Chariot's movement
    // Chariot speed was 0.25
    const orbitSpeed = 0.25;
    const radius = 3;
    
    // Position light to simulate the Chariot orbiting
    lightRef.current.position.x = Math.cos(time * orbitSpeed) * radius;
    lightRef.current.position.z = Math.sin(time * orbitSpeed) * radius;
    lightRef.current.position.y = Math.sin(time * 0.5) * 0.5; // Slight vertical bob
  });

  return (
    <group>
      {/* Dynamic Light Source (The Chariot) */}
      <pointLight 
        ref={lightRef}
        intensity={isDark ? 20 : 35} 
        color="#FFD700" 
        distance={10} 
        decay={2} 
      />
      
      {/* Ambient fill */}
      <ambientLight intensity={isDark ? 0.2 : 0.8} />

      <Float speed={2} rotationIntensity={0.2} floatIntensity={0.2}>
        <group ref={earthRef}>
          {/* Base Ocean Sphere */}
          <mesh material={oceanMaterial}>
            <sphereGeometry args={[1, 32, 32]} />
          </mesh>
          
          {/* Continents - intersecting spheres for stylized look */}
          <Continents color={isDark ? '#2d5a35' : '#4CAF50'} />
          
          {/* Atmosphere Glow (Simple backside scale) */}
          <mesh scale={1.1} position={[0, 0, -0.1]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color="#4B8BBE" 
              transparent 
              opacity={0.15} 
              side={THREE.BackSide} 
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function EarthMini({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="w-full h-full">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 3.5], fov: 35 }}
      >
        <EarthModel isDark={isDark} />
      </Canvas>
    </div>
  );
}
