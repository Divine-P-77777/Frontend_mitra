export function speakText(
  text: string,
  lang: "en" | "hi" | "as",
  onStart?: () => void,
  onEnd?: () => void
) {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    console.warn("SpeechSynthesis not available");
    return;
  }

  window.speechSynthesis.cancel();
  const utter = new window.SpeechSynthesisUtterance(text);

  const voiceLangs: Record<string, string> = {
    en: "en-IN",
    hi: "hi-IN",
    as: "as-IN",
  };

  utter.lang = voiceLangs[lang] || "en-IN";
  utter.rate = 1;
  utter.pitch = 1;
  utter.onstart = () => onStart?.();
  utter.onend = () => onEnd?.();
  utter.onerror = () => onEnd?.();

  window.speechSynthesis.speak(utter);
}

export function stopSpeech() {
  if (typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }
  window.speechSynthesis.cancel();
}