"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import styles from "./Navbar.module.css";

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Progetti" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
] as const;

const SCROLL_THRESHOLD = 20;

export function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}
      role="navigation"
    >
      <Link href="#home" className={styles.nameLink} aria-label="Torna alla home">
        <span className={styles.name}>Lorenzo</span>
      </Link>

      <button
        type="button"
        className={styles.menuButton}
        onClick={() => setMenuOpen((open) => !open)}
        aria-expanded={menuOpen}
        aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
      >
        {menuOpen ? "✕" : "☰"}
      </button>

      <ul className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
        {navItems.map(({ href, label }) => (
          <li key={href} className={styles.link}>
            <Link
              href={href}
              onClick={() => setMenuOpen(false)}
              aria-current={pathname === "/" && href === "#home" ? "page" : undefined}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
