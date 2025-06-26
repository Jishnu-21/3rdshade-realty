'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaStar, FaPlay, FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaWifi, FaParking, FaMoneyBillWave } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React from 'react';
import Link from 'next/link';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

// Mock data for all properties
const allProperties = [
  {
    id: 1,
    name: 'Emaar Creek Harbour',
    location: '',
    price: 'Starting from AED 1.5M',
    roi: '',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745906/dubai-creek_wrypak.jpg',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `1 - 3 Bedroom Residences | Starting from AED 1.5M\nA next-generation waterfront destination redefining city living with expansive green zones, world-class retail, and unmatched skyline views. This is more than a residence - it's a self-contained world built for 200,000+ future-forward residents.\nTap to explore the full masterplan, lifestyle perks, and investment potential.`,
  },
  {
    id: 2,
    name: 'Sobha Solis',
    location: '',
    price: 'Starting from AED 1M',
    roi: '',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745431/sobha_hm1hsd.webp',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `1 - 3 Bedroom Apartments | Starting from AED 1M\nA resort-style community with over 50+ wellness, fitness, and leisure amenities  -  from lap pools to rock climbing and a racetrack deck. Designed for those who want more than just a home, it's your everyday escape in the heart of Dubai.\nClick to uncover the full lifestyle and amenity experience.`,
  },
  {
    id: 3,
    name: 'Azizi Venice',
    location: '',
    price: 'Launching Soon',
    roi: '',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745150/azizi_fvgglb.webp',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `Studios to 3 Bedrooms | Launching Soon\nA vibrant waterfront city with swimmable beaches, climate-controlled retail boulevards, and over 40 acres of green space. From cable car access to a private opera house, every detail is built for next-level urban living with resort-style comfort.\nClick to explore amenities, lifestyle, and investment details.`,
  },
  {
    id: 4,
    name: 'Deeyar Eleve',
    location: '',
    price: 'Starting from AED 1M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750744127/deeyer-eleve_hmjj4n.jpg',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `1 - 3 Bedroom Residences | Starting from AED 1M\nModern high-rise living with panoramic port views, resort-style pools, and a vibrant F&B street below. From fitness zones to luxe lounges, every element is designed to elevate everyday life in a connected urban community.\nTap to view full amenities, lifestyle, and project highlights.`,
  },
  {
    id: 5,
    name: 'Wasl 1 Residences',
    location: '',
    price: 'Starting from AED 1.5M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746204/wasl_kubqws.jpg',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `1–3 Bedroom Apartments | Starting from AED 1.5M\nPositioned at the crossroads of old and new Dubai, this community blends city connectivity with modern comfort. Enjoy park views, premium fitness zones, and family-friendly spaces -  all in one address.\nClick to discover the amenities and location advantage.`,
  },
  {
    id: 6,
    name: 'Emaar South',
    location: '',
    price: 'Starting from AED 2.8M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746793/emaar-south_ba7wgp.jpg',
    beds: 3,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `3 - 4 Bedroom Townhouses | Starting from AED 2.8M\nSurrounded by green fairways and open parks, Greenridge offers spacious modern townhomes with direct access to golf, retail, schools, and community spaces  -  all in a self-sustained, family-first neighbourhood.\nTap to explore floor plans, pricing, and lifestyle highlights.`,
  },
  {
    id: 7,
    name: 'The Valley – Avena',
    location: '',
    price: 'Starting from AED 4.37M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746917/valey-avena_nwrgaj.jpg',
    beds: 4,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `4 Bedroom Villas | Starting from AED 4.37M\nSet within a 250,000 sqm central park, Avena offers family-centric villas designed for sustainable, resort-style living. Spacious layouts, lush landscapes, and seamless indoor-outdoor flow define this premium residential enclave.\nClick to view floor plans, park access, and villa features.`,
  },
  {
    id: 8,
    name: 'Damac Islands',
    location: '',
    price: 'Starting from AED 2.4M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750744640/damac-islands_awlzym.jpg',
    beds: 4,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [] as string[],
    description: `4 - 5 Bedroom Townhouses | Starting from AED 2.4M\nA private island community blending tropical beauty with ultra-luxury living. These waterfront homes offer beach access, smart automation, and rare experiences - from jungle trails to floating spas and LED-lit gondola rides.\nTap to explore full amenities, villa finishes, and island lifestyle.`,
  },
  {
    id: 9,
    name: 'Damac Islands Villas',
    location: '',
    price: 'Starting from AED 2.4M',
    roi: '',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750747071/damac-villa_sjtrcb.jpg',
    beds: 6,
    baths: 0,
    sqft: '17,000+',
    rating: 0,
    amenities: [] as string[],
    description: `6 - 7 Bedroom Villas | Starting from AED 2.4M\nExpansive beachfront villas up to 17,000+ sq.ft., complete with private gyms, basements, maid's rooms, and panoramic terraces. Designed for elite living, these residences combine space, privacy, and resort-style luxury on Dubai's most exclusive island.\nClick to explore villa plans, features, and lifestyle benefits.`,
  },
  {
    id: 10,
    name: 'Belgravia Gardens',
    location: 'Belgravia Gardens, Dubai',
    price: 'Starting from AED 1.2M',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia4_coh1y6.jpg', // Add image URL if available
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: ['spa', 'pool', 'gym'],
    description: `Studio to 3 Bedroom Apartments | Starting from AED 1.2M\nBelgravia Gardens features studio to 3-bedroom apartments with optional office layouts, offering a flexible living experience in a refined residential community. With urban beach access, lagoon views, and a fully-equipped clubhouse, this development is designed for residents seeking lifestyle, leisure, and smart indoor-outdoor connectivity.\nLeisure & Wellness, Urban Beach & Artificial Lagoon, Private Dining & Juice Lounge, Yoga & Pilates Studio, Fitness Studio & Sauna, Children's Pool & Kids' Play Area, Clubhouse Pavilion, Cinema Room, Game Room, Clubhouse Gallery, Clubhouse Majlis.\nPrime Location: Metro: Future station within 15 min, Airport: 20 min to Dubai Intl, Mall: 5 min to Silicon Central, 10 min to Global Village, Nearby: IMG Worlds, Dubai Hills Mall, Downtown (20 min).`,
  },
  {
    id: 11,
    name: 'Sobha Orbis',
    location: 'Sobha Orbis, Dubai',
    price: 'Launching Soon',
    roi: '-',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856683/orbis_kinmqf.webp', // Add image URL if available
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: ['spa', 'gym', 'pool'],
    description: `Studios, 1 & 2 Bedroom Apartments | Launching Soon\nSobha Orbis is a new launch by Sobha Realty, offering modern apartments in a vibrant community with premium amenities and excellent connectivity.\nMore details coming soon.`,
  },
  {
    id: 12,
    name: 'Pierside Marina Residences – Sobha Siniya Island',
    location: 'Sobha Siniya Island, UAE',
    price: 'Starting from $1,000,000',
    roi: '-',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1750760807/placeholder-video.mp4', // Placeholder video
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760802/placeholder1.jpg', // Placeholder image
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Infinity Marina Pool with Seaview Deck',
      'Private Yacht Mooring & Marina Club',
      'Smart-Home Ready Furnished Residences',
      'Golf Course with Waterfront Views',
      'Luxury Retail & Fine Dining Promenade',
      'Wellness Spa, Gym & Yoga Deck',
      'Open-Air Cinema & Cultural Lawn',
    ],
    description: `1 - 3 Bedroom Luxury Apartments | Starting from $1,000,000\nPierside Marina Residences offers 1 to 3-bedroom luxury apartments set on an exclusive island destination by Sobha Realty. Designed for those who seek privacy, views, and a curated lifestyle, the development combines yacht-side living with resort-class wellness, retail, and leisure experiences. With sweeping sea views, smart home features, and refined interiors, it's where elevated living meets ocean serenity.\n\nPremium Amenities: Infinity Marina Pool with Seaview Deck, Private Yacht Mooring & Marina Club, Smart-Home Ready Furnished Residences, Golf Course with Waterfront Views, Luxury Retail & Fine Dining Promenade, Wellness Spa, Gym & Yoga Deck, Open-Air Cinema & Cultural Lawn.\n\nPrime Location: Sobha Siniya Island, UAE. Metro: Ras Al Khaimah Bus Terminal – 16 km (≈20 min drive). Airport: Dubai International – 80 km (≈50 min drive). Mall: Marina Residences Mall – Onsite. Nearby Landmark: Private Yacht Club – Walking Distance.`,
  },
];

const amenityIcons: { [key: string]: React.ReactElement } = {
  pool: <FaSwimmer />,
  gym: <FaDumbbell />,
  spa: <FaSpa />,
  concierge: <FaConciergeBell />,
  security: <FaShieldAlt />,
  parking: <FaParking />,
  wifi: <FaWifi />,
};

// Add a type for property
interface Property {
  id: number;
  name: string;
  location: string;
  price: string;
  roi: string;
  reelVideoUrl: string;
  image: string;
  beds: number;
  baths: number;
  sqft: string;
  rating: number;
  amenities: string[];
  description: string;
}

const PropertiesPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('price-low');
  const [priceRange, setPriceRange] = useState([0, 15000000]);
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const allAmenities = ['pool', 'gym', 'spa', 'concierge', 'security', 'parking', 'wifi'];

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev => 
      prev.includes(amenity) 
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleVideoPlay = (propertyId: number) => {
    const video = videoRefs.current[propertyId];
    if (video) {
      video.play();
    }
  };

  const handleVideoPause = (propertyId: number) => {
    const video = videoRefs.current[propertyId];
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
  };

  const filteredProperties = allProperties.filter(property => {
    // Extract numeric price from string (e.g., 'Starting from AED 1.5M')
    const priceMatch = property.price.match(/([\d.]+)\s*M/i);
    let price = 0;
    if (priceMatch) {
      price = parseFloat(priceMatch[1]) * 1000000;
    } else if (/([\d,]+)/.test(property.price)) {
      price = parseFloat(property.price.replace(/[^\d.]/g, ''));
    }
    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    return inPriceRange;
  });

  // Use Property type for getPrice
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const getPrice = (p: Property) => {
      const priceMatch = p.price.match(/([\d.]+)\s*M/i);
      if (priceMatch) return parseFloat(priceMatch[1]) * 1000000;
      if (/([\d,]+)/.test(p.price)) return parseFloat(p.price.replace(/[^\d.]/g, ''));
      return 0;
    };
    const priceA = getPrice(a);
    const priceB = getPrice(b);
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'beds') return b.beds - a.beds;
    return priceA - priceB;
  });

  const handleSliderChange = (value: number | number[]) => {
    if (Array.isArray(value)) {
      setPriceRange(value as number[]);
    }
  };

  return (
    <div className="bg-black text-white font-montserrat">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-48 pb-40 flex items-center justify-start overflow-hidden">
        {/* Background Image */}
        <Image
          src="https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745906/dubai-creek_wrypak.jpg"
          alt="Luxury Property"
          fill
          className="object-cover object-center absolute inset-0 z-0"
          priority
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-purple-900/60 z-10" />
        <div className="max-w-7xl mx-auto px-6 relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Luxury Properties
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
              Discover exceptional investment opportunities in Dubai's most prestigious locations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-12 border-b border-gray-800 bg-gradient-to-r from-gray-900/80 to-gray-800/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Price Range with Slider */}
            <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
              <label className="block text-lg font-semibold text-white mb-4">Price Range (AED)</label>
              <div className="flex flex-col gap-4 items-center">
                <Slider
                  range
                  min={0}
                  max={15000000}
                  step={100000}
                  value={priceRange}
                  onChange={handleSliderChange}
                  trackStyle={[{ backgroundColor: '#a21caf' }]}
                  handleStyle={[{ borderColor: '#a21caf' }, { borderColor: '#a21caf' }]}
                  railStyle={{ backgroundColor: '#444' }}
                />
                <div className="flex justify-between w-full text-sm text-gray-300">
                  <span>{priceRange[0].toLocaleString()}</span>
                  <span>{priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            {/* Sort Options */}
            <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
              <label className="block text-lg font-semibold text-white mb-4">Sort By</label>
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
              >
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
                <option value="beds">Most Bedrooms</option>
              </select>
            </div>
          </div>
        </div>
      </section>

      {/* Results Count */}
      <section className="py-6 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-gray-400 text-center">
            Showing <span className="text-white font-semibold">{sortedProperties.length}</span> of <span className="text-white font-semibold">{allProperties.length}</span> properties
          </p>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((property, index) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => handleVideoPlay(property.id)}
                onMouseLeave={() => handleVideoPause(property.id)}
              >
                <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 border border-gray-800">
                  {/* Video/Image Container - Portrait Size */}
                  <div className="relative h-[450px] overflow-hidden group">
                    {/* Image always shown by default */}
                    <Image
                      src={property.image}
                      alt={property.name}
                      width={800}
                      height={450}
                      className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-500 ${property.reelVideoUrl ? 'group-hover:opacity-0' : 'opacity-100'}`}
                      style={{ zIndex: 1 }}
                    />
                    {/* Video fades in on hover if present */}
                    {property.reelVideoUrl && (
                    <video
                      ref={(el) => { videoRefs.current[property.id] = el; }}
                      src={property.reelVideoUrl}
                        className="w-full h-full object-cover absolute inset-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                      muted
                      loop
                      playsInline
                        onMouseEnter={e => e.currentTarget.play()}
                        onMouseLeave={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }}
                        style={{ zIndex: 2 }}
                    />
                    )}
                    {/* Play Button Overlay (only if video) */}
                    {property.reelVideoUrl && (
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <FaPlay className="text-black text-xl ml-1" />
                      </div>
                    </div>
                    )}
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="mb-2 text-lg font-bold text-purple-200/90">{property.price}</div>
                    <div className="flex flex-col items-start mb-3">
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-purple-400 transition-colors duration-300 truncate w-full" style={{lineHeight: 1.2}} title={property.name}>
                        {property.name}
                      </h3>
                    </div>

                    <Link
                      href={property.name === 'Pierside Marina Residences – Sobha Siniya Island' ? '/property/pierside-marina-residences' : `/property/${property.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
                      className="w-full block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300 text-center mt-4"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertiesPage; 