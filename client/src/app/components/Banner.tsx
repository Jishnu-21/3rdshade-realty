'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Animated number hook
function useAnimatedNumber(target: number, duration = 1, format?: (n: number) => string) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    let start: number | null = null;
    let frame: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / (duration * 1000), 1);
      setValue(target * progress);
      if (progress < 1) {
        frame = requestAnimationFrame(step);
      } else {
        setValue(target);
      }
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);
  if (format) return format(value);
  return Math.round(value);
}

const stats = [
  { value: 12, label: 'Exclusive Properties', format: (n: number) => Math.round(n).toString() },
  { value: 50, label: 'Average Property Value', prefix: '$', suffix: 'M+', format: (n: number) => `$${Math.round(n)}M+` },
  { value: 100, label: 'Client Satisfaction', suffix: '%', format: (n: number) => `${Math.round(n)}%` },
  { value: 25, label: 'Years Experience', suffix: '+', format: (n: number) => `${Math.round(n)}+` },
];

const Banner = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.log("Video autoplay failed:", error);
      });
    }
  }, []);

  return (
    <div className="w-full relative min-h-screen flex flex-col justify-between overflow-hidden bg-transparent">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full pt-24 md:pt-64 flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col items-start text-left">
          <motion.h1
            className="font-bold text-white text-4xl md:text-6xl lg:text-7xl leading-tight mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Elite Digital Strategy for
            <br/>Elite Properties
          </motion.h1>
          <motion.p
            className="text-lg text-white md:text-xl mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
Whether you're launching or expanding, we master every digital move that drives high-value real estate.
</motion.p>
          <motion.div
            className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/properties" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-semibold px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
              View Properties
            </Link>
            <Link href="/about" className="border border-white text-white text-base font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="relative z-10 w-full py-20 px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          {stats.map((stat, idx) => {
            const animated = useAnimatedNumber(stat.value, 1.2, stat.format);
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
                  {animated}
                </div>
                <div className="text-sm md:text-base font-medium opacity-90">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;