'use client'
import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

const paragraphLines = [
  'Your real estate brand deserves more than visibility,',
  'it deserves a story the market remembers.',
  'At Third Shade Realty, powered by 3rd Shades creative force,',
  'we align strategy, visuals, and marketing excellence',
  'to put your properties in the spotlight.',
  'From new project launches to brand evolution,',
  'we scale your presence with precision and purpose.'
];

function ColorChangeText({ textLines, onRevealEnd }: { textLines: string[]; onRevealEnd: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

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

      // Text reveal
      if (textRef.current) {
        const progress = Math.max(0, Math.min(1, scrollProgress * 1.2));
        const blur = Math.max(0, (1 - progress) * 5);
        const opacity = Math.min(1, progress * 1.2);
        textRef.current.style.filter = `blur(${blur}px)`;
        textRef.current.style.opacity = opacity.toString();
        textRef.current.style.transform = `scale(${0.98 + (progress * 0.02)})`;
      }

      // Button reveal after text
      if (buttonRef.current) {
        const btnProgress = Math.max(0, Math.min(1, (scrollProgress * 1.2) - 0.15));
        const blur = Math.max(0, (1 - btnProgress) * 5);
        const opacity = Math.min(1, btnProgress * 1.2);
        buttonRef.current.style.filter = `blur(${blur}px)`;
        buttonRef.current.style.opacity = opacity.toString();
        buttonRef.current.style.transform = `scale(${0.98 + (btnProgress * 0.02)})`;
        buttonRef.current.style.color = `rgb(${
          Math.round(128 + (127 * btnProgress))
        }, ${
          Math.round(128 + (127 * btnProgress))
        }, ${
          Math.round(128 + (127 * btnProgress))
        })`;
      }

      // Only trigger once when the text is fully revealed
      if (!hasRevealed && scrollProgress >= 0.7) {
        setRevealed(true);
        onRevealEnd();
        hasRevealed = true;
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [onRevealEnd]);

  return (
    <div ref={containerRef} className="w-full">
      <div className="flex flex-col items-start gap-8">
        <div
          ref={textRef}
          className="transition-all duration-500 will-change-transform text-left text-white"
          style={{
            fontSize: 'clamp(2.5rem, 3vw, 4rem)',
            lineHeight: '1.2',
            fontWeight: 300,
            textShadow: '0 2px 4px rgba(0,0,0,0.3)',
            maxWidth: '100%',
            overflowWrap: 'break-word',
          }}
        >
          {textLines.map((line, idx) => (
            <div key={idx}>{line}</div>
          ))}
        </div>
        <div
          ref={buttonRef}
          className="mt-8 transition-all duration-500 will-change-transform"
          style={{
            opacity: 0,
            filter: 'blur(10px)',
            transform: 'scale(0.98)',
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
    <section className="relative w-full bg-black py-20 flex items-center min-h-screen md:min-h-[60vh]">
      {/* Smaller Gradient Glow */}
   
      <div className="w-full">
        <div className="relative z-10 flex flex-col items-start text-left w-full">
          <ColorChangeText textLines={paragraphLines} onRevealEnd={() => setShowButton(true)} />
        </div>
      </div>
    </section>
  );
} 