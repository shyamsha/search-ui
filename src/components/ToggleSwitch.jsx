const ToggleSwitch = ({ label, checked, onChange }) => (
  <label
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      marginBottom: 8,
    }}
  >
    <span>{label}</span>
    <div
      onClick={() => onChange(!checked)}
      style={{
        width: 40,
        height: 20,
        borderRadius: 20,
        background: checked ? "var(--brand)" : "var(--text-dim)",
        cursor: "pointer",
        position: "relative",
        transition: "background 0.3s",
      }}
    >
      <div
        style={{
          width: 18,
          height: 18,
          borderRadius: "50%",
          background: "var(--text)",
          position: "absolute",
          top: 1,
          left: checked ? 20 : 2,
          transition: "left 0.3s",
        }}
      />
    </div>
  </label>
);

export default ToggleSwitch;
