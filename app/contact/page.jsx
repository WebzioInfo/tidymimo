"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import TextReveal from "../components/TextReveal";
import { MapPin, Mail, Globe, Phone } from "lucide-react";
import MagneticButton from "../components/MagneticButton";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle, loading, success, error
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus("loading");
    setErrorMessage("");

    try {
      await axios.post("/api/contact", formData);
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setErrorMessage(err.response?.data?.error || "Failed to send message. Please try again.");
    }
  };

  return (
    <div className="pt-[140px] pb-[100px] min-h-screen bg-bg-main">
      <div className="container mx-auto px-5 max-w-[1000px]">
        <TextReveal text="Contact Us" />
        <p className="text-center text-text-secondary text-xl mt-6 mb-16">
          We’d love to hear from you! Whether you’re a distributor, retailer, or end user, Tidymimo is ready to serve your cleaning needs.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mt-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
            
            <div className="bg-bg-surface p-10 rounded-3xl border border-glass-border h-full backdrop-blur-glass">
              <h3 className="text-xl mb-3 text-text-primary flex items-center gap-2.5">
                <MapPin size={24} /> Location :
              </h3>
              <div className="mb-8">
                <p className="text-lg text-text-secondary leading-relaxed mb-4">
                  <a 
                    href="https://www.google.com/maps/place/Verdindies+Biotech+Industries+Pvt+Ltd/@11.1227193,76.1189432,17z/data=!3m1!4b1!4m6!3m5!1s0x3ba63715d94adb11:0xc5a850446e02b5ac!8m2!3d11.122714!4d76.1215181!16s%2Fg%2F11rxhwkzwn?authuser=0&entry=ttu&g_ep=EgoyMDI2MDMzMC4wIKXMDSoASAFQAw%3D%3D"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-primary-pink transition-colors"
                  >
                    <strong>Verdindies Biotech Industries</strong><br />
                    Kerala, India – PIN 676126
                  </a>
                </p>
                <iframe 
                  src="https://maps.google.com/maps?q=11.122714,76.1215181&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  width="100%" 
                  height="220" 
                  style={{ border: 0, borderRadius: '16px' }}
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Verdindies Biotech Industries Location"
                ></iframe>
              </div>

         <h3 className="text-xl mb-3 text-text-primary flex items-center gap-2.5">
  <Mail size={24} /> Email:
</h3>
<p className="text-lg text-text-secondary leading-relaxed mb-8">
  <a href="mailto:info@tidymimo.com" className="text-primary-pink">
    info@tidymimo.com
  </a>
</p>

<h3 className="text-xl mb-3 text-text-primary flex items-center gap-2.5">
  <Phone size={24} /> Phone / WhatsApp:
</h3>
<p className="text-lg text-text-secondary leading-relaxed mb-8">
  <a
    href="https://wa.me/918593940001"
    target="_blank"
    rel="noreferrer"
    className="text-primary-pink"
  >
    +91 85 93 94 00 01
  </a>
</p>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="bg-bg-surface p-10 rounded-[2rem] border border-glass-border backdrop-blur-glass">
            <h2 className="text-3xl font-clash mb-8 text-text-primary">Send us a message</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              {status === "success" && (
                <div className="bg-[#059669]/10 border border-[#059669]/30 text-[#059669] p-4 rounded-xl text-sm font-medium">
                  ✓ Message sent successfully! We'll get back to you soon.
                </div>
              )}
              
              {status === "error" && (
                <div className="bg-[#D41479]/10 border border-[#D41479]/30 text-[#D41479] p-4 rounded-xl text-sm font-medium">
                  {errorMessage}
                </div>
              )}

              <input 
                type="text" 
                placeholder="Name" 
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="p-4 rounded-xl border border-glass-border bg-transparent text-text-primary focus:outline-none focus:border-primary-pink transition-colors" 
              />
              <input 
                type="email" 
                placeholder="Email" 
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="p-4 rounded-xl border border-glass-border bg-transparent text-text-primary focus:outline-none focus:border-primary-pink transition-colors" 
              />
              <textarea 
                placeholder="Message" 
                rows={5} 
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="p-4 rounded-xl border border-glass-border bg-transparent text-text-primary resize-y focus:outline-none focus:border-primary-pink transition-colors" 
              />
              <div className="mt-2">
                <MagneticButton>
                  <button 
                    type="submit" 
                    disabled={status === "loading"}
                    className={`bg-primary-purple text-white border-none py-4 px-12 rounded-full font-semibold text-base inline-block hover:bg-primary-purple/90 transition-all duration-300 shadow-[0_8px_24px_rgba(108,42,121,0.25)] ${status === "loading" ? "opacity-70 cursor-not-allowed" : "cursor-pointer hover:scale-[1.02]"}`}
                  >
                    {status === "loading" ? "Sending..." : "Send Message"}
                  </button>
                </MagneticButton>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
