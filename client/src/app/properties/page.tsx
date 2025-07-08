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
import { useRouter } from 'next/navigation';
import EnquireForm from '../components/EnquireForm';
import PayNowForm from '../components/PayNowForm';
import CallForm from '../components/CallForm';

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
    amenities: [
      '700,000 sq.m. of Parks & Green Spaces',
      'Over 250,000 sq.m. of Retail & Dining',
      'Cultural Hub with Museums & Exhibitions',
    ],
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
    amenities: [
      'Lap Pool',
      'Kids Pool & Leisure Pool',
      'Common Parks & Lawns',
    ],
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
    amenities: [
      'Climate-Controlled Retail Boulevard',
      'Crystal Lagoon & Swimmable Beaches',
      'Opera House (1,500 seats)',
    ],
    description: `Studios to 3 Bedrooms | Launching Soon\nA vibrant waterfront city with swimmable beaches, climate-controlled retail boulevards, and over 40 acres of green space. From cable car access to a private opera house, every detail is built for next-level urban living with resort-style comfort.\nClick to explore amenities, lifestyle, and investment details.`,
  },
  {
    id: 4,
    name: 'Sobha Orbis',
    location: 'Sobha Orbis, Dubai',
    price: 'Launching Soon',
    roi: '-',
    reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856683/orbis_kinmqf.webp',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Clubhouse & Sports',
      'Badminton & Squash Courts',
      'Billiards & Indoor Games',
    ],
    description: `Studios, 1 & 2 Bedroom Apartments | Launching Soon\nSobha Orbis is a new launch by Sobha Realty, offering modern apartments in a vibrant community with premium amenities and excellent connectivity.\nMore details coming soon.`,
  },
  {
    id: 11,
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
    amenities: [
      'Grand Lobby & Lounge',
      'Resort-Style Swimming Pool',
      'Concierge Service',
    ],
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
    amenities: [
      'Swimming Pool',
      "Children's Pool & Kids' Play Area",
      'BBQ Stations',
    ],
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
    amenities: [
      'Golf Course & Clubhouse',
      'Retail & Shopping Zones',
      'Community & District Parks',
    ],
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
    amenities: [
      '250,000 sq.m. Central Park',
      'Resort-Style Green Areas',
      'Family-Centric Community',
    ],
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
    amenities: [
      'Private Beach Access',
      'Floating Wedding Venue',
      'Aqua Dome & Aqua Park',
    ],
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
    amenities: [
      '6 to 7 Bedrooms',
      'Up to 17,078 sq.ft. Built-Up Area',
      "Private Gym & Maid's Room",
    ],
    description: `6 - 7 Bedroom Villas | Starting from AED 2.4M\nExpansive beachfront villas up to 17,000+ sq.ft., complete with private gyms, basements, maid's rooms, and panoramic terraces. Designed for elite living, these residences combine space, privacy, and resort-style luxury on Dubai's most exclusive island.\nClick to explore villa plans, features, and lifestyle benefits.`,
  },
  {
    id: 10,
    name: 'Belgravia Gardens',
    location: 'Belgravia Gardens, Dubai',
    price: 'Starting from AED 1.2M',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia4_coh1y6.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Leisure & Wellness',
      'Urban Beach & Artificial Lagoon',
      'Private Dining & Juice Lounge',
    ],
    description: `Studio to 3 Bedroom Apartments | Starting from AED 1.2M\nBelgravia Gardens features studio to 3-bedroom apartments with optional office layouts, offering a flexible living experience in a refined residential community. With urban beach access, lagoon views, and a fully-equipped clubhouse, this development is designed for residents seeking lifestyle, leisure, and smart indoor-outdoor connectivity.\nLeisure & Wellness, Urban Beach & Artificial Lagoon, Private Dining & Juice Lounge, Yoga & Pilates Studio, Fitness Studio & Sauna, Children's Pool & Kids' Play Area, Clubhouse Pavilion, Cinema Room, Game Room, Clubhouse Gallery, Clubhouse Majlis.\nPrime Location: Metro: Future station within 15 min, Airport: 20 min to Dubai Intl, Mall: 5Counting min to Silicon Central, 10 min to Global Village, Nearby: IMG Worlds, Dubai Hills Mall, Downtown (20 min).`,
  },
  {
    id: 12,
    name: 'Pierside Marina Residences – Sobha Siniya Island',
    location: 'Sobha Siniya Island, UAE',
    price: 'Starting from $1,000,000',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/pierside2_qhivsz.webp',
    beds: 1,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Infinity Marina Pool with Seaview Deck',
      'Private Yacht Mooring & Marina Club',
      'Smart-Home Ready Furnished Residences',
    ],
    description: `1 - 3 Bedroom Luxury Apartments | Starting from $1,000,000\nPierside Marina Residences offers 1 to 3-bedroom luxury apartments set on an exclusive island destination by Sobha Realty. Designed for those who seek privacy, views, and a curated lifestyle, the development combines yacht-side living with resort-class wellness, retail, and leisure experiences. With sweeping sea views, smart home features, and refined interiors, it's where elevated living meets ocean serenity.\n\nPremium Amenities: Infinity Marina Pool with Seaview Deck, Private Yacht Mooring & Marina Club, Smart-Home Ready Furnished Residences, Golf Course with Waterfront Views, Luxury Retail & Fine Dining Promenade, Wellness Spa, Gym & Yoga Deck, Open-Air Cinema & Cultural Lawn.\n\nPrime Location: Sobha Siniya Island, UAE. Metro: Ras Al Khaimah Bus Terminal – 16 km (≈20 min drive). Airport: Dubai International – 80 km (≈50 min drive). Mall: Marina Residences Mall – Onsite. Nearby Landmark: Private Yacht Club – Walking Distance.`,
  },
  {
    id: 13,
    name: 'Timez by Danube',
    location: 'Dubai Silicon Oasis, UAE',
    price: 'Starting from $200,000',
    roi: 'High (Expected)',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/timez4_zg1v01.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Convertible Studio & 1BHK Units',
      'Infinity Pool with Jacuzzi & Aquatic Gym',
      'Japanese Garden & Open-Air Cinema',
    ],
    description: `Studio to 2 Bedroom Convertible Apartments | Starting from $200,000\nTimez by Danube offers studio to 2-bedroom convertible apartments in the heart of Dubai Silicon Oasis.—with smart layouts that adapt as you grow—like studios that transform into 1BHKs—this project blends flexibility with upscale living. From private pools in select homes to 40+ curated amenities, it's an ideal choice for end-users and investors seeking affordable luxury with high ROI potential.\n\nPremium Amenities: Convertible Studio & 1BHK Units, Infinity Pool with Jacuzzi & Aquatic Gym, Japanese Garden & Open-Air Cinema, Paddle Court, Cricket Pitch & Mini Golf, Kids' Oasis, Splash Pad & Trampoline Zone, Indoor Party Lounge & BBQ Area, Outdoor Gym, Zumba Ring & Yoga Deck.\n\nPrime Location: Dubai Silicon Oasis, UAE. Metro: Proposed Station – 3 min. Airport: Dubai Intl – 14 km (≈14 min drive). Mall: Silicon Central Mall – 2 min. Nearby Landmark: Global Village – 7 min.`,
  },
  {
    id: 14,
    name: 'Belgrove Residences',
    location: 'MBR City, Dubai',
    price: 'Starting from $350,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/belgrove4.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Infinity Pool with Flamingo Views',
      'Indoor & Outdoor Fitness + Yoga Studios',
      'Outdoor Cinema & Clubhouse Lounge',
    ],
    description: `1 - 3 Bedroom Apartments | Starting from $350,000\nBelgrove Residences offers 1 to 3-bedroom apartments that blend architectural precision with the serenity of nature. Set in MBR City and overlooking the Ras Al Khor Wildlife Sanctuary, the project creates a peaceful escape within a vibrant urban core. Designed with sacred geometry and natural balance, the community is crafted for families seeking calm, wellness, and meaningful connection to place.\n\nPremium Amenities: Infinity Pool with Flamingo Views, Indoor & Outdoor Fitness + Yoga Studios, Outdoor Cinema & Clubhouse Lounge, BBQ Pods, Picnic Zones & Pet Wash Area, Kids\' Play Area + Daycare, Rooftop Observatory & Flamingo Lounge, Retail + Dining Pavilion on Site.\n\nPrime Location: MBR City, Dubai. Metro: Proposed Dubai Metro – 2 min. Airport: Dubai Intl – 9 km (≈9 min drive). Mall: Dubai Mall – 10 min. Nearby Landmark: Ras Al Khor Wildlife Sanctuary – 6 min.`,
  },
  {
    id: 15,
    name: 'Claydon House',
    location: 'MBR City, Dubai',
    price: 'Starting from $450,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/claydon1.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Rooftop Infinity Pool with City Views',
      'State-of-the-Art Fitness Center & Yoga Studio',
      'Cinema & Arcade Lounge',
    ],
    description: `1 - 4 Bedroom Waterfront Apartments | Starting from $450,000\nClaydon House offers 1 to 4-bedroom waterfront apartments thoughtfully designed for refined living in the heart of MBR City. Surrounded by nature and connected to urban life, the residences combine spacious layouts, premium finishes, and panoramic views of Ras Al Khor and Downtown Dubai. With rooftop pools, wellness zones, and modern interiors, Claydon House is a lifestyle crafted around comfort, design, and convenience.\n\nPremium Amenities: Rooftop Infinity Pool with City Views, State-of-the-Art Fitness Center & Yoga Studio, Cinema & Arcade Lounge, "Children's Play Zone & Daycare", Landscaped Gardens & Outdoor Seating, Lobby Lounge with Workstations, 24/7 Concierge & Secure Parking.\n\nPrime Location: MBR City, Dubai. Metro: Meydan Metro Line – 1 min. Airport: Dubai Intl – 17 km (≈17 min drive). Mall: Dubai Festival City Mall – 12 min. Nearby Landmark: Ras Al Khor Wildlife Sanctuary – 5 min.`,
  },
  {
    id: 16,
    name: 'Ellington Cove',
    location: 'Dubai Islands, Dubai',
    price: 'Starting from $300,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/cove2.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Private Beach with Water Sports Pavilion',
      'Beachfront Clubhouse with Sunset Terrace',
      'Yoga & Fitness Studio Overlooking the Sea',
    ],
    description: `Studio to 4 Bedroom Residences | Starting from $300,000\nEllington Cove offers studio to 4-bedroom residences along the pristine shores of Dubai Islands. With private beach access and a calm coastal aesthetic, the development merges contemporary architecture with nature-inspired design. From waterfall pools to a beach clubhouse, every space reflects a laid-back rhythm of beachfront living, perfect for those seeking serenity and connection.\n\nPremium Amenities: Private Beach with Water Sports Pavilion, Beachfront Clubhouse with Sunset Terrace, Yoga & Fitness Studio Overlooking the Sea, Leisure Pool, Lap Pool & Waterfall Feature, Barbecue Deck & Beach Gardens, Lobby Courtyard & Arrival Gardens, Dedicated Drop-Off & Concierge Zone.\n\nPrime Location: Dubai Islands, Dubai. Airport: Dubai Intl – 18 km (≈20 min drive). Mall: Deira City Centre – 15 min. Nearby Landmark: Dubai Beaches – 2 min.`,
  },
  {
    id: 17,
    name: 'Mercer House',
    location: 'JLT – Uptown Dubai',
    price: 'Starting from $350,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/mercer1.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Urban Beach Club with Skyline Views',
      'Multi-Sports Hall with Padel & Squash Courts',
      'Scenic Sauna & Ice Room',
    ],
    description: `Studio to 4 Bedroom Residences | Starting from $350,000\nMercer House presents studio to 4-bedroom residences, including penthouses, in one of JLT's most dynamic addresses. Designed for modern urban living, the twin towers combine skyline views, wellness spaces, and high-end leisure with city convenience. From family pools to a rooftop beach club, Mercer House offers an elevated lifestyle that blends play, relaxation, and sophistication.\n\nPremium Amenities: Urban Beach Club with Skyline Views, Multi-Sports Hall with Padel & Squash Courts, Scenic Sauna & Ice Room, Clubhouse Lounge & Arcade Zone, Rooftop & Family Pools, Fully Equipped Fitness & Wellness Center, Retail & F&B Spaces on Site.\n\nPrime Location: JLT – Uptown Dubai. Metro: DMCC Metro – 3 min. Airport: Dubai Intl – 30 min. Mall: Dubai Marina Mall – 10 min. Nearby Landmark: Palm Jumeirah – 15 min.`,
  },
  {
    id: 18,
    name: 'Ocean House',
    location: 'Palm Jumeirah, Dubai',
    price: 'Starting from $4,200,000',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954791/Ocean_House_by_Ellington_-_exterior_nq7nfn.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Direct Private Beach Access',
      'Olympic-Size Swimming Pool & Kids Pool',
      'Wellness Spa with Infrared Sauna & Salt Cave',
    ],
    description: `2 - 6 Bedroom Residences, Duplexes & Penthouses | Starting from $4,200,000\nOcean House offers 2 to 6-bedroom residences, duplexes, and penthouses on the prestigious Palm Jumeirah. Designed for those who seek a one-of-a-kind oceanside lifestyle, the development presents panoramic views of the Burj Al Arab, Marina Skyline, and Arabian Gulf. From wellness retreats to private club lounges, Ocean House blends privacy, luxury, and beachfront beauty in one iconic address.\n\nPremium Amenities: Direct Private Beach Access, Olympic-Size Swimming Pool & Kids Pool, Wellness Spa with Infrared Sauna & Salt Cave, Plunge Pool & Fitness Studio, Cinema Room & Games Room, Private Clubhouse with Dining Lounge.\n\nPrime Location: Palm Jumeirah, Dubai. Metro: Al Khail Metro Station – 10 min. Airport: Dubai Intl – 27 min. Mall: Nakheel Mall – 8 min. Nearby Landmark: Atlantis The Royal – 6 min.`,
  },
  {
    id: 19,
    name: 'One River Point',
    location: 'Business Bay, Dubai',
    price: 'Starting from $460,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/orp1.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Hotel-Style Drop-Off & Club Lounge',
      'Beach Club Pool with Sun Deck',
      'Immersive Room & Yoga Studio',
    ],
    description: `Luxury Residences | Starting from $460,000\nPositioned along the Dubai Canal with direct views of Burj Khalifa, One River Point presents luxury living in the heart of Business Bay. The project redefines modern elegance with a sculptural façade, curated amenities, and seamless urban connectivity. Designed for refined lifestyles, this tower is both a landmark and a sanctuary for city dwellers.\n\nPremium Amenities: Hotel-Style Drop-Off & Club Lounge, Beach Club Pool with Sun Deck, Immersive Room & Yoga Studio, Fitness Centre with Climbing Net, Boardwalk Access to Dubai Water Canal, Kids Play Zone & Adult Leisure Pool.\n\nPrime Location: Business Bay, Dubai. Metro: Business Bay Station – 5 min. Airport: Dubai Intl – 18 min. Mall: Dubai Mall – 7 min.`,
  },
  {
    id: 20,
    name: 'Playa Del Sol',
    location: 'Al Marjan Island, Ras Al Khaimah',
    price: 'Starting from $272,000',
    roi: '-',
    reelVideoUrl: '',
    image: '/images/properties/psd1.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Private Beachfront & Yacht Jetty',
      'Infinity Pool with Kids Splash Zone',
      'Fitness Studios (Indoor/Outdoor) & Squash Court',
    ],
    description: `Studios to 5 Bedroom Villas | Starting from $272,000\nPlaya Del Sol offers resort-inspired living on the serene shores of Al Marjan Island in Ras Al Khaimah. With studios to 5-bedroom villas, every residence is crafted for elegance, wellness, and panoramic sea views. From private yacht access to lush courtyards and a teens' lounge, it's a complete destination for families, second-home seekers, and investors alike.\n\nPremium Amenities: Private Beachfront & Yacht Jetty, Infinity Pool with Kids Splash Zone, Fitness Studios (Indoor/Outdoor) & Squash Court, Spa Rooms, Sauna & Hair Salon Lounge, Clubhouse, Teens Room & BBQ Deck, Secure Parking, Landscaped Courtyards.\n\nPrime Location: Al Marjan Island, Ras Al Khaimah. Airport: RAK Intl – 34 min. Mall: Al Hamra Mall – 12 min. Landmark: Wynn Resort – 5 min.`,
  },
  {
    id: 21,
    name: 'The Crestmark',
    location: 'Business Bay, Dubai',
    price: 'Starting from $475,000',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954741/The_Crestmark_-_balcony_view_mlhx9g.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Dubai Canal Boardwalk & Lounge Pool',
      'Zen Room & Wellness Studio',
      'Functional Training Zone',
    ],
    description: `Studios to Signature Penthouses | Starting from $475,000\nWith bold design and tranquil detail, The Crestmark offers 189 upscale residences in the heart of Business Bay. From studios to signature penthouses, each space blends greenery, light, and luxury for a balanced urban lifestyle. Direct canal access, serene lounges, and kinetic amenities make The Crestmark a standout for those seeking calm amid the city pulse.\n\nPremium Amenities: Dubai Canal Boardwalk & Lounge Pool, Zen Room & Wellness Studio, Functional Training Zone, Mini Bowling & Arcade Area, Kinetic Garden & Secret Club Room, Kidtropolis Play World.\n\nPrime Location: Business Bay, Dubai. Metro: Business Bay Station – 6 min. Airport: DXB – 20 min. Mall: Dubai Mall – 9 min. Landmark: Burj Khalifa – 7 min.`,
  },
  {
    id: 22,
    name: 'The Highgrove',
    location: 'MBR City, Dubai',
    price: 'Starting from $520,000',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954755/The_Highgrove_-_hero_shot_1_wgkw9p.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Infinity Lagoon Pool with Canopy',
      'Crystal Lagoon Access',
      'Sky-Dining & Viewing Deck',
    ],
    description: `1 to 3 Bedroom Apartments, Duplexes, Penthouse & Sky Villa | Starting from $520,000\nThe Highgrove by Ellington Properties redefines modern serenity, offering stylish 1 to 3-bedroom apartments, duplexes, a penthouse, and a sky villa. Nestled in the heart of MBR City and framed by a crystal lagoon, it's designed for those who seek both connection to nature and the sophistication of city life. Contemporary layouts, elegant finishes, and lush surroundings make it a haven for families and professionals alike.\n\nPremium Amenities: Infinity Lagoon Pool with Canopy, Crystal Lagoon Access, Sky-Dining & Viewing Deck, Indoor & Outdoor Fitness Studio, Clubhouse & Cinema Room, Kids Play Areas (Indoor & Outdoor).\n\nPrime Location: MBR City, Dubai. Metro: Meydan Line – 6 min. Airport: DXB – 15 min. Mall: Dubai Mall – 12 min. Landmark: Ras Al Khor Wildlife Sanctuary – 10 min.`,
  },
  {
    id: 23,
    name: 'The Sanctuary',
    location: 'MBR City, Dubai',
    price: 'Starting from $3,500,000',
    roi: '-',
    reelVideoUrl: '',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954196/santuary_w21rmh.jpg',
    beds: 0,
    baths: 0,
    sqft: 'N/A',
    rating: 0,
    amenities: [
      'Crystal Lagoon Access',
      'Private Garden with Pool & Sunken Seating',
      'Zen Courtyards & Rooftop Terrace',
    ],
    description: `Private Villa Community | Starting from $3,500,000\nThe Sanctuary by Ellington is a private villa community nestled beside the tranquil blue lagoon in MBR City. Featuring uninterrupted views of the Burj Khalifa and Downtown Dubai, this premium gated enclave offers exclusive villas with rooftop terraces, private lifts, and automated smart-home systems. Crafted for families who seek privacy without sacrificing access, The Sanctuary blends nature, luxury, and seamless connectivity into a rare lifestyle offering.\n\nPremium Amenities: Crystal Lagoon Access, Private Garden with Pool & Sunken Seating, Zen Courtyards & Rooftop Terrace, Home Automation in Every Villa, Water Activity Zone & Nature Playground, Premium Gated Community with Clubhouse.\n\nPrime Location: MBR City, Dubai. Metro: Meydan Line – 6 min. Airport: DXB – 15 min. Mall: Dubai Mall – 12 min. Landmark: Ras Al Khor Wildlife Sanctuary – 10 min.`,
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
  const [priceRange, setPriceRange] = useState([0, 6000000]);
  const [currentPage, setCurrentPage] = useState(1);
  const propertiesPerPage = 9;
  const videoRefs = useRef<{ [key: number]: HTMLVideoElement | null }>({});
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
      video.currentTime = 2; // Set video to start at 2 seconds
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

  // Sort so first 4 properties have a non-empty reelVideoUrl
  const videoProps = sortedProperties.filter(p => p.reelVideoUrl && p.reelVideoUrl.trim() !== '').slice(0, 4);
  const nonVideoProps = sortedProperties.filter(p => !p.reelVideoUrl || p.reelVideoUrl.trim() === '' || videoProps.includes(p) === false);
  const sortedForDisplay = [...videoProps, ...nonVideoProps];
  const totalPages = Math.ceil(sortedForDisplay.length / propertiesPerPage);
  const paginatedProperties = sortedForDisplay.slice(
    (currentPage - 1) * propertiesPerPage,
    currentPage * propertiesPerPage
  );

  return (
    <div className="bg-black text-white font-montserrat">
      <Header onEnquire={() => {}} />
      {/* Modals */}
      <EnquireForm
        open={showEnquireModal}
        onClose={() => { setShowEnquireModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handleEnquireSubmit}
      />
      <PayNowForm
        open={showPayNowModal}
        onClose={() => { setShowPayNowModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handlePayNowSubmit}
      />
      <CallForm
        open={showCallModal}
        onClose={() => { setShowCallModal(false); setActiveProperty(null); }}
        propertyName={activeProperty || undefined}
        onSubmit={handleCallSubmit}
      />
      
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
            <p className="text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Experience world class living and investment potential in Dubai’s most iconic and sought after addresses. Curated for discerning buyers, our portfolio blends architectural excellence with unmatched lifestyle value.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedProperties.map((property, index) => (
              <motion.div 
                key={property.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
                onMouseEnter={() => handleVideoPlay(property.id)}
                onMouseLeave={() => handleVideoPause(property.id)}
              >
                <div
                  className="w-full max-w-[99vw] sm:max-w-[520px] md:max-w-[460px] lg:max-w-[400px] bg-black rounded-2xl shadow-lg snap-start flex-shrink-0 overflow-hidden border border-neutral-800 cursor-pointer relative mx-auto h-[440px] md:h-[560px] lg:h-[640px]"
                  style={{ minHeight: '360px' }}
                  onClick={e => {
                    if ((e.target as HTMLElement).closest('button')) return;
                    const href = property.name === 'Pierside Marina Residences – Sobha Siniya Island'
                      ? '/property/pierside-marina-residences'
                      : `/property/${property.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;
                    window.location.href = href;
                  }}
                >
                  {/* Video/Image Background */}
                  <div className="w-full h-full relative">
                    {property.reelVideoUrl ? (
                      <video
                        ref={el => { videoRefs.current[property.id] = el; }}
                        src={property.reelVideoUrl}
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover absolute inset-0"
                        preload="auto"
                        style={{ zIndex: 1 }}
                      />
                    ) : (
                    <Image
                      src={property.image}
                      alt={property.name}
                        fill
                        className="w-full h-full object-cover absolute inset-0"
                      style={{ zIndex: 1 }}
                    />
                    )}
                    {/* Overlay - Shows on hover */}
                    <div 
                      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100"
                      style={{ height: '60%', zIndex: 2 }}
                    >
                      <div className="p-8 h-full flex flex-col justify-end">
                        <div className="mb-4">
                          <div className="text-white text-xl font-bold truncate mb-1">{property.name}</div>
                          <div className="text-purple-400 font-semibold text-lg whitespace-nowrap">{property.price}</div>
                        </div>
                        {property.amenities && property.amenities.length > 0 && (
                          <div className="text-white text-xs font-bold mb-4 grid grid-cols-1 gap-y-2">
                            {property.amenities.slice(0, 3).map((amenity, amenityIdx) => (
                              <div key={amenityIdx} className="flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-purple-400" />
                                <span className="font-bold text-white whitespace-nowrap">{amenity}</span>
                              </div>
                            ))}
                          </div>
                        )}
                        <div className="space-y-2 pt-2">
                          <button
                            type="button"
                            className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg text-sm"
                            onClick={e => { e.stopPropagation(); setShowPayNowModal(true); setActiveProperty(property.name); }}
                          >
                            Pay Now
                          </button>
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              type="button"
                              className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                              onClick={e => { e.stopPropagation(); setShowCallModal(true); setActiveProperty(property.name); }}
                            >
                              Call Expert
                            </button>
                            <button
                              type="button"
                              className="w-full bg-black text-white font-semibold py-2.5 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg text-xs"
                              onClick={e => { e.stopPropagation(); setShowEnquireModal(true); setActiveProperty(property.name); }}
                            >
                              Enquire Now
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === 1 ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105'}`}
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === i + 1 ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 ${currentPage === totalPages ? 'bg-gray-700 text-gray-400 cursor-not-allowed' : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105'}`}
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default PropertiesPage;