'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaMapMarkerAlt, FaTrain, FaPlane, FaShoppingBag, FaCheckCircle, FaCalendarAlt, FaPhoneAlt, FaFileDownload } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

// Mock data for a single property
const propertyData = {
  name: 'Emaar Creek',
  description: 'Emaar Creek is a luxury residential development located in the heart of Dubai. It is a 100% freehold property and offers a range of amenities including a swimming pool, gym, and a childrens play area.',
  price: '2,850,000',
  roi: '12-15%',
  reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
  images: [
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1200&q=80',
  ],
  amenities: [
    { icon: <FaSwimmer />, name: 'Infinity Pool' },
    { icon: <FaCar />, name: 'Valet Parking' },
    { icon: <FaConciergeBell />, name: 'Concierge Service' },
    { icon: <FaDumbbell />, name: 'Fitness Center' },
    { icon: <FaShieldAlt />, name: '24/7 Security' },
    { icon: <FaSpa />, name: 'Spa & Wellness' },
  ],
  location: {
    address: 'Downtown Financial District',
    city: 'Dubai Marina, UAE',
    points: [
      { icon: <FaTrain />, name: 'Metro: 2 min' },
      { icon: <FaPlane />, name: 'Airport: 25 min' },
      { icon: <FaShoppingBag />, name: 'Mall: 5 min' },
    ]
  },
  goldenVisa: true,
};

const relatedProperties = [
    { image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80', name: 'Luxury Villa' },
    { image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80', name: 'Modern Apartment' },
    { image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=600&q=80', name: 'Beachfront Home' },
    { image: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=600&q=80', name: 'Classic Mansion' },
];

export default function PropertyPage({ params }: { params: Promise<{ slug: string }> }) {
  const [mainMedia, setMainMedia] = useState({ type: 'video', src: propertyData.reelVideoUrl });
  const [slug, setSlug] = useState<string>('');

  useEffect(() => {
    const getSlug = async () => {
      const resolvedParams = await params;
      setSlug(resolvedParams.slug);
    };
    getSlug();
  }, [params]);

  return (
    <div className="bg-black text-white font-montserrat">
      <Header />
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Image/Video Gallery */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="relative w-full h-[600px] rounded-xl overflow-hidden mb-4">
              {mainMedia.type === 'video' ? (
                <video src={mainMedia.src} className="w-full h-full object-cover" autoPlay loop muted playsInline />
              ) : (
                <Image src={mainMedia.src} alt="Property Image" layout="fill" className="object-cover" />
              )}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {/* Video Thumbnail */}
              <div 
                className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                  mainMedia.type === 'video' && mainMedia.src === propertyData.reelVideoUrl 
                    ? 'border-purple-500' 
                    : 'border-transparent'
                }`} 
                onClick={() => setMainMedia({ type: 'video', src: propertyData.reelVideoUrl })}
              >
                <video src={propertyData.reelVideoUrl} className="w-full h-full object-cover" muted />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
              {/* Image Thumbnails */}
              {propertyData.images.map((img, idx) => (
                <div 
                  key={idx} 
                  className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    mainMedia.type === 'image' && mainMedia.src === img 
                      ? 'border-purple-500' 
                      : 'border-transparent'
                  }`} 
                  onClick={() => setMainMedia({ type: 'image', src: img })}
                >
                  <Image src={img} alt={`Thumbnail ${idx + 1}`} layout="fill" className="object-cover" />
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Property Details */}
          <div className="lg:col-span-1 flex flex-col min-h-screen space-y-4">
            {/* Property Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-3">{propertyData.name}</h1>
              <p className="text-gray-400 text-sm leading-relaxed">{propertyData.description}</p>
            </div>

            {/* Price Card */}
            <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-600 to-pink-500">
              <div className="bg-black rounded-xl p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-2xl font-bold text-white">${propertyData.price}</div>
                    <div className="text-gray-400 text-xs">Starting price</div>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-bold text-white">{propertyData.roi} ROI</div>
                    <div className="text-gray-400 text-xs">Expected Annual Return</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium Amenities */}
            <div className="bg-black rounded-xl p-4">
              <h2 className="text-lg font-bold text-white mb-3">Premium Amenities</h2>
              <div className="grid grid-cols-2 gap-2">
                {propertyData.amenities.map(item => (
                  <div key={item.name} className="flex items-center gap-2 text-gray-300">
                    <span className="text-purple-400 text-xs">{item.icon}</span>
                    <span className="text-xs">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Prime Location */}
            <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-600 to-pink-500">
              <div className="bg-black rounded-xl p-4">
                <h2 className="text-lg font-bold text-white mb-3">Prime Location</h2>
                <div className="flex items-start gap-2 mb-3">
                  <FaMapMarkerAlt className="text-purple-400 mt-1 text-sm" />
                  <div>
                    <div className="font-semibold text-white text-sm">{propertyData.location.address}</div>
                    <div className="text-xs text-gray-400">{propertyData.location.city}</div>
                  </div>
                </div>
                <div className="flex justify-around text-xs">
                  {propertyData.location.points.map(pt => (
                    <div key={pt.name} className="flex items-center gap-1 text-gray-300">
                      <span className="text-purple-400 text-xs">{pt.icon}</span> 
                      <span>{pt.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Golden Visa */}
            {propertyData.goldenVisa && (
              <div className="bg-gradient-to-r from-yellow-500 to-amber-400 rounded-xl p-4 flex items-center justify-between text-black">
                <div>
                  <h3 className="font-bold text-base">Golden Visa Eligibility</h3>
                  <p className="text-xs opacity-80">Qualify for UAE Golden Visa with this investment.</p>
                </div>
                <div className="text-center">
                  <FaCheckCircle size={24} className="mx-auto mb-1" />
                  <div className="font-bold text-sm">YES</div>
                </div>
              </div>
            )}
            
            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2">
                <FaCalendarAlt /> Book Viewing Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-purple-600 to-pink-500">
                  <button className="w-full bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                    <FaPhoneAlt /> Call Now
                  </button>
                </div>
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-purple-600 to-pink-500">
                  <button className="w-full bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
                    <FaFileDownload /> Brochure
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-20">
          <h2 className="text-3xl font-bold mb-8">Related Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProperties.map(prop => (
              <div key={prop.name} className="rounded-lg overflow-hidden">
                <div className="relative h-64">
                    <Image src={prop.image} alt={prop.name} layout="fill" className="object-cover" />
                </div>
                <div className="p-4 bg-neutral-900">
                  <h3 className="font-bold">{prop.name}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}