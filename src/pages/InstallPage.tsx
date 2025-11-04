import  { useEffect, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import {  languageInstall } from "@/lib/constants/language";
import type { LanguageOption as Lang } from "@/context/LanguageContext";
import { Volume2, Info, Loader2, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { speakText } from "@/lib/textToSpeech";

declare global {
  interface Window {
    deferredPWAEvent?: Event | null;
  }
}

export default function InstallPage() {
  const { language } = useLanguage();
  const lang = (language || "en") as Lang;
  const t = languageInstall[lang];

  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [installing, setInstalling] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  // 🧭 Handle PWA install events
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as any);
      (window as any).deferredPWAEvent = e;
    };

    const handleAppInstalled = () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
      (window as any).deferredPWAEvent = null;
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);

    // Detect existing install (standalone mode)
    const standalone =
      window.matchMedia?.("(display-mode: standalone)").matches ||
      ((window.navigator as any).standalone);
    if (standalone) setIsInstalled(true);

    return () => {
      window.removeEventListener(
        "beforeinstallprompt",
        handleBeforeInstallPrompt
      );
      window.removeEventListener("appinstalled", handleAppInstalled);
    };
  }, []);

  // 📱 Trigger install prompt
  const handleInstall = useCallback(async () => {
    if (typeof window === "undefined") return;
    const evt = (window as any).deferredPWAEvent || deferredPrompt;
    if (!evt) {
      setShowInfo(true);
      return;
    }
    try {
      setInstalling(true);
      await evt.prompt?.();
      const choice = await evt.userChoice;
      if (choice?.outcome === "accepted") {
        setIsInstalled(true);
      }
    } catch (err) {
      console.error("Install failed:", err);
    } finally {
      setInstalling(false);
      setDeferredPrompt(null);
      (window as any).deferredPWAEvent = null;
    }
  }, [deferredPrompt]);

  // Voice summary
  const handleSpeak = () => {
    const text = `${t.title}. ${t.subtitle}. ${t.tip}`;
    const langToSpeechTag: Record<Lang, string> = {
      en: "en-IN",
      hi: "hi-IN",
      as: "as-IN",
    };
    const langTag = langToSpeechTag[lang];

    if (typeof window !== "undefined") {
      try {
        speakText(text, lang);
      } catch {
        const u = new window.SpeechSynthesisUtterance(text);
        u.lang = langTag;
        u.rate = 0.95;
        window.speechSynthesis.speak(u);
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-gradient-to-br from-orange-50 via-white to-green-50 text-[#1A1A2E]">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white rounded-2xl shadow-lg border border-gray-200 p-6 text-center"
      >
        <h1 className="text-2xl font-semibold text-[#0077B6]">{t.title}</h1>
        <p className="mt-2 text-gray-600 text-sm">{t.subtitle}</p>

        {/* Voice & Info buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={handleSpeak}
            className="p-3 rounded-full bg-yellow-100 hover:bg-yellow-200 transition"
            aria-label="Read aloud"
          >
            <Volume2 size={18} />
          </button>
          <button
            onClick={() => setShowInfo(true)}
            className="p-3 rounded-full bg-blue-50 hover:bg-blue-100 transition"
            aria-label="Uninstall info"
          >
            <Info size={18} color="#0077B6" />
          </button>
        </div>

        {/* Main action */}
        <div className="mt-8">
          {!isInstalled ? (
            <motion.button
              whileTap={{ scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              onClick={handleInstall}
              disabled={installing}
              className="w-full py-3 rounded-xl bg-[#FFD60A] hover:bg-[#FFC300] text-[#1A1A2E] font-semibold shadow-md transition disabled:opacity-70"
            >
              {installing ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="animate-spin" size={18} />
                  <span>{t.installing}</span>
                </div>
              ) : (
                t.installBtn
              )}
            </motion.button>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <CheckCircle className="text-green-600" size={28} />
              <p className="font-medium text-green-700">{t.alreadyInstalled}</p>
            </div>
          )}
        </div>

        {/* Info section */}
        <p className="mt-6 text-xs text-gray-500 leading-relaxed">{t.tip}</p>

        <Link
          to="/"
          className="inline-block mt-6 text-sm text-[#0077B6] font-medium hover:underline"
        >
          ← {t.backHome}
        </Link>
      </motion.div>

      {/* Info Modal */}
      {showInfo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.25 }}
            className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-full text-center"
          >
            <h3 className="text-lg font-semibold text-[#0077B6] mb-3">
              {t.uninstallInfoTitle}
            </h3>
            <p className="text-sm text-gray-600 mb-4">{t.uninstallInfo}</p>
            <button
              onClick={() => setShowInfo(false)}
              className="px-4 py-2 rounded-lg bg-[#FFD60A] hover:bg-[#FFC300] font-medium text-[#1A1A2E]"
            >
              OK
            </button>
          </motion.div>
        </div>
      )}
    </div>
  );
}
