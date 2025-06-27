'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCalendarAlt, FaPhoneAlt } from 'react-icons/fa';

interface Property {
  id: number;
  title: string;
  price: string;
  baths: number;
  sqft: string;
  description?: string;
  imageUrl: string;
  videoUrl?: string; // Optional video URL
  tag?: 'Featured' | 'New';
  slug: string;
  amenities: string[];
}

const properties: Property[] = [
  {
    id: 1,
    title: 'Emaar Creek Harbour',
    price: 'Starting from AED 1.5M',
    
    baths: 0,
    sqft: 'N/A',
    amenities: [
      '700,000 sq.m. of Parks & Green Spaces',
      'Over 250,000 sq.m. of Retail & Dining',
      'Cultural Hub with Museums & Exhibitions',
      'Cycling Tracks',
      'Entertainment Arenas for Concerts & Theatre',
      'Waterfront Promenades',
    ],
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760831/damac-villa3_y3zpva.jpg',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
    tag: 'New',
    slug: 'emaar-creek-harbour',
  },
  {
    id: 2,
    title: 'Sobha Solis',
    price: 'Starting from AED 1M',
    baths: 0,
    sqft: 'N/A',
    amenities: [
      'Lap Pool',
      'Kids Pool & Leisure Pool',
      'Common Parks & Lawns',
      'Gym & Fitness Zone',
      'Indoor Kids Play Area',
      'Yoga & Meditation Studio',
    ],
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958543/sobhasolis_hqajtt.webp',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
    tag: 'New',
    slug: 'sobha-solis',
  },
  {
    id: 3,
    title: 'Azizi Venice',
    price: 'Launching Soon',
    baths: 0,
    sqft: 'N/A',
    amenities: [
      'Climate-Controlled Retail Boulevard',
      'Crystal Lagoon & Swimmable Beaches',
      'Opera House (1,500 seats)',
      'Five-Star Family & Lifestyle Hotels',
      'Five-Star Family & Lifestyle Hotels',
    ],
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750745150/azizi_fvgglb.webp',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
    tag: 'New',
    slug: 'azizi-venice',
  },
  {
    id: 4,
    title: 'Sobha Orbis',
    price: 'Starting from AED 1M',
    baths: 0,
    sqft: 'N/A',
    amenities: [
      'Clubhouse & Sports',
      'Badminton & Squash Courts',
      'Billiards & Indoor Games',
      "Kid's & Toddler Play Areas",
      'Community Gym & Studios',
     
    ],
    imageUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938518/sobha2_a5ajh9.webp',
    videoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
    tag: 'New',
    slug: 'sobha-orbis',
  },
];

interface PropertyCardProps {
  property: Property;
  onPayNow: () => void;
  onCallExpert: () => void;
  onEnquireNow: () => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onPayNow, onCallExpert, onEnquireNow }) => {
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
    <Link href={`/property/${property.slug}`} className="block" prefetch={false}>
      <div
        className="bg-neutral-900 rounded-lg overflow-hidden shadow-lg flex flex-col transition-transform duration-300 hover:scale-105 cursor-pointer h-[1050px]"
        onMouseEnter={() => hasVideo && setIsHovered(true)}
        onMouseLeave={() => hasVideo && setIsHovered(false)}
      >
        <div className="w-full bg-black relative aspect-[3/4] flex-shrink-0">
          {hasVideo ? (
            <video
              ref={videoRef}
              src={property.videoUrl}
              loop
              muted
              playsInline
              className="object-cover w-full h-full rounded-t-lg"
              style={{ width: '100%', height: '100%', display: 'block' }}
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full bg-neutral-800 text-neutral-500 text-lg font-semibold rounded-t-lg">
              No Media Available
            </div>
          )}
        </div>
        <div className="p-6 w-full flex-1 flex flex-col overflow-y-auto">
          <div className="mb-4">
            <div className="text-white text-xl font-bold truncate mb-1">{property.title}</div>
            <div className="text-purple-400 font-semibold text-lg whitespace-nowrap">{property.price}</div>
          </div>
         
          {/* Amenities List */}
          <div className="text-white text-sm font-bold mb-4 grid grid-cols-1 gap-y-2">
            {property.amenities && property.amenities.map((amenity, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                <span className="font-bold text-white whitespace-nowrap">{amenity}</span>
              </div>
            ))}
          </div>
          {/* Action Buttons */}
          <div className="space-y-2 pt-2 mt-auto">
            <button
              type="button"
              className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-sm"
              onClick={e => { e.preventDefault(); onPayNow(); }}
            >
              Pay Now
            </button>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                onClick={e => { e.preventDefault(); onCallExpert(); }}
              >
                Call Expert
              </button>
              <button
                type="button"
                className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                onClick={e => { e.preventDefault(); onEnquireNow(); }}
              >
                Enquire Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

const FeaturedProperties = () => {
  const [modal, setModal] = useState<{ type: null | 'pay' | 'call' | 'enquire'; property: Property | null }>({ type: null, property: null });
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [callForm, setCallForm] = useState({ name: '', date: '', time: '', timezone: '', country: '', email: '', phone: '' });
  const [enquireStep, setEnquireStep] = useState(1);
  const [enquireForm, setEnquireForm] = useState({
    name: '',
    email: '',
    phone: '',
    contactMethod: 'WhatsApp',
    inIndia: '',
    country: '',
    visitType: '',
    date: '',
    time: '',
    buyTimeline: '',
    payNow: false,
    paymentMethod: '',
  });
  const countryList = [
    'India', 'United States', 'United Kingdom', 'UAE', 'Canada', 'Australia', 'Singapore', 'Germany', 'France', 'China', 'Japan', 'South Africa', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Russia', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Turkey', 'Brazil', 'Other'
  ];
  const timezoneList = [
    'Asia/Kolkata (IST)',
    'Asia/Dubai (GST)',
    'Europe/London (GMT)',
    'Europe/Paris (CET)',
    'America/New_York (EST)',
    'America/Los_Angeles (PST)',
    'Asia/Singapore (SGT)',
    'Australia/Sydney (AEST)',
    'UTC',
  ];

  // Reset forms when modal closes
  useEffect(() => {
    if (!modal.type) {
      setForm({ name: '', email: '', phone: '', address: '' });
      setCallForm({ name: '', date: '', time: '', timezone: '', country: '', email: '', phone: '' });
      setEnquireStep(1);
      setEnquireForm({
        name: '',
        email: '',
        phone: '',
        contactMethod: 'WhatsApp',
        inIndia: '',
        country: '',
        visitType: '',
        date: '',
        time: '',
        buyTimeline: '',
        payNow: false,
        paymentMethod: '',
      });
    }
  }, [modal.type]);

  // Modal form handlers (no API, just close on submit)
  const handlePayNowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal({ type: null, property: null });
  };
  const handleCallSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal({ type: null, property: null });
  };
  const handleEnquireSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setModal({ type: null, property: null });
  };

  return (
    <section className="py-12 sm:py-16 md:py-20 bg-black">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between mb-4 md:mb-6">
          <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-bold">Featured Properties</h2>
          <Link href="/properties" className="inline-block bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl shadow-lg hover:from-purple-700 hover:to-pink-600 transition-all duration-300 text-base sm:text-lg">
            View All
          </Link>
        </div>
        <p className="text-neutral-400 text-base sm:text-lg mb-8 md:mb-12 max-w-2xl">A curated set of premium properties offering value through design, connectivity, and development credibility.</p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-8 items-stretch">
          {properties.map((property) => (
            <div key={property.id} className="h-full flex flex-col">
              <PropertyCard 
                property={property} 
                onPayNow={() => setModal({ type: 'pay', property })}
                onCallExpert={() => setModal({ type: 'call', property })}
                onEnquireNow={() => setModal({ type: 'enquire', property })}
              />
            </div>
          ))}
        </div>
        {/* Modal rendering */}
        {modal.type === 'pay' && modal.property && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative animate-fadeIn border border-purple-700/40 max-h-[95vh] overflow-y-auto">
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => setModal({ type: null, property: null })}>
                ×
              </button>
              <div className="flex flex-col items-center pt-6 sm:pt-8 pb-2 px-4 sm:px-8">
                <Image src="/logos/logo.png" alt="3rdshade Logo" width={120} height={20} className="mb-2" />
                <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">Secure Your Property</h2>
                <p className="text-gray-300 text-center mb-4 text-xs sm:text-sm px-2">Fill in your details to proceed with your interest in <span className="font-bold text-white">{modal.property.title}</span>.</p>
              </div>
              <div className="px-4 sm:px-8 pb-6 sm:pb-8">
                <form onSubmit={handlePayNowSubmit} className="flex flex-col gap-4 sm:gap-5">
                  <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} className="pl-4 pr-4 py-2.5 sm:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-sm sm:text-base" required />
                  <input type="email" name="email" placeholder="Email Address" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} className="pl-4 pr-4 py-2.5 sm:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-sm sm:text-base" required />
                  <input type="tel" name="phone" placeholder="Phone Number" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} className="pl-4 pr-4 py-2.5 sm:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-sm sm:text-base" required />
                  <input type="text" name="address" placeholder="Address" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} className="pl-4 pr-4 py-2.5 sm:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-sm sm:text-base" required />
                  <button type="submit" className="w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-base sm:text-lg tracking-wide bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg active:scale-95">Submit</button>
                </form>
              </div>
            </div>
          </div>
        )}
        {modal.type === 'call' && modal.property && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative animate-fadeIn max-h-[95vh] overflow-y-auto">
              <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => setModal({ type: null, property: null })}>×</button>
              <div className="flex flex-col items-center mb-4 sm:mb-6 pt-2">
                <FaPhoneAlt className="text-2xl sm:text-3xl text-purple-400 mb-2" />
                <h2 className="text-xl sm:text-2xl font-bold text-center text-white px-2">Book a Video Call Slot for {modal.property.title}</h2>
              </div>
              <form onSubmit={handleCallSubmit} className="flex flex-col gap-3 sm:gap-4">
                <input type="text" name="name" placeholder="Full Name" value={callForm.name} onChange={e => setCallForm({ ...callForm, name: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base" required />
                <select name="country" value={callForm.country} onChange={e => setCallForm({ ...callForm, country: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base" required>
                  <option value="">Select Country</option>
                  {countryList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <input type="date" name="date" value={callForm.date} onChange={e => setCallForm({ ...callForm, date: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-full text-sm sm:text-base" required />
                <div className="flex flex-col sm:flex-row gap-2">
                  <input type="time" name="time" value={callForm.time} onChange={e => setCallForm({ ...callForm, time: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-full sm:w-1/2 text-sm sm:text-base" required />
                  <select name="timezone" value={callForm.timezone} onChange={e => setCallForm({ ...callForm, timezone: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-1/2 text-sm sm:text-base" required>
                    <option value="">Timezone</option>
                    {timezoneList.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                  </select>
                </div>
                <input type="tel" name="phone" placeholder="Phone (with country code)" value={callForm.phone} onChange={e => setCallForm({ ...callForm, phone: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base" required />
                <input type="email" name="email" placeholder="Email" value={callForm.email} onChange={e => setCallForm({ ...callForm, email: e.target.value })} className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base" required />
                <button type="submit" className="w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-sm sm:text-base bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg active:scale-95">Book Video Call</button>
              </form>
            </div>
          </div>
        )}
        {modal.type === 'enquire' && modal.property && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
            <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
              <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110" onClick={() => { setModal({ type: null, property: null }); setEnquireStep(1); }}>×</button>
              <div className="flex flex-col items-center mb-4">
                <Image src="/logos/logo.png" alt="3rdshade Logo" width={120} height={40} className="mb-2" />
              </div>
              <form onSubmit={handleEnquireSubmit} className="flex flex-col gap-6">
                {/* Stepper */}
                <div className="flex justify-center gap-2 mb-4">
                  {[1, 2].map(step => (
                    <div key={step} className={`w-8 h-2 rounded-full transition-all duration-300 ${enquireStep === step ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-neutral-700'}`}></div>
                  ))}
                </div>
                {/* Step 1: Basic Info */}
                {enquireStep === 1 && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <input type="text" name="name" placeholder="Name" value={enquireForm.name} onChange={e => setEnquireForm({ ...enquireForm, name: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                    <input type="email" name="email" placeholder="Email" value={enquireForm.email} onChange={e => setEnquireForm({ ...enquireForm, email: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                    <input type="tel" name="phone" placeholder="Phone (with country code)" value={enquireForm.phone} onChange={e => setEnquireForm({ ...enquireForm, phone: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                    <label className="text-sm text-gray-300">Preferred contact method</label>
                    <div className="flex gap-3">
                      {['WhatsApp', 'Email', 'Phone'].map(method => (
                        <label key={method} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.contactMethod === method ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                          <input type="radio" name="contactMethod" value={method} checked={enquireForm.contactMethod === method} onChange={e => setEnquireForm({ ...enquireForm, contactMethod: e.target.value })} className="hidden" />
                          {method}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {/* Step 2: Property Visit Preferences */}
                {enquireStep === 2 && (
                  <div className="flex flex-col gap-4 animate-fadeIn">
                    <label className="text-sm text-gray-300">Are you currently in India?</label>
                    <div className="flex gap-3">
                      {['Yes', 'No'].map(val => (
                        <label key={val} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.inIndia === val ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                          <input type="radio" name="inIndia" value={val} checked={enquireForm.inIndia === val} onChange={e => setEnquireForm({ ...enquireForm, inIndia: e.target.value })} className="hidden" />
                          {val}
                        </label>
                      ))}
                    </div>
                    <label className="text-sm text-gray-300">Select the country</label>
                    <select name="country" value={enquireForm.country} onChange={e => setEnquireForm({ ...enquireForm, country: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500">
                      <option value="">Select Country</option>
                      {countryList.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <label className="text-sm text-gray-300">Type of visit</label>
                    <div className="flex gap-3">
                      {['Virtual', 'Physical'].map(type => (
                        <label key={type} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.visitType === type ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                          <input type="radio" name="visitType" value={type} checked={enquireForm.visitType === type} onChange={e => setEnquireForm({ ...enquireForm, visitType: e.target.value })} className="hidden" />
                          {type}
                        </label>
                      ))}
                    </div>
                    <label className="text-sm text-gray-300">Preferred Date & Time</label>
                    <div className="flex gap-2">
                      <input type="date" name="date" value={enquireForm.date} onChange={e => setEnquireForm({ ...enquireForm, date: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer" required />
                      <input type="time" name="time" value={enquireForm.time} onChange={e => setEnquireForm({ ...enquireForm, time: e.target.value })} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer" required />
                    </div>
                    <label className="text-sm text-gray-300">How soon are you looking to buy?</label>
                    <div className="flex flex-wrap gap-2">
                      {['Immediately', '1–3 Months', '3–6 Months', 'Just Exploring'].map(opt => (
                        <label key={opt} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.buyTimeline === opt ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                          <input type="radio" name="buyTimeline" value={opt} checked={enquireForm.buyTimeline === opt} onChange={e => setEnquireForm({ ...enquireForm, buyTimeline: e.target.value })} className="hidden" />
                          {opt}
                        </label>
                      ))}
                    </div>
                  </div>
                )}
                {/* Step Navigation */}
                <div className="flex justify-between mt-2">
                  {enquireStep > 1 ? (
                    <button type="button" onClick={() => setEnquireStep(enquireStep - 1)} className="px-6 py-2 rounded-full bg-neutral-800 text-gray-300 font-semibold transition-all duration-200 cursor-pointer hover:bg-neutral-700 hover:scale-105">Back</button>
                  ) : <div />}
                  {enquireStep < 2 ? (
                    <button type="button" onClick={() => setEnquireStep(enquireStep + 1)} className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg">Next</button>
                  ) : (
                    <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg">Submit</button>
                  )}
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProperties; 