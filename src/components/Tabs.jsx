import React from "react";

export default function Tabs({ tabs, active, onChange }) {
  return (
    <div className="tabs" role="tablist" aria-label="Result categories">
      {tabs.map((t) => (
        <button
          role="tab"
          aria-selected={active === t}
          key={t}
          className={`tab ${active === t ? "active" : ""}`}
          onClick={() => onChange(t)}
        >
          {t}
        </button>
      ))}
      <style jsx>{`
        .tabs {
          display: flex;
          gap: 8px;
          background: color-mix(in srgb, var(--panel) 70%, black);
          border: 1px solid var(--border);
          padding: 6px;
          border-radius: var(--radius-sm);
        }
        .tab {
          appearance: none;
          background: transparent;
          border: 0;
          color: var(--text-dim);
          padding: 8px 12px;
          border-radius: 10px;
          font-weight: 500;
          transition: color var(--speed-2) var(--curve),
            background var(--speed-2) var(--curve);
        }
        .tab:hover {
          color: var(--text);
        }
        .tab.active {
          color: var(--text);
          background: color-mix(in srgb, var(--brand) 15%, var(--panel-2));
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </div>
  );
}
