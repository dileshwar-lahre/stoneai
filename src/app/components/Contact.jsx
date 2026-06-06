'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FaWhatsapp, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { Navigation } from "lucide-react"; // Direction icon

// --- ANIMATION VARIANTS ---
const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
};

export default function ContactSection() {
  
  // Contact Links
  const whatsappUrl = "https://wa.me/919131460470?text=Hello%20Stonenox!%20Let's%20discuss%20my%20project.";
  const callUrl = "tel:+919131460470";
  const mailUrl = "mailto:support@stonenox.com";
  // Direct Google Maps Route Link to Sindhi Colony, Bilaspur
  const directionUrl = "https://www.google.com/maps/dir/?api=1&destination=Sindhi+Colony,+Bilaspur,+Chhattisgarh+495001";

  // Map Embed Link for showing the location
  const mapEmbedUrl = "https://maps.google.com/maps?q=Sindhi%20Colony,%20Bilaspur,%20Chhattisgarh&t=m&z=15&output=embed&iwloc=near";

  const contactButtons = [
    {
      name: "WhatsApp",
      icon: <FaWhatsapp size={32} />,
      link: whatsappUrl,
      hoverBg: "hover:bg-[#25D366]",
      textColor: "text-[#25D366]"
    },
    {
      name: "Call Us",
      icon: <FaPhoneAlt size={28} />,
      link: callUrl,
      hoverBg: "hover:bg-slate-900",
      textColor: "text-slate-900"
    },
    {
      name: "Email",
      icon: <FaEnvelope size={28} />,
      link: mailUrl,
      hoverBg: "hover:bg-blue-600",
      textColor: "text-blue-600"
    },
    {
      name: "Directions",
      icon: <Navigation size={32} strokeWidth={2} />,
      link: directionUrl,
      hoverBg: "hover:bg-red-500",
      textColor: "text-red-500"
    }
  ];

  return (
    <section id="contact" className="bg-slate-50 py-16 md:py-24 overflow-hidden font-sans selection:bg-black selection:text-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        
        {/* --- MINIMAL HEADER --- */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUpVariants}
          className="mb-10 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">
            Let's <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Connect.</span>
          </h2>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-stretch h-full">
          
          {/* --- LEFT: ICON ONLY GRID (Apple Control Center Style) --- */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="w-full lg:w-1/3 grid grid-cols-2 gap-4 h-full"
          >
            {contactButtons.map((btn, idx) => (
              <motion.a
                key={idx}
                variants={fadeUpVariants}
                href={btn.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`group relative flex flex-col items-center justify-center p-8 bg-white border border-slate-200 rounded-[2rem] shadow-sm transition-all duration-300 ${btn.hoverBg} hover:border-transparent hover:-translate-y-1 hover:shadow-xl aspect-square`}
              >
                {/* Icon */}
                <div className={`transition-all duration-300 group-hover:text-white group-hover:scale-110 group-hover:-rotate-3 ${btn.textColor}`}>
                  {btn.icon}
                </div>
                
                {/* Minimal Label (Appears cleanly below) */}
                <span className="absolute bottom-6 text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-white/90 transition-colors duration-300">
                  {btn.name}
                </span>
              </motion.a>
            ))}
          </motion.div>

          {/* --- RIGHT: THE CINEMATIC MAP --- */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="w-full lg:w-2/3 h-[400px] lg:h-auto min-h-[400px] rounded-[2rem] overflow-hidden shadow-lg border-[4px] border-white relative group bg-slate-200"
          >
            <iframe
              src={mapEmbedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale-[30%] group-hover:grayscale-0 transition-all duration-1000 w-full h-full object-cover"
            ></iframe>
            
            {/* Address Overlay Badge */}
            <div className="absolute top-6 left-6 right-6 md:right-auto bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-white/50">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-600 mb-1">
                Stonenox HQ
              </p>
              <p className="text-slate-900 text-sm font-bold leading-snug">
                Sindhi Colony, Bilaspur <br />
                Chhattisgarh 495001
              </p>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}