// @ts-nocheck
"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

import pic1 from "../../../public/pic1.jpeg";
import pic2 from "../../../public/pic2.jpeg";
import pic3 from "../../../public/pic3.jpeg";
import pic4 from "../../../public/pic4.jpeg";
import pic5 from "../../../public/pic5.jpeg";
import pic6 from "../../../public/pic6.jpeg";
import pic7 from "../../../public/pic7.jpeg";
import pic8 from "../../../public/pic8.jpeg";

import axios from "axios";

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

const localImages = [
  {
    image: pic1.src,
    cols: 1,
    rows: 2,
    label: "Garden Ceremony",
  },
  {
    image: pic2.src,
    cols: 1,
    rows: 1,
    label: "Floral Arrangements",
  },
  {
    image: pic3.src,
    cols: 1,
    rows: 1,
    label: "Bridal Portrait",
  },
  {
    image: pic4.src,
    cols: 2,
    rows: 1,
    label: "Reception Hall",
  },
  {
    image: pic5.src,
    cols: 1,
    rows: 1,
    label: "First Dance",
  },
  {
    image: pic6.src,
    cols: 1,
    rows: 1,
    label: "Wedding Decor",
  },
  {
    image: pic7.src,
    cols: 1,
    rows: 1,
    label: "Couple Shoot",
  },
  {
    image: pic8.src,
    cols: 2,
    rows: 1,
    label: "Memorable Moments",
  },
];

const Page = () => {
  const [img, setImageList] = useState(localImages);

  useEffect(() => {
    const fetchProductImg = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/gallery`
        );

        const prefix = process.env.NEXT_PUBLIC_BACKEND_URL;

        if (res.data) {
          const apiImages = res.data.map((val: any) => ({
            image: `${prefix}/${val.image.replace(/\\/g, "/")}`,
            cols: 1,
            rows: 1,
            label: "Gallery Image",
          }));

          setImageList((prev) => [...apiImages, ...prev]);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchProductImg();
  }, []);

  return (
    <section id="gallery" className="py-24 px-4 md:px-6 bg-black text-white">
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 auto-rows-[220px]">
          {img?.map((item, i) => (
            <FadeUp
              key={i}
              delay={i * 0.08}
              className={`
                ${item.cols === 2 ? "md:col-span-2" : ""}
                ${item.rows === 2 ? "md:row-span-2" : ""}
              `}
            >
              <div className="relative w-full h-full overflow-hidden rounded-md group cursor-pointer">
                <img
                  src={item.image}
                  alt={item.label}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/45 transition-all duration-500 flex items-center justify-center">
                  <p className="font-display italic text-white opacity-0 group-hover:opacity-100 text-lg transition-all duration-300 translate-y-3 group-hover:translate-y-0">
                    {item.label}
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