'use client';

import { useState } from 'react';
import Loader from './components/Loader';
import Header from './components/Header'
import Banner from './components/Banner';
import FeaturedProperties from "./components/FeaturedProperties";
import EliteServices from './components/EliteServices';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';
import FeaturedSlider from './components/FeaturedSlider';
import WebsiteWithPreloader from './components/VideoModal';

export default function Home() {
  return (
    <>
      {/* Preloader overlay and progressive reveal */}
      <WebsiteWithPreloader />
      {/* The rest of your site will be revealed by WebsiteWithPreloader */}
      {/* Remove the duplicate main content here if WebsiteWithPreloader already renders it */}
      <Header onEnquire={() => {}} />
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
      <div className='bg-black'>
      <FeaturedSlider />
      <EliteServices/>
      <CallToAction/>
      </div>
      
      <Footer/>
    </>
  );
}