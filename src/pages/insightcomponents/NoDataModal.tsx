import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";

interface NoDataModalProps {
  show: boolean;
  district: string;
  onClose: () => void;
}

export default function NoDataModal({ show, district, onClose }: NoDataModalProps) {
 const { language } = useLanguage();


  // Define multilingual text (can be merged into your global t object later if preferred)
  const translations = {
    en: {
      title: "No Data Available",
      message: `Sorry, we couldn’t find data for`,
      suggestion: "Please try another nearby district.",
      button: "Continue",
    },
    hi: {
      title: "डेटा उपलब्ध नहीं है",
      message: `क्षमा करें, हम इस जिले के लिए डेटा नहीं ढूँढ पाए`,
      suggestion: "कृपया किसी नज़दीकी जिले को आज़माएँ।",
      button: "जारी रखें",
    },
    as: {
      title: "তথ্য উপলব্ধ নাই",
      message: `ক্ষমা কৰক, আমি এই জিলাৰ তথ্য বিচাৰি পোৱা নাই`,
      suggestion: "অনুগ্ৰহ কৰি ওচৰৰ অন্য এটা জিলাৰ চেষ্টা কৰক।",
      button: "আগবাঢ়ক",
    },
  };

  const text = translations[language];

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-[90%] text-center"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold text-[#0077B6] mb-3">
              {text.title}
            </h2>
            <p className="text-gray-700 mb-5">
              {text.message} <b>{district}</b>. <br />
              {text.suggestion}
            </p>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#FFD60A] hover:bg-[#FDC500] rounded-lg font-medium text-black transition"
            >
              {text.button}
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
