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
const SPINNER_INTERVAL_MS = 150;

const SPINNER_FRAMES = ["|", "/", "-", "\\"];

type BetweenBlockLoading = 1 | 2 | null;

export function HeroSection() {
  // True dopo 3s: mostra 100% e sblocca il typewriter del primo blocco
  const [loadingComplete, setLoadingComplete] = useState(false);
  // Caricamento tra blocchi: 1 = prima di Metodologia, 2 = prima di Filosofia
  const [betweenBlockLoading, setBetweenBlockLoading] = useState<BetweenBlockLoading>(null);
  // True quando lo spinner tra blocchi è finito → mostra 100%, poi si avvia il blocco successivo
  const [betweenBlockLoadingComplete, setBetweenBlockLoadingComplete] = useState(false);
  const [spinnerFrame, setSpinnerFrame] = useState(0);
  const [activeBlockIndex, setActiveBlockIndex] = useState(0);
  const [visibleChars, setVisibleChars] = useState(0);
  const [sequenceComplete, setSequenceComplete] = useState(false);
  // Mostra il pulsante --read-more dopo il blocco Filosofia; al clic avvia il caricamento dell'ultimo blocco
  const [readMoreVisible, setReadMoreVisible] = useState(false);
  const [loadingLastBlock, setLoadingLastBlock] = useState(false);
  const [loadingLastBlockComplete, setLoadingLastBlockComplete] = useState(false);

  const activeBlock = SECTIONS[activeBlockIndex];
  const activeText = activeBlock?.text ?? "";
  const displayedText = activeText.slice(0, visibleChars);
  const isTypingCurrentBlock = !sequenceComplete && visibleChars < activeText.length;
  const hasMoreBlocks = activeBlockIndex < SECTIONS.length - 1;
  const spinnerChar = SPINNER_FRAMES[spinnerFrame % SPINNER_FRAMES.length];
  const isSpinnerActive =
    !loadingComplete ||
    (betweenBlockLoading !== null && !betweenBlockLoadingComplete) ||
    (loadingLastBlock && !loadingLastBlockComplete);

  // Timer iniziale 3s
  useEffect(() => {
    const timer = setTimeout(() => setLoadingComplete(true), LOADING_DURATION_MS);
    return () => clearTimeout(timer);
  }, []);

  // Spinner: attivo durante loading iniziale o durante loading tra blocchi
  useEffect(() => {
    if (!isSpinnerActive) return;
    const interval = setInterval(() => setSpinnerFrame((f) => f + 1), SPINNER_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [isSpinnerActive]);

  // Quando un blocco termina, avvia il loading per il blocco successivo (solo per blocchi 1 e 2)
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
    // Blocco 2 → 3 gestito dall'effetto typewriter sotto (nessun loading tra blocchi)
  }, [activeBlockIndex, visibleChars, activeText.length, hasMoreBlocks, sequenceComplete, loadingComplete, betweenBlockLoading]);

  // Timer per loading tra blocchi (1.5s per Metodologia, 1.2s per Filosofia)
  useEffect(() => {
    if (betweenBlockLoading === null) return;
    const duration = betweenBlockLoading === 1 ? LOADING_BEFORE_BLOCK_1_MS : LOADING_BEFORE_BLOCK_2_MS;
    const timer = setTimeout(() => setBetweenBlockLoadingComplete(true), duration);
    return () => clearTimeout(timer);
  }, [betweenBlockLoading]);

  // Dopo "100%" tra blocchi, breve pausa poi avanza al blocco successivo
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

  // Timer per loading ultimo blocco (--read-more cliccato)
  useEffect(() => {
    if (!loadingLastBlock) return;
    const timer = setTimeout(() => setLoadingLastBlockComplete(true), LOADING_LAST_BLOCK_MS);
    return () => clearTimeout(timer);
  }, [loadingLastBlock]);

  // Dopo 100% loading ultimo blocco, avvia typewriter Risultati
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

  // Typewriter: avanza solo se non siamo in attesa di loading tra blocchi
  useEffect(() => {
    if (sequenceComplete) return;
    if (activeBlockIndex === 0 && !loadingComplete) return;
    if (betweenBlockLoading !== null) return;

    if (visibleChars < activeText.length) {
      const timer = setTimeout(() => setVisibleChars((n) => n + 1), TYPEWRITER_MS);
      return () => clearTimeout(timer);
    }

    if (activeBlockIndex === 0 || activeBlockIndex === 1) {
      // Gestito dall'effetto "Quando un blocco termina" sopra
      return;
    }
    if (activeBlockIndex === 2 && hasMoreBlocks) {
      // In attesa di --read-more: mostra il pulsante se non ancora visibile
      if (!readMoreVisible && !loadingLastBlock) setReadMoreVisible(true);
      return;
    }
    setSequenceComplete(true);
  }, [activeBlockIndex, visibleChars, activeText.length, hasMoreBlocks, sequenceComplete, loadingComplete, betweenBlockLoading, readMoreVisible, loadingLastBlock]);

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

        <div className={styles.terminal} role="region" aria-label="Biografia in stile terminale">
          <div className={styles.terminalHeader}>
            <span className={styles.dots} aria-hidden>
              <span className={styles.dotRed} />
              <span className={styles.dotYellow} />
              <span className={styles.dotGreen} />
            </span>
            <span className={styles.terminalTitle}>lorenzo@hero ~</span>
          </div>
          <div className={styles.terminalBody}>
            <div className={styles.terminalLine}>
              <span className={styles.prompt}>$</span>{" "}
              <span className={styles.command}>cat bio.txt</span>
            </div>
            <div className={styles.terminalLineSystem}>
              [SYSTEM]: loading_history...
              {loadingComplete ? (
                <span className={styles.loadingPercent}> 100%</span>
              ) : (
                <span className={styles.spinner} aria-hidden> {spinnerChar}</span>
              )}
            </div>
            <div className={styles.terminalOutput}>
              {/* Blocco 0 - Origine */}
              <div className={styles.outputBlock}>
                <span className={styles.outputLabel}>{SECTIONS[0].label}:</span>{" "}
                <span className={styles.outputText}>
                  {activeBlockIndex > 0
                    ? SECTIONS[0].text
                    : displayedText}
                  {activeBlockIndex === 0 && isTypingCurrentBlock && (
                    <span className={styles.cursorTerminal} aria-hidden />
                  )}
                </span>
              </div>

              {/* [SYSTEM]: loading_metodologia... (prima del blocco 1) */}
              {(betweenBlockLoading === 1 || activeBlockIndex >= 1) && (
                <div className={styles.terminalLineSystem}>
                  [SYSTEM]: loading_metodologia...
                  {betweenBlockLoading === 1 ? (
                    betweenBlockLoadingComplete ? (
                      <span className={styles.loadingPercent}> 100%</span>
                    ) : (
                      <span className={styles.spinner} aria-hidden> {spinnerChar}</span>
                    )
                  ) : (
                    <span className={styles.loadingPercent}> 100%</span>
                  )}
                </div>
              )}

              {/* Blocco 1 - Metodologia (dopo loading_metodologia 100%) */}
              {activeBlockIndex >= 1 && (
                <div className={styles.outputBlock}>
                  <span className={styles.outputLabel}>{SECTIONS[1].label}:</span>{" "}
                  <span className={styles.outputText}>
                    {activeBlockIndex > 1 ? SECTIONS[1].text : displayedText}
                    {activeBlockIndex === 1 && isTypingCurrentBlock && (
                      <span className={styles.cursorTerminal} aria-hidden />
                    )}
                  </span>
                </div>
              )}

              {/* [SYSTEM]: loading_filosofia... (prima del blocco 2) */}
              {(betweenBlockLoading === 2 || activeBlockIndex >= 2) && (
                <div className={styles.terminalLineSystem}>
                  [SYSTEM]: loading_filosofia...
                  {betweenBlockLoading === 2 ? (
                    betweenBlockLoadingComplete ? (
                      <span className={styles.loadingPercent}> 100%</span>
                    ) : (
                      <span className={styles.spinner} aria-hidden> {spinnerChar}</span>
                    )
                  ) : (
                    <span className={styles.loadingPercent}> 100%</span>
                  )}
                </div>
              )}

              {/* Blocco 2 - Filosofia (dopo loading_filosofia 100%) */}
              {activeBlockIndex >= 2 && (
                <div className={styles.outputBlock}>
                  <span className={styles.outputLabel}>{SECTIONS[2].label}:</span>{" "}
                  <span className={styles.outputText}>
                    {activeBlockIndex > 2 ? SECTIONS[2].text : displayedText}
                    {activeBlockIndex === 2 && isTypingCurrentBlock && (
                      <span className={styles.cursorTerminal} aria-hidden />
                    )}
                  </span>
                </div>
              )}

              {/* Pulsante --read-more: mostra dopo Filosofia, al clic avvia caricamento ultimo blocco */}
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

              {/* [SYSTEM]: loading_risultati... (dopo clic su --read-more) */}
              {(loadingLastBlock || loadingLastBlockComplete) && (
                <div className={styles.terminalLineSystem}>
                  [SYSTEM]: loading_risultati...
                  {loadingLastBlockComplete ? (
                    <span className={styles.loadingPercent}> 100%</span>
                  ) : (
                    <span className={styles.spinner} aria-hidden> {spinnerChar}</span>
                  )}
                </div>
              )}

              {/* Blocco 3 - Risultati */}
              {activeBlockIndex >= 3 && (
                <div className={styles.outputBlock}>
                  <span className={styles.outputLabel}>{SECTIONS[3].label}:</span>{" "}
                  <span className={styles.outputText}>
                    {displayedText}
                    {isTypingCurrentBlock && <span className={styles.cursorTerminal} aria-hidden />}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
