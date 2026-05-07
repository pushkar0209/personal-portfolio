"use client";

import React, { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Text,
  ContactShadows,
  Environment,
  PresentationControls,
  Html
} from '@react-three/drei';
import * as THREE from 'three';

function FloatingCode({ color, text, position }: { color: string, text: string, position: [number, number, number] }) {
  const meshRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[0]) * 0.2;
    meshRef.current.rotation.y = Math.sin(t * 0.2) * 0.1;
  });

  return (
    <group ref={meshRef} position={position}>
      <Text
        fontSize={0.2}
        color={color}
        font="/fonts/inter-bold.woff" // Assuming font exists or fallback
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
      <mesh position={[0, 0, -0.05]}>
        <planeGeometry args={[text.length * 0.15, 0.4]} />
        <meshBasicMaterial color={color} transparent opacity={0.05} />
      </mesh>
    </group>
  );
}

function TechCube({ position, color, label }: { position: [number, number, number], color: string, label: string }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
    if (hovered) {
      meshRef.current.scale.lerp(new THREE.Vector3(1.2, 1.2, 1.2), 0.1);
    } else {
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[0.6, 0.6, 0.6]} />
        <MeshDistortMaterial
          color={color}
          speed={3}
          distort={0.4}
          radius={1}
          metalness={0.8}
          roughness={0.2}
        />
        <Html distanceFactor={10} position={[0, 0.8, 0]} center>
          <div className={`px-2 py-1 rounded bg-black/80 border border-${color}/50 text-[8px] font-mono text-white whitespace-nowrap transition-opacity duration-300 ${hovered ? 'opacity-100' : 'opacity-0'}`}>
            {label}
          </div>
        </Html>
      </mesh>
    </Float>
  );
}

function CentralHub() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.1;
  });

  return (
    <group ref={groupRef}>
      {/* Central Core */}
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <MeshDistortMaterial
          color="#6366f1"
          speed={2}
          distort={0.3}
          radius={1}
          emissive="#6366f1"
          emissiveIntensity={0.5}
          metalness={0.9}
        />
      </mesh>
      
      {/* Orbiting Elements */}
      <TechCube position={[3, 0, 0]} color="#06b6d4" label="AI MODELS" />
      <TechCube position={[-3, 1, 1]} color="#8b5cf6" label="FULL STACK" />
      <TechCube position={[1, -2, 2]} color="#10b981" label="NEURAL NETS" />
      <TechCube position={[-1, 2, -2]} color="#f59e0b" label="DEPLOYMENT" />
      
      {/* Code Streams */}
      <FloatingCode position={[0, 2, 0]} color="#6366f1" text="import { NeuralNetwork } from 'pushkar-ai';" />
      <FloatingCode position={[2, -1.5, 1]} color="#06b6d4" text="model.train(dataset);" />
      <FloatingCode position={[-2, -1.5, -1]} color="#8b5cf6" text="export const Experience = () => { ... }" />
    </group>
  );
}

export function CyberDeck() {
  return (
    <div className="w-full h-[600px] relative">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
        <pointLight position={[-10, -10, -10]} color="#8b5cf6" intensity={1} />
        
        <PresentationControls
          global
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0.3, 0]}
          polar={[-Math.PI / 3, Math.PI / 3]}
          azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
        >
          <CentralHub />
        </PresentationControls>

        <ContactShadows position={[0, -4.5, 0]} opacity={0.4} scale={20} blur={2} far={4.5} />
        <Environment preset="city" />
      </Canvas>
      
      {/* Overlay UI */}
      <div className="absolute top-10 left-10 pointer-events-none">
        <div className="flex flex-col gap-2">
          <div className="h-px w-20 bg-primary/50" />
          <h3 className="text-xl font-display font-bold text-white tracking-widest uppercase">Neural Core V2.0</h3>
          <p className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em]">Interacting with intelligence</p>
        </div>
      </div>
      
      <div className="absolute bottom-10 right-10 pointer-events-none text-right">
        <p className="text-[10px] font-mono text-white/20 leading-relaxed uppercase tracking-widest">
          DRAG TO ROTATE<br />
          HOVER NODES TO INSPECT<br />
          REAL-TIME RENDER ENGINE
        </p>
      </div>
    </div>
  );
}
