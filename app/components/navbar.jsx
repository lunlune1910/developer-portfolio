"use client";
// @flow strict
import { useLanguage } from "@/app/context/LanguageContext";
import Link from "next/link";
import { useEffect, useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";

function Navbar() {
  const { lang, toggleLanguage, t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleNavClick = () => setIsOpen(false);

  const navLinks = [
    { href: "/#about", label: t("nav.about") },
    { href: "/#experience", label: t("nav.experience") },
    { href: "/#skills", label: t("nav.skills") },
    { href: "/#education", label: t("nav.education") },
    { href: "/blog", label: t("nav.blogs") },
    { href: "/#projects", label: t("nav.projects") },
  ];

  return (
    <>
      <nav
        className={`sticky top-0 z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-[#0d1224]/70 backdrop-blur-xl shadow-lg shadow-violet-500/5 -mx-4 sm:-mx-6 md:-mx-12 px-4 sm:px-6 md:px-12"
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between py-4">
          <Link href="/" className="text-[#16f2b3] text-3xl font-bold hover:scale-105 transition-transform duration-300">
            MonStudio
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  className="block px-4 py-2 no-underline outline-none hover:no-underline"
                  href={link.href}
                >
                  <div className="text-sm text-white transition-colors duration-300 hover:text-pink-600 relative group">
                    {link.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-gradient-to-r from-pink-500 to-violet-600 transition-all duration-300 group-hover:w-full" />
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={toggleLanguage}
                className="ml-2 px-4 py-2 text-sm font-bold text-[#16f2b3] hover:text-pink-600 transition-all duration-300 cursor-pointer border border-[#16f2b3] rounded-md hover:border-pink-600 hover:scale-105 active:scale-95"
              >
                {lang === "en" ? "🇻🇳 VI" : "🇬🇧 EN"}
              </button>
            </li>
          </ul>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden text-white p-2 hover:text-[#16f2b3] transition-colors relative z-[120]"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <HiX size={28} /> : <HiMenuAlt3 size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Overlay — rendered outside <nav> via portal-like pattern */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[105] md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Slide Menu — rendered outside <nav> to avoid stacking context issues */}
      <div
        className={`fixed top-0 right-0 h-dvh w-72 max-w-[80vw] bg-[#0d1224]/95 backdrop-blur-xl z-[110] md:hidden transform transition-transform duration-300 ease-out border-l border-[#1b2c68a0] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col pt-20 px-6 space-y-2 overflow-y-auto h-full pb-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={handleNavClick}
              className="block py-3 px-4 text-white text-base no-underline hover:text-[#16f2b3] hover:bg-[#1a1443]/50 rounded-lg transition-all duration-300"
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 border-t border-[#1b2c68a0]">
            <button
              onClick={() => { toggleLanguage(); handleNavClick(); }}
              className="w-full px-4 py-3 text-sm font-bold text-[#16f2b3] hover:text-pink-600 transition-all duration-300 cursor-pointer border border-[#16f2b3] rounded-md hover:border-pink-600"
            >
              {lang === "en" ? "🇻🇳 Tiếng Việt" : "🇬🇧 English"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;