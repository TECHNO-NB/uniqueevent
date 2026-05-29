// @ts-nocheck
"use client";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart, MapPin, Phone, Mail, Star, ChevronDown, Menu, X,
  Camera, Music, Utensils, Flower2, Calendar, Clock, ArrowRight
} from "lucide-react";
import About from "./about/page";
import Memories from "./memories/page"
import OurOffer from "./ouroffer/page"
import Testimonials from "@/components/Testimonials";
import Contact from "./contact/page"
import WeddingServices from "./weddingservices/page"
/* ─── Data ─────────────────────────────────────────────────────────── */



/* ─── Fade-up wrapper ───────────────────────────────────────────────── */
function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Main Component ────────────────────────────────────────────────── */
export default function UniqueEvent() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div className="font-body bg-black text-white overflow-x-hidden">

      {/* ── HERO ────────────────────────────────────────────────────── */}
      <section className="min-h-screen py-24 bg-forest relative flex items-center justify-center overflow-hidden">
        {/* Pattern overlay */}
        <div className="absolute text-[#ffd700] inset-0 opacity-20" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff'%3E%3Ccircle cx='40' cy='40' r='1.5'/%3E%3C/g%3E%3C/svg%3E")` }} />

        {/* Floating decorative elements */}
        <motion.div animate={{ y: [0, -18, 0], rotate: [0, 5, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[18%] left-[8%] opacity-40 text-[#ffd700] pointer-events-none">
          <Flower2 size={80} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, -14, 0], rotate: [0, -4, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[22%] right-[7%] opacity-40 text-[#ffd700] pointer-events-none">
          <Heart size={64} strokeWidth={1} />
        </motion.div>
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[55%] left-[4%] opacity-40 text-[#ffd700] pointer-events-none">
          <Flower2 size={120} strokeWidth={0.8} />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}
            className="text-white text-xs tracking-[0.4em] uppercase mb-6 font-medium">
            Tilottama-5, Manigram · Est. 2018
          </motion.p>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, delay: 0.15 }}
            className="font-display font-light text-[#ffd700] leading-[1.1] mb-6" style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)" }}>
            Where Love Becomes<br /><em className="italic text-[#ffd700]">A Story</em>
          </motion.h1>
          <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-6">
            <div className="h-px w-14 bg-gold" />
            <Heart size={14} className="text-[#ffd700]" fill="currentColor" />
            <div className="h-px w-14 bg-[#ffd700]" />
          </motion.div>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
            className="text-white/60 max-w-lg mx-auto mb-10 font-light leading-relaxed text-base">
            Nepal's premier wedding planning studio — crafting unforgettable celebrations with artistry, warmth, and impeccable attention to every detail.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.65 }}
            className="flex gap-4 justify-center flex-wrap">
            <button onClick={() => scrollTo("Contact")} className="bg-[#ffd700]/80 hover:bg-gold-light text-white text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-300 hover:-translate-y-1">
              Plan My Wedding
            </button>
            <button onClick={() => scrollTo("Services")} className="border border-white/30 hover:border-gold/60 text-white hover:text-gold text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-300">
              Our Services
            </button>
          </motion.div>
        </div>

        <motion.button animate={{ y: [0, 8, 0] }} transition={{ duration: 2, repeat: Infinity }}
          onClick={() => scrollTo("about")} className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/30 hover:text-gold transition-colors cursor-pointer bg-transparent border-none">
          <ChevronDown size={28} />
        </motion.button>
      </section>

      {/* ── ABOUT ───────────────────────────────────────────────────── */}
     <About/>

      {/* ── SERVICES ────────────────────────────────────────────────── */}
     <OurOffer/>

      {/* ── GALLERY ─────────────────────────────────────────────────── */}
      <Memories/>

      <WeddingServices/>

      {/* ── TESTIMONIALS ────────────────────────────────────────────── */}
     <Testimonials/>

      {/* ── CONTACT ─────────────────────────────────────────────────── */}
      <Contact/>

      {/* ── FOOTER ──────────────────────────────────────────────────── */}
     
    </div>
  );
}