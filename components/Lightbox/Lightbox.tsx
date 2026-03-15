"use client";

import { useEffect } from "react";
import { createPortal } from "react-dom";
import styles from "./Lightbox.module.css";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
  alt: string;
}

export function Lightbox({ isOpen, onClose, src, alt }: LightboxProps) {
  useEffect(() => {
    if (!isOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const overlay = (
    <div
      className={styles.overlay}
      onClick={onClose}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
      role="dialog"
      aria-modal="true"
      aria-label="Anteprima immagine"
    >
      <div
        className={styles.imageContainer}
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={src}
          alt={alt}
          className={styles.image}
          onClick={(e) => e.stopPropagation()}
        />
        <button
          type="button"
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Chiudi"
        >
          ×
        </button>
      </div>
    </div>
  );

  return createPortal(overlay, document.body);
}
