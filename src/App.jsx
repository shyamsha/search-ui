import React, { useEffect, useMemo, useState } from "react";
import SearchBar from "./components/SearchBar";
import ResultsPanel from "./components/ResultsPanel";
import dataJson from "./data/search.json";
import { useKeyboardListNav } from "./utils/useKeyboardListNav";

export default function App() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("All");
  const [filters, setFilters] = useState({ onlyWithBadge: false });
  const [data, setData] = useState(null);

  useEffect(() => {
    // Simulate initial data load
    setData(dataJson);
  }, []);

  // Open panel on focus or when typing
  useEffect(() => {
    if (focused || query) setOpen(true);
    else setOpen(false);
  }, [focused, query]);

  // Simulate async search
  useEffect(() => {
    if (!data) return;
    setLoading(true);
    const t = setTimeout(() => setLoading(false), query ? 450 : 250);
    return () => clearTimeout(t);
  }, [query, activeTab, filters, data]);

  const visibleIds = useMemo(() => {
    if (!data?.results) return [];
    let list = data.results;
    if (activeTab !== "All") list = list.filter((r) => r.type === activeTab);
    if (filters.onlyWithBadge) list = list.filter((r) => !!r.badge);
    if (query) {
      const q = query.toLowerCase();
      list = list.filter(
        (r) =>
          r.title.toLowerCase().includes(q) ||
          r.subtitle.toLowerCase().includes(q)
      );
    }
    return list.map((r) => r.id);
  }, [data, activeTab, filters, query]);

  const { activeIndex, setActiveIndex } = useKeyboardListNav(visibleIds, {
    onEnter: (id) => alert(`Open ${id}`),
  });

  return (
    <div className="container">
      <div className="fade-up">
        <SearchBar
          value={query}
          onChange={setQuery}
          focused={focused}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onClear={() => setQuery("")}
          onToggleFilters={() =>
            setFilters((s) => ({ ...s, onlyWithBadge: !s.onlyWithBadge }))
          }
        />
        <ResultsPanel
          open={open}
          loading={loading}
          query={query}
          data={data || { tabs: [], results: [], suggestions: [] }}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          filters={filters}
          setFilters={setFilters}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
          onEnter={(id) => alert(`Open ${id}`)}
        />
      </div>
    </div>
  );
}
