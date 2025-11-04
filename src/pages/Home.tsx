import  { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { speakText, stopSpeech } from "@/lib/textToSpeech";
import {
  BarChart3,
  HelpCircle,
  BookOpenText,
  Mail,
  Headphones,
} from "lucide-react";

export default function HomePage() {
  const navigate = useNavigate();
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleVoiceIntro = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
      return;
    }
    const text =
      "Welcome to Mitra — Our Voice, Our Rights. Empowering Bharat through data, voice, and transparency.";
    speakText(text, "en", () => setIsSpeaking(true), () => setIsSpeaking(false));
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-[#FF9933]/20 via-white to-[#138808]/20 text-center px-6 py-28 relative overflow-hidden">
      {/* Animated background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#FF9933]/10 via-transparent to-[#138808]/10 animate-[gradientMove_10s_linear_infinite]"></div>

      {/* Hero Section */}
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-6xl md:text-7xl mt-20 font-extrabold text-gray-900 mb-3 relative z-10"
      >
        Mitra
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="text-xl md:text-2xl font-semibold text-indigo-800 mb-2 relative z-10"
      >
        🇮🇳 Our Voice, Our Rights
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
        className="max-w-2xl text-gray-700 text-lg md:text-xl leading-relaxed mb-10 relative z-10"
      >
        Empowering Bharat through{" "}
        <span className="font-semibold text-indigo-800">data</span>,{" "}
        <span className="font-semibold text-indigo-800">voice</span>, and{" "}
        <span className="font-semibold text-indigo-800">transparency</span> — so
        every citizen can understand, compare, and act.
      </motion.p>

      {/* Buttons Section */}
      <div className="flex flex-wrap justify-center gap-4 mb-10 relative z-10">
        <button
          onClick={handleVoiceIntro}
          className="flex items-center gap-2 px-6 py-3 bg-[#FFD60A] rounded-full text-black font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all"
        >
          <Headphones size={20} />
          {isSpeaking ? "Pause Voice" : "Listen Intro"}
        </button>

        <button
          onClick={() => navigate("/insights")}
          className="flex items-center gap-2 px-6 py-3 bg-[#138808] text-white rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all"
        >
          <BarChart3 size={20} />
          Explore Insights
        </button>

        <button
          onClick={() => navigate("/faq")}
          className="flex items-center gap-2 px-6 py-3 bg-[#7e22ce] text-white rounded-full font-medium shadow-md hover:scale-105 hover:shadow-lg transition-all"
        >
          <HelpCircle size={20} />
          FAQs
        </button>
      </div>

      {/* Info Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8 }}
        className="max-w-3xl text-center bg-white/40 backdrop-blur-md border border-gray-200 rounded-2xl shadow-md p-6 relative z-10"
      >
        <h3 className="text-2xl font-bold mb-3 text-indigo-900">Why Mitra?</h3>
        <p className="text-gray-800 leading-relaxed mb-4">
          Mitra brings government data closer to citizens — visualized, summarized,
          and spoken in your language. Compare districts, listen to summaries, and
          understand the impact of welfare programs like{" "}
          <span className="font-semibold">MGNREGA</span> in real time.
        </p>

        <div className="flex flex-wrap justify-center gap-3 mt-4">
          <button
            onClick={() => navigate("/about")}
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-950 transition-all"
          >
            <BookOpenText size={18} />
            About Us
          </button>

          <button
            onClick={() => navigate("/contact")}
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white rounded-full hover:bg-gray-950 transition-all"
          >
            <Mail size={18} />
            Contact
          </button>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="mt-12 text-sm text-gray-600 relative z-10">
        © {new Date().getFullYear()} Mitra — Built for Bharat 🇮🇳
      </footer>
    </main>
  );
}
