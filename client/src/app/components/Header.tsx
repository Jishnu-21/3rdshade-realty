'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const Header = ({ onEnquire }: { onEnquire?: () => void }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
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
      
      // Update scroll state - only add background when scrolled
      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 w-full py-4 md:py-6 transition-all duration-300 
      ${isVisible ? 'translate-y-0' : '-translate-y-full'}
      ${isScrolled ? 'bg-black/70 backdrop-blur' : 'bg-transparent'}`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center">
            <Image src="/logos/logo.png" alt="3RD SHADE Logo" width={120} height={18} className="md:w-[185px] md:h-[22px] w-[120px] h-[18px]" />
          </Link>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
          <Link href="/" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Home</Link>
          <Link href="/properties" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Properties</Link>
          <Link href="/services" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Services</Link>
          <Link href="/about" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">About</Link>
        </nav>

        {/* Desktop Get Started Button */}
        <button
          className={`hidden md:block bg-neutral-800 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors duration-300 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          onClick={() => window.location.href = '/contact'}
        >
          Get Started
        </button>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
        >
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
          <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
          <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
        </button>
      </div>

      {/* Mobile Nav Dropdown */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-0 left-0 w-full h-full bg-black/95 backdrop-blur-sm z-40 flex flex-col items-center pt-24 animate-slide-in-down">
          <button
            className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
            onClick={() => setMenuOpen(false)}
            aria-label="Close navigation menu"
          >
            &times;
          </button>
          <Link href="/" className="text-white text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link href="/properties" className="text-white text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Properties</Link>
          <Link href="/services" className="text-white text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Services</Link>
          <Link href="/about" className="text-white text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>About</Link>
          <Link href="/contact" className="text-white text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Contact</Link>
          <button
            className="bg-neutral-800 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors duration-300 w-11/12 mt-4 cursor-pointer"
            onClick={() => { setMenuOpen(false); window.location.href = '/contact'; }}
          >
            Get Started
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;