'use client';

import { useEffect, useState } from 'react';

const text = '3RD SHADE REALTY';

const Loader = ({ onFinish }: { onFinish: () => void }) => {
  const [visibleLetters, setVisibleLetters] = useState(0);
  const [hide, setHide] = useState(false);

  useEffect(() => {
    if (visibleLetters < text.length) {
      const timeout = setTimeout(() => setVisibleLetters(visibleLetters + 1), 80);
      return () => clearTimeout(timeout);
    } else {
      // Wait longer before sliding up
      const timeout = setTimeout(() => setHide(true), 1400);
      return () => clearTimeout(timeout);
    }
  }, [visibleLetters]);

  useEffect(() => {
    if (hide) {
      // Wait for slide up animation, then call onFinish
      const timeout = setTimeout(() => onFinish(), 700);
      return () => clearTimeout(timeout);
    }
  }, [hide, onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-transform duration-700 ${hide ? '-translate-y-full' : 'translate-y-0'}`}
    >
      <h1 className="text-lg md:text-2xl font-bold tracking-widest text-gray-900 text-left ml-4 md:ml-12">
        {text.split('').map((char, i) => (
          <span
            key={i}
            className={`inline-block transition-opacity duration-200 ${i < visibleLetters ? 'opacity-100' : 'opacity-0'}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Loader; 