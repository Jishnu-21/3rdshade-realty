import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceHero from '../components/ServiceHero';
import ServiceIntro from '../components/ServiceIntro';
import ServiceSection from '../components/ServiceSection';

const lines = [
  'SERVICES',
  'WE PROVIDE',
  'FOR REAL ESTATE',
];

export default function ServicesPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-black flex flex-col justify-center items-center relative">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <ServiceHero />
        <ServiceIntro />
        <ServiceSection/>
        </div>
      </main>
      <Footer />
    </>
  );
} 