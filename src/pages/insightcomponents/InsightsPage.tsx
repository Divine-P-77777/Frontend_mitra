import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Loader2, BarChart2, Search } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "@/context/LanguageContext";
import { ui, metrics, voiceTemplates } from "@/lib/constants/language";
import type { LanguageOption as Lang } from "@/context/LanguageContext";
import { useSpeech } from "@/hooks/useSpeech";
import { fetchDistrictSuggestions } from "@/lib/fetchDistricts";
import { backendURL } from "@/lib/backendURL";
import SearchBox from "./SearchBox";
import SummaryHeader from "./SummaryHeader";
import MetricsGrid from "./MetricsGrid";
import BarChartModal from "./BarChartModal";
import NoDataModal from "./NoDataModal";

interface Summary {
  name: string;
  state: string;
  year: string;
  month: string;
  approvedLabourBudget: number;
  averageWageRate: number;
  averageDaysEmployment: number;
  totalHouseholdsWorked: number;
  totalIndividualsWorked: number;
  totalExpenditure: number;
  womenPersondays: number;
  scPersondays: number;
  stPersondays: number;
  completedWorks: number;
  ongoingWorks: number;
  remarks: string;
  lastUpdated: string;
}

export default function InsightsPage() {
  const { language } = useLanguage();
  const lang = language as Lang;
  const t = ui[lang];
  const metricLabels = metrics[lang];
  const { speak, stop } = useSpeech();
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [summary, setSummary] = useState<Summary | null>(null);
  const [loadingSummary, setLoadingSummary] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [locating, setLocating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [noDataModal, setNoDataModal] = useState(false);
  const [noDataDistrict, setNoDataDistrict] = useState("");
  const [inputFocused, setInputFocused] = useState(false);
  const [autoTrigger, setAutoTrigger] = useState(false);

  const debounceRef = useRef<number | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Handle typing, show suggestions only if input focused
  useEffect(() => {
    if (!query.trim() || !inputFocused) {
      setSuggestions([]);
      return;
    }

    setLoadingSuggestions(true);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    debounceRef.current = window.setTimeout(async () => {
      try {
        const list = await fetchDistrictSuggestions(query);
        setSuggestions(list);
      } catch {
        setSuggestions([]);
      } finally {
        setLoadingSuggestions(false);
      }
    }, 300);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [query, inputFocused]);


  const allDataEmpty = useCallback(
    (obj: any) => {
      // Ignore basic fields, only check metrics. Adjust field names as necessary.
      const keysToCheck = [
        "approvedLabourBudget",
        "averageWageRate",
        "averageDaysEmployment",
        "totalHouseholdsWorked",
        "totalIndividualsWorked",
        "totalExpenditure",
        "womenPersondays",
        "scPersondays",
        "stPersondays",
        "completedWorks",
        "ongoingWorks"
      ];
      return keysToCheck.every(
        (key) =>
          obj == null ||
          obj[key] == null || obj[key] === 0 || obj[key] === ""
      );
    },
    []
  );

  // Fetch summary (only by explicit button click or location auto trigger)
  const fetchSummary = async (districtName: string) => {
    if (!districtName) return;
    setSummary(null);
    setError(null);
    setLoadingSummary(true);
    if (abortRef.current) abortRef.current.abort();
    abortRef.current = new AbortController();
    try {
      const res = await fetch(`${backendURL}/api/district?name=${encodeURIComponent(districtName)}`);
      if (!res.ok) throw new Error(`Failed to load data for ${districtName}`);
      const json = await res.json();
      if (allDataEmpty(json)) {
        setNoDataDistrict(districtName);
        setNoDataModal(true);
        setSummary(null);
        return;
      }
      if (!json || Object.keys(json).length === 0) {
        setError("No data available for this district.");
        setSummary(null);
        return;
      }
      setSummary({
        name: json.name || districtName,
        state: json.state || "—",
        year: json.year || "—",
        month: json.month || "—",
        approvedLabourBudget: Number(json.approvedLabourBudget ?? 0),
        averageWageRate: Number(json.averageWageRate ?? 0),
        averageDaysEmployment: Number(json.averageDaysEmployment ?? 0),
        totalHouseholdsWorked: Number(json.totalHouseholdsWorked ?? 0),
        totalIndividualsWorked: Number(json.totalIndividualsWorked ?? 0),
        totalExpenditure: Number(json.totalExpenditure ?? 0),
        womenPersondays: Number(json.womenPersondays ?? 0),
        scPersondays: Number(json.scPersondays ?? 0),
        stPersondays: Number(json.stPersondays ?? 0),
        completedWorks: Number(json.completedWorks ?? 0),
        ongoingWorks: Number(json.ongoingWorks ?? 0),
        remarks: json.remarks ?? "",
        lastUpdated: json.lastUpdated ?? new Date().toISOString(),
      });
    } catch (err: any) {
      if (err.name === "AbortError") return;
      setError("Failed to load district insights.");
      setSummary(null);
    } finally {
      setLoadingSummary(false);
    }
  };

  // Use my location
  const handleUseLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `${backendURL}/api/reverse-geocode?lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          if (data?.district) {
            setQuery(data.district);
            setAutoTrigger(true);
            // This effect will trigger fetching insights below
          } else {
            alert("Could not detect district.");
          }
        } catch {
          alert("Failed to fetch district info.");
        } finally {
          setLocating(false);
        }
      },
      () => {
        alert("Location permission denied.");
        setLocating(false);
      }
    );
  };

  // Auto-trigger insights fetch if instructed by location
  useEffect(() => {
    if (autoTrigger && query.trim().length > 3) {
      fetchSummary(query);
      setAutoTrigger(false);
    }
    // eslint-disable-next-line
  }, [autoTrigger, query]);

  // Handle NoDataModal close: hide and refocus input
  const handleModalClose = () => {
    setNoDataModal(false);
    setTimeout(() => inputRef.current?.focus(), 200);
  };

  // Voice summary toggle
  const handleVoiceSummary = () => {
    if (!summary) return;
    if (isSpeaking) {
      stop();
      setIsSpeaking(false);
      return;
    }
    const text = voiceTemplates[lang](summary);
    speak(text, lang, () => setIsSpeaking(true), () => setIsSpeaking(false));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FF9933]/10 via-white to-[#138808]/10 px-4 pt-24 pb-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="max-w-5xl mx-auto">
        {/* 🌍 Header */}
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-heading font-semibold text-gray-900 mb-3">{t.title}</h1>
          <p className="text-gray-600 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
            {lang === "hi"
              ? "अपने जिले के MGNREGA आंकड़ों को खोजें, सुनें और समझें।"
              : lang === "as"
                ? "আপোনাৰ জিলাৰ MGNREGA তথ্য অনুসন্ধান কৰক, শুনক আৰু বুজক।"
                : "Search, listen to, and understand MGNREGA district data easily."}
          </p>
        </header>

        {/* 🔍 Search + Location */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-4">
          <div className="flex-1 min-w-[250px]">
            <SearchBox
              ref={inputRef}
              query={query}
              setQuery={setQuery}
              suggestions={inputFocused ? suggestions : []}
              loading={loadingSuggestions}
              placeholder={t.placeholder || "Search district..."}
              onSelect={val => setQuery(val)} // Just updates the input, does NOT fetch
              onFocus={() => setInputFocused(true)}
              onBlur={() => setTimeout(() => setInputFocused(false), 200)}
            />
          </div>
        </div>

        <div className="flex items-center justify-center mx-auto mb-6">
          <button
            onClick={handleUseLocation}
            disabled={locating}
            className="px-5 py-3 flex items-center justify-center gap-2 rounded-xl bg-[#FFD60A] hover:bg-[#FDC500] shadow-md text-black font-medium transition-all"
          >
            {locating ? <Loader2 className="animate-spin" size={18} /> : <MapPin size={18} />}
            {t.useLocation || "Use My Location"}
          </button>
        </div>

        {/* 🔘 View Insights */}
        <div className="text-center mb-8">
          <button
            onClick={() => query.trim().length > 3 && fetchSummary(query)}
            disabled={query.trim().length <= 3 || loadingSummary}
            className={`px-6 py-3 rounded-xl font-medium transition-all shadow-md flex mx-auto items-center gap-2 ${query.trim().length > 3
              ? "bg-[#007BFF] hover:bg-[#005FCC] text-white"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
          >
            {loadingSummary ? <Loader2 className="animate-spin" size={18} /> : <Search size={18} />}
            {t.viewInsights || "View Insights"}
          </button>
        </div>

        {/* 🧾 Results */}
        <AnimatePresence mode="wait">
          {loadingSummary && (
            <motion.div key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex justify-center py-10">
              <Loader2 className="animate-spin text-[#007BFF]" size={40} />
            </motion.div>
          )}
          {error && (
            <motion.div key="error" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center text-red-500 bg-red-50 py-6 rounded-xl shadow-sm">
              {error}
            </motion.div>
          )}
          {summary && !loadingSummary && (
            <motion.div key="summary" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.4 }} className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg">
              <SummaryHeader summary={summary} isSpeaking={isSpeaking} onVoiceToggle={handleVoiceSummary} langLabel={t.listenSummary} />
              <MetricsGrid summary={summary} metricLabels={metricLabels} />
              <div className="flex justify-center gap-4 mt-6">
                <button onClick={() => setShowModal(true)} className="px-6 py-2.5 text-sm rounded-md bg-blue-100 hover:bg-blue-200 transition font-medium flex items-center gap-2">
                  <BarChart2 size={16} /> View Chart
                </button>
                <button onClick={() => navigate(`/compare?name=${encodeURIComponent(summary.name)}`)} className="px-6 py-2.5 text-sm rounded-md bg-green-100 hover:bg-green-200 transition font-medium flex items-center gap-2">
                  Compare District
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      <NoDataModal show={noDataModal} district={noDataDistrict} onClose={handleModalClose} />
      <BarChartModal open={showModal} onClose={() => setShowModal(false)} summary={summary} />
    </div>
  );
}