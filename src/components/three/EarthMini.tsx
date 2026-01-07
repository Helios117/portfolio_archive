import React, { useMemo, useRef, Suspense } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import * as THREE from 'three';
import { Float } from '@react-three/drei';

// Fallback component while textures load
function EarthFallback({ isDark }: { isDark: boolean }) {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color={isDark ? '#1a3b5c' : '#2E6F9E'} wireframe />
    </mesh>
  );
}

function TexturedEarth({ isDark }: { isDark: boolean }) {
  const earthRef = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const lightRef = useRef<THREE.PointLight>(null);

  // Load textures inside Suspense
  const [colorMap, cloudsMap] = useLoader(TextureLoader, [
    '/textures/earth_daymap.jpg',
    '/textures/earth_clouds.jpg'
  ]);

  useFrame((state) => {
    if (!earthRef.current || !cloudsRef.current || !lightRef.current) return;
    
    const time = state.clock.getElapsedTime();
    
    // Rotate Earth slowly
    earthRef.current.rotation.y = time * 0.05;
    
    // Rotate clouds slightly faster than earth for realism
    cloudsRef.current.rotation.y = time * 0.07;

    // Orbit the light to match Chariot's movement
    const orbitSpeed = 0.25;
    const radius = 3;
    
    // Position light to simulate the Chariot orbiting
    lightRef.current.position.x = Math.cos(time * orbitSpeed) * radius;
    lightRef.current.position.z = Math.sin(time * orbitSpeed) * radius;
    lightRef.current.position.y = Math.sin(time * 0.5) * 0.5;
  });

  return (
    <group>
      {/* Strong Ambient Light for Base Visibility - slightly cooler/bluer */}
      <ambientLight intensity={isDark ? 0.4 : 0.6} color="#b0d8ff" />
      
      {/* Dynamic Chariot Light - Gold/Orange for contrast */}
      <pointLight 
        ref={lightRef}
        intensity={isDark ? 8.0 : 12.0} // Very strong intensity to be obvious
        color="#ffaa00" 
        distance={6}
        decay={1.5}
      />
      
      {/* Rim/Fill Light */}
      <directionalLight position={[2, 2, 5]} intensity={isDark ? 0.5 : 0.8} color="#ffffff" />

      <Float speed={2} rotationIntensity={0.1} floatIntensity={0.1}>
        <group ref={earthRef}>
          {/* Earth Sphere - Standard Material with high metalness/roughness for reflections */}
          <mesh>
            <sphereGeometry args={[1, 64, 64]} />
            <meshStandardMaterial 
              map={colorMap} 
              color="#4da6ff" // Tint it blue
              roughness={0.3} // Smoother surface for better reflections
              metalness={0.4} // Metallic hint to catch the light
              emissive="#1a4d7c" // Slight inner glow
              emissiveIntensity={0.2}
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
              depthWrite={false}
              color="#ffffff"
            />
          </mesh>
        </group>
      </Float>
    </group>
  );
}

export default function EarthMini({ isDark = false }: { isDark?: boolean }) {
  return (
    <div className="w-full h-full relative">
      <Canvas
        dpr={[1, 2]}
        gl={{ alpha: true, antialias: true }}
        camera={{ position: [0, 0, 2.8], fov: 45 }}
      >
        <Suspense fallback={<EarthFallback isDark={isDark} />}>
          <TexturedEarth isDark={isDark} />
        </Suspense>
      </Canvas>
    </div>
  );
}
