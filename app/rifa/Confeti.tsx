"use client";

import { useEffect, useRef } from "react";

const COLORES = ["#F7A81B", "#FFD166", "#17458F", "#005DAA", "#FFFFFF"];

// Lluvia de papelitos que se dibuja una vez y se detiene sola.
export default function Confeti() {
  const lienzo = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = lienzo.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const escala = Math.min(window.devicePixelRatio || 1, 2);
    const ancho = window.innerWidth;
    const alto = window.innerHeight;
    canvas.width = ancho * escala;
    canvas.height = alto * escala;
    ctx.scale(escala, escala);

    const papelitos = Array.from({ length: 140 }, () => ({
      x: ancho / 2 + (Math.random() - 0.5) * ancho * 0.3,
      y: alto * 0.45,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 17 - 5,
      lado: Math.random() * 8 + 5,
      giro: Math.random() * Math.PI,
      vgiro: (Math.random() - 0.5) * 0.4,
      color: COLORES[Math.floor(Math.random() * COLORES.length)],
    }));

    const inicio = performance.now();
    const DURACION = 3200;
    let cuadro = 0;

    function dibujar(ahora: number) {
      const transcurrido = ahora - inicio;
      ctx!.clearRect(0, 0, ancho, alto);
      if (transcurrido > DURACION) return;
      ctx!.globalAlpha = Math.min(1, (DURACION - transcurrido) / 700);
      for (const p of papelitos) {
        p.vy += 0.42;
        p.vx *= 0.985;
        p.x += p.vx;
        p.y += p.vy;
        p.giro += p.vgiro;
        ctx!.save();
        ctx!.translate(p.x, p.y);
        ctx!.rotate(p.giro);
        ctx!.fillStyle = p.color;
        ctx!.fillRect(-p.lado / 2, -p.lado / 4, p.lado, p.lado / 2);
        ctx!.restore();
      }
      cuadro = requestAnimationFrame(dibujar);
    }
    cuadro = requestAnimationFrame(dibujar);
    return () => cancelAnimationFrame(cuadro);
  }, []);

  return (
    <canvas
      ref={lienzo}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[70] h-full w-full"
    />
  );
}
