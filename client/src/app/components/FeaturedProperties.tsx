'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Property {
  id: number;
  title: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  description: string;
  imageUrl: string;
  videoUrl?: string; // Optional video URL
  tag?: 'Featured' | 'New';
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Emaar Creek Harbour',
    price: 'Starting from AED 1.5M',
    beds: 1,
    baths: 0, // Not specified
    sqft: 'N/A',
    description: `1 - 3 Bedroom Residences | Starting from AED 1.5M\nA next-generation waterfront destination redefining city living with expansive green zones, world-class retail, and unmatched skyline views. This is more than a residence - it's a self-contained world built for 200,000+ future-forward residents.\nTap to explore the full masterplan, lifestyle perks, and investment potential.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745906/dubai-creek_wrypak.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    tag: 'New',
  },
  {
    id: 2,
    title: 'Sobha Solis',
    price: 'Starting from AED 1M',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    description: `1 - 3 Bedroom Apartments | Starting from AED 1M\nA resort-style community with over 50+ wellness, fitness, and leisure amenities  -  from lap pools to rock climbing and a racetrack deck. Designed for those who want more than just a home, it's your everyday escape in the heart of Dubai.\nClick to uncover the full lifestyle and amenity experience.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745431/sobha_hm1hsd.webp',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    tag: 'New',
  },
  {
    id: 3,
    title: 'Azizi Venice',
    price: 'Launching Soon',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    description: `Studios to 3 Bedrooms | Launching Soon\nA vibrant waterfront city with swimmable beaches, climate-controlled retail boulevards, and over 40 acres of green space. From cable car access to a private opera house, every detail is built for next-level urban living with resort-style comfort.\nClick to explore amenities, lifestyle, and investment details.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745150/azizi_fvgglb.webp',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    tag: 'New',
  },
  {
    id: 4,
    title: 'Deeyar Eleve',
    price: 'Starting from AED 1M',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    description: `1 - 3 Bedroom Residences | Starting from AED 1M\nModern high-rise living with panoramic port views, resort-style pools, and a vibrant F&B street below. From fitness zones to luxe lounges, every element is designed to elevate everyday life in a connected urban community.\nTap to view full amenities, lifestyle, and project highlights.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750744127/deeyer-eleve_hmjj4n.jpg',
    videoUrl: '',
    tag: 'New',
  },
  {
    id: 5,
    title: 'Wasl 1 Residences',
    price: 'Starting from AED 1.5M',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    description: `1–3 Bedroom Apartments | Starting from AED 1.5M\nPositioned at the crossroads of old and new Dubai, this community blends city connectivity with modern comfort. Enjoy park views, premium fitness zones, and family-friendly spaces -  all in one address.\nClick to discover the amenities and location advantage.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746204/wasl_kubqws.jpg',
    videoUrl: '',
    tag: 'New',
  },
  {
    id: 6,
    title: 'Emaar South',
    price: 'Starting from AED 2.8M',
    beds: 3,
    baths: 0,
    sqft: 'N/A',
    description: `3 - 4 Bedroom Townhouses | Starting from AED 2.8M\nSurrounded by green fairways and open parks, Greenridge offers spacious modern townhomes with direct access to golf, retail, schools, and community spaces  -  all in a self-sustained, family-first neighbourhood.\nTap to explore floor plans, pricing, and lifestyle highlights.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746793/emaar-south_ba7wgp.jpg',
    videoUrl: '',
    tag: 'New',
  },
  {
    id: 7,
    title: 'The Valley – Avena',
    price: 'Starting from AED 4.37M',
    beds: 4,
    baths: 0,
    sqft: 'N/A',
    description: `4 Bedroom Villas | Starting from AED 4.37M\nSet within a 250,000 sqm central park, Avena offers family-centric villas designed for sustainable, resort-style living. Spacious layouts, lush landscapes, and seamless indoor-outdoor flow define this premium residential enclave.\nClick to view floor plans, park access, and villa features.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750746917/valey-avena_nwrgaj.jpg',
    videoUrl: '',
    tag: 'New',
  },
  {
    id: 8,
    title: 'Damac Islands',
    price: 'Starting from AED 2.4M',
    beds: 4,
    baths: 0,
    sqft: 'N/A',
    description: `4 - 5 Bedroom Townhouses | Starting from AED 2.4M\nA private island community blending tropical beauty with ultra-luxury living. These waterfront homes offer beach access, smart automation, and rare experiences - from jungle trails to floating spas and LED-lit gondola rides.\nTap to explore full amenities, villa finishes, and island lifestyle.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750744640/damac-islands_awlzym.jpg',
    videoUrl: '',
    tag: 'New',
  },
  {
    id: 9,
    title: 'Damac Islands Villas',
    price: 'Starting from AED 2.4M',
    beds: 6,
    baths: 0,
    sqft: '17,000+',
    description: `6 - 7 Bedroom Villas | Starting from AED 2.4M\nExpansive beachfront villas up to 17,000+ sq.ft., complete with private gyms, basements, maid's rooms, and panoramic terraces. Designed for elite living, these residences combine space, privacy, and resort-style luxury on Dubai's most exclusive island.\nClick to explore villa plans, features, and lifestyle benefits.`,
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750747071/damac-villa_sjtrcb.jpg',
    videoUrl: '',
    tag: 'New',
  },
  
];

const PropertyCard: React.FC<{ property: Property }> = ({ property }) => {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const SEEK_TIME = 1; // seconds

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleLoadedMetadata = () => {
      video.currentTime = SEEK_TIME;
      video.pause();
    };

    video.addEventListener('loadedmetadata', handleLoadedMetadata);

    // On mount, if metadata is already loaded
    if (video.readyState >= 1) {
      video.currentTime = SEEK_TIME;
      video.pause();
    }

    return () => {
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (isHovered) {
      video.currentTime = SEEK_TIME;
      video.play().catch(() => {});
    } else {
      video.pause();
      video.currentTime = SEEK_TIME;
    }
  }, [isHovered]);

  const hasVideo = !!property.videoUrl;

  return (
    <Link href="/property/emaar-creek" className="block" prefetch={false}>
      <div
        className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
        onMouseEnter={() => hasVideo && setIsHovered(true)}
        onMouseLeave={() => hasVideo && setIsHovered(false)}
      >
        <div className="w-full flex justify-center items-center bg-black relative h-[550px] md:h-[700px]">
          {/* Show image by default, swap to video on hover if video exists */}
          {property.imageUrl ? (
            <Image
              src={property.imageUrl}
              alt={property.title}
              width={800}
              height={500}
              className={`object-cover w-full h-full transition-opacity duration-300 ${hasVideo && isHovered ? 'opacity-0' : 'opacity-100'}`}
              style={{ position: 'absolute', inset: 0 }}
            />
          ) : null}
          {hasVideo && (
            <video
              ref={videoRef}
              src={property.videoUrl}
              loop
              muted
              playsInline
              className={`object-cover w-full h-full transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              style={{ position: 'absolute', inset: 0, height: '100%' }}
            />
          )}
          {/* If neither image nor video, show a placeholder */}
          {!property.imageUrl && !hasVideo && (
            <div className="flex items-center justify-center w-full h-full bg-neutral-800 text-neutral-500 text-lg font-semibold" style={{position: 'absolute', inset: 0}}>
              No Media Available
            </div>
          )}
        </div>
        <div className="p-6 w-full">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white text-xl font-bold">{property.title}</h3>
            <span className="text-purple-400 font-semibold text-lg">
              {property.price}
            </span>
          </div>
          <p className="text-neutral-400 text-sm mb-2">
            {property.beds > 0 ? `${property.beds} bed` : ''}
            {property.sqft !== 'N/A' && property.sqft !== '' ? `${property.beds > 0 ? ' · ' : ''}${property.sqft} sq ft` : ''}
          </p>
          <p className="text-neutral-500 text-sm">
            {property.description}
          </p>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProperties = () => {
  return (
    <section className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <h2 className="text-white text-center text-4xl md:text-5xl font-bold mb-4">
          Featured Properties
        </h2>
        <p className="text-neutral-400 text-center text-lg mb-12 max-w-2xl mx-auto">
        A curated set of premium properties offering value through design, connectivity, and development credibility.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties; 