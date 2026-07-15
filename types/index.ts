import type { ReactNode } from "react";

/** Props per layout radice (children) */
export interface LayoutProps {
  children: ReactNode;
}

/** Stato di avanzamento di un progetto */
export type ProjectStatus = "in-corso" | "completato" | "in-pausa" | "archiviato";

/** Slide di una gallery progetto (carosello) */
export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

/** Progetto del portfolio */
export interface Project {
  id: string;
  titolo: string;
  descrizione: string;
  techStack: string[];
  /** Frase breve che collega lo stack in modo coerente */
  stackNote?: string;
  /** CTA: repo pubblico o mailto per info */
  link: string;
  /** Testo del link CTA (default: "open repo →") */
  linkLabel?: string;
  status: ProjectStatus;
  /** Path o URL immagine in evidenza (in alto nella card) */
  image?: string;
  /** Screenshot / slide per carosello HUD */
  gallery?: readonly ProjectGalleryImage[];
}

/** Categoria di una skill (es. frontend, backend, tools) */
export type SkillCategory = string;

/** Livello di padronanza (es. Core, Learning) */
export type SkillLevel = "Core" | "Learning" | "Exploring";

/** Skill / competenza del portfolio */
export interface Skill {
  nome: string;
  categoria: SkillCategory;
  icona: string; // nome icona, path asset o URL
  livello: SkillLevel;
}

/** Props del componente ProjectCard (HUD) */
export interface ProjectCardProps {
  titolo: string;
  descrizione: string;
  stack: readonly string[];
  stackNote?: string;
  link: string;
  linkLabel?: string;
  status: ProjectStatus;
  /** Carosello screenshot (es. QuotaApp) */
  gallery?: readonly ProjectGalleryImage[];
  /** Card a tutta larghezza nella griglia progetti */
  featured?: boolean;
}

/** Props del componente SkillsSection */
export interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
}

/** Chip di stato nella hero HUD */
export type HeroSpaceStatusChip = string;

/** Props del componente HeroSpace */
export interface HeroSpaceProps {
  /** Etichetta superiore con effetto decrypt (default: "SYSTEM ONLINE") */
  eyebrow?: string;
  /** Titolo principale (default: "Benvenuti") */
  title?: string;
  /** Sottotitolo (default: "Junior TS Developer") */
  subtitle?: string;
  /** Chip di stato in basso (default: STATUS / LOCATION / ROLE) */
  statusChips?: readonly HeroSpaceStatusChip[];
}

export const DEFAULT_HERO_STATUS_CHIPS: readonly HeroSpaceStatusChip[] = [
  "STATUS: ONLINE",
  "LOCATION: ITALY",
  "ROLE: TYPESCRIPT DEV",
] as const;
