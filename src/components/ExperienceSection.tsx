import React, { useState } from "react";
import { Code2, Award, Layers, ArrowRight, X } from "lucide-react";
import {
  PROJECTS_LIST,
  CERTIFICATES_LIST,
} from "../data/portfolioData";
import {
  CaseStudyCard,
  CertificateCaseCard,
} from "./CaseStudyCard";
import { ProjectItem, CertificateItem } from "../types";

interface ExperienceSectionProps {
  onOpenPortfolio: () => void;
  onSelectProject?: (project: ProjectItem) => void;
}

type TabType = "projects" | "certificates";

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({
  onOpenPortfolio,
  onSelectProject,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>("projects");
  const [previewImage, setPreviewImage] = useState<{
    url: string;
    title: string;
    subtitle: string;
  } | null>(null);

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    {
      id: "projects",
      label: "Projects",
      icon: <Code2 className="w-4 h-4" />,
    },
    {
      id: "certificates",
      label: "Certificates",
      icon: <Award className="w-4 h-4" />,
    },
  ];

  const handleProjectPreview = (project: ProjectItem) => {
    if (onSelectProject) {
      onSelectProject(project);
    } else if (project.imageUrl) {
      setPreviewImage({
        url: project.imageUrl,
        title: project.title,
        subtitle: `${project.category} • ${project.client} (${project.year})`,
      });
    }
  };

  const handleCertificatePreview = (cert: CertificateItem) => {
    if (cert.badgeUrl) {
      setPreviewImage({
        url: cert.badgeUrl,
        title: cert.title,
        subtitle: `${cert.issuer} (${cert.year}) • ID: ${cert.credentialId}`,
      });
    }
  };

  return (
    <section
      id="experience"
      className="py-20 md:py-28 bg-[#1b3275] text-white relative overflow-hidden transition-colors duration-300"
    >
      {/* Ambient background glows */}
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#27459e]/50 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#A8E86C]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#27459e]/30 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 md:mb-12">
          <div
            id="education-work-tag"
            className="inline-block py-1.5 px-4 bg-white/10 text-[#A8E86C] rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6 border border-white/10 backdrop-blur-sm"
          >
            — Pendidikan &amp; Projek
          </div>

          <h2
            id="portfolio-showcase-heading"
            className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight"
          >
            Portfolio <span className="text-[#A8E86C]">Showcase</span>
          </h2>
        </div>

        {/* Tab Navigation Pill Bar with Glassmorphism */}
        <div className="flex justify-center mb-10 sm:mb-12">
          <div
            id="showcase-tab-bar"
            className="bg-black/30 backdrop-blur-md p-1.5 sm:p-2 rounded-2xl sm:rounded-3xl border border-white/10 shadow-2xl flex items-center gap-1.5 sm:gap-2 max-w-xl w-full"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  id={`tab-btn-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 sm:py-3.5 px-3 sm:px-6 rounded-xl sm:rounded-2xl font-display font-bold text-xs sm:text-sm md:text-base flex items-center justify-center gap-2 sm:gap-2.5 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-[#27459e] text-white shadow-lg shadow-[#27459e]/40 border border-white/15"
                      : "text-slate-300 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span className={isActive ? "text-[#A8E86C]" : "opacity-70"}>
                    {tab.icon}
                  </span>
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Tab Content Display Area */}
        <div id="showcase-tab-content" className="min-h-[420px]">
          {/* TAB 1: PROJECTS (New Reference Card Style) */}
          {activeTab === "projects" && (
            <div className="animate-in fade-in zoom-in-98 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {PROJECTS_LIST.slice(0, 6).map((project, idx) => (
                  <CaseStudyCard
                    key={project.id}
                    project={project}
                    index={idx}
                    onPreview={handleProjectPreview}
                    cardBgClass="bg-[#FAF9F5] dark:bg-slate-900"
                    notchFillClass="text-[#FAF9F5] dark:text-slate-900"
                  />
                ))}
              </div>

              {/* View All Button */}
              <div className="text-center mt-12">
                <button
                  id="btn-view-all-portfolio"
                  onClick={onOpenPortfolio}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#A8E86C] hover:bg-[#97d85b] text-black rounded-full font-display font-bold text-sm sm:text-base shadow-lg shadow-[#A8E86C]/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: CERTIFICATES */}
          {activeTab === "certificates" && (
            <div className="animate-in fade-in zoom-in-98 duration-300">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {CERTIFICATES_LIST.map((cert, idx) => (
                  <CertificateCaseCard
                    key={cert.id}
                    certificate={cert}
                    index={idx}
                    onPreview={handleCertificatePreview}
                    cardBgClass="bg-[#FAF9F5] dark:bg-slate-900"
                    notchFillClass="text-[#FAF9F5] dark:text-slate-900"
                  />
                ))}
              </div>

              <div className="text-center mt-12">
                <button
                  onClick={onOpenPortfolio}
                  className="inline-flex items-center gap-2.5 px-8 py-4 bg-[#A8E86C] hover:bg-[#97d85b] text-black rounded-full font-display font-bold text-sm sm:text-base shadow-lg shadow-[#A8E86C]/20 transition-all duration-300 hover:scale-105 cursor-pointer"
                >
                  <span>Selengkapnya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Lightbox / Enlarged Image Preview Modal */}
      {previewImage && (
        <div
          id="experience-image-lightbox"
          onClick={() => setPreviewImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-slate-900 rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl border border-white/15 flex flex-col text-white"
          >
            <div className="p-4 sm:p-6 flex items-center justify-between border-b border-white/10">
              <div>
                <h3 className="font-display text-lg sm:text-xl font-bold text-white">
                  {previewImage.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-400">
                  {previewImage.subtitle}
                </p>
              </div>
              <button
                onClick={() => setPreviewImage(null)}
                aria-label="Close image preview"
                className="p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="relative w-full max-h-[70vh] bg-black flex items-center justify-center overflow-hidden">
              <img
                src={previewImage.url}
                alt={previewImage.title}
                referrerPolicy="no-referrer"
                className="max-h-[70vh] w-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
