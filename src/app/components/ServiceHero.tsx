'use client'
import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  'SERVICES',
  'PROVIDES',
  'FOR REAL ESTATE',
];

const zigzagOffsets = [
  'ml-80',           // 1st line: flush left
  '-ml-26 md:-ml-2', // 2nd line: outdented left
  'ml-45',           // 3rd line: flush left
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
    <section className="w-full min-h-screen flex flex-col justify-center items-center select-none bg-black">
      <div className="w-full max-w-screen-4xl mx-auto px-4 md:px-8">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-6xl">
            <motion.div
              variants={parentVariants}
              initial="hidden"
              animate="visible"
            >
              {lines.map((line, idx) => (
                <motion.div
                  key={idx}
                  className={`flex w-full ${zigzagOffsets[idx % zigzagOffsets.length]} items-center`}
                  variants={lineVariants}
                >
                  <h1
                    className="text-white font-extrabold break-words text-left"
                    style={{
                      fontSize: 'clamp(3.5rem, 13vw, 8.5rem)',
                      lineHeight: 1.05,
                      letterSpacing: '-0.04em',
                      fontFamily: 'Arial, Helvetica, sans-serif',
                      fontWeight: 500,
                      textShadow: '0 2px 24px rgba(0,0,0,0.15)',
                      width: '100%',
                      wordBreak: 'break-word',
                      padding: '0.10em 0',
                    }}
                  >
                    {line}
                  </h1>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
} 