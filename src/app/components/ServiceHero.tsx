'use client'
import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  'SERVICES',
  'WE PROVIDE',
  'FOR REAL ESTATE',
];

const zigzagOffsets = [
  'justify-start', // left
  'justify-end',   // right
  'justify-center' // center
];

const parentVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.22,
    },
  },
};

const lineVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, type: 'spring' as const, stiffness: 80 } },
};

export default function ServiceHero() {
  return (
    <section className="w-full min-h-screen flex flex-col justify-center items-center select-none">
      <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
        >
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              className={`flex w-full ${zigzagOffsets[idx % zigzagOffsets.length]}`}
              variants={lineVariants}
            >
              <h1
                className="text-white font-bold"
                style={{
                  fontSize: 'clamp(2.5rem, 10vw, 8rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  fontFamily: 'Arial, Helvetica, sans-serif',
                  fontWeight: 700,
                  textShadow: '0 2px 24px rgba(0,0,0,0.25)',
                }}
              >
                {line}
              </h1>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
} 