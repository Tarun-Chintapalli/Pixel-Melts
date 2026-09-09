import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { STLLoader } from "three/examples/jsm/loaders/STLLoader.js";

/**
 * Lightweight, dependency-free STL viewer.
 * - Auto-rotates, supports drag-to-orbit and wheel-to-zoom.
 * - Molten metal material with a rim light for a premium look.
 */
export default function ModelViewer({
  src = "/models/hero.stl",
  color = "#f47b20",
  className = "",
  autoRotate = true,
  enableZoom = false,
  height = 480,
  // Mesh tilt so the model faces the camera correctly. STLs vary in their
  // "up" axis; pitch rotates around X, roll around Z.
  pitch = 0,
  roll = 0,
  spin = 0.006,
}) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const fallbackH = typeof height === "number" && height < 5000 ? height : 400;
    let width = mount.clientWidth;
    let h = mount.clientHeight || fallbackH;

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / h, 0.1, 3000);
    camera.position.set(0, 0, 220);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, h);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.touchAction = "pan-y";
    renderer.domElement.style.cursor = "grab";

    // ---- Lighting rig ----
    scene.add(new THREE.AmbientLight(0xffffff, 0.35));

    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(120, 160, 180);
    scene.add(key);

    const rim = new THREE.DirectionalLight(new THREE.Color(color), 3.2);
    rim.position.set(-180, 60, -120);
    scene.add(rim);

    const fill = new THREE.PointLight(0x6ee7ff, 1.2, 1200);
    fill.position.set(-120, -120, 160);
    scene.add(fill);

    let mesh = null;
    const pivot = new THREE.Group();
    scene.add(pivot);

    const loader = new STLLoader();
    loader.load(
      src,
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
          color: new THREE.Color(color),
          metalness: 0.55,
          roughness: 0.35,
          envMapIntensity: 1,
        });

        mesh = new THREE.Mesh(geometry, material);

        // Normalize scale so any STL fits the frame
        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 130 / maxDim;
        mesh.scale.setScalar(scale);
        // Orient the model. Default (pitch=0) keeps the STL's native Z-up
        // standing upright as a side view; callers can tweak per-model.
        mesh.rotation.x = pitch;
        mesh.rotation.z = roll;

        pivot.add(mesh);
        setLoading(false);
      },
      undefined,
      () => {
        setError(true);
        setLoading(false);
      }
    );

    // ---- Interaction ----
    let isDragging = false;
    let prevX = 0;
    let prevY = 0;
    let velX = spin;
    let velY = 0;
    let targetZ = 220;

    const onDown = (e) => {
      isDragging = true;
      renderer.domElement.style.cursor = "grabbing";
      const p = e.touches ? e.touches[0] : e;
      prevX = p.clientX;
      prevY = p.clientY;
    };
    const onMove = (e) => {
      if (!isDragging) return;
      const isTouch = !!e.touches;
      const p = isTouch ? e.touches[0] : e;
      const dx = p.clientX - prevX;
      const dy = p.clientY - prevY;
      velX = dx * 0.006;
      // On touch, ignore vertical drag so the browser keeps handling
      // vertical page scroll (touch-action: pan-y). Only horizontal
      // swipes spin the model, so users never get "stuck" on the hero.
      velY = isTouch ? 0 : dy * 0.006;
      prevX = p.clientX;
      prevY = p.clientY;
    };
    const onUp = () => {
      isDragging = false;
      renderer.domElement.style.cursor = "grab";
    };
    const onWheel = (e) => {
      if (!enableZoom) return;
      e.preventDefault();
      targetZ = THREE.MathUtils.clamp(targetZ + e.deltaY * 0.15, 120, 420);
    };

    const el = renderer.domElement;
    el.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    el.addEventListener("touchstart", onDown, { passive: true });
    el.addEventListener("touchmove", onMove, { passive: true });
    el.addEventListener("touchend", onUp);
    el.addEventListener("wheel", onWheel, { passive: false });

    // ---- Render loop ----
    let raf;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      if (!isDragging && autoRotate) {
        velX += (spin - velX) * 0.02;
        velY += (0 - velY) * 0.05;
      } else {
        velX *= 0.94;
        velY *= 0.94;
      }
      pivot.rotation.y += velX;
      pivot.rotation.x = THREE.MathUtils.clamp(
        pivot.rotation.x + velY,
        -0.6,
        0.6
      );
      camera.position.z += (targetZ - camera.position.z) * 0.08;
      renderer.render(scene, camera);
    };
    animate();

    // ---- Resize ----
    const onResize = () => {
      width = mount.clientWidth;
      h = mount.clientHeight || fallbackH;
      camera.aspect = width / h;
      camera.updateProjectionMatrix();
      renderer.setSize(width, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      el.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      el.removeEventListener("touchstart", onDown);
      el.removeEventListener("touchmove", onMove);
      el.removeEventListener("touchend", onUp);
      el.removeEventListener("wheel", onWheel);
      if (mesh) {
        mesh.geometry.dispose();
        mesh.material.dispose();
      }
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, [src, color, autoRotate, enableZoom, height, pitch, roll, spin]);

  const containerHeight = typeof height === "number" && height < 5000 ? height : "100%";

  return (
    <div className={`relative ${className}`} style={{ height: containerHeight }}>
      <div ref={mountRef} className="h-full w-full" />

      {loading && !error && (
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-[var(--pm-flame)]" />
          <span className="font-mono text-[11px] uppercase tracking-[0.3em] text-[var(--pm-faint)]">
            Rendering model
          </span>
        </div>
      )}

      {error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="font-mono text-xs text-[var(--pm-faint)]">
            Model preview unavailable
          </span>
        </div>
      )}
    </div>
  );
}
