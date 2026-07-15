import { ProjectCard } from "@/components/ProjectCard";
import { projects } from "@/data/projects";
import styles from "./ProjectsSection.module.css";

export interface ProjectsSectionProps {
  title?: string;
}

export function ProjectsSection({ title = "Progetti" }: ProjectsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.wrapper}>
        <h2 id="projects-heading" className={styles.title}>
          {title}
        </h2>

        <div className={styles.panel}>
          <div className={styles.grid} role="list" aria-label="Elenco progetti">
            {projects.map((project) => {
              const featured = Boolean(project.gallery?.length);
              return (
                <div
                  key={project.id}
                  role="listitem"
                  className={[styles.item, featured ? styles.itemFeatured : ""]
                    .filter(Boolean)
                    .join(" ")}
                >
                  <ProjectCard
                    titolo={project.titolo}
                    descrizione={project.descrizione}
                    stack={project.techStack}
                    stackNote={project.stackNote}
                    link={project.link}
                    linkLabel={project.linkLabel}
                    status={project.status}
                    gallery={project.gallery}
                    featured={featured}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
