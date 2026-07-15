"use client";

import { useState, useEffect } from "react";
import styles from "./HeroSection.module.css";

const WORD = "Benvenuti";

const ORIGINE =
  "Ciao, sono Lorenzo, ho 28 anni e sono uno sviluppatore Junior TypeScript con un passato tra motori e officine.";

const METODOLOGIA =
  "Questa esperienza mi ha trasmesso una disciplina ferrea e una tolleranza zero verso l'approssimazione: oggi porto la stessa precisione meccanica nel mondo del software, smontando problemi complessi per ricostruire soluzioni digitali solide, scalabili e performanti.";

const FILOSOFIA =
  "Non mi accontento di far \"girare\" le applicazioni; le progetto affinché ogni ingranaggio del codice sia ottimizzato e sicuro.";

const RISULTATI =
  "Attraverso i miei progetti, come Quota e Cashflow, dimostro quotidianamente come la mia capacità di resilienza e la mia fame di crescita siano il motore di una carriera votata alla creazione di architetture tecnologiche d'eccellenza.";

const SECTIONS = [
  { label: "Origine", text: ORIGINE },
  { label: "Metodologia", text: METODOLOGIA },
  { label: "Filosofia", text: FILOSOFIA },
  { label: "Risultati", text: RISULTATI },
] as const;

const TYPEWRITER_MS = 25;
const DELAY_BETWEEN_BLOCKS_MS = 400;
const LOADING_DURATION_MS = 3000;
const LOADING_BEFORE_BLOCK_1_MS = 1500;
const LOADING_BEFORE_BLOCK_2_MS = 1200;
const LOADING_LAST_BLOCK_MS = 1000;
const LOADING_PERCENT_DISPLAY_MS = 300;

type BetweenBlockLoading = 1 | 2 | null;

export function HeroSection() {
  const [loadingComplete, setLoadingComplete] = useState(false);
  const [betweenBlockLoading, setBetweenBlockLoading] = useState<BetweenBlockLoading>(null);
  const [betweenBlockLoadingComplete, setBetweenBlockLoadingComplete] = useState(false);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  const [readMoreVisible, setReadMoreVisible] = useState(false);
  const [loadingLastBlock, setLoadingLastBlock] = useState(false);
  const [loadingLastBlockComplete, setLoadingLastBlockComplete] = useState(false);

  const activeBlock = SECTIONS[activeBlockIndex];
  const activeText = activeBlock?.text ?? "";
  const displayedText = activeText.slice(0, visibleChars);
  const isTypingCurrentBlock = !sequenceComplete && visibleChars < activeText.length;
  const hasMoreBlocks = activeBlockIndex < SECTIONS.length - 1;
  const isWaiting =
    !loadingComplete ||
    (betweenBlockLoading !== null && !betweenBlockLoadingComplete) ||
    (loadingLastBlock && !loadingLastBlockComplete);

  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (sequenceComplete || !hasMoreBlocks) return;
    if (activeBlockIndex === 0 && !loadingComplete) return;
    if (visibleChars < activeText.length) return;
    if (betweenBlockLoading !== null) return;

    if (activeBlockIndex === 0) {
      setBetweenBlockLoading(1);
      return;
    }
    if (activeBlockIndex === 1) {
      setBetweenBlockLoading(2);
    }
  }, [activeBlockIndex, visibleChars, activeText.length, hasMoreBlocks, sequenceComplete, loadingComplete, betweenBlockLoading]);

  useEffect(() => {
    if (betweenBlockLoading === null) return;
    const duration = betweenBlockLoading === 1 ? LOADING_BEFORE_BLOCK_1_MS : LOADING_BEFORE_BLOCK_2_MS;
    const timer = setTimeout(() => setBetweenBlockLoadingComplete(true), duration);
    return () => clearTimeout(timer);
  }, [betweenBlockLoading]);

  useEffect(() => {
    if (!betweenBlockLoadingComplete || betweenBlockLoading === null) return;
    const timer = setTimeout(() => {
      const nextIndex = betweenBlockLoading;
      setBetweenBlockLoading(null);
      setBetweenBlockLoadingComplete(false);
      setActiveBlockIndex(nextIndex);
      setVisibleChars(0);
    }, LOADING_PERCENT_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [betweenBlockLoadingComplete, betweenBlockLoading]);

  useEffect(() => {
    if (!loadingLastBlock) return;
    const timer = setTimeout(() => setLoadingLastBlockComplete(true), LOADING_LAST_BLOCK_MS);
    return () => clearTimeout(timer);
  }, [loadingLastBlock]);

  useEffect(() => {
    if (!loadingLastBlockComplete) return;
    const timer = setTimeout(() => {
      setLoadingLastBlock(false);
      setLoadingLastBlockComplete(false);
      setActiveBlockIndex(3);
      setVisibleChars(0);
    }, LOADING_PERCENT_DISPLAY_MS);
    return () => clearTimeout(timer);
  }, [loadingLastBlockComplete]);

  const handleReadMore = () => {
    setReadMoreVisible(false);
    setLoadingLastBlock(true);
  };

  useEffect(() => {
    if (sequenceComplete || isWaiting) return;
    if (betweenBlockLoading !== null) return;

    if (visibleChars < activeText.length) {
      const timer = setTimeout(() => setVisibleChars((n) => n + 1), TYPEWRITER_MS);
      return () => clearTimeout(timer);
    }

    if (activeBlockIndex === 0 || activeBlockIndex === 1) {
      return;
    }
    if (activeBlockIndex === 2 && hasMoreBlocks) {
      if (!readMoreVisible && !loadingLastBlock) setReadMoreVisible(true);
      return;
    }
    setSequenceComplete(true);
  }, [activeBlockIndex, visibleChars, activeText.length, hasMoreBlocks, sequenceComplete, betweenBlockLoading, readMoreVisible, loadingLastBlock, isWaiting]);

  return (
    <section className={styles.hero} aria-label="Presentazione">
      <div className={styles.content}>
        <h1 className={styles.title} aria-label={WORD}>
          {WORD.split("").map((letter, i) => (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
          <span className={styles.cursor} aria-hidden />
        </h1>
        <p className={styles.role}>Junior TS Developer</p>

        <div className={styles.bioPanel} role="region" aria-label="Biografia">
          <div className={styles.bioContent}>
            <div className={styles.outputBlock}>
              <span className={styles.outputLabel}>{SECTIONS[0].label}:</span>{" "}
              <span className={styles.outputText}>
                {activeBlockIndex > 0 ? SECTIONS[0].text : displayedText}
                {activeBlockIndex === 0 && isTypingCurrentBlock && (
                  <span className={styles.cursorText} aria-hidden />
                )}
              </span>
            </div>

            {activeBlockIndex >= 1 && (
              <div className={styles.outputBlock}>
                <span className={styles.outputLabel}>{SECTIONS[1].label}:</span>{" "}
                <span className={styles.outputText}>
                  {activeBlockIndex > 1 ? SECTIONS[1].text : displayedText}
                  {activeBlockIndex === 1 && isTypingCurrentBlock && (
                    <span className={styles.cursorText} aria-hidden />
                  )}
                </span>
              </div>
            )}

            {activeBlockIndex >= 2 && (
              <div className={styles.outputBlock}>
                <span className={styles.outputLabel}>{SECTIONS[2].label}:</span>{" "}
                <span className={styles.outputText}>
                  {activeBlockIndex > 2 ? SECTIONS[2].text : displayedText}
                  {activeBlockIndex === 2 && isTypingCurrentBlock && (
                    <span className={styles.cursorText} aria-hidden />
                  )}
                </span>
              </div>
            )}

            {readMoreVisible && (
              <div className={styles.readMoreWrap}>
                <button
                  type="button"
                  className={styles.readMoreBtn}
                  onClick={handleReadMore}
                  aria-label="Carica ultimo blocco Risultati"
                >
                  --read-more
                </button>
              </div>
            )}

            {activeBlockIndex >= 3 && (
              <div className={styles.outputBlock}>
                <span className={styles.outputLabel}>{SECTIONS[3].label}:</span>{" "}
                <span className={styles.outputText}>
                  {displayedText}
                  {isTypingCurrentBlock && <span className={styles.cursorText} aria-hidden />}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
