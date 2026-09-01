import React, { useState, useEffect, useRef } from "react";
import { HERO_DATA } from "../data/portfolioData";
import { Download } from "lucide-react";

interface AboutSectionProps {
  onDownloadCV: () => void;
}

interface AnimatedCounterProps {
  target: number;
  suffix?: string;
  duration?: number;
  start: boolean;
}

/* =========================================
  ANIMATED COUNTER
========================================= */

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  target,
  suffix = "+",
  duration = 2000,
  start,
}) => {
  const [count, setCount] = useState<number>(1);

  useEffect(() => {
    // Belum masuk viewport
    if (!start) {
      setCount(1);
      return;
    }

    let startTime: number | null = null;
    let animationFrameId: number;

    // Smooth exponential ease-out
    const easeOutExpo = (x: number): number => {
      return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
    };

    const animate = (currentTime: number) => {
      if (startTime === null) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeOutExpo(progress);

      /*
        Mulai dari 1
        dan berhenti di target
      */
      const current = Math.floor(1 + (target - 1) * easedProgress);

      setCount(current);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setCount(target);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [start, target, duration]);

  return (
    <span>
      {count}
      {suffix}
    </span>
  );
};

/* =========================================
   HELPER
   Converts "600+" -> 600
========================================= */

const getNumericValue = (value: string | number): number => {
  const numericValue = Number(String(value).replace(/[^\d]/g, ""));

  return Number.isNaN(numericValue) ? 0 : numericValue;
};

/* =========================================
   ABOUT SECTION
========================================= */

export const AboutSection: React.FC<AboutSectionProps> = ({ onDownloadCV }) => {
  const [hasAnimated, setHasAnimated] = useState<boolean>(false);

  const sectionRef = useRef<HTMLElement>(null);

  /* =========================================
     INTERSECTION OBSERVER
  ========================================= */

  useEffect(() => {
    const sectionElement = sectionRef.current;

    if (!sectionElement) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting) {
          setHasAnimated(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      },
    );

    observer.observe(sectionElement);

    return () => {
      observer.disconnect();
    };
  }, []);

  /* =========================================
     TARGET VALUES
  ========================================= */

  const projectsTarget = getNumericValue(HERO_DATA.projectsCompleted);

  const certificatesTarget = getNumericValue(HERO_DATA.certificatesCount);

  const industriesTarget = getNumericValue(HERO_DATA.industriesCovered);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 md:py-32 bg-[#1b3275] text-white relative overflow-hidden transition-colors duration-300 border-t border-white/10"
    >
      {/* Ambient background glows matching Portfolio Showcase */}
      <div
        className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#27459e]/60 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -right-24 w-96 h-96 bg-[#A8E86C]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#27459e]/30 blur-[130px] rounded-full pointer-events-none"
        aria-hidden="true"
      />

      {/* =========================================
          HUGE OUTLINE WATERMARK
      ========================================= */}

      <div
        className="absolute top-6 right-0 font-display text-[14vw] font-black leading-none text-white/[0.04] dark:text-white/[0.04] pointer-events-none select-none tracking-tight overflow-hidden"
        aria-hidden="true"
      >
        ABOUT ME
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* =========================================
              LEFT COLUMN
          ========================================= */}

          <div className="lg:col-span-5 relative">
            <div
              id="about-experience-card"
              className="rounded-[2.5rem] sm:rounded-[3rem] aspect-square max-w-[440px] mx-auto relative overflow-hidden shadow-2xl group border border-white/10"
            >
              {/* Background Picture */}
              <img
                src={HERO_DATA.aboutImageUrl}
                alt={`${HERO_DATA.fullName} Portrait`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />

              {/* Gradient Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/80 via-[#4F369B]/40 to-transparent"
                aria-hidden="true"
              />

              {/* Ambient Glow */}
              <div
                className="absolute -top-12 -right-12 w-48 h-48 bg-[#27459e]/40 rounded-full blur-2xl pointer-events-none"
                aria-hidden="true"
              />

              {/* Vertical Side Text */}
              <div
                className="absolute top-0 left-0 p-6 sm:p-8 h-full flex flex-col justify-center font-display text-white/40 select-none pointer-events-none text-xs sm:text-sm tracking-[0.6em] uppercase font-bold"
                aria-hidden="true"
              >
                <span className="[writing-mode:vertical-lr] rotate-180 drop-shadow-md">
                  Kikan
                </span>
              </div>
            </div>
          </div>

          {/* =========================================
              RIGHT COLUMN
          ========================================= */}

          <div className="lg:col-span-7">
            {/* Section Tag */}
            <div
              id="about-section-tag"
              className="inline-block py-1.5 px-4 bg-white/10 text-[#A8E86C] rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6 border border-white/10 backdrop-blur-sm"
            >
              — Tentang Saya
            </div>

            {/* Heading */}
            <h2
              id="about-heading"
              className="font-display text-3xl sm:text-4xl md:text-5xl font-extrabold :text-white leading-tight mb-8"
            >
              Hi, Saya{" "}
              <span className="text-[#A8E86C]">
                {HERO_DATA.fullName}
              </span>
            </h2>

            {/* Bio */}
            <p
              id="about-bio-text"
              className="text-base sm:text-lg text-slate-600 dark:text-slate-300 mb-10 leading-relaxed font-normal"
            >
              {HERO_DATA.bio}
            </p>

            {/* =========================================
                METRICS COUNTERS
            ========================================= */}

            <div
              id="about-stats-grid"
              className="grid grid-cols-3 gap-4 sm:gap-8 mb-12 border-y :border-white/10 py-6"
            >
              {/* PROJECTS */}
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold :text-[#A8E86C] mb-1">
                  <AnimatedCounter
                    target={projectsTarget}
                    suffix="+"
                    duration={2200}
                    start={hasAnimated}
                  />
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Project Completed
                </div>
              </div>

              {/* CERTIFICATES */}
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#27459e] dark:text-[#A8E86C] mb-1">
                  <AnimatedCounter
                    target={certificatesTarget}
                    suffix="+"
                    duration={1800}
                    start={hasAnimated}
                  />
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-500 dark:text-slate-400">
                  Certificates
                </div>
              </div>

              {/* EXPERIENCE */}
              <div>
                <div className="text-2xl sm:text-3xl md:text-4xl font-display font-extrabold text-[#27459e] dark:text-[#A8E86C] mb-1">
                  <AnimatedCounter
                    target={industriesTarget}
                    suffix="+"
                    duration={2000}
                    start={hasAnimated}
                  />
                </div>

                <div className="text-xs sm:text-sm font-semibold text-slate-300">
                  Pengalaman
                </div>
              </div>
            </div>

            {/* =========================================
                ACTION ROW
            ========================================= */}

            <div className="flex flex-wrap items-center gap-6 sm:gap-8">
              <a
                id="btn-download-cv"
                href="https://drive.google.com/drive/folders/1iCr6uWxZbHB-z1pI0aK9WhY23Y_r8L3M?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#A8E86C] hover:bg-[#A8E86C]/90 text-black px-6 sm:px-8 py-3.5 rounded-full font-bold text-sm sm:text-base flex items-center gap-2.5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg shadow-sm cursor-pointer"
              >
                <Download className="w-5 h-5" />
                <span>View CV</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
