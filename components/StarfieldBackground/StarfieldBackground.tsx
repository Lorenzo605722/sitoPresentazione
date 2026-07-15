"use client";

import { useEffect, useRef } from "react";
import styles from "./StarfieldBackground.module.css";

interface StarLayer {
  count: number;
  speed: number;
  size: [number, number];
  depth: number;
  alpha: number;
}

interface Star {
  x: number;
  y: number;
  r: number;
  layer: number;
  twinkle: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  max: number;
}

function readCssColor(element: HTMLElement, variable: string, fallback: string): string {
  const value = getComputedStyle(element).getPropertyValue(variable).trim();
  return value || fallback;
}

function withAlpha(color: string, alpha: number): string {
  if (color.startsWith("#")) {
    const hex = color.slice(1);
    const normalized =
      hex.length === 3
        ? hex
            .split("")
            .map((c) => c + c)
            .join("")
        : hex;
    const r = parseInt(normalized.slice(0, 2), 16);
    const g = parseInt(normalized.slice(2, 4), 16);
    const b = parseInt(normalized.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  if (color.startsWith("rgb(")) {
    return color.replace("rgb(", "rgba(").replace(")", `, ${alpha})`);
  }

  return color;
}

export function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduceMotionRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mql.matches;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let mouseX = 0;
    let mouseY = 0;
    let t = 0;
    let resizeTimeout: ReturnType<typeof setTimeout> | undefined;

    const starColor = readCssColor(document.documentElement, "--text", "#e7f6fb");
    const accentColor = readCssColor(document.documentElement, "--accent", "#4ce4ff");

    const layers: StarLayer[] = [
      { count: 110, speed: 0.018, size: [0.4, 1.1], depth: 6, alpha: 0.45 },
      { count: 70, speed: 0.045, size: [0.8, 1.6], depth: 14, alpha: 0.7 },
      { count: 36, speed: 0.08, size: [1.2, 2.2], depth: 26, alpha: 0.95 },
    ];

    let stars: Star[] = [];
    let shooting: ShootingStar[] = [];

    const seed = () => {
      stars = layers.flatMap((layer, li) =>
        Array.from({ length: layer.count }).map(() => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: layer.size[0] + Math.random() * (layer.size[1] - layer.size[0]),
          layer: li,
          twinkle: Math.random() * Math.PI * 2,
        }))
      );
    };

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      if (w <= 0 || h <= 0) return;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const scheduleResize = () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(resize, 150);
    };

    const onMove = (e: MouseEvent) => {
      mouseX = (e.clientX / w - 0.5) * 2;
      mouseY = (e.clientY / h - 0.5) * 2;
    };

    const maybeSpawnShootingStar = () => {
      if (Math.random() < 0.003 && shooting.length < 2) {
        shooting.push({
          x: Math.random() * w * 0.6 + w * 0.2,
          y: -10,
          vx: 3.2 + Math.random() * 1.6,
          vy: 2.2 + Math.random() * 1.2,
          life: 0,
          max: 40 + Math.random() * 20,
        });
      }
    };

    const draw = () => {
      if (w <= 0 || h <= 0) return;
      t += 1;
      ctx.clearRect(0, 0, w, h);

      layers.forEach((layer, li) => {
        stars
          .filter((s) => s.layer === li)
          .forEach((s) => {
            const parallaxX = mouseX * layer.depth;
            const parallaxY = mouseY * layer.depth;
            const y = (s.y + ((t * layer.speed) % h) + h) % h;
            const twinkle = 0.55 + 0.45 * Math.sin(t * 0.03 + s.twinkle);
            ctx.beginPath();
            ctx.arc(s.x + parallaxX, y + parallaxY, s.r, 0, Math.PI * 2);
            ctx.fillStyle = withAlpha(starColor, layer.alpha * twinkle);
            ctx.fill();
          });
      });

      maybeSpawnShootingStar();
      shooting.forEach((s) => {
        s.x += s.vx;
        s.y += s.vy;
        s.life += 1;
        const alpha = Math.max(1 - s.life / s.max, 0);
        ctx.strokeStyle = withAlpha(accentColor, alpha);
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.vx * 6, s.y - s.vy * 6);
        ctx.stroke();
      });
      shooting = shooting.filter((s) => s.life < s.max && s.y < h + 20);

      raf = requestAnimationFrame(draw);
    };

    const staticDraw = () => {
      ctx.clearRect(0, 0, w, h);
      stars.forEach((s) => {
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = withAlpha(starColor, 0.7);
        ctx.fill();
      });
    };

    resize();
    window.addEventListener("resize", scheduleResize);

    const onMotionChange = () => {
      reduceMotionRef.current = mql.matches;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      if (mql.matches) {
        staticDraw();
      } else {
        window.addEventListener("mousemove", onMove);
        raf = requestAnimationFrame(draw);
      }
    };

    mql.addEventListener("change", onMotionChange);

    if (reduceMotionRef.current) {
      staticDraw();
    } else {
      window.addEventListener("mousemove", onMove);
      raf = requestAnimationFrame(draw);
    }

    return () => {
      window.removeEventListener("resize", scheduleResize);
      window.removeEventListener("mousemove", onMove);
      mql.removeEventListener("change", onMotionChange);
      clearTimeout(resizeTimeout);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden
    />
  );
}
