'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

// Use a modern abstract video as background
const VIDEO_URL = "https://videos.pexels.com/video-files/3611031/3611031-hd_1920_1080_24fps.mp4";

const CallToAction = () => {
  const [videoError, setVideoError] = useState(false);

  const handleVideoError = () => {
    setVideoError(true);
  };

  return (
    <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      
      <div className="absolute " />
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
        <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
          Ready to Find Your Dream Property?
        </h2>
        <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
          Let our experts guide you to the perfect luxury home that exceeds your expectations.
        </p>
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Link href="/services" passHref legacyBehavior>
            <a className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 text-center">
              View Services
            </a>
          </Link>
          <Link href="/properties" passHref legacyBehavior>
            <a className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300 text-center">
              View All Properties
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction; 