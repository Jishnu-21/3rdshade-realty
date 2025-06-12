'use client';

import { useState } from 'react';
import Loader from './components/Loader';
import Header from './components/Header'
import Banner from './components/Banner'
import FeaturedSlider from './components/FeaturedSlider'

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  return (
    <>
      {showLoader && <Loader onFinish={() => setShowLoader(false)} />}
      {!showLoader && (
        <>
          <Header />
          <Banner />
          <FeaturedSlider />
        </>
      )}
    </>
  )
}