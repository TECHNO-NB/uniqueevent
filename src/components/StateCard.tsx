// @ts-nocheck
import Card from "./Card";

export default function StatCard({
  icon,
  label,
  value,
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  sub?: string;
  color: string;
}) {
  return (
    <Card>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: 12,
              color: "#6b6760",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              marginBottom: 10,
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontSize: 32,
              fontWeight: 800,
              color: "#f0ead8",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
          >
            {value}
          </div>
          {sub && (
            <div style={{ fontSize: 12, color: "#555", marginTop: 6 }}>
              {sub}
            </div>
          )}
        </div>
        <div
          style={{
            width: 44,
            height: 44,
            borderRadius: 12,
            background: `${color}18`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color,
          }}
        >
          {icon}
        </div>
      </div>
    </Card>
  );
}