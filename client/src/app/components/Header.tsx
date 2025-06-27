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

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false); // Scrolling down
      } else {
        setIsVisible(true); // Scrolling up
      }

      setIsScrolled(currentScrollY > 10);
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 w-full py-4 md:py-6 transition-all duration-300 
        ${isVisible ? 'translate-y-0' : '-translate-y-full'}
        ${isScrolled ? 'bg-black/70 backdrop-blur' : 'bg-transparent'}`}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <Image
                src="/logos/logo.png"
                alt="3RD SHADE Logo"
                width={185}
                height={28}
                className="w-[140px] md:w-[185px] h-auto"
                priority
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <Link href="/" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Home</Link>
            <Link href="/properties" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Properties</Link>
            <Link href="/services" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">Services</Link>
            <Link href="/about" className="text-white text-base lg:text-xl font-semibold hover:text-purple-400 transition-colors duration-300">About</Link>
          </nav>

          {/* Desktop CTA */}
          <button
            className={`hidden md:block bg-neutral-800 text-white text-lg font-semibold px-6 py-3 rounded-full hover:bg-neutral-700 transition-colors duration-300 cursor-pointer ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={() => window.location.href = '/contact'}
          >
            Get Started
          </button>

          {/* Mobile Hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-10 h-10 text-white focus:outline-none bg-black/80 rounded-full shadow-lg"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-transform ${menuOpen ? 'rotate-45 translate-y-1.5' : ''}`}></span>
            <span className={`block w-6 h-0.5 bg-white mb-1 transition-opacity ${menuOpen ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`block w-6 h-0.5 bg-white transition-transform ${menuOpen ? '-rotate-45 -translate-y-1.5' : ''}`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Nav Dropdown - Placed outside <header> */}
      {menuOpen && (
  <div className="md:hidden fixed inset-0 w-full h-full bg-[#0d0d0d] text-white flex flex-col items-center pt-24 animate-slide-in-down z-[9999] shadow-2xl border-t border-neutral-700">
    <button
      className="absolute top-6 right-6 text-white text-3xl focus:outline-none"
      onClick={() => setMenuOpen(false)}
      aria-label="Close navigation menu"
    >
      &times;
    </button>

    {/* Logo inside mobile menu */}
    <Link href="/" onClick={() => setMenuOpen(false)} className="mb-6 flex justify-center w-full">
      <Image
        src="/logos/logo.png"
        alt="3RD SHADE Logo"
        width={140}
        height={24}
        className="w-[120px] sm:w-[140px] h-auto mx-auto"
        priority
      />
    </Link>

    <Link href="/" className="text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Home</Link>
    <Link href="/properties" className="text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Properties</Link>
    <Link href="/services" className="text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Services</Link>
    <Link href="/about" className="text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>About</Link>
    <Link href="/contact" className="text-xl font-semibold w-full text-center py-4 hover:text-purple-400 transition-colors duration-300" onClick={() => setMenuOpen(false)}>Contact</Link>
    <button
      className="bg-white text-black text-lg font-semibold px-6 py-3 rounded-full hover:bg-neutral-200 transition-colors duration-300 w-11/12 mt-4 cursor-pointer"
      onClick={() => { setMenuOpen(false); window.location.href = '/contact'; }}
    >
      Get Started
    </button>
  </div>
)}

    </>
  );
};

export default Header;
