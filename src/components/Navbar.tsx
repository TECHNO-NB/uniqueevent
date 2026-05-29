//@ts-nocheck
"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Code2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import logo from "../../public/logo.jpeg";
import Image from "next/image";

// ── NAV ───────────────────────────────────────────────────────────────────
export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useRouter();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const navLinks = ["About", "Services", "Gallery", "Testimonials", "Contact"];

  const handleNavigate = (link: string) => {
    const path = link.toLocaleLowerCase();
    if (path === "home") {
      navigate.push("/");
      setMenuOpen(false)
    }else if(path==="services"){
      navigate.push("/weddingservices")
      setMenuOpen(false)
} 
else if(path==="gallery"){
      navigate.push("/memories")
      setMenuOpen(false)
} 
else {
      navigate.push(`/${path}`);
      setMenuOpen(false)
    }
  };

  const [activeSection, setActiveSection] = useState("/");

  return (
    <>
    <nav className={`fixed top-0 inset-x-0 z-50 transition-all text-black  duration-500 ${scrolled ? "bg-white " : "bg-white"}`}>
           <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
              <div onClick={()=>handleNavigate("home")} className="flex gap-2 items-center justify-center">
               <Image src={logo} width={60} height={60} className=" rounded-md" alt="logo"/>
             <span className="font-display text-2xl font-light text-gold tracking-widest cursor-pointer text-[#ffd900]" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
               Unique <em className="not-italic font-semibold">Event</em>
             </span>
              </div>
             <ul className="hidden md:flex gap-8 list-none">
               {navLinks.map(l => (
                 <li key={l}>
                   <button onClick={() => handleNavigate(l)} className="text-black hover:text-gold text-xs tracking-widest uppercase font-medium transition-colors duration-300 cursor-pointer bg-transparent border-none">
                     {l}
                   </button>
                 </li>
               ))}
             </ul>
             <button onClick={() => navigate.push("contact")} className="hidden md:block bg-[#ffd700]/90 hover:bg-gold-light text-white text-xs tracking-widest uppercase px-5 py-2.5 cursor-pointer rounded-sm transition-all duration-300 hover:-translate-y-0.5">
               Get a Quote
             </button>
             <button className="md:hidden text-black" onClick={() => setMenuOpen(true)}>
               <Menu size={24} />
             </button>
           </div>
         </nav>
          {menuOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="fixed inset-0 bg-forest z-50 flex flex-col items-center justify-center gap-8">
          <button className="absolute top-6 right-6 text-black" onClick={() => setMenuOpen(false)}>
            <X size={28} />
          </button>
          {navLinks.map((l, i) => (
            <motion.button key={l} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}
              onClick={() => handleNavigate(l)} className="font-display text-4xl font-light text-black hover:text-gold transition-colors cursor-pointer bg-transparent border-none">
              {l}
            </motion.button>
          ))}
        </motion.div>
      )}

    </>
  );
}
