"use client";

import { useState, useEffect } from "react";
import styles from "./DanteSays.module.css";

const quotes: string[] = [
  "Il caffè fuori casa è un investimento… nel senso che investi nel far felice il barista.",
  "Hai risparmiato 3€ portando il pranzo da casa. Ora spendili in quella cosa che \"tanto serve\".",
  "La regola è: se non te lo puoi permettere due volte, non comprarlo. Eccezione: la pizza.",
  "Risparmiare è bello. Sapere dove sono finiti i soldi che avevi risparmiato è un mistero.",
  "Dante dice: contare i centesimi non è triste. Triste è scoprire che non ne hai.",
];

export function DanteSays() {
  const [quote, setQuote] = useState(quotes[0]);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, []);

  return (
    <aside className={styles.box} aria-label="Citazione di Dante">
      <div className={styles.header}>
        <span className={styles.prompt}>dante@says ~</span>
        <span className={styles.cursor} aria-hidden />
      </div>
      <p className={styles.quote}>
        <strong>Dante says:</strong> {quote}
      </p>
    </aside>
  );
}
