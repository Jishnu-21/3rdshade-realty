import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const logoCards = [
  {
    id: 1,
    logoSrc: '/logos/logo_grey.png',
    bgColor: 'bg-neutral-200',
    alt: 'Logo 1',
    width: 140,
    height: 40,
    styles: 'rotate-[-8deg] -translate-x-12 translate-y-4 z-10', // Adjusted position
  },
  {
    id: 2,
    logoSrc: '/logos/adobe_logo.png',
    bgColor: 'bg-red-600',
    alt: 'Adobe Logo',
    width: 140,
    height: 40,
    styles: 'rotate-[-4deg] translate-x-0 z-20', // Adjusted position
  },
  {
    id: 3,
    logoSrc: '/logos/puig_logo.png',
    bgColor: 'bg-white',
    alt: 'Puig Logo',
    width: 140,
    height: 40,
    styles: 'rotate-[0deg] translate-x-12 -translate-y-4 z-30', // Adjusted position
  },
  {
    id: 4,
    logoSrc: '/logos/logo_white.png',
    bgColor: 'bg-white',
    alt: 'Logo 4',
    width: 140,
    height: 40,
    styles: 'rotate-[4deg] translate-x-24 -translate-y-8 z-40', // Adjusted position
  },
];

const LogoSwapper = () => {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    // Ensure the initial state is rendered before animation
    const timer = setTimeout(() => {
      setAnimated(true);
    }, 1500); // Increased delay to ensure initial opacity/transform is applied
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="bg-black py-20 px-8 md:px-12 lg:px-24 flex flex-col md:flex-row items-center justify-between overflow-hidden">
      {/* Left Section - Logo Cards */}
      <div className="relative w-full md:w-1/2 flex justify-center items-center h-80 md:h-96 mb-16 md:mb-0">
        <div className="relative w-64 h-64">
          {logoCards.map((card, index) => (
            <div
              key={card.id}
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[180px] h-[180px] rounded-xl flex items-center justify-center shadow-lg transform transition-transform duration-300 ${card.bgColor} ${card.styles} ${animated ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <Image
                src={card.logoSrc}
                alt={card.alt}
                width={card.width}
                height={card.height}
                className="object-contain"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Right Section - Text Content */}
      <div className="w-full md:w-1/2 text-white md:pl-16">
        <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8 ${animated ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '50ms' }}>
          Back to the simple,<br />intuitive, and inspiring.
        </h1>
        <p className={`text-lg md:text-xl text-gray-300 mb-12 max-w-lg ${animated ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '150ms' }}>
          Big multinational companies or small local brands. Partner approach with one universal goal - to create
          authentic, functional, and beautiful design.
        </p>
        <Link href="#contact" className={`inline-flex items-center px-8 py-3 rounded-full border border-white text-white font-semibold text-lg hover:bg-white hover:text-black transition-colors duration-300 ${animated ? 'animate-fadeInUp' : 'opacity-0 translate-y-10'}`} style={{ animationDelay: '250ms'}}>
          Let's talk
          <span className="ml-3 text-xl">&#8594;</span>
        </Link>
      </div>
      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(40px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;
          will-change: opacity, transform;
        }
      `}</style>
    </section>
  );
};

export default LogoSwapper; 