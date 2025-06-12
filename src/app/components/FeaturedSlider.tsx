'use client';

import { useRef } from 'react';

const featuredItems = [
  {
    videoSrc: 'https://cdn.pixabay.com/video/2020/08/12/46950-450094784_large.mp4',
    title: 'Alterscope',
    description: 'A new perspective on digital transparency.'
  },
  {
    videoSrc: 'https://cdn.pixabay.com/video/2023/03/14/157187-813013973_large.mp4',
    title: 'Creative Union',
    description: 'Collaboration in motion for modern brands.'
  },
  {
    videoSrc: 'https://cdn.pixabay.com/video/2023/07/25/176067-848282232_large.mp4',
    title: 'App Showcase',
    description: 'A sleek mobile experience for productivity.'
  },
  {
    videoSrc: 'https://cdn.pixabay.com/video/2023/07/25/176067-848282232_large.mp4',
    title: 'App Showcase',
    description: 'A sleek mobile experience for productivity.'
  },
  {
    videoSrc: 'https://cdn.pixabay.com/video/2023/07/25/176067-848282232_large.mp4',
    title: 'App Showcase',
    description: 'A sleek mobile experience for productivity.'
  },
  {
    videoSrc: 'https://cdn.pixabay.com/video/2023/07/25/176067-848282232_large.mp4',
    title: 'App Showcase',
    description: 'A sleek mobile experience for productivity.'
  },
];

const FeaturedSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="bg-black py-12 px-4 md:px-12 overflow-x-hidden">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-white text-4xl md:text-5xl font-bold">Featured Properties</h2>
        <div className="flex items-center space-x-4">
          <button className="bg-black border border-white text-white rounded-full px-6 py-2 font-semibold hover:bg-white hover:text-black transition">View All</button>
          <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-2xl hover:bg-white hover:text-black transition">&#8592;</button>
          <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-2xl hover:bg-white hover:text-black transition">&#8594;</button>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-nowrap space-x-8 overflow-x-auto w-full max-w-full pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {featuredItems.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[440px] max-w-md bg-black rounded-2xl shadow-lg snap-start flex-shrink-0 overflow-hidden border border-neutral-800"
          >
            <div className="w-full h-96 bg-neutral-900 flex items-center justify-center">
              <video
                src={item.videoSrc}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-white text-2xl font-bold mb-2">{item.title}</h3>
              <p className="text-gray-300 text-base">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
};

export default FeaturedSlider; 