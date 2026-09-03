import React, { useState } from "react";
import {
  X,
  ExternalLink,
  CheckCircle2,
  Download,
  Printer,
  Sparkles,
  ArrowRight,
  Clock,
  DollarSign,
  Briefcase,
  GraduationCap,
  Award,
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  PROJECTS_LIST,
  CERTIFICATES_LIST,
  SERVICES_LIST,
  HERO_DATA,
} from "../data/portfolioData";
import { ProjectItem, ServiceItem } from "../types";

// ======================= PORTFOLIO MODAL =======================
interface PortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProjectForInquiry?: (projectTitle: string) => void;
  onViewProjectDetail?: (project: ProjectItem) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  isOpen,
  onClose,
  onSelectProjectForInquiry,
  onViewProjectDetail,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  if (!isOpen) return null;

  const categories = [
    "All",
    "Graphic Design",
    "Video Editing",
    "Web Design",
    "Branding",
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? PROJECTS_LIST
      : PROJECTS_LIST.filter((p) => p.category === selectedCategory);

  return (
    <div
      id="portfolio-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="portfolio-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden flex flex-col border border-black/10 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div>
            <div className="text-xs sm:text-sm font-bold text-[#27459e] dark:text-[#A8E86C] uppercase tracking-wider mb-1">
              Curated Showcase
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-slate-900 dark:text-white">
              Selected Works &amp; Case Studies
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close portfolio modal"
            className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter Pills */}
        <div className="px-6 sm:px-8 py-4 bg-slate-50 dark:bg-slate-800/50 flex flex-wrap gap-2 border-b border-slate-100 dark:border-white/5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-[#27459e] text-white shadow-sm"
                  : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid sm:grid-cols-2 gap-6">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-100 dark:border-white/5 flex flex-col justify-between hover:border-[#27459e]/50 transition-all hover:shadow-md group"
              >
                <div>
                  {project.imageUrl && (
                    <div className="w-full h-36 rounded-xl overflow-hidden mb-3 bg-slate-200 dark:bg-slate-700">
                      <img
                        src={project.imageUrl}
                        alt={project.title}
                        referrerPolicy="no-referrer"
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-[#27459e]/10 text-[#27459e] dark:bg-[#A8E86C]/10 dark:text-[#A8E86C]">
                      {project.category}
                    </span>
                    <span className="text-xs font-mono text-slate-400 font-semibold">
                      {project.year}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-1 group-hover:text-[#27459e] transition-colors">
                    {project.title}
                  </h3>
                  <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-3">
                    Client:{" "}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">
                      {project.client}
                    </span>
                  </div>

                  <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                    {project.description}
                  </p>
                </div>

                <div>
                  {project.metrics && (
                    <div className="mb-4 inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 rounded-lg text-xs font-bold">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>{project.metrics}</span>
                    </div>
                  )}

                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-medium px-2 py-0.5 bg-white dark:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-md border border-black/5 dark:border-white/5"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {onSelectProjectForInquiry && (
                    <button
                      onClick={() => {
                        onSelectProjectForInquiry(project.title);
                        onClose();
                      }}
                      className="w-full py-2.5 text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 hover:bg-[#27459e] hover:text-white rounded-xl transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
                    >
                      <span>Inquire similar project</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================= CV MODAL =======================
interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CVModal: React.FC<CVModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch {
      // ignore
    }
    window.print();
  };

  return (
    <div
      id="cv-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="cv-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-3xl max-h-[90vh] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden flex flex-col border border-black/10 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 sm:p-8 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#A8E86C] flex items-center justify-center text-black">
              <Download className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-display font-extrabold text-slate-900 dark:text-white">
                Curriculum Vitae
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {HERO_DATA.fullName} • Senior Designer
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-[#27459e] hover:bg-[#4F369B] text-white rounded-full text-xs sm:text-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print / Save PDF</span>
            </button>
            <button
              onClick={onClose}
              aria-label="Close CV modal"
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content View */}
        <div className="p-6 sm:p-10 overflow-y-auto space-y-8 flex-1 text-slate-800 dark:text-slate-200">
          {/* Top Profile Header */}
          <div className="border-b border-slate-200 dark:border-white/10 pb-6">
            <h1 className="text-3xl font-display font-extrabold text-[#27459e] dark:text-[#A8E86C]">
              {HERO_DATA.fullName}
            </h1>
            <p className="text-base font-semibold text-slate-600 dark:text-slate-300 mt-1">
              Creative Director &amp; Freelance Designer (
              {HERO_DATA.yearsExperience} Experience)
            </p>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              {HERO_DATA.email} • {HERO_DATA.location} • Available for remote
              and hybrid contracts
            </p>
          </div>

          {/* Summary */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#27459e] dark:text-[#A8E86C] mb-2 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>Professional Summary</span>
            </h3>
            <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
              {HERO_DATA.bio}
            </p>
          </div>

          {/* Education & Certifications */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#27459e] dark:text-[#A8E86C] mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              <span>Education &amp; Certifications</span>
            </h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {CERTIFICATES_LIST.map((cert) => (
                <div
                  key={cert.id}
                  className="bg-slate-50 dark:bg-slate-800/60 p-3.5 rounded-xl border border-slate-100 dark:border-white/5"
                >
                  <div className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-[#27459e] dark:text-[#A8E86C] shrink-0" />
                    <span>{cert.title}</span>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {cert.issuer} ({cert.year})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================= SERVICE DETAIL MODAL =======================
interface ServiceDetailModalProps {
  service: ServiceItem | null;
  onClose: () => void;
  onInquire: (serviceName: string) => void;
}

export const ServiceDetailModal: React.FC<ServiceDetailModalProps> = ({
  service,
  onClose,
  onInquire,
}) => {
  if (!service) return null;

  return (
    <div
      id="service-detail-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="service-detail-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden border border-black/10 dark:border-white/10 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 bg-[#4F369B] text-white flex items-start justify-between relative overflow-hidden">
          <div className="relative z-10">
            <div className="text-xs font-bold text-[#A8E86C] uppercase tracking-wider mb-2">
              Service Breakdown
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
              {service.title}
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close service modal"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer relative z-10"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 space-y-6">
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
            {service.description}
          </p>

          <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100 dark:border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#27459e]/10 text-[#27459e] dark:text-[#A8E86C] flex items-center justify-center">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Starting at
                </div>
                <div className="text-lg font-display font-extrabold text-slate-900 dark:text-white">
                  {service.pricingStarting}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#A8E86C]/20 text-emerald-600 dark:text-[#A8E86C] flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-semibold">
                  Turnaround
                </div>
                <div className="text-lg font-display font-extrabold text-slate-900 dark:text-white">
                  {service.turnaround}
                </div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              What's Included:
            </h4>
            <div className="space-y-2.5">
              {service.deliverables.map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300 font-medium"
                >
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => {
              onInquire(service.title);
              onClose();
            }}
            className="w-full py-4 bg-[#A8E86C] hover:bg-[#A8E86C]/90 text-black font-bold rounded-2xl flex items-center justify-center gap-2 transition-all cursor-pointer text-sm sm:text-base hover:scale-[1.01]"
          >
            <span>Inquire About {service.title}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

// ======================= VIEW ALL SERVICES MODAL =======================
interface AllServicesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectService: (service: ServiceItem) => void;
}

export const AllServicesModal: React.FC<AllServicesModalProps> = ({
  isOpen,
  onClose,
  onSelectService,
}) => {
  if (!isOpen) return null;

  return (
    <div
      id="all-services-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="all-services-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-4xl max-h-[90vh] rounded-3xl sm:rounded-4xl shadow-2xl overflow-hidden flex flex-col border border-black/10 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 sm:p-8 bg-[#4F369B] text-white flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-[#A8E86C] uppercase tracking-wider mb-1">
              Creative Capabilities
            </div>
            <h2 className="text-2xl sm:text-3xl font-display font-extrabold">
              All Services &amp; Packages
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close all services modal"
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          <div className="grid md:grid-cols-3 gap-6">
            {SERVICES_LIST.map((srv) => (
              <div
                key={srv.id}
                className="bg-slate-50 dark:bg-slate-800/80 rounded-2xl p-6 border border-slate-200 dark:border-white/5 flex flex-col justify-between hover:border-[#27459e] transition-all"
              >
                <div>
                  <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white mb-2">
                    {srv.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4">
                    {srv.description}
                  </p>
                  <div className="space-y-1.5 mb-4">
                    {srv.deliverables.map((del, i) => (
                      <div
                        key={i}
                        className="text-xs text-slate-700 dark:text-slate-400 flex items-center gap-1.5"
                      >
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#27459e] dark:text-[#A8E86C] shrink-0" />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 dark:border-white/10">
                  <div className="text-xs font-bold text-[#27459e] dark:text-[#A8E86C] mb-3">
                    From {srv.pricingStarting} • {srv.turnaround}
                  </div>
                  <button
                    onClick={() => {
                      onSelectService(srv);
                      onClose();
                    }}
                    className="w-full py-2.5 bg-[#4F369B] hover:bg-[#27459e] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
                  >
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// ======================= LEGAL MODAL =======================
interface LegalModalProps {
  isOpen: boolean;
  type: "privacy" | "terms" | null;
  onClose: () => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  type,
  onClose,
}) => {
  if (!isOpen || !type) return null;

  const isPrivacy = type === "privacy";

  return (
    <div
      id="legal-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="legal-modal-content"
        className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] rounded-3xl shadow-2xl overflow-hidden flex flex-col border border-black/10 dark:border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6 border-b border-slate-100 dark:border-white/10 flex items-center justify-between">
          <h3 className="text-xl font-display font-bold text-slate-900 dark:text-white">
            {isPrivacy ? "Privacy Policy" : "Terms of Service"}
          </h3>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto space-y-4 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed flex-1">
          {isPrivacy ? (
            <>
              <p>
                <strong>Information Collection:</strong> We respect your
                privacy. Any personal contact details (name, email, project
                inquiries) submitted through this website are used strictly for
                client communication and proposal development.
              </p>
              <p>
                <strong>Data Protection:</strong> Your information is never
                sold, shared, or distributed to third parties. All inquiries are
                treated with strict confidentiality.
              </p>
              <p>
                <strong>Cookies &amp; Analytics:</strong> We use lightweight
                local preferences to store your dark mode selection. No tracking
                cookies are used.
              </p>
            </>
          ) : (
            <>
              <p>
                <strong>Intellectual Property:</strong> All project visual
                assets, graphic designs, video compositions, and brand marks
                displayed in this portfolio are protected by copyright and
                intellectual property rights belonging to Kikan Pratiwi R. and
                respective client brands.
              </p>
              <p>
                <strong>Contractual Engagements:</strong> Formal freelance
                contracts, deliverables, timelines, and milestones are executed
                under mutually signed agreements prior to project kickoff.
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
