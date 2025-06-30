'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const paragraphLines = [
  'Your real estate brand deserves more than just visibility  it deserves a story the market remembers. At Third Shade Realty, we combine creative strategy, compelling visuals, and marketing expertise to put your properties in the spotlight. From new project launches to full-scale brand evolution, we elevate your presence with precision, purpose, and measurable impact.'
];

function ColorChangeText({ textLines, onRevealEnd }: { textLines: string[]; onRevealEnd: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [revealedLines, setRevealedLines] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const containerRect = container.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      // Treat button as an extra line
      const totalLines = textLines.length + 1;
      const scrollProgress = Math.max(0, Math.min(1, (viewportHeight - containerRect.top) / (containerRect.height)));
      const linesToReveal = Math.ceil(scrollProgress * totalLines);
      setRevealedLines(linesToReveal);
      if (linesToReveal >= totalLines) {
        onRevealEnd();
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onRevealEnd, textLines.length]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col items-start gap-8">
        <div
          className="transition-all duration-500 will-change-transform text-left"
          style={{
            fontSize: 'clamp(3rem, 3vw, 3.4rem)',
            lineHeight: '1.2',
            fontFamily: 'Montserrat, Helvetica, sans-serif',
            fontWeight: 300,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            maxWidth: '100%',
            overflowWrap: 'break-word',
          }}
        >
          {[...textLines, '__BUTTON__'].map((line, idx) => (
            <div
              key={idx}
              style={{
                opacity: idx < revealedLines ? 1 : 0,
                transform: idx < revealedLines ? 'translateY(0)' : 'translateY(40px)',
                filter: idx < revealedLines ? 'blur(0px)' : 'blur(8px)',
                transition: 'all 0.6s cubic-bezier(0.42,0,0.58,1) ' + (idx * 0.1) + 's',
                marginTop: line === '__BUTTON__' ? '2.5rem' : undefined,
              }}
            >
              {line === '__BUTTON__' ? (
                <Link
                  href="/about"
                  className="px-8 py-3 rounded-full border border-white text-white font-bold text-lg transition-colors duration-200 shadow-lg bg-transparent hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-500 hover:text-white hover:border-transparent"
                >
                  About us &rarr;
                </Link>
              ) : (
                <span className=" text-white bg-clip-text text-transparent">{line}</span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ServiceIntro() {
  const [showButton, setShowButton] = useState(false);

  return (
    <section className="relative w-full  py-20 flex items-center min-h-screen md:min-h-[60vh]">
      {/* Smaller Gradient Glow */}
   
      <div className="w-full">
        <div className="relative z-10 flex flex-col items-start text-left w-full">
          <ColorChangeText textLines={paragraphLines} onRevealEnd={() => setShowButton(true)} />
        </div>
      </div>
    </section>
  );
} 