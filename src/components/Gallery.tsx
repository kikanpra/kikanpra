import React from "react";
import { motion, useReducedMotion } from "motion/react";
import { ScrollRevealHeading } from "./ScrollReveal";

const GALLERY_ITEMS = [
  {
    image: "/images/hmti1.jpg",
    title: "Himpunan Mahasiswa Teknik Informatika",
  },
  { image: "/images/genbi.webp", 
    title: "PudSos GenBI UHO 2025" },
  {
    image: "/images/48sultra.jpg",
    title: "48Sultra First Snow",
  },
  {
    image: "/images/rpl.jpg",
    title: "RPL 23",
  },
  {
    image: "/images/genbi lf.JPG",
    title: "Leadership Forum GenBI   Sultra 2026",}
];

export const GallerySection: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const renderGallerySet = (setId: string, isDuplicate = false) => (
    <div
      key={setId}
      aria-hidden={isDuplicate || undefined}
      className="flex shrink-0 gap-6 pr-6"
    >
      {GALLERY_ITEMS.map((item, index) => (
        <motion.div
          key={`${setId}-${item.image}`}
          initial={shouldReduceMotion || isDuplicate ? false : { opacity: 0, y: 12 }}
          whileInView={shouldReduceMotion || isDuplicate ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.45,
            delay: shouldReduceMotion ? 0 : index * 0.1,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="group relative aspect-square w-[min(82vw,360px)] shrink-0 overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-[#27459e]/40 to-[#A8E86C]/20 shadow-xl transition-all duration-300 hover:border-white/20 sm:w-[min(42vw,360px)] lg:w-[360px]"
        >
          <img
            src={item.image}
            alt={item.title}
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Hover overlay */}
          <div className="absolute inset-0 flex items-end justify-start bg-gradient-to-t from-black/60 via-transparent to-transparent p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:p-6">
            <h3 className="text-sm font-bold text-white sm:text-lg">
              {item.title}
            </h3>
          </div>
        </motion.div>
      ))}
    </div>
  );

  return (
    <section
      id="gallery"
      className="relative overflow-hidden border-t border-white/5 bg-[#0B0B0B] py-20 text-slate-100 sm:py-28"
    >
      {/* Huge Outline Watermark Background Text */}
      <div
        className="absolute top-6 right-0 font-display text-[16vw] font-black leading-none text-white/[0.04] pointer-events-none select-none tracking-tight overflow-hidden"
        aria-hidden="true"
      >
        GALLERY
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
            id="gallery-tag"
            className="mb-6 inline-block rounded-full border border-white/10 bg-white/10 px-4 py-1.5 text-xs font-bold tracking-wide text-[#A8E86C] backdrop-blur-sm sm:text-sm"
          >
            — Gallery
          </div>

          <ScrollRevealHeading>
            <h2
              id="gallery-heading"
              className="mb-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
            >
              Dokumentasi <span className="text-[#A8E86C]">Kegiatan</span>
            </h2>
          </ScrollRevealHeading>
        </div>

        {/* Horizontal gallery ticker */}
        <div
          className="relative mx-auto max-w-6xl overflow-hidden"
          role="region"
          aria-label="Galeri dokumentasi kegiatan yang bergulir horizontal"
          style={{
            maskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 4%, black 96%, transparent)",
          }}
        >
          {shouldReduceMotion ? (
            <div className="overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {renderGallerySet("gallery-set-primary")}
            </div>
          ) : (
            <motion.div
              className="flex w-max"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
            >
              {renderGallerySet("gallery-set-primary")}
              {renderGallerySet("gallery-set-loop", true)}
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
