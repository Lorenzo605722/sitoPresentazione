"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import styles from "./AboutSection.module.css";

const BIO_FULL =
  "Non credo che lo sviluppo software sia l'unica cosa che definisce chi sono, ma credo fermamente che la mia forma mentis sia il risultato di sfide diverse. Come atleta, ho imparato che la costanza è l’unico modo per ottenere risultati reali, una lezione di disciplina che applico ad ogni allenamento. Il trekking e il tempo passato in mezzo alla natura sono il mio modo per staccare e recuperare la lucidità necessaria per affrontare il mondo complesso in cui viviamo.";

const TYPEWRITER_MS = 35;
const DELAY_SYSTEM_MS = 400;
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
  const [showSystemLine, setShowSystemLine] = useState(false);
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
      setShowSystemLine(false);
      setTypedLength(0);
      typewriterCleanupRef.current?.();
      typewriterCleanupRef.current = null;
      return;
    }
    const t1 = window.setTimeout(() => setShowSystemLine(true), DELAY_SYSTEM_MS);
    const t2 = window.setTimeout(
      () => startTypewriter(),
      DELAY_SYSTEM_MS + DELAY_TYPEWRITER_MS
    );
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
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
        className={`${styles.terminal} ${isOpen ? styles.terminalOpen : ""}`}
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
        aria-label={isOpen ? "Terminale biografia aperto" : "Clicca per aprire la biografia"}
      >
        <div className={styles.terminalHeader}>
          <span className={styles.dots} aria-hidden>
            <button
              type="button"
              className={styles.dotButton}
              onClick={(e) => {
                e.stopPropagation();
                setIsOpen(false);
              }}
              aria-label="Chiudi terminale"
              title="Chiudi"
            >
              <span className={styles.dot} />
            </button>
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
          <span className={styles.terminalTitle}>about_me.sh</span>
        </div>

        <div
          className={styles.terminalPanel}
          style={{ maxHeight: isOpen ? "520px" : "80px" }}
          aria-hidden={false}
        >
          {!isOpen ? (
            <div key="closed" className={styles.terminalClosed}>
              <span className={styles.terminalCta}>
                <svg
                  className={styles.terminalCtaIcon}
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
            <div key={`open-${openId}`} className={styles.terminalBody}>
              <div className={styles.terminalLine}>
                <span className={styles.prompt}>lorenzo@developer:~$</span>{" "}
                <span className={styles.command}>run biography.sh</span>
              </div>
              {showSystemLine && (
                <div className={styles.terminalLineSystem}>
                  [SYSTEM]: Caricamento dati officina... 100%
                </div>
              )}
              <div className={styles.terminalOutput}>
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
