
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Heart, MapPin, Phone, Mail, Star, ChevronDown, Menu, X,
  Camera, Music, Utensils, Flower2, Calendar, Clock, ArrowRight
} from "lucide-react";


const testimonials = [
  { quote: "Unique Event made our wedding absolutely perfect. Every detail was handled with such care and elegance. We couldn't have asked for a more magical day.", name: "Priya & Rahul Sharma", event: "Garden Wedding · March 2024", initials: "PR" },
  { quote: "From the very first meeting they understood our vision completely. The decorations were breathtaking and our guests are still talking about it months later.", name: "Sunita & Anil Thapa", event: "Royal Wedding · December 2023", initials: "SA" },
  { quote: "Professional, creative, and deeply passionate. They turned our dream into reality. I recommend Unique Event to every couple without hesitation.", name: "Kavya & Deepak Joshi", event: "Destination Wedding · January 2024", initials: "KD" },
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

const Testimonials = () => {
  return (
     <section id="testimonials" className="py-24 px-6 bg-black text-white">
        <div className="max-w-6xl mx-auto">
          <FadeUp className="mb-14 text-center">
            <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-3">Love Notes</p>
            <h2 className="font-display text-[#ffd700] leading-tight" style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}>
              What Couples <em className="italic text-gold">Say</em>
            </h2>
            <div className="w-12 h-0.5 bg-gold mx-auto mt-4" />
          </FadeUp>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <FadeUp key={t.name} delay={i * 0.1}>
                <div className="bg-white text-black rounded-sm p-7 shadow-sm border-t-2 border-[#ffd700] h-full flex flex-col">
                  <div className="flex gap-1 mb-4">
                    {Array(5).fill(0).map((_, j) => <Star key={j} size={14} className="text-[#ffd700] ring-1 ring-black" fill="currentColor" />)}
                  </div>
                  <p className="font-display italic text-charcoal leading-relaxed flex-1 mb-5 text-[1.05rem]">"{t.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gold-pale border-3 border-[#ffd700] flex items-center justify-center text-gold font-display font-semibold text-sm flex-shrink-0">
                      {t.initials}
                    </div>
                    <div>
                      <p className="font-medium text-sm  text-charcoal">{t.name}</p>
                      <p className="text-xs text-muted">{t.event}</p>
                    </div>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>
  )
}

export default Testimonials