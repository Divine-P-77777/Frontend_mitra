"use client";
import { motion } from "framer-motion";
import { useLoader } from "@/hooks/useLoader";

export default function Loader() {
  const { loading } = useLoader();

  if (!loading) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-6 
                 bg-gradient-to-b from-[#FF9933]/20 via-white to-[#138808]/20 
                 text-gray-900 transition-all duration-500 min-h-screen backdrop-blur-2xl"
    >
      {/* Logo */}
      <img
        src="/logo.png"
        alt="Mitra Logo"
        width={110}
        height={110}
        className="rounded-2xl shadow-md border border-[#138808]/40"
      />

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        className="text-4xl font-bold tracking-wide text-[#0B6623]"
      >
        Mitra
      </motion.h1>

      {/* Subtext */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="text-sm tracking-wide text-gray-700"
      >
        Empowering Bharat through Data & Voice 🇮🇳
      </motion.p>

      {/* Tricolor Loader Line */}
      <div className="relative w-[220px] h-1 rounded-full overflow-hidden bg-gray-300">
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: "100%" }}
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.3,
            ease: "linear",
          }}
          className="absolute top-0 left-0 h-full w-1/2 bg-gradient-to-r from-[#FF9933] via-white to-[#138808]"
        />
      </div>

      {/* Tagline */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-xs opacity-70 italic text-gray-700"
      >
        Data • Voice • Transparency
      </motion.span>
    </div>
  );
}
