"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight canvas "dust & ember" field. Particles drift upward like
 * kiln embers and subtly repel from the cursor. Pauses off-screen and
 * disables itself for reduced-motion users. No WebGL — cheap and 60fps.
 */
export function ParticleField({ className, dark = false }: { className?: string; dark?: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0;
    let h = 0;
    let raf = 0;
    let running = true;
    const mouse = { x: -9999, y: -9999 };

    type P = { x: number; y: number; r: number; vy: number; vx: number; a: number; ember: boolean };
    let parts: P[] = [];

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(90, Math.floor((w * h) / 16000));
      parts = Array.from({ length: count }, () => {
        const ember = Math.random() > 0.78;
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          r: ember ? Math.random() * 1.6 + 0.8 : Math.random() * 1.1 + 0.3,
          vy: -(Math.random() * 0.25 + 0.05),
          vx: (Math.random() - 0.5) * 0.15,
          a: Math.random() * 0.5 + 0.1,
          ember,
        };
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;

        // cursor repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 120) {
          const f = (120 - dist) / 120;
          p.x += (dx / dist) * f * 1.6;
          p.y += (dy / dist) * f * 1.6;
        }

        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        if (p.ember) {
          if (dark) {
            // glowing kiln embers on dark
            ctx.fillStyle = `rgba(255, 138, 61, ${p.a + 0.15})`;
            ctx.shadowColor = "rgba(255, 122, 45, 0.9)";
            ctx.shadowBlur = 10;
          } else {
            ctx.fillStyle = `rgba(63, 143, 127, ${p.a})`;
            ctx.shadowColor = "rgba(27, 58, 107, 0.5)";
            ctx.shadowBlur = 6;
          }
        } else {
          ctx.fillStyle = dark
            ? `rgba(180, 200, 230, ${p.a * 0.5})`
            : `rgba(110, 124, 148, ${p.a * 0.5})`;
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      }
      ctx.shadowBlur = 0;
      if (running) raf = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };

    const io = new IntersectionObserver(([entry]) => {
      running = entry.isIntersecting;
      if (running) raf = requestAnimationFrame(draw);
      else cancelAnimationFrame(raf);
    });

    resize();
    io.observe(canvas);
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return <canvas ref={ref} className={className} aria-hidden />;
}
