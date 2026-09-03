import React from "react";
import { ArrowUpRight } from "lucide-react";
import { ProjectItem, CertificateItem, ExperienceItem } from "../types";

interface CaseStudyCardProps {
  project: ProjectItem;
  index: number;
  onPreview: (project: ProjectItem) => void;
  cardBgClass?: string;
  notchFillClass?: string;
}

// Warm pastel palette matching reference design
export const PASTEL_COLORS = [
  { bg: "#F2C49B", text: "#ffffff" }, // Peach / Apricot
  { bg: "#A4D8B8", text: "#ffffff" }, // Sage / Mint Green
  { bg: "#B8BEE2", text: "#ffffff" }, // Soft Lavender
  { bg: "#9DC6EB", text: "#ffffff" }, // Soft Sky Blue
  { bg: "#EBB3B3", text: "#ffffff" }, // Soft Dusty Rose
  { bg: "#A8E86C", text: "#000000" }, // Signature Lime Green
];

// Helper to determine tag pill pastel coloring
export const getTagColorClass = (tag: string) => {
  const upper = tag.toUpperCase();
  if (
    upper.includes("BRAND") ||
    upper.includes("IDENTITY") ||
    upper.includes("TYPO") ||
    upper.includes("CERT")
  ) {
    return "bg-[#F5E4D0] text-[#784A1A] dark:bg-[#593C1E]/60 dark:text-[#F3D7BD]";
  }
  if (
    upper.includes("PACKAG") ||
    upper.includes("PRINT") ||
    upper.includes("ILLUSTRATION")
  ) {
    return "bg-[#CFEBD9] text-[#1E5D36] dark:bg-[#1E4A2E]/60 dark:text-[#BAE8CB]";
  }
  if (
    upper.includes("MARKET") ||
    upper.includes("VIDEO") ||
    upper.includes("MOTION") ||
    upper.includes("EXP")
  ) {
    return "bg-[#DDE0FA] text-[#3E4582] dark:bg-[#2F3465]/60 dark:text-[#D0D4F7]";
  }
  if (
    upper.includes("WEB") ||
    upper.includes("UX") ||
    upper.includes("UI") ||
    upper.includes("FIGMA") ||
    upper.includes("APP")
  ) {
    return "bg-[#D4E8FA] text-[#1D4F7C] dark:bg-[#1B3C5E]/60 dark:text-[#C5E1F9]";
  }
  return "bg-slate-200/80 text-slate-700 dark:bg-slate-800 dark:text-slate-300";
};

// ======================= PROJECT CASE STUDY CARD =======================
export const CaseStudyCard: React.FC<CaseStudyCardProps> = ({
  project,
  index,
  onPreview,
  cardBgClass = "bg-[#FAF9F5] dark:bg-slate-900",
  notchFillClass = "text-[#FAF9F5] dark:text-slate-900",
}) => {
  const colorScheme = PASTEL_COLORS[index % PASTEL_COLORS.length];

  const displayTags =
    project.tags && project.tags.length > 0
      ? project.tags.slice(0, 3)
      : [project.category];

  return (
    <div
      onClick={() => onPreview(project)}
      className={`group flex flex-col ${cardBgClass} rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer border border-black/[0.04] dark:border-white/10`}
    >
      {/* 1. Top Image Box (Full-bleed at Top, Left, and Right) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={project.imageUrl}
          alt={project.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Bottom-Right Inverted Notch Container */}
        <div
          className={`absolute bottom-0 right-0 w-14 h-14 sm:w-16 sm:h-16 ${cardBgClass} rounded-tl-[1.75rem] flex items-center justify-center z-10`}
        >
          {/* Top Concave Fillet Curve */}
          <svg
            className={`absolute -top-4 right-0 w-4 h-4 ${notchFillClass} fill-current pointer-events-none`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 0 V16 H0 A16 16 0 0 0 16 0 Z" />
          </svg>

          {/* Left Concave Fillet Curve */}
          <svg
            className={`absolute bottom-0 -left-4 w-4 h-4 ${notchFillClass} fill-current pointer-events-none`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 0 V16 H0 A16 16 0 0 0 16 0 Z" />
          </svg>

          {/* Pastel Action Circle with Arrow */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(project);
            }}
            aria-label={`View ${project.title}`}
            style={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* 2. Bottom Content Area for Text Highlight */}
      <div className="p-5 sm:p-6 flex flex-col">
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight group-hover:text-[#27459e] dark:group-hover:text-[#A8E86C] transition-colors line-clamp-1">
            {project.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed line-clamp-2">
            {project.description}
          </p>
        </div>

        {/* Tag Pills Grid (Didalam padding) */}
        <div className="mt-5 pt-4 flex flex-wrap items-center gap-2 border-t border-black/[0.04] dark:border-white/5">
          {displayTags.map((tag, i) => (
            <span
              key={i}
              className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg ${getTagColorClass(tag)}`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

// ======================= CERTIFICATE CASE CARD =======================
interface CertificateCaseCardProps {
  certificate: CertificateItem;
  index: number;
  onPreview: (certificate: CertificateItem) => void;
  cardBgClass?: string;
  notchFillClass?: string;
}

export const CertificateCaseCard: React.FC<CertificateCaseCardProps> = ({
  certificate,
  index,
  onPreview,
  cardBgClass = "bg-[#FAF9F5] dark:bg-slate-900",
  notchFillClass = "text-[#FAF9F5] dark:text-slate-900",
}) => {
  const colorScheme = PASTEL_COLORS[index % PASTEL_COLORS.length];

  return (
    <div
      onClick={() => onPreview(certificate)}
      className={`group flex flex-col justify-between ${cardBgClass} rounded-[2rem] overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1.5 cursor-pointer border border-black/[0.04] dark:border-white/10`}
    >
      {/* Top Image Box (Full-bleed) */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-slate-200 dark:bg-slate-800">
        <img
          src={certificate.badgeUrl}
          alt={certificate.title}
          referrerPolicy="no-referrer"
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Bottom-Right Inverted Notch Container */}
        <div
          className={`absolute bottom-0 right-0 w-14 h-14 sm:w-16 sm:h-16 ${cardBgClass} rounded-tl-[1.75rem] flex items-center justify-center z-10`}
        >
          <svg
            className={`absolute -top-4 right-0 w-4 h-4 ${notchFillClass} fill-current pointer-events-none`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 0 V16 H0 A16 16 0 0 0 16 0 Z" />
          </svg>

          <svg
            className={`absolute bottom-0 -left-4 w-4 h-4 ${notchFillClass} fill-current pointer-events-none`}
            viewBox="0 0 16 16"
            aria-hidden="true"
          >
            <path d="M16 0 V16 H0 A16 16 0 0 0 16 0 Z" />
          </svg>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onPreview(certificate);
            }}
            aria-label={`View ${certificate.title}`}
            style={{
              backgroundColor: colorScheme.bg,
              color: colorScheme.text,
            }}
            className="w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center shadow-sm transition-transform duration-300 group-hover:scale-110 cursor-pointer"
          >
            <ArrowUpRight className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>
      </div>

      {/* Bottom Content Area */}
      <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-display font-bold text-xl sm:text-2xl text-slate-900 dark:text-white tracking-tight group-hover:text-[#27459e] dark:group-hover:text-[#A8E86C] transition-colors line-clamp-1">
            {certificate.title}
          </h3>
        </div>

        {/* Tag Pills Grid */}
        <div className="mt-5 pt-4 flex flex-wrap items-center justify-between gap-2 border-t border-black/[0.04] dark:border-white/5">
          <div className="flex flex-wrap items-center gap-1.5">
            <span
              className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg ${getTagColorClass(certificate.issuer)}`}
            >
              {certificate.issuer}
            </span>
            <span
              className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-3 py-1.5 rounded-lg ${getTagColorClass("BRANDING")}`}
            >
              {certificate.year}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
