import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import clsx from "clsx";
import {
  Home,
  BarChart3,
  Scale,
  Download,
  Github,
  Twitter,
  Linkedin,
} from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import type { LanguageOption as Lang } from "@/context/LanguageContext";
import { useEffect, useState } from "react";
import { languageFooter } from "@/lib/constants/language";

export default function Footer() {
  const location = useLocation();
  const { language, changeLanguage } = useLanguage();
  const lang = language as Lang;
  const t = languageFooter[lang];

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const navItems = [
    { label: t.home, icon: <Home size={22} />, href: "/" },
    { label: t.insights, icon: <BarChart3 size={22} />, href: "/insights" },
    { label: t.compare, icon: <Scale size={22} />, href: "/compare" },
    { label: t.install, icon: <Download size={22} />, href: "/install" },
  ];

  const isActive = (href: string) => location.pathname === href;

  if (!mounted) return null;

  return (
    <>
      {/* 📱 Mobile Footer */}
      <motion.nav
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-t border-gray-200 flex justify-around items-center py-2 shadow-md md:hidden"
      >
        {navItems.map((item) => {
          const active = isActive(item.href);
          return (
            <Link key={item.href} to={item.href} aria-label={item.label}>
              <motion.div
                whileTap={{ scale: 0.9 }}
                className={clsx(
                  "flex flex-col items-center text-xs font-medium transition-all",
                  active ? "text-[#0077B6]" : "text-[#444444]"
                )}
              >
                <motion.div
                  animate={active ? { scale: [1, 1.2, 1] } : { scale: 1 }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                    type: "tween",
                  }}
                  className={clsx(
                    "p-2 rounded-full",
                    active && "bg-[#00B4D8]/15"
                  )}
                >
                  {item.icon}
                </motion.div>
                <span>{item.label}</span>
                {active && (
                  <motion.div
                    layoutId="active-underline"
                    className="h-1 w-8 rounded-full bg-[#0077B6] mt-1"
                  />
                )}
              </motion.div>
            </Link>
          );
        })}
      </motion.nav>

      {/* 💻 Desktop Footer */}
      <motion.footer
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="hidden md:grid grid-cols-4 gap-6 w-full border-t border-gray-200 bg-[#F9FAFB] px-12 py-10 text-[#1A1A1A]"
      >
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold text-[#0077B6]">Mitra</h2>
          <p className="mt-2 text-sm text-[#444444] leading-relaxed max-w-xs">
            {t.about} — Empowering Bharat through open data access to MGNREGA
            performance insights.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="font-semibold mb-2 text-[#0077B6]">{t.home}</h3>
          <ul className="space-y-1 text-sm">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className="hover:text-[#005f8d] transition"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Language Selector */}
        <div>
          <h3 className="font-semibold mb-2 text-[#0077B6]">Language</h3>
          <select
            value={lang}
            onChange={(e) => changeLanguage(e.target.value as Lang)}
            className="border rounded-md px-2 py-1 text-sm bg-white border-gray-300 focus:outline-none focus:ring-1 focus:ring-[#0077B6]"
          >
            <option value="en">English</option>
            <option value="hi">हिन्दी</option>
            <option value="as">অসমীয়া</option>
          </select>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="font-semibold mb-2 text-[#0077B6]">Connect</h3>
          <div className="flex gap-3">
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="hover:text-[#005f8d] transition"
            >
              <Linkedin />
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="hover:text-[#005f8d] transition"
            >
              <Github />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-[#005f8d] transition"
            >
              <Twitter />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="col-span-4 text-center mt-6 text-xs text-[#444444]">
          <div className="border-t border-gray-300 pt-3">{t.copyright}</div>
          <div className="mt-1 italic text-[11px] text-[#0077B6]">
            Made with ❤️ in Bharat
          </div>
        </div>
      </motion.footer>
    </>
  );
}
