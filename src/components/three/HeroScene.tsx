'use client';

import { Suspense, useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { 
  Environment, 
  ContactShadows, 
  Sparkles,
  PerspectiveCamera,
  PerformanceMonitor,
} from '@react-three/drei';
import { 
  EffectComposer, 
  Bloom, 
  Vignette,
} from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';
import * as THREE from 'three';
import DustParticles from './DustParticles';
import HeliosChariot, { GreekPillar } from './HeliosChariot';
import { GreekBust } from './GreekBust';
import { useTheme } from '@/context/ThemeContext';

// Detect if device is mobile/tablet
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || 'ontouchstart' in window);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  return isMobile;
}
// Animated directional lights
function AnimatedLights({ isDark = true, isMobile = false }: { isDark?: boolean; isMobile?: boolean }) {
  const spotLight1 = useRef<THREE.SpotLight>(null);
  const spotLight2 = useRef<THREE.SpotLight>(null);
  const pointLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    // Slower animation on mobile to reduce load
    const time = state.clock.getElapsedTime();
    const speed = isMobile ? 0.15 : 0.3;
    
    if (spotLight1.current) {
      spotLight1.current.position.x = Math.sin(time * speed) * 3;
      spotLight1.current.position.z = Math.cos(time * speed) * 3;
    }
    
    if (pointLight.current && !isMobile) {
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
        castShadow={!isMobile}
        shadow-mapSize={isMobile ? [512, 512] : [2048, 2048]}
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
      
      {/* Rim light for dramatic effect - skip on mobile */}
      {!isMobile && (
        <spotLight
          position={[0, 5, -6]}
          angle={0.6}
          penumbra={0.5}
          intensity={isDark ? 1.2 : 1.8}
          color={isDark ? "#FFF8DC" : "#E6D5AC"}
        />
      )}

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

      {/* Floating point light for ethereal effect - skip on mobile */}
      {!isMobile && (
        <pointLight
          ref={pointLight}
          position={[0, 3, 2]}
          intensity={isDark ? 0.5 : 0.8}
          color="#D4AF37"
          distance={10}
          decay={2}
        />
      )}
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
function MarbleGrid({ isDark = true, isMobile = false }: { isDark?: boolean; isMobile?: boolean }) {
  const gridRef = useRef<THREE.Group>(null);
  
  // Reduce grid size on mobile
  const gridSize = isMobile ? 7 : 11;
  const tileCount = gridSize * gridSize;
  const halfGrid = Math.floor(gridSize / 2);
  
  useFrame((state) => {
    if (gridRef.current && !isMobile) {
      // Only animate on desktop - wave animation
      gridRef.current.children.forEach((child, i) => {
        const mesh = child as THREE.Mesh;
        const x = Math.floor(i / gridSize) - halfGrid;
        const z = (i % gridSize) - halfGrid;
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
      {/* Create grid of tiles */}
      {[...Array(tileCount)].map((_, i) => {
        const x = (Math.floor(i / gridSize) - halfGrid) * 0.8;
        const z = ((i % gridSize) - halfGrid) * 0.8;
        return (
          <group key={i} position={[x, -1.5, z]}>
            <mesh material={tileMaterial}>
              <boxGeometry args={[0.75, 0.05, 0.75]} />
            </mesh>
            {/* Gold edge lines - skip some on mobile */}
            {(!isMobile || i % 2 === 0) && (
              <>
                <mesh position={[0.375, 0.03, 0]} material={goldLineMaterial}>
                  <boxGeometry args={[0.02, 0.02, 0.75]} />
                </mesh>
                <mesh position={[0, 0.03, 0.375]} material={goldLineMaterial}>
                  <boxGeometry args={[0.75, 0.02, 0.02]} />
                </mesh>
              </>
            )}
          </group>
        );
      })}
    </group>
  );
}

// Main scene content
function SceneContent({ isDark = true, isMobile = false }: { isDark?: boolean; isMobile?: boolean }) {
  return (
    <>
      <BackgroundSphere isDark={isDark} />
      <AnimatedLights isDark={isDark} isMobile={isMobile} />
      
      {/* Main centerpiece - Bust in dark mode, Chariot in light mode */}
      <group position={[0, -0.3, 0]}>
        {isDark ? (
          <GreekBust scale={1.1} isDark={isDark} />
        ) : (
          <HeliosChariot scale={1.1} isDark={isDark} />
        )}
      </group>
      
      {/* Decorative pillars - hide on mobile for performance */}
      {!isMobile && (
        <>
          <GreekPillar scale={0.7} position={[-3, -0.8, -1]} isDark={isDark} />
          <GreekPillar scale={0.7} position={[3, -0.8, -1]} isDark={isDark} />
        </>
      )}
      
      {/* Animated marble grid floor */}
      <MarbleGrid isDark={isDark} isMobile={isMobile} />
      
      {/* Dust particles for atmosphere - reduced on mobile */}
      <DustParticles count={isMobile ? 100 : 400} size={0.015} color="#D4AF37" />
      
      {/* Subtle sparkles - reduced on mobile */}
      <Sparkles
        count={isMobile ? 20 : 60}
        scale={12}
        size={1.5}
        speed={0.2}
        color="#D4AF37"
        opacity={0.4}
      />
      
      {/* Contact shadows for grounding - skip on mobile */}
      {!isMobile && (
        <ContactShadows
          position={[0, -1.5, 0]}
          opacity={0.3}
          scale={8}
          blur={2}
          far={4}
          color="#1a1a1a"
        />
      )}
    </>
  );
}

// Camera controller with subtle movement
function CameraController({ isMobile = false }: { isMobile?: boolean }) {
  const { camera } = useThree();
  const mouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Skip mouse tracking on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  useFrame(() => {
    // Skip camera movement on mobile
    if (isMobile) return;
    
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
  const [dpr, setDpr] = useState(1.5);
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const isMobile = useIsMobile();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Loader />;
  }

  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        shadows={!isMobile}
        dpr={isMobile ? 1 : [1, 2]}
        gl={{ 
          antialias: !isMobile,
          alpha: false,
          powerPreference: isMobile ? 'low-power' : 'high-performance',
          stencil: false,
          depth: true,
        }}
        frameloop={isMobile ? 'demand' : 'always'}
        performance={{ min: 0.5 }}
      >
        <PerformanceMonitor 
          onDecline={() => setDpr(1)} 
          onIncline={() => setDpr(1.5)}
        />
        
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
          <SceneContent isDark={isDark} isMobile={isMobile} />
          <CameraController isMobile={isMobile} />
          
          {/* Post-processing effects - simplified or disabled on mobile */}
          {!isMobile && (
            <EffectComposer multisampling={0}>
              <Bloom
                intensity={isDark ? 0.6 : 0.4}
                luminanceThreshold={0.7}
                luminanceSmoothing={0.9}
                mipmapBlur
              />
              <Vignette
                eskil={false}
                offset={0.1}
                darkness={isDark ? 0.6 : 0.3}
                blendFunction={BlendFunction.NORMAL}
              />
            </EffectComposer>
          )}
        </Suspense>
      </Canvas>
    </div>
  );
}
