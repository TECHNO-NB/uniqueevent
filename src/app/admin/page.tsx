// @ts-nocheck
"use client"
import { useState} from "react";
import axios from "axios";
import {
  LayoutDashboard,
  FileText,
  Users,
  MessageSquare,
  Search,
  Bell,
  ChevronRight,
  Menu,
  LogOut,
  AlertCircle,
  CheckCircle2,

} from "lucide-react";
import UsersPanel from "@/components/UsersPanel";
import ContactsPanel from "@/components/ContactPanel";
import BlogsPanel from "@/components/BlogsPanel";
import Dashboard from "@/components/Dashboard";



type Tab = "dashboard" | "blogs" | "contacts" | "users";


// ─── Toast ────────────────────────────────────────────────────────────────────
interface Toast {
  id: number;
  message: string;
  type: "success" | "error";
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: "success" | "error" = "success") => {
    const id = Date.now();
    setToasts((p) => [...p, { id, message, type }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  };

  const navItems: { key: Tab; icon: React.ReactNode; label: string }[] = [
    {
      key: "dashboard",
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
    },
    { key: "blogs", icon: <FileText size={18} />, label: "Blogs" },
    { key: "contacts", icon: <MessageSquare size={18} />, label: "Contacts" },
    { key: "users", icon: <Users size={18} />, label: "Users" },
  ];

  return (
    <div
      className="min-h-screen flex"
      style={{
        background: "#0d0d0f",
        color: "#e8e3d9",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarOpen ? 240 : 68,
          background: "linear-gradient(160deg,#141416 0%,#111113 100%)",
          borderRight: "1px solid #222226",
          transition: "width 0.3s cubic-bezier(.4,0,.2,1)",
          flexShrink: 0,
          display: "flex",
          flexDirection: "column",
          position: "sticky",
          top: 0,
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Logo */}
        <div
          style={{
            padding: "24px 16px 20px",
            borderBottom: "1px solid #1e1e22",
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: "linear-gradient(135deg,#c9a84c,#e8c86e)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}
          >
            <LayoutDashboard size={18} color="#0d0d0f" strokeWidth={2.5} />
          </div>
          {sidebarOpen && (
            <div style={{ overflow: "hidden" }}>
              <div
                style={{
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "-0.02em",
                  color: "#f0ead8",
                  whiteSpace: "nowrap",
                }}
              >
                AdminStudio
              </div>
              <div style={{ fontSize: 11, color: "#6b6760", marginTop: 1 }}>
                Content Manager
              </div>
            </div>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: "12px 10px" }}>
          {navItems.map((item) => (
            <button
              key={item.key}
              onClick={() => setTab(item.key)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: sidebarOpen ? "10px 12px" : "10px 15px",
                borderRadius: 10,
                marginBottom: 4,
                background:
                  tab === item.key
                    ? "linear-gradient(90deg,rgba(201,168,76,0.18),rgba(201,168,76,0.06))"
                    : "transparent",
                border:
                  tab === item.key
                    ? "1px solid rgba(201,168,76,0.2)"
                    : "1px solid transparent",
                color: tab === item.key ? "#c9a84c" : "#787470",
                cursor: "pointer",
                transition: "all 0.2s",
                whiteSpace: "nowrap",
                overflow: "hidden",
              }}
              onMouseEnter={(e) => {
                if (tab !== item.key)
                  (e.currentTarget as HTMLElement).style.color = "#c0b89a";
              }}
              onMouseLeave={(e) => {
                if (tab !== item.key)
                  (e.currentTarget as HTMLElement).style.color = "#787470";
              }}
            >
              <span style={{ flexShrink: 0 }}>{item.icon}</span>
              {sidebarOpen && (
                <span style={{ fontSize: 13.5, fontWeight: 500 }}>
                  {item.label}
                </span>
              )}
              {sidebarOpen && tab === item.key && (
                <ChevronRight
                  size={14}
                  style={{ marginLeft: "auto", opacity: 0.6 }}
                />
              )}
            </button>
          ))}
        </nav>

        {/* Collapse + Logout */}
        <div style={{ padding: "12px 10px", borderTop: "1px solid #1e1e22" }}>
          <button
            onClick={() => setSidebarOpen((p) => !p)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              color: "#555",
              cursor: "pointer",
              marginBottom: 4,
            }}
          >
            <Menu size={18} />
            {sidebarOpen && <span style={{ fontSize: 13 }}>Collapse</span>}
          </button>
          <button
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 12px",
              borderRadius: 10,
              background: "transparent",
              border: "none",
              color: "#555",
              cursor: "pointer",
            }}
          >
            <LogOut size={18} />
            {sidebarOpen && <span style={{ fontSize: 13 }}>Logout</span>}
          </button>
        </div>
      </aside>

      {/* ── Main ────────────────────────────────────────────────────────────── */}
      <main
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          minWidth: 0,
        }}
      >
        {/* Topbar */}
        <header
          style={{
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 28px",
            borderBottom: "1px solid #1c1c1f",
            background: "rgba(13,13,15,0.8)",
            backdropFilter: "blur(12px)",
            position: "sticky",
            top: 0,
            zIndex: 50,
          }}
        >
          <div>
            <h1
              style={{
                fontSize: 17,
                fontWeight: 700,
                color: "#f0ead8",
                letterSpacing: "-0.02em",
                margin: 0,
              }}
            >
              {navItems.find((n) => n.key === tab)?.label}
            </h1>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ position: "relative" }}>
              <Search
                size={15}
                style={{
                  position: "absolute",
                  left: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  color: "#555",
                }}
              />
              <input
                placeholder="Search…"
                style={{
                  background: "#18181b",
                  border: "1px solid #26262a",
                  borderRadius: 8,
                  padding: "7px 12px 7px 32px",
                  fontSize: 13,
                  color: "#c8c0b4",
                  outline: "none",
                  width: 200,
                }}
              />
            </div>
            <button
              style={{
                position: "relative",
                background: "#18181b",
                border: "1px solid #26262a",
                borderRadius: 8,
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#787470",
              }}
            >
              <Bell size={16} />
              <span
                style={{
                  position: "absolute",
                  top: 6,
                  right: 6,
                  width: 7,
                  height: 7,
                  background: "#c9a84c",
                  borderRadius: "50%",
                  border: "1.5px solid #0d0d0f",
                }}
              />
            </button>
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "linear-gradient(135deg,#c9a84c,#e8c86e)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 13,
                fontWeight: 700,
                color: "#0d0d0f",
                cursor: "pointer",
              }}
            >
              A
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div style={{ flex: 1, padding: "28px", overflowY: "auto" }}>
          {tab === "dashboard" && <Dashboard setTab={setTab} />}
          {tab === "blogs" && <BlogsPanel addToast={addToast} />}
          {tab === "contacts" && <ContactsPanel addToast={addToast} />}
          {tab === "users" && <UsersPanel addToast={addToast} />}
        </div>
      </main>

      {/* Toast container */}
      <div
        style={{
          position: "fixed",
          bottom: 24,
          right: 24,
          display: "flex",
          flexDirection: "column",
          gap: 10,
          zIndex: 9999,
        }}
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 10,
              background: t.type === "success" ? "#15281f" : "#2a1515",
              border: `1px solid ${t.type === "success" ? "#2a5c3a" : "#5c2a2a"}`,
              color: t.type === "success" ? "#6fcf97" : "#eb5757",
              fontSize: 13,
              fontWeight: 500,
              backdropFilter: "blur(8px)",
              animation: "slideIn 0.3s ease",
              minWidth: 260,
              boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            }}
          >
            {t.type === "success" ? (
              <CheckCircle2 size={16} />
            ) : (
              <AlertCircle size={16} />
            )}
            {t.message}
          </div>
        ))}
      </div>

      <style>{`
        @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: translateX(0); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #2a2a2f; border-radius: 10px; }
        input::placeholder { color: #454540; }
        textarea::placeholder { color: #454540; }
      `}</style>
    </div>
  );
}



