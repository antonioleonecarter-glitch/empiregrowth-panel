"use client";

import { useEffect, useRef } from "react";

type Estrella = {
  x: number;
  y: number;
  r: number;
  o: number;
  s: number;
};

export default function FondoEspacial({
  cantidadEstrellas = 160,
}: {
  cantidadEstrellas?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();

    const estrellas: Estrella[] = Array.from(
      { length: cantidadEstrellas },
      () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.3,
        o: Math.random(),
        s: Math.random() * 0.02 + 0.005,
      }),
    );

    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const s of estrellas) {
        s.o += s.s;
        if (s.o > 1 || s.o < 0) s.s *= -1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 7);
        ctx.fillStyle = `rgba(200, 220, 255, ${Math.abs(s.o) * 0.7})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [cantidadEstrellas]);

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none fixed inset-0 -z-10"
      />
      {/* Nebulosa celeste arriba-derecha */}
      <div
        aria-hidden
        className="pointer-events-none fixed -z-10"
        style={{
          width: 700,
          height: 700,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(95, 184, 230, 0.06), transparent 70%)",
          filter: "blur(90px)",
          top: -200,
          right: -150,
        }}
      />
      {/* Nebulosa dorada abajo-izquierda */}
      <div
        aria-hidden
        className="pointer-events-none fixed -z-10"
        style={{
          width: 600,
          height: 600,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(242, 193, 78, 0.045), transparent 70%)",
          filter: "blur(90px)",
          bottom: -150,
          left: -100,
        }}
      />
    </>
  );
}
