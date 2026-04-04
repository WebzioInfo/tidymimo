"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Star } from 'lucide-react';
import axios from 'axios';

export default function FeaturedProductsBento() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [startIndex, setStartIndex] = useState(0);
  
  useEffect(() => {
    axios.get('/api/products')
      .then((res) => {
        const productList = res.data || [];
        setProducts(productList);
      })
      .catch((err) => {
        console.error('Failed to load products for showcase:', err);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (products.length <= 3) return;
    const interval = setInterval(() => {
      setStartIndex((prev) => (prev + 3) % products.length);
    }, 10000);
    return () => clearInterval(interval);
  }, [products]);

  if (loading) {
    return <div className="h-[600px] w-full" />;
  }

  const fallback = [
    { id: '1', name: "Household Multi-Surface", description: "Premium formula for everyday brilliance. Removes 99.9% of stains effortlessly.", imageUrl: "https://images.unsplash.com/photo-1584820927498-cafe2c1c6a74?auto=format&fit=crop&q=80&w=800" },
    { id: '2', name: "Industrial Degreaser", description: "Heavy-duty lifting action for tough environments.", imageUrl: "https://images.unsplash.com/photo-1585002492160-c3d528b76255?auto=format&fit=crop&q=80&w=800" },
    { id: '3', name: "Fabric Softener Gold", description: "Enduring softness and encapsulated freshness pearls.", imageUrl: "https://images.unsplash.com/photo-1584518969469-c2d99c7760a0?auto=format&fit=crop&q=80&w=800" }
  ];

  const sourceProducts = products.length >= 3 ? products : fallback;
  const displayProducts = Array.from({ length: 3 }).map((_, i) => {
    return sourceProducts[(startIndex + i) % sourceProducts.length];
  });

  return (
    <section className="py-24 md:py-36 px-[5%] reveal-section">
      <div className="container mx-auto">
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h2 className="heading-lg">Premium <span className="text-gradient">Selection</span></h2>
            <p className="text-text-secondary text-lg md:text-xl mt-4 max-w-xl">Curated formulations engineered for uncompromising perfection. Discover our signature products.</p>
          </div>
          <Link href="/products" className="btn-glass px-8 py-4 rounded-xl border border-glass-border font-bold hover:border-primary-pink/50 transition-colors flex items-center gap-2">
            View Collection <ArrowRight size={20} />
          </Link>
        </div>

        {/* Bento Grid Layout - Uses Tailwind CSS Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-auto md:h-[480px] stagger-grid">
          
          {/* Main Hero Card (Takes 2 cols left, full height) */}
          <BentoCard 
            product={displayProducts[0]} 
            className="md:col-span-2 md:row-span-2 h-[350px] md:h-full glass-panel"
            isLarge
          />

          {/* Top Right Card */}
          <BentoCard 
            product={displayProducts[1]} 
            className="md:col-span-1 h-[240px] md:h-full glass-panel"
          />

          {/* Bottom Right Card */}
          <BentoCard 
            product={displayProducts[2]} 
            className="md:col-span-1 h-[240px] md:h-full glass-panel"
          />
          
        </div>
      </div>
    </section>
  );
}

function BentoCard({ product, className, isLarge = false }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <Link 
      href={`/products`} 
      className={`block relative rounded-3xl overflow-hidden group border-none ${className}`} 
      onMouseMove={handleMouseMove}
    >
      
      {/* Dynamic Glow hovering over the card */}
      <div 
        className="absolute w-[400px] h-[400px] bg-primary-pink/30 rounded-full blur-[100px] pointer-events-none transition-opacity duration-700 opacity-0 group-hover:opacity-100 z-10"
        style={{
          left: mousePosition.x - 200,
          top: mousePosition.y - 200,
        }}
      />

      {/* Internal Gradient Overlay so text is always readable */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/95 via-[#050505]/40 to-transparent z-20 p-6 md:p-8 flex flex-col justify-end pointer-events-none">
        <div className="transform translate-y-6 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          
          {isLarge && (
            <div className="flex items-center gap-2 mb-3 text-primary-pink font-bold text-xs tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-700">
              <Star size={14} fill="currentColor" /> Signature Label
            </div>
          )}
          
          <h3 className={`${isLarge ? 'text-3xl md:text-4xl lg:text-5xl' : 'text-2xl'} font-black text-white tracking-tight mb-2`}>
            {product.name}
          </h3>
          
          <p className={`text-white/70 line-clamp-2 ${isLarge ? 'text-lg md:text-xl pr-10' : 'text-base pr-4'} mb-6`}>
            {product.description}
          </p>
          
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-75 flex items-center gap-3 text-white font-bold">
            Explore Formula <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform duration-300" />
          </div>
        </div>
      </div>

      {/* Background Image scaling on hover */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={product.id}
          className="absolute inset-0 z-0 h-full w-full"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image 
            src={product.imageUrl || 'https://images.unsplash.com/photo-1584820927498-cafe2c1c6a74?auto=format&fit=crop&q=80&w=800'} 
            alt={product.name} 
            fill
            className="object-cover object-center opacity-80"
          />
        </motion.div>
      </AnimatePresence>
    </Link>
  );
}
