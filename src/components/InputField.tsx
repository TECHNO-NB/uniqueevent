// @ts-nocheck
export default function InputField({
  label,
  value,
  onChange,
  type = "text",
  placeholder = "",
  textarea = false,
  required = false,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  textarea?: boolean;
  required?: boolean;
}) {
  const base: React.CSSProperties = {
    width: "100%",
    background: "#0d0d0f",
    border: "1px solid #26262a",
    borderRadius: 9,
    padding: "10px 13px",
    fontSize: 13.5,
    color: "#d8d0c4",
    outline: "none",
    fontFamily: "inherit",
    resize: "vertical" as const,
    transition: "border-color 0.2s",
  };
  return (
    <div style={{ marginBottom: 16 }}>
      <label
        style={{
          display: "block",
          fontSize: 12,
          fontWeight: 600,
          color: "#787470",
          marginBottom: 6,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
        {required && <span style={{ color: "#c9a84c", marginLeft: 4 }}>*</span>}
      </label>
      {textarea ? (
        <textarea
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
          onBlur={(e) => (e.target.style.borderColor = "#26262a")}
        />
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={base}
          onFocus={(e) => (e.target.style.borderColor = "#c9a84c")}
          onBlur={(e) => (e.target.style.borderColor = "#26262a")}
        />
      )}
    </div>
  );
}