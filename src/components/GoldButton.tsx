// @ts-nocheck

export default function GoldButton({
  children,
  onClick,
  disabled = false,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "danger" | "ghost";
}) {
  const styles: Record<string, React.CSSProperties> = {
    primary: {
      background: "linear-gradient(135deg,#c9a84c,#ddb85e)",
      color: "#0d0d0f",
      border: "none",
    },
    danger: {
      background: "rgba(235,87,87,0.12)",
      color: "#eb5757",
      border: "1px solid rgba(235,87,87,0.25)",
    },
    ghost: {
      background: "rgba(255,255,255,0.04)",
      color: "#a09880",
      border: "1px solid #26262a",
    },
  };
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: "9px 18px",
        borderRadius: 9,
        fontSize: 13,
        fontWeight: 600,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.5 : 1,
        display: "flex",
        alignItems: "center",
        gap: 7,
        transition: "all 0.2s",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </button>
  );
}