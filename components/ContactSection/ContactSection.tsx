"use client";

import { useCallback, useState } from "react";
import styles from "./ContactSection.module.css";

const EMAIL = "lollus97.lg@gmail.com";
const GITHUB_URL = "https://github.com/Lorenzo605722";
const GITHUB_LABEL = "github.com/Lorenzo605722";

export function ContactSection() {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    });
  }, []);

  return (
    <section className={styles.section} aria-labelledby="contact-heading">
      <div className={styles.wrapper}>
        <h2 id="contact-heading" className={styles.title}>
          Contatti
        </h2>

        <div className={styles.panel} aria-label="Dati di contatto">
          <p className={styles.lead}>
            Per collaborazioni o opportunità, puoi scrivermi qui.
          </p>

          <ul className={styles.list}>
            <li className={styles.row}>
              <span className={styles.label}>Email</span>
              <div className={styles.valueGroup}>
                <a href={`mailto:${EMAIL}`} className={styles.valueLink}>
                  {EMAIL}
                </a>
                <button
                  type="button"
                  className={styles.copyBtn}
                  onClick={handleCopy}
                  aria-label="Copia indirizzo email"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
            </li>

            <li className={styles.row}>
              <span className={styles.label}>GitHub</span>
              <a
                href={GITHUB_URL}
                className={styles.valueLink}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Profilo GitHub Lorenzo605722"
              >
                {GITHUB_LABEL}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
