"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export type EstadoAplauso = "off" | "encendiendo" | "escuchando";

type Opciones = {
  onDoble: () => void;
  ventanaMs?: number;
  cooldownMs?: number;
  thresholdDb?: number; // valor 0–255 sobre getByteFrequencyData
};

export function useDobleAplauso(opts: Opciones) {
  const {
    onDoble,
    ventanaMs = 750,
    cooldownMs = 1800,
    thresholdDb = 175,
  } = opts;

  const [estado, setEstado] = useState<EstadoAplauso>("off");
  const [error, setError] = useState<string | null>(null);

  const ctxRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const rafRef = useRef<number | null>(null);
  const lastPeakRef = useRef<number>(0);
  const lastFireRef = useRef<number>(0);
  const cooldownPeakRef = useRef<number>(0);
  const onDobleRef = useRef(onDoble);

  useEffect(() => {
    onDobleRef.current = onDoble;
  }, [onDoble]);

  const desactivar = useCallback(() => {
    if (rafRef.current !== null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    ctxRef.current?.close().catch(() => undefined);
    ctxRef.current = null;
    analyserRef.current = null;
    setEstado("off");
  }, []);

  const activar = useCallback(async () => {
    setError(null);
    setEstado("encendiendo");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      type ACtor = typeof AudioContext;
      const ACClass: ACtor =
        window.AudioContext ??
        ((window as unknown as { webkitAudioContext: ACtor }).webkitAudioContext);
      const ctx = new ACClass();
      ctxRef.current = ctx;

      const source = ctx.createMediaStreamSource(stream);
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.15;
      source.connect(analyser);
      analyserRef.current = analyser;

      const buffer = new Uint8Array(analyser.frequencyBinCount);
      const sampleRate = ctx.sampleRate;
      const binHz = sampleRate / 2 / buffer.length;
      const loIdx = Math.max(1, Math.floor(1000 / binHz));
      const hiIdx = Math.min(buffer.length - 1, Math.floor(8000 / binHz));

      const loop = () => {
        analyser.getByteFrequencyData(buffer);
        let max = 0;
        for (let i = loIdx; i < hiIdx; i++) {
          if (buffer[i] > max) max = buffer[i];
        }
        const now = performance.now();

        if (
          max > thresholdDb &&
          now - lastFireRef.current > cooldownMs &&
          now - cooldownPeakRef.current > 80
        ) {
          cooldownPeakRef.current = now;
          const sincePrev = now - lastPeakRef.current;
          if (sincePrev > 120 && sincePrev < ventanaMs) {
            lastFireRef.current = now;
            lastPeakRef.current = 0;
            onDobleRef.current();
          } else {
            lastPeakRef.current = now;
          }
        }
        rafRef.current = requestAnimationFrame(loop);
      };
      rafRef.current = requestAnimationFrame(loop);
      setEstado("escuchando");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "No se pudo activar el micrófono";
      setError(msg);
      setEstado("off");
    }
  }, [cooldownMs, thresholdDb, ventanaMs]);

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      ctxRef.current?.close().catch(() => undefined);
    },
    [],
  );

  return { estado, error, activar, desactivar };
}
