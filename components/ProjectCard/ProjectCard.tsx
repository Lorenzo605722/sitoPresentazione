import type { ProjectCardProps } from "@/types";
import { HudCarousel } from "@/components/HudCarousel";
import styles from "./ProjectCard.module.css";

function formatStatus(status: ProjectCardProps["status"]): string {
  return status.replace("-", " ");
}

export function ProjectCard({
  titolo,
  descrizione,
  stack,
  stackNote,
  link,
  linkLabel = "open repo →",
  status,
  gallery,
  featured = false,
}: ProjectCardProps) {
  const hasStack = stack.length > 0;
  const hasGallery = Boolean(gallery && gallery.length > 0);
  const isMailLink = link.startsWith("mailto:");

  return (
    <article
      className={[styles.card, featured ? styles.cardFeatured : ""].filter(Boolean).join(" ")}
      aria-label={titolo ? `Progetto ${titolo}` : "Project card"}
    >
      <div className={hasGallery ? styles.layoutWithGallery : undefined}>
        <div className={styles.content}>
          <header className={styles.header}>
            <h3 className={styles.title}>
              {titolo || <span className={styles.emptyValue}>—</span>}
            </h3>
            <span className={styles.status}>{formatStatus(status)}</span>
          </header>

          <p className={styles.description}>
            {descrizione || <span className={styles.emptyValue}>—</span>}
          </p>

          <div className={styles.stackSection}>
            <span className={styles.stackLabel}>stack</span>
            {stackNote ? <p className={styles.stackNote}>{stackNote}</p> : null}
            {hasStack ? (
              <ul className={styles.stackList} aria-label="Stack tecnologico">
                {stack.map((tech) => (
                  <li key={tech} className={styles.stackItem}>
                    {tech}
                  </li>
                ))}
              </ul>
            ) : (
              <span className={styles.emptyValue}>—</span>
            )}
          </div>

          {link ? (
            <a
              href={link}
              className={styles.link}
              {...(isMailLink
                ? {
                    "aria-label": `Invia email per informazioni su ${titolo || "il progetto"}`,
                  }
                : {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
            >
              {linkLabel}
            </a>
          ) : (
            <span className={styles.emptyValue}>—</span>
          )}
        </div>

        {hasGallery && gallery ? (
          <div className={styles.gallery}>
            <HudCarousel images={gallery} label={`Screenshot ${titolo || "progetto"}`} />
          </div>
        ) : null}
      </div>
    </article>
  );
}
