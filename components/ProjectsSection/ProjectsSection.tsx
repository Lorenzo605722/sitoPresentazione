import type { Project } from "@/types";
import { ProjectCard } from "@/components/ProjectCard";
import styles from "./ProjectsSection.module.css";

interface ProjectsSectionProps {
  projects: Project[];
  title?: string;
}

export function ProjectsSection({
  projects,
  title = "Progetti",
}: ProjectsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="projects-heading">
      <div className={styles.wrapper}>
        <h2 id="projects-heading" className={styles.title}>
          {title}
        </h2>
        <div className={styles.grid}>
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
