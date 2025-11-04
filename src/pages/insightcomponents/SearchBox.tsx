import { Search, Loader2 } from "lucide-react";
import { forwardRef, useState, useEffect } from "react";

interface SearchBoxProps {
  query: string;
  setQuery: (v: string) => void;
  suggestions: string[];
  loading: boolean;
  onSelect: (name: string) => void;
  placeholder: string;
  onFocus?: () => void;
  onBlur?: () => void;
}

const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ query, setQuery, suggestions, loading, onSelect, placeholder, onFocus, onBlur }, ref) => {
    const [activeIndex, setActiveIndex] = useState<number>(-1);

    // Keyboard navigation
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "ArrowDown") {
        setActiveIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
      } else if (e.key === "ArrowUp") {
        setActiveIndex((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter") {
        if (activeIndex >= 0) {
          onSelect(suggestions[activeIndex]);
        } else {
          onSelect(query);
        }
        setActiveIndex(-1);
      }
    };

    // Reset active index when suggestions change
    useEffect(() => setActiveIndex(-1), [suggestions]);

    return (
      <div className="relative w-full max-w-md mx-auto">
        <div className="flex items-center gap-2 mb-2 font-medium text-gray-700">
          <Search size={18} />
          Search by District
        </div>
        <div className="relative">
          <input
            ref={ref}
            className="w-full p-3 pl-10 pr-10 border border-gray-300 rounded-xl shadow-sm focus:ring-2 focus:ring-[#FFD60A] focus:outline-none transition"
            placeholder={placeholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            onFocus={onFocus}
            onBlur={onBlur}
            autoComplete="off"
          />
          {loading && (
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              <Loader2 className="animate-spin" size={18} />
            </div>
          )}
        </div>

        {suggestions.length > 0 && (
          <ul className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-xl shadow-lg max-h-60 overflow-auto">
            {suggestions.map((s, i) => (
              <li
                key={s}
                onClick={() => {
                  setQuery(s);
                  if (ref && typeof ref !== "function" && ref.current) {
                    ref.current.blur();
                  }
                  onSelect(s);
                }}
                onMouseEnter={() => setActiveIndex(i)}
                className={`px-4 py-2 cursor-pointer transition-colors ${
                  i === activeIndex ? "bg-[#FFD60A]/30 text-gray-900 font-semibold" : "hover:bg-[#FFD60A]/20"
                }`}
              >
                {s}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
);

SearchBox.displayName = "SearchBox";
export default SearchBox;
