import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-orange-50 via-white to-green-50 text-[#1A1A2E] px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-md bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-lg border border-gray-200"
      >
        <h1 className="text-6xl font-extrabold text-[#FF9933] mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-[#138808] mb-4">
          Page Not Found
        </h2>
        <p className="text-gray-700 mb-6">
          Oops! The page you are looking for does not exist. It might have been
          moved or removed.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#FFD60A] text-[#1A1A2E] font-semibold rounded-xl hover:bg-[#FFC300] transition-all"
        >
          <ArrowLeft size={18} /> Go Back Home
        </Link>
      </motion.div>
    </main>
  );
}
