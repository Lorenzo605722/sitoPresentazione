import type { Project } from "@/types";

function infoMail(projectName: string): string {
  return [
    "mailto:lollus97.lg@gmail.com",
    "?subject=" + encodeURIComponent(`Richiesta informazioni — ${projectName}`),
    "&body=" +
      encodeURIComponent(
        `Ciao Lorenzo,\n\nvorrei ricevere maggiori informazioni su ${projectName}.\n\nGrazie.`
      ),
  ].join("");
}

export const projects: Project[] = [
  {
    id: "quota-app",
    titolo: "QuotaApp",
    descrizione:
      "Applicazione fintech per la gestione di stipendio e spese quotidiane, con assistente virtuale capace di fornire risposte automatiche su analisi, andamento e decisioni finanziarie.",
    techStack: ["TypeScript", "React", "Node.js", "Neon", "Render", "Resend"],
    stackNote:
      "Frontend in React e TypeScript, API Node.js su Render, database Neon e email di conferma con Resend.",
    link: infoMail("QuotaApp"),
    linkLabel: "richiedi info →",
    status: "completato",
    image: "/quota/dashboard.jpeg",
    gallery: [
      { src: "/quota/dashboard.jpeg", alt: "QuotaApp — dashboard", caption: "Dashboard" },
      {
        src: "/quota/sezioneStipendio.jpeg",
        alt: "QuotaApp — gestione stipendio",
        caption: "Stipendio",
      },
      {
        src: "/quota/calendarioSpese.jpeg",
        alt: "QuotaApp — calendario spese",
        caption: "Calendario spese",
      },
      {
        src: "/quota/storicoEntrate.jpeg",
        alt: "QuotaApp — storico entrate",
        caption: "Storico entrate",
      },
      {
        src: "/quota/obiettiviFinanziari.jpeg",
        alt: "QuotaApp — obiettivi finanziari",
        caption: "Obiettivi",
      },
      {
        src: "/quota/chatDante.jpeg",
        alt: "QuotaApp — chat assistente virtuale Dante",
        caption: "Assistente AI",
      },
      {
        src: "/quota/impostazioni.jpeg",
        alt: "QuotaApp — impostazioni",
        caption: "Impostazioni",
      },
    ],
  },
  {
    id: "fiscaleo",
    titolo: "Fiscaleo",
    descrizione:
      "Web app pensata per commercialisti: centralizza clienti e flusso documentale in un unico ambiente di lavoro. Include notifiche push mirate che ricordano ai clienti scadenze e pagamenti, per ridurre ritardi e alleggerire il follow-up manuale dello studio.",
    techStack: ["TypeScript", "React", "Next.js", "Node.js"],
    stackNote:
      "Frontend React e TypeScript su Next.js, servizi Node.js e notifiche push per scadenze e pagamenti.",
    link: infoMail("Fiscaleo"),
    linkLabel: "richiedi info →",
    status: "in-corso",
  },
];
