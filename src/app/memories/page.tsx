"use client"

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

import pic1 from "../../../public/pic1.jpeg";
import pic2 from "../../../public/pic2.jpeg";
import pic3 from "../../../public/pic3.jpeg";
import pic4 from "../../../public/pic4.jpeg";
import pic5 from "../../../public/pic5.jpeg";
import pic6 from "../../../public/pic6.jpeg";
import pic7 from "../../../public/pic7.jpeg";
import pic8 from "../../../public/pic8.jpeg";


function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

const images = [
  {
    image: pic1,
    cols: 1,
    rows: 2,
    label: "Garden Ceremony",
  },
  {
    image: pic2,
    cols: 1,
    rows: 1,
    label: "Floral Arrangements",
  },
  {
    image: pic3,
    cols: 1,
    rows: 1,
    label: "Bridal Portrait",
  },
  {
    image: pic4,
    cols: 2,
    rows: 1,
    label: "Reception Hall",
  },
  {
    image: pic5,
    cols: 1,
    rows: 1,
    label: "First Dance",
  },
  {
    image: pic6,
    cols: 1,
    rows: 1,
    label: "Wedding Decor",
  },
  {
    image: pic7,
    cols: 1,
    rows: 1,
    label: "Couple Shoot",
  },
  {
    image: pic8,
    cols: 2,
    rows: 1,
    label: "Memorable Moments",
  },
];

const Page = () => {
  return (
    <section id="gallery" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-14">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-3">
            Our Work
          </p>

          <h2
            className="font-display text-[#ffd700] leading-tight"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            A Gallery of{" "}
            <em className="italic text-gold">Memories</em>
          </h2>

          <div className="w-12 h-0.5 bg-gold mt-4" />
        </FadeUp>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
          {images.map((item, i) => (
            <FadeUp
              key={i}
              delay={i * 0.08}
              className={`
                ${item.cols === 2 ? "md:col-span-2" : ""}
                ${item.rows === 2 ? "row-span-2" : ""}
              `}
            >
              <div className="relative w-full h-full overflow-hidden rounded-sm group cursor-pointer">
                {/* Image */}
                <img
                  src={item.image.src}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-all duration-500 flex items-center justify-center">
                  <p className="font-display italic text-white opacity-0 group-hover:opacity-100 text-lg transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                    {/* {item.label} */}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Page;