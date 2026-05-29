// @ts-nocheck
"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Globe,
  Megaphone,
  Monitor,
  Search,
  Server,
  Smartphone,
} from "lucide-react";

const SERVICES = [
  {
    icon: Globe,
    title: "Website Development",
    desc: "Custom, high-performance websites built with modern frameworks. From landing pages to complex web applications.",
    color: "#00D4FF",
    tag: "Web",
  },
  {
    icon: Smartphone,
    title: "App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android that users love.",
    color: "#FF6B35",
    tag: "Mobile",
  },
  {
    icon: Search,
    title: "SEO Optimization",
    desc: "Data-driven SEO strategies that put you on top of search results and keep you there.",
    color: "#00FF88",
    tag: "Growth",
  },
  {
    icon: Megaphone,
    title: "Digital Marketing",
    desc: "Full-funnel digital marketing campaigns that convert visitors into loyal customers.",
    color: "#FFD700",
    tag: "Marketing",
  },
  {
    icon: Server,
    title: "Web Hosting",
    desc: "Reliable, fast, and secure hosting solutions with 99.9% uptime guarantee.",
    color: "#C084FC",
    tag: "Infrastructure",
  },
  {
    icon: Monitor,
    title: "Custom Software",
    desc: "We build systems to streamline your business operations and boost efficiency.",
    color: "#F472B6",
    tag: "Software",
  },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const item = {
  hidden: {
    opacity: 0,
    y: 35,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const page = () => {
  return (
    <section
      id="services"
      style={{
        padding: "90px 40px",
        background: "rgba(255,255,255,0.015)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background Glow */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          overflow: "hidden",
          zIndex: 0,
        }}
      >
        <motion.div
          animate={{
            x: [0, 50, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(0,212,255,0.12)",
            filter: "blur(100px)",
          }}
        />

        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: "50%",
            background: "rgba(192,132,252,0.12)",
            filter: "blur(100px)",
          }}
        />
      </div>

      <div
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          style={{
            textAlign: "center",
            marginBottom: 72,
          }}
        >
          <div
            style={{
              fontSize: 12,
              color: "#00D4FF",
              fontWeight: 700,
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
            }}
          >
            What We Do
          </div>

          <h2
            style={{
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              fontWeight: 800,
              lineHeight: 1.1,
              letterSpacing: "-0.03em",
              marginBottom: 20,
              color: "#fff",
            }}
          >
            Services That{" "}
            <span
              style={{
                color: "#00D4FF",
              }}
            >
              Drive Growth
            </span>
          </h2>

          <p
            style={{
              fontFamily: "'DM Sans', sans-serif",
              color: "#7A8499",
              fontSize: 17,
              maxWidth: 500,
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            From digital strategy to execution — we cover every touchpoint of
            your online presence.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 24,
          }}
        >
          {SERVICES.map((s, i) => (
            <motion.div
              key={i}
              variants={item}
              whileHover={{
                y: -8,
                borderColor: s.color + "44",
              }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 18,
              }}
              style={{
                padding: 36,
                borderRadius: 20,
                cursor: "default",
                position: "relative",
                overflow: "hidden",
                transition: "0.4s",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(12px)",
              }}
            >
              {/* Hover Glow */}
              <motion.div
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `linear-gradient(135deg, ${s.color}15, transparent 60%)`,
                }}
              />

              {/* Top Glow */}
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  right: 0,
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  background: `radial-gradient(circle, ${s.color}15 0%, transparent 70%)`,
                  transform: "translate(30%, -30%)",
                }}
              />

              <div
                style={{
                  position: "relative",
                  zIndex: 2,
                }}
              >
                {/* Header */}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: 24,
                  }}
                >
                  <motion.div
                    whileHover={{
                      rotate: 6,
                      scale: 1.08,
                    }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                    }}
                    style={{
                      width: 52,
                      height: 52,
                      borderRadius: 14,
                      background: `${s.color}15`,
                      border: `1px solid ${s.color}30`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      boxShadow: `0 0 20px ${s.color}20`,
                    }}
                  >
                    <s.icon size={24} color={s.color} />
                  </motion.div>

                  <span
                    style={{
                      fontSize: 11,
                      color: s.color,
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      background: `${s.color}12`,
                      padding: "4px 10px",
                      borderRadius: 100,
                      border: `1px solid ${s.color}25`,
                    }}
                  >
                    {s.tag}
                  </span>
                </div>

                {/* Title */}
                <h3
                  style={{
                    fontSize: 20,
                    fontWeight: 700,
                    marginBottom: 12,
                    color: "#fff",
                  }}
                >
                  {s.title}
                </h3>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "'DM Sans', sans-serif",
                    color: "#6A7385",
                    fontSize: 15,
                    lineHeight: 1.65,
                  }}
                >
                  {s.desc}
                </p>

                {/* Button */}
                <motion.div
                  whileHover={{ x: 4 }}
                  style={{
                    marginTop: 24,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    color: s.color,
                    fontSize: 14,
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  Learn more <ArrowRight size={14} />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default page;