"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars } from "@react-three/drei";
import * as THREE from "three";

// ─── Glowing neural node ─────────────────────────────────────────────────────
function NeuralNode({
  position,
  color,
  size,
  speed,
}: {
  position: [number, number, number];
  color: string;
  size: number;
  speed: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current || !glowRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.scale.setScalar(1 + Math.sin(t * speed + position[0]) * 0.15);
    glowRef.current.scale.setScalar(1.6 + Math.sin(t * speed * 0.7 + position[1]) * 0.4);
  });

  return (
    <Float speed={speed * 0.5} rotationIntensity={0.2} floatIntensity={0.6} position={position}>
      <group>
        {/* Core node */}
        <mesh ref={meshRef}>
          <sphereGeometry args={[size, 16, 16]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={1.2}
            metalness={0.8}
            roughness={0.1}
          />
        </mesh>
        {/* Glow halo */}
        <mesh ref={glowRef}>
          <sphereGeometry args={[size * 1.6, 12, 12]} />
          <meshBasicMaterial
            color={color}
            transparent
            opacity={0.08}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </mesh>
      </group>
    </Float>
  );
}

// ─── Connection lines between nodes ─────────────────────────────────────────
function NeuralConnections({ nodes }: { nodes: [number, number, number][] }) {
  const lines = useMemo(() => {
    const result: { start: [number, number, number]; end: [number, number, number]; color: string }[] = [];
    const colors = ["#6366f1", "#06b6d4", "#8b5cf6", "#10b981"];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i][0] - nodes[j][0];
        const dy = nodes[i][1] - nodes[j][1];
        const dz = nodes[i][2] - nodes[j][2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
        if (dist < 2.2) {
          result.push({
            start: nodes[i],
            end: nodes[j],
            color: colors[Math.floor(Math.random() * colors.length)],
          });
        }
      }
    }
    return result;
  }, [nodes]);

  return (
    <>
      {lines.map((line, i) => {
        const points = [
          new THREE.Vector3(...line.start),
          new THREE.Vector3(...line.end),
        ];
    const geo = new THREE.BufferGeometry().setFromPoints(points);
        const seg = new THREE.LineSegments(
          geo,
          new THREE.LineBasicMaterial({
            color: line.color,
            transparent: true,
            opacity: 0.25,
            blending: THREE.AdditiveBlending,
          })
        );
        return <primitive key={i} object={seg} />;
      })}
    </>
  );
}

// ─── Central pulsing AI orb ──────────────────────────────────────────────────
function CentralOrb() {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = t * 0.15;
    meshRef.current.rotation.y = t * 0.2;
  });

  return (
    <Float speed={1} rotationIntensity={0.5} floatIntensity={0.3}>
      <mesh ref={meshRef}>
        <Sphere args={[0.7, 64, 64]}>
          <MeshDistortMaterial
            color="#6366f1"
            emissive="#4f46e5"
            emissiveIntensity={0.6}
            metalness={0.9}
            roughness={0.05}
            distort={0.45}
            speed={3}
          />
        </Sphere>
      </mesh>

      {/* Ring around orb */}
      <mesh rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[1.1, 0.015, 16, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.6} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh rotation={[Math.PI / 3, 0.3, 0]}>
        <torusGeometry args={[1.3, 0.01, 16, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
      </mesh>
    </Float>
  );
}

// ─── Mouse-following camera ──────────────────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    camera.position.x += (state.pointer.x * 0.8 - camera.position.x) * 0.04;
    camera.position.y += (state.pointer.y * 0.5 - camera.position.y) * 0.04;
    camera.position.z = 6 + Math.sin(t * 0.3) * 0.3;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ─── Floating data particles ─────────────────────────────────────────────────
function DataParticles() {
  const count = 80;
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 12;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 8;
    }
    return arr;
  }, []);

  const colors = useMemo(() => {
    const arr = new Float32Array(count * 3);
    const palette = [
      [0.388, 0.4, 0.949],   // indigo
      [0.024, 0.714, 0.831], // cyan
      [0.545, 0.361, 0.965], // violet
      [0.063, 0.725, 0.506], // emerald
    ];
    for (let i = 0; i < count; i++) {
      const c = palette[i % palette.length];
      arr[i * 3] = c[0];
      arr[i * 3 + 1] = c[1];
      arr[i * 3 + 2] = c[2];
    }
    return arr;
  }, []);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.1) * 0.05;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        sizeAttenuation
      />
    </points>
  );
}

// ─── Main R3F Scene ──────────────────────────────────────────────────────────
function BrainScene() {
  // Nodes arranged in a brain-like cluster
  const nodePositions: [number, number, number][] = useMemo(() => [
    [0, 0, 0],
    [1.2, 0.8, 0.3],
    [-1.1, 0.9, -0.2],
    [0.6, -1.0, 0.5],
    [-0.8, -0.8, 0.4],
    [1.6, -0.3, -0.4],
    [-1.5, 0.1, 0.5],
    [0.3, 1.5, -0.3],
    [-0.4, -1.6, -0.4],
    [1.0, 0.2, 1.2],
    [-1.0, 0.5, 1.0],
    [0.2, -0.5, -1.3],
    [1.8, 1.0, 0.2],
    [-1.8, -0.5, -0.3],
    [0.9, -1.5, -0.6],
  ], []);

  const nodeColors = [
    "#6366f1", "#06b6d4", "#8b5cf6", "#10b981", "#f59e0b",
    "#06b6d4", "#6366f1", "#10b981", "#8b5cf6", "#6366f1",
    "#06b6d4", "#8b5cf6", "#10b981", "#6366f1", "#06b6d4",
  ];

  const nodeSizes = [0.09, 0.12, 0.1, 0.11, 0.08, 0.13, 0.09, 0.1, 0.12, 0.08, 0.11, 0.09, 0.1, 0.12, 0.08];

  return (
    <>
      <CameraRig />
      <ambientLight intensity={0.3} />
      <pointLight position={[5, 5, 5]} color="#6366f1" intensity={4} />
      <pointLight position={[-5, -5, 3]} color="#06b6d4" intensity={3} />
      <pointLight position={[0, 5, -3]} color="#8b5cf6" intensity={2} />

      <Stars radius={30} depth={20} count={500} factor={2} saturation={0.8} fade speed={0.5} />
      <DataParticles />
      <CentralOrb />
      <NeuralConnections nodes={nodePositions} />

      {nodePositions.map((pos, i) => (
        <NeuralNode
          key={i}
          position={pos}
          color={nodeColors[i]}
          size={nodeSizes[i]}
          speed={1.5 + i * 0.2}
        />
      ))}
    </>
  );
}

// ─── Exported component (Canvas wrapper) ────────────────────────────────────
export function AiBrainScene({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <BrainScene />
      </Canvas>
    </div>
  );
}
