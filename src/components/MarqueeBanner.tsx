import React from 'react';
import { MARQUEE_ITEMS } from '../data/portfolioData';

export const MarqueeBanner: React.FC = () => {
  const itemsText = MARQUEE_ITEMS.join(' ✦ ');

  return (
    <section
      id="skills-marquee-section"
      className="bg-[#A8E86C] py-5 sm:py-6 overflow-hidden border-y border-black/5 select-none"
      aria-label="Skill Highlights"
    >
      <div className="flex overflow-hidden w-full whitespace-nowrap">
        <div className="animate-marquee font-display text-2xl sm:text-3xl md:text-4xl font-extrabold uppercase text-[#4F369B] tracking-wide flex items-center">
          <span className="mx-4">{itemsText} ✦</span>
          <span className="mx-4">{itemsText} ✦</span>
          <span className="mx-4">{itemsText} ✦</span>
          <span className="mx-4">{itemsText} ✦</span>
        </div>
      </div>
    </section>
  );
};
