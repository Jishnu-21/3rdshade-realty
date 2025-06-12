'use client';

import { useRef, useState } from 'react';

const featuredItems = [
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    poster: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/dubai-1990138_1280.jpg',
    title: 'Emaar Creek',
    description: 'Emaar Creek is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.'
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Solis',
    description: 'Sobha Solis is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.'
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    poster: 'https://cdn.pixabay.com/photo/2015/01/28/23/35/dubai-615430_1280.jpg',
    title: 'Azizi Venice',
    description: 'Azizi Venice is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.'
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727167/sobha-solis_y9ojjs.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Solis',
    description: 'Sobha Solis is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.'
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727105/rk2_ef3ql8.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'RK Properties',
    description: 'RK Properties is a luxury residential development located in Pune, India.'
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Hartland',
    description: 'Sobha Hartland is a luxury residential development located in Dubai.'
  },
];

const FeaturedSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
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
    <section className="bg-black py-12 overflow-x-hidden">
      <div className="px-4 md:px-12 mb-8">
        <div className="flex items-center justify-between">
          <h2 className="text-white text-4xl md:text-5xl font-bold">Featured Properties</h2>
          <div className="flex items-center space-x-4">
            <button className="bg-black border border-white text-white rounded-full px-6 py-2 font-semibold hover:bg-white hover:text-black transition">View All</button>
            <button onClick={() => scroll('left')} className="w-12 h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-2xl hover:bg-white hover:text-black transition">&#8592;</button>
            <button onClick={() => scroll('right')} className="w-12 h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-2xl hover:bg-white hover:text-black transition">&#8594;</button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-nowrap space-x-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory px-4 md:px-12"
        style={{ scrollBehavior: 'smooth' }}
      >
        {featuredItems.map((item, idx) => (
          <div
            key={idx}
            className="min-w-[calc(100vw-32px)] md:min-w-[400px] max-w-md bg-black rounded-2xl shadow-lg snap-start flex-shrink-0 overflow-hidden border border-neutral-800 cursor-pointer group"
            onMouseEnter={() => {
              setHoveredIndex(idx);
              videoRefs.current[idx]?.play();
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              videoRefs.current[idx]?.pause();
            }}
          >
            <div className="w-full h-[500px] bg-neutral-900 flex items-center justify-center relative">
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                src={item.videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                preload="auto"
              />
            </div>
            <div className="p-8">
              <h3 className="text-white text-3xl font-bold mb-4">{item.title}</h3>
              <p className="text-gray-300 text-lg">{item.description}</p>
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