"use client";

import Image from "next/image";
import { Target, Eye } from "lucide-react";

export default function About() {
  return (
    <div className="bg-bg-main text-text-primary overflow-x-hidden min-h-screen">
      
      {/* Hero Section with Minimal Accents */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        
        {/* Simple Design Accent: Ambient Glowing Orb */}
        <div className="absolute  top-[20%] left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(217,168,232,0.3)_0%,transparent_60%)] blur-[80px] z-0 pointer-events-none" />
        
        {/* Simple Design Accent: Floating Pill */}
        <div className="absolute top-[15%] right-[15%] px-6 py-3 bg-bg-surface/80 border border-glass-border rounded-full flex items-center gap-2 text-primary-purple font-medium backdrop-blur-md shadow-sm">
          <span className="w-2 h-2 rounded-full bg-primary-pink inline-block"></span>
          Trusted Partner
        </div>

        {/* Simple Design Accent: Abstract Ring */}
        <div className="absolute bottom-[15%] left-[10%] w-[120px] h-[120px] rounded-full border border-dashed border-primary-purple opacity-30" />

        <div className="relative z-10 text-center px-[5%]">
          <h1 className="text-[clamp(4rem,8vw,8rem)] text-text-primary m-0 tracking-[-0.04em] leading-none font-clash">
            Who We Are
          </h1>
          <p className="text-xl text-text-secondary mt-6 max-w-[600px] mx-auto">
            Conceptualized as “Tidymimo – Your Active Cleaning Partner,” our brand embodies efficiency, innovation, and care.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-32 px-[5%] max-w-[1300px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="relative h-[480px] w-full max-w-[420px] mr-auto lg:mx-auto rounded-[32px] overflow-hidden ">
            <Image src="/assets/Woman.png" alt="Tidy Mimo Story" fill className="object-cover" />
          </div>
          <div>
            <h2 className="text-[3.5rem] text-text-primary mb-10 tracking-tight leading-[1.1] font-clash">Driven by Excellence</h2>
            <div className="flex flex-col gap-6">
              <p className="text-[1.15rem] text-text-secondary leading-relaxed">
                Tidymimo is a trusted brand specializing in detergents and surfactants for both domestic and industrial use. We deliver powerful cleaning performance combined with refreshing fragrances to ensure spotless results.
              </p>
              <p className="text-[1.15rem] text-text-secondary leading-relaxed">
                At the heart of our brand is <strong>Mimo</strong>, a friendly rabbit — a universal symbol of cleanliness, purity, and gentleness. Just like Mimo, our products are designed to be active, fresh, and reliable, ensuring results every time.
              </p>
              <p className="text-[1.15rem] text-text-secondary leading-relaxed">
                We are committed to providing premium-quality cleaning products at reasonable prices, combining advanced formulations, pleasant fragrances, and superior performance to make every cleaning experience effortless and satisfying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision Bento */}
      <section className="py-20 px-[5%] max-w-[1300px] mx-auto relative">
        {/* Simple Design Accent */}
        <div className="absolute top-0 right-[5%] w-[300px] h-[300px] bg-primary-pink blur-[120px] opacity-20 z-0" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative z-10">
          <div className="glass-panel p-16 flex flex-col justify-center">
            <div className="w-[70px] h-[70px] rounded-full bg-primary-pink/10 text-primary-pink flex items-center justify-center mb-8">
              <Target size={36} />
            </div>
            <h3 className="text-5xl text-text-primary mb-6 tracking-tight font-clash">Our Mission</h3>
            <p className="text-xl text-text-secondary leading-relaxed">
              To make quality cleaning accessible for homes and businesses through effective products that deliver reliable results without compromise.
            </p>
          </div>
          <div className="glass-panel p-16 flex flex-col justify-center">
            <div className="w-[70px] h-[70px] rounded-full bg-primary-purple/10 text-primary-purple flex items-center justify-center mb-8">
              <Eye size={36} />
            </div>
            <h3 className="text-5xl text-text-primary mb-6 tracking-tight font-clash">Our Vision</h3>
            <p className="text-xl text-text-secondary leading-relaxed">
              To become a trusted and recognized name in the cleaning and hygiene industry known for innovation, quality, and customer satisfaction.
            </p>
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="pt-40 pb-48 px-[5%] max-w-[1300px] mx-auto relative">
        {/* Simple Design Accent */}
        <div className="absolute bottom-[10%] left-0 w-[400px] h-[400px] bg-sec-lavender blur-[150px] opacity-20 z-0" />
        
        <div className="text-center mb-24 relative z-10">
          <h2 className="text-[3.5rem] text-text-primary tracking-tight font-clash">Core Principles</h2>
          <p className="text-xl text-text-secondary mt-6">Tidymimo is built on four core principles driving every drop we bottle.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
          {[
            { title: 'Performance', desc: 'Products deliver incredibly strong and consistently effective cleaning results.' },
            { title: 'Freshness', desc: 'Long-lasting fragrances create a deeply refreshing cleaning experience.' },
            { title: 'Reliability', desc: 'Customers can definitively trust consistent volume, quality, and performance.' },
            { title: 'Accessibility', desc: 'Premium-quality cleaning solutions deliberately priced at reasonable, accessible rates.' }
          ].map((val, i) => (
            <div key={i} className="glass-panel py-16 px-12 text-center flex flex-col items-center">
              <div className="w-[60px] h-[60px] rounded-full border border-glass-border flex items-center justify-center bg-bg-surface text-primary-pink font-semibold text-xl mb-8">
                0{i + 1}
              </div>
              <h4 className="text-[1.8rem] text-text-primary mb-4 font-clash">{val.title}</h4>
              <p className="text-lg text-text-secondary leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
