// @ts-nocheck
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin,
  Clock,
  Star,
  Users,
  Tag,
  ChevronLeft,
  ChevronRight,
  Check,
  Share2,
  Heart,
  ImageOff,
  Zap,
  CalendarDays,
  BadgeCheck,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  is_featured?: boolean;
  created_at: string;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────



function formatPrice(n: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(n);
}

function serviceTypeLabel(type: string) {
  return type
    .split("_")
    .map((w) => w[0].toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Photo Gallery ─────────────────────────────────────────────────────────────

function Gallery({ photos, title }: { photos: string[]; title: string }) {
  const [active, setActive] = useState(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  const go = (dir: 1 | -1) =>
    setActive((p) => (p + dir + photos?.length) % photos.length);

  if (!photos || photos?.length === 0) {
    return (
      <div
        className="relative flex h-72 w-full items-center justify-center
                      rounded-2xl bg-neutral-100 dark:bg-neutral-800
                      text-neutral-300 dark:text-neutral-600"
      >
        <ImageOff size={48} strokeWidth={1} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-10">
      {/* Main image */}
      <div
        className="relative h-72 sm:h-96 w-full overflow-hidden rounded-2xl
                      bg-neutral-100 dark:bg-neutral-800"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0"
          >
            {imgErrors[active] ? (
              <div className="flex h-full items-center justify-center text-neutral-300">
                <ImageOff size={40} strokeWidth={1} />
              </div>
            ) : (
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${photos[active]}`}
                alt={`${title} photo ${active + 1}`}
    
                className="object-cover"
                onError={() => setImgErrors((e) => ({ ...e, [active]: true }))}
             
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div
          className="pointer-events-none absolute inset-0
                        bg-linear-to-t from-black/30 via-transparent to-transparent"
        />

        {/* Counter */}
        <div
          className="absolute bottom-4 left-1/2 -translate-x-1/2
                        rounded-full bg-black/50 backdrop-blur-sm
                        px-3 py-1 text-xs font-medium text-white"
        >
          {active + 1} / {photos.length}
        </div>

        {/* Nav arrows */}
        {photos.length > 1 && (
          <>
            <button
              onClick={() => go(-1)}
              className="absolute left-3 top-1/2 -translate-y-1/2
                         flex h-8 w-8 items-center justify-center
                         rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm
                         shadow-sm text-neutral-700 dark:text-neutral-200
                         hover:bg-white dark:hover:bg-black/80 transition-colors"
              aria-label="Previous photo"
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              onClick={() => go(1)}
              className="absolute right-3 top-1/2 -translate-y-1/2
                         flex h-8 w-8 items-center justify-center
                         rounded-full bg-white/80 dark:bg-black/60 backdrop-blur-sm
                         shadow-sm text-neutral-700 dark:text-neutral-200
                         hover:bg-white dark:hover:bg-black/80 transition-colors"
              aria-label="Next photo"
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails */}
      {photos.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {photos.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-xl
                          border-2 transition-all duration-200
                          ${
                            i === active
                              ? "border-violet-500 shadow-[0_0_0_1px] shadow-violet-300"
                              : "border-transparent opacity-60 hover:opacity-90"
                          }`}
            >
              {imgErrors[i] ? (
                <div
                  className="flex h-full items-center justify-center
                                bg-neutral-100 dark:bg-neutral-800 text-neutral-300"
                >
                  <ImageOff size={16} />
                </div>
              ) : (
                <img
                  src={src}
                  alt={`Thumbnail ${i + 1}`}
                  
                  className="object-cover"
                  onError={() => setImgErrors((e) => ({ ...e, [i]: true }))}
                />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Stat Chip ─────────────────────────────────────────────────────────────────

function StatChip({
  icon,
  label,
  value,
  accent,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  accent?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-3 rounded-xl px-4 py-3
                  ${
                    accent
                      ? "bg-violet-50 dark:bg-violet-950/40 border border-violet-100 dark:border-violet-900"
                      : "bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-100 dark:border-neutral-800"
                  }`}
    >
      <span
        className={
          accent ? "text-violet-500" : "text-neutral-400 dark:text-neutral-500"
        }
      >
        {icon}
      </span>
      <div>
        <p className="text-[10.5px] font-medium uppercase tracking-wide text-neutral-400 dark:text-neutral-500">
          {label}
        </p>
        <p
          className={`text-[14px] font-semibold ${accent ? "text-violet-700 dark:text-violet-300" : "text-neutral-800 dark:text-neutral-100"}`}
        >
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Main Detail Page ──────────────────────────────────────────────────────────

interface ServiceDetailPageProps {
  listing: ServiceListing;
  onBack?: () => void;
}

function ServiceDetailPage({ listing, onBack }: any) {

  console.log("++++++++++++++++++++",listing)
  const [saved, setSaved] = useState(false);
  const [bookingDone, setBookingDone] = useState(false);

  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay, ease: [0.22, 1, 0.36, 1] as number[] },
  });

  return (
    <div className="min-h-screen bg-neutral-50 dark:bg-neutral-950 pb-32">
      {/* ── Sticky nav bar ── */}
      <div
        className="sticky top-0 z-30 flex items-center justify-between
                      border-b border-neutral-100 dark:border-neutral-800
                      bg-white/80 dark:bg-neutral-900/80 backdrop-blur-md
                      px-4 sm:px-8 py-3"
      >
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-lg px-3 py-1.5
                     text-sm font-medium text-neutral-600 dark:text-neutral-300
                     hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ChevronLeft size={15} strokeWidth={2} />
          Back
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={() => navigator.clipboard?.writeText(window.location.href)}
            className="flex h-8 w-8 items-center justify-center rounded-full
                       border border-neutral-200 dark:border-neutral-700
                       text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800
                       transition-colors"
            aria-label="Share"
          >
            <Share2 size={14} />
          </button>
          <button
            onClick={() => setSaved((s) => !s)}
            className={`flex h-8 w-8 items-center justify-center rounded-full border
                        transition-all duration-200
                        ${
                          saved
                            ? "border-rose-200 bg-rose-50 text-rose-500 dark:border-rose-800 dark:bg-rose-950/50"
                            : "border-neutral-200 dark:border-neutral-700 text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                        }`}
            aria-label="Save"
          >
            <Heart size={14} fill={saved ? "currentColor" : "none"} />
          </button>
        </div>
      </div>

      {/* ── Content ── */}
      <div className="mx-auto max-w-3xl px-4 sm:px-6 pt-6 space-y-8">
        <motion.div {...fadeUp(0)}>
          <Gallery photos={listing?.photos} title={listing?.title} />
        </motion.div>

        {/* Title + badges */}
        <motion.div {...fadeUp(0.06)} className="space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            {listing?.is_featured && (
              <span
                className="flex items-center gap-1 rounded-full
                               bg-amber-100 dark:bg-amber-950/50
                               px-3 py-1 text-[11px] font-semibold
                               text-amber-700 dark:text-amber-400"
              >
                <Star size={11} fill="currentColor" strokeWidth={0} />
                Featured
              </span>
            )}
            <span
              className="rounded-full bg-violet-100 dark:bg-violet-950/50
                             px-3 py-1 text-[11px] font-semibold
                             text-violet-700 dark:text-violet-400"
            >
              {serviceTypeLabel(listing?.service_type)}
            </span>
          </div>

          <h1
            className="text-2xl sm:text-3xl font-bold leading-tight
                         text-neutral-900 dark:text-neutral-50"
          >
            {listing.title}
          </h1>

          {/* Location & date inline */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-neutral-500 dark:text-neutral-400">
            <span className="flex items-center gap-1.5">
              <MapPin
                size={13}
                strokeWidth={1.75}
                className="text-violet-500 shrink-0"
              />
              {listing?.location}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={13} strokeWidth={1.75} />
              Listed {listing?.created_at}
            </span>
          </div>
        </motion.div>

        {/* Divider */}
        <hr className="border-neutral-100 dark:border-neutral-800" />

        <motion.div
          {...fadeUp(0.1)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          <StatChip
            icon={<Zap size={17} strokeWidth={1.75} />}
            label="Starting price"
            value={formatPrice(listing?.price)}
            accent
          />
          <StatChip
            icon={<Users size={17} strokeWidth={1.75} />}
            label="Max capacity"
            value={`${listing?.max_capacity} guests`}
          />
          <StatChip
            icon={<Tag size={17} strokeWidth={1.75} />}
            label="Service type"
            value={serviceTypeLabel(listing?.service_type)}
          />
        </motion.div>

        {/* Description */}
        <motion.div {...fadeUp(0.14)} className="space-y-2">
          <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
            About this listing
          </h2>
          <p className="text-sm leading-relaxed text-neutral-600 dark:text-neutral-400 whitespace-pre-line">
            {listing?.description}
          </p>
        </motion.div>

        {/* Features */}
        {/* {listing?.features.length > 0 && listing?.features && listing?.features.length > 0 && (
          <motion.div {...fadeUp(0.18)} className="space-y-3">
            <h2 className="text-base font-semibold text-neutral-900 dark:text-neutral-50">
              What's included
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2.5">
              {listing?.features?.map((feat, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.05, duration: 0.35 }}
                  className="flex items-center gap-2.5 text-sm text-neutral-700 dark:text-neutral-300"
                >
                  <span
                    className="flex h-5 w-5 shrink-0 items-center justify-center
                                   rounded-full bg-emerald-100 dark:bg-emerald-950/50
                                   text-emerald-600 dark:text-emerald-400"
                  >
                    <Check size={11} strokeWidth={2.5} />
                  </span>
                  {feat}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )} */}

        {/* Listing meta footer */}
        <motion.div
          {...fadeUp(0.22)}
          className="flex items-center gap-2 rounded-xl border border-neutral-100
                     dark:border-neutral-800 bg-white dark:bg-neutral-900
                     px-4 py-3 text-xs text-neutral-400 dark:text-neutral-500"
        >
          <BadgeCheck size={14} className="text-violet-400 shrink-0" />
          Listing #{listing.id} · Added {listing?.created_at}
        </motion.div>
      </div>

      {/* ── Sticky CTA footer ── */}
      <motion.div
        initial={{ y: 80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className="fixed bottom-0 inset-x-0 z-30
                   border-t border-neutral-100 dark:border-neutral-800
                   bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md
                   px-4 sm:px-8 py-4"
      >
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-4">
          <div>
            <p className="text-xs text-neutral-400 dark:text-neutral-500">
              Starting from
            </p>
            <p className="text-xl font-bold text-neutral-900 dark:text-neutral-50">
              {formatPrice(listing.price)}
            </p>
          </div>
          <button
            onClick={() => setBookingDone(true)}
            className={`flex items-center gap-2 rounded-xl px-6 py-3
                        text-sm font-semibold transition-all duration-300
                        ${
                          bookingDone
                            ? "bg-emerald-500 text-white shadow-lg shadow-emerald-200/50 dark:shadow-emerald-900/30"
                            : "bg-violet-600 text-white hover:bg-violet-700 active:scale-[.97] shadow-lg shadow-violet-200/50 dark:shadow-violet-900/30"
                        }`}
          >
            {bookingDone ? (
              <>
                <Check size={16} strokeWidth={2.5} />
                Request Sent!
              </>
            ) : (
              <>
                <Clock size={15} strokeWidth={2} />
                Request Booking
              </>
            )}
          </button>
        </div>
      </motion.div>
    </div>
  );
}

export default function ServiceDetailDemo() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [listing, setListing] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    console.log("++++++++++++++++++++++++inside")
    const fetchData = async () => {
      try {
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/weddingservices/${id}`,
        );
        console.log("++++++++++++++++++++++++++++++++++++++data",data)
        setListing(data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

   if (loading) return <div>Loading...</div>;
  if (!listing) return <div>Listing not found</div>;

  return <ServiceDetailPage listing={listing} onBack={() => history.back()} />;
}
