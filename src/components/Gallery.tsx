import React from "react";

export const GallerySection: React.FC = () => {
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

          <h2
            id="gallery-heading"
            className="mb-4 font-display text-4xl font-extrabold leading-tight tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            Dokumentasi <span className="text-[#A8E86C]">Kegiatan</span>
          </h2>
        </div>

        {/* Gallery Grid */}
        <div className="mx-auto max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Gallery Items - Placeholder */}
          {[1, 2, 3, ].map((item) => (
            <div
              key={item}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-[#27459e]/40 to-[#A8E86C]/20 border border-white/10 hover:border-white/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 cursor-pointer"
            >
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                <div className="text-4xl font-bold text-white/20 mb-2">
                    {item}
                  </div>
                  <p className="text-sm text-slate-400">Gallery Item</p>
                </div>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-6">
                <div>
                  <h3 className="text-white font-bold text-lg">
                    Proyek {item}
                  </h3>
                  <p className="text-slate-300 text-sm">Desain Kreatif</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
