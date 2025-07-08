'use client';

import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaTimes } from 'react-icons/fa';
import EnquireForm from './EnquireForm';
import PayNowForm from './PayNowForm';
import CallForm from './CallForm';

const featuredItems = [
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    poster: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/dubai-1990138_1280.jpg',
    title: 'Emaar Creek',
    slug: 'emaar-creek-harbour',
    price: 'Starting from AED 1.5M',
    amenities: [
    
      'Cycling Tracks',
      'Entertainment Arenas',
      'Waterfront Promenades',
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Solis',
    slug: 'sobha-solis',
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
    slug: 'azizi-venice',
    price: 'Launching Soon',
    amenities: [
      'Community Gym & Studios',
      'Crystal Lagoon',
      'Opera House (1,500 seats)',
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727167/sobha-solis_y9ojjs.mp4',
    poster: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    title: 'Sobha Orbis',
    slug: 'sobha-orbis',
    price: 'Starting from AED 1M',
    amenities: [
      'Clubhouse & Sports',
      'Badminton & Squash Courts',
      'Billiards & Indoor Games',
      "Kid's & Toddler Play Areas",
     
    ],
  },
  {
    videoSrc: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1751969088/elington-cove_utlkoz.webm',
    poster: '/images/properties/cove2.jpg',
    title: 'Ellington Cove',
    slug: 'ellington-cove',
    price: 'Starting from $300,000',
    amenities: [
      'Private Beach with Water Sports',
      'Beachfront Clubhouse ',
      'Yoga & Fitness Studio',
    ],
  },
];

const FeaturedSlider = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  // Modal states for each form
  const [showEnquireModal, setShowEnquireModal] = useState(false);
  const [showPayNowModal, setShowPayNowModal] = useState(false);
  const [showCallModal, setShowCallModal] = useState(false);
  const [activeProperty, setActiveProperty] = useState<string | null>(null);

  // Submission handlers (simulate async, can be replaced with real API calls)
  const handleEnquireSubmit = async (form: any) => {
    return new Promise<void>(resolve => setTimeout(resolve, 1200));
  };
  const handlePayNowSubmit = async (form: any) => {
    return new Promise<void>(resolve => setTimeout(resolve, 1200));
  };
  const handleCallSubmit = async (form: any) => {
    return new Promise<void>(resolve => setTimeout(resolve, 1200));
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.9;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const handleCardClick = (slug: string, e: React.MouseEvent) => {
    // Prevent navigation if clicking on buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    router.push(`/property/${slug}`);
  };

  return (
    <section className="bg-black py-6 sm:py-6 md:py-16 max-w-screen-2xl mx-auto px-4 md:px-8 overflow-x-hidden">
      {/* Enquire Modal */}
      <EnquireForm
        open={showEnquireModal}
        onClose={() => { setShowEnquireModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handleEnquireSubmit}
      />
      {/* Pay Now Modal */}
      <PayNowForm
        open={showPayNowModal}
        onClose={() => { setShowPayNowModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handlePayNowSubmit}
      />
      {/* Call Expert Modal */}
      <CallForm
        open={showCallModal}
        onClose={() => { setShowCallModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handleCallSubmit}
      />
      <div className="mb-4 sm:mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 items-start w-full">
          <div className="flex flex-col gap-2">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-left">Featured Properties</h2>
            <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-2xl">Experience luxury living through properties defined by aesthetics, access, and assurance.</p>
          </div>
          <div className="hidden sm:flex items-center space-x-4">
            <button  onClick={() => router.push('/properties')} className="bg-black border border-white cursor-pointer text-white rounded-full px-4 sm:px-6 py-1.5 sm:py-2 text-sm sm:text-base font-semibold hover:bg-white hover:text-black transition">View All</button>
            <button onClick={() => scroll('left')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-xl sm:text-2xl hover:bg-white hover:text-black transition cursor-pointer">←</button>
            <button onClick={() => scroll('right')} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-black border border-white text-white flex items-center justify-center text-xl sm:text-2xl hover:bg-white hover:text-black transition cursor-pointer">→</button>
          </div>
        </div>
      </div>
      <div
        ref={scrollRef}
        className="flex flex-nowrap space-x-4 sm:space-x-6 md:space-x-8 overflow-x-auto scrollbar-hide scroll-smooth snap-x snap-mandatory mb-4 sm:mb-0"
        style={{ scrollBehavior: 'smooth' }}
      >
        {featuredItems.map((item, idx) => {
          return (
            <div
              key={idx}
              className="w-[70vw] sm:w-[50vw] md:w-[30vw] lg:w-[20vw] min-w-[200px] max-w-[360px] bg-black rounded-2xl shadow-lg snap-center flex-shrink-0 overflow-hidden border border-neutral-800 cursor-pointer group relative"
              style={{ aspectRatio: '9/16' }}
              onClick={(e) => handleCardClick(item.slug, e)}
              onMouseEnter={() => {
                setHoveredIndex(idx);
                const video = videoRefs.current[idx];
                if (video) {
                  video.currentTime = 0;
                  video.muted = false;
                  video.play();
                }
              }}
              onMouseLeave={() => {
                setHoveredIndex(null);
                const video = videoRefs.current[idx];
                if (video) {
                  video.muted = true;
                  video.pause();
                  video.currentTime = 1;
                }
              }}
            >
              {/* Video Background */}
              <div className="w-full h-full relative">
                <video
                  ref={(el: HTMLVideoElement | null) => { videoRefs.current[idx] = el; }}
                  src={item.videoSrc}
                  loop
                  muted={hoveredIndex !== idx}
                  playsInline
                  autoPlay
                  poster={item.poster}
                  className="w-full h-full object-cover"
                  preload="auto"
                  onLoadedMetadata={e => {
                    if (videoRefs.current[idx]) {
                      videoRefs.current[idx].currentTime = 1;
                    }
                  }}
                />
                {/* Content Overlay - Shows on hover */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 ease-in-out ${
                    hoveredIndex === idx ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{ height: '65%' }}
                >
                  <div className="p-2 sm:p-3 md:p-4 h-full flex flex-col justify-end">
                    <div className="mb-2 sm:mb-3 md:mb-4">
                      <div className="text-white text-sm sm:text-base md:text-lg lg:text-xl font-bold truncate mb-1">{item.title}</div>
                      <div className="text-purple-400 font-semibold text-xs sm:text-sm md:text-base whitespace-nowrap">{item.price}</div>
                    </div>
                    <div className="text-white text-xs sm:text-sm font-bold mb-2 sm:mb-3 md:mb-4 grid grid-cols-1 gap-y-1 sm:gap-y-2">
                      {item.amenities && item.amenities.slice(0, 3).map((amenity, amenityIdx) => (
                        <div key={amenityIdx} className="flex items-center gap-1 sm:gap-2">
                          <span className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-purple-400" />
                          <span className="font-bold text-white text-xs sm:text-sm whitespace-nowrap">{amenity}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-1 sm:space-y-2 pt-1 sm:pt-2">
                      <button
                        type="button"
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-1.5 sm:py-2 rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
                        onClick={e => { e.stopPropagation(); setShowPayNowModal(true); setActiveProperty(item.title); }}
                      >
                        Pay Now
                      </button>
                      <div className="grid grid-cols-2 gap-1 sm:gap-2">
                        <button
                          type="button"
                          className="w-full bg-black text-white font-semibold py-1.5 sm:py-2 rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
                          onClick={e => { e.stopPropagation(); setShowCallModal(true); setActiveProperty(item.title); }}
                        >
                          Call Expert
                        </button>
                        <button
                          type="button"
                          className="w-full bg-black text-white font-semibold py-1.5 sm:py-2 rounded-xl flex items-center justify-center gap-1 sm:gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs sm:text-sm"
                          onClick={e => { e.stopPropagation(); setShowEnquireModal(true); setActiveProperty(item.title); }}
                        >
                          Enquire Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {/* Mobile navigation controls */}
      <div className="flex sm:hidden justify-center items-center space-x-4 mt-4">
        <button className="bg-black border border-white text-white rounded-full px-4 py-1.5 text-sm font-semibold hover:bg-white hover:text-black transition">View All</button>
        <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full bg-black border border-white text-white flex items-center justify-center text-xl hover:bg-white hover:text-black transition">←</button>
        <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full bg-black border border-white text-white flex items-center justify-center text-xl hover:bg-white hover:text-black transition">→</button>
      </div>
      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        @media (max-width: 640px) {
          .snap-x.snap-mandatory > div {
            scroll-snap-align: center;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedSlider;