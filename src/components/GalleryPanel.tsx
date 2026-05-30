// @ts-nocheck
"use client"
import { useState, useEffect, useRef } from "react";
import axios from "axios";
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


interface Gallery {
  id: number;
  title: string;
  description: string;
  image?: string;
  created_at?: string;
}

// ─── API Base ────────────────────────────────────────────────────────────────
const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});


function Card({
  children,
  style = {},
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <div
      style={{
        background: "#111113",
        border: "1px solid #1e1e22",
        borderRadius: 14,
        padding: 20,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function GoldButton({
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

export default function GalleryPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [gallery, setGallery] = useState<Gallery[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Gallery | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetch = async () => {
    try {
        console.log("Backend URL:", process.env.NEXT_PUBLIC_BACKEND_URL);
      const { data } = await API.get("/gallery");
      setGallery(data);
    } catch {
      addToast("Failed to load Gallery", "error");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetch();
  }, []);

  const openEdit = (s: Gallery) => {
    setEditing(s);
    setShowForm(true);
  };
  const closeForm = () => {
    setShowForm(false);
    setEditing(null);
    setFile(null);
  };

  const handleSubmit = async () => {
 
    setSubmitting(true);
    try {
      const fd = new FormData();
      if (file) fd.append("image", file);
      if (editing) {
        await API.put(`/gallery/${editing.id}`, fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addToast("Gallery updated!");
      } else {
        await API.post("/gallery", fd, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        addToast("Gallery created!");
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
    if (!confirm("Delete this Gallery?")) return;
    try {
      await API.delete(`/gallery/${id}`);
      addToast("gallery deleted");
      fetch();
    } catch {
      addToast("Delete failed", "error");
    }
  };

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
            Gallery
          </h3>
          <p style={{ color: "#5a5750", fontSize: 13, marginTop: 4 }}>
            {gallery.length} total Gallery
          </p>
        </div>
        <GoldButton
          onClick={() => {
            closeForm();
            setShowForm(true);
          }}
        >
          <Plus size={15} /> Add Gallery
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
              {editing ? "Edit Gallery" : "Create Gallery"}
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
              Image
            </label>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed #26262a",
                borderRadius: 10,
                padding: "20px",
                textAlign: "center",
                cursor: "pointer",
              }}
            >
              <Upload size={22} style={{ color: "#555", marginBottom: 8 }} />
              <p style={{ color: "#555", fontSize: 13, margin: 0 }}>
                {file
                  ? file.name
                  : editing?.image
                    ? "Replace image (optional)"
                    : "Upload image"}
              </p>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />
            </div>
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

      {loading ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          Loading…
        </div>
      ) : gallery.length === 0 ? (
        <div style={{ textAlign: "center", color: "#555", padding: 60 }}>
          No Gallery yet
        </div>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))",
            gap: 16,
          }}
        >
          {gallery?.map((s) => (
            <Card key={s.id}>
              <div
                style={{
                  width: "100%",
                  height: 140,
                  borderRadius: 10,
                  background: "#0d0d0f",
                  marginBottom: 14,
                  overflow: "hidden",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "1px solid #1a1a1e",
                }}
              >
                {s.image ? (
                  <img
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${s.image}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                ) : (
                  <Briefcase size={32} color="#2a2a2f" />
                )}
              </div>
      
              <div style={{ display: "flex", gap: 8 }}>
                <GoldButton variant="ghost" onClick={() => openEdit(s)}>
                  <Edit3 size={14} /> Edit
                </GoldButton>
                <GoldButton variant="danger" onClick={() => handleDelete(s.id)}>
                  <Trash2 size={14} />
                </GoldButton>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}