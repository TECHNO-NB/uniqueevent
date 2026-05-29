// @ts-nocheck
"use client";

import React, { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import {
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Clock,
  Heart,
} from "lucide-react";
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

const Page = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    bridename: "",
    groomname: "",
    phone: "",
    weddingdate: "",
    location: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/contacts`, {
        bridename: formData.bridename,
        groomname: formData.groomname,
        phone: formData.phone,
        location: formData.location,
        message: formData.message,
      });

      if (response.status === 200) {
        setSubmitted(true);

        setFormData({
          bridename: "",
          groomname: "",
          phone: "",
          weddingdate: "",
          location: "",
          message: "",
        });
      }
    } catch (error) {
      console.log(error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-24 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-14">
          <p className="text-gold text-xs tracking-[0.35em] uppercase font-medium mb-3">
            Get in Touch
          </p>

          <h2
            className="font-display text-[#ffd700] leading-tight mb-4"
            style={{ fontSize: "clamp(2rem, 5vw, 3.2rem)" }}
          >
            Let's Plan Your{" "}
            <em className="italic text-gold">Dream Wedding</em>
          </h2>

          <div className="w-12 h-0.5 bg-gold" />
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-14">
          {/* Info */}
          <FadeUp>
            <div className="space-y-6">
              {[
                {
                  icon: MapPin,
                  label: "Location",
                  value:
                    "Tilottama-5, Manigram, Rupandehi, Lumbini Province, Nepal",
                },
                {
                  icon: Phone,
                  label: "Phone",
                  value: "+977-9857017102 +977-9811463049",
                },
                {
                  icon: Mail,
                  label: "Email",
                  value: "hello@uniqueevent.com.np",
                },
                {
                  icon: Clock,
                  label: "Hours",
                  value: "Sunday – Friday: 9am – 7pm",
                },
              ].map(({ icon: Icon, label, value }) => (
                <div key={label} className="flex gap-4 items-start">
                  <div className="w-10 h-10 rounded-full bg-forest flex items-center justify-center shrink-0">
                    <Icon size={16} color="#b8934a" />
                  </div>

                  <div>
                    <p className="text-xs tracking-widest uppercase text-muted font-medium mb-0.5">
                      {label}
                    </p>

                    <p className="font-display text-charcoal text-base">
                      {value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Form */}
          <FadeUp delay={0.15}>
            {submitted ? (
              <div className="flex flex-col items-center justify-center h-full text-center gap-4 py-12">
                <Heart size={40} className="text-gold" fill="currentColor" />

                <h3 className="font-display text-2xl text-forest">
                  Thank You!
                </h3>

                <p className="text-muted text-sm leading-relaxed max-w-xs">
                  We've received your message and will reach out within 24
                  hours to begin planning your perfect day.
                </p>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-muted font-medium">
                      Bride's Name
                    </label>

                    <input
                      name="bridename"
                      value={formData.bridename}
                      onChange={handleChange}
                      className="bg-white border border-black/10 text-black focus:border-[#ffd700] outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors"
                      placeholder="Name"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-muted font-medium">
                      Groom's Name
                    </label>

                    <input
                      name="groomname"
                      value={formData.groomname}
                      onChange={handleChange}
                      className="bg-white border border-black/10 text-black focus:border-gold outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors"
                      placeholder="Name"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-muted font-medium">
                      Phone
                    </label>

                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="bg-white border border-black/10 text-black focus:border-gold outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors"
                      placeholder="+977-"
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs tracking-widest uppercase text-muted font-medium">
                      Wedding Date
                    </label>

                    <input
                      type="date"
                      name="weddingdate"
                      value={formData.weddingdate}
                      onChange={handleChange}
                      className="bg-white border border-black/10 text-black focus:border-gold outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors"
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted font-medium">
                    Venue / Location
                  </label>

                  <input
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="bg-white border border-black/10 focus:border-gold text-black outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors"
                    placeholder="Preferred venue or area"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs tracking-widest uppercase text-muted font-medium">
                    Tell Us About Your Dream Wedding
                  </label>

                  <textarea
                    rows={4}
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    className="bg-white border border-black/10 text-black focus:border-gold outline-none rounded-sm px-4 py-2.5 text-sm font-light transition-colors resize-none"
                    placeholder="Guest count, theme, special requests…"
                  />
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="bg-[#ffd700]/90 hover:bg-forest-light text-white text-xs tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-300 hover:-translate-y-0.5 self-start flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? "Sending..." : "Send Enquiry"}

                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </FadeUp>
        </div>
      </div>
    </section>
  );
};

export default Page;