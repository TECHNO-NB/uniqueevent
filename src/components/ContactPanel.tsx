// @ts-nocheck
"use client";

import {
  Search,
  Trash2,
  X,
  Phone,
  Users,
  MapPin,
  MessageSquare,
} from "lucide-react";
import { useEffect, useState } from "react";
import GoldButton from "./GoldButton";
import axios from "axios";
import Card from "./Card";

interface Contact {
  id: number;
  phone: string;
  message: string;
  bridename: string;
  groomname: string;
  location: string;
}

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

export default function ContactsPanel({
  addToast,
}: {
  addToast: (m: string, t?: "success" | "error") => void;
}) {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<Contact | null>(null);

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("token")
      : null;

  const fetchContacts = async () => {
    try {
      const { data } = await API.get("/contacts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setContacts(data);
    } catch (error) {
      addToast("Failed to load contacts", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this contact?")) return;

    try {
      await API.delete(`/contacts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      addToast("Contact deleted", "success");

      fetchContacts();

      if (selected?.id === id) {
        setSelected(null);
      }
    } catch (error) {
      addToast("Delete failed", "error");
    }
  };

  const filtered = contacts.filter(
    (c) =>
      c?.bridename?.toLowerCase().includes(search.toLowerCase()) ||
      c?.groomname?.toLowerCase().includes(search.toLowerCase()) ||
      c?.phone?.toLowerCase().includes(search.toLowerCase()) ||
      c?.location?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      {/* Header */}
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
            Contact Inquiries
          </h3>

          <p
            style={{
              color: "#5a5750",
              fontSize: 13,
              marginTop: 4,
            }}
          >
            {contacts.length} total inquiries
          </p>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          position: "relative",
          marginBottom: 20,
        }}
      >
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
          placeholder="Search contacts…"
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

      {/* Layout */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: selected ? "1fr 1fr" : "1fr",
          gap: 16,
        }}
      >
        {/* Left Side */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 12,
          }}
        >
          {loading ? (
            <div
              style={{
                textAlign: "center",
                color: "#555",
                padding: 60,
              }}
            >
              Loading...
            </div>
          ) : filtered.length === 0 ? (
            <div
              style={{
                textAlign: "center",
                color: "#555",
                padding: 60,
              }}
            >
              No contacts found
            </div>
          ) : (
            filtered.map((c) => (
              <Card
                key={c.id}
                onClick={() =>
                  setSelected(selected?.id === c.id ? null : c)
                }
                style={{
                  cursor: "pointer",
                  border:
                    selected?.id === c.id
                      ? "1px solid rgba(201,168,76,0.35)"
                      : "1px solid #1e1e22",
                  transition: "all 0.2s",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
                  {/* Left Content */}
                  <div
                    style={{
                      display: "flex",
                      gap: 12,
                      width: "100%",
                    }}
                  >
                    {/* Avatar */}
                    <div
                      style={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        background:
                          "linear-gradient(135deg,#c9a84c22,#c9a84c44)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "#c9a84c",
                        fontWeight: 700,
                        flexShrink: 0,
                      }}
                    >
                      {c.bridename?.[0]?.toUpperCase()}
                    </div>

                    {/* Data */}
                    <div
                      style={{
                        flex: 1,
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 6,
                        }}
                      >
                        <p
                          style={{
                            color: "#d8d0c4",
                            fontSize: 13,
                            margin: 0,
                          }}
                        >
                          <strong>Bride Name:</strong>{" "}
                          {c.bridename}
                        </p>

                        <p
                          style={{
                            color: "#d8d0c4",
                            fontSize: 13,
                            margin: 0,
                          }}
                        >
                          <strong>Groom Name:</strong>{" "}
                          {c.groomname}
                        </p>

                        <p
                          style={{
                            color: "#d8d0c4",
                            fontSize: 13,
                            margin: 0,
                          }}
                        >
                          <strong>Phone:</strong> {c.phone}
                        </p>

                        <p
                          style={{
                            color: "#d8d0c4",
                            fontSize: 13,
                            margin: 0,
                          }}
                        >
                          <strong>Location:</strong>{" "}
                          {c.location}
                        </p>

                        <p
                          style={{
                            color: "#d8d0c4",
                            fontSize: 13,
                            margin: 0,
                          }}
                        >
                          <strong>Message:</strong>{" "}
                          {c.message}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Delete Button */}
                  <GoldButton
                    variant="danger"
                    onClick={(e) => {
                      e?.stopPropagation?.();
                      handleDelete(c.id);
                    }}
                  >
                    <Trash2 size={13} />
                  </GoldButton>
                </div>
              </Card>
            ))
          )}
        </div>

        {/* Right Detail Panel */}
        {selected && (
          <Card
            style={{
              border: "1px solid rgba(201,168,76,0.2)",
              alignSelf: "flex-start",
              position: "sticky",
              top: 20,
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: 20,
              }}
            >
              <span
                style={{
                  fontSize: 14,
                  fontWeight: 700,
                  color: "#c9a84c",
                }}
              >
                Contact Detail
              </span>

              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#555",
                  cursor: "pointer",
                }}
              >
                <X size={16} />
              </button>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}
            >
              {[
                {
                  icon: <Users size={14} />,
                  label: "Bride Name",
                  val: selected.bridename,
                },
                {
                  icon: <Users size={14} />,
                  label: "Groom Name",
                  val: selected.groomname,
                },
                {
                  icon: <Phone size={14} />,
                  label: "Phone",
                  val: selected.phone,
                },
                {
                  icon: <MapPin size={14} />,
                  label: "Location",
                  val: selected.location,
                },
                {
                  icon: <MessageSquare size={14} />,
                  label: "Message",
                  val: selected.message,
                },
              ].map((row) => (
                <div
                  key={row.label}
                  style={{
                    display: "flex",
                    gap: 12,
                    alignItems: "center",
                  }}
                >
                  <div
                    style={{
                      width: 32,
                      height: 32,
                      borderRadius: 8,
                      background: "#1a1a1e",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#c9a84c",
                      flexShrink: 0,
                    }}
                  >
                    {row.icon}
                  </div>

                  <div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#555",
                        textTransform: "uppercase",
                        letterSpacing: "0.05em",
                        marginBottom: 2,
                      }}
                    >
                      {row.label}
                    </div>

                    <div
                      style={{
                        fontSize: 13.5,
                        color: "#d8d0c4",
                      }}
                    >
                      {row.val}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}