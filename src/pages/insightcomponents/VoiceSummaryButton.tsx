import { Volume2, Pause } from "lucide-react";

interface VoiceSummaryButtonProps {
  isSpeaking: boolean;
  onClick: () => void;
  label: string;
}

export default function VoiceSummaryButton({ isSpeaking, onClick, label }: VoiceSummaryButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-full transition text-sm font-medium ${
        isSpeaking
          ? "bg-red-200 hover:bg-red-300 text-red-900"
          : "bg-gradient-to-r from-[#FF9933] via-[#FFD60A] to-[#138808] text-black hover:opacity-90"
      }`}
    >
      {isSpeaking ? <Pause size={18} /> : <Volume2 size={18} />}
      {isSpeaking ? "Pause" : label}
    </button>
  );
}
