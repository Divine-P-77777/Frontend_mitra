import React, { useState } from "react";
import type { Lang } from "@/lib/constants/language";
import type { ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {  languageContact } from "@/lib/constants/language";
import { speakText } from "@/lib/textToSpeech";

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const lang = (language || "en") as Lang;
  const content = languageContact[lang];

  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    alert("Thank you for contacting us!");
    setFormData({ name: "", email: "", message: "" });
  };

  const handleSpeak = () => speakText(content.desc, lang);

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen pt-20 bg-gradient-to-b from-[#FF9933]/30 via-white to-[#138808]/30 text-gray-900 flex flex-col items-center justify-center p-6 font-sans"
    >
      <h1 className="text-3xl md:text-5xl font-bold mb-6 text-center text-gray-900">{content.title}</h1>

      <p className="max-w-2xl text-center text-lg leading-relaxed mb-10 text-gray-800">{content.desc}</p>

      <form
        className="w-full max-w-md bg-white/70 backdrop-blur-md p-6 rounded-2xl space-y-4 shadow-md"
        onSubmit={handleSubmit}
      >
        <input
          type="text"
          name="name"
          placeholder={content.namePlaceholder}
          value={formData.name}
          onChange={handleChange}
          aria-label="Name"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF9933] placeholder-gray-600"
        />
        <input
          type="email"
          name="email"
          placeholder={content.emailPlaceholder}
          value={formData.email}
          onChange={handleChange}
          aria-label="Email"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#FF9933] placeholder-gray-600"
        />
        <textarea
          name="message"
          placeholder={content.messagePlaceholder}
          value={formData.message}
          onChange={handleChange}
          rows={4}
          aria-label="Message"
          className="w-full px-4 py-2 rounded-lg border border-gray-400 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#138808] placeholder-gray-600"
        />
        <button
          type="submit"
          disabled={!formData.name || !formData.email || !formData.message}
          className="w-full py-2 bg-gradient-to-r from-[#FF9933] to-[#138808] text-white font-semibold rounded-lg hover:scale-105 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {content.submit}
        </button>
      </form>

      <div className="mt-8 text-center text-gray-800">
        <p>{content.email}</p>
      </div>

      <button
        onClick={handleSpeak}
        className="mt-8 px-4 py-2 rounded-xl bg-gray-900 text-white hover:bg-gray-800 transition-all"
      >
        🔊 {content.listen}
      </button>
    </motion.div>
  );
};

export default ContactPage;
