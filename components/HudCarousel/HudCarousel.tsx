"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";
import type { ProjectGalleryImage } from "@/types";
import styles from "./HudCarousel.module.css";

export interface HudCarouselProps {
  images: readonly ProjectGalleryImage[];
  label?: string;
}

export function HudCarousel({ images, label = "Screenshot moduli" }: HudCarouselProps) {
  const [index, setIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const touchStartX = useRef<number | null>(null);

  const total = images.length;
  const current = images[index];

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);
    const onChange = () => setReduceMotion(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);

  const goTo = useCallback(
    (next: number) => {
      if (total <= 0) return;
      setIndex(((next % total) + total) % total);
    },
    [total]
  );

  const previous = useCallback(() => goTo(index - 1), [goTo, index]);
  const next = useCallback(() => goTo(index + 1), [goTo, index]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      previous();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      next();
    }
  };

  const onTouchStart = (event: React.TouchEvent) => {
    touchStartX.current = event.touches[0]?.clientX ?? null;
  };

  const onTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const endX = event.changedTouches[0]?.clientX ?? touchStartX.current;
    const delta = endX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) < 48) return;
    if (delta > 0) previous();
    else next();
  };

  if (!current || total === 0) return null;

  return (
    <div
      className={styles.root}
      role="region"
      aria-roledescription="carosello"
      aria-label={label}
      tabIndex={0}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className={styles.meta}>
        <span className={styles.metaLabel}>VIEW</span>
        <span className={styles.metaCaption}>
          {current.caption ?? `Slide ${index + 1}`}
        </span>
        <span className={styles.metaCount} aria-live="polite">
          {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
        </span>
      </div>

      <div className={styles.frame}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          key={current.src}
          src={current.src}
          alt={current.alt}
          className={[
            styles.image,
            reduceMotion ? styles.imageStatic : styles.imageAnim,
          ].join(" ")}
          draggable={false}
        />

        <button
          type="button"
          className={`${styles.nav} ${styles.navPrev}`}
          onClick={previous}
          aria-label="Screenshot precedente"
        >
          ‹
        </button>
        <button
          type="button"
          className={`${styles.nav} ${styles.navNext}`}
          onClick={next}
          aria-label="Screenshot successivo"
        >
          ›
        </button>
      </div>

      <div className={styles.dots} role="tablist" aria-label="Seleziona screenshot">
        {images.map((image, i) => (
          <button
            key={image.src}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={image.caption ?? `Screenshot ${i + 1}`}
            className={`${styles.dot} ${i === index ? styles.dotActive : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
