'use client';

import { useRef, useState } from 'react';

const featuredItems = [
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    poster: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/dubai-1990138_1280.jpg',
    title: 'Emaar Creek',
    price: 'Starting from AED 1.5M',
    amenities: [
      '700,000 sq.m. of Parks & Green Spaces',
      'Over 250,000 sq.m. of Retail & Dining',
      'Cultural Hub with Museums & Exhibitions',
      'Cycling Tracks',
      'Entertainment Arenas for Concerts & Theatre',
      'Waterfront Promenades',
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Solis',
    price: 'Starting from AED 1M',
    amenities: [
      'Lap Pool',
      'Kids Pool & Leisure Pool',
      'Common Parks & Lawns',
      'Gym & Fitness Zone',
      'Indoor Kids Play Area',
      'Yoga & Meditation Studio',
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    poster: 'https://cdn.pixabay.com/photo/2015/01/28/23/35/dubai-615430_1280.jpg',
    title: 'Azizi Venice',
    price: 'Launching Soon',
    amenities: [
      'Climate-Controlled Retail Boulevard',
      'Crystal Lagoon & Swimmable Beaches',
      'Opera House (1,500 seats)',
      'Five-Star Family & Lifestyle Hotels',
      'Five-Star Family & Lifestyle Hotels',
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727167/sobha-solis_y9ojjs.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Orbis',
    price: 'Starting from AED 1M',
    amenities: [
      'Clubhouse & Sports',
      'Badminton & Squash Courts',
      'Billiards & Indoor Games',
      "Kid's & Toddler Play Areas",
      'Community Gym & Studios',
    ],
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
    <section className="bg-black py-8 px-50  max-w-8xl mx-auto overflow-x-hidden">
      <div className=" mb-8">
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
            className="min-w-[calc(100vw-32px)] md:min-w-[400px] max-w-md bg-black rounded-2xl shadow-lg snap-start flex-shrink-0 overflow-hidden border border-neutral-800 cursor-pointer group relative"
            style={{ height: '800px' }}
            onMouseEnter={() => {
              setHoveredIndex(idx);
              videoRefs.current[idx]?.play();
            }}
            onMouseLeave={() => {
              setHoveredIndex(null);
              videoRefs.current[idx]?.pause();
            }}
          >
            {/* Video Background */}
            <div
              className="w-full h-full relative"
            >
              <video
                ref={el => { videoRefs.current[idx] = el; }}
                src={item.videoSrc}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
                preload="auto"
              />
              
              {/* Content Overlay - Shows on hover */}
              <div 
                className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 ease-in-out ${
                  hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
                }`}
                style={{ height: '60%' }}
              >
                <div className="p-8 h-full flex flex-col justify-end">
                  <div className="mb-4">
                    <div className="text-white text-xl font-bold truncate mb-1">{item.title}</div>
                    <div className="text-purple-400 font-semibold text-lg whitespace-nowrap">{item.price}</div>
                  </div>
                  <div className="text-white text-xs font-bold mb-4 grid grid-cols-1 gap-y-2">
                    {item.amenities && item.amenities.slice(0, 3).map((amenity, amenityIdx) => (
                      <div key={amenityIdx} className="flex items-center gap-2">
                        <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                        <span className="font-bold text-white whitespace-nowrap">{amenity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="space-y-2 pt-2">
                    <button
                      type="button"
                      className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-sm"
                      onClick={() => alert('Pay Now clicked!')}
                    >
                      Pay Now
                    </button>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                        onClick={() => alert('Call Expert clicked!')}
                      >
                        Call Expert
                      </button>
                      <button
                        type="button"
                        className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                        onClick={() => alert('Enquire Now clicked!')}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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