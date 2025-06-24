'use client'
import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  'POWERING ',
  'REALTY',
  'SERVICES',
];

const zigzagOffsets = [
  'ml-10 md:ml-320 ',           // 1st line: small left margin on mobile, large on desktop
  '-ml-5 md:-ml-66 lg:-mr-240', // 2nd line: almost flush on mobile, zig-zag on desktop
  'ml-3 md:ml-265',           // 3rd line: small left margin on mobile, large on desktop
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
    <section className="w-full min-h-screen flex flex-col justify-center items-center select-none bg-gradient-to-br from-purple-900 via-black to-black">
      <div className="w-full flex flex-col justify-center items-center px-4 md:px-8">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col justify-center items-center"
        >
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              className={`flex w-full items-center justify-center ${zigzagOffsets[idx % zigzagOffsets.length]}`}
              variants={lineVariants}
            >
              <h1
                className="text-white break-words text-left"
                style={{
                  fontSize: 'clamp(3.2rem, 13vw, 8.5rem)',
                  lineHeight: 1.05,
                  letterSpacing: '-0.04em',
                  fontFamily: 'Montserrat, Helvetica, sans-serif',
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
    </section>
  );
} 