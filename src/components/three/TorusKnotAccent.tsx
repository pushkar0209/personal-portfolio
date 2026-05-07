"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * A floating 3D torus-knot with dynamic material for the Skills section header.
 * Renders as a compact accent piece next to the section heading.
 */
export function TorusKnotAccent() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 50);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ─── Torus knot ────────────────────────────────────────────
    const geo = new THREE.TorusKnotGeometry(1, 0.32, 120, 20, 3, 5);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x6366f1,
      emissive: 0x6366f1,
      emissiveIntensity: 0.4,
      metalness: 0.8,
      roughness: 0.15,
      wireframe: false,
    });
    const knot = new THREE.Mesh(geo, mat);
    scene.add(knot);

    // Wireframe overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x06b6d4,
      wireframe: true,
      transparent: true,
      opacity: 0.12,
      blending: THREE.AdditiveBlending,
    });
    scene.add(new THREE.Mesh(geo, wireMat));

    // ─── Lighting ──────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.3));

    const pl1 = new THREE.PointLight(0x6366f1, 8, 12);
    pl1.position.set(3, 3, 3);
    scene.add(pl1);

    const pl2 = new THREE.PointLight(0x06b6d4, 6, 10);
    pl2.position.set(-3, -2, 2);
    scene.add(pl2);

    const pl3 = new THREE.PointLight(0x10b981, 4, 8);
    pl3.position.set(0, -3, 1);
    scene.add(pl3);

    // ─── Mouse tilt ──────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── Animate ────────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Timer();
    let targetRX = 0, targetRY = 0;

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.update();
      const t = clock.getElapsed();

      targetRX += (mouse.y * 0.5 - targetRX) * 0.05;
      targetRY += (mouse.x * 0.5 - targetRY) * 0.05;

      knot.rotation.x = targetRX + t * 0.2;
      knot.rotation.y = targetRY + t * 0.35;

      // Shift emissive color over time (indigo → cyan → violet)
      mat.emissive.setHSL(0.65 + Math.sin(t * 0.3) * 0.1, 0.9, 0.4);
      mat.color.setHSL(0.65 + Math.sin(t * 0.3) * 0.1, 1.0, 0.5);

      // Bobbing lights
      pl1.position.x = Math.cos(t * 0.8) * 3;
      pl1.position.y = Math.sin(t * 0.6) * 3;
      pl2.position.x = Math.cos(t * 0.5 + 2) * 3;
      pl2.position.y = Math.sin(t * 0.7 + 1) * 2;

      renderer.render(scene, camera);
    };

    animate();

    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      renderer.dispose();
      container.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} className="w-full h-full" style={{ minHeight: 320 }} />;
}
