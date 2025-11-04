import { backendURL } from "@/lib/backendURL";

export async function fetchDistrictSuggestions(query: string): Promise<string[]> {
  if (!query) return [];

  try {
    const res = await fetch(`${backendURL}/api/district-suggestions?query=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error("Error fetching district suggestions:", err);
    return [];
  }
}
