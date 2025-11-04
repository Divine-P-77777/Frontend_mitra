import VoiceSummaryButton from "./VoiceSummaryButton";

interface SummaryHeaderProps {
  summary: any;
  isSpeaking: boolean;
  onVoiceToggle: () => void;
  onCopy?: () => void; // <-- make optional
  langLabel: string;
}


export default function SummaryHeader({
  summary,
  isSpeaking,
  onVoiceToggle,
  onCopy,
  langLabel,
}: SummaryHeaderProps) {
  const lastUpdated = summary?.lastUpdated
    ? new Date(summary.lastUpdated).toLocaleString()
    : "—";

  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
      {/* Summary Info */}
      <div>
        <h2 className="text-lg sm:text-xl font-semibold">
          {summary?.name || "—"}, {summary?.state || "—"}
        </h2>
        {summary?.year && (
          <div className="text-sm text-gray-600">Year: {summary.year}</div>
        )}
        <div className="text-xs text-gray-500">
          Last updated: {lastUpdated}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <VoiceSummaryButton
          isSpeaking={isSpeaking}
          onClick={onVoiceToggle}
          label={langLabel}
        />

{onCopy && (
  <button
    onClick={onCopy}
    className="px-3 py-2 border rounded-md text-sm hover:bg-gray-50 transition"
    aria-label="Copy summary"
  >
    Copy
  </button>
)}

      </div>
    </div>
  );
}
