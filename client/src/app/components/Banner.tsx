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
  { value: 100, label: 'Transparency & Compliance', suffix: '%', format: (n: number) => `${Math.round(n)}%` },
  { value: 24, label: 'Client Assistance Available', suffix: '/7', format: (n: number) => `${Math.round(n)}/7` },
  { value: 85, label: 'Client Retention on Repeat Deals', suffix: '%', format: (n: number) => `${Math.round(n)}%` },
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
    <div className="w-full relative min-h-screen flex flex-col justify-between overflow-hidden bg-transparent pt-16 sm:pt-20 md:pt-24 lg:pt-28">
      {/* Background Video */}
      <video
        ref={videoRef}
        src="https://cdn.pixabay.com/video/2020/08/12/46950-450094784_large.mp4"
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-grow flex items-center">
        <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 w-full">
          <motion.h1
            className="font-bold text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-3 sm:mb-4 md:mb-6 mt-8 sm:mt-0"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Your Gateway to Dubai Real Estate
            <br className="hidden sm:block" />
            <span className="block sm:inline">Wherever You Are in the World</span>
          </motion.h1>
          <motion.p
            className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-6 sm:mb-8 md:mb-10 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Whether you're buying, selling, or investing we make your Dubai property journey seamless and secure.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link 
              href="/properties" 
              className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300 text-center"
            >
              View Properties
            </Link>
            <Link 
              href="/about" 
              className="border border-white text-white text-sm sm:text-base font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-full hover:bg-white hover:text-black transition-colors duration-300 text-center"
            >
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="relative z-10 w-full py-6 sm:py-8 md:py-10 lg:py-12 px-4 sm:px-6 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center text-white">
            {stats.map((stat, idx) => {
              const animated = useAnimatedNumber(stat.value, 1.2, stat.format);
              return (
                <motion.div
                  key={stat.label}
                  className="flex flex-col items-center justify-center"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: 0.2 * idx }}
                >
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-2 sm:mb-3 text-white">
                    {animated}
                  </div>
                  <div className="text-xs sm:text-sm md:text-base lg:text-lg font-medium opacity-90 leading-tight px-2">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Banner;