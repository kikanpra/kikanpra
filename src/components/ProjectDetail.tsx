import React, { useEffect } from "react";
import { ArrowLeft, X } from "lucide-react";
import { ProjectItem } from "../types";
import { HERO_DATA } from "../data/portfolioData";

interface ProjectDetailProps {
  project: ProjectItem;
  onBack: () => void;
  onOpenPrivacy?: () => void;
  onOpenTerms?: () => void;
}

// Authentic Software Brand Icon Badges
export const renderSoftwareBadgeIcon = (name: string) => {
  const normalized = name.toLowerCase();

  if (normalized.includes("photoshop") || normalized === "ps") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#001E36] border border-[#31A8FF]/40 flex items-center justify-center shadow-sm shrink-0 select-none">
        <span className="font-extrabold text-[#31A8FF] text-base font-sans tracking-tight leading-none">
          Ps
        </span>
      </div>
    );
  }

  if (normalized.includes("illustrator") || normalized === "ai") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#330000] border border-[#FF9A00]/40 flex items-center justify-center shadow-sm shrink-0 select-none">
        <span className="font-extrabold text-[#FF9A00] text-base font-sans tracking-tight leading-none">
          Ai
        </span>
      </div>
    );
  }

  if (normalized.includes("figma")) {
    return (
      <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/50 flex items-center justify-center shadow-sm shrink-0">
        <svg viewBox="0 0 38 57" className="w-5 h-5">
          <path
            fill="#F24E1E"
            d="M19 0H9.5C4.25 0 0 4.25 0 9.5C0 14.75 4.25 19 9.5 19H19V0Z"
          />
          <path
            fill="#FF7262"
            d="M19 0H28.5C33.75 0 38 4.25 38 9.5C38 14.75 33.75 19 28.5 19H19V0Z"
          />
          <path
            fill="#A259FF"
            d="M19 19H9.5C4.25 19 0 23.25 0 28.5C0 33.75 4.25 38 9.5 38H19V19Z"
          />
          <path
            fill="#1ABCFE"
            d="M19 19H28.5C33.75 19 38 23.25 38 28.5C38 33.75 33.75 38 28.5 38C23.25 38 19 33.75 19 28.5V19Z"
          />
          <path
            fill="#0ACF83"
            d="M0 47.5C0 42.25 4.25 38 9.5 38H19V47.5C19 52.75 14.75 57 9.5 57C4.25 57 0 52.75 0 47.5Z"
          />
        </svg>
      </div>
    );
  }

  if (normalized.includes("premiere") || normalized === "pr") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#00005B] border border-[#9999FF]/40 flex items-center justify-center shadow-sm shrink-0 select-none">
        <span className="font-extrabold text-[#9999FF] text-base font-sans tracking-tight leading-none">
          Pr
        </span>
      </div>
    );
  }

  if (normalized.includes("after effects") || normalized === "ae") {
    return (
      <div className="w-10 h-10 rounded-xl bg-[#00005B] border border-[#D291FF]/40 flex items-center justify-center shadow-sm shrink-0 select-none">
        <span className="font-extrabold text-[#D291FF] text-base font-sans tracking-tight leading-none">
          Ae
        </span>
      </div>
    );
  }

if (normalized.includes("davinci")) {
    return (
    <div className="w-10 h-10 rounded-xl bg-[#1A1A24] border border-amber-500/40 flex items-center justify-center shadow-sm shrink-0">
        <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#E63946] via-[#F4A261] to-[#2A9D8F] flex items-center justify-center">
        <span className="text-[10px] font-black text-black font-sans">
            DVR
        </span>
        </div>
    </div>
    );
}

if (normalized.includes("blender")) {
    return (
    <div className="w-10 h-10 rounded-xl bg-[#1c2430] border border-[#E87D0D]/40 flex items-center justify-center shadow-sm shrink-0">
        <div className="w-5 h-5 rounded-full bg-[#E87D0D] flex items-center justify-center text-white text-[11px] font-bold">
        B
        </div>
    </div>
    );
}

if (normalized.includes("indesign") || normalized === "id") {
    return (
    <div className="w-10 h-10 rounded-xl bg-[#49021F] border border-[#FF3366]/40 flex items-center justify-center shadow-sm shrink-0 select-none">
        <span className="font-extrabold text-[#FF3366] text-base font-sans tracking-tight leading-none">
        Id
        </span>
    </div>
    );
}

  // Default fallback badge
return (
    <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700 flex items-center justify-center shadow-sm shrink-0 select-none">
    <span className="font-bold text-[#FF6B00] text-sm font-sans">
        {name.slice(0, 2).toUpperCase()}
    </span>
    </div>
);
};

export const ProjectDetail: React.FC<ProjectDetailProps> = ({
project,
onBack,
onOpenPrivacy,
onOpenTerms,
}) => {
  // Scroll to top upon opening
useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
}, [project.id]);

const handleBackClick = () => {
    onBack();
    setTimeout(() => {
    const experienceSection = document.getElementById("experience");
    if (experienceSection) {
        experienceSection.scrollIntoView({ behavior: "smooth" });
    }
    }, 100);
};

const projectImage =
    project.image ||
    project.imageUrl ||
    "https://images.unsplash.com/photo-1600132806370-bf17e65e942f?w=1200&auto=format&fit=crop&q=85";
const softwareList =
    project.software && project.software.length > 0
    ? project.software
    : ["Adobe Photoshop", "Adobe Illustrator", "Figma"];

return (
    <div
    id="project-detail-page"
    className="min-h-screen bg-[#FFFFFF] text-[#111111] font-sans antialiased w-full"
    >
      {/* FULL-WIDTH CONTAINER */}
    <div id="project-detail-container" className="w-full bg-[#FFFFFF]">
        {/* ======================================== */}
        {/* BAGIAN 1 — HERO PROJECT (FULL BLEED)     */}
        {/* ======================================== */}
        <div
        id="project-hero"
        className="relative min-h-[460px] sm:min-h-[520px] md:min-h-[580px] lg:aspect-[16/7] w-full overflow-hidden flex flex-col justify-between p-6 sm:p-10 md:p-14 lg:p-16"
        >
          {/* Background Image */}
        <img
            src={projectImage}
            alt={project.title}
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center"
        />

          {/* Gradient Overlay for Text Readability */}
        <div
            className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"
            aria-hidden="true"
        />

          {/* Ambient Lighting Accents */}
        <div
            className="absolute -top-24 -right-24 w-96 h-96 bg-[#27459e]/30 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
        />
        <div
            className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#FF6B00]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
        />

          {/* BOTTOM HERO CONTENT (2 Columns: Title Left, Client Right) */}
        <div
            id="hero-bottom-content"
            className="relative z-20 flex flex-col md:flex-row md:items-end justify-between gap-6 pt-16 sm:pt-24 mt-auto max-w-7xl mx-auto w-full"
        >
            {/* BAGIAN KIRI BAWAH HERO */}
            <div className="max-w-3xl">
            
            <h1
                id="hero-project-title"
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[52px] font-extrabold text-white leading-[0.98] sm:leading-[1.02] tracking-tight line-clamp-2 drop-shadow-md"
            >
                {project.title}
            </h1>
            </div>

            {/* BAGIAN KANAN BAWAH HERO */}
            <div
            id="hero-client-box"
            className="text-left md:text-right shrink-0 md:pb-1"
            >
            <div
                id="hero-client-label"
                className="text-[#FF6B00] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] mb-1 drop-shadow"
            >
                CLIENT
            </div>
            <div
                id="hero-client-name"
                className="text-white font-bold text-xl sm:text-2xl md:text-3xl tracking-tight drop-shadow"
            >
                {project.client}
            </div>
            </div>
        </div>
        </div>

        {/* ======================================== */}
        {/* BAGIAN 2 — PROJECT INFORMATION           */}
        {/* ======================================== */}
        <div
        id="project-information"
        className="bg-[#FFFFFF] px-6 sm:px-10 md:px-14 lg:px-16 py-12 sm:py-16 md:py-20"
        >
        <div className="max-w-7xl mx-auto mb-8">
            {/* Back Button */}
            <button
            id="btn-back-to-portfolio"
            onClick={handleBackClick}
            className="group flex items-center gap-3.5 px-4 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-900 transition-all border border-slate-300 cursor-pointer shadow-sm hover:shadow-md"
            >
            <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center group-hover:-translate-x-0.5 transition-transform">
                <ArrowLeft className="w-4 h-4 text-slate-900" />
            </div>
            <span className="font-bold text-base sm:text-lg tracking-tight group-hover:text-[#FF6B00] transition-colors pr-1">
                Kembali
            </span>
            </button>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* KOLOM KIRI: ~58% (lg:col-span-7) */}
            <div id="col-project-description" className="lg:col-span-7">
            <div
                id="label-description"
                className="text-[#FF6B00] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] mb-3"
            >
                DESKRIPSI
            </div>

            <h2
                id="heading-project-description"
                className="text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-extrabold text-[#111111] leading-tight mb-6 tracking-tight"
             >
                {project.heading}
            </h2>

              <p
                id="text-project-description"
                className="text-[#666666] text-base sm:text-lg leading-[1.8] font-normal max-w-2xl"
              >
                {project.description}
              </p>
            </div>

            {/* KOLOM KANAN: ~42% (lg:col-span-5) */}
            <div id="col-project-software" className="lg:col-span-5">
              <div
                id="label-software"
                className="text-[#FF6B00] text-xs sm:text-sm font-bold uppercase tracking-[0.08em] mb-4"
              >
                SOFTWARE USED
              </div>

              {/* Dynamic Software Cards List */}
              <div
                id="software-cards-list"
                className="flex flex-col gap-3 sm:gap-3.5"
              >
                {softwareList.map((softwareName, index) => (
                  <div
                    key={`${softwareName}-${index}`}
                    id={`software-card-${index}`}
                    className="bg-white border border-[#E5E5E5] hover:border-[#FF6B00]/40 rounded-[16px] px-4 py-3.5 sm:px-5 sm:py-4 flex items-center gap-3.5 shadow-sm hover:shadow-md transition-all duration-200"
                  >
                    {renderSoftwareBadgeIcon(softwareName)}
                    <span className="text-[#111111] font-semibold text-sm sm:text-base tracking-tight">
                      {softwareName}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ======================================== */}
        {/* BAGIAN 3 — FOOTER (MATCHING MAIN SITE)   */}
        {/* ======================================== */}
        <footer
          id="project-detail-footer"
          className="bg-[#1b3275] text-white border-t border-white/10 relative overflow-hidden transition-colors duration-300 py-10 sm:py-12 px-6 sm:px-10 md:px-14 lg:px-16"
        >
          {/* Ambient background glows */}
          <div
            className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#27459e]/60 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />
          <div
            className="absolute -top-24 -left-24 w-96 h-96 bg-[#A8E86C]/15 rounded-full blur-3xl pointer-events-none"
            aria-hidden="true"
          />

          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6 text-xs sm:text-sm text-slate-300 font-medium relative z-10">
            <p id="footer-copyright-text">
              © {new Date().getFullYear()} {HERO_DATA.fullName}. All Rights
              Reserved.
            </p>

            <div className="flex items-center gap-8">
              <button
                id="footer-link-privacy"
                onClick={onOpenPrivacy}
                className="hover:text-[#A8E86C] transition-colors cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                id="footer-link-terms"
                onClick={onOpenTerms}
                className="hover:text-[#A8E86C] transition-colors cursor-pointer"
              >
                Terms of Service
              </button>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};
