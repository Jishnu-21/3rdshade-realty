'use client';

import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header'
import Banner from './components/Banner';
import FeaturedProperties from "./components/FeaturedProperties";
import EliteServices from './components/EliteServices';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import dynamic from 'next/dynamic';
import FeaturedSlider from './components/FeaturedSlider';
import WebsiteWithPreloader from './components/VideoModal';

// Dynamically import VideoModal to avoid SSR issues with framer-motion
const VideoModal = dynamic(() => import('./components/VideoModal'), { ssr: false });

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000); // Adjust this delay as needed to match your loader's animation

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      
      <main >
        <WebsiteWithPreloader/>
        <Header />
        <div className="relative w-full min-h-screen">
          <video
            src="https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover z-[-2]"
          />
          <div className="absolute inset-0 bg-black opacity-40 z-[-1]"></div>
          <Banner />
        </div>
        <FeaturedSlider />
        <EliteServices/>
        <CallToAction/>
        <Footer/>
      </main>
    </>
  );
}