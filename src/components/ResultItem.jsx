import React from "react";
import { FiFileText, FiUser, FiFolder } from "react-icons/fi";

const iconMap = {
  People: FiUser,
  Files: FiFileText,
  Projects: FiFolder,
};

export default function ResultItem({ item, active, onClick, onMouseEnter }) {
  const Icon = iconMap[item.type] || FiFileText;
  return (
    <div
      role="option"
      aria-selected={active}
      tabIndex={-1}
      className={`result ${active ? "active" : ""}`}
      onMouseEnter={onMouseEnter}
      onMouseDown={onClick}
    >
      {item.avatar ? (
        <img className="avatar" src={item.avatar} alt="" />
      ) : (
        <div className="icon">
          <Icon size={18} />
        </div>
      )}
      <div className="meta">
        <div className="row">
          <span className="title">{item.title}</span>
          {item.badge && <span className="badge">{item.badge}</span>}
        </div>
        <div className="sub">{item.subtitle}</div>
      </div>
      <style jsx>{`
        .result {
          display: grid;
          grid-template-columns: 28px 1fr;
          gap: 12px;
          align-items: center;
          padding: 10px 12px;
          border-radius: 12px;
          border: 1px solid transparent;
          transition: transform var(--speed-1) var(--curve),
            background var(--speed-2) var(--curve),
            border-color var(--speed-2) var(--curve);
          cursor: pointer;
        }
        .result:hover {
          background: color-mix(in srgb, var(--panel-2) 70%, black);
          border-color: var(--border);
          transform: translateY(-1px);
        }
        .result:active {
          transform: translateY(0);
        }
        .result.active {
          background: color-mix(in srgb, var(--brand) 12%, var(--panel-2));
          border-color: color-mix(in srgb, var(--brand) 35%, var(--border));
        }
        .icon,
        .avatar {
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: grid;
          place-items: center;
          color: var(--brand-2);
          background: color-mix(in srgb, var(--brand) 10%, var(--panel-2));
          border: 1px solid color-mix(in srgb, var(--brand) 30%, var(--border));
        }
        .avatar {
          object-fit: cover;
          padding: 0;
        }
        .meta {
          min-width: 0;
        }
        .row {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .title {
          color: var(--text);
          font-weight: 600;
          font-size: 14px;
        }
        .badge {
          font-size: 10px;
          padding: 2px 6px;
          border-radius: 999px;
          color: color-mix(in srgb, var(--text) 90%, white);
          background: color-mix(in srgb, var(--accent) 25%, var(--panel-2));
          border: 1px solid color-mix(in srgb, var(--accent) 30%, var(--border));
        }
        .sub {
          color: var(--muted);
          font-size: 12px;
          margin-top: 2px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      `}</style>
    </div>
  );
}
