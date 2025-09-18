import React from "react";

export default function Toggle({ checked, onChange, label }) {
  return (
    <label className="toggle">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        aria-label={label}
      />
      <span className="track">
        <span className="thumb" />
      </span>
      <span className="label">{label}</span>
      <style jsx="true">{`
        .toggle {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          color: var(--text-dim);
          font-size: 12px;
        }
        input {
          display: none;
        }
        .track {
          width: 36px;
          height: 22px;
          border-radius: 999px;
          background: color-mix(in srgb, var(--panel-2) 70%, black);
          border: 1px solid var(--border);
          position: relative;
          transition: background var(--speed-2) var(--curve),
            border-color var(--speed-2) var(--curve);
        }
        .thumb {
          position: absolute;
          top: 50%;
          left: 4px;
          width: 14px;
          height: 14px;
          transform: translate(0, -50%);
          background: white;
          border-radius: 50%;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.35);
          transition: transform var(--speed-2) var(--curve),
            background var(--speed-2) var(--curve);
        }
        input:checked + .track {
          background: color-mix(in srgb, var(--brand) 35%, var(--panel-2));
          border-color: color-mix(in srgb, var(--brand) 50%, var(--border));
        }
        input:checked + .track .thumb {
          transform: translate(14px, -50%);
          background: #eef5ff;
        }
      `}</style>
    </label>
  );
}
