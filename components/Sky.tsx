"use client";

import { useEffect, useRef } from "react";

type Star = { x: number; y: number; r: number; p: number };

/** Ночное небо со звёздами и северным сиянием. */
export default function Sky() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = ref.current;
    const ctx = c?.getContext("2d");
    if (!c || !ctx) return;
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    let W = 0, H = 0, raf = 0;
    let stars: Star[] = [];

    const size = () => {
      W = c.clientWidth;
      H = c.clientHeight;
      c.width = W * dpr;
      c.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = Array.from({ length: Math.round((W * H) / 3200) }, () => ({
        x: Math.random() * W,
        y: Math.random() * H * 0.7,
        r: Math.random() * 1.3 + 0.3,
        p: Math.random() * 6.28,
      }));
    };

    const bands: [string, number, number, number][] = [
      ["58,160,140", 0.22, 0.18, 0],
      ["90,120,210", 0.18, 0.26, 2],
      ["233,185,73", 0.08, 0.14, 4],
    ];

    const draw = (t: number) => {
      const g = ctx.createLinearGradient(0, 0, 0, H);
      g.addColorStop(0, "#081026");
      g.addColorStop(0.55, "#15254a");
      g.addColorStop(1, "#243a6b");
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, W, H);

      ctx.fillStyle = "#fff6dc";
      for (const s of stars) {
        ctx.globalAlpha = 0.45 + 0.55 * Math.abs(Math.sin(s.p + t / 1400));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, 6.28);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      ctx.globalCompositeOperation = "lighter";
      for (const [col, a, yy, ph] of bands) {
        for (let x = 0; x <= W; x += 6) {
          const y = H * yy + Math.sin(x / 190 + t / 5200 + ph) * 38 + Math.sin(x / 70 + t / 3100 + ph) * 12;
          const h = 120 + Math.sin(x / 120 + t / 4000 + ph) * 60;
          const gr = ctx.createLinearGradient(0, y, 0, y + h);
          gr.addColorStop(0, `rgba(${col},0)`);
          gr.addColorStop(0.35, `rgba(${col},${a})`);
          gr.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = gr;
          ctx.fillRect(x, y, 6, h);
        }
      }
      ctx.globalCompositeOperation = "source-over";
      if (!still) raf = requestAnimationFrame(draw);
    };

    const onResize = () => {
      size();
      if (still) draw(0);
    };
    size();
    window.addEventListener("resize", onResize);
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" />;
}
