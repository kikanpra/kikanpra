import React from "react";
import {
  Illustrator,
  Figma,
  Canva,
  Bootstrap,
  Html5,
  Css3,
} from "@thesvg/react";

interface TechItem {
  id: string;
  name: string;
  brandColor: string;
  accentBg: string;
  iconSvg: React.ReactNode;
}

const techItems: TechItem[] = [
  {
    id: "illustrator",
    name: "Illustrator",
    brandColor: "#FF9A00",
    accentBg: "rgba(255, 154, 0, 0.12)",
    iconSvg: (
      <Illustrator
        className="h-10 w-10 sm:h-12 sm:w-12"
        aria-label="Adobe Illustrator"
      />
    ),
  },

  {
    id: "figma",
    name: "Figma",
    brandColor: "#A259FF",
    accentBg: "rgba(162, 89, 255, 0.12)",
    iconSvg: <Figma className="h-10 w-10 sm:h-12 sm:w-12" aria-label="Figma" />,
  },

  {
    id: "canva",
    name: "Canva",
    brandColor: "#00C4CC",
    accentBg: "rgba(0, 196, 204, 0.12)",
    iconSvg: <Canva className="h-10 w-10 sm:h-12 sm:w-12" aria-label="Canva" />,
  },

  {
    id: "bootstrap",
    name: "Bootstrap",
    brandColor: "#7952B3",
    accentBg: "rgba(121, 82, 179, 0.14)",
    iconSvg: (
      <Bootstrap className="h-10 w-10 sm:h-12 sm:w-12" aria-label="Bootstrap" />
    ),
  },

  {
    id: "html",
    name: "HTML",
    brandColor: "#E34F26",
    accentBg: "rgba(227, 79, 38, 0.12)",
    iconSvg: <Html5 className="h-10 w-10 sm:h-12 sm:w-12" aria-label="HTML5" />,
  },

  {
    id: "css",
    name: "CSS",
    brandColor: "#1572B6",
    accentBg: "rgba(21, 114, 182, 0.12)",
    iconSvg: <Css3 className="h-10 w-10 sm:h-12 sm:w-12" aria-label="CSS3" />,
  },
];

export const TechStackSection: React.FC = () => {
  return (
    <section
      id="tech-stack"
      className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20 text-slate-100 sm:py-28"
    >
      {/* Huge Outline Watermark Background Text like About Section */}
      <div
        className="absolute top-6 right-0 font-display text-[16vw] font-black leading-none text-white/[0.04] pointer-events-none select-none tracking-tight overflow-hidden"
        aria-hidden="true"
      >
        TOOLS
      </div>

      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#27459e]/15 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute right-1/4 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-[#A8E86C]/10 blur-[130px]"
        aria-hidden="true"
      />

      {/* Main container */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Header */}
        <div className="mx-auto mb-12 max-w-3xl text-center sm:mb-16">
          <div
            id="tech-stack-tag"
            className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#A8E86C] backdrop-blur-sm sm:text-sm"
          >
            — Teknologi
          </div>

          <h2
            id="tech-stack-heading"
            className="mb-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Software <span className="text-[#A8E86C]">Skills</span>
          </h2>
        </div>

        {/* Tech Grid */}
        <div
          id="tech-stack-grid"
          className="
            mx-auto
            grid
            max-w-6xl
            grid-cols-2
            justify-items-center
            gap-4
            sm:grid-cols-3
            sm:gap-6
            lg:grid-cols-6
          "
        >
          {techItems.map((tech) => (
            <div
              key={tech.id}
              id={`tech-item-${tech.id}`}
              className="
                group
                relative
                flex
                w-full
                max-w-[180px]
                cursor-default
                flex-col
                items-center
                justify-center
                gap-4
                rounded-2xl
                border
                border-white/10
                bg-[#141414]
                p-6
                text-center
                transition-all
                duration-300
                hover:-translate-y-1.5
                hover:border-white/20
                hover:bg-[#1A1A1A]
                hover:shadow-xl
                sm:rounded-3xl
                sm:p-7
              "
            >
              {/* Hover backlight */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  -z-10
                  rounded-2xl
                  opacity-0
                  blur-md
                  transition-opacity
                  duration-300
                  group-hover:opacity-100
                  sm:rounded-3xl
                "
                style={{
                  background: tech.accentBg,
                }}
                aria-hidden="true"
              />

              {/* Logo container */}
              <div
                className="
                  flex
                  h-16
                  w-16
                  items-center
                  justify-center
                  rounded-2xl
                  border
                  border-white/5
                  transition-transform
                  duration-300
                  group-hover:scale-110
                  sm:h-20
                  sm:w-20
                "
                style={{
                  backgroundColor: tech.accentBg,
                }}
              >
                {tech.iconSvg}
              </div>

              {/* Name */}
              <h3
                className="
                  font-display
                  text-base
                  font-bold
                  leading-tight
                  text-white
                  transition-colors
                  duration-300
                  group-hover:text-[#A8E86C]
                  sm:text-lg
                "
              >
                {tech.name}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



export default TechStackSection;
