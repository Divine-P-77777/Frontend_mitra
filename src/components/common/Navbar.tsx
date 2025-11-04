import React, { useState, useEffect } from "react";
import type { ChangeEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, Info } from "lucide-react";
import introJs from "intro.js";
import "intro.js/introjs.css";
import { Link } from "react-router-dom";

type LanguageOption = "en" | "hi" | "as";

interface TranslationKeys {
  home: string;
  insight: string;
  compare: string;
  about: string;
  contact: string;
  install: string;
  guide: string;
  [key: string]: string;
}

interface NavLink {
  key: keyof TranslationKeys;
  path: string;
}

const Navbar: React.FC = () => {
  const { language, changeLanguage, t } = useLanguage() as {
    language: LanguageOption;
    changeLanguage: (lang: LanguageOption) => void;
    t: TranslationKeys;
  };

  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
    changeLanguage(e.target.value as LanguageOption);

  const startGuide = () => {
    if (typeof document === "undefined") return;

    introJs()
      .setOptions({
        steps: [
          { intro: "Welcome! Let’s explore this page together." },
          { element: document.querySelector("nav"), intro: "This is Mitra’s main navigation bar." },
          { element: document.querySelector("main"), intro: "Here you’ll find visual insights and comparisons." },
        ],
        showProgress: true,
        showBullets: false,
        nextLabel: "Next →",
        prevLabel: "← Back",
        doneLabel: "Got it!",
        overlayOpacity: 0.6,
      })
      .start();
  };

  const navLinks: NavLink[] = [
    { key: "home", path: "/" },
    { key: "insight", path: "/insights" },
    { key: "compare", path: "/compare" },
    { key: "about", path: "/about" },
    { key: "contact", path: "/contact" },
    { key: "install", path: "/install" },
  ];

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-gradient-to-r from-[#FF9933]/80 via-[#FFF9E6]/80 to-[#138808]/80 shadow-lg border-b border-[#FF9933]/50"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo + Title */}
        <Link to="/">
        <div className="flex items-center gap-2">
          <img
            src="./logo.png"
            alt="Mitra Logo"
            className="w-8 h-8 object-contain rounded-full shadow-md"
          />
          <div className="text-xl sm:text-2xl font-semibold tracking-wide text-[#1a1a1a]">
            Mitra
          </div>
        </div>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex gap-8 text-[#1a1a1a] font-medium">
          {navLinks.map(({ key, path }) => (
            <motion.div key={key} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link to={path} className="relative group transition duration-300">
                <span>{t[key]}</span>
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-[#138808] transition-all duration-300 group-hover:w-full" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <select
            value={language}
            onChange={handleLanguageChange}
            className="bg-white/50 text-black px-3 py-1 rounded-md text-sm border border-gray-300 focus:outline-none"
          >
            <option value="en">🇬🇧 English</option>
            <option value="hi">🇮🇳 हिंदी</option>
            <option value="as">🪷 অসমীয়া</option>
          </select>

          <button
            type="button"
            onClick={startGuide}
            aria-label="Page Guide"
            className="p-2 rounded-full bg-white/50 hover:bg-white border border-gray-300 hover:scale-110 transition-transform duration-300"
          >
            <Info className="w-5 h-5 text-[#138808]" />
          </button>

          <button
            type="button"
            onClick={() => setIsOpen((prev) => !prev)}
            className="md:hidden p-2 text-[#1a1a1a] hover:scale-110 transition-transform duration-300"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden bg-white/90 text-[#1a1a1a] flex flex-col gap-2 px-6 py-4 border-t border-gray-300"
          >
            {navLinks.map(({ key, path }) => (
              <Link
                key={key}
                to={path}
                className="py-2 border-b border-gray-200 hover:scale-105 transition duration-300"
                onClick={() => setIsOpen(false)}
              >
                {t[key]}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
