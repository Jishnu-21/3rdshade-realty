'use client';

import { FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => (
  <footer className="bg-neutral-900 text-neutral-300 pt-12 pb-6 px-8">
    <div className="max-w-screen-2xl mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-12 border-b border-neutral-800 pb-8">
        {/* Left: Description and Socials */}
        <div className="flex-1 min-w-[220px] mb-8 md:mb-0">
          <p className="mb-6 text-sm">
            Redefining luxury real estate with unparalleled service and exclusive properties.
          </p>
          <div className="flex space-x-4">
            <a href="#" aria-label="Instagram" className="hover:text-white"><FaInstagram size={22} /></a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white"><FaLinkedin size={22} /></a>
          </div>
        </div>
        {/* Center: Links */}
        <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-8">
          <div>
            <h4 className="text-white font-semibold mb-3">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/about" className="hover:text-white">About</a></li>
              <li><a href="/properties" className="hover:text-white">Property</a></li>
              <li><a href="/services" className="hover:text-white">Services</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Privacy</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/privacy" className="hover:text-white">Privacy</a></li>
              <li><a href="/terms" className="hover:text-white">Terms</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Contact</h4>
            <ul className="space-y-2 text-sm">
              <li>info@3rdshade.in</li>
              <li>+91 8600181189</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="text-center text-xs text-neutral-500 pt-6">
        &copy; 2025 3rdshade Realty. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer; 