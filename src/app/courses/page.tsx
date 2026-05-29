// @ts-nocheck
"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  Clock,
  BookOpen,
  Users,
  Play,
  Heart,
} from "lucide-react";
import "../globals.css"
import "../App.css"

/* -------------------------------------------------------------------------- */
/* TYPES */
/* -------------------------------------------------------------------------- */

type Level = "Beginner" | "Intermediate" | "Advanced";

type Category =
  | "All"
  | "Design"
  | "Development"
  | "AI & ML"
  | "Data Science"
  | "Marketing"
  | "Business";

interface Course {
  id: number;
  title: string;
  instructor: string;
  instructorAvatar: string;
  category: Exclude<Category, "All">;
  level: Level;
  rating: number;
  reviews: number;
  students: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice: number;
  thumbnail: string;
  gradient: string;
  accent: string;
  tags: string[];
  badge?: string;
  description: string;
}

/* -------------------------------------------------------------------------- */
/* DATA */
/* -------------------------------------------------------------------------- */

const thumbnailIcons: Record<string, string> = {
  design: "🎨",
  dev: "⚡",
  ml: "🧠",
  data: "📊",
  brand: "✦",
  business: "🚀",
  css: "✨",
  genai: "🤖",
  pm: "🗂️",
};

const courses: Course[] = [
  {
    id: 1,
    title: "Digital Marketing",
    instructor: "Sarah Chen",
    instructorAvatar: "SC",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.9,
    reviews: 2847,
    students: 18500,
    duration: "42h 30m",
    lessons: 156,
    price: 89,
    originalPrice: 199,
    thumbnail: "brand",
    gradient: "from-pink-600/20 via-rose-500/10 to-transparent",
    accent: "#fb7185",
    tags: ["Facebook Ads", "Google Ads", "Content Strategy"],
    badge: "Bestseller",
    description:
      "Learn social media marketing, paid advertising, branding, and growth strategies.",
  },

  {
    id: 2,
    title: "Full Stack Web Development",
    instructor: "Marcus Reid",
    instructorAvatar: "MR",
    category: "Development",
    level: "Advanced",
    rating: 4.8,
    reviews: 3102,
    students: 22000,
    duration: "68h 15m",
    lessons: 234,
    price: 99,
    originalPrice: 249,
    thumbnail: "dev",
    gradient: "from-cyan-600/20 via-blue-500/10 to-transparent",
    accent: "#67e8f9",
    tags: ["React", "Next.js", "TypeScript"],
    badge: "Hot",
    description:
      "Build modern full-stack applications using React, Next.js, APIs, and databases.",
  },

  {
    id: 3,
    title: "Graphic Design & Video Editing",
    instructor: "Emma Wilson",
    instructorAvatar: "EW",
    category: "Design",
    level: "Intermediate",
    rating: 4.7,
    reviews: 1921,
    students: 14300,
    duration: "51h 20m",
    lessons: 189,
    price: 79,
    originalPrice: 179,
    thumbnail: "design",
    gradient: "from-violet-600/20 via-fuchsia-500/10 to-transparent",
    accent: "#c084fc",
    tags: ["Photoshop", "Illustrator", "Premiere Pro"],
    badge: "Bestseller",
    description:
      "Master graphic design, branding, motion graphics, and professional video editing.",
  },

  {
    id: 4,
    title: "AI Tools & Productivity Course",
    instructor: "David Kim",
    instructorAvatar: "DK",
    category: "AI & ML",
    level: "Beginner",
    rating: 4.9,
    reviews: 4120,
    students: 27500,
    duration: "28h 40m",
    lessons: 118,
    price: 69,
    originalPrice: 149,
    thumbnail: "genai",
    gradient: "from-emerald-500/20 via-teal-400/10 to-transparent",
    accent: "#34d399",
    tags: ["ChatGPT", "Automation", "AI Workflows"],
    badge: "Hot",
    description:
      "Boost productivity using AI tools, automation systems, and smart workflows.",
  },

  {
    id: 5,
    title: "SEO Mastery",
    instructor: "Olivia Carter",
    instructorAvatar: "OC",
    category: "Marketing",
    level: "Intermediate",
    rating: 4.8,
    reviews: 2501,
    students: 16800,
    duration: "34h 10m",
    lessons: 142,
    price: 74,
    originalPrice: 169,
    thumbnail: "brand",
    gradient: "from-yellow-500/20 via-orange-400/10 to-transparent",
    accent: "#fbbf24",
    tags: ["Technical SEO", "Keyword Research", "Backlinks"],
    badge: "Hot",
    description:
      "Learn on-page SEO, technical optimization, and ranking strategies for Google.",
  },

  {
    id: 6,
    title: "WordPress Development",
    instructor: "Nathan Brooks",
    instructorAvatar: "NB",
    category: "Development",
    level: "Beginner",
    rating: 4.7,
    reviews: 1740,
    students: 12000,
    duration: "39h 25m",
    lessons: 165,
    price: 59,
    originalPrice: 139,
    thumbnail: "css",
    gradient: "from-indigo-600/20 via-sky-500/10 to-transparent",
    accent: "#60a5fa",
    tags: ["WordPress", "Elementor", "WooCommerce"],
    badge: "Bestseller",
    description:
      "Create responsive websites and online stores using WordPress and Elementor.",
  },
];



const levelColors: Record<
  Level,
  { bg: string; text: string; border: string }
> = {
  Beginner: {
    bg: "rgba(110,231,183,0.1)",
    text: "#6ee7b7",
    border: "rgba(110,231,183,0.2)",
  },
  Intermediate: {
    bg: "rgba(251,191,36,0.1)",
    text: "#fbbf24",
    border: "rgba(251,191,36,0.2)",
  },
  Advanced: {
    bg: "rgba(248,113,113,0.1)",
    text: "#f87171",
    border: "rgba(248,113,113,0.2)",
  },
};

const badgeColors: Record<
  string,
  { bg: string; text: string }
> = {
  Bestseller: {
    bg: "rgba(251,191,36,0.15)",
    text: "#fbbf24",
  },
  Hot: {
    bg: "rgba(239,68,68,0.15)",
    text: "#f87171",
  },
};

/* -------------------------------------------------------------------------- */
/* COURSE CARD */
/* -------------------------------------------------------------------------- */

interface CourseCardProps {
  course: Course;
  index: number;
}

function CourseCard({ course, index }: CourseCardProps) {
  const [liked, setLiked] = useState(false);

  const levelStyle = levelColors[course.level];
  const badgeStyle = course.badge
    ? badgeColors[course.badge]
    : null;

  const discount = Math.round(
    ((course.originalPrice - course.price) /
      course.originalPrice) *
      100
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
      }}
      whileHover={{
        y: -4,
      }}
      className="group relative flex flex-col rounded-2xl overflow-hidden"
      style={{
        background: "#111118",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
    >
      {/* Thumbnail */}
      <div
        className={`relative h-44 flex items-center justify-center overflow-hidden bg-linear-to-br ${course.gradient}`}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${course.accent}30 0%, transparent 70%)`,
          }}
        />

        <span className="text-5xl z-10">
          {thumbnailIcons[course.thumbnail]}
        </span>

        {/* Play Overlay */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center"
            style={{ background: course.accent }}
          >
            <Play size={18} className="text-white ml-1" />
          </div>
        </div>

        {/* Badge */}
        {badgeStyle && (
          <div
            className="absolute top-3 left-3 px-2 py-1 rounded-md text-xs font-semibold"
            style={{
              background: badgeStyle.bg,
              color: badgeStyle.text,
            }}
          >
            {course.badge}
          </div>
        )}

        {/* Discount */}
        {/* <div className="absolute top-3 right-3 text-xs px-2 py-1 rounded-md bg-black/50 text-green-300">
          -{discount}%
        </div> */}

        {/* Like */}
        <button
          onClick={() => setLiked(!liked)}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-black/50 backdrop-blur flex items-center justify-center"
        >
          <Heart
            size={14}
            fill={liked ? "#f87171" : "none"}
            stroke={liked ? "#f87171" : "#7a7a9a"}
          />
        </button>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex justify-between items-center mb-3">
          <span
            className="text-xs"
            style={{ color: course.accent }}
          >
            {course.category}
          </span>

          <span
            className="text-xs px-2 py-1 rounded-full"
            style={{
              background: levelStyle.bg,
              color: levelStyle.text,
              border: `1px solid ${levelStyle.border}`,
            }}
          >
            {course.level}
          </span>
        </div>

        <h3 className="text-white font-bold text-lg mb-2">
          {course.title}
        </h3>

        <p className="text-sm text-gray-400 mb-4 line-clamp-2">
          {course.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-1 rounded-md bg-white/5 border border-white/10 text-gray-400"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Instructor */}
        {/* <div className="flex items-center gap-2 mb-4">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white"
            style={{
              background: `linear-gradient(135deg, ${course.accent}aa, ${course.accent})`,
            }}
          >
            {course.instructorAvatar}
          </div>

          <span className="text-sm text-gray-400">
            {course.instructor}
          </span>
        </div> */}

        {/* Stats */}
        <div className="flex items-center gap-4 text-xs text-gray-400 mb-4">
          <div className="flex items-center gap-1">
            <Star
              size={12}
              fill="#fbbf24"
              stroke="none"
            />
            {course.rating}
          </div>

          <div className="flex items-center gap-1">
            <Users size={12} />
            {course.students.toLocaleString()}
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-gray-400 mb-5">
          <div className="flex items-center gap-1">
            <Clock size={12} />
            {course.duration}
          </div>

          <div className="flex items-center gap-1">
            <BookOpen size={12} />
            {course.lessons} lessons
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto flex items-center justify-between">
          {/* <div className="flex items-center gap-2">
            <span className="text-white text-xl font-bold">
              ${course.price}
            </span>

            <span className="line-through text-gray-500 text-sm">
              ${course.originalPrice}
            </span>
          </div> */}

          <button
            className="px-4 py-2 rounded-lg text-xs font-semibold text-white"
            style={{
              background: `linear-gradient(135deg, ${course.accent}cc, ${course.accent})`,
            }}
          >
             <a
          href="https://wa.me/9779849307841"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-110 active:scale-95"
        >
            Enroll Now
            </a>
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* MAIN SECTION */
/* -------------------------------------------------------------------------- */

export default function CoursesSection() {
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = useMemo(() => {
    return courses.filter((course) =>
      course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <section className="max-w-7xl mx-auto px-4 py-20">
      <div className="mb-10">
        <h2 className="text-4xl font-bold text-white mb-3">
          Explore Courses
        </h2>

        <input
          type="text"
          placeholder="Search courses..."
          value={searchQuery}
          onChange={(e) =>
            setSearchQuery(e.target.value)
          }
          className="w-full max-w-md px-4 py-3 rounded-xl bg-[#111118] border border-white/10 text-white outline-none"
        />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {filtered.map((course, i) => (
            <CourseCard
              key={course.id}
              course={course}
              index={i}
            />
          ))}
        </motion.div>
      </AnimatePresence>
    </section>
  );
}