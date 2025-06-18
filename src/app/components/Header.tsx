'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Show/hide based on scroll direction
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }
      
      // Update scroll state
      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full py-6 transition-transform duration-300 ${isVisible ? 'translate-y-0 bg-black/70 backdrop-blur' : '-translate-y-full bg-black'}`}>
      <div className="flex items-center justify-between px-8">
        {/* Logo */}
        <div className="flex items-center">
          <Image src="/logos/logo.png" alt="3RD SHADE Logo" width={185} height={22} />
        </div>

        {/* Desktop Nav Links */}
        <nav className="flex items-center space-x-8">
          <Link href="#" className="text-white text-xl font-semibold">Properties</Link>
          <Link href="#" className="text-white text-xl font-semibold">Services</Link>
          <Link href="#" className="text-white text-xl font-semibold">About</Link>
          <Link href="#" className="text-white text-xl font-semibold">Contact</Link>
        </nav>

        {/* Desktop Schedule Tour Button */}
        <button className={`bg-neutral-800 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
          Schedule Tour
        </button>

      </div>

    </header>
  );
};

export default Header;