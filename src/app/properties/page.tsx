'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaBed, FaBath, FaRulerCombined, FaMapMarkerAlt, FaStar, FaHeart, FaPlay, FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaWifi, FaParking } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import React from 'react';

// Mock data for all properties
const allProperties = [
  {
    id: 1,
    name: 'Emaar Creek',
    location: 'Dubai Marina, UAE',
    price: '2,850,000',
    roi: '12-15%',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80',
    beds: 3,
    baths: 2,
    sqft: '2,500',
    rating: 4.8,
    amenities: ['pool', 'gym', 'security', 'parking', 'wifi'],
  },
  {
    id: 2,
    name: 'Palm Jumeirah Villa',
    location: 'Palm Jumeirah, Dubai',
    price: '5,200,000',
    roi: '10-12%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
    beds: 4,
    baths: 3,
    sqft: '3,800',
    rating: 4.9,
    amenities: ['pool', 'gym', 'spa', 'concierge', 'parking', 'wifi'],
  },
  {
    id: 3,
    name: 'Downtown Penthouse',
    location: 'Downtown Dubai, UAE',
    price: '3,500,000',
    roi: '14-16%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80',
    beds: 2,
    baths: 2,
    sqft: '1,800',
    rating: 4.7,
    amenities: ['gym', 'security', 'parking', 'wifi'],
  },
  {
    id: 4,
    name: 'Beachfront Resort',
    location: 'JBR, Dubai',
    price: '1,800,000',
    roi: '8-10%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80',
    beds: 1,
    baths: 1,
    sqft: '1,200',
    rating: 4.6,
    amenities: ['pool', 'wifi'],
  },
  {
    id: 5,
    name: 'Luxury Golf Villa',
    location: 'Emirates Hills, Dubai',
    price: '8,500,000',
    roi: '9-11%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80',
    beds: 5,
    baths: 4,
    sqft: '5,200',
    rating: 4.9,
    amenities: ['pool', 'gym', 'spa', 'concierge', 'security', 'parking', 'wifi'],
  },
  {
    id: 6,
    name: 'Modern Apartment',
    location: 'Business Bay, Dubai',
    price: '1,200,000',
    roi: '11-13%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=600&q=80',
    beds: 2,
    baths: 2,
    sqft: '1,500',
    rating: 4.5,
    amenities: ['gym', 'security', 'parking', 'wifi'],
  },
  {
    id: 7,
    name: 'Waterfront Mansion',
    location: 'Dubai Creek Harbour',
    price: '12,000,000',
    roi: '7-9%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=600&q=80',
    beds: 6,
    baths: 5,
    sqft: '7,800',
    rating: 5.0,
    amenities: ['pool', 'gym', 'spa', 'concierge', 'security', 'parking', 'wifi'],
  },
  {
    id: 8,
    name: 'Skyline Loft',
    location: 'DIFC, Dubai',
    price: '2,200,000',
    roi: '13-15%',
    reelVideoUrl: 'https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80',
    beds: 1,
    baths: 1,
    sqft: '1,100',
    rating: 4.4,
    amenities: ['gym', 'security', 'wifi'],
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
    const price = parseFloat(property.price.replace(/,/g, ''));
    const inPriceRange = price >= priceRange[0] && price <= priceRange[1];
    
    const hasSelectedAmenities = selectedAmenities.length === 0 || 
      selectedAmenities.every(amenity => property.amenities.includes(amenity));
    
    return inPriceRange && hasSelectedAmenities;
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
      <section className="relative pt-48 pb-40 bg-gradient-to-br from-purple-900/30 via-black to-pink-900/30 flex items-center justify-start">
        <div className="max-w-7xl mx-auto px-6">
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
                  <div className="relative h-[450px] overflow-hidden">
                    {/* Video Reel */}
                    <video
                      ref={(el) => videoRefs.current[property.id] = el}
                      src={property.reelVideoUrl}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      muted
                      loop
                      playsInline
                    />
                    
                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center">
                        <FaPlay className="text-black text-xl ml-1" />
                      </div>
                    </div>

                    {/* Favorite Button */}
                    <button className="absolute top-4 right-4 w-10 h-10 bg-black/50 rounded-full flex items-center justify-center text-white hover:bg-red-500 transition-colors duration-300">
                      <FaHeart className="text-sm" />
                    </button>

                    {/* Amenities Badge */}
                    <div className="absolute top-4 left-4 flex gap-1">
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
                    <div className="flex justify-between items-start mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                        {property.name}
                      </h3>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-white">${property.price}</div>
                        <div className="text-sm text-gray-400">{property.roi} ROI</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-gray-400 mb-4">
                      <FaMapMarkerAlt className="text-sm" />
                      <span className="text-sm">{property.location}</span>
                    </div>

                    <div className="flex items-center justify-between text-gray-400 text-sm mb-4">
                      <div className="flex items-center gap-1">
                        <FaBed />
                        <span>{property.beds} beds</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaBath />
                        <span>{property.baths} baths</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <FaRulerCombined />
                        <span>{property.sqft} sqft</span>
                      </div>
                    </div>

                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-600 transition-all duration-300">
                      View Details
                    </button>
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