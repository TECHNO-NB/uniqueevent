//@ts-nocheck
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import logo from "../../public/logo.jpeg";

export default function Navbar() {
  const router = useRouter();

  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = ["About", "Services", "Gallery", "Testimonials", "Contact"];

  const handleNavigate = (link: string) => {
    const path = link.toLowerCase();

    if (path === "home") {
      router.push("/");
    } else if (path === "services") {
      router.push("/weddingservices");
    } else if (path === "gallery") {
      router.push("/memories");
    } else {
      router.push(`/${path}`);
    }

    setMenuOpen(false);
  };

  return (
    <>
      {/* NAVBAR */}
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300
        ${scrolled ? "bg-white shadow-md" : "bg-white"}`}
      >
        <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
          {/* LOGO */}
          <div
            onClick={() => handleNavigate("home")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <Image
              src={logo}
              width={55}
              height={55}
              alt="logo"
              className="rounded-md object-cover"
            />

            <span className="text-xl md:text-2xl font-semibold tracking-wide text-[#ffd700]">
              UNIQUE EVENT
            </span>
          </div>

          {/* DESKTOP MENU */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link}>
                <button
                  onClick={() => handleNavigate(link)}
                  className="uppercase text-sm tracking-wider text-black hover:text-[#ffd700] transition duration-300 cursor-pointer"
                >
                  {link}
                </button>
              </li>
            ))}
          </ul>

          {/* DESKTOP BUTTON */}
          <button
            onClick={() => router.push("/contact")}
            className="hidden md:block bg-[#ffd700] hover:bg-yellow-500 text-white px-5 py-2 rounded-md uppercase text-xs tracking-widest transition duration-300"
          >
            Get a Quote
          </button>

          {/* MOBILE TOGGLE */}
          <button
            className="md:hidden text-black z-60"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 w-full h-screen bg-white z-40 flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link, index) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => handleNavigate(link)}
                className="text-3xl font-medium text-black hover:text-[#ffd700] transition duration-300"
              >
                {link}
              </motion.button>
            ))}

            <button
              onClick={() => {
                router.push("/contact");
                setMenuOpen(false);
              }}
              className="mt-4 bg-[#ffd700] text-white px-6 py-3 rounded-md uppercase text-sm tracking-wider"
            >
              Get a Quote
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
