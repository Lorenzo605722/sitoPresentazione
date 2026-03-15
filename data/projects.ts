import type { Project } from "@/types";

export const projects: Project[] = [
  {
    id: "quota-app",
    titolo: "QuotaApp",
    descrizione:
      "App di budgeting personale con integrazione IA per analisi delle spese, suggerimenti di risparmio e previsioni basate sui tuoi consumi.",
    techStack: ["TypeScript", "React", "Next.js", "Firebase", "AI"],
    githubLink: "https://github.com/Lorenzo605722",
    status: "in-corso",
    image: "/sfondoQuota.jpeg",
  },
  {
    id: "dashboard-finanziaria",
    titolo: "Dashboard Finanziaria",
    descrizione:
      "Dashboard per il monitoraggio di entrate, uscite e andamento del portafoglio.",
    techStack: ["TypeScript", "React", "Node.js", "Chart.js"],
    githubLink: "https://github.com/Lorenzo605722",
    status: "in-corso",
    image: "/cashflow.jpeg",
  },
];
