"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

function FloatingShape({ shape, position, color, scale, speed, rotationSpeed }: any) {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x += 0.005 * rotationSpeed;
    meshRef.current.rotation.y += 0.007 * rotationSpeed;
    meshRef.current.position.y += Math.sin(t * speed) * 0.002;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'box': return new THREE.BoxGeometry(1, 1, 1);
      case 'torus': return new THREE.TorusGeometry(0.7, 0.2, 16, 100);
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
      default: return new THREE.SphereGeometry(1, 32, 32);
    }
  }, [shape]);

  return (
    <Float speed={speed * 2} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={meshRef} position={position} scale={scale}>
        <primitive object={geometry} />
        <meshStandardMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
          metalness={0.9} 
          roughness={0.1}
          emissive={color}
          emissiveIntensity={0.2}
        />
      </mesh>
    </Float>
  );
}

export function FloatingElements() {
  const shapes = useMemo(() => {
    return Array.from({ length: 15 }).map((_, i) => ({
      shape: ['box', 'torus', 'icosahedron', 'sphere'][Math.floor(Math.random() * 4)],
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20 - 10
      ],
      color: ['#6366f1', '#06b6d4', '#8b5cf6', '#10b981'][Math.floor(Math.random() * 4)],
      scale: Math.random() * 0.5 + 0.2,
      speed: Math.random() * 0.5 + 0.2,
      rotationSpeed: Math.random() * 0.5 + 0.2
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} color="#6366f1" intensity={0.5} />
        
        {shapes.map((s, i) => (
          <FloatingShape key={i} {...s} />
        ))}
        
        <Environment preset="night" />
      </Canvas>
    </div>
  );
}
