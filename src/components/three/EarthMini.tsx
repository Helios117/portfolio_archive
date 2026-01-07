import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Float, Sphere } from '@react-three/drei';

function TexturedEarth({ isDark }: { isDark: boolean }) {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Load high-res textures
  // Using reliable standard NASA-based textures for Earth
  const [colorMap, bumpMap, specularMap, cloudsMap] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_bump.jpg',
    '/textures/earth_specular.jpg',
    '/textures/earth_clouds.jpg'
  ]);

  useFrame((state) => {
    if (!earthRef.current || !lightRef.current || !cloudsRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate Earth slowly
    earthRef.current.rotation.y = time * 0.05;
    
    // Rotate clouds slightly faster than earth for realism
    cloudsRef.current.rotation.y = time * 0.07;

    // Orbit the light to match Chariot's movement
    // Chariot speed was 0.25
    const orbitSpeed = 0.25;
    const radius = 3;
    
    // Position light to simulate the Chariot orbiting
    lightRef.current.position.x = Math.cos(time * orbitSpeed) * radius;
    lightRef.current.position.z = Math.sin(time * orbitSpeed) * radius;
    lightRef.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <group>
      {/* Dynamic Light Source (The Chariot) */}
      <pointLight 
        ref={lightRef}
        intensity={isDark ? 2.5 : 3.5} 
        color="#FFD700" 
        distance={10} 
        decay={2} 
      />
      
      {/* Ambient fill - dim to allow dramatic lighting */}
      <ambientLight intensity={isDark ? 0.05 : 0.5} />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <group ref={earthRef}>
          {/* Earth Sphere */}
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshPhongMaterial 
              map={colorMap} 
              bumpMap={bumpMap} 
              bumpScale={0.05}
              specularMap={specularMap}
              specular={new THREE.Color('grey')}
              shininess={10}
            />
          </mesh>
          
          {/* Clouds Sphere */}
          <mesh ref={cloudsRef} scale={[1.02, 1.02, 1.02]}>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              map={cloudsMap} 
              transparent={true} 
              opacity={0.4} 
              blending={THREE.AdditiveBlending}
              side={THREE.DoubleSide}
            />
          </mesh>

          {/* Atmosphere Glow (Rim Light) */}
          <mesh scale={[1.15, 1.15, 1.15]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial 
              color="#4B8BBE" 
              transparent 
              opacity={0.1} 
              side={THREE.BackSide} 
              blending={THREE.AdditiveBlending}
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
        camera={{ position: [0, 0, 2.8], fov: 45 }}
      >
        <TexturedEarth isDark={isDark} />
      </Canvas>
    </div>
  );
}
