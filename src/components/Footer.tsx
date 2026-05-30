// @ts-nocheck
"use client";
import React from "react";

import logo from "../../public/mithilatechlogo.jpeg";
import Image from "next/image";
import whatsapp from "../../public/whatsapp.png";
import { useRouter } from "next/navigation";
import { Heart, Mail, MapPin, Phone } from "lucide-react";

const NAV_LINKS = ["Home", "About", "Services", "Products", "Blogs", "Contact"];



const Footer = () => {
  const navigate =useRouter()
  const handleNavigate = (link: string) => {
    const path = link.toLocaleLowerCase();
    if (path === "home") {
      navigate.push("/");
    
    } else {
      navigate.push(`/${path}`);
    }
  };
  return (

     <footer className="bg-black text-white py-12 px-6 text-center">
      <div className="fixed bottom-6 right-6 z-50">
        <a
          href="https://wa.me/9779857017102"
          target="_blank"
          rel="noopener noreferrer"
          className="block transition-transform hover:scale-110 active:scale-95"
        >
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
          <Image
            src={whatsapp}
            alt="WhatsApp Support"
            className="w-10 h-10 drop-shadow-lg relative z-10"
          />
        </a>
      </div>
        <p className="font-display text-[#ffd700] text-3xl font-light tracking-wider mb-1">Unique Event</p>
        <p className="text-xs tracking-[0.3em] uppercase text-white/80 mb-6">Wedding Planners · Tilottama, Nepal</p>
        <div className="flex justify-center gap-6 mb-6">
          {[Phone, Mail, MapPin].map((Icon, i) => (
            <div key={i} className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center hover:border-gold hover:text-gold transition-colors cursor-pointer">
              <Icon size={14} />
            </div>
          ))}
        </div>
        <div className="w-10 h-px bg-gold mx-auto mb-5" />
        <p className="text-xs">© {new Date().getFullYear()} Unique Event. All rights reserved. Made with <Heart size={10} className="inline text-rose" fill="currentColor" /> in Manigram.</p>
        <div className=" text-center mt-6 text-blue ">  <a href="https://mithilatechsolutions.com/" className="w-full  text-blue-500 underline mt-6 text-center ">Developed By Mithila Tech & IT Solutions</a></div>
      </footer>
  
  );
};

export default Footer;
