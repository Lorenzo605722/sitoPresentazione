import styles from "./IntroBio.module.css";

const DEFAULT_BIO =
  "Sviluppatore Junior TypeScript. Costruisco applicazioni web solide e curate nei dettagli. Passato da officine e sport agonistico: approccio concreto, disciplina e voglia di imparare. Aperto a opportunità in frontend, fullstack e contesti tech dove code e sistemi (anche robotica) si incontrano.";

export interface IntroBioProps {
  label?: string;
  bio?: string;
}

export function IntroBio({
  label = "// PROFILO",
  bio = DEFAULT_BIO,
}: IntroBioProps) {
  return (
    <section className={styles.section} aria-labelledby="intro-bio-heading">
      <div className={styles.wrapper}>
        <p id="intro-bio-heading" className={styles.label}>
          {label}
        </p>
        <p className={styles.bio}>{bio}</p>
      </div>
    </section>
  );
}
