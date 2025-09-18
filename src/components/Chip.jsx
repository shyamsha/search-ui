import React from "react";

export default function Chip({ label, active, onClick }) {
  return (
    <button className="chip" aria-pressed={active} onClick={onClick}>
      <span>{label}</span>
      <style jsx>{`
        .chip {
          background: ${active
            ? "color-mix(in srgb, var(--brand) 18%, var(--chip))"
            : "var(--chip)"};
          color: ${active ? "var(--text)" : "var(--text-dim)"};
          border: 1px solid
            ${active
              ? "color-mix(in srgb, var(--brand) 40%, var(--border))"
              : "var(--border)"};
          padding: 6px 12px;
          border-radius: 999px;
          font-size: 12px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          transition: all var(--speed-2) var(--curve);
        }
        .chip:hover {
          border-color: color-mix(in srgb, var(--brand) 35%, var(--border));
          transform: translateY(-1px);
        }
        .chip:active {
          transform: translateY(0);
        }
      `}</style>
    </button>
  );
}
