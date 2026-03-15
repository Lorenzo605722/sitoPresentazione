"use client";

import { useState, useEffect } from "react";
import styles from "./DragonSays.module.css";

interface DragonSaysProps {
  name: string;
  quotes: string[];
}

export function DragonSays({ name, quotes }: DragonSaysProps) {
  const [quote, setQuote] = useState(quotes[0] ?? "");

  useEffect(() => {
    if (quotes.length > 0) {
      setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
    }
  }, [quotes]);

  const nameLower = name.toLowerCase();

  return (
    <aside className={styles.box} aria-label={`Citazione di ${name}`}>
      <div className={styles.header}>
        <span className={styles.prompt}>
          <span className={styles.promptName}>{nameLower}</span>
          <span className={styles.promptAt}>@</span>
          <span className={styles.promptHost}>quota.app ~</span>
        </span>
        <span className={styles.watermark} aria-hidden>[ QUOTA_MODULE_V1 ]</span>
        <span className={styles.cursor} aria-hidden />
      </div>
      <p className={styles.quote}>
        <strong>{name} says:</strong> {quote}
      </p>
      <span className={styles.badge} aria-hidden>LOGIC_BY_QUOTA</span>
    </aside>
  );
}
