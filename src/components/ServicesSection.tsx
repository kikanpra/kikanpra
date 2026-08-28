import React from 'react';
import { ArrowUpRight, Paintbrush, Clapperboard, Globe } from 'lucide-react';
import { SERVICES_LIST } from '../data/portfolioData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectService: (service: ServiceItem) => void;
  onViewAllServices: () => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectService,
  onViewAllServices,
}) => {
  const renderIcon = (iconName: string, isFeatured: boolean) => {
    const iconClass = isFeatured ? 'w-8 h-8 text-[#5E3BEE]' : 'w-8 h-8 text-[#A8E86C]';
    switch (iconName) {
      case 'brush':
        return <Paintbrush className={iconClass} />;
      case 'movie_edit':
        return <Clapperboard className={iconClass} />;
      case 'language':
      default:
        return <Globe className={iconClass} />;
    }
  };

  return (
    <section
      id="services"
      className="py-24 md:py-32 bg-[#4F369B] text-white relative overflow-hidden"
    >
      {/* Background Ambience Glow Orbs */}
      <div
        className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#5E3BEE]/40 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -top-24 -left-24 w-96 h-96 bg-[#A8E86C]/15 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Header Row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div>
            <div
              id="services-tag"
              className="inline-block py-1.5 px-4 bg-white/10 text-[#A8E86C] rounded-full text-xs sm:text-sm font-bold tracking-wide mb-6"
            >
              — Services
            </div>
            <h2
              id="services-heading"
              className="font-display text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight"
            >
              My <span className="text-[#A8E86C]">Services</span>
            </h2>
          </div>

          <button
            id="btn-view-all-services"
            onClick={onViewAllServices}
            className="bg-[#A8E86C] hover:bg-[#A8E86C]/90 text-black px-6 py-4 rounded-full font-bold flex items-center gap-3 self-start md:self-auto hover:scale-105 transition-all duration-300 shadow-lg cursor-pointer"
          >
            <span className="bg-black text-white rounded-full p-1.5 flex items-center justify-center">
              <ArrowUpRight className="w-4 h-4" />
            </span>
            <span>View All Services</span>
          </button>
        </div>

        {/* 3 Pill / Arched Service Cards */}
        <div id="services-cards-grid" className="grid md:grid-cols-3 gap-8 items-stretch">
          {SERVICES_LIST.map((service) => {
            const isFeatured = !!service.isFeatured;

            return (
              <div
                key={service.id}
                id={`service-card-${service.id}`}
                className={`rounded-[70px] sm:rounded-[90px] md:rounded-[100px] p-8 sm:p-12 flex flex-col items-center text-center perspective-card relative transition-all duration-300 ${
                  isFeatured
                    ? 'bg-white text-slate-900 shadow-2xl hover:shadow-3xl ring-4 ring-white/10'
                    : 'bg-white/5 border border-white/10 text-white backdrop-blur-md hover:bg-white/10 hover:border-white/20'
                }`}
              >
                {/* Icon Container */}
                <div
                  className={`w-20 h-20 rounded-2xl flex items-center justify-center mb-8 transition-transform duration-300 hover:scale-110 ${
                    isFeatured ? 'bg-slate-100' : 'bg-white/10'
                  }`}
                >
                  {renderIcon(service.iconName, isFeatured)}
                </div>

                {/* Title */}
                <h3
                  className={`text-2xl sm:text-3xl font-display font-extrabold mb-4 ${
                    isFeatured ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {service.title}
                </h3>

                {/* Description */}
                <p
                  className={`text-sm sm:text-base mb-8 leading-relaxed font-normal ${
                    isFeatured ? 'text-slate-600' : 'text-white/70'
                  }`}
                >
                  {service.description}
                </p>

                {/* Learn More Link / Trigger */}
                <button
                  id={`btn-learn-more-${service.id}`}
                  onClick={() => onSelectService(service)}
                  className={`mt-auto font-bold text-sm sm:text-base pb-1 cursor-pointer flex items-center gap-1 transition-all ${
                    isFeatured
                      ? 'border-b-2 border-[#5E3BEE] text-[#5E3BEE] hover:text-[#4F369B] hover:translate-x-1'
                      : 'text-white/70 hover:text-white border-b-2 border-transparent hover:border-[#A8E86C] hover:translate-x-1'
                  }`}
                >
                  <span>Learn More</span>
                  <span>→</span>
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
