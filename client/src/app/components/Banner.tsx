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
    <div className="w-full relative min-h-screen flex flex-col justify-between overflow-hidden bg-transparent pt-20 md:pt-28">
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
      <div className="relative z-10 w-full flex-grow">
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex flex-col items-start text-left mt-6 sm:mt-10 md:mt-14 lg:mt-20 xl:mt-28">
          <motion.h1
            className="font-bold text-white text-2xl sm:text-4xl md:text-4xl lg:text-5xl xl:text-6xl leading-tight mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >Your Gateway to Dubai Real Estate
          <br/>Wherever You Are in the World
          </motion.h1>
          <motion.p
            className="text-sm sm:text-sm md:text-2xl lg:text-2xl text-white mb-6 sm:mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
Whether you're buying, selling, or investing  we make your Dubai property journey seamless and secure.
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
        className="relative z-10 w-full py-8 sm:py-10 md:py-12 px-4 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 text-center text-white px-0 justify-items-center justify-center">
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
                <div className="text-3xl md:text-4xl lg:text-5xl font-bold mb-1 text-white">
                  {animated}
                </div>
                <div className="text-xs md:text-sm font-medium opacity-90">
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