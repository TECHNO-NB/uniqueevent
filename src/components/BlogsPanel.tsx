// @ts-nocheck
"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";
import dynamic from "next/dynamic";

import { Plus, Save, Trash2, Upload, X, Star, ImagePlus } from "lucide-react";

import GoldButton from "./GoldButton";
import Card from "./Card";
import InputField from "./InputField";

const SimpleMDE = dynamic(() => import("react-simplemde-editor"), {
  ssr: false,
});

import "easymde/dist/easymde.min.css";

interface Venue {
  id: number;
  title: string;
  description?: string;
  location?: string;
  max_capacity?: number;
  price?: number;
  service_type?: string;
  photos?: string[];
  features?: string[];
  is_featured?: boolean;
  created_at?: string;
}

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

export default function VenuesPanel({ addToast }) {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [loading, setLoading] = useState(true);

  const [showForm, setShowForm] = useState(false);

  // ───────────────── FORM STATES ─────────────────
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [maxCapacity, setMaxCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [serviceType, setServiceType] = useState("");
  const [features, setFeatures] = useState("");
  const [isFeatured, setIsFeatured] = useState(false);

  // Multiple photos array
  const [photos, setPhotos] = useState<File[]>([]);

  const [search, setSearch] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const fileRef = useRef<HTMLInputElement>(null);

  // ───────────────── FETCH VENUES ─────────────────
  const fetchVenues = async () => {
    try {
      const { data } = await API.get("/weddingservices");

      setVenues(data);
    } catch (err) {
      addToast("Failed to fetch venues", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  // ───────────────── HANDLE PHOTO SELECT ─────────────────
  const handlePhotoSelect = (e: any) => {
    const selectedFiles = Array.from(e.target.files || []);

    setPhotos((prev) => [...prev, ...selectedFiles]);
  };

  // ───────────────── REMOVE SELECTED PHOTO ─────────────────
  const removeSelectedPhoto = (index: number) => {
    const updated = [...photos];

    updated.splice(index, 1);

    setPhotos(updated);
  };

  // ───────────────── CREATE VENUE ─────────────────
  const handleCreate = async () => {
    const token = localStorage.getItem("token");

    if (!title) {
      addToast("Title is required", "error");
      return;
    }

    setSubmitting(true);

    try {
      const fd = new FormData();

      fd.append("title", title);
      fd.append("description", description);
      fd.append("location", location);
      fd.append("max_capacity", maxCapacity);
      fd.append("price", price);
      fd.append("service_type", serviceType);
      fd.append("is_featured", isFeatured ? "1" : "0");

      // Features array
      const featureArray = features
        .split(",")
        .map((f) => f.trim())
        .filter(Boolean);

      fd.append("features", JSON.stringify(featureArray));

      // Photos array
      photos.forEach((photo) => {
        fd.append("photos", photo);
      });

      await API.post("/weddingservices", fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      addToast("Venue created successfully!");

      // Reset
      setTitle("");
      setDescription("");
      setLocation("");
      setMaxCapacity("");
      setPrice("");
      setServiceType("");
      setFeatures("");
      setIsFeatured(false);
      setPhotos([]);
      setShowForm(false);

      fetchVenues();
    } catch (err) {
      console.log(err);

      addToast("Failed to create venue", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // ───────────────── DELETE VENUE ─────────────────
  const handleDelete = async (id: number) => {
    const token = localStorage.getItem("token");

    if (!confirm("Delete this venue?")) return;

    try {
      await API.delete(`/weddingservices/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      addToast("Venue deleted");

      fetchVenues();
    } catch (err) {
      addToast("Delete failed", "error");
    }
  };

  // ───────────────── FILTER ─────────────────
  const filtered = venues.filter((venue) =>
    venue.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div>
      {/* ───────────────── HEADER ───────────────── */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 24,
        }}
      >
        <div>
          <h3 style={{ color: "#f0ead8" }}>Venues</h3>

          <p
            style={{
              color: "#666",
              fontSize: 13,
            }}
          >
            {venues.length} total venues
          </p>
        </div>

        <GoldButton onClick={() => setShowForm(!showForm)}>
          <Plus size={15} />
          New Venue
        </GoldButton>
      </div>

      {/* ───────────────── CREATE FORM ───────────────── */}
      {showForm && (
        <Card style={{ marginBottom: 24 }}>
          <h3
            style={{
              color: "#c9a84c",
              marginBottom: 20,
            }}
          >
            Create Venue
          </h3>

          <InputField
            label="Venue Title"
            value={title}
            onChange={setTitle}
            required
          />

          <InputField
            label="Location"
            value={location}
            onChange={setLocation}
          />

          <InputField
            label="Service Type"
            value={serviceType}
            onChange={setServiceType}
          />

          <InputField
            label="Max Capacity"
            type="number"
            value={maxCapacity}
            onChange={setMaxCapacity}
          />

          <InputField
            label="Price"
            type="number"
            value={price}
            onChange={setPrice}
          />

          <InputField
            label="Features (comma separated)"
            value={features}
            onChange={setFeatures}
          />

          {/* FEATURED */}
          <div
            style={{
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <input
              type="checkbox"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
            />

            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#d8d8d8",
              }}
            >
              <Star size={16} />
              Featured Venue
            </label>
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: 20 }}>
            <label
              style={{
                display: "block",
                marginBottom: 8,
                fontSize: 12,
                color: "#777",
              }}
            >
              Description
            </label>

            <SimpleMDE value={description} onChange={setDescription} />
          </div>

          {/* PHOTO UPLOAD */}
          <div style={{ marginBottom: 20 }}>
            <div
              onClick={() => fileRef.current?.click()}
              style={{
                border: "2px dashed #2c2c2c",
                padding: 25,
                textAlign: "center",
                borderRadius: 10,
                cursor: "pointer",
              }}
            >
              <ImagePlus size={22} />

              <p style={{ marginTop: 10 }}>Upload Venue Photos</p>

              <small style={{ color: "#777" }}>Multiple photos supported</small>
            </div>

            <input
              ref={fileRef}
              hidden
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoSelect}
            />

            {/* PREVIEW ARRAY */}
            {photos.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
                  gap: 14,
                  marginTop: 18,
                }}
              >
                {photos.map((photo, index) => (
                  <div
                    key={index}
                    style={{
                      position: "relative",
                    }}
                  >
                    {/* REMOVE */}
                    <button
                      onClick={() => removeSelectedPhoto(index)}
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        width: 28,
                        height: 28,
                        borderRadius: "50%",
                        border: "none",
                        background: "#ef4444",
                        color: "#fff",
                        cursor: "pointer",
                        zIndex: 2,
                      }}
                    >
                      <X size={14} />
                    </button>

                    {/* IMAGE */}
                    <img
                      src={URL.createObjectURL(photo)}
                      alt=""
                      style={{
                        width: "100%",
                        height: 130,
                        objectFit: "cover",
                        borderRadius: 12,
                        border: "1px solid #2a2a2a",
                      }}
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* SUBMIT */}
          <GoldButton onClick={handleCreate} disabled={submitting}>
            <Save size={15} />

            {submitting ? "Saving..." : "Save Venue"}
          </GoldButton>
        </Card>
      )}

      {/* ───────────────── SEARCH ───────────────── */}
      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search venues..."
        style={{
          width: "100%",
          marginBottom: 20,
          padding: 12,
          borderRadius: 8,
          background: "#121212",
          border: "1px solid #2a2a2a",
          color: "#fff",
        }}
      />

      {/* ───────────────── LIST ───────────────── */}
      {loading ? (
        <p style={{ color: "#777" }}>Loading...</p>
      ) : filtered.length === 0 ? (
        <p style={{ color: "#777" }}>No venues found</p>
      ) : (
        filtered?.map((venue) => (
          <Card
            key={venue.id}
            style={{
              marginBottom: 20,
            }}
          >
            {/* PHOTOS ARRAY */}
            {venue.photos?.length > 0 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill,minmax(140px,1fr))",
                  gap: 12,
                  marginBottom: 18,
                }}
              >
                {venue?.photos?.map((photo, index) => (
                  <img
                    key={index}
                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photo}`}
                    alt=""
                    style={{
                      width: "100%",
                      height: 130,
                      objectFit: "cover",
                      borderRadius: 12,
                    }}
                  />
                ))}
              </div>
            )}

            {/* TITLE */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 10,
              }}
            >
              <h3 style={{ margin: 0 }}>{venue.title}</h3>

              {venue.is_featured && (
                <span
                  style={{
                    background: "#c9a84c",
                    color: "#000",
                    padding: "4px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 700,
                  }}
                >
                  Featured
                </span>
              )}
            </div>

            {/* DESCRIPTION */}
            <p
              style={{
                color: "#b0b0b0",
                marginBottom: 16,
              }}
            >
              {venue.description?.slice(0, 180)}...
            </p>

            {/* META */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 14,
                marginBottom: 16,
                color: "#888",
                fontSize: 14,
              }}
            >
              <span>📍 {venue.location}</span>

              <span>👥 {venue.max_capacity} Guests</span>

              <span>💰 Rs. {venue.price}</span>

              <span>🏷️ {venue.service_type}</span>
            </div>

            {/* FEATURES ARRAY */}
            {/* FEATURES ARRAY */}
            {venue?.features?.length > 0 && (
              <div
                style={{
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 8,
                  marginBottom: 18,
                }}
              >
                {(typeof venue.features === "string"
                  ? JSON.parse(venue.features)
                  : venue.features
                )?.map((feature, index) => (
                  <span
                    key={index}
                    style={{
                      background: "#1d1d1d",
                      color: "#ddd",
                      padding: "6px 12px",
                      borderRadius: 20,
                      fontSize: 12,
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>
            )}

            {/* DELETE */}
            <GoldButton variant="danger" onClick={() => handleDelete(venue.id)}>
              <Trash2 size={14} />
            </GoldButton>
          </Card>
        ))
      )}
    </div>
  );
}
