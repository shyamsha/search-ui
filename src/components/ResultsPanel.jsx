/* eslint-disable no-unused-vars */
import React, { useMemo } from "react";
import Tabs from "./Tabs";
import ResultItem from "./ResultItem";

export default function ResultsPanel({
  open,
  loading,
  query,
  data,
  activeTab,
  onTabChange,
  filters,
  setFilters,
  activeIndex,
  setActiveIndex,
  onEnter,
}) {
  const filtered = useMemo(() => {
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
    return list;
  }, [data, activeTab, filters.onlyWithBadge, query]);

  if (!open || !query) return null;

  return (
    <div className="panel" role="listbox" aria-label="Search results">
      <div className="head">
        <Tabs
          tabs={data.tabs}
          active={activeTab}
          onChange={onTabChange}
          filtered={filtered}
        />
      </div>

      <div className="body">
        {loading ? (
          <div className="loading">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="row skeleton"
                style={{ height: 50, borderRadius: 12 }}
              />
            ))}
          </div>
        ) : filtered.length ? (
          <div className="list">
            {filtered.map((item, i) => (
              <ResultItem
                key={item.id}
                item={item}
                active={activeIndex === i}
                onMouseEnter={() => setActiveIndex(i)}
                onClick={() => onEnter?.(item.id)}
              />
            ))}
          </div>
        ) : (
          <div className="empty">
            <div className="big">No results</div>
            <div className="hint">
              Try a different keyword or remove filters
            </div>
          </div>
        )}
      </div>

      <style jsx="true">{`
        .panel {
          width: min(720px, 86vw);
          margin-top: 10px;
          background: color-mix(in srgb, var(--panel) 72%, black);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-2);
          backdrop-filter: var(--blur);
          animation: pop var(--speed-3) var(--curve) both;
          overflow: clip;
        }
        @keyframes pop {
          from {
            opacity: 0;
            transform: translateY(-6px) scale(0.98);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }
        .head {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 12px;
          border-bottom: 1px solid var(--border);
          gap: 12px;
        }
        .controls {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .body {
          padding: 8px;
        }
        .loading {
          display: grid;
          gap: 8px;
        }
        .list {
          display: grid;
          gap: 4px;
        }
        .empty {
          text-align: center;
          color: var(--text-dim);
          padding: 36px 12px;
        }
        .empty .big {
          font-weight: 600;
          margin-bottom: 6px;
          color: var(--text);
        }
        .row {
          border: 1px solid var(--border);
          background: #1a2030;
        }
      `}</style>
    </div>
  );
}
