import React, { useEffect, useRef, useState } from "react";
import { FiSearch, FiX, FiSliders } from "react-icons/fi";
import ToggleSwitch from "./ToggleSwitch";

export default function SearchBar({
  value,
  onChange,
  onFocus,
  onBlur,
  onClear,
  focused,
  placeholder = "Search…",
}) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    Files: true,
    People: true,
    Chats: false,
    Lists: false,
  });

  const toggleFilter = (key) => {
    setFilters((prev) => ({ ...prev, [key]: !prev[key] }));
  };
  useEffect(() => {
    if (focused) ref.current?.focus();
  }, [focused]);

  return (
    <div style={{ position: "relative", width: "min(720px, 86vw)" }}>
      <div className={`shell ${focused ? "focused" : ""}`}>
        <div className="left">
          <FiSearch className="m" aria-hidden="true" />
        </div>
        <input
          ref={ref}
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
          }}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          aria-label="Search"
          name="search"
          type="text"
          autoComplete="off"
          spellCheck="false"
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
            onClick={() => {
              if (value) setOpen(!open);
            }}
            disabled={!value}
            style={{
              opacity: value ? 1 : 0.5,
              pointerEvents: value ? "auto" : "none",
            }}
          >
            <FiSliders />
          </button>
        </div>
      </div>
      {open && value && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            right: 0,
            border: "1px solid var(--border)",
            borderRadius: 8,
            padding: 12,
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            zIndex: 100,
            background: "var(--panel)",
            marginTop: 4,
          }}
        >
          {Object.keys(filters).map((key) => (
            <ToggleSwitch
              key={key}
              label={key}
              checked={filters[key]}
              onChange={() => toggleFilter(key)}
            />
          ))}
        </div>
      )}
      <style jsx="true">{`
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
          display: block !important;
          background: transparent;
          border: 0;
          color: var(--text);
          font-size: 16px;
          padding: 8px;
          width: 100%;
          outline: none !important;
          -webkit-text-fill-color: var(--text);
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
