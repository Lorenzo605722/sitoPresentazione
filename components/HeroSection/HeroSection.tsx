import styles from "./HeroSection.module.css";

const WORD = "Benvenuti";

const PRESENTATION =
  "Ciao, sono Lorenzo, ho 28 anni e sono uno sviluppatore Junior TypeScript con un passato tra motori e officine. Questa esperienza mi ha trasmesso una disciplina ferrea e una tolleranza zero verso l'approssimazione: oggi porto la stessa precisione meccanica nel mondo del software, smontando problemi complessi per ricostruire soluzioni digitali solide, scalabili e performanti. Non mi accontento di far \"girare\" le applicazioni; le progetto affinché ogni ingranaggio del codice sia ottimizzato e sicuro. Attraverso i miei progetti, come Quota e Cashflow, dimostro quotidianamente come la mia capacità di risoluzione sotto pressione e la mia fame di crescita siano il motore di una carriera votata alla creazione di architetture tecnologiche d'eccellenza.";

export function HeroSection() {
  return (
    <section className={styles.hero} aria-label="Presentazione">
      <div className={styles.content}>
        <h1 className={styles.title} aria-label={WORD}>
          {WORD.split("").map((letter, i) => (
            <span
              key={i}
              className={styles.letter}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              {letter}
            </span>
          ))}
          <span className={styles.cursor} aria-hidden />
        </h1>
        <p className={styles.role}>Junior TS Developer</p>
        <p className={styles.presentation}>{PRESENTATION}</p>
      </div>
    </section>
  );
}
