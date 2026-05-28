"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import * as THREE from "three";

const GOLD = new THREE.Color("#f2c14e");
const GOLD_BRIGHT = new THREE.Color("#ffd47a");
const GOLD_DEEP = new THREE.Color("#7a5d1f");

type SizeKey = "xs" | "sm" | "md" | "lg";

const SIZES: Record<
  SizeKey,
  { px: number; particles: number; shell: number; camera: number }
> = {
  xs: { px: 120, particles: 900, shell: 1.55, camera: 5.2 },
  sm: { px: 220, particles: 1400, shell: 1.65, camera: 5.5 },
  md: { px: 360, particles: 2200, shell: 1.8, camera: 6.2 },
  lg: { px: 520, particles: 3000, shell: 1.95, camera: 6.5 },
};

function Core() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const lightRef = useRef<THREE.PointLight>(null!);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const breath = 1 + Math.sin(t * 1.0) * 0.06;
    meshRef.current.scale.setScalar(breath);
    lightRef.current.intensity = 1.6 + Math.sin(t * 1.0) * 0.4;
  });

  return (
    <group>
      <pointLight
        ref={lightRef}
        color={GOLD}
        intensity={1.6}
        distance={8}
        decay={2}
      />
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.14, 64, 64]} />
        <meshBasicMaterial color={GOLD_BRIGHT} toneMapped={false} />
      </mesh>
    </group>
  );
}

function CoreHalo() {
  const ref = useRef<THREE.Sprite>(null!);

  const texture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext("2d")!;
    const grad = ctx.createRadialGradient(256, 256, 0, 256, 256, 256);
    grad.addColorStop(0, "rgba(255, 220, 150, 1)");
    grad.addColorStop(0.1, "rgba(242, 193, 78, 0.9)");
    grad.addColorStop(0.35, "rgba(242, 193, 78, 0.35)");
    grad.addColorStop(0.7, "rgba(242, 193, 78, 0.08)");
    grad.addColorStop(1, "rgba(242, 193, 78, 0)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 512);
    const t = new THREE.CanvasTexture(canvas);
    t.needsUpdate = true;
    return t;
  }, []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.elapsedTime;
    ref.current.scale.setScalar(1.5 + Math.sin(t * 1.0) * 0.1);
  });

  if (!texture) return null;
  return (
    <sprite ref={ref}>
      <spriteMaterial
        map={texture}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        depthTest={false}
        transparent
        toneMapped={false}
      />
    </sprite>
  );
}

function ParticleShell({
  count,
  shell,
}: {
  count: number;
  shell: number;
}) {
  const ref = useRef<THREE.Points>(null!);

  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const golden = Math.PI * (1 + Math.sqrt(5));
    const tmp = new THREE.Color();

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = golden * i;
      const r = shell + (Math.random() - 0.5) * 0.42;
      positions[i * 3] = r * Math.cos(theta) * radiusAtY;
      positions[i * 3 + 1] = r * y;
      positions[i * 3 + 2] = r * Math.sin(theta) * radiusAtY;

      // Mezcla orgánica: mayoría oro, algunos brillantes, pocos profundos.
      const roll = Math.random();
      if (roll < 0.18) tmp.copy(GOLD_BRIGHT);
      else if (roll < 0.9) tmp.copy(GOLD);
      else tmp.copy(GOLD_DEEP);
      colors[i * 3] = tmp.r;
      colors[i * 3 + 1] = tmp.g;
      colors[i * 3 + 2] = tmp.b;
    }
    return { positions, colors };
  }, [count, shell]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ref.current.rotation.y = t * 0.1;
    ref.current.rotation.x = Math.sin(t * 0.15) * 0.12;
    const breath = 1 + Math.sin(t * 1.0) * 0.018;
    ref.current.scale.setScalar(breath);
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        vertexColors
        transparent
        opacity={0.95}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        sizeAttenuation
        toneMapped={false}
      />
    </points>
  );
}

function Ring({
  axis,
  speed,
  radius,
  thickness,
  opacity = 0.7,
  color = GOLD,
}: {
  axis: THREE.Vector3;
  speed: number;
  radius: number;
  thickness: number;
  opacity?: number;
  color?: THREE.Color;
}) {
  const ref = useRef<THREE.Mesh>(null!);
  const normalizedAxis = useMemo(() => axis.clone().normalize(), [axis]);

  useFrame((_, delta) => {
    ref.current.rotateOnAxis(normalizedAxis, delta * speed);
  });

  return (
    <mesh ref={ref}>
      <torusGeometry args={[radius, thickness, 10, 160]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
        toneMapped={false}
      />
    </mesh>
  );
}

export default function NucleoJarvis({
  size = "md",
  className = "",
}: {
  size?: SizeKey;
  className?: string;
}) {
  const cfg = SIZES[size];

  return (
    <div
      style={{ width: cfg.px, height: cfg.px }}
      className={`pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <Canvas
        camera={{ position: [0, 0, cfg.camera], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 2]}
      >
        <ambientLight intensity={0.05} />
        <Core />
        <ParticleShell count={cfg.particles} shell={cfg.shell} />
        <CoreHalo />
        <Ring
          axis={new THREE.Vector3(0, 1, 0.12)}
          speed={0.25}
          radius={cfg.shell + 0.18}
          thickness={0.005}
          opacity={0.65}
        />
        <Ring
          axis={new THREE.Vector3(1, 0.3, 0)}
          speed={-0.18}
          radius={cfg.shell + 0.22}
          thickness={0.004}
          opacity={0.5}
          color={GOLD_BRIGHT}
        />
        <Ring
          axis={new THREE.Vector3(0.5, 0.8, 0.2)}
          speed={0.32}
          radius={cfg.shell + 0.26}
          thickness={0.003}
          opacity={0.38}
        />
        <EffectComposer>
          <Bloom
            intensity={0.95}
            luminanceThreshold={0.18}
            luminanceSmoothing={0.9}
            mipmapBlur
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
