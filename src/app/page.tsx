'use client';

import { useState } from 'react';
import Loader from './components/Loader';
import Header from './components/Header'
import Banner from './components/Banner'
import FeaturedSlider from './components/FeaturedSlider'
import LogoSwapper from './components/LogoSwapper';
import FaqAccordionNew from './components/Faq';

export default function Home() {
  const [showLoader, setShowLoader] = useState(true);

  const faqItems = [
    { 
      id: '01',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet consectetur. In augue ipsum tellus ultrices. Ac pharetra ultrices consectetur consequat tellus massa. Nec aliquam cras sagittis duis sed euismod arcu hac.' 
    },
    { 
      id: '02',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
    { 
      id: '03',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
    { 
      id: '04',
      question: 'What is Lorem Ipsum?', 
      answer: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.' 
    },
  ];

  return (
    <>
      {showLoader && <Loader onFinish={() => setShowLoader(false)} />}
      {!showLoader && (
        <>
          <Header />
          <Banner />
          <FeaturedSlider />
          <LogoSwapper />
          <div className="pb-16 bg-black md:pb-24"></div> {/* Consistent spacing between components */}
          <FaqAccordionNew items={faqItems} />
        </>
      )}
    </>
  )
}