// @ts-nocheck
"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import {
  LayoutDashboard,
  FileText,
  Users,
  Briefcase,
  MessageSquare,
  Plus,
  Trash2,
  Edit3,
  X,
  Upload,
  Search,
  Bell,
  ChevronRight,
  Eye,
  TrendingUp,
  Menu,
  LogOut,
  Save,
  Image,
  Mail,
  Phone,
  Wrench,
  Clock,
  AlertCircle,
  CheckCircle2,
  ImageIcon,
} from "lucide-react";
import GoldButton from "@/components/GoldButton";
import Card from "./Card";
import InputField from "./InputField";

// ─── API Base ────────────────────────────────────────────────────────────────
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

type Role = 'user' | 'admin'

interface User {
  id: number;
  name: string;
  email: string;
  password?: string;
  role: Role;
  created_at?: string;
}

export default function UsersPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<User | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [search, setSearch] = useState("");

  const fetch = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUsers(data);
    } catch {
      addToast("Failed to load users", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const openEdit = (u: User) => {
    setEditing(u);
    setName(u.name);
    setEmail(u.email);
    setPassword(u.password);
    setRole(u.role);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setName("");
    setEmail("");
    setPassword("");
    setRole("");
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("token");
    if (!name || !email) {
      addToast("Name and email required", "error");
      return;
    }
    setSubmitting(true);
    try {
      if (editing) {
        await API.put(
          `/users/${editing.id}`,
          { name, email, password,role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        addToast("User updated!");
      } else {
        await API.post(
          "/users/register",
          { name, email, password,role },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        addToast("User created!");
      }
      closeForm();
      fetch();
    } catch {
      addToast("Operation failed", "error");
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");
    if (!confirm("Delete this user?")) return;
    try {
      await API.delete(`/users/${id}`,{
          headers:{
            Authorization:`Bearer ${token}`
          }
        });
      addToast("User deleted");
      fetch();
    } catch {
      addToast("Delete failed", "error");
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase()),
  );

  const avatarColors = ["#c9a84c", "#6fcf97", "#56b2e4", "#bb87fa", "#f09060"];

  return (
    <div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 18,
              fontWeight: 700,
              color: "#f0ead8",
              margin: 0,
            }}
          >
            Users
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {users.length} registered users
          </p>
        </div>
        <GoldButton
          onClick={() => {
            closeForm();
            setShowForm(true);
          }}
        >
          <Plus size={15} /> Add User
        </GoldButton>
      </div>

      {showForm && (
        <Card
          style={{ marginBottom: 24, border: "1px solid rgba(201,168,76,0.2)" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <span style={{ fontSize: 14, fontWeight: 700, color: "#c9a84c" }}>
              {editing ? "Edit User" : "Create User"}
            </span>
            <button
              onClick={closeForm}
              style={{
                background: "none",
                border: "none",
                color: "#555",
                cursor: "pointer",
              }}
            >
              <X size={18} />
            </button>
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}
          >
            <InputField
              label="Full Name"
              value={name}
              onChange={setName}
              placeholder="John Doe"
              required
            />
            <InputField
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              placeholder="john@example.com"
              required
            />
          </div>
          <InputField
            label="Password"
            value={password}
            onChange={setPassword}
            type="password"
            placeholder={
              editing ? "Leave blank to keep current" : "Set password…"
            }
          />
          <div className="flex flex-col mb-3 max-w-40">
            <label className="text-gray-500">Select Role <span className="text-yellow-400">*</span></label>
            <select value={role} className="border-2 py-1 mt-2 rounded-md border-gray-500/30" onChange={(e)=>setRole(e.target.value)}>
              <option>---Select Role---</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <GoldButton onClick={handleSubmit} disabled={submitting}>
              <Save size={15} />{" "}
              {submitting ? "Saving…" : editing ? "Update" : "Create"}
            </GoldButton>
            <GoldButton onClick={closeForm} variant="ghost">
              <X size={15} /> Cancel
            </GoldButton>
          </div>
        </Card>
      )}

      <div style={{ position: "relative", marginBottom: 20 }}>
        <Search
          size={15}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#555",
          }}
        />
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users…"
          style={{
            width: "100%",
            background: "#111113",
            border: "1px solid #1e1e22",
            borderRadius: 10,
            padding: "10px 12px 10px 36px",
            fontSize: 13,
            color: "#c8c0b4",
            outline: "none",
          }}
        />
      </div>

      {loading ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          Loading…
        </div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          No users found
        </div>
      ) : (
        <Card style={{ padding: 0, overflow: "hidden" }}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid #1a1a1e" }}>
                {["User", "Email", "Actions"].map((h) => (
                  <th
                    key={h}
                    style={{
                      padding: "14px 20px",
                      textAlign: "left",
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#555",
                      textTransform: "uppercase",
                      letterSpacing: "0.07em",
                    }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u, i) => (
                <tr
                  key={u.id}
                  style={{ borderBottom: "1px solid #16161a" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#141416")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "transparent")
                  }
                >
                  <td style={{ padding: "14px 20px" }}>
                    <div
                      style={{ display: "flex", alignItems: "center", gap: 12 }}
                    >
                      <div
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: "50%",
                          background: `${avatarColors[i % 5]}22`,
                          border: `1.5px solid ${avatarColors[i % 5]}44`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 14,
                          fontWeight: 700,
                          color: avatarColors[i % 5],
                          flexShrink: 0,
                        }}
                      >
                        {u.name?.[0]?.toUpperCase()}
                      </div>
                      <span
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          color: "#e0d8cc",
                        }}
                      >
                        {u.name}
                      </span>
                    </div>
                  </td>
                  <td
                    style={{
                      padding: "14px 20px",
                      fontSize: 13.5,
                      color: "#787470",
                    }}
                  >
                    {u.email}
                  </td>
                  <td style={{ padding: "14px 20px" }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <GoldButton variant="ghost" onClick={() => openEdit(u)}>
                        <Edit3 size={14} />
                      </GoldButton>
                      <GoldButton
                        variant="danger"
                        onClick={() => handleDelete(u.id)}
                      >
                        <Trash2 size={14} />
                      </GoldButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      )}
    </div>
  );
}
