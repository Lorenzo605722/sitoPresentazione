"use client";

import { useState, useCallback } from "react";
import styles from "./ContactSection.module.css";

const EMAIL = "lollus97.lg@gmail.com";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <h2 id="contact-heading" className={styles.title}>
        Contatti
      </h2>

      <div className={styles.codeBlock} aria-label="Dati di contatto in formato codice">
        <div className={styles.codeBlockHeader}>
          <span className={styles.codeBlockDots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </span>
          <span className={styles.codeBlockTitle}>contact.ts</span>
        </div>
        <pre className={styles.codeBlockContent}>
          <code>
            <span className={styles.keyword}>const</span>{" "}
            <span className={styles.ident}>lorenzo</span>{" "}
            <span className={styles.punctuation}>=</span>{" "}
            <span className={styles.punctuation}>{"{"}</span>
            {"\n"}
            {"  "}
            <span className={styles.prop}>email</span>
            <span className={styles.punctuation}>:</span>{" "}
            <span className={styles.emailWithCopy}>
              <a href={`mailto:${EMAIL}`} className={styles.codeLink} aria-label={`Invia email a ${EMAIL}`}>
                <span className={styles.string}>&apos;{EMAIL}&apos;</span>
              </a>
              <button
                type="button"
                className={styles.copyBtn}
                onClick={handleCopy}
                aria-label="Copia indirizzo email"
              >
                {copied ? "Copied!" : "Copy"}
              </button>
            </span>
            <span className={styles.punctuation}>,</span>
            {"\n"}
            {"  "}
            <span className={styles.prop}>github</span>
            <span className={styles.punctuation}>:</span>{" "}
            <a href="https://github.com/Lorenzo605722" className={styles.codeLink} target="_blank" rel="noopener noreferrer" aria-label="Profilo GitHub Lorenzo605722">
              <span className={styles.string}>&apos;github.com/Lorenzo605722&apos;</span>
            </a>
            <span className={styles.punctuation}>,</span>
            {"\n"}
            {"  "}
            <span className={styles.prop}>location</span>
            <span className={styles.punctuation}>:</span>{" "}
            <span className={styles.string}>&apos;Italy&apos;</span>
            <span className={styles.punctuation}>,</span>
            {"\n"}
            {"  "}
            <span className={styles.prop}>status</span>
            <span className={styles.punctuation}>:</span>{" "}
            <span className={styles.string}>&apos;Available for new projects&apos;</span>
            {"\n"}
            <span className={styles.punctuation}>{"};"}</span>
          </code>
        </pre>
      </div>
    </section>
  );
}
