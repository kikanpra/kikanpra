import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { HERO_DATA } from '../data/portfolioData';
import { ScrollRevealHeading } from './ScrollReveal';

interface HeroSectionProps {
  onOpenPortfolio: () => void;
  onHireMeClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenPortfolio,
  onHireMeClick,
}) => {
  const shouldReduceMotion = useReducedMotion();
  const greeting = "Hi, I'm ";
  const name = HERO_DATA.name;
  const firstLine = `${greeting}${name}, `;
  const title = 'Freelance Designer';
  const headline = `${firstLine}${title}`;
  const [typedLength, setTypedLength] = useState(0);

  useEffect(() => {
    if (shouldReduceMotion) {
      setTypedLength(headline.length);
      return;
    }

    setTypedLength(0);
    const interval = window.setInterval(() => {
      setTypedLength((length) => {
        if (length >= headline.length) {
          window.clearInterval(interval);
          return length;
        }

        return length + 1;
      });
    }, 50);

    return () => window.clearInterval(interval);
  }, [headline, shouldReduceMotion]);

  const visibleFirstLine = headline.slice(0, Math.min(typedLength, firstLine.length));
  const visibleGreeting = visibleFirstLine.slice(0, greeting.length);
  const visibleName = visibleFirstLine.slice(greeting.length, greeting.length + name.length);
  const visibleComma = visibleFirstLine.slice(greeting.length + name.length);
  const visibleTitle = headline.slice(firstLine.length, typedLength);
  const isTypingFirstLine = typedLength <= firstLine.length;

  const entranceVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.7,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <section
      id="hero-section"
      className="relative pt-28 sm:pt-32 pb-16 md:pb-24 overflow-visible"
    >
      <motion.div
        className="max-w-7xl mx-auto px-6 text-center"
        initial={shouldReduceMotion ? false : 'hidden'}
        animate="visible"
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: shouldReduceMotion ? 0 : 0.16,
              delayChildren: shouldReduceMotion ? 0 : 0.08,
            },
          },
        }}
      >
        {/* Main Headline */}
        <motion.div
          className="relative z-10 mb-4 sm:mb-6"
          variants={entranceVariants}
        >
          <ScrollRevealHeading>
            <motion.h1
              id="hero-headline"
              className="font-display font-extrabold tracking-tight text-white leading-tight"
              aria-label={`${firstLine}${title}`}
              variants={{
                hidden: {},
                visible: {
                  transition: {
                    staggerChildren: shouldReduceMotion ? 0 : 0.14,
                  },
                },
              }}
            >
              <motion.span
                className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl block mb-2 sm:mb-3"
                variants={entranceVariants}
              >
                <span aria-hidden="true">
                  {visibleGreeting}
                  <span className="relative inline-block text-[#27459e]">
                    <span className="relative z-10 text-white">{visibleName}</span>
                    <span className="absolute bottom-2 left-0 w-full h-3 md:h-4 bg-[#A8E86C] -z-0 rounded-full"></span>
                  </span>
                  {visibleComma}
                  {isTypingFirstLine && !shouldReduceMotion && (
                    <span className="animate-pulse" aria-hidden="true">|</span>
                  )}
                </span>
              </motion.span>

              {/* Combined & Scaled Down 'Freelance Designer' Headline */}
              <motion.span
                className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-slate-300 font-bold tracking-tight block"
                variants={entranceVariants}
              >
                <span aria-hidden="true">
                  {visibleTitle}
                  {!isTypingFirstLine && !shouldReduceMotion && (
                    <span className="animate-pulse" aria-hidden="true">|</span>
                  )}
                </span>
              </motion.span>
            </motion.h1>
          </ScrollRevealHeading>
        </motion.div>

        {/* Portrait with Transparent Background, Black & White Filter, Overlapping the Headline */}
        <motion.div
          id="hero-portrait-container"
          className="relative inline-block -mt-16 sm:-mt-20 md:-mt-24 -mb-20 sm:-mb-24 md:-mb-28 group z-10"
          variants={entranceVariants}
        >
          <motion.div
            animate={shouldReduceMotion ? undefined : { y: [0, -8, 0] }}
            transition={
              shouldReduceMotion
                ? undefined
                : { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }
          >
            {/* Ambient Glow behind subject */}
            <motion.div
              className="absolute -inset-4 sm:-inset-8 bg-[#4F369B]/35 rounded-[50%] blur-3xl -z-10 group-hover:bg-[#27459e]/45 transition-all duration-500 pointer-events-none"
              aria-hidden="true"
              animate={
                shouldReduceMotion
                  ? undefined
                  : { y: [0, -5, 0], opacity: [1, 0.8, 1] }
              }
              transition={
                shouldReduceMotion
                  ? undefined
                  : { duration: 6, repeat: Infinity, ease: 'easeInOut' }
              }
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
          </motion.div>
        </motion.div>

        {/* Hero CTA Buttons */}
        <motion.div
          id="hero-actions-container"
          className="mt-8 sm:mt-10 flex flex-wrap justify-center items-center gap-4 relative z-20"
          variants={entranceVariants}
        >
          <motion.button
            id="btn-hero-hire-me"
            onClick={onHireMeClick}
            className="px-8 py-4 border-2 border-white/30 text-white rounded-full font-bold hover:bg-white hover:text-black transition-all duration-300 cursor-pointer backdrop-blur-sm"
            whileHover={shouldReduceMotion ? undefined : { scale: 1.03 }}
            whileTap={shouldReduceMotion ? undefined : { scale: 0.97 }}
            transition={{ duration: 0.22 }}
          >
            Hubungi Saya
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};
