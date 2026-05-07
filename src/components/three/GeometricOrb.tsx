"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/**
 * Rotating wireframe icosahedron orb for the About section.
 * Renders inside a container div, not fullscreen.
 */
export function GeometricOrb() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const W = container.clientWidth;
    const H = container.clientHeight;

    // ─── Scene ───────────────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, W / H, 0.1, 100);
    camera.position.set(0, 0, 4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ─── Geometry — nested icosahedra ────────────────────────────
    const group = new THREE.Group();
    scene.add(group);

    const createWireIco = (radius: number, detail: number, color: number, opacity: number) => {
      const geo = new THREE.IcosahedronGeometry(radius, detail);
      const edges = new THREE.EdgesGeometry(geo);
      const mat = new THREE.LineBasicMaterial({
        color,
        transparent: true,
        opacity,
        blending: THREE.AdditiveBlending,
      });
      return new THREE.LineSegments(edges, mat);
    };

    const outer = createWireIco(1.4, 1, 0x6366f1, 0.6);
    const middle = createWireIco(1.05, 0, 0x06b6d4, 0.45);
    const inner = createWireIco(0.65, 0, 0x8b5cf6, 0.35);
    group.add(outer, middle, inner);

    // Glow sphere (additive blend)
    const glowGeo = new THREE.SphereGeometry(1.0, 32, 32);
    const glowMat = new THREE.MeshBasicMaterial({
      color: 0x6366f1,
      transparent: true,
      opacity: 0.04,
      blending: THREE.AdditiveBlending,
    });
    group.add(new THREE.Mesh(glowGeo, glowMat));

    // ─── Orbiting satellites ─────────────────────────────────────
    const satellites: { mesh: THREE.Mesh; orbit: THREE.Object3D; speed: number }[] = [];

    const orbColors = [0x06b6d4, 0x10b981, 0x6366f1, 0xf59e0b];
    for (let i = 0; i < 4; i++) {
      const pivot = new THREE.Object3D();
      pivot.rotation.set(
        (i * Math.PI) / 3,
        (i * Math.PI * 2) / 4,
        i * 0.3
      );
      group.add(pivot);

      const sgeo = new THREE.SphereGeometry(0.055, 12, 12);
      const smat = new THREE.MeshBasicMaterial({
        color: orbColors[i],
        transparent: true,
        opacity: 0.9,
        blending: THREE.AdditiveBlending,
      });
      const sat = new THREE.Mesh(sgeo, smat);
      sat.position.set(1.7, 0, 0);
      pivot.add(sat);

      // Orbit ring
      const ringGeo = new THREE.RingGeometry(1.68, 1.72, 64);
      const ringMat = new THREE.MeshBasicMaterial({
        color: orbColors[i],
        transparent: true,
        opacity: 0.07,
        side: THREE.DoubleSide,
        blending: THREE.AdditiveBlending,
      });
      pivot.add(new THREE.Mesh(ringGeo, ringMat));

      satellites.push({ mesh: sat, orbit: pivot, speed: 0.008 + i * 0.003 });
    }

    // ─── Mouse tilt ──────────────────────────────────────────────
    const mouse = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };

    const onMouseMove = (e: MouseEvent) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove);

    // ─── Animation ───────────────────────────────────────────────
    let animId: number;
    const clock = new THREE.Timer();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      clock.update();
      const t = clock.getElapsed();

      // Smooth tilt toward mouse
      target.x += (mouse.x * 0.4 - target.x) * 0.05;
      target.y += (mouse.y * 0.3 - target.y) * 0.05;
      group.rotation.x = target.y + Math.sin(t * 0.3) * 0.08;
      group.rotation.y = target.x + t * 0.18;
      group.rotation.z = Math.sin(t * 0.2) * 0.05;

      // Counter-rotate inner shells
      outer.rotation.y = -t * 0.12;
      middle.rotation.y = t * 0.2;
      middle.rotation.x = t * 0.1;
      inner.rotation.y = -t * 0.25;
      inner.rotation.z = t * 0.15;

      // Satellites orbit
      satellites.forEach(({ orbit, speed }) => {
        orbit.rotation.y += speed;
      });

      // Pulsate glow
      glowMat.opacity = 0.03 + Math.sin(t * 1.5) * 0.025;

      renderer.render(scene, camera);
    };

    animate();

    // ─── Resize ──────────────────────────────────────────────────
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

  return (
    <div
      ref={mountRef}
      className="w-full h-full"
      style={{ minHeight: 420 }}
    />
  );
}
