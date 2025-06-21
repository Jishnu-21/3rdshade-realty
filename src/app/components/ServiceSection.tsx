'use client'
import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const services = [
  {
    title: 'Branding',
    description: 'Build a powerful, memorable brand identity that sets you apart in the real estate market.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'SEO',
    description: 'Optimize your online presence to rank higher in search results and attract more qualified leads.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750498823/seo_q1e3dk.png',
  },
  {
    title: 'Website Development',
    description: 'Get a stunning, high-performance website tailored for real estate, with seamless user experience.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=0',
  },
  {
    title: 'Performance Marketing',
    description: 'Drive measurable results with targeted digital campaigns and data-driven marketing strategies.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'UI/UX',
    description: 'Delight your users with intuitive, beautiful interfaces and seamless digital experiences.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Consulting',
    description: 'Expert advice and strategic guidance to help you grow and scale your real estate business.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Ecommerce Listing',
    description: 'Expand your reach with professional ecommerce listing services for your properties.',
    image: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
  },
  {
    title: 'Social Media',
    description: 'Engage your audience and build your brand with creative, effective social media strategies.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80',
  },
];

const serviceVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' as const, stiffness: 80 } },
};

// Animation variants for letter-by-letter title
const titleParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};
const letterVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 500, damping: 30 } },
};

export default function ServiceSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  // Hide pointer on mouse leave
  const handlePointerLeave = () => {
    setPointer(null);
    setHoveredIdx(null);
  };

  // Show pointer and update position
  const handlePointerMove = (e: React.MouseEvent, idx: number) => {
    setHoveredIdx(idx);
    setPointer({ x: e.clientX, y: e.clientY });
  };

  return (
    <section className="w-full bg-black py-20 relative">
      <div className="w-full max-w-screen-4xl ">
        <div className="flex items-center mb-2">
          <motion.h2
            className="text-white text-3xl md:text-5xl font-extrabold text-center mx-auto flex gap-1"
            variants={titleParent}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {Array.from('OUR SERVICES').map((char, idx) => (
              <motion.span
                key={idx}
                variants={letterVariant}
                style={{ display: char === ' ' ? 'inline-block' : 'inline-block', minWidth: char === ' ' ? '0.5em' : undefined }}
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>
        <hr className="border-neutral-700 mb-12" />
        <div className="flex flex-col gap-32">
          {services.map((service, idx) => (
            <React.Fragment key={service.title}>
              <motion.div
                className="w-full"
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div
                  className={`w-full flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''} gap-8 md:gap-20 items-end group relative`}
                  onMouseMove={e => handlePointerMove(e, idx)}
                  onMouseLeave={handlePointerLeave}
                  style={{ cursor: hoveredIdx === idx ? 'none' : 'auto' }}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                    />
                  </div>
                  {/* Content */}
                  <div className="w-full md:w-1/2 flex flex-col justify-end pb-8 relative cursor-pointer group">
                    <h3 className="text-white text-2xl md:text-4xl font-extrabold mb-6 leading-tight transition-colors duration-300 group-hover:text-gradient bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
                      {service.title}
                    </h3>
                    <p className="text-neutral-300 text-lg md:text-xl leading-relaxed">
                      {service.description}
                    </p>
                    <div className="text-neutral-500 text-sm mt-6">
                      Strategy, Brand, Digital, Development, Motion
                    </div>
                  </div>
                </div>
              </motion.div>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Custom Pointer */}
      <AnimatePresence>
        {pointer && hoveredIdx !== null && (
          <motion.div
            className="fixed z-[9999] pointer-events-none"
            style={{ left: pointer.x - 80, top: pointer.y - 80 }}
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 shadow-2xl animate-pulse">
              <span className="text-white font-bold text-lg select-none">Enquire Now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}