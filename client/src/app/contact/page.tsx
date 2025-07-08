'use client';

import { motion } from 'framer-motion';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col font-montserrat">
      <Header onEnquire={() => {}} />
      {/* Glowing Gradient: wide, soft, well-spread lighting effect */}
      <motion.div 
        className="pointer-events-none absolute right-0 top-4 w-full h-80 z-0 flex justify-end"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
      >
        <div className="h-full w-2/3 blur-[160px] opacity-50 bg-gradient-to-br from-rose-500 via-purple-500 to-cyan-400"></div>
      </motion.div>
      <main className="flex-1 min-h-screen flex flex-col md:flex-row items-stretch justify-between max-w-screen-2xl mx-auto w-full px-4 md:px-12 pt-32 pb-20 relative z-10">
        {/* Left: Large Text */}
        <div className="flex-1 flex flex-col justify-center">
          <motion.h1 
            className="text-white text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.95] font-light tracking-tight whitespace-pre-line" 
            style={{fontFamily: 'Inter, Arial, Helvetica, sans-serif'}}
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          >
            {`JUST A CLICK\nAWAY FROM\n3RD SHADE`}<span className="align-super text-[0.5em] ml-2"></span>
          </motion.h1>
        </div>
        {/* Right: Contact Info - align to far right */}
        <motion.div 
          className="w-full md:w-[420px] flex flex-col justify-center gap-12 text-white text-sm md:text-base font-medium z-10 md:items-end md:text-right md:ml-auto"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="uppercase text-xs text-neutral-400 mb-2 tracking-widest">Get in touch</div>
            <div className="font-bold text-white">
              <a
                href="mailto:INFO@3RDSHADE.IN"
                className="hover:underline"
                style={{ display: 'inline-block' }}
              >
                INFO@3RDSHADE.IN
              </a>
              <br />
              <a
                href="https://wa.me/918600181189"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ display: 'inline-block' }}
              >
                +91 8600181189
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >

          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            <div className="uppercase text-xs text-neutral-400 mb-2 tracking-widest">Connect with us</div>
            <div className="font-bold text-white flex flex-col gap-1 md:items-end md:text-right">
              <motion.a 
                href="https://www.instagram.com/3rdshade.realty/" 
                className="hover:underline"
                whileHover={{ scale: 1.05, x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                Instagram<span className="ml-1">↗</span>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}