'use client'
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function ServiceIntro() {
  return (
    <section className="relative w-full bg-black py-20 flex items-center min-h-[60vh]">
      {/* Smaller Gradient Glow */}
      <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 h-1/2 w-1/6 pointer-events-none z-0">
        <div className="h-full w-full rounded-full blur-2xl opacity-60 bg-gradient-to-br from-purple-500 via-pink-500 to-transparent animate-pulse" />
      </div>
      <div className="w-full">
        <motion.div
          className="relative z-10 flex flex-col items-start text-left w-full"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-white font-serif text-3xl md:text-5xl lg:text-6xl font-normal mb-10 max-w-4xl text-left">
            Through strategy, innovation and creativity we take your brand on a journey of discovery and transformation creating emotional experiences that leave a lasting impression and drive behaviour.
          </h2>
          <Link
            href="#about"
            className="mt-2 px-8 py-3 rounded-full border border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors duration-200 shadow-lg"
          >
            About us &rarr;
          </Link>
        </motion.div>
      </div>
    </section>
  );
} 