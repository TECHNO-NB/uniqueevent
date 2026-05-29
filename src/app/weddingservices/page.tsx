// @ts-nocheck
"use client";

import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  ChevronRight,
  ImageOff,
} from "lucide-react";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

// ───────────────── API ─────────────────

const API = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1`,
});

// ───────────────── TYPES ─────────────────

export interface ServiceListing {
  id: string | number;
  title: string;
  description: string;
  location: string;
  max_capacity: number;
  price: number;
  service_type: string;
  photos: string[];
  features: string[];
  is_featured: boolean;
  created_at: string;
}

// ───────────────── HELPERS ─────────────────

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// ───────────────── CARD ─────────────────

interface ServiceCardProps {
  listing: ServiceListing;
  index?: number;
}

export function ServiceCard({
  listing,
  index = 0,
}: ServiceCardProps) {
  const [imgError, setImgError] = useState(false);
  const [hovered, setHovered] = useState(false);

  const navigate = useRouter();

  // FIXED IMAGE
  const primaryPhoto =
    listing.photos?.length > 0
      ? `${process.env.NEXT_PUBLIC_BACKEND_URL}/${listing.photos[0]}`
      : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="
        group relative flex flex-col rounded-2xl overflow-hidden 
        bg-white dark:bg-neutral-900
        border border-neutral-100 dark:border-neutral-800
        shadow-[0_2px_12px_rgba(0,0,0,0.06)]
        hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)]
        transition-shadow duration-300 cursor-pointer
      "
    >
      {/* IMAGE */}
      <div className="relative h-52 w-full overflow-hidden bg-neutral-100 dark:bg-neutral-800">
        {primaryPhoto && !imgError ? (
          <>
            <Image
              src={primaryPhoto}
              alt={listing.title}
              fill
              unoptimized
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="
                object-cover transition-transform duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                group-hover:scale-105
              "
              onError={() => setImgError(true)}
            />

            <div className="absolute inset-0 bg-linear-to-t from-black/30 via-transparent to-transparent" />
          </>
        ) : (
          <div
            className="
              flex h-full w-full items-center justify-center
              text-neutral-300 dark:text-neutral-600
            "
          >
            <ImageOff size={36} strokeWidth={1.25} />
          </div>
        )}

        {/* PHOTO COUNT */}
        {listing.photos?.length > 1 && (
          <span
            className="
              absolute bottom-3 right-3 flex items-center gap-1
              rounded-full bg-black/50 backdrop-blur-sm
              px-2.5 py-1 text-[11px] font-medium text-white
            "
          >
            <span className="opacity-70">+</span>
            {listing.photos.length - 1}
          </span>
        )}

        {/* FEATURED */}
        <AnimatePresence>
          {listing.is_featured && (
            <motion.span
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              className="
                absolute top-3 left-3 flex items-center gap-1
                rounded-full bg-amber-400 px-3 py-1
                text-[11px] font-semibold tracking-wide text-amber-900
              "
            >
              <Star
                size={11}
                fill="currentColor"
                strokeWidth={0}
              />
              Featured
            </motion.span>
          )}
        </AnimatePresence>
      </div>

      {/* CONTENT */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* TITLE */}
        <h3
          className="
            line-clamp-2 text-[15px] font-semibold leading-snug
            text-neutral-900 dark:text-neutral-50
            group-hover:text-violet-600 dark:group-hover:text-violet-400
            transition-colors duration-200
          "
        >
          {listing.title}
        </h3>

        {/* META */}
        <div className="flex flex-col gap-1.5 mt-auto">
          {/* LOCATION */}
          <div className="flex items-start gap-1.5 text-neutral-500 dark:text-neutral-400">
            <MapPin
              size={13}
              strokeWidth={1.75}
              className="mt-0.5 shrink-0 text-violet-500"
            />

            <span className="line-clamp-1 text-[12.5px] leading-tight">
              {listing.location}
            </span>
          </div>

          {/* DATE */}
          <div className="flex items-center gap-1.5 text-neutral-400 dark:text-neutral-500">
            <Clock
              size={12}
              strokeWidth={1.75}
              className="shrink-0"
            />

            <span className="text-[11.5px]">
              {formatDate(listing.created_at)}
            </span>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          animate={{ x: hovered ? 2 : 0 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 22,
          }}
          className="
            flex items-center gap-0.5 text-[12px]
            font-medium text-violet-500
            dark:text-violet-400 mt-1
          "
          onClick={() =>
            navigate.push(`/servicesdetails/${listing.id}`)
          }
        >
          View details

          <ChevronRight
            size={13}
            strokeWidth={2}
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

// ───────────────── GRID ─────────────────

export function ServiceCardGrid({ listings }: any) {
  return (
    <section
      className="
        min-h-screen bg-neutral-50 dark:bg-neutral-950
        px-10  md:px-20 lg:px-46 py-26
      "
    >
      {/* HEADER */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
        className="mb-8"
      >
        <p
          className="
            text-xs font-semibold uppercase tracking-[0.18em]
            text-violet-500 dark:text-violet-400 mb-1
          "
        >
          Listings
        </p>

        <h1
          className="
            text-2xl font-bold
            text-neutral-900 dark:text-neutral-50
          "
        >
          Available Services
        </h1>

        <p
          className="
            mt-1 text-sm
            text-neutral-400 dark:text-neutral-500
          "
        >
          {listings.length} result
          {listings.length !== 1 ? "s" : ""}
        </p>
      </motion.div>

      {/* GRID */}
      {listings.length === 0 ? (
        <div
          className="
            flex flex-col items-center justify-center gap-3 py-24
            text-neutral-300 dark:text-neutral-700
          "
        >
          <ImageOff size={40} strokeWidth={1} />

          <p className="text-sm">
            No listings found
          </p>
        </div>
      ) : (
        <div
          className="
            grid grid-cols-1 gap-5
            sm:grid-cols-2
            lg:grid-cols-2
            xl:grid-cols-3
          "
        >
          {listings.map((listing: any, i: number) => (
            <ServiceCard
              key={listing.id}
              listing={listing}
              index={i}
            />
          ))}
        </div>
      )}
    </section>
  );
}

// ───────────────── PAGE ─────────────────

export default function ListingsPage() {
  const [listings, setListings] = useState<
    ServiceListing[]
  >([]);

  const [loading, setLoading] = useState(true);

  // FETCH DATA
  const fetchListings = async () => {
    try {
      const { data } = await API.get("/weddingservices");

      const formatted = data.map((item: any) => ({
        ...item,

        // FIX PHOTOS ARRAY
        photos:
          typeof item.photos === "string"
            ? JSON.parse(item.photos)
            : Array.isArray(item.photos)
            ? item.photos
            : [],

        // FIX FEATURES ARRAY
        features:
          typeof item.features === "string"
            ? JSON.parse(item.features)
            : Array.isArray(item.features)
            ? item.features
            : [],
      }));

      setListings(formatted);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // LOADING
  if (loading) {
    return (
      <div
        className="
          min-h-screen flex items-center justify-center
          bg-neutral-50 dark:bg-neutral-950
        "
      >
        <p className="text-neutral-400">
          Loading...
        </p>
      </div>
    );
  }

  return <ServiceCardGrid listings={listings} />;
}