import type { ReactNode } from "react";

/** Props per layout radice (children) */
export interface LayoutProps {
  children: ReactNode;
}

/** Stato di avanzamento di un progetto */
export type ProjectStatus = "in-corso" | "completato" | "in-pausa" | "archiviato";

/** Progetto del portfolio */
export interface Project {
  id: string;
  titolo: string;
  descrizione: string;
  techStack: string[];
  githubLink: string;
  status: ProjectStatus;
  /** Path o URL immagine in evidenza (in alto nella card) */
  image?: string;
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

/** Props del componente ProjectCard */
export interface ProjectCardProps {
  project: Project;
}

/** Props del componente SkillsSection */
export interface SkillsSectionProps {
  skills: Skill[];
  title?: string;
}
