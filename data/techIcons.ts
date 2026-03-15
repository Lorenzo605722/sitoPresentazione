/**
 * Mappa nome tecnologia → slug Simple Icons (cdn.simpleicons.org)
 * Usato per mostrare i loghi nella ProjectCard.
 */
export const techIconSlugs: Record<string, string> = {
  "Next.js": "nextdotjs",
  TypeScript: "typescript",
  React: "react",
  Firebase: "firebase",
  AI: "", // icona custom SVG in ProjectCard
  IA: "",
  "OpenAI API": "openai",
  OpenAI: "openai",
  PostgreSQL: "postgresql",
  Prisma: "prisma",
  Node: "nodedotjs",
  "Node.js": "nodedotjs",
  CSS: "css3",
  Sass: "sass",
  Git: "git",
  JavaScript: "javascript",
  HTML: "html5",
  Tailwind: "tailwindcss",
  "Tailwind CSS": "tailwindcss",
  "Chart.js": "chartdotjs",
};

const CDN_BASE = "https://cdn.simpleicons.org";

export function getTechIconUrl(techName: string): string | null {
  const slug = techIconSlugs[techName];
  if (slug === undefined || slug === "") return null;
  return `${CDN_BASE}/${slug}`;
}
