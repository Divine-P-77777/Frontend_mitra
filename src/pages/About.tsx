import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {  languageAbout } from "@/lib/constants/language";
import type { Lang } from "@/lib/constants/language";

import { speakText } from "@/lib/textToSpeech";
import { Link } from "react-router-dom"; // ✅ React Router Link

const AboutPage: React.FC = () => {
  const { language } = useLanguage();
  const lang = (language || "en") as Lang;
  const content = languageAbout[lang];

  const handleSpeak = () => {
    speakText(content.desc, lang);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 bg-gradient-to-b from-[#FF9933]/30 via-white to-[#138808]/30 text-gray-900 flex flex-col items-center justify-center p-6 font-sans"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-900">
        {content.title}
      </h1>

      <p className="max-w-2xl text-center text-lg leading-relaxed mb-10 text-gray-800">
        {content.desc}
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-xl w-full mb-8">
        {content.features.map((f: string, i: number) => (
          <div
            key={i}
            className="p-4 border border-gray-300 rounded-2xl text-center bg-white/70 shadow-sm hover:shadow-md transition"
          >
            {f}
          </div>
        ))}
      </div>

      <Link
        to="/insights" // ✅ React Router
        className="px-6 py-3 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white rounded-xl font-semibold hover:scale-105 transition-transform"
      >
        {content.explore}
      </Link>

      <button
        onClick={handleSpeak}
        className="mt-8 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all"
      >
        🔊 {content.listen}
      </button>
    </motion.div>
  );
};

export default AboutPage;
