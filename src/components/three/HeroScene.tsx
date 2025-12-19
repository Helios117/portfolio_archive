'use client';

import { Suspense, useRef, useEffect, useState } from 'react';
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

// Animated directional lights
function AnimatedLights() {
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
      pointLight.current.intensity = 0.5 + Math.sin(time * 2) * 0.2;
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
        intensity={2}
        color="#FFD700"
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
        intensity={0.8}
        color="#E6D5AC"
      />
      
      {/* Rim light for dramatic effect */}
      <spotLight
        position={[0, 5, -6]}
        angle={0.6}
        penumbra={0.5}
        intensity={1.2}
        color="#FFF8DC"
      />

      {/* Ambient glow */}
      <ambientLight intensity={0.15} color="#FFF5E6" />

      {/* Floating point light for ethereal effect */}
      <pointLight
        ref={pointLight}
        position={[0, 3, 2]}
        intensity={0.5}
        color="#D4AF37"
        distance={10}
        decay={2}
      />
    </>
  );
}

// Background gradient sphere
function BackgroundSphere() {
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
        color="#0a0908"
      />
    </mesh>
  );
}

// Main scene content
function SceneContent() {
  return (
    <>
      <BackgroundSphere />
      <AnimatedLights />
      
      {/* Main centerpiece - Greek Bust */}
      <GreekBust scale={1.2} />
      
      {/* Decorative pillars in background */}
      <GreekPillar scale={0.4} position={[-4, -2, -3]} />
      <GreekPillar scale={0.35} position={[4.5, -2.5, -4]} />
      
      {/* Dust particles for atmosphere */}
      <DustParticles count={600} size={0.02} color="#D4AF37" />
      
      {/* Sparkles for magical effect */}
      <Sparkles
        count={100}
        scale={15}
        size={2}
        speed={0.3}
        color="#D4AF37"
        opacity={0.5}
      />
      
      {/* Additional warm sparkles */}
      <Sparkles
        count={50}
        scale={10}
        size={3}
        speed={0.2}
        color="#FFD700"
        opacity={0.3}
      />
      
      {/* Contact shadows for grounding */}
      <ContactShadows
        position={[0, -1.5, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
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
        
        <color attach="background" args={['#0a0908']} />
        <fog attach="fog" args={['#0a0908', 8, 30]} />
        
        <Suspense fallback={null}>
          <SceneContent />
          <CameraController />
          
          {/* Post-processing effects */}
          <EffectComposer>
            <Bloom
              intensity={0.8}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette
              eskil={false}
              offset={0.1}
              darkness={0.8}
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
