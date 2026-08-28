import React, { useState, useEffect } from "react";
import { Menu, X, ArrowUpRight } from "lucide-react";

interface NavbarProps {
  onOpenPortfolio: () => void;
  onContactClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenPortfolio,
  onContactClick,
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navLinks = [
    { name: "Tentang Saya", href: "#about" },
    { name: "Portfolio", href: "#experience" },
  ];

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0F0F0F]/90 backdrop-blur-md shadow-lg border-b border-white/5"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo Image*/}

        <a
          href="#"
          id="nav-brand-logo"
          className="flex items-center group cursor-pointer"
        >
          <img
            src="/assets/public/images/logo.png"
            alt="KIKAN Logo"
            className="w-12 h-12 object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </a>

        {/* Right Section */}
        <div className="flex items-center gap-6 sm:gap-8">
          {/* Desktop Navigation Links */}
          <nav
            id="desktop-nav-links"
            className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-widest text-slate-200"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                href={link.href}
                className="hover:text-[#A8E86C] transition-colors py-2"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Contact Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={onContactClick}
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-[#27459e] hover:bg-[#4F369B] text-white text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-105 shadow-md shadow-[#27459e]/20 cursor-pointer"
            >
              <span>Kontak</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A8E86C]" />
            </button>

            {/* Mobile Menu Button */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-xl bg-slate-800 text-white cursor-pointer hover:bg-slate-700 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden bg-[#0F0F0F] border-b border-white/10 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-200"
        >
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="block text-base font-bold uppercase tracking-wider text-slate-200 hover:text-[#A8E86C] py-2"
            >
              {link.name}
            </a>
          ))}

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full py-3 rounded-xl bg-[#27459e] text-white text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Contact Me</span>
              <ArrowUpRight className="w-4 h-4 text-[#A8E86C]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
