'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface DustParticlesProps {
  count?: number;
  size?: number;
  color?: string;
  area?: [number, number, number];
}

export default function DustParticles({
  count = 500,
  size = 0.015,
  color = '#D4AF37',
  area = [20, 15, 20],
}: DustParticlesProps) {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const frameCount = useRef(0);

  // Generate random positions for particles
  const particles = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const velocities = new Float32Array(count * 3);
    const opacities = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      // Spread particles across the scene
      positions[i3] = (Math.random() - 0.5) * area[0];
      positions[i3 + 1] = (Math.random() - 0.5) * area[1];
      positions[i3 + 2] = (Math.random() - 0.5) * area[2];

      // Random slow velocities for drifting effect
      velocities[i3] = (Math.random() - 0.5) * 0.002;
      velocities[i3 + 1] = (Math.random() - 0.5) * 0.001 + 0.001; // Slight upward drift
      velocities[i3 + 2] = (Math.random() - 0.5) * 0.002;

      // Random initial opacity for twinkling
      opacities[i] = Math.random();
    }

    return { positions, velocities, opacities };
  }, [count, area]);

  // Animate particles - throttled for better performance
  useFrame((state) => {
    if (!pointsRef.current) return;
    
    // Throttle updates - only update every 2nd frame for low particle counts
    frameCount.current++;
    if (count < 200 && frameCount.current % 2 !== 0) return;

    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const time = state.clock.getElapsedTime();
    
    // Update fewer particles per frame for better performance
    const updateStep = count < 200 ? 1 : 2;

    for (let i = 0; i < count; i += updateStep) {
      const i3 = i * 3;

      // Update positions with velocities and slight sine wave motion
      positions[i3] += particles.velocities[i3] + Math.sin(time * 0.5 + i) * 0.0005;
      positions[i3 + 1] += particles.velocities[i3 + 1];
      positions[i3 + 2] += particles.velocities[i3 + 2] + Math.cos(time * 0.3 + i) * 0.0005;

      // Wrap particles around when they go out of bounds
      if (positions[i3] > area[0] / 2) positions[i3] = -area[0] / 2;
      if (positions[i3] < -area[0] / 2) positions[i3] = area[0] / 2;
      if (positions[i3 + 1] > area[1] / 2) positions[i3 + 1] = -area[1] / 2;
      if (positions[i3 + 1] < -area[1] / 2) positions[i3 + 1] = area[1] / 2;
      if (positions[i3 + 2] > area[2] / 2) positions[i3 + 2] = -area[2] / 2;
      if (positions[i3 + 2] < -area[2] / 2) positions[i3 + 2] = area[2] / 2;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;

    // Subtle overall rotation
    pointsRef.current.rotation.y = time * 0.02;

    // Pulse the opacity for twinkling effect
    if (materialRef.current) {
      materialRef.current.opacity = 0.6 + Math.sin(time * 2) * 0.2;
    }
  });

  const positionAttribute = useMemo(() => {
    return new THREE.BufferAttribute(particles.positions, 3);
  }, [particles.positions]);

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <primitive attach="attributes-position" object={positionAttribute} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={size}
        color={color}
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
