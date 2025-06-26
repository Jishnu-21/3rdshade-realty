"use client";

import React from "react";
import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaMapMarkerAlt, FaTrain, FaPlane, FaShoppingBag, FaCheckCircle, FaCalendarAlt, FaPhoneAlt, FaFileDownload, FaTimes, FaClock, FaFilm, FaFire, FaMountain, FaDog, FaTableTennis, FaCouch, FaTint, FaChild, FaHotTub, FaHeartbeat, FaBook, FaMusic, FaBriefcase, FaRoad, FaGamepad, FaStore, FaTheaterMasks, FaHotel, FaSchool, FaTree, FaLandmark, FaWater, FaGolfBall, FaMosque, FaWalking, FaLeaf, FaShip, FaGlassCheers, FaFeather, FaAppleAlt, FaWindowMaximize, FaDoorOpen, FaCogs, FaBed, FaRulerCombined, FaLayerGroup, FaBasketballBall, FaChess, FaUser, FaEnvelope } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { notFound } from 'next/navigation';

interface PropertyDetailsClientProps {
  slug: string;
}

// Array of all properties with a unique slug for each
const allProperties = [
    {
      slug: 'emaar-creek-harbour',
      name: 'Emaar Creek Harbour',
      description: 'Emaar Creek Harbour offers 1 to 3-bedroom apartments in a self-sustained waterfront district that spans across 550 hectares. With expansive parks, cultural spaces, world-class retail, and a projected population of over 200,000.',
      price: '1,500,000',
      roi: '12-15%',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749729573/emaar-creek_lk2lce.webm',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760822/emaar-creek3_vopplu.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760833/emaar-creek2_kttzqd.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760831/damac-villa3_y3zpva.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: '700,000 sq.m. of Parks & Green Spaces' },
        { icon: <FaCar />, name: 'Over 250,000 sq.m. of Retail & Dining' },
        { icon: <FaConciergeBell />, name: 'Cultural Hub with Museums & Exhibitions' },
        { icon: <FaDumbbell />, name: 'Cycling Tracks' },
        { icon: <FaShieldAlt />, name: 'Entertainment Arenas for Concerts & Theatre' },
        { icon: <FaSpa />, name: 'Waterfront Promenades' },
      ],
      location: {
        address: 'Emaar Creek Harbour, Dubai',
        city: 'Dubai Marina, UAE',
        points: [
          { icon: <FaTrain />, name: 'Creek Metro Station (Green Line)- approx. 2.8 km/5–10 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 15 min' },
          { icon: <FaShoppingBag />, name: 'Dubai Festival City Mall – ~3 km / 7 min drive' },
        ],
      },
      goldenVisa: true,
      relatedSlugs: ['deeyar-eleve', 'sobha-solis', 'azizi-venice', 'wasl-1-residences'],
    },
    {
      slug: 'deeyar-eleve',
      name: 'Deeyar Eleve',
      description: 'Deeyar Eleve offers 1 to 3-bedroom apartments in a lifestyle-focused development designed around comfort, convenience, and elevated living.',
      price: '1,000,000',
      roi: '10-12%',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750744127/deeyer-eleve_hmjj4n.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760853/Deeyar_Eleve_4_vcv6o6.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760849/Deeyar_Eleve_2_go8gtb.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760845/Deeyar_Eleve_1_xa3ka7.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Grand Lobby & Lounge' },
        { icon: <FaCar />, name: 'Resort-Style Swimming Pool' },
        { icon: <FaConciergeBell />, name: 'Concierge Service' },
        { icon: <FaDumbbell />, name: 'Kids Pool' },
        { icon: <FaShieldAlt />, name: 'Club Room' },
        { icon: <FaSpa />, name: 'Gym & Yoga Terrace' },
      ],
      location: {
        address: 'Deeyar Eleve, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'UAE Exchange Station - 5 min walk' },
          { icon: <FaPlane />, name: 'Airport: 20 min' },
          { icon: <FaShoppingBag />, name: 'DXB - 40 min drive DWC - 20 min drive' },
        ],
      },
      goldenVisa: true,
      relatedSlugs: ['emaar-creek-harbour', 'sobha-solis', 'azizi-venice', 'wasl-1-residences'],
    },
    {
      slug: 'sobha-solis',
      name: 'Sobha Solis',
      description: 'Sobha Solis offers 1 to 3-bedroom residences in a large-scale community setting with over 2,300 apartments. Designed for active, family-friendly living, the development integrates extensive indoor and outdoor amenities.',
      price: '1,000,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727749/sobha-solis2_c6nt2j.mp4',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760839/sobha3_xqltd6.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760835/sobha2_jvhxq7.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760828/sobha1_mfjw7n.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Lap Pool' },
        { icon: <FaSwimmer />, name: 'Kids Pool & Leisure Pool' },
        { icon: <FaSpa />, name: 'Common Parks & Lawns' },
        { icon: <FaDumbbell />, name: 'Gym & Fitness Zone' },
        { icon: <FaChild />, name: 'Indoor Kids Play Area' },
        { icon: <FaSpa />, name: 'Yoga & Meditation Studio' },
      ],
      location: {
        address: 'Sobha Solis, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Sobha Realty Metro Station – 19 km (≈17 min drive)' },
          { icon: <FaPlane />, name: 'Airport: Dubai International – 41 km (≈45 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: First Avenue Mall – 4.6 km (≈10 min)' },
          { icon: <FaCar />, name: 'Nearby Landmark: Dubai Autodrome – <1 min drive' },
        ],
      },
      goldenVisa: true,
      relatedSlugs: ['emaar-creek-harbour', 'deeyar-eleve', 'azizi-venice', 'wasl-1-residences'],
    },
    {
      slug: 'azizi-venice',
      name: 'Azizi Venice',
      description: 'Azizi Venice offers waterfront apartments with direct lagoon access and seamless indoor-outdoor views, redefining leisure-focused living in Dubai South.',
      price: 'Launching Soon',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727087/azizi-venice_gsscns.mp4',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760791/Azizi_Venice_1_csh6cy.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760793/Azizi_Venice_2_g4kzxi.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760795/Azizi_Venice_3_y0u6us.webp',
      ],
      amenities: [
        { icon: <FaStore />, name: 'Climate-Controlled Retail Boulevard' },
        { icon: <FaSwimmer />, name: 'Crystal Lagoon & Swimmable Beaches' },
        { icon: <FaTheaterMasks />, name: 'Opera House (1,500 seats)' },
        { icon: <FaHotel />, name: 'Five-Star Family & Lifestyle Hotels' },
      ],
      location: {
        address: 'Azizi Venice, Dubai South',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaPlane />, name: "7 MINS Al Maktoum Int'l Airport (DWC)" },
          { icon: <FaLandmark />, name: '10 MINS Dubai Parks and Resorts' },
          { icon: <FaWater />, name: '15 MINS The Palm Jebel Ali' },
          { icon: <FaMapMarkerAlt />, name: '20 MINS Dubai Marina' },
        ],
      },
      goldenVisa: true,
      relatedSlugs: ['emaar-creek-harbour', 'deeyar-eleve', 'sobha-solis', 'wasl-1-residences'],
    },
    {
      slug: 'wasl-1-residences',
      name: 'Wasl 1 Residences',
      description: 'Wasl 1 Residences presents 1 to 3 bedroom apartments in a prime location, designed for seamless city living with access to luxury amenities and lush green surroundings. The development combines modern comfort with recreational spaces, offering residents a peaceful yet connected lifestyle in the heart of Dubai.',
      price: '1,500,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760859/wasl3_xo1dqc.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760793/wasl1_gqojoi.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760857/wasl2_ylbm2z.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760856/wasl4_gkv7rf.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Swimming Pool' },
        { icon: <FaChild />, name: "Children's Pool & Kids' Play Area" },
        { icon: <FaFire />, name: 'BBQ Stations' },
        { icon: <FaDumbbell />, name: 'State-of-the-Art Gym' },
        { icon: <FaHotTub />, name: 'Sauna' },
        { icon: <FaTree />, name: 'Park & Green Spaces' },
        { icon: <FaCouch />, name: 'Lounge & Relaxation Areas' },
      ],
      location: {
        address: 'Wasl 1 Residences, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Max Fashion/Max Station – 1 min walk' },
          { icon: <FaPlane />, name: 'Airport: Dubai International – 15 min drive' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall/Burj Khalifa – 10 min drive BurJuman Mall – 5 min drive' },
          { icon: <FaLandmark />, name: "Nearby Landmark: Za'abeel Park – Adjacent" },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['emaar-creek-harbour', 'deeyar-eleve', 'sobha-solis', 'azizi-venice'],
    },
    {
      slug: 'emaar-south',
      name: 'Emaar South-Green Ridge',
      description: 'Greenridge at Emaar South features spacious 3 and 4-bedroom townhouses within a well-connected, green-focused community. Surrounded by a championship golf course, landscaped parks, and family-friendly amenities, this development blends suburban calm with smart city planning - ideal for those seeking space, privacy, and proximity to key conveniences.',
      price: '2,800,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760790/emaar-south4_x2dypb.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760797/emaar-south3_hq2hmi.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760800/emaar-south1_ty362p.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760798/emaar-south2_vpucjn.jpg',
      ],
      amenities: [
        { icon: <FaGolfBall />, name: 'Golf Course & Clubhouse' },
        { icon: <FaShoppingBag />, name: 'Retail & Shopping Zones' },
        { icon: <FaTree />, name: 'Community & District Parks' },
        { icon: <FaSchool />, name: 'Schools & Clinics' },
        { icon: <FaMosque />, name: 'Mosque & Nursery' },
      ],
      location: {
        address: 'Emaar South – Greenridge, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Expo 2020 Metro Station – approx. 17 min drive (bus connection via Route F55)' },
          { icon: <FaPlane />, name: 'Airport: Al Maktoum Intl – approx. 5 min drive' },
          { icon: <FaShoppingBag />, name: 'Mall: South Village Mall – on-site retail; Aiko Mall ≈20 min drive; Ibn Battuta Mall ≈27 min drive' },
          { icon: <FaGolfBall />, name: 'Nearby Landmark: Emaar South Golf Course & Love Lake' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['the-valley-avena', 'damac-islands', 'damac-islands-villas', 'azizi-venice'],
    },
    {
      slug: 'the-valley-avena',
      name: 'The Valley - Avena',
      description: `The Valley's Avena collection features 4-bedroom villas with expansive layouts and direct access to green, open landscapes. With a massive 250,000 sq.m. central park and a focus on sustainability, this community offers a quiet, family-oriented lifestyle framed by nature, modern infrastructure, and resort-inspired design.`,
      price: '4,370,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760807/valey3_icaox3.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760802/valey2_bnvsgt.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760804/valey1_hoegph.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760811/valey4_vinwrs.jpg',
      ],
      amenities: [
        { icon: <FaTree />, name: '250,000 sq.m. Central Park' },
        { icon: <FaSpa />, name: 'Resort-Style Green Areas' },
        { icon: <FaChild />, name: 'Family-Centric Community' },
        { icon: <FaWalking />, name: 'Walking & Cycling Paths' },
        { icon: <FaCouch />, name: 'Open Lawns & Playgrounds' },
        { icon: <FaLeaf />, name: 'Sustainable Living Environment' },
      ],
      location: {
        address: 'The Valley – Avena, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Expo 2020 Metro (Red Line) – ~25 min drive via Sheikh Zayed/Al Ain Rd' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – ~25 min drive; Al Maktoum Intl – ~35 min drive' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Outlet Mall – ~8 min drive' },
          { icon: <FaLandmark />, name: 'Nearby Landmark: The Sevens Rugby & Cricket Stadium – ~5 min drive' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['emaar-south', 'damac-islands', 'damac-islands-villas', 'azizi-venice'],
    },
    {
      slug: 'damac-islands',
      name: 'Damac Islands',
      description: `Damac Islands offers 4 and 5-bedroom townhouses with direct waterfront access, private beaches, and expansive terraces. Inspired by the world's most beautiful tropical islands.`,
      price: '2,400,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760818/damac1_uoxl27.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760815/damac2_usulqy.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760815/damac2_usulqy.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760809/damac3_zdxq5i.jpg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Private Beach Access' },
        { icon: <FaTheaterMasks />, name: 'Floating Wedding Venue' },
        { icon: <FaTint />, name: 'Aqua Dome & Aqua Park' },
        { icon: <FaSpa />, name: 'Lagoon Tours & Hammocks' },
      ],
      location: {
        address: 'Damac Islands, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Damac Metro Station (Red Line) – ~3.9 km (≈10 min drive)' },
          { icon: <FaPlane />, name: 'Airports: DXB – ~20 min drive; DWC – ~25 min drive' },
          { icon: <FaShoppingBag />, name: 'Malls: Dubai Mall & Mall of the Emirates – ~25 min drive each' },
          { icon: <FaLandmark />, name: 'Nearby Landmarks: Palm Jumeirah, Dubai Marina, Bluewaters Island – ~25 min drive' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['damac-islands-villas', 'emaar-south', 'the-valley-avena', 'azizi-venice'],
    },
    {
      slug: 'damac-islands-villas',
      name: 'Damac Islands – Villas',
      description: `This exclusive villa collection at Damac Islands features expansive 6 and 7-bedroom homes with basements, private gyms, and multiple terraces. Set across a tropical inspired island landscape, each residence offers direct beach access, smart automation, and luxury finishes - combining space, privacy, and lifestyle in one of Dubai's most unique waterfront destinations.`,
      price: '2,400,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760844/damac-villa_y9fddq.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760831/damac-villa3_y3zpva.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760819/damac-villa4_vkcj9m.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750760841/damac-villa2_dhqx1v.jpg',
      ],
      amenities: [
        { icon: <FaBed />, name: '6 to 7 Bedrooms' },
        { icon: <FaRulerCombined />, name: 'Up to 17,078 sq.ft. Built-Up Area' },
        { icon: <FaDumbbell />, name: "Private Gym & Maid's Room" },
        { icon: <FaLayerGroup />, name: 'Multiple Terraces & Basement Level' },
        { icon: <FaCogs />, name: 'Smart Home Automation' },
        { icon: <FaWindowMaximize />, name: 'Floor-to-Ceiling Sea View Windows' },
      ],
      location: {
        address: 'Damac Islands, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Damac Metro Station (Red Line) – approx. 10 min drive' },
          { icon: <FaPlane />, name: 'Airports: DXB – approx. 20 min, DWC – approx. 25 min' },
          { icon: <FaShoppingBag />, name: 'Malls: Dubai Marina Mall, Ibn Battuta Mall – 20–25 min drive' },
          { icon: <FaLandmark />, name: 'Nearby Landmarks: Palm Jumeirah, Bluewaters Island – ~25 min drive' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['damac-islands', 'emaar-south', 'the-valley-avena', 'azizi-venice'],
    },
    {
      slug: 'belgravia-gardens',
      name: 'Belgravia Gardens',
      description: 'Belgravia Gardens features studio to 3-bedroom apartments with optional office layouts, offering a flexible living experience in a refined residential community. With urban beach access, lagoon views, and a fully-equipped clubhouse, this development is designed for residents seeking lifestyle, leisure, and smart indoor-outdoor connectivity.',
      price: '1,200,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia4_coh1y6.jpg',
      images: [
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856356/belgravia3_liuq6o.jpg',
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia1_hmsnw9.jpg',
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia4_coh1y6.jpg',
      ],
      amenities: [
        { icon: <FaSpa />, name: 'Leisure & Wellness' },
        { icon: <FaWater />, name: 'Urban Beach & Artificial Lagoon' },
        { icon: <FaGlassCheers />, name: 'Private Dining & Juice Lounge' },
        { icon: <FaSpa />, name: 'Yoga & Pilates Studio' },
        { icon: <FaDumbbell />, name: 'Fitness Studio & Sauna' },
        { icon: <FaChild />, name: "Children's Pool & Kids' Play Area" },
        { icon: <FaHotel />, name: 'Clubhouse Pavilion' },
        { icon: <FaFilm />, name: 'Cinema Room' },
        { icon: <FaGamepad />, name: 'Game Room' },
        { icon: <FaStore />, name: 'Clubhouse Gallery' },
        { icon: <FaCouch />, name: 'Clubhouse Majlis' },
      ],
      location: {
        address: 'Belgravia Gardens, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Future station within 15 min' },
          { icon: <FaPlane />, name: 'Airport: 20 min to Dubai Intl' },
          { icon: <FaShoppingBag />, name: 'Mall: 5 min to Silicon Central, 10 min to Global Village' },
          { icon: <FaLandmark />, name: 'Nearby: IMG Worlds, Dubai Hills Mall, Downtown (20 min)' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: [],
    },
    {
      slug: 'sobha-orbis',
      name: 'Sobha Orbis',
      description: "Sobha Orbis introduces 1 to 3-bedroom apartments across a large, amenity-rich development with 2,900 units. Designed for social, active, and family-oriented living, the community features wellness spaces, resort-style pools, sports courts, and recreational zones. It's a complete environment with leisure, fitness, business, and retail integrated into everyday life.",
      price: '1,000,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856683/orbis_kinmqf.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856682/orbis3_cbcesd.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856683/orbis2_c7t3he.webp',
      ],
      amenities: [
        { icon: <FaCouch />, name: 'Clubhouse & Sports' },
        { icon: <FaTableTennis />, name: 'Badminton & Squash Courts' },
        { icon: <FaTableTennis />, name: 'Volleyball & Beach Volleyball' },
        { icon: <FaBasketballBall />, name: 'Basketball & Padel Tennis' },
        { icon: <FaGamepad />, name: 'Billiards & Indoor Games' },
        { icon: <FaChild />, name: "Kid's & Toddler Play Areas" },
        { icon: <FaDumbbell />, name: 'Community Gym & Studios' },
        { icon: <FaMusic />, name: 'Karaoke Room' },
        { icon: <FaCogs />, name: 'MPH Sports Hall' },
        { icon: <FaSpa />, name: 'Yoga & Meditation Zones' },
        { icon: <FaLeaf />, name: 'Zen Garden & Hammock Lawn' },
        { icon: <FaWalking />, name: 'Walking Paths & Landscaped Gardens' },
        
      ],
      location: {
        address: 'Sobha Orbis, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaPlane />, name: 'Airport: DXB – ≈30 min drive' },
          { icon: <FaShoppingBag />, name: 'Mall: First Avenue Mall – 0.7 km (5 min walk)' },
          { icon: <FaCar />, name: 'Nearby Landmark: Dubai Autodrome & Formula 1 circuit – on-site' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: [],
    },
  ];

export default function PropertyDetailsClient({ slug }: PropertyDetailsClientProps) {
  // Find the property by slug
  const propertyData = allProperties.find(p => p.slug === slug);
  if (!propertyData) {
    notFound();
  }

  // Provide safe defaults for possibly undefined fields
  const images = propertyData.images || [];
  const amenities = propertyData.amenities || [];
  const location = propertyData.location || { address: '', city: '', points: [] };
  const locationPoints = location.points || [];
  const relatedSlugs = propertyData.relatedSlugs || [];

  const [mainMedia, setMainMedia] = useState({ type: 'video', src: propertyData.reelVideoUrl });
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', address: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState({ name: '', date: '', time: '', timezone: '', country: '', email: '', phone: '' });
  const [showEnquireModal, setShowEnquireModal] = useState(false);
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
  const [amountWarning, setAmountWarning] = useState('');
  const BASE_RAZORPAY_AMOUNT_AED = 2000; // Always use 2,000 AED
  const [callFormSuccess, setCallFormSuccess] = useState('');
  const [callFormError, setCallFormError] = useState('');
  const [enquireFormSuccess, setEnquireFormSuccess] = useState('');
  const [enquireFormError, setEnquireFormError] = useState('');
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
  const [callFormLoading, setCallFormLoading] = useState(false);
  const [enquireFormLoading, setEnquireFormLoading] = useState(false);

  useEffect(() => {
    // No need to setSlug, just use slug directly
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePayNowSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setFormError('');
    setFormSuccess('');
    setAmountWarning('');
    try {
      // Always use AED 2,000 for payment
      const amountAed = BASE_RAZORPAY_AMOUNT_AED;
      const amountInFils = amountAed * 100;
      const res = await fetch('/api/razorpay/order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: amountInFils,
          name: form.name,
          email: form.email,
          phone: form.phone,
          address: form.address,
          property: propertyData.name,
          currency: 'AED',
        }),
      });
      const data = await res.json();
      if (!data.url) throw new Error(data.error || 'Failed to create payment link');
      // 2. Redirect to payment link
      window.location.href = data.url;
    } catch (error) {
      setFormError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCallInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setCallForm({ ...callForm, [e.target.name]: e.target.value });
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallFormSuccess('');
    setCallFormError('');
    setCallFormLoading(true);
    try {
      const res = await fetch('/api/send-service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'call',
          property: propertyData.name,
          ...callForm,
        }),
      });
      if (!res.ok) throw new Error('Failed to send. Please try again.');
      setCallFormSuccess('Your call booking was submitted successfully!');
      setTimeout(() => {
        setShowCallModal(false);
        setCallForm({ name: '', date: '', time: '', timezone: '', country: '', email: '', phone: '' });
        setCallFormSuccess('');
      }, 2000);
    } catch (err) {
      setCallFormError('There was an error submitting your request. Please try again.');
    } finally {
      setCallFormLoading(false);
    }
  };

  const handleEnquireInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      if (e.target instanceof HTMLInputElement) {
        setEnquireForm({ ...enquireForm, [name]: e.target.checked });
      }
    } else {
      setEnquireForm({ ...enquireForm, [name]: value });
    }
  };

  const handleEnquireNext = () => setEnquireStep(s => Math.min(s + 1, 2));
  const handleEnquireBack = () => setEnquireStep(s => Math.max(s - 1, 1));
  const handleEnquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquireFormSuccess('');
    setEnquireFormError('');
    setEnquireFormLoading(true);
    try {
      const res = await fetch('/api/send-service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'enquiry',
          property: propertyData.name,
          ...enquireForm,
        }),
      });
      if (!res.ok) throw new Error('Failed to send. Please try again.');
      setEnquireFormSuccess('Your enquiry was submitted successfully!');
      setTimeout(() => {
        setShowEnquireModal(false);
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
        setEnquireFormSuccess('');
      }, 2000);
    } catch (err) {
      setEnquireFormError('There was an error submitting your enquiry. Please try again.');
    } finally {
      setEnquireFormLoading(false);
    }
  };

  // Ensure Razorpay script is loaded
  useEffect(() => {
    if (typeof window !== 'undefined' && !(window as any).Razorpay) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <div className="bg-black text-white font-montserrat">
      <Header onEnquire={() => setShowEnquireModal(true)} />
      {/* Custom Login/Register Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl shadow-2xl p-0 w-full max-w-lg relative animate-fadeIn border border-purple-700/40">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110" onClick={() => setShowModal(false)}>
              <FaTimes size={22} />
            </button>
            <div className="flex flex-col items-center pt-8 pb-2 px-8">
              <Image src="/logos/logo.png" alt="3rdshade Logo" width={120} height={40} className="mb-2" />
              <h2 className="text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Secure Your Property</h2>
              <p className="text-gray-300 text-center mb-4 text-sm">Fill in your details to proceed with your interest in <span className="font-bold text-white">{propertyData.name}</span>.</p>
              <div className="w-full bg-gradient-to-r from-purple-700/60 to-pink-700/60 rounded-xl p-[2px] mb-6">
                <div className="bg-black/80 rounded-xl p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-400" />
                    <span className="text-white font-semibold text-base">{propertyData.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaMapMarkerAlt className="text-pink-400" />
                    {propertyData.location.address}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaShoppingBag className="text-pink-400" />
                    Starting from <span className="text-white font-bold ml-1">AED {propertyData.price}</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-8 pb-8">
              {formError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm">{formError}</div>
              )}
              {formSuccess && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm">{formSuccess}</div>
              )}
              {amountWarning && (
                <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-sm">{amountWarning}</div>
              )}
              <form onSubmit={handlePayNowSubmit} className="flex flex-col gap-5">
                <div className="relative">
                  <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    value={form.name}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone Number"
                    value={form.phone}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-lg" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full font-bold py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-lg tracking-wide ${
                    isLoading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    'Submit'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 w-full max-w-md relative animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110" onClick={() => setShowCallModal(false)}>
              <FaTimes size={20} />
            </button>
            <div className="flex flex-col items-center mb-4">
              <FaPhoneAlt className="text-3xl text-purple-400 mb-2" />
            </div>
            <h2 className="text-2xl font-bold mb-6 text-center">Book a Video Call Slot</h2>
            {callFormSuccess && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">{callFormSuccess}</div>}
            {callFormError && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{callFormError}</div>}
            <form onSubmit={handleCallSubmit} className="flex flex-col gap-4">
              <label className="text-sm text-gray-300">Your Name</label>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={callForm.name}
                onChange={handleCallInputChange}
                className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500"
                required
              />
              <label className="text-sm text-gray-300">Country</label>
              <select
                name="country"
                value={callForm.country}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCallInputChange(e)}
                className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500"
                required
              >
                <option value="">Select Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className="text-sm text-gray-300">Select Date</label>
              <input
                type="date"
                name="date"
                value={callForm.date}
                onChange={handleCallInputChange}
                className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer"
                required
              />
              <label className="text-sm text-gray-300">Select Time</label>
              <div className="flex gap-2">
                <input
                  type="time"
                  name="time"
                  value={callForm.time}
                  onChange={handleCallInputChange}
                  className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-1/2"
                  required
                />
                <select
                  name="timezone"
                  value={callForm.timezone}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => handleCallInputChange(e)}
                  className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-1/2"
                  required
                >
                  <option value="">Timezone</option>
                  {timezoneList.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                </select>
              </div>
              <label className="text-sm text-gray-300">Your Phone Number</label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone (with country code)"
                value={callForm.phone}
                onChange={handleCallInputChange}
                className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500"
                required
              />
              <label className="text-sm text-gray-300">Your Email</label>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={callForm.email}
                onChange={handleCallInputChange}
                className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500"
                required
              />
              <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" disabled={callFormLoading}>
                {callFormLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Book Video Call'
                )}
              </button>
            </form>
          </div>
        </div>
      )}
      {showEnquireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-neutral-900 rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
            <button className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110" onClick={() => { setShowEnquireModal(false); setEnquireStep(1); }}>
              <FaTimes size={20} />
            </button>
            <div className="flex flex-col items-center mb-4">
              <Image src="/logos/logo.png" alt="3rdshade Logo" width={120} height={40} className="mb-2" />
            </div>
            {enquireFormSuccess && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center">{enquireFormSuccess}</div>}
            {enquireFormError && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center">{enquireFormError}</div>}
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
                  <input type="text" name="name" placeholder="Name" value={enquireForm.name} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                  <input type="email" name="email" placeholder="Email" value={enquireForm.email} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                  <input type="tel" name="phone" placeholder="Phone (with country code)" value={enquireForm.phone} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500" required />
                  <label className="text-sm text-gray-300">Preferred contact method</label>
                  <div className="flex gap-3">
                    {['WhatsApp', 'Email', 'Phone'].map(method => (
                      <label key={method} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.contactMethod === method ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                        <input type="radio" name="contactMethod" value={method} checked={enquireForm.contactMethod === method} onChange={handleEnquireInputChange} className="hidden" />
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
                        <input type="radio" name="inIndia" value={val} checked={enquireForm.inIndia === val} onChange={handleEnquireInputChange} className="hidden" />
                        {val}
                      </label>
                    ))}
                  </div>
                  <label className="text-sm text-gray-300">Select the country</label>
                  <select name="country" value={enquireForm.country} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500">
                    <option value="">Select Country</option>
                    {countryList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <label className="text-sm text-gray-300">Type of visit</label>
                  <div className="flex gap-3">
                    {['Virtual', 'Physical'].map(type => (
                      <label key={type} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.visitType === type ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                        <input type="radio" name="visitType" value={type} checked={enquireForm.visitType === type} onChange={handleEnquireInputChange} className="hidden" />
                        {type}
                      </label>
                    ))}
                  </div>
                  <label className="text-sm text-gray-300">Preferred Date & Time</label>
                  <div className="flex gap-2">
                    <input type="date" name="date" value={enquireForm.date} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer" required />
                    <input type="time" name="time" value={enquireForm.time} onChange={handleEnquireInputChange} className="px-4 py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer" required />
                  </div>
                  <label className="text-sm text-gray-300">How soon are you looking to buy?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Immediately', '1–3 Months', '3–6 Months', 'Just Exploring'].map(opt => (
                      <label key={opt} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 ${enquireForm.buyTimeline === opt ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-800 text-gray-300 hover:bg-neutral-700'}`}>
                        <input type="radio" name="buyTimeline" value={opt} checked={enquireForm.buyTimeline === opt} onChange={handleEnquireInputChange} className="hidden" />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              {/* Step Navigation */}
              <div className="flex justify-between mt-2">
                {enquireStep > 1 ? (
                  <button type="button" onClick={handleEnquireBack} className="px-6 py-2 rounded-full bg-neutral-800 text-gray-300 font-semibold transition-all duration-200 cursor-pointer hover:bg-neutral-700 hover:scale-105">Back</button>
                ) : <div />}
                {enquireStep < 2 ? (
                  <button type="button" onClick={handleEnquireNext} className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg">Next</button>
                ) : (
                  <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" disabled={enquireFormLoading}>
                    {enquireFormLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        Submitting...
                      </div>
                    ) : (
                      'Submit'
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      )}
      <main className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12 pt-28">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column: Image/Video Gallery */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="relative w-full h-[635px] rounded-xl overflow-hidden mb-4 bg-black">
              {(() => {
                const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(mainMedia.src);
                if (mainMedia.type === 'video' && !isImage) {
                  return (
                    <video src={mainMedia.src} className="w-full h-full object-contain bg-black" autoPlay loop muted playsInline />
                  );
                } else {
                  return (
                    <Image src={mainMedia.src} alt="Property Image" fill className="object-cover" />
                  );
                }
              })()}
            </div>
            <div className="grid grid-cols-4 gap-3">
              {/* Video Thumbnail */}
              <div 
                className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 bg-black ${
                  mainMedia.type === 'video' && mainMedia.src === propertyData.reelVideoUrl 
                    ? 'border-purple-500' 
                    : 'border-transparent'
                }`} 
                onClick={() => setMainMedia({ type: 'video', src: propertyData.reelVideoUrl })}
              >
                <video src={propertyData.reelVideoUrl} className="w-full h-full object-contain bg-black" muted />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <div className="w-6 h-6 bg-white/80 rounded-full flex items-center justify-center">
                    <div className="w-0 h-0 border-l-[6px] border-l-black border-y-[4px] border-y-transparent ml-0.5"></div>
                  </div>
                </div>
              </div>
              {/* Image Thumbnails */}
              {images.map((img: string, idx: number) => (
                <div 
                  key={idx} 
                  className={`relative h-20 rounded-lg overflow-hidden cursor-pointer border-2 ${
                    mainMedia.type === 'image' && mainMedia.src === img 
                      ? 'border-purple-500' 
                      : 'border-transparent'
                  }`} 
                  onClick={() => setMainMedia({ type: 'image', src: img })}
                >
                  {img && (
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-cover" />
                  )}
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
                    <div className="text-2xl font-bold text-white">AED {propertyData.price}</div>
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
              {amenities.filter(Boolean).map((item: { icon: React.ReactNode; name: string }) => (
                <div key={item.name} className="flex items-center gap-2 text-gray-300">
                  <span className="text-purple-400 text-xs">{item.icon}</span>
                  <span className="text-xs">{item.name}</span>
                </div>
              ))}
            </div>

            {/* Prime Location */}
            <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-600 to-pink-500">
              <div className="bg-black rounded-xl p-4">
                <h2 className="text-lg font-bold text-white mb-3">Prime Location</h2>
                <div className="flex items-start gap-2 mb-3">
                  <FaMapMarkerAlt className="text-purple-400 mt-1 text-sm" />
                  <div>
                    <div className="font-semibold text-white text-sm">{location.address}</div>
                    <div className="text-xs text-gray-400">{location.city}</div>
                  </div>
                </div>
                <div className="flex justify-around text-xs">
                  {locationPoints.filter(Boolean).map((pt: { icon: React.ReactNode; name: string }) => (
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
              <button
                className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg"
                onClick={() => setShowModal(true)}
              >
                <FaCalendarAlt /> Pay Now
              </button>
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-purple-600 to-pink-500">
                  <button className="w-full bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg"
                    onClick={() => setShowCallModal(true)}
                  >
                    <FaPhoneAlt /> Call Expert
                  </button>
                </div>
                <div className="rounded-xl p-[1px] bg-gradient-to-r from-purple-600 to-pink-500">
                  <button className="w-full bg-black text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer hover:bg-neutral-900 hover:scale-105 hover:shadow-lg"
                    onClick={() => setShowEnquireModal(true)}
                  >
                    Enquire Now
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Properties */}
        <div className="mt-8 lg:mt-2">
          <h2 className="text-3xl font-bold mb-8">Related Properties</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedSlugs.map((slug: string) => {
              const relProp = allProperties.find((p: any) => p.slug === slug);
              if (!relProp) return null;
              return (
                <a key={relProp.slug} href={`/property/${relProp.slug}`} className="rounded-lg overflow-hidden block group">
                  <div className="relative h-64">
                    {relProp.images && relProp.images[0] && (
                      <Image src={relProp.images[0]} alt={relProp.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                    )}
                  </div>
                  <div className="p-4 bg-neutral-900">
                    <h3 className="font-bold group-hover:text-purple-400 transition-colors duration-200">{relProp.name}</h3>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 