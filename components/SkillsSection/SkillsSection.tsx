import type { SkillsSectionProps } from "@/types";
import styles from "./SkillsSection.module.css";

export function SkillsSection({
  skills,
  title = "Competenze",
}: SkillsSectionProps) {
  return (
    <section className={styles.section} aria-labelledby="skills-heading">
      <h2 id="skills-heading" className={styles.title}>
        {title}
      </h2>
      <div className={styles.grid}>
        {skills.map((skill) => (
          <div key={skill.nome} className={styles.card}>
            <span className={styles.name}>{skill.nome}</span>
            <span className={styles.level}>{skill.livello}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
