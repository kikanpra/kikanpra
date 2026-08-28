import { useState, useEffect } from "react";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { MarqueeBanner } from "./components/MarqueeBanner";
import { AboutSection } from "./components/AboutSection";
import { ExperienceSection } from "./components/ExperienceSection";
import { TechStackSection } from "./components/TechStackSection";
import { ContactSection } from "./components/ContactSection";
import { PortfolioModal, CVModal, LegalModal } from "./components/Modals";

export default function App() {
  const [portfolioModalOpen, setPortfolioModalOpen] = useState(false);
  const [cvModalOpen, setCvModalOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<
    "privacy" | "terms" | null
  >(null);

  useEffect(() => {
    // Ensure dark class is always active permanently
    document.documentElement.classList.add("dark");
    localStorage.removeItem("kikan_portfolio_theme");
  }, []);

  const handleHireMeClick = () => {
    const contactElement = document.getElementById("contact");
    if (contactElement) {
      contactElement.scrollIntoView({ behavior: "smooth" });
      const nameInput = document.getElementById("input-full-name");
      if (nameInput) {
        setTimeout(() => nameInput.focus(), 600);
      }
    }
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
        <HeroSection
          onOpenPortfolio={() => setPortfolioModalOpen(true)}
          onHireMeClick={handleHireMeClick}
        />

        {/* Endless Marquee Banner */}
        <MarqueeBanner />

        {/* About Section */}
        <AboutSection onDownloadCV={() => setCvModalOpen(true)} />

        {/* Portfolio Showcase (Education & Work Section) */}
        <ExperienceSection
          onOpenPortfolio={() => setPortfolioModalOpen(true)}
        />

        {/* Tech Stack Section */}
        <TechStackSection />

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
