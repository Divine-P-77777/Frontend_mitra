export const useSpeech = () => {
  const speak = (text: string, lang: "en" | "hi" | "as", onStart?: () => void, onEnd?: () => void) => {
    if (typeof window === "undefined" || !("speechSynthesis" in window)) {
      console.warn("Speech not supported");
      return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const langMap: Record<string, string> = { en: "en-IN", hi: "hi-IN", as: "as-IN" };
    utter.lang = langMap[lang] ?? "en-IN";
    utter.rate = 0.95; // natural speed
    utter.pitch = 1;
    utter.onstart = () => onStart?.();
    utter.onend = () => onEnd?.();
    utter.onerror = () => onEnd?.();
    window.speechSynthesis.speak(utter);
  };

  const stop = () => {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
};

  return { speak, stop };
};

