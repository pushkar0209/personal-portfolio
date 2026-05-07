"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

interface NeuralBackgroundProps {
  className?: string;
}

export function NeuralBackground({ className = "" }: NeuralBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mountRef = useRef<{
    renderer: THREE.WebGLRenderer;
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    animId: number;
  } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // ─── Scene Setup ───────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      2000
    );
    camera.position.set(0, 0, 200);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);

    // ─── Particle System ───────────────────────────────────────────────
    const PARTICLE_COUNT = 220;
    const SPREAD = 300;
    const CONNECTION_DIST = 80;

    const positions: THREE.Vector3[] = [];
    const velocities: THREE.Vector3[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * SPREAD,
          (Math.random() - 0.5) * SPREAD * 0.6,
          (Math.random() - 0.5) * SPREAD * 0.4
        )
      );
      velocities.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 0.08,
          (Math.random() - 0.5) * 0.06,
          (Math.random() - 0.5) * 0.04
        )
      );
    }

    // Dots geometry
    const dotGeometry = new THREE.BufferGeometry();
    const dotPositions = new Float32Array(PARTICLE_COUNT * 3);
    const dotColors = new Float32Array(PARTICLE_COUNT * 3);

    const colorPalette = [
      new THREE.Color(0x6366f1), // indigo
      new THREE.Color(0x06b6d4), // cyan
      new THREE.Color(0x8b5cf6), // violet
      new THREE.Color(0x10b981), // emerald
    ];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      dotPositions[i * 3] = positions[i].x;
      dotPositions[i * 3 + 1] = positions[i].y;
      dotPositions[i * 3 + 2] = positions[i].z;
      const c = colorPalette[i % colorPalette.length];
      dotColors[i * 3] = c.r;
      dotColors[i * 3 + 1] = c.g;
      dotColors[i * 3 + 2] = c.b;
    }

    dotGeometry.setAttribute("position", new THREE.BufferAttribute(dotPositions, 3));
    dotGeometry.setAttribute("color", new THREE.BufferAttribute(dotColors, 3));

    const dotMaterial = new THREE.PointsMaterial({
      size: 2.5,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const dots = new THREE.Points(dotGeometry, dotMaterial);
    scene.add(dots);

    // Lines geometry (pre-allocated with max possible connections)
    const MAX_CONNECTIONS = PARTICLE_COUNT * (PARTICLE_COUNT - 1);
    const lineGeometry = new THREE.BufferGeometry();
    const linePositions = new Float32Array(MAX_CONNECTIONS * 6);
    const lineColors = new Float32Array(MAX_CONNECTIONS * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineSegments(
      lineGeometry,
      new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.18,
        blending: THREE.AdditiveBlending,
      })
    );
    scene.add(lineMaterial);

    // ─── Mouse tracking ─────────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const targetCameraOffset = { x: 0, y: 0 };
    const currentCameraOffset = { x: 0, y: 0 };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      mouse.y = -((e.clientY - rect.top) / rect.height - 0.5) * 2;
      targetCameraOffset.x = mouse.x * 15;
      targetCameraOffset.y = mouse.y * 10;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // ─── Resize handler ─────────────────────────────────────────────────
    const handleResize = () => {
      if (!canvas) return;
      const w = canvas.clientWidth;
      const h = canvas.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const resizeObs = new ResizeObserver(handleResize);
    resizeObs.observe(canvas);

    // ─── Animation Loop ──────────────────────────────────────────────────
    let frame = 0;
    const clock = new THREE.Timer();

    function animate() {
      const animId = requestAnimationFrame(animate);
      mountRef.current && (mountRef.current.animId = animId);

      frame++;
      clock.update();
      const t = clock.getElapsed();

      // Smooth camera parallax
      currentCameraOffset.x += (targetCameraOffset.x - currentCameraOffset.x) * 0.035;
      currentCameraOffset.y += (targetCameraOffset.y - currentCameraOffset.y) * 0.035;
      camera.position.x = currentCameraOffset.x;
      camera.position.y = currentCameraOffset.y;
      camera.lookAt(0, 0, 0);

      // Update particle positions
      const dp = dotGeometry.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        positions[i].add(velocities[i]);

        // Soft boundary bounce
        if (Math.abs(positions[i].x) > SPREAD / 2) velocities[i].x *= -1;
        if (Math.abs(positions[i].y) > SPREAD * 0.3) velocities[i].y *= -1;
        if (Math.abs(positions[i].z) > SPREAD * 0.2) velocities[i].z *= -1;

        // Subtle sinusoidal drift
        positions[i].x += Math.sin(t * 0.3 + i * 0.4) * 0.01;
        positions[i].y += Math.cos(t * 0.25 + i * 0.3) * 0.008;

        dp.setXYZ(i, positions[i].x, positions[i].y, positions[i].z);
      }
      dp.needsUpdate = true;

      // Update connections every 2 frames for perf
      if (frame % 2 === 0) {
        let lineIdx = 0;
        const lp = lineGeometry.attributes.position as THREE.BufferAttribute;
        const lc = lineGeometry.attributes.color as THREE.BufferAttribute;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          for (let j = i + 1; j < PARTICLE_COUNT; j++) {
            const dist = positions[i].distanceTo(positions[j]);
            if (dist < CONNECTION_DIST) {
              const alpha = (1 - dist / CONNECTION_DIST);

              // Alternate colors between the two endpoints
              const ci = colorPalette[i % colorPalette.length];
              const cj = colorPalette[j % colorPalette.length];

              lp.setXYZ(lineIdx * 2, positions[i].x, positions[i].y, positions[i].z);
              lp.setXYZ(lineIdx * 2 + 1, positions[j].x, positions[j].y, positions[j].z);
              lc.setXYZ(lineIdx * 2, ci.r * alpha, ci.g * alpha, ci.b * alpha);
              lc.setXYZ(lineIdx * 2 + 1, cj.r * alpha, cj.g * alpha, cj.b * alpha);

              lineIdx++;
              if (lineIdx * 2 >= MAX_CONNECTIONS) break;
            }
          }
          if (lineIdx * 2 >= MAX_CONNECTIONS) break;
        }

        lineGeometry.setDrawRange(0, lineIdx * 2);
        lp.needsUpdate = true;
        lc.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    const animId = requestAnimationFrame(animate);

    mountRef.current = { renderer, scene, camera, animId };

    return () => {
      cancelAnimationFrame(animId);
      resizeObs.disconnect();
      window.removeEventListener("mousemove", handleMouseMove);
      renderer.dispose();
      dotGeometry.dispose();
      lineGeometry.dispose();
      dotMaterial.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={{ zIndex: 0 }}
    />
  );
}
