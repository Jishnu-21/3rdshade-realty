'use client'
import React from 'react';
import { motion } from 'framer-motion';

const lines = [
  'GUIDANCE',
  'TRUST',
  'DELIVERY',
];


  


// Updated responsive zigzag offsets with better iPad/tablet support
const zigzagOffsets = [
  'ml-4 sm:ml-8 md:ml-16 lg:ml-32 xl:ml-10',     // 1st line: progressive left margins
  'ml-1 sm:ml-2 md:ml-4 lg:-ml-8 xl:-ml-40',     // 2nd line: positive margins on smaller screens, negative on larger
  'ml-2 sm:ml-6 md:ml-12 lg:ml-24 xl:ml-4',     // 3rd line: progressive left margins
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
      <div className="max-w-screen-xl mx-auto px-4 md:px-8">
        <motion.div
          variants={parentVariants}
          initial="hidden"
          animate="visible"
          className="w-full flex flex-col justify-center items-start"
        >
          {lines.map((line, idx) => (
            <motion.div
              key={idx}
              className={`flex w-full items-center justify-start ${zigzagOffsets[idx % zigzagOffsets.length]}`}
              variants={lineVariants}
            >
              <h1
                className="text-white break-words text-left w-full"
                style={{
                  fontSize: 'clamp(2.5rem, 8vw + 1rem, 9.5rem)',
                  lineHeight: 'clamp(0.85, 0.9, 1.1)',
                  letterSpacing: 'clamp(-0.06em, -0.04em, -0.02em)',
                  fontFamily: 'Montserrat, Helvetica, sans-serif',
                  fontWeight: 500,
                  textShadow: '0 2px 24px rgba(0,0,0,0.15)',
                  wordBreak: 'break-word',
                  padding: 'clamp(0.05em, 0.08em, 0.10em) 0',
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