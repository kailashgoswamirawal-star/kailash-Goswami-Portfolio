import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, RotateCw, Sparkles, Layers } from 'lucide-react';

export const Hero3DCard: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [rotMetrics, setRotMetrics] = useState({ x: 0, y: 0, z: 0 });
  const [isInteracting, setIsInteracting] = useState(false);
  const [colorIndex, setColorIndex] = useState(0);

  const sceneRef = useRef<THREE.Scene | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const wireframeRef = useRef<THREE.Mesh | null>(null);

  const colors = [0xc7ff3f, 0x00f0ff, 0xff007f, 0xffd700];

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.5);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(colors[colorIndex], 4, 10);
    pointLight.position.set(2, 2, 3);
    scene.add(pointLight);

    // Geometry & Material
    const geometry = new THREE.IcosahedronGeometry(1.3, 1);
    const material = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.1,
      metalness: 0.9,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Wireframe Overlay
    const wireMat = new THREE.MeshBasicMaterial({
      color: colors[colorIndex],
      wireframe: true,
      transparent: true,
      opacity: 0.5,
    });
    const wireframe = new THREE.Mesh(geometry, wireMat);
    wireframe.scale.set(1.02, 1.02, 1.02);
    mesh.add(wireframe);
    wireframeRef.current = wireframe;

    // Mouse Interaction
    let isDragging = false;
    let previousMousePosition = { x: 0, y: 0 };

    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      setIsInteracting(true);
      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging || !meshRef.current) return;
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;

      meshRef.current.rotation.y += deltaX * 0.01;
      meshRef.current.rotation.x += deltaY * 0.01;

      previousMousePosition = { x: e.clientX, y: e.clientY };
    };

    const onMouseUp = () => {
      isDragging = false;
      setIsInteracting(false);
    };

    const domEl = renderer.domElement;
    domEl.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);

    // Animation Loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      if (meshRef.current && !isDragging) {
        meshRef.current.rotation.y += 0.008;
        meshRef.current.rotation.x += 0.004;

        setRotMetrics({
          x: Math.round(THREE.MathUtils.radToDeg(meshRef.current.rotation.x) % 360),
          y: Math.round(THREE.MathUtils.radToDeg(meshRef.current.rotation.y) % 360),
          z: Math.round(THREE.MathUtils.radToDeg(meshRef.current.rotation.z) % 360),
        });
      }

      if (wireframeRef.current) {
        wireframeRef.current.rotation.y -= 0.01;
      }

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      domEl.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [colorIndex]);

  const toggleColor = () => {
    setColorIndex((prev) => (prev + 1) % colors.length);
  };

  return (
    <div className="bg-[#111111] text-white p-6 rounded-[28px] border border-[#222222] shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex flex-col justify-between relative overflow-hidden group hover:border-[#C7FF3F] transition-all">
      {/* Background Accent Mesh */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-[#C7FF3F]/10 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-[#C7FF3F] text-[#111111] flex items-center justify-center font-bold">
            <Box className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs font-black uppercase tracking-wider text-white">
              INTERACTIVE 3D CORE
            </h4>
            <p className="text-[9px] text-[#888888]">Drag mouse to rotate 3D object</p>
          </div>
        </div>

        <button
          onClick={toggleColor}
          className="px-2.5 py-1 bg-[#222222] hover:bg-[#C7FF3F] hover:text-[#111111] rounded-full text-[9px] font-mono font-bold uppercase transition-colors cursor-pointer border border-[#333333]"
        >
          COLOR
        </button>
      </div>

      {/* 3D Canvas Mount */}
      <div className="relative w-full h-[180px] my-2 flex items-center justify-center cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {isInteracting && (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#C7FF3F] text-[#111111] text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full shadow-lg pointer-events-none">
            DRAGGING 3D MESH
          </div>
        )}
      </div>

      {/* Real-time 3D Metrics Bar */}
      <div className="pt-3 border-t border-[#222222] flex items-center justify-between text-[10px] font-mono text-[#888888] z-10">
        <div className="flex items-center gap-3">
          <span>X: <strong className="text-[#C7FF3F]">{rotMetrics.x}°</strong></span>
          <span>Y: <strong className="text-[#C7FF3F]">{rotMetrics.y}°</strong></span>
          <span>Z: <strong className="text-[#C7FF3F]">{rotMetrics.z}°</strong></span>
        </div>
        <span className="flex items-center gap-1 text-[9px] text-[#C7FF3F] font-bold uppercase">
          <RotateCw className="w-3 h-3 animate-spin" />
          WebGL 60FPS
        </span>
      </div>
    </div>
  );
};
