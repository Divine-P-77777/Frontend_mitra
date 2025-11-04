import React, { useEffect, useState, useMemo, useRef } from "react";
import { motion } from "framer-motion";
import html2canvas from "html2canvas";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, Legend } from "recharts";
import { Loader2, Volume2, Camera, ArrowLeftRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import { voiceTemplatesCompare,languageComparePage } from "../lib/constants/language";
import { speakText } from "../lib/textToSpeech";
import { fetchDistrictSuggestions } from "../lib/fetchDistricts";
import { backendURL } from "../lib/backendURL";


interface DistrictData {
  name: string;
  state: string;
  year: string;
  month: string;
  approvedLabourBudget: number;
  averageWageRate: number;
  totalExpenditure: number;
  totalHouseholdsWorked: number;
  totalIndividualsWorked: number;
  womenPersondays: number;
  scPersondays?: number;
  stPersondays?: number;
  completedWorks?: number;
  ongoingWorks?: number;
  lastUpdated?: string;
}
const ComparePage: React.FC = () => {
  const { language } = useLanguage();
  const t = languageComparePage[language];

  const [districtAName, setDistrictAName] = useState("Nalbari");
  const [districtBName, setDistrictBName] = useState("");
  const [aData, setAData] = useState<DistrictData | null>(null);
  const [bData, setBData] = useState<DistrictData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 🧠 Suggestion + focus management
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<"A" | "B" | null>(null);
  const inputBRef = useRef<HTMLInputElement>(null);

  // 🧭 Smart URL handling
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const name = params.get("name");
    if (name) {
      setDistrictAName(name);
      // Focus second input automatically
      setTimeout(() => {
        inputBRef.current?.focus();
        setActiveInput("B");
      }, 300);
    }
  }, []);

  // ⚡ Compare handler
  const handleCompare = async () => {
    if (!districtAName || !districtBName)
      return alert("Please enter both districts.");

    setLoading(true);
    try {
      const [aRes, bRes] = await Promise.all([
        fetch(`${backendURL}/api/district?name=${encodeURIComponent(districtAName)}`),
        fetch(`${backendURL}/api/district?name=${encodeURIComponent(districtBName)}`),
      ]);
      const [aJson, bJson] = await Promise.all([aRes.json(), bRes.json()]);
      setAData(aJson);
      setBData(bJson);
    } catch (err) {
      console.error("❌ Compare fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✍️ Fetch suggestions
  const handleInputChange = async (value: string, type: "A" | "B") => {
    if (type === "A") setDistrictAName(value);
    else setDistrictBName(value);

    if (!value.trim()) return setSuggestions([]);
    const res = await fetchDistrictSuggestions(value);
    setSuggestions(res);
  };

  // 🗣️ Voice summary
  const handleSpeak = () => {
    if (!aData || !bData) return;
    if (typeof window !== "undefined") {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
        return;
      }
      try {
        const fullText = voiceTemplatesCompare[language](aData, bData);
        speakText(fullText, language, () => setIsSpeaking(true), () => setIsSpeaking(false));
      } catch (err) {
        console.error("Voice summary error:", err);
      }
    }
  };

  // 📸 Screenshot
  const handleDownload = async () => {
    if (containerRef.current) {
      const canvas = await html2canvas(containerRef.current, { scale: 2 });
      const link = document.createElement("a");
      link.download = `Compare_${aData?.name}_vs_${bData?.name}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  // 🧩 Chart data
  const chartData = useMemo(() => {
    if (!aData || !bData) return [];
    const safe = (v: number | undefined) => Number(v || 0);
    return [
      {
        metric: "Approved Budget (₹ Cr)",
        [aData.name]: safe(aData.approvedLabourBudget) / 1e7,
        [bData.name]: safe(bData.approvedLabourBudget) / 1e7,
      },
      {
        metric: "Total Expenditure (₹ Cr)",
        [aData.name]: safe(aData.totalExpenditure) / 1e7,
        [bData.name]: safe(bData.totalExpenditure) / 1e7,
      },
      {
        metric: "Women Persondays (Lakh)",
        [aData.name]: safe(aData.womenPersondays) / 1e5,
        [bData.name]: safe(bData.womenPersondays) / 1e5,
      },
      {
        metric: "SC Persondays (Lakh)",
        [aData.name]: safe(aData.scPersondays) / 1e5,
        [bData.name]: safe(bData.scPersondays) / 1e5,
      },
      {
        metric: "ST Persondays (Lakh)",
        [aData.name]: safe(aData.stPersondays) / 1e5,
        [bData.name]: safe(bData.stPersondays) / 1e5,
      },
      {
        metric: "Total Households Worked",
        [aData.name]: safe(aData.totalHouseholdsWorked),
        [bData.name]: safe(bData.totalHouseholdsWorked),
      },
      {
        metric: "Average Wage Rate (₹)",
        [aData.name]: safe(aData.averageWageRate),
        [bData.name]: safe(bData.averageWageRate),
      },
    ];
  }, [aData, bData]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#e8f5e9] via-white to-[#fff3e0] py-24 px-5">
      <motion.div
        ref={containerRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="max-w-6xl mx-auto bg-white/90 rounded-2xl shadow-xl p-8 border border-gray-100"
      >
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
          <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">{t.title}</h1>
          <div className="flex gap-3 mt-3 sm:mt-0">
            <button
              onClick={handleSpeak}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition ${
                isSpeaking ? "bg-red-100 text-red-700" : "bg-[#b5e48c] hover:bg-[#99d98c]"
              }`}
            >
              <Volume2 size={18} />
              {isSpeaking ? t.stop : t.voiceSummary}
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#ffb703] hover:bg-[#ffa94d] text-white font-medium transition"
            >
              <Camera size={18} /> {t.snapshot}
            </button>
          </div>
        </div>

        {/* Inputs */}
        <div className="grid sm:grid-cols-[1fr_auto_1fr] items-center gap-3 mb-6 relative">
          <div className="relative">
            <input
              type="text"
              value={districtAName}
              onChange={(e) => handleInputChange(e.target.value, "A")}
              onFocus={() => setActiveInput("A")}
              onBlur={() => setTimeout(() => setActiveInput(null), 150)}
              placeholder={t.firstDistrict}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-green-300 outline-none"
            />
            {activeInput === "A" && suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md mt-1 shadow-md z-10 w-full max-h-48 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    onMouseDown={() => {
                      setDistrictAName(s);
                      setActiveInput(null);
                      setSuggestions([]);
                    }}
                    className="px-3 py-2 hover:bg-green-100 cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <ArrowLeftRight className="mx-auto text-gray-400" />

          <div className="relative">
            <input
              ref={inputBRef}
              type="text"
              value={districtBName}
              onChange={(e) => handleInputChange(e.target.value, "B")}
              onFocus={() => setActiveInput("B")}
              onBlur={() => setTimeout(() => setActiveInput(null), 150)}
              placeholder={t.secondDistrict}
              className="w-full px-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-orange-300 outline-none"
            />
            {activeInput === "B" && suggestions.length > 0 && (
              <ul className="absolute bg-white border rounded-md mt-1 shadow-md z-10 w-full max-h-48 overflow-y-auto">
                {suggestions.map((s) => (
                  <li
                    key={s}
                    onMouseDown={() => {
                      setDistrictBName(s);
                      setActiveInput(null);
                      setSuggestions([]);
                    }}
                    className="px-3 py-2 hover:bg-orange-100 cursor-pointer"
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {/* Compare Now */}
        <div className="flex justify-center mb-6">
          <button
            onClick={handleCompare}
            className="px-6 py-2 bg-[#3a86ff] hover:bg-[#4361ee] text-white font-semibold rounded-lg shadow-md transition"
          >
            {t.compareNow}
          </button>
        </div>

        {/* Main Content */}
        {loading ? (
          <div className="flex justify-center items-center py-16 text-gray-500">
            <Loader2 className="animate-spin mr-2" /> {t.loading}
          </div>
        ) : aData && bData ? (
          <div className="bg-white border rounded-xl shadow-sm p-5">
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="metric" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey={aData.name} fill="#ff9933" radius={[6, 6, 0, 0]} />
                <Bar dataKey={bData.name} fill="#138808" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-center text-gray-500 py-10">{t.noData}</p>
        )}
      </motion.div>
    </div>
  );
};

export default ComparePage;