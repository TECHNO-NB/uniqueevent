// @ts-nocheck
"use client";
import { motion, useInView } from "framer-motion";

import {
  CheckCircle,
  Globe,
  Layers,
  Shield,
  Star,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useRef } from "react";
import aboutusimg from "../../../public/pic8.jpeg"
import Image from "next/image";

const About = () => {
  const features = [
    {
      icon: CheckCircle,
      text: "Transparent communication & pricing",
    },
    {
      icon: TrendingUp,
      text: "Results-driven approach",
    },
    {
      icon: Shield,
      text: "End-to-end project support",
    },
  ];

  const cards = [
    {
      icon: Zap,
      label: "Fast Delivery",
      val: "On-time",
      color: "#00D4FF",
    },
    {
      icon: Star,
      label: "Client Rating",
      val: "4.9/5",
      color: "#FFD700",
    },
    {
      icon: Globe,
      label: "Global Standards",
      val: "ISO Ready",
      color: "#00FF88",
    },
    {
      icon: Layers,
      label: "Tech Stack",
      val: "Modern",
      color: "#C084FC",
    },
  ];

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

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

  return (
     <section id="about" className="py-24 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <FadeUp>
            <div className="relative">
              <div className="w-full aspect-3/4 bg-forest-light rounded-sm flex items-center justify-center text-white/20 font-display text-xl italic overflow-hidden">
                <div className="absolute inset-0 bg-linear-to-br from-forest via-forest-light to-[#4a7a5f]" />
                <Image src={aboutusimg} width={400} height={500} className=" w-full h-full"  alt="about us pic"/>
              </div>
              <div className="absolute -bottom-8 -right-8 w-[55%] aspect-square bg-gold-pale rounded-sm border-4 border-cream flex items-center justify-center">
                <div className="text-center">
                  <p className="font-display text-5xl font-semibold text-forest leading-none">6+</p>
                  <p className="text-xs tracking-widest uppercase text-muted mt-1 font-medium">Years of Love</p>
                </div>
              </div>
            </div>
          </FadeUp>
          <FadeUp delay={0.15}>
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-3">About Us</p>
            <h2 className="font-display text-[#ffd700] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
              We Craft Weddings<br />That <em className="italic text-gold">Last Forever</em>
            </h2>
            <div className="w-12 h-0.5 bg-gold mb-5" />
            <p className="text-muted leading-relaxed font-light mb-5 text-[0.95rem]">
              Founded in the heart of Tilottama, Unique Event was born from a passion for transforming love stories into extraordinary celebrations. We blend traditional Nepali elegance with contemporary design to create weddings that are distinctly yours.
            </p>
            <p className="text-muted leading-relaxed font-light text-[0.95rem] mb-8">
              Every detail — from the first flower arrangement to the final farewell — is orchestrated with care, creativity, and a deep respect for the sacred moments that shape a life together.
            </p>
            <div className="flex gap-8">
              {[["300+", "Weddings"], ["98%", "Happy Couples"], ["50+", "Vendors"]].map(([num, label]) => (
                <div key={label}>
                  <p className="font-display text-4xl font-semibold text-forest leading-none">{num}</p>
                  <p className="text-xs tracking-widest uppercase text-muted mt-1 font-medium">{label}</p>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>
  );
};

export default About;