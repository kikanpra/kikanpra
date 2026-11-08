import { useState } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { AboutSection } from "./components/AboutSection";
import { TechStackSection } from "./components/TechStackSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { ContactSection } from "./components/ContactSection";
import { GallerySection } from "./components/Gallery";
import { PortfolioModal, CVModal, LegalModal } from "./components/Modals";
import { ProjectItem } from "./types";
import { ProjectDetail } from "./components/ProjectDetail";
import { ScrollReveal } from "./components/ScrollReveal";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

export default function App() {
  const shouldReduceMotion = useReducedMotion();
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<
    "privacy" | "terms" | null
  >(null);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(
    null,
  );

  const handleHireMeClick = () => {
    setSelectedProject(null);
    setTimeout(() => {
      const contactElement = document.getElementById("contact");
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: "smooth" });
        const nameInput = document.getElementById("input-full-name");
        if (nameInput) {
          setTimeout(() => nameInput.focus(), 600);
        }
      }
    }, 50);
  };

  const handleNavigateSection = (sectionId: string) => {
    setSelectedProject(null);
    setTimeout(() => {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  };

  const handleSelectProjectForInquiry = (projectTitle: string) => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
      const subjectInput = document.getElementById(
        "input-subject",
      ) as HTMLInputElement | null;
      if (subjectInput) {
        subjectInput.value = `Inquiry regarding ${projectTitle}`;
      }
      const messageInput = document.getElementById("textarea-message");
      if (messageInput) {
        setTimeout(() => messageInput.focus(), 600);
      }
    }
  };

  return (
    <div
      id="kikan-portfolio-app"
      className="min-h-screen bg-[#0F0F0F] text-slate-100 font-sans selection:bg-[#A8E86C] selection:text-black"
    >
      {/* Top Floating Navbar */}
      <Navbar
        onOpenPortfolio={() => setPortfolioModalOpen(true)}
        onContactClick={handleHireMeClick}
      />

      <main id="main-content-container">
        {/* Hero Section */}
        <ScrollReveal>
          <HeroSection
            onOpenPortfolio={() => setPortfolioModalOpen(true)}
            onHireMeClick={handleHireMeClick}
          />
        </ScrollReveal>

        {/* Endless Marquee Banner */}
        <ScrollReveal>
          <MarqueeBanner />
        </ScrollReveal>

        {/* About Section  (with Blue Background) */}
        <ScrollReveal>
          <AboutSection onDownloadCV={() => setCvModalOpen(true)} />
        </ScrollReveal>

        {/* Tech Stack & Creative Tools Section (Moved above Portfolio Showcase) */}
        <ScrollReveal>
          <TechStackSection />
        </ScrollReveal>

        {/* Portfolio Showcase (Education & Work Section) */}
        <ScrollReveal>
          <ExperienceSection
            onOpenPortfolio={() => setPortfolioModalOpen(true)}
            onSelectProject={(project) => setSelectedProject(project)}
          />
        </ScrollReveal>

        {/* Tech Stack Section */}
        <ScrollReveal>
          <GallerySection />
        </ScrollReveal>

        {/* Contact & Footer Section */}
        <ScrollReveal>
          <ContactSection
            onOpenPrivacy={() => setLegalModalType("privacy")}
            onOpenTerms={() => setLegalModalType("terms")}
          />
        </ScrollReveal>
      </main>

      {/* Interactive Modals */}
      <PortfolioModal
        isOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
        onSelectProjectForInquiry={handleSelectProjectForInquiry}
        onViewProjectDetail={(project) => {
          setPortfolioModalOpen(false);
          setSelectedProject(project);
        }}
      />

      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

      <LegalModal
        isOpen={legalModalType !== null && !selectedProject}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />

      <AnimatePresence mode="wait">
        {selectedProject && (
          <motion.div
            key={`project-detail-${selectedProject.id}`}
            id="kikan-project-detail-view"
            role="dialog"
            aria-modal="true"
            aria-label={`${selectedProject.title} project details`}
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.85,
                    y: 28,
                    filter: "blur(10px)",
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              filter: "blur(0px)",
            }}
            exit={
              shouldReduceMotion
                ? undefined
                : {
                    opacity: 0,
                    scale: 0.9,
                    y: 12,
                    filter: "blur(8px)",
                  }
            }
            transition={{
              duration: shouldReduceMotion ? 0 : 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="fixed inset-0 z-[60] overflow-y-auto overscroll-contain bg-[#0F0F0F] text-slate-100 font-sans selection:bg-[#A8E86C] selection:text-black"
            style={{ transformOrigin: "center center" }}
          >
            <ProjectDetail
              project={selectedProject}
              onBack={() => setSelectedProject(null)}
              onOpenPrivacy={() => setLegalModalType("privacy")}
              onOpenTerms={() => setLegalModalType("terms")}
            />

            <LegalModal
              isOpen={legalModalType !== null}
              type={legalModalType}
              onClose={() => setLegalModalType(null)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

declare module "react";
declare module "react/jsx-runtime";
declare namespace JSX {
  interface IntrinsicElements {
    [elem: string]: any;
  }
}
