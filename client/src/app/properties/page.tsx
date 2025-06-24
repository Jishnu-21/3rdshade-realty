'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaStar, FaHeart, FaPlay, FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaWifi, FaParking, FaMoneyBillWave } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React from 'react';
import Link from 'next/link';

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
    // const price = parseFloat(property.price.replace(/,/g, ''));
    // const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    // Only filter by amenities for now
    const hasSelectedAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => property.amenities.includes(amenity));
    return hasSelectedAmenities;
  });

  const sortedProperties = [...filteredProperties].sort((a, b) => {
    const priceA = parseFloat(a.price.replace(/,/g, ''));
    const priceB = parseFloat(b.price.replace(/,/g, ''));
    
    if (sortBy === 'price-low') return priceA - priceB;
    if (sortBy === 'price-high') return priceB - priceA;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'beds') return b.beds - a.beds;
    return priceA - priceB;
  });

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
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Price Range */}
            <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
              <label className="block text-lg font-semibold text-white mb-4">Price Range</label>
              <div className="flex gap-4 items-center">
                <input
                  type="number"
                  placeholder="Min"
                  value={priceRange[0]}
                  onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
                <span className="text-gray-400 font-semibold">-</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 15000000])}
                  className="w-full px-4 py-3 bg-gray-800 text-white rounded-lg border border-gray-600 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20"
                />
              </div>
            </div>

            {/* Amenities Filter */}
            <div className="bg-black/40 rounded-xl p-6 border border-gray-700">
              <label className="block text-lg font-semibold text-white mb-4">Amenities</label>
              <div className="flex flex-wrap gap-3">
                {allAmenities.map(amenity => (
                  <button
                    key={amenity}
                    onClick={() => toggleAmenity(amenity)}
                    className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 flex items-center gap-2 font-medium ${
                      selectedAmenities.includes(amenity)
                        ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white shadow-lg'
                        : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-600'
                    }`}
                  >
                    {amenityIcons[amenity]}
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </button>
                ))}
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
                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300 z-10">
                      <FaHeart className="text-sm" />
                    </button>
                    {/* Amenities Badge */}
                    <div className="absolute top-4 left-4 flex gap-1 z-10">
                      {property.amenities.slice(0, 3).map(amenity => (
                        <div key={amenity} className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white text-xs">
                          {amenityIcons[amenity]}
                        </div>
                      ))}
                      {property.amenities.length > 3 && (
                        <div className="w-8 h-8 bg-black/70 rounded-full flex items-center justify-center text-white text-xs">
                          +{property.amenities.length - 3}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="p-6">
                    <div className="flex flex-col items-start mb-3">
                      <h3 className="text-2xl font-extrabold text-white group-hover:text-purple-400 transition-colors duration-300 truncate w-full" style={{lineHeight: 1.2}} title={property.name}>
                        {property.name}
                      </h3>
                    </div>

                    <Link
                      href={`/property/${property.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
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