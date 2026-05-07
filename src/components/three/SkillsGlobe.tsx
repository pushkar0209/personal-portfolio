"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, Sphere, Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

const SKILLS = [
  { name: "Python", color: "#f59e0b", angle: 0, elevation: 0.3 },
  { name: "React.js", color: "#06b6d4", angle: 0.7, elevation: 0.8 },
  { name: "LSTM", color: "#8b5cf6", angle: 1.4, elevation: -0.2 },
  { name: "Prophet", color: "#6366f1", angle: 2.1, elevation: 0.6 },
  { name: "Flask", color: "#10b981", angle: 2.8, elevation: -0.7 },
  { name: "Chart.js", color: "#f43f5e", angle: 3.5, elevation: 0.4 },
  { name: "Machine Learning", color: "#06b6d4", angle: 4.2, elevation: -0.5 },
  { name: "HTML/CSS/JS", color: "#f59e0b", angle: 4.9, elevation: 0.9 },
  { name: "Data Science", color: "#8b5cf6", angle: 5.6, elevation: -0.3 },
  { name: "REST APIs", color: "#10b981", angle: 0.35, elevation: -0.9 },
  { name: "Deep Learning", color: "#6366f1", angle: 1.05, elevation: 0.15 },
  { name: "Git", color: "#f43f5e", angle: 1.75, elevation: -0.6 },
];

interface SkillLabelProps {
  name: string;
  color: string;
  angle: number;
  elevation: number;
  radius: number;
}

function SkillLabel({ name, color, angle, elevation, radius }: SkillLabelProps) {
  const groupRef = useRef<THREE.Group>(null);
  const dotRef = useRef<THREE.Mesh>(null);

  const baseX = Math.cos(angle) * radius * Math.cos(elevation);
  const baseY = Math.sin(elevation) * radius;
  const baseZ = Math.sin(angle) * radius * Math.cos(elevation);

  useFrame((state) => {
    if (!groupRef.current || !dotRef.current) return;
    const t = state.clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2 + angle * 3) * 0.12;
    dotRef.current.scale.setScalar(pulse);
    // Keep text facing camera
    groupRef.current.quaternion.copy(state.camera.quaternion);
  });

  return (
    <group ref={groupRef} position={[baseX, baseY, baseZ]}>
      {/* Glowing dot */}
      <mesh ref={dotRef}>
        <sphereGeometry args={[0.05, 12, 12]} />
        <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} transparent opacity={0.9} />
      </mesh>
      {/* Glow halo */}
      <mesh>
        <sphereGeometry args={[0.1, 12, 12]} />
        <meshBasicMaterial color={color} blending={THREE.AdditiveBlending} transparent opacity={0.2} />
      </mesh>
      {/* Skill name text */}
      <Text
        position={[0, 0.18, 0]}
        fontSize={0.13}
        color={color}
        anchorX="center"
        anchorY="middle"
        fillOpacity={0.9}
      >
        {name}
      </Text>
    </group>
  );
}

function GlobeCore() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Mesh>(null);
  const ring2Ref = useRef<THREE.Mesh>(null);
  const ring3Ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.y = t * 0.15;
    meshRef.current.rotation.x = t * 0.08;
    if (ring1Ref.current) ring1Ref.current.rotation.z = t * 0.3;
    if (ring2Ref.current) ring2Ref.current.rotation.z = -t * 0.2;
    if (ring3Ref.current) ring3Ref.current.rotation.x = t * 0.25;
  });

  return (
    <>
      {/* Central sphere */}
      <mesh ref={meshRef}>
        <Sphere args={[0.8, 48, 48]}>
          <MeshDistortMaterial
            color="#0f0f2a"
            emissive="#6366f1"
            emissiveIntensity={0.15}
            metalness={0.95}
            roughness={0.05}
            distort={0.15}
            speed={2}
            wireframe={false}
          />
        </Sphere>
      </mesh>

      {/* Wireframe overlay */}
      <mesh>
        <sphereGeometry args={[0.81, 18, 18]} />
        <meshBasicMaterial
          color="#6366f1"
          wireframe
          transparent
          opacity={0.08}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Orbit rings */}
      <mesh ref={ring1Ref} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.6, 0.008, 12, 100]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring2Ref} rotation={[Math.PI / 3, 0.5, 0]}>
        <torusGeometry args={[1.9, 0.006, 12, 100]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.35} blending={THREE.AdditiveBlending} />
      </mesh>
      <mesh ref={ring3Ref} rotation={[Math.PI / 5, 1.2, 0.4]}>
        <torusGeometry args={[2.15, 0.005, 12, 100]} />
        <meshBasicMaterial color="#8b5cf6" transparent opacity={0.25} blending={THREE.AdditiveBlending} />
      </mesh>
    </>
  );
}

function SceneWrapper() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.08;
    // Mouse tilt
    groupRef.current.rotation.x += (state.pointer.y * 0.15 - groupRef.current.rotation.x) * 0.05;
  });

  return (
    <group ref={groupRef}>
      <GlobeCore />
      {SKILLS.map((skill) => (
        <SkillLabel
          key={skill.name}
          name={skill.name}
          color={skill.color}
          angle={skill.angle}
          elevation={skill.elevation}
          radius={2.5}
        />
      ))}
    </group>
  );
}

export function SkillsGlobe({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[4, 4, 4]} color="#6366f1" intensity={5} />
        <pointLight position={[-4, -3, 2]} color="#06b6d4" intensity={3} />
        <pointLight position={[0, -4, -2]} color="#8b5cf6" intensity={2} />
        <SceneWrapper />
      </Canvas>
    </div>
  );
}
