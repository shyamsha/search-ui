import React, { useEffect, useRef } from "react";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  focused,
  placeholder = "Search…",
  onToggleFilters,
}) {
  const ref = useRef(null);

  useEffect(() => {
    if (focused) ref.current?.focus();
  }, [focused]);

  return (
    <div className={`shell ${focused ? "focused" : ""}`}>
      <div className="left">
        <FiSearch className="m" aria-hidden="true" />
      </div>
      <input
        ref={ref}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        aria-label="Search"
      />
      <div className="right">
        {value && (
          <button
            className="ghost"
            aria-label="Clear"
            onMouseDown={(e) => e.preventDefault()}
            onClick={onClear}
          >
            <FiX />
          </button>
        )}
        <button
          className="ghost"
          aria-label="Filters"
          onMouseDown={(e) => e.preventDefault()}
          onClick={onToggleFilters}
        >
          <FiSliders />
        </button>
      </div>
      <style jsx>{`
        .shell {
          display: grid;
          grid-template-columns: 36px 1fr auto;
          align-items: center;
          width: min(720px, 86vw);
          background: color-mix(in srgb, var(--panel) 65%, black);
          border: 1px solid var(--border);
          border-radius: var(--radius);
          box-shadow: var(--shadow-1);
          backdrop-filter: var(--blur);
          transition: transform var(--speed-2) var(--curve),
            border-color var(--speed-2) var(--curve),
            box-shadow var(--speed-3) var(--curve);
          padding: 10px 12px;
        }
        .shell.focused {
          transform: translateY(-1px);
          border-color: color-mix(in srgb, var(--brand) 32%, var(--border));
          box-shadow: var(--shadow-2);
        }
        .left {
          display: grid;
          place-items: center;
          color: var(--muted);
        }
        .right {
          display: inline-flex;
          gap: 8px;
          margin-left: 8px;
        }
        .ghost {
          appearance: none;
          background: transparent;
          border: 1px solid var(--border);
          color: var(--text-dim);
          padding: 8px;
          border-radius: 10px;
          display: grid;
          place-items: center;
          transition: all var(--speed-2) var(--curve);
        }
        .ghost:hover {
          color: var(--text);
          border-color: color-mix(in srgb, var(--brand) 35%, var(--border));
          background: color-mix(in srgb, var(--brand) 10%, var(--panel-2));
        }
        input {
          background: transparent;
          border: 0;
          color: var(--text);
          font-size: 16px;
          padding: 8px;
          width: 100%;
          outline: none;
        }
        input::placeholder {
          color: var(--muted);
          transition: transform var(--speed-3) var(--curve),
            opacity var(--speed-3) var(--curve);
        }
        .shell.focused input::placeholder {
          opacity: 0.6;
          transform: translateX(2px);
        }
      `}</style>
    </div>
  );
}
