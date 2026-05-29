// @ts-nocheck
import React from "react";

import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import Typewriter from "typewriter-effect";

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  const heroY = useTransform(scrollYProgress, [0, 0.3], [0, -80]);

  const STATS = [
    { val: "100+", label: "Projects Delivered" },
    { val: "98%", label: "Client Satisfaction" },
    { val: "3+", label: "Years Experience" },
    { val: "100+", label: "Happy Clients" },
  ];

  return (
    <section
      id="home"
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background orbs */}
      <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div
          style={{
            position: "absolute",
            top: "10%",
            left: "10%",
            width: 600,
            height: 600,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(0,212,255,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: "10%",
            right: "10%",
            width: 500,
            height: 500,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(192,132,252,0.12) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
            width: 800,
            height: 400,
            borderRadius: "50%",
            background:
              "radial-gradient(ellipse, rgba(255,107,53,0.06) 0%, transparent 70%)",
            filter: "blur(60px)",
          }}
        />
        {/* Grid lines */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <motion.div
        style={{
          y: heroY,
          maxWidth: 1280,
          margin: "0 auto",
          padding: "100px 25px 60px",
          position: "relative",
          zIndex: 2,
          width: "100%",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,212,255,0.1)",
            border: "1px solid rgba(0,212,255,0.2)",
            borderRadius: 100,
            padding: "6px 16px",
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 6,
              height: 6,
              borderRadius: "50%",
              background: "#00D4FF",
              animation: "pulse 2s infinite",
            }}
          />
          <span
            style={{
              fontSize: 13,
              color: "#00D4FF",
              fontWeight: 600,
              letterSpacing: "0.08em",
            }}
          >
            NOW SERVING NEPAL AND BEYOND
          </span>
        </motion.div>

        <motion.h1
          className="hero-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          style={{
            fontSize: "clamp(3rem, 7vw, 7rem)",
            fontWeight: 800,
            lineHeight: 1.0,
            letterSpacing: "-0.04em",
            maxWidth: 1100,
            marginBottom: 28,
          }}
        >
          Elevating Businesses
          <br />
          <h4 className="glow-text">
          <Typewriter
          options={{
            strings: ["In The Digital Era"],
            autoStart: true,
            loop: true,
            delay: 75, 
            deleteSpeed: 50,
          }}
        />
           
          </h4>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.25rem)",
            color: "#7A8499",
            maxWidth: 560,
            lineHeight: 1.7,
            marginBottom: 48,
          }}
        >
          Mithila tech & IT Solutions crafts powerful websites, mobile apps, and
          digital marketing strategies that help your business grow in today's
          competitive market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          style={{ display: "flex", gap: 16, flexWrap: "wrap" }}
        >
          <button
            className="btn-primary"
            onClick={() => scrollTo("services")}
            style={{
              padding: "16px 36px",
              borderRadius: 10,
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            Explore Services <ArrowRight size={18} />
          </button>
          <button
            className="btn-outline"
            onClick={() => scrollTo("contact")}
            style={{ padding: "16px 36px", borderRadius: 10, fontSize: 16 }}
          >
            Talk to Us
          </button>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          style={{
            display: "flex",
            gap: 48,
            marginTop: 80,
            flexWrap: "wrap",
          }}
        >
          {STATS.map((s, i) => (
            <div key={i}>
              <div
                style={{
                  fontSize: "clamp(1.8rem, 4vw, 2.5rem)",
                  fontWeight: 800,
                  className: "glow-text",
                  background: "linear-gradient(135deg, #00D4FF, #C084FC)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.val}
              </div>
              <div
                style={{
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: 13,
                  color: "#5A6478",
                  marginTop: 4,
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        style={{
          position: "absolute",
          bottom: 40,
          left: "50%",
          transform: "translateX(-50%)",
          cursor: "pointer",
          opacity: 0.4,
        }}
        onClick={() => scrollTo("about")}
      >
        <ChevronDown size={28} color="#00D4FF" />
      </motion.div>
    </section>
  );
};

export default LandingPage;
