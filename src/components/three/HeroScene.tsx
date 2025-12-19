'use client';

import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows, 
  Sparkles,
  PerspectiveCamera,
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Vignette,
  ChromaticAberration,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import GreekBust, { GreekPillar } from './GreekBust';
import { useTheme } from '@/context/ThemeContext';

// Animated directional lights
function AnimatedLights({ isDark = true }: { isDark?: boolean }) {
  const spotLight1 = useRef<THREE.SpotLight>(null);
  const spotLight2 = useRef<THREE.SpotLight>(null);
  const pointLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (spotLight1.current) {
      spotLight1.current.position.x = Math.sin(time * 0.3) * 3;
      spotLight1.current.position.z = Math.cos(time * 0.3) * 3;
    }
    
    if (pointLight.current) {
      pointLight.current.intensity = (isDark ? 0.5 : 0.6) + Math.sin(time * 2) * 0.2;
    }
  });

  return (
    <>
      {/* Main warm spotlight - golden hour effect */}
      <spotLight
        ref={spotLight1}
        position={[5, 8, 3]}
        angle={0.4}
        penumbra={0.8}
        intensity={isDark ? 2 : 2.5}
        color={isDark ? "#FFD700" : "#D4AF37"}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-bias={-0.0001}
      />
      
      {/* Fill light from opposite side */}
      <spotLight
        ref={spotLight2}
        position={[-5, 5, -3]}
        angle={0.5}
        penumbra={1}
        intensity={isDark ? 0.8 : 1.5}
        color={isDark ? "#E6D5AC" : "#C9A962"}
      />
      
      {/* Rim light for dramatic effect */}
      <spotLight
        position={[0, 5, -6]}
        angle={0.6}
        penumbra={0.5}
        intensity={isDark ? 1.2 : 1.8}
        color={isDark ? "#FFF8DC" : "#E6D5AC"}
      />

      {/* Front key light - balanced for light mode */}
      <directionalLight
        position={[0, 3, 5]}
        intensity={isDark ? 0.3 : 1.2}
        color={isDark ? "#FFF5E6" : "#FFF8F0"}
      />

      {/* Ambient glow - moderate for light mode */}
      <ambientLight intensity={isDark ? 0.15 : 0.4} color={isDark ? "#FFF5E6" : "#FFF8F0"} />

      {/* Hemisphere light for natural fill */}
      <hemisphereLight 
        color={isDark ? "#FFF8DC" : "#FFFAF5"}
        groundColor={isDark ? "#1a1816" : "#d4c4a8"}
        intensity={isDark ? 0.3 : 0.6}
      />

      {/* Floating point light for ethereal effect */}
      <pointLight
        ref={pointLight}
        position={[0, 3, 2]}
        intensity={isDark ? 0.5 : 0.8}
        color="#D4AF37"
        distance={10}
        decay={2}
      />
    </>
  );
}

// Background gradient sphere
function BackgroundSphere({ isDark = true }: { isDark?: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <mesh ref={meshRef} scale={30}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshBasicMaterial 
        side={THREE.BackSide}
        color={isDark ? '#0a0908' : '#faf8f3'}
      />
    </mesh>
  );
}

// Animated marble grid floor
function MarbleGrid({ isDark = true }: { isDark?: boolean }) {
  const gridRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (gridRef.current) {
      // Subtle wave animation
      gridRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const x = Math.floor(i / 11) - 5;
        const z = (i % 11) - 5;
        const time = state.clock.getElapsedTime();
        mesh.position.y = Math.sin(time * 0.5 + x * 0.5 + z * 0.5) * 0.02 - 1.5;
      });
    }
  });
  
  const tileMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: isDark ? '#1a1816' : '#d9ccb8',
    roughness: isDark ? 0.4 : 0.5,
    metalness: isDark ? 0.1 : 0.08,
  }), [isDark]);
  
  const goldLineMaterial = useMemo(() => new THREE.MeshStandardMaterial({
    color: '#D4AF37',
    roughness: 0.3,
    metalness: 0.6,
    emissive: '#D4AF37',
    emissiveIntensity: 0.1,
  }), []);
  
  return (
    <group ref={gridRef}>
      {/* Create a 11x11 grid of tiles */}
      {[...Array(121)].map((_, i) => {
        const x = (Math.floor(i / 11) - 5) * 0.8;
        const z = ((i % 11) - 5) * 0.8;
        return (
          <group key={i} position={[x, -1.5, z]}>
            <mesh material={tileMaterial}>
              <boxGeometry args={[0.75, 0.05, 0.75]} />
            </mesh>
            {/* Gold edge lines */}
            <mesh position={[0.375, 0.03, 0]} material={goldLineMaterial}>
              <boxGeometry args={[0.02, 0.02, 0.75]} />
            </mesh>
            <mesh position={[0, 0.03, 0.375]} material={goldLineMaterial}>
              <boxGeometry args={[0.75, 0.02, 0.02]} />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}

// Main scene content
function SceneContent({ isDark = true }: { isDark?: boolean }) {
  return (
    <>
      <BackgroundSphere isDark={isDark} />
      <AnimatedLights isDark={isDark} />
      
      {/* Main centerpiece - Helios Bust - shifted down */}
      <group position={[0, -0.5, 0]}>
        <GreekBust scale={1.2} isDark={isDark} />
      </group>
      
      {/* Decorative pillars - larger and more prominent at sides */}
      <GreekPillar scale={0.7} position={[-3, -0.8, -1]} isDark={isDark} />
      <GreekPillar scale={0.7} position={[3, -0.8, -1]} isDark={isDark} />
      
      {/* Animated marble grid floor */}
      <MarbleGrid isDark={isDark} />
      
      {/* Dust particles for atmosphere */}
      <DustParticles count={400} size={0.015} color="#D4AF37" />
      
      {/* Subtle sparkles */}
      <Sparkles
        count={60}
        scale={12}
        size={1.5}
        speed={0.2}
        color="#D4AF37"
        opacity={0.4}
      />
      
      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.3}
        scale={8}
        blur={2}
        far={4}
        color="#1a1a1a"
      />
    </>
  );
}

// Camera controller with subtle movement
function CameraController() {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    // Subtle camera movement based on mouse
    camera.position.x = THREE.MathUtils.lerp(
      camera.position.x,
      mouseRef.current.x * 0.5,
      0.02
    );
    camera.position.y = THREE.MathUtils.lerp(
      camera.position.y,
      1.5 + mouseRef.current.y * 0.3,
      0.02
    );
    camera.lookAt(0, 1, 0);
  });

  return null;
}

// Loading component
function Loader() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0908]">
      <div className="text-center">
        <div className="w-16 h-16 border-2 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gold-500 font-cinzel text-lg tracking-widest">
          ENTERING THE ARCHIVE
        </p>
      </div>
    </div>
  );
}

interface HeroSceneProps {
  className?: string;
}

export default function HeroScene({ className = '' }: HeroSceneProps) {
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader />;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
      >
        <PerspectiveCamera 
          makeDefault 
          position={[0, 1.5, 6]} 
          fov={45}
          near={0.1}
          far={100}
        />
        
        <color attach="background" args={[isDark ? '#0a0908' : '#faf8f3']} />
        <fog attach="fog" args={[isDark ? '#0a0908' : '#faf8f3', 8, 30]} />
        
        <Suspense fallback={null}>
          <SceneContent isDark={isDark} />
          <CameraController />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={isDark ? 0.8 : 0.5}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette
              eskil={false}
              offset={0.1}
              darkness={isDark ? 0.8 : 0.4}
              blendFunction={BlendFunction.NORMAL}
            />
            <ChromaticAberration
              blendFunction={BlendFunction.NORMAL}
              offset={new THREE.Vector2(0.0005, 0.0005)}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  );
}
