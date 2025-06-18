'use client';

import { useState, useEffect } from 'react';
import Loader from './components/Loader';
import Header from './components/Header'
import Banner from './components/Banner';
import FeaturedProperties from "./components/FeaturedProperties";
import EliteServices from './components/EliteServices';
import CallToAction from './components/CallToAction';
import Footer from './components/Footer';

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
      {loading ? <Loader onFinish={() => setLoading(false)} /> : null}
      <main className={`${loading ? "hidden" : "block"}`}>
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
        <FeaturedProperties />
        <EliteServices/>
        <CallToAction/>
        <Footer/>
      </main>
    </>
  );
}