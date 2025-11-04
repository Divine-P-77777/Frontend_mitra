import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LabelList,
  CartesianGrid,
  Cell,
} from "recharts";
import Dialog from "@/components/ui/Dialog";
import { useSpeech } from "@/hooks/useSpeech";
import { Volume2, VolumeX, X as XIcon } from "lucide-react";
import { motion } from "framer-motion";

type Lang = "en" | "hi" | "as";

export interface SummaryData {
  name: string;
  state: string;
  year: string;
  month?: string;
  approvedLabourBudget?: number;
  totalExpenditure?: number;
  averageWageRate?: number;
  totalHouseholdsWorked?: number;
  totalIndividualsWorked?: number;
  womenPersondays?: number;
  scPersondays?: number;
  stPersondays?: number;
}

interface BarChartModalProps {
  open: boolean;
  onClose: () => void;
  summary?: SummaryData | null;
  lang?: Lang;
}

export default function BarChartModal({
  open,
  onClose,
  summary,
  lang = "en",
}: BarChartModalProps): React.JSX.Element | null {
  const { speak, stop } = useSpeech();
  const [isSpeaking, setIsSpeaking] = useState(false);
  if (!summary) return null;

  const data = [
    { name: "Approved Budget", value: summary.approvedLabourBudget, color: "#6EE7B7" },
    { name: "Total Expenditure", value: summary.totalExpenditure, color: "#34D399" },
    { name: "Avg Wage Rate", value: summary.averageWageRate, color: "#FCD34D" },
    { name: "Households Worked", value: summary.totalHouseholdsWorked, color: "#FDBA74" },
    { name: "Individuals Worked", value: summary.totalIndividualsWorked, color: "#FB923C" },
    { name: "Women Persondays", value: summary.womenPersondays, color: "#F87171" },
    { name: "SC Persondays", value: summary.scPersondays, color: "#60A5FA" },
    { name: "ST Persondays", value: summary.stPersondays, color: "#4ADE80" },
  ].filter((d) => typeof d.value === "number" && d.value > 0);

  const text = `${summary.name} district of ${summary.state}, year ${summary.year}.
  Approved labour budget rupees ${summary.approvedLabourBudget?.toLocaleString() ?? 0},
  total expenditure rupees ${summary.totalExpenditure?.toLocaleString() ?? 0}.
  ${summary.totalHouseholdsWorked?.toLocaleString() ?? 0} households and 
  ${summary.totalIndividualsWorked?.toLocaleString() ?? 0} individuals worked.
  Women persondays ${summary.womenPersondays?.toLocaleString() ?? 0},
  SC ${summary.scPersondays?.toLocaleString() ?? 0},
  ST ${summary.stPersondays?.toLocaleString() ?? 0}.
  Average wage rupees ${summary.averageWageRate ?? 0} per day.`;

  const handleVoiceToggle = (): void => {
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
    } else {
      speak(text, lang, () => setIsSpeaking(true), () => setIsSpeaking(false));
    }
  };

  return (
    <Dialog open={open} onClose={onClose} width="max-w-3xl">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="relative bg-gradient-to-br from-green-50 via-white to-orange-50 rounded-2xl p-4 sm:p-6 shadow-xl"
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute bg-green-800 top-3 right-3 p-2 rounded-full hover:bg-gray-100 transition"
          aria-label="Close"
        >
          <XIcon size={18} color="white" />
        </button>

        {/* Header */}
        <div className="text-center mb-4 sm:mb-5">
          <h2 className="text-lg sm:text-2xl font-semibold text-gray-800">
            {summary.name}, {summary.state}
          </h2>
          <p className="text-gray-600 text-xs sm:text-sm">
            Year: <strong>{summary.year}</strong> | Month:{" "}
            <strong>{summary.month || "—"}</strong>
          </p>
        </div>

        {/* Voice */}
        <div className="flex justify-center mb-4 sm:mb-5">
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleVoiceToggle}
            className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full font-medium text-xs sm:text-sm shadow-sm transition-all
              ${isSpeaking ? "bg-red-100 text-red-600" : "bg-green-100 text-green-700 hover:bg-green-200"}`}
          >
            {isSpeaking ? <VolumeX size={16} /> : <Volume2 size={16} />}
            {isSpeaking ? "Stop Listening" : "Listen Summary"}
          </motion.button>
        </div>

        {/* Chart */}
        <div className="bg-white rounded-xl shadow-inner p-3 sm:p-4 border border-gray-100"
          style={{ minWidth: 0, minHeight: 250 }}>
          {data.length ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{ top: 10, right: 10, bottom: 40, left: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 10, fill: "#333" }}
                  interval={0}
                  angle={-25}
                  textAnchor="end"
                  height={50}
                />
                <YAxis tick={{ fontSize: 10, fill: "#333" }} />
                <Tooltip
                  formatter={(val: number, name: string) =>
                    name.includes("Budget") || name.includes("Expenditure")
                      ? `₹${val.toLocaleString()}`
                      : val.toLocaleString()
                  }
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #E5E7EB",
                    borderRadius: "8px",
                    fontSize: "0.75rem",
                  }}
                />
                <Bar dataKey="value" radius={[10, 10, 0, 0]}>
                  {data.map((entry, i) => (
                    <Cell key={`cell-${i}`} fill={entry.color} />
                  ))}
                  <LabelList
  dataKey="value"
  position="top"
  formatter={(v: unknown) =>
    typeof v === "number" ? v.toLocaleString() : String(v)
  }
  style={{ fontSize: 11, fill: "#111", fontWeight: 600 }}
/>

                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-48 text-gray-500 text-sm">
              No data available for this district.
            </div>
          )}
        </div>

        {/* Trend */}
        <div className="mt-5 border-t pt-4 text-center text-gray-600 text-xs sm:text-sm">
          <p className="max-w-lg mx-auto px-2">
            📆 <strong>Yearly Trend (Coming Soon):</strong> Compare yearly MGNREGA performance and
            hear changes for deeper insights.
          </p>
        </div>

        {/* Close CTA */}
        <div className="text-center mt-5">
          <button
            onClick={onClose}
            className="px-5 sm:px-6 py-2 rounded-md bg-gradient-to-r from-green-400 to-orange-400 text-white font-medium shadow-md hover:opacity-90 transition text-sm sm:text-base"
          >
            Close
          </button>
        </div>
      </motion.div>
    </Dialog>
  );
}
