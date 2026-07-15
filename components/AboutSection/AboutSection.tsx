"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./AboutSection.module.css";

const BIO_FULL =
  "Non credo che lo sviluppo software sia l'unica cosa che definisce chi sono, ma credo fermamente che la mia forma mentis sia il risultato di sfide diverse. Come atleta, ho imparato che la costanza è l'unico modo per ottenere risultati reali, una lezione di disciplina che applico ad ogni allenamento. Il trekking e il tempo passato in mezzo alla natura sono il mio modo per staccare e recuperare la lucidità necessaria per affrontare il mondo complesso in cui viviamo.";

const TYPEWRITER_MS = 35;
const DELAY_TYPEWRITER_MS = 200;

function renderWithStrong(text: string) {
  const parts = text.split(/(officina|TypeScript)/);
  return parts.map((part, i) =>
    part === "officina" || part === "TypeScript" ? (
      <strong key={i}>{part}</strong>
    ) : (
      <span key={i}>{part}</span>
    )
  );
}

export function AboutSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [openId, setOpenId] = useState(0);
  const [typedLength, setTypedLength] = useState(0);
  const typewriterCleanupRef = useRef<(() => void) | null>(null);

  const handleOpen = () => {
    if (!isOpen) {
      setOpenId((id) => id + 1);
      setIsOpen(true);
    }
  };

  const startTypewriter = useCallback(() => {
    setTypedLength(0);
    const id = setInterval(() => {
      setTypedLength((n) => {
        if (n >= BIO_FULL.length) {
          clearInterval(id);
          return n;
        }
        return n + 1;
      });
    }, TYPEWRITER_MS);
    const cleanup = () => clearInterval(id);
    typewriterCleanupRef.current = cleanup;
    return cleanup;
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setTypedLength(0);
      typewriterCleanupRef.current?.();
      typewriterCleanupRef.current = null;
      return;
    }
    const t = window.setTimeout(() => startTypewriter(), DELAY_TYPEWRITER_MS);
    return () => {
      clearTimeout(t);
      typewriterCleanupRef.current?.();
      typewriterCleanupRef.current = null;
    };
  }, [isOpen, startTypewriter]);

  const displayedText = BIO_FULL.slice(0, typedLength);
  const isTyping = typedLength < BIO_FULL.length;

  return (
    <section className={styles.section} aria-labelledby="about-heading">
      <h2 id="about-heading" className={styles.srOnly}>
        About Me
      </h2>

      <div
        className={`${styles.panel} ${isOpen ? styles.panelOpen : ""}`}
        role="button"
        tabIndex={0}
        onClick={handleOpen}
        onKeyDown={(e) => {
          if (!isOpen && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            handleOpen();
          }
        }}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Biografia aperta" : "Clicca per aprire la biografia"}
      >
        <div
          className={styles.panelBody}
          style={{ maxHeight: isOpen ? "900px" : "80px" }}
          aria-hidden={false}
        >
          {!isOpen ? (
            <div key="closed" className={styles.panelClosed}>
              <span className={styles.panelCta}>
                <svg
                  className={styles.panelCtaIcon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden
                >
                  <polygon points="5 3 19 12 5 21 5 3" />
                </svg>
                Clicca per inizializzare la biografia
              </span>
            </div>
          ) : (
            <div key={`open-${openId}`} className={styles.panelContent}>
              <div className={styles.bioOutput}>
                {displayedText && (
                  <>
                    {renderWithStrong(displayedText)}
                    {isTyping && <span className={styles.cursor} aria-hidden />}
                  </>
                )}
              </div>
              <button
                type="button"
                className={styles.closeBtn}
                onClick={(e) => {
                  e.stopPropagation();
                  setIsOpen(false);
                }}
              >
                Chiudi
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
