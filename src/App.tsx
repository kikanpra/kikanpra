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

export default function App() {
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

  // If a single project is selected, display ONLY the dedicated single-card Project Detail page
  if (selectedProject) {
    return (
      <div
        id="kikan-project-detail-view"
        className="min-h-screen bg-[#0F0F0F] text-slate-100 font-sans selection:bg-[#A8E86C] selection:text-black"
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
      </div>
    );
  }

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
        <HeroSection
          onOpenPortfolio={() => setPortfolioModalOpen(true)}
          onHireMeClick={handleHireMeClick}
        />

        {/* Endless Marquee Banner */}
        <MarqueeBanner />

        {/* About Section  (with Blue Background) */}
        <AboutSection onDownloadCV={() => setCvModalOpen(true)} />

        {/* Tech Stack & Creative Tools Section (Moved above Portfolio Showcase) */}
        <TechStackSection />

        {/* Portfolio Showcase (Education & Work Section) */}
        <ExperienceSection
          onOpenPortfolio={() => setPortfolioModalOpen(true)}
          onSelectProject={(project) => setSelectedProject(project)}
        />

        {/* Tech Stack Section */}
        <GallerySection />

        {/* Contact & Footer Section */}
        <ContactSection
          onOpenPrivacy={() => setLegalModalType("privacy")}
          onOpenTerms={() => setLegalModalType("terms")}
        />
      </main>

      {/* Interactive Modals */}
      <PortfolioModal
        isOpen={portfolioModalOpen}
        onClose={() => setPortfolioModalOpen(false)}
        onSelectProjectForInquiry={handleSelectProjectForInquiry}
        onViewProjectDetail={(project) => setSelectedProject(project)}
      />

      <CVModal isOpen={cvModalOpen} onClose={() => setCvModalOpen(false)} />

      <LegalModal
        isOpen={legalModalType !== null}
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
      />
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
