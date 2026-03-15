import type { CSSProperties } from "react";
import { HeroSection } from "@/components/HeroSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AboutSection } from "@/components/AboutSection";
import { ContactSection } from "@/components/ContactSection";
import { DragonSays } from "@/components/DragonSays";
import { projects } from "@/data";
import { danteQuotes, giottoQuotes, leonardoQuotes } from "@/data/dragonQuotes";

const dragonsSectionStyle: CSSProperties = {
  padding: "0 1.5rem 2rem",
  maxWidth: 1200,
  margin: "0 auto",
  display: "flex",
  flexWrap: "wrap",
  gap: "1.5rem",
  justifyContent: "center",
};

export default function Home() {
  return (
    <main className="mainSections">
      <section id="home" aria-label="Home">
        <HeroSection />
        <div className="dragonsSectionWrapper">
          <p className="dragonsLoadingLabel" aria-live="polite">
            {`// Fetching real-time strategic insights from QuotaApp engine...`}
          </p>
          <div style={dragonsSectionStyle} role="list" aria-label="I tre draghi di QuotaApp">
            <DragonSays name="Dante" quotes={danteQuotes} />
            <DragonSays name="Giotto" quotes={giottoQuotes} />
            <DragonSays name="Leonardo" quotes={leonardoQuotes} />
          </div>
        </div>
      </section>

      <section id="projects" aria-label="Progetti">
        <ProjectsSection projects={projects} />
      </section>

      <section id="about" aria-label="About Me">
        <AboutSection />
      </section>

      <section id="contact" aria-label="Contatti">
        <ContactSection />
      </section>
    </main>
  );
}
