import { motion,useInView } from 'framer-motion';
import React, { useRef } from 'react'
import {
  Heart, MapPin, Phone, Mail, Star, ChevronDown, Menu, X,
  Camera, Music, Utensils, Flower2, Calendar, Clock, ArrowRight
} from "lucide-react";

const services = [
  { icon: Calendar, title: "Wedding Planning", desc: "Full end-to-end coordination — timelines, vendors, and every detail managed with precision." },
  { icon: Flower2,  title: "Floral & Décor",   desc: "Breathtaking florals and bespoke decorations that transform any venue into a dreamscape." },
  { icon: Utensils, title: "Catering Service", desc: "Exquisite cuisine crafted with the finest local ingredients, tailored to every palate." },
  { icon: Camera,   title: "Photography",      desc: "Timeless imagery — every smile, every tear, every stolen glance preserved forever." },
  { icon: Music,    title: "Entertainment",    desc: "Live bands, DJs, and curated performances to keep the celebration joyful and vibrant." },
  { icon: Heart,    title: "Honeymoon Package",desc: "Handcrafted honeymoon getaways and travel arrangements for the perfect beginning." },
];


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

const page = () => {
  return (
     <section id="services" className="py-24 px-6 bg-forest">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-14 text-center">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-3">What We Offer</p>
            <h2 className="font-display text-[#ffd700] leading-tight mb-4" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
              Complete Wedding <em className="italic text-gold">Services</em>
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mb-5" />
            <p className="text-white/50 max-w-lg mx-auto font-light text-[0.95rem] leading-relaxed">
              From initial planning to the final dance, we handle every element of your celebration with expertise and passion.
            </p>
          </FadeUp>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {services.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.07}>
                <div className="group border border-white/10 hover:border-gold/50 bg-white/5 hover:bg-white/10 rounded-sm p-7 transition-all duration-400 cursor-default hover:-translate-y-1">
                  <div className="w-11 h-11 rounded-full bg-gold/15 flex items-center justify-center mb-5">
                    <s.icon size={20} color="#b8934a" />
                  </div>
                  <h3 className="font-display text-white text-xl font-medium mb-2">{s.title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed font-light">{s.desc}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
  )
}

export default page