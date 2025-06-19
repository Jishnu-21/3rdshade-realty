'use client'
import React, { useEffect, useRef, useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const lines = [
  'Through strategy, innovation and creativity',
  'we take your brand on a journey of discovery and transformation',
  'creating emotional experiences that leave a lasting impression',
  'and drive behaviour.'
];

function ColorChangeText({ lines, onRevealEnd }: { lines: string[]; onRevealEnd: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const lineRefs = useRef<HTMLDivElement[]>([]);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  const setLineRef = useCallback((el: HTMLDivElement | null, index: number) => {
    if (el) {
      lineRefs.current[index] = el;
      el.style.filter = 'blur(10px)';
      el.style.opacity = '0';
      el.style.transform = 'scale(0.95)';
      el.style.color = 'rgb(128, 128, 128)';
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    let hasRevealed = false;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const scrollProgress = Math.max(0, Math.min(1, 
        (viewportHeight - containerRect.top) / (containerRect.height)
      ));

      lineRefs.current.forEach((line, index) => {
        if (!line) return;
        const delay = index * 0.15;
        const lineProgress = Math.max(0, Math.min(1, 
          (scrollProgress * 1.5) - delay
        ));
        const blur = Math.max(0, (1 - lineProgress) * 5);
        const opacity = Math.min(1, lineProgress * 1.2);
        line.style.filter = `blur(${blur}px)`;
        line.style.opacity = opacity.toString();
        line.style.transform = `scale(${0.95 + (lineProgress * 0.05)})`;
        line.style.color = `rgb(${
          Math.round(128 + (127 * lineProgress))
        }, ${
          Math.round(128 + (127 * lineProgress))
        }, ${
          Math.round(128 + (127 * lineProgress))
        })`;
      });

      // Button reveal after last line, with less delay
      if (buttonRef.current) {
        const delay = (lines.length - 1) * 0.15 + 0.12;
        const btnProgress = Math.max(0, Math.min(1, (scrollProgress * 1.5) - delay));
        const blur = Math.max(0, (1 - btnProgress) * 5);
        const opacity = Math.min(1, btnProgress * 1.2);
        buttonRef.current.style.filter = `blur(${blur}px)`;
        buttonRef.current.style.opacity = opacity.toString();
        buttonRef.current.style.transform = `scale(${0.95 + (btnProgress * 0.05)})`;
        buttonRef.current.style.color = `rgb(${
          Math.round(128 + (127 * btnProgress))
        }, ${
          Math.round(128 + (127 * btnProgress))
        }, ${
          Math.round(128 + (127 * btnProgress))
        })`;
      }

      // Only trigger once when the last line is fully revealed
      if (!hasRevealed && scrollProgress >= 0.7) {
        setRevealed(true);
        onRevealEnd();
        hasRevealed = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onRevealEnd, lines.length]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col items-start gap-2 sm:gap-3 md:gap-4 lg:gap-6">
        {lines.map((line, index) => (
          <div
            key={index}
            ref={el => setLineRef(el, index)}
            className="transition-all duration-500 will-change-transform text-left"
            style={{
              fontSize: 'clamp(1.75rem, 4vw, 3.5rem)',
              lineHeight: '1.2',
              fontWeight: '300',
              textShadow: '0 2px 4px rgba(0,0,0,0.3)',
              maxWidth: '100%',
              overflowWrap: 'break-word',
            }}
          >
            {line}
          </div>
        ))}
        <div
          ref={buttonRef}
          className="mt-8 transition-all duration-500 will-change-transform"
          style={{
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'scale(0.95)',
            color: 'rgb(128,128,128)',
          }}
        >
          <Link
            href="#about"
            className="px-8 py-3 rounded-full border border-white text-white font-bold text-lg hover:bg-white hover:text-black transition-colors duration-200 shadow-lg"
          >
            About us &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ServiceIntro() {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="relative w-full bg-black py-20 flex items-center min-h-[60vh]">
      {/* Smaller Gradient Glow */}
   
      <div className="w-full">
        <div className="relative z-10 flex flex-col items-start text-left w-full">
          <ColorChangeText lines={lines} onRevealEnd={() => setShowButton(true)} />
        </div>
      </div>
    </section>
  );
} 