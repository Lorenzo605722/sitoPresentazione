import { HeroSpace } from "@/components/HeroSpace";
import { IntroBio } from "@/components/IntroBio";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="mainSections">
      <section id="home" aria-label="Home">
        <HeroSpace />
      </section>

      <section id="intro" aria-label="Profilo">
        <IntroBio />
      </section>

      <section id="projects" aria-label="Progetti">
        <ProjectsSection />
      </section>

      <section id="contact" aria-label="Contatti">
        <ContactSection />
      </section>
    </main>
  );
}
