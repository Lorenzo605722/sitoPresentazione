"use client";

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  DEFAULT_HERO_STATUS_CHIPS,
  type HeroSpaceProps,
} from "@/types";
import { buildSegmentStyle } from "./heroSpace.types";
import {
  buildReactorSegments,
  getReactorCssVars,
  getReactorTimeline,
} from "./reactorGeometry";
import styles from "./HeroSpace.module.css";

const REACTOR_SEGMENTS = buildReactorSegments();
const REACTOR_TIMELINE = getReactorTimeline();

const reactorStyle = getReactorCssVars() as CSSProperties;

const GLYPHS = "!<>-_\\/[]{}=+*^#01";

type HeroPhase = "boot" | "scan" | "reveal" | "ignite" | "done";

function useDecryptText(
  text: string,
  active: boolean,
  charDelay = 26,
  idleBlank = false
): string {
  const [display, setDisplay] = useState(() => {
    if (idleBlank) return "";
    return active ? "" : text;
  });

  useEffect(() => {
    if (!active) {
      setDisplay(idleBlank ? "" : text);
      return;
    }

    let raf = 0;
    let start: number | null = null;
    const total = text.length;

    const step = (ts: number) => {
      if (start === null) start = ts;
      const elapsed = ts - start;
      const revealed = Math.min(total, Math.floor(elapsed / charDelay));
      let out = "";

      for (let i = 0; i < total; i++) {
        if (i < revealed || text[i] === " ") out += text[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }

      setDisplay(out);

      if (revealed < total) raf = requestAnimationFrame(step);
      else setDisplay(text);
    };

    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [text, active, charDelay, idleBlank]);

  return display;
}

const CORE_CHARGE_RAMP_MS = 900;
const CORE_CHARGE_RELEASE_MS = 550;

function clamp01(value: number): number {
  return Math.min(1, Math.max(0, value));
}

export function HeroSpace({
  eyebrow = "SYSTEM ONLINE",
  title = "Benvenuti",
  subtitle = "Junior TS Developer",
  statusChips = DEFAULT_HERO_STATUS_CHIPS,
}: HeroSpaceProps) {
  const [phase, setPhase] = useState<HeroPhase>("boot");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [coreCharge, setCoreCharge] = useState(0);
  const [corePressing, setCorePressing] = useState(false);
  const coreChargeRef = useRef(0);
  const corePressStartRef = useRef(0);
  const corePressOriginRef = useRef(0);
  const coreChargeRafRef = useRef(0);

  useEffect(() => {
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mql.matches);

    if (mql.matches) {
      setPhase("done");
      return;
    }

    const t1 = window.setTimeout(() => setPhase("scan"), REACTOR_TIMELINE.scan);
    const t2 = window.setTimeout(() => setPhase("reveal"), REACTOR_TIMELINE.reveal);
    const t3 = window.setTimeout(() => setPhase("ignite"), REACTOR_TIMELINE.ignite);
    const t4 = window.setTimeout(() => setPhase("done"), REACTOR_TIMELINE.done);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(coreChargeRafRef.current);
  }, []);

  const stopCoreCharge = (animateRelease = false) => {
    cancelAnimationFrame(coreChargeRafRef.current);
    corePressStartRef.current = 0;
    setCorePressing(false);

    if (!animateRelease || coreChargeRef.current <= 0.001) {
      coreChargeRef.current = 0;
      setCoreCharge(0);
      return;
    }

    const startCharge = coreChargeRef.current;
    const releaseStart = performance.now();

    const tick = (now: number) => {
      const elapsed = now - releaseStart;
      const progress = clamp01(elapsed / CORE_CHARGE_RELEASE_MS);
      const next = startCharge * (1 - progress);
      coreChargeRef.current = next;
      setCoreCharge(next);

      if (progress < 1) {
        coreChargeRafRef.current = requestAnimationFrame(tick);
      } else {
        coreChargeRef.current = 0;
        setCoreCharge(0);
      }
    };

    coreChargeRafRef.current = requestAnimationFrame(tick);
  };

  const handleCorePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (!done || reduceMotion) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    cancelAnimationFrame(coreChargeRafRef.current);
    corePressStartRef.current = performance.now();
    corePressOriginRef.current = coreChargeRef.current;
    setCorePressing(true);

    const tick = (now: number) => {
      const elapsed = now - corePressStartRef.current;
      const next = clamp01(corePressOriginRef.current + elapsed / CORE_CHARGE_RAMP_MS);
      coreChargeRef.current = next;
      setCoreCharge(next);
      if (next < 1) coreChargeRafRef.current = requestAnimationFrame(tick);
    };

    coreChargeRafRef.current = requestAnimationFrame(tick);
  };

  const handleCorePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (!done || reduceMotion) return;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    stopCoreCharge(true);
  };

  const scanning = phase === "scan" || phase === "reveal" || phase === "ignite" || phase === "done";
  const coreIgniting = phase === "ignite" || phase === "done";
  const coreLit = phase === "done";
  const done = phase === "done";

  const eyebrowText = useDecryptText(eyebrow, scanning, 26);
  /* Fase 5: headline decrypt sincronizzato con accensione core (ignite) */
  const headline = useDecryptText(title, phase === "ignite", 40, phase !== "done");

  const chipDelays = ["0.1s", "0.25s", "0.4s"];
  const coreInteractive = done && !reduceMotion && coreIgniting;
  const coreCharging = coreCharge > 0.001;

  const reactorChargeStyle = {
    ...reactorStyle,
    "--core-charge": coreCharge,
  } as CSSProperties;

  return (
    <div className={styles.root}>
      <div className={styles.scanlines} aria-hidden />
      <div className={styles.vignette} aria-hidden />

      <div className={styles.heroLayout}>
        <p className={styles.eyebrow}>{eyebrowText || "\u00A0"}</p>

        <div className={styles.reactorRow} style={reactorStyle}>
          <div
            className={[
              styles.reactor,
              corePressing ? styles.reactorCorePress : "",
            ]
              .filter(Boolean)
              .join(" ")}
            style={reactorChargeStyle}
          >
            <div className={`${styles.ring} ${styles.ringOuter}`} aria-hidden />
            <div className={`${styles.ring} ${styles.ringInner}`} aria-hidden />
            <div
              className={[
                styles.arcCore,
                coreIgniting ? styles.arcCoreIgnite : "",
                coreLit ? styles.arcCoreLit : "",
                coreCharging ? styles.arcCoreBoost : "",
              ]
                .filter(Boolean)
                .join(" ")}
              aria-hidden
            />
            <div className={styles.segmentTrack} aria-hidden />
            <div className={styles.segments} aria-hidden>
              {REACTOR_SEGMENTS.map((segment) => (
                <div
                  key={segment.id}
                  className={[
                    styles.segment,
                    segment.id % 2 === 0 ? styles.segmentCopper : styles.segmentPanel,
                    scanning ? styles.segmentOn : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  style={buildSegmentStyle(segment)}
                />
              ))}
            </div>
            <button
              type="button"
              className={[
                styles.coreInteract,
                coreInteractive ? styles.coreInteractActive : styles.coreInteractOff,
              ].join(" ")}
              aria-label="Carica il reattore"
              disabled={!coreInteractive}
              onPointerDown={handleCorePointerDown}
              onPointerUp={handleCorePointerUp}
              onPointerCancel={handleCorePointerUp}
              onLostPointerCapture={handleCorePointerUp}
            >
              <div
                className={[
                  styles.coreRing,
                  coreIgniting ? styles.coreRingOn : "",
                  coreCharging ? styles.coreCharging : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              />
              <div
                className={[
                  styles.core,
                  coreIgniting ? styles.coreOn : "",
                  coreCharging ? styles.coreCharging : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
                aria-hidden
              />
            </button>
          </div>
        </div>

        <h1 className={`${styles.title} ${coreIgniting ? styles.titleOn : ""}`}>
          {headline || "\u00A0"}
        </h1>

        <p className={`${styles.subtitle} ${done ? styles.subtitleOn : ""}`}>{subtitle}</p>

        <div className={styles.chips}>
          {statusChips.map((chip, index) => (
            <span
              key={chip}
              className={`${styles.chip} ${done ? styles.chipOn : ""}`}
              style={{ transitionDelay: chipDelays[index] ?? `${0.1 + index * 0.15}s` }}
            >
              <span className={styles.chipDot} aria-hidden />
              {chip}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
