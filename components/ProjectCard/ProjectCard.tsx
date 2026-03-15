"use client";

import { useState } from "react";
import type { ProjectCardProps } from "@/types";
import { getTechIconUrl } from "@/data/techIcons";
import { Lightbox } from "@/components/Lightbox";
import styles from "./ProjectCard.module.css";

/** Icona SVG minimalista per AI/IA */
function AIIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <circle cx="12" cy="12" r="2.2" />
      <circle cx="7" cy="8" r="1.2" />
      <circle cx="17" cy="8" r="1.2" />
      <circle cx="7" cy="16" r="1.2" />
      <circle cx="17" cy="16" r="1.2" />
      <line x1="12" y1="9.8" x2="10" y2="8.8" />
      <line x1="12" y1="9.8" x2="14" y2="8.8" />
      <line x1="12" y1="14.2" x2="10" y2="15.2" />
      <line x1="12" y1="14.2" x2="14" y2="15.2" />
    </svg>
  );
}

function getTerminalFilename(projectId: string): string {
  const map: Record<string, string> = {
    "quota-app": "quota-app.ts",
    "dashboard-finanziaria": "dashboard-finanziaria.ts",
  };
  return map[projectId] ?? `${projectId}.ts`;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false);
  const imageSrc = project.image ?? null;
  const terminalTitle = getTerminalFilename(project.id);

  return (
    <>
      <article className={styles.terminalWindow} aria-label={`Progetto ${project.titolo}`}>
        <div className={styles.terminalHeader}>
          <span className={styles.dots} aria-hidden>
            <span className={styles.dotRed} />
            <span className={styles.dotYellow} />
            <span className={styles.dotGreen} />
          </span>
          <span className={styles.terminalTitle}>{terminalTitle}</span>
        </div>

        <div className={styles.terminalBody}>
          <div className={styles.terminalLine}>
            <span className={styles.prompt}>$</span>{" "}
            <span className={styles.command}>cat README.md</span>
          </div>
          <div className={styles.terminalOutput}>
            <span className={styles.outputLine}># {project.titolo}</span>
            <span className={styles.outputLine}>status: {project.status.replace("-", " ")}</span>
            <span className={styles.outputLine}>&nbsp;</span>
            <p className={styles.description}>{project.descrizione}</p>
          </div>

          <div className={styles.terminalLine}>
            <span className={styles.prompt}>$</span>{" "}
            <span className={styles.muted}>tech:</span>{" "}
            <span className={styles.techList}>
              {project.techStack.join(", ")}
            </span>
          </div>

          <div className={styles.techIcons} aria-label="Tecnologie usate">
            {project.techStack.map((tech) => {
              const iconUrl = getTechIconUrl(tech);
              const isAI = tech === "AI" || tech === "IA";
              if (isAI) {
                return (
                  <span
                    key={tech}
                    className={styles.techLogo}
                    title={tech}
                    style={{ display: "inline-flex", width: 20, height: 20 }}
                  >
                    <AIIcon className={styles.techLogoSvg} />
                  </span>
                );
              }
              return iconUrl ? (
                <img
                  key={tech}
                  src={iconUrl}
                  alt={tech}
                  className={styles.techLogo}
                  width={20}
                  height={20}
                />
              ) : null;
            })}
          </div>

          <div className={styles.terminalLine}>
            <span className={styles.prompt}>$</span>{" "}
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.link}
            >
              open --repo
            </a>
            <span className={styles.muted}> → Vedi su GitHub</span>
          </div>

          {imageSrc && (
            <button
              type="button"
              className={styles.previewFrame}
              style={{ backgroundImage: `url(${imageSrc})` }}
              onClick={() => setLightboxOpen(true)}
              aria-label={`Anteprima ${project.titolo}`}
            >
              <span className={styles.previewLabel}>preview</span>
              <div className={styles.previewFade} aria-hidden />
            </button>
          )}
        </div>
      </article>

      {imageSrc && (
        <Lightbox
          isOpen={lightboxOpen}
          onClose={() => setLightboxOpen(false)}
          src={imageSrc}
          alt={`Anteprima progetto ${project.titolo}`}
        />
      )}
    </>
  );
}
