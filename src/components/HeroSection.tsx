import React from 'react';
import { HERO_DATA } from '../data/portfolioData';

interface HeroSectionProps {
  onOpenPortfolio: () => void;
  onHireMeClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPortfolio,
  onHireMeClick,
}) => {
  return (
    <section
      id="hero-section"
      className="relative pt-28 sm:pt-32 pb-16 md:pb-24 overflow-visible"
    >
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Main Headline */}
        <div className="relative z-10 mb-4 sm:mb-6">
          <h1
            id="hero-headline"
            className="font-display font-extrabold tracking-tight text-white leading-tight"
          >
            <span className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl block mb-2 sm:mb-3">
              Hi, I'm{" "}
              <span className="relative inline-block text-[#27459e]">
                <span className="relative z-10 text-white">
                  {HERO_DATA.name}
                </span>
                <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-[#A8E86C] -z-0 rounded-full"></span>
              </span>
              ,
            </span>

            {/* Combined & Scaled Down 'Freelance Designer' Headline */}
            <span className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-300 font-bold tracking-tight block">
              Freelance Designer
            </span>
          </h1>
        </div>

        {/* Portrait with Transparent Background, Black & White Filter, Overlapping the Headline */}
        <div
          id="hero-portrait-container"
          className="relative inline-block -mt-16 sm:-mt-20 md:-mt-24 -mb-20 sm:-mb-24 md:-mb-28 group z-10"
        >
          {/* Ambient Glow behind subject */}
          <div
            className="absolute -inset-4 sm:-inset-8 bg-[#4F369B]/35 rounded-[50%] blur-3xl -z-10 group-hover:bg-[#27459e]/45 transition-all duration-500 pointer-events-none"
            aria-hidden="true"
          />

          {/* Cutout Portrait with Grayscale Filter & Transparent Blend */}
          <div className="w-72 h-[360px] sm:w-80 sm:h-[400px] md:w-96 md:h-[470px]">
            <img
              id="hero-portrait-image"
              alt="Kikan Pratiwi R. Freelance Designer portrait"
              className="w-full h-full object-contain object-bottom scale-140 grayscale contrast-125 brightness-105 drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              style={{
                maskImage:
                  "linear-gradient(to bottom, black 75%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 75%, transparent 100%)",
              }}
              src={HERO_DATA.portraitUrl}
              referrerPolicy="no-referrer"
              loading="eager"
            />
          </div>
        </div>

        {/* Hero CTA Buttons */}
        <div
          id="hero-actions-container"
          className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-4 relative z-20"
        >
          <button
            id="btn-hero-hire-me"
            onClick={onHireMeClick}
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer backdrop-blur-sm"
          >
            Hubungi Saya
          </button>
        </div>
      </div>
    </section>
  );
};
