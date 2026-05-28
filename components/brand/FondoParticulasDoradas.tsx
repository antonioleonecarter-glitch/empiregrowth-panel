"use client";

import { useEffect, useRef } from "react";

type Particula = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  a: number;
  tw: number;
};

export default function FondoParticulasDoradas({
  count = 90,
}: {
  count?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particulas: Particula[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const generar = () => {
      particulas = [];
      const W = window.innerWidth;
      const H = window.innerHeight;
      for (let i = 0; i < count; i++) {
        particulas.push({
          x: Math.random() * W,
          y: Math.random() * H,
          r: Math.random() * 1.6 + 0.4,
          vx: (Math.random() - 0.5) * 0.18,
          vy: (Math.random() - 0.5) * 0.18,
          a: Math.random() * 0.5 + 0.2,
          tw: Math.random() * 6.28,
        });
      }
    };

    resize();
    generar();

    let t = 0;
    const draw = () => {
      const W = window.innerWidth;
      const H = window.innerHeight;
      t += 0.02;
      ctx.clearRect(0, 0, W, H);
      for (const p of particulas) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = W;
        if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H;
        if (p.y > H) p.y = 0;
        const tw = 0.5 + 0.5 * Math.sin(t + p.tw);
        ctx.beginPath();
        ctx.fillStyle = `rgba(242, 193, 78, ${p.a * tw})`;
        ctx.arc(p.x, p.y, p.r, 0, 6.28);
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      generar();
    };
    window.addEventListener("resize", onResize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, [count]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10"
    />
  );
}
