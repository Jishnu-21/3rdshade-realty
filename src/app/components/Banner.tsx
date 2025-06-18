'use client'

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

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
      <div className="relative z-10 flex flex-col items-start justify-center px-8 text-white text-left w-full pt-64 mt-[-20] flex-grow">
        <h1 className="font-bold text-4xl md:text-6xl lg:text-7xl leading-tight mb-4 ">
          Exclusive Properties <br /> for the Elite
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Discover our curated collection of the world's most extraordinary homes, where luxury meets perfection.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <Link href="#" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white text-base font-semibold px-6 py-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition-colors duration-300">
            View Collection
          </Link>
          <Link href="#" className="border border-white text-white text-base font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-black transition-colors duration-300">
            Learn More
          </Link>
        </div>
      </div>

      {/* Stats Section */}
      <div className="relative z-10 w-full py-20 px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
              12
            </div>
            <div className="text-sm md:text-base font-medium opacity-90">
              Exclusive Properties
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
              $50M+
            </div>
            <div className="text-sm md:text-base font-medium opacity-90">
              Average Property Value
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
              100%
            </div>
            <div className="text-sm md:text-base font-medium opacity-90">
              Client Satisfaction
            </div>
          </div>
          <div className="flex flex-col items-center">
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 text-white">
              25+
            </div>
            <div className="text-sm md:text-base font-medium opacity-90">
              Years Experience
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;