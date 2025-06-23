'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

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
    title: 'Emaar Creek',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'Emaar Creek is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.',
    imageUrl: 'https://cdn.pixabay.com/photo/2017/01/20/00/30/dubai-1990138_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    tag: 'New',
  },
  {
    id: 2,
    title: 'Sobha Solis',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'Sobha Solis is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    tag: 'New',
  },
  {
    id: 3,
    title: 'Azizi Venice',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'Azizi Venice is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.',
    imageUrl: 'https://cdn.pixabay.com/photo/2015/01/28/23/35/dubai-615430_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    tag: 'New',
  },
  {
    id: 4,
    title: 'Sobha Solis',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'Sobha Solis is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a children\'s play area.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727167/sobha-solis_y9ojjs.mp4',
    tag: 'New',
  },
  {
    id: 5,
    title: 'RK Properties',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'RK Properties is a luxury residential development located in Pune, India.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727105/rk2_ef3ql8.mp4',
    tag: 'New',
  },
  {
    id: 6,
    title: 'Sobha Hartland',
    price: '$X.XM', // Placeholder
    beds: 0, // Placeholder
    baths: 0, // Placeholder
    sqft: '0', // Placeholder
    description: 'Sobha Hartland is a luxury residential development located in Dubai.',
    imageUrl: 'https://cdn.pixabay.com/photo/2016/11/29/09/32/architecture-1868667_1280.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
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

  return (
    <div
      className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg flex flex-col items-center transition-transform duration-300 hover:scale-105 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="w-full flex justify-center items-center bg-black">
        <video
          ref={videoRef}
          src={property.videoUrl}
          loop
          muted
          playsInline
          className="max-w-full h-auto"
          style={{ display: 'block' }}
        />
      </div>
      <div className="p-6 w-full">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-white text-xl font-bold">{property.title}</h3>
          <span className="text-purple-400 font-semibold text-lg">
            {property.price}
          </span>
        </div>
        <p className="text-neutral-400 text-sm mb-2">
          {property.beds} bed · {property.baths} bath · {property.sqft} sq ft
        </p>
        <p className="text-neutral-500 text-sm">
          {property.description}
        </p>
      </div>
    </div>
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
          Each property in our portfolio represents the pinnacle of luxury living and architectural excellence.
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