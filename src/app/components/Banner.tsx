'use client'

import { useState, useEffect } from 'react';
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

  return (
    <div className="w-full">
      {/* Top Black Section */}
      <div className="relative bg-black w-full min-h-[60vh] flex flex-col justify-between pt-24">
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
      {/* Blue Section replaced with video */}
      <div className="relative w-full min-h-[40vh] mt-0">
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
  );
};

export default Banner;
