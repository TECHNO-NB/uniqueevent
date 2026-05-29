// @ts-nocheck
"use client";

import Image from "next/image";
import "../../App.css";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const BlogPost = () => {
  const [BLOG, setBlog] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/blogs/${id}`,
        );

        // FIX: single object, not array
        const data = {
          ...res.data,
          tags: res.data.tags ? JSON.parse(res.data.tags) : [],
        };

        setBlog(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBlog();
  }, [id]);

  if (!BLOG) {
    return (
      <div style={{ color: "white", textAlign: "center", marginTop: 100 }}>
        Loading...
      </div>
    );
  }

  return (
    <main
      className="min-h-screen w-full flex flex-col items-center py-10 mt-50 px-6 md:px-12 bg-slate-950 text-slate-100"
      style={{ paddingTop: "120px" }}
    >
      <article className="max-w-3xl w-full flex flex-col items-center gap-8">
        {/* CATEGORY TAG */}
        <span className="px-4 py-1.5 text-xs md:text-sm font-semibold tracking-widest text-emerald-400 bg-emerald-400/10 border border-emerald-400/20 rounded-full uppercase">
          {BLOG.tags?.[0] || BLOG.category || "blog"}
        </span>

        {/* TITLE */}
        <h1 className="glow-text text-4xl md:text-4xl lg:text-4xl font-extrabold text-center leading-tight tracking-tight">
          {BLOG.title}
        </h1>

        {/* META */}
        <div className="flex items-center gap-4 text-sm font-medium text-slate-300">
          <time className="glass px-4 py-1.5 rounded-lg border border-white/10">
            {new Date(BLOG.created_at).toLocaleDateString()}
          </time>

          <span className="w-1.5 h-1.5 rounded-full bg-slate-600"></span>

          <span className="glass px-4 py-1.5 rounded-lg border border-white/10">
            {Math.ceil((BLOG.content?.length || 100) / 200)} min read
          </span>
        </div>

        {/* IMAGE */}
        <div className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-white/10 mt-4 group">
          <img
            src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/${BLOG.image?.replace(/\\/g, "/")}`}
            width={1200}
            height={600}
            className="w-full h-75 md:h-112.5 object-cover transition-transform duration-700 group-hover:scale-105"
            alt={BLOG.title}
            priority
          />
        </div>

        {/* CONTENT */}
        <div className="w-full mt-6 space-y-6 text-lg md:text-xl text-slate-300 leading-relaxed font-light">
          <ReactMarkdown>
            {String(BLOG?.content || "")
              .replace(/\*\*(.*?)\s+\*\*/g, "**$1**")
              .trim()}
          </ReactMarkdown>
        </div>
      </article>
    </main>
  );
};

export default BlogPost;
