import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Box, Eye, Layers, Sparkles, RefreshCw } from 'lucide-react';

export type ShapeMode = 'core' | 'polyhedra' | 'rings';

export const ThreeBackground: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [shapeMode, setShapeMode] = useState<ShapeMode>('core');
  const [isHovered, setIsHovered] = useState(false);
  const [fps, setFps] = useState<number>(60);

  // References to keep state across animations
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  
  // 3D Objects
  const coreMeshRef = useRef<THREE.Mesh | null>(null);
  const coreWireframeRef = useRef<THREE.Mesh | null>(null);
  const ringRef = useRef<THREE.Mesh | null>(null);
  const nodesGroupRef = useRef<THREE.Group | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);

  // Motion target variables for smooth lerp
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollRef = useRef({ y: 0, targetY: 0, progress: 0 });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.fog = new THREE.FogExp2(0xffffff, 0.02);

    // 2. Camera Setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.set(0, 0, 12);
    cameraRef.current = camera;

    // 3. Renderer Setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xc7ff3f, 2.5); // Lime Accent
    dirLight1.position.set(10, 15, 10);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x111111, 1.5);
    dirLight2.position.set(-10, -10, -5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xc7ff3f, 3, 20);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    // 5. Build Core Objects
    // Main Torus Knot (KALI X Core)
    const torusGeo = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x111111,
      roughness: 0.2,
      metalness: 0.8,
    });
    const coreMesh = new THREE.Mesh(torusGeo, coreMat);
    coreMesh.position.set(4, 0, -2);
    scene.add(coreMesh);
    coreMeshRef.current = coreMesh;

    // Core Outer Wireframe Accent
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3f,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });
    const coreWireframe = new THREE.Mesh(torusGeo, wireMat);
    coreWireframe.scale.set(1.05, 1.05, 1.05);
    coreMesh.add(coreWireframe);
    coreWireframeRef.current = coreWireframe;

    // Outer Orbital Cyber Ring
    const ringGeo = new THREE.TorusGeometry(3.2, 0.04, 16, 100);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0xc7ff3f,
      roughness: 0.1,
      metalness: 0.9,
      emissive: 0xc7ff3f,
      emissiveIntensity: 0.3,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    coreMesh.add(ringMesh);
    ringRef.current = ringMesh;

    // 6. Floating Enterprise AI Nodes (Polyhedra Group)
    const nodesGroup = new THREE.Group();
    const nodeGeometries = [
      new THREE.IcosahedronGeometry(0.5, 0),
      new THREE.DodecahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.45, 0),
      new THREE.TetrahedronGeometry(0.5, 0),
    ];
    const nodeMat = new THREE.MeshStandardMaterial({
      color: 0x222222,
      roughness: 0.3,
      metalness: 0.7,
    });
    const nodeWireMat = new THREE.MeshBasicMaterial({
      color: 0xc7ff3f,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });

    for (let i = 0; i < 18; i++) {
      const geo = nodeGeometries[i % nodeGeometries.length];
      const mesh = new THREE.Mesh(geo, nodeMat);
      const wire = new THREE.Mesh(geo, nodeWireMat);
      mesh.add(wire);

      // Random 3D positions in spatial orbit
      const radius = 6 + Math.random() * 8;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      mesh.position.set(
        radius * Math.sin(theta) * Math.cos(phi),
        radius * Math.sin(phi),
        radius * Math.cos(theta) * Math.cos(phi) - 2
      );

      mesh.userData = {
        rotSpeedX: (Math.random() - 0.5) * 0.02,
        rotSpeedY: (Math.random() - 0.5) * 0.02,
        orbitSpeed: (Math.random() + 0.5) * 0.005,
        radius,
        angle: theta,
        yBase: mesh.position.y
      };

      nodesGroup.add(mesh);
    }
    scene.add(nodesGroup);
    nodesGroupRef.current = nodesGroup;

    // 7. Glowing Particle Field
    const particleCount = 350;
    const particleGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const colorLime = new THREE.Color(0xc7ff3f);
    const colorDark = new THREE.Color(0x333333);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20 - 5;

      const mixedColor = Math.random() > 0.4 ? colorLime : colorDark;
      colors[i * 3] = mixedColor.r;
      colors[i * 3 + 1] = mixedColor.g;
      colors[i * 3 + 2] = mixedColor.b;
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMat = new THREE.PointsMaterial({
      size: 0.12,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
    });

    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);
    particlesRef.current = particles;

    // 8. Mouse & Scroll Event Handlers
    const handleMouseMove = (e: MouseEvent) => {
      const normX = (e.clientX / window.innerWidth) * 2 - 1;
      const normY = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.targetX = normX;
      mouseRef.current.targetY = normY;
    };

    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollRef.current.targetY = scrollY;
      scrollRef.current.progress = scrollY / maxScroll;
    };

    const handleResize = () => {
      if (!container || !cameraRef.current || !rendererRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    // Initial trigger
    handleScroll();

    // 9. Animation Loop
    let animationFrameId: number;
    let lastTime = performance.now();
    let frameCount = 0;
    let lastFpsUpdate = performance.now();

    const animate = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(animate);

      // FPS calculation
      frameCount++;
      if (currentTime - lastFpsUpdate >= 1000) {
        setFps(Math.round((frameCount * 1000) / (currentTime - lastFpsUpdate)));
        frameCount = 0;
        lastFpsUpdate = currentTime;
      }

      // Smooth Lerp for Mouse
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      // Smooth Lerp for Scroll
      scrollRef.current.y += (scrollRef.current.targetY - scrollRef.current.y) * 0.08;
      const scrollP = scrollRef.current.progress;

      // Rotate Main Core
      if (coreMeshRef.current) {
        // Scroll rotates Core on multiple axes dynamically
        coreMeshRef.current.rotation.x = scrollP * Math.PI * 4 + mouseRef.current.y * 0.4;
        coreMeshRef.current.rotation.y = scrollP * Math.PI * 6 + mouseRef.current.x * 0.6;
        coreMeshRef.current.rotation.z += 0.003;

        // Reposition core dynamically across sections as user scrolls!
        // Hero: top-right -> Process: center -> Projects: left -> About: right
        const scrollXOffset = Math.sin(scrollP * Math.PI * 3) * 3;
        const scrollYOffset = -scrollP * 12 + Math.cos(scrollP * Math.PI * 2) * 1.5;
        const scrollZOffset = -2 - scrollP * 4;

        coreMeshRef.current.position.x = 3.5 - scrollXOffset;
        coreMeshRef.current.position.y = scrollYOffset;
        coreMeshRef.current.position.z = scrollZOffset;
      }

      // Counter-rotate Wireframe
      if (coreWireframeRef.current) {
        coreWireframeRef.current.rotation.x -= 0.008;
        coreWireframeRef.current.rotation.y += 0.01;
      }

      // Rotate Orbital Ring
      if (ringRef.current) {
        ringRef.current.rotation.z += 0.015;
      }

      // Orbiting AI Nodes
      if (nodesGroupRef.current) {
        nodesGroupRef.current.rotation.y = scrollP * Math.PI * 2 + mouseRef.current.x * 0.2;
        nodesGroupRef.current.children.forEach((child) => {
          const mesh = child as THREE.Mesh;
          const data = mesh.userData;
          mesh.rotation.x += data.rotSpeedX;
          mesh.rotation.y += data.rotSpeedY;

          // Float animation
          data.angle += data.orbitSpeed;
          mesh.position.y = data.yBase + Math.sin(data.angle * 2) * 0.5;
        });
      }

      // Rotate Particle Field
      if (particlesRef.current) {
        particlesRef.current.rotation.y = scrollP * Math.PI * 1.5 + mouseRef.current.x * 0.1;
        particlesRef.current.rotation.x = mouseRef.current.y * 0.1;
      }

      // Camera Parallax
      if (cameraRef.current) {
        cameraRef.current.position.x = mouseRef.current.x * 1.2;
        cameraRef.current.position.y = mouseRef.current.y * 0.8;
        cameraRef.current.lookAt(0, -scrollP * 6, 0);
      }

      renderer.render(scene, camera);
    };

    animate(performance.now());

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Update Geometries when user switches shape mode
  useEffect(() => {
    if (!coreMeshRef.current) return;

    let newGeo: THREE.BufferGeometry;
    if (shapeMode === 'core') {
      newGeo = new THREE.TorusKnotGeometry(1.8, 0.5, 128, 32);
    } else if (shapeMode === 'polyhedra') {
      newGeo = new THREE.IcosahedronGeometry(2, 1);
    } else {
      newGeo = new THREE.TorusGeometry(2, 0.6, 32, 100);
    }

    coreMeshRef.current.geometry.dispose();
    coreMeshRef.current.geometry = newGeo;

    if (coreWireframeRef.current) {
      coreWireframeRef.current.geometry.dispose();
      coreWireframeRef.current.geometry = newGeo;
    }
  }, [shapeMode]);

  return (
    <>
      {/* Fixed Fullscreen WebGL Canvas Background */}
      <div
        ref={mountRef}
        className="fixed inset-0 pointer-events-none z-0 opacity-80 transition-opacity duration-1000"
      />

      {/* Interactive 3D Status & Control Badge Floating Widget */}
      <div className="fixed bottom-6 left-6 z-40 hidden md:flex items-center gap-2 p-1.5 pl-3 pr-2 bg-[#111111]/90 backdrop-blur-md border border-[#C7FF3F]/40 rounded-full text-white shadow-2xl hover:border-[#C7FF3F] transition-all">
        <div className="flex items-center gap-2 mr-1">
          <span className="w-2.5 h-2.5 rounded-full bg-[#C7FF3F] animate-pulse" />
          <span className="text-[10px] font-mono font-extrabold text-[#C7FF3F] uppercase tracking-wider">
            3D SCROLL ACTIVE
          </span>
        </div>

        <div className="h-4 w-[1px] bg-white/20" />

        {/* Mode Selector Toggle */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => setShapeMode('core')}
            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all cursor-pointer ${
              shapeMode === 'core'
                ? 'bg-[#C7FF3F] text-[#111111]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="KALI X Torus Core"
          >
            KALI Core
          </button>
          <button
            onClick={() => setShapeMode('polyhedra')}
            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all cursor-pointer ${
              shapeMode === 'polyhedra'
                ? 'bg-[#C7FF3F] text-[#111111]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="AI Polyhedra Cluster"
          >
            AI Poly
          </button>
          <button
            onClick={() => setShapeMode('rings')}
            className={`px-2.5 py-1 rounded-full text-[9px] font-bold uppercase transition-all cursor-pointer ${
              shapeMode === 'rings'
                ? 'bg-[#C7FF3F] text-[#111111]'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
            title="Cyber Orbital Ring"
          >
            Cyber Ring
          </button>
        </div>
      </div>
    </>
  );
};
