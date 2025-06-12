'use client'

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const images = [
  '/images/image1.jpg',
  '/images/image2.jpg',
  '/images/image3.jpg',
];

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSecondLine, setShowSecondLine] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    const timer = setTimeout(() => setShowSecondLine(true), 1800);
    return () => {
      clearInterval(interval);
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (!videoRef.current) return;
      const rect = videoRef.current.getBoundingClientRect();
      setIsSticky(rect.top <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full relative">
      {/* Top Black Section */}
      <div className="relative bg-black w-full min-h-[60vh] flex flex-col justify-between pt-24 z-10">
        {/* Navbar */}

        {/* Centered Title */}
        <div className="flex-1 flex flex-col justify-center px-8 pb-4">
          <h1 className="font-bold text-3xl md:text-6xl lg:text-7xl leading-tight max-w-5xl">
            <span className="block text-white animate-fadeUp">Your Gateway to Luxury</span>
            {showSecondLine && (
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 animate-fadeUp delay-0">
                Real Estate in Dubai
              </span>
            )}
          </h1>
          <style jsx>{`
            @keyframes fadeUp {
              0% {
                opacity: 0;
                transform: translateY(80px);
              }
              60% {
                opacity: 0.7;
                transform: translateY(20px);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .animate-fadeUp {
              opacity: 0;
              animation: fadeUp 1.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
              will-change: opacity, transform;
            }
            .delay-1800 {
              animation-delay: 1.8s;
            }
            @keyframes fadeInScale {
              0% {
                opacity: 0;
                transform: scale(0.96);
              }
              100% {
                opacity: 1;
                transform: scale(1);
              }
            }
            .animate-fadeInScale {
              opacity: 0;
              animation: fadeInScale 1.2s cubic-bezier(0.23, 1, 0.32, 1) 3.6s forwards;
              will-change: opacity, transform;
            }
          `}</style>
        </div>
      </div>
      {/* Sticky Video Section */}
      <div ref={videoRef} className="sticky top-0 z-20 h-screen w-full flex justify-center items-center bg-black">
        <div
          className={`transition-all duration-700 ease-in-out ${isSticky ? 'w-full' : 'w-[98vw] md:w-[85vw]'} h-full overflow-hidden`}
        >
          <video
            src="https://cdn.pixabay.com/video/2020/08/12/46950-450094784_large.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover animate-fadeInScale"
          />
        </div>
      </div>
    </div>
  );
};

export default Banner;
