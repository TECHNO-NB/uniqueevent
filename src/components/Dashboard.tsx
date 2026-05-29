// @ts-nocheck
"use client"

import axios from "axios";
import { useEffect, useState } from "react";
import {
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  ChevronRight,
  Eye,
  TrendingUp
} from "lucide-react";
import StatCard from "./StateCard";
import Card from "./Card";

// ─── API Base ────────────────────────────────────────────────────────────────
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

type Tab = "dashboard" | "blogs" | "contacts"  | "users";

// ─── Dashboard ────────────────────────────────────────────────────────────────
export default function Dashboard({ setTab }: { setTab: (t: Tab) => void }) {
  const [counts, setCounts] = useState({
    blogs: 0,
    contacts: 0,
    users: 0,
  });

  useEffect(() => {
    const token=localStorage.getItem("token")
    Promise.allSettled([
      API.get("/blogs"),
      API.get("/contacts",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }),
      API.get("/users",{
        headers:{
          Authorization:`Bearer ${token}`
        }
      }),
    ]).then(([b, c, u]) => {
      setCounts({
        blogs: b.status === "fulfilled" ? b.value.data.length : 0,
        contacts: c.status === "fulfilled" ? c.value.data.length : 0,
        users: u.status === "fulfilled" ? u.value.data.length : 0,
      });
    });
  }, []);

  const quickActions: { label: string; tab: Tab; icon: React.ReactNode }[] = [
    { label: "New Blog Post", tab: "blogs", icon: <FileText size={16} /> },
    {
      label: "View Contacts",
      tab: "contacts",
      icon: <MessageSquare size={16} />,
    },
    { label: "Manage Users", tab: "users", icon: <Users size={16} /> },
  ];

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2
          style={{
            fontSize: 24,
            fontWeight: 800,
            color: "#f0ead8",
            letterSpacing: "-0.04em",
            margin: 0,
          }}
        >
          Welcome back 👋
        </h2>
        <p style={{ color: "#5a5750", marginTop: 6, fontSize: 14 }}>
          Here's what's happening with your content today.
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(200px,1fr))",
          gap: 16,
          marginBottom: 28,
        }}
      >
        <StatCard
          icon={<FileText size={20} />}
          label="Blog Posts"
          value={counts.blogs}
          sub="Total published"
          color="#c9a84c"
        />
        <StatCard
          icon={<MessageSquare size={20} />}
          label="Contacts"
          value={counts.contacts}
          sub="Inquiries received"
          color="#6fcf97"
        />
        <StatCard
          icon={<Users size={20} />}
          label="Users"
          value={counts.users}
          sub="Registered accounts"
          color="#bb87fa"
        />
      </div>

      <div className="grid  md:grid-cols-2" >
        <Card>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#c9a84c",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <TrendingUp size={16} /> Quick Actions
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {quickActions.map((a) => (
              <button
                key={a.tab}
                onClick={() => setTab(a.tab)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  borderRadius: 10,
                  background: "#16161a",
                  border: "1px solid #222226",
                  cursor: "pointer",
                  color: "#c0b89a",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#c9a84c33";
                  (e.currentTarget as HTMLElement).style.background = "#1b1b1f";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "#222226";
                  (e.currentTarget as HTMLElement).style.background = "#16161a";
                }}
              >
                <span
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    fontSize: 13.5,
                    fontWeight: 500,
                  }}
                >
                  {a.icon} {a.label}
                </span>
                <ChevronRight size={15} style={{ color: "#444" }} />
              </button>
            ))}
          </div>
        </Card>

        <Card>
          <div
            style={{
              fontWeight: 700,
              fontSize: 14,
              color: "#c9a84c",
              marginBottom: 16,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Eye size={16} /> Platform Overview
          </div>
          {[
            {
              label: "Blog Posts",
              val: counts.blogs,
              total: Math.max(counts.blogs, 10),
              color: "#c9a84c",
            },
            {
              label: "Contacts",
              val: counts.contacts,
              total: Math.max(counts.contacts, 10),
              color: "#6fcf97",
            },
            {
              label: "Users",
              val: counts.users,
              total: Math.max(counts.users, 10),
              color: "#bb87fa",
            },
          ].map((s) => (
            <div key={s.label} style={{ marginBottom: 14 }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: 12.5,
                  marginBottom: 6,
                  color: "#8a8480",
                }}
              >
                <span>{s.label}</span>
                <span style={{ color: s.color, fontWeight: 700 }}>{s.val}</span>
              </div>
              <div
                style={{ height: 5, background: "#1e1e22", borderRadius: 99 }}
              >
                <div
                  style={{
                    height: "100%",
                    borderRadius: 99,
                    background: s.color,
                    width: `${Math.min((s.val / s.total) * 100, 100)}%`,
                    transition: "width 1s ease",
                  }}
                />
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}