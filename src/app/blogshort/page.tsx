// @ts-nocheck
"use client";

import React, { useEffect, useState } from "react";
import {
  motion,
} from "framer-motion";
import { Clock, ExternalLink, User } from "lucide-react";
import axios from "axios";
import { useRouter } from "next/navigation";

const page = () => {
  const [BLOGS, setBlogs] = useState([]);
  const router=useRouter()

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/short`
        );

        // FIX: parse tags JSON
        const formatted = res.data.map((b) => ({
          ...b,
          tags: b.tags ? JSON.parse(b.tags) : [],
        }));

        setBlogs(formatted);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <section
      id="blogs"
      style={{ padding: "70px 25px", background: "rgba(255,255,255,0.015)" }}
    >
      <div style={{ maxWidth: 1280, margin: "0 auto" }}>
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            marginBottom: 64,
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
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
              Insights
            </div>
            <h2
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                fontWeight: 800,
                lineHeight: 1.1,
                letterSpacing: "-0.03em",
              }}
            >
              Latest from
              <br />
              <span
                style={{
                  color: "#00D4FF",
            
                }}
              >
                our blog
              </span>
            </h2>
          </div>

          <button
          onClick={()=>router.push("/blogs")}
            className="btn-outline"
            style={{
              padding: "12px 28px",
              borderRadius: 8,
              fontSize: 14,
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            View All <ExternalLink size={14} />
          </button>
        </motion.div>

        {/* BLOG GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 28,
          }}
        >
          {BLOGS.map((b, i) => (
            <motion.div
             onClick={()=> router.push(`/blog/${b.id}`)}
              key={b.id}
              className="glass"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              style={{
                borderRadius: 20,
                overflow: "hidden",
                cursor: "pointer",
                transition: "all 0.4s",
              }}
            >
              {/* IMAGE */}
              <div
                style={{
                  height: 200,
                  overflow: "hidden",
                  position: "relative",
                }}
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${b.image?.replace(/\\/g, "/")}`}
                  alt={b.title}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    transition: "transform 0.4s",
                  }}
                  onMouseEnter={(e) =>
                    (e.target.style.transform = "scale(1.05)")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.transform = "scale(1)")
                  }
                />

                {/* TAG */}
                <div
                  style={{
                    position: "absolute",
                    top: 16,
                    left: 16,
                    background: "rgba(0,255,136,0.15)",
                    border: "1px solid rgba(0,255,136,0.3)",
                    borderRadius: 100,
                    padding: "4px 12px",
                    fontSize: 11,
                    color: "#00FF88",
                    fontWeight: 700,
                  }}
                >
                  {b.tags?.[0] || "blog"}
                </div>
              </div>

              {/* CONTENT */}
              <div style={{ padding: "28px 28px 32px" }}>
                <h3
                  style={{
                    fontSize: 18,
                    fontWeight: 700,
                    lineHeight: 1.4,
                    marginBottom: 16,
                  }}
                >
                  {b.title}
                </h3>

                <div
                  style={{ display: "flex", alignItems: "center", gap: 20 }}
                >
                  {/* DATE */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      color: "#5A6478",
                    }}
                  >
                    <Clock size={13} />
                    {new Date(b.created_at).toLocaleDateString()}
                  </div>

                  {/* READ TIME (generated) */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: 13,
                      color: "#5A6478",
                    }}
                  >
                    <User size={13} />
                    {Math.ceil((b.content?.length || 100) / 200)} min read
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default page;