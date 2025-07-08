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
        className="absolute inset-0 w-full h-full object-cover "
      />
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Main Content */}
      <div className="relative z-10 w-full flex-grow">
        <div className="max-w-screen-2xl mx-auto px-2 xs:px-3 sm:px-4 md:px-8 flex flex-col items-start text-left mt-2 xs:mt-4 sm:mt-6 md:mt-10 lg:mt-16 xl:mt-20 2xl:mt-28">
          <motion.h1
            className="font-bold text-white text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl leading-tight mb-2 xs:mb-3 sm:mb-4"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >Your Gateway to Dubai Real Estate
          <br/>Wherever You Are in the World
          </motion.h1>
          <motion.p
            className="text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-white mb-4 xs:mb-5 sm:mb-6 md:mb-8 max-w-2xl"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
Whether you're buying, selling, or investing  we make your Dubai property journey seamless and secure.
</motion.p>
          <motion.div
            className="flex flex-row gap-x-2 xs:gap-x-3 sm:gap-x-4 md:gap-x-6 overflow-x-auto whitespace-nowrap"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Link href="/properties" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs xs:text-sm sm:text-base font-semibold px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
              View Properties
            </Link>
            <Link href="/about" className="border border-white text-white text-xs xs:text-sm sm:text-base font-semibold px-4 xs:px-5 sm:px-6 py-2 xs:py-2.5 sm:py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
              Learn More
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <motion.div
        className="relative z-10 w-full py-4 xs:py-5 sm:py-6 md:py-8 lg:py-10 xl:py-12 2xl:py-16 px-1 xs:px-2 sm:px-4 md:px-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-0 text-center text-white px-0 justify-items-center justify-center w-full">
          {stats.map((stat, idx) => {
            const animated = useAnimatedNumber(stat.value, 1.2, stat.format);
            return (
              <motion.div
                key={stat.label}
                className="flex flex-col items-center justify-center w-full px-1 xs:px-2 sm:px-4 md:px-6 lg:px-8 xl:px-10 2xl:px-12"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.2 * idx }}
              >
                <div className="text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold mb-1 text-white">
                  {animated}
                </div>
                <div className="text-[10px] xs:text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl 2xl:text-2xl font-medium opacity-90">
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