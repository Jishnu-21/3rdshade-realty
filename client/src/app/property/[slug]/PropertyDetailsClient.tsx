"use client";

import React from "react";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { FaSwimmer, FaCar, FaConciergeBell, FaDumbbell, FaShieldAlt, FaSpa, FaMapMarkerAlt, FaTrain, FaPlane, FaShoppingBag, FaCheckCircle, FaCalendarAlt, FaPhoneAlt, FaFileDownload, FaTimes, FaClock, FaFilm, FaFire, FaMountain, FaDog, FaTableTennis, FaCouch, FaTint, FaChild, FaHotTub, FaHeartbeat, FaBook, FaMusic, FaBriefcase, FaRoad, FaGamepad, FaStore, FaTheaterMasks, FaHotel, FaSchool, FaTree, FaLandmark, FaWater, FaGolfBall, FaMosque, FaWalking, FaLeaf, FaShip, FaGlassCheers, FaFeather, FaAppleAlt, FaWindowMaximize, FaDoorOpen, FaCogs, FaBed, FaRulerCombined, FaLayerGroup, FaBasketballBall, FaChess, FaUser, FaEnvelope, FaParking } from 'react-icons/fa';
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
      goldenVisa: false,
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
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958272/Exterior-scaled_omygee.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958268/Pool-scaled_ngcwan.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958268/Eleve_02Living-Dining_006-min-scaled_b60opc.jpg',
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
      goldenVisa: false,
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
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958703/sobhasolis3_zxecuh.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958543/sobhasolis_hqajtt.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958703/sobhasolis2_g7kbxt.webp',
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
      goldenVisa: false,
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
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938711/azizi3_hyudc7.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938712/azizi4_d3cmug.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938711/azizi1_wtf7m6.webp',
      ],
      amenities: [
        { icon: <FaStore />, name: 'Climate-Controlled Retail Boulevard' },
        { icon: <FaSwimmer />, name: 'Crystal Lagoon & Swimmable Beaches' },
        { icon: <FaTheaterMasks />, name: 'Opera House (1,500 seats)' },
        { icon: <FaHotel />, name: 'Five-Star Family & Lifestyle Hotels' },
        { icon: <FaSchool />, name: 'Schools & Clinics' },
        { icon: <FaMosque />, name: 'Mosque & Nursery' },
        { icon: <FaTree />, name: 'Park & Green Spaces' },
        { icon: <FaCouch />, name: 'Lounge & Relaxation Areas' },
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
      goldenVisa: false,
      relatedSlugs: ['emaar-creek-harbour', 'deeyar-eleve', 'sobha-solis', 'wasl-1-residences'],
    },
    {
      slug: 'wasl-1-residences',
      name: 'Wasl 1 Residences',
      description: 'Wasl 1 Residences presents 1 to 3 bedroom apartments in a prime location, designed for seamless city living with access to luxury amenities and lush green surroundings. The development combines modern comfort with recreational spaces, offering residents a peaceful yet connected lifestyle in the heart of Dubai.',
      price: '1,500,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750944977/wasl_ssorua.webp',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750944977/wasl2_htj8vz.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750944976/wasl1_qfqnhh.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750944976/wasl3_kchou4.webp',
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
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954173/emaar-south5_unimlb.jpg',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954172/emaar-south1_utocb5.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954176/emaar-south2_gevmgc.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954175/emaar-south4_nlhy6y.jpg',
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
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954189/avena1_z9mxhm.webp',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954181/avena2_tbbskh.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954182/avena4_q8ntqy.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954183/avena3_ymlrxs.webp',
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
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958213/675042e75752cda845284754_DAMAC_ISLANDS_Digital_Brochure_EN_TRIMMED_241118_173247.pdf_cv28rc.webp',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958213/DAMAC_Islands-Gallery-03_ft4mtg.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958213/676897089-gallery-21_dshyai.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750958213/DAMAC_Islands-Homepage_Hero_16x9_gzoklx.jpg',
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
      description: 'Belgravia Gardens features studio to 3-bedroom apartments with optional office layouts, offering a flexible living experience in a refined residential community. With urban beach access, lagoon views, and a fully-equipped clubhouse, this development is designed for residents seeking lifestyle.',
      price: '1,200,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954174/belgravia-garden_rbcaj8.jpg',
      images: [
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856356/belgravia3_liuq6o.jpg',
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750856353/belgravia1_hmsnw9.jpg',
       'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954180/belgravia-garden2_meloqa.jpg',
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
      relatedSlugs: ['sobha-orbis', 'pierside-marina-residences', 'timez-by-danube', 'belgrove-residences'],
    },
    {
      slug: 'sobha-orbis',
      name: 'Sobha Orbis',
      description: "Sobha Orbis introduces 1 to 3-bedroom apartments across a large, amenity-rich development with 2,900 units. Designed for social, active, and family-oriented living, the community features wellness spaces, resort-style pools, sports courts, and recreational zones. It's a complete environment with leisure.",
      price: '1,000,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/video/upload/v1749727071/sobha-hartland_qo4rxf.mp4',
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938518/sobha2_a5ajh9.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938518/sobha3_tc7b30.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750938518/sobha4_z9rtqw.webp',
      ],
      amenities: [
        { icon: <FaCouch />, name: 'Clubhouse & Sports' },
        { icon: <FaTableTennis />, name: 'Badminton & Squash Courts' },
        { icon: <FaGamepad />, name: 'Billiards & Indoor Games' },
        { icon: <FaChild />, name: "Kid's & Toddler Play Areas" },
        { icon: <FaDumbbell />, name: 'Community Gym & Studios' },
        
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
      relatedSlugs: ['ellington-cove', 'sobha-solis', 'ocean-house', 'one-river-point'],
    },
    {
      slug: 'pierside-marina-residences',
      name: 'Pierside Marina Residences – Sobha Siniya Island',
      description: `Pierside Marina Residences offers 1 to 3-bedroom luxury apartments set on an exclusive island destination by Sobha Realty. Designed for those who seek privacy, views, and a curated lifestyle, the development combines yacht-side living with resort-class wellness, retail, and leisure experiences.`,
      price: '1,000,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/pierside2_qhivsz.webp', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954168/pierside3_pfbnzz.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/pierside4_gg4wbz.webp',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750957827/Pierside-Marina-homes-for-sal_i4gvyk.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Infinity Marina Pool with Seaview Deck' },
        { icon: <FaShip />, name: 'Private Yacht Mooring & Marina Club' },
        { icon: <FaCogs />, name: 'Smart-Home Ready Furnished Residences' },
        { icon: <FaGolfBall />, name: 'Golf Course with Waterfront Views' },
        { icon: <FaStore />, name: 'Luxury Retail & Fine Dining Promenade' },
        { icon: <FaSpa />, name: 'Wellness Spa, Gym & Yoga Deck' },
        { icon: <FaFilm />, name: 'Open-Air Cinema & Cultural Lawn' },
      ],
      location: {
        address: 'Sobha Siniya Island, UAE',
        city: 'UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Ras Al Khaimah Bus Terminal – 16 km (≈20 min drive)' },
          { icon: <FaPlane />, name: 'Airport: Dubai International – 80 km (≈50 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: Marina Residences Mall – Onsite' },
          { icon: <FaShip />, name: 'Nearby Landmark: Private Yacht Club – Walking Distance' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['belgravia-gardens', 'sobha-orbis', 'timez-by-danube', 'belgrove-residences'],
    },
    {
      slug: 'timez-by-danube',
      name: 'Timez by Danube – Dubai Silicon Oasis',
      description: `Timez by Danube offers studio to 2-bedroom convertible apartments in the heart of Dubai Silicon Oasis. With smart layouts that adapt as you grow—like studios that transform into 1BHKs—this project blends flexibility with upscale living. From private pools in select homes to 40+ curated amenities, it's an ideal choice for end-users and investors seeking affordable luxury with high ROI potential.`,
      price: '200,000',
      roi: 'High (Expected)',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/timez4_zg1v01.jpg', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954168/timez1_lbbzmg.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954167/timez3_p08h5d.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954171/timez2_xnn2eb.jpg',
      ],
      amenities: [
        { icon: <FaCogs />, name: 'Convertible Studio & 1BHK Units' },
        { icon: <FaSwimmer />, name: 'Infinity Pool with Jacuzzi & Aquatic Gym' },
        { icon: <FaLeaf />, name: 'Japanese Garden & Open-Air Cinema' },
        { icon: <FaTableTennis />, name: 'Paddle Court, Cricket Pitch & Mini Golf' },
        { icon: <FaChild />, name: "Kids' Oasis, Splash Pad & Trampoline Zone" },
        { icon: <FaGlassCheers />, name: 'Indoor Party Lounge & BBQ Area' },
        { icon: <FaDumbbell />, name: 'Outdoor Gym, Zumba Ring & Yoga Deck' },
      ],
      location: {
        address: 'Dubai Silicon Oasis, UAE',
        city: 'UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Proposed Station – 3 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 14 km (≈14 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: Silicon Central Mall – 2 min' },
          { icon: <FaLandmark />, name: 'Nearby Landmark: Global Village – 7 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['belgravia-gardens', 'sobha-orbis', 'pierside-marina-residences', 'belgrove-residences'],
    },
    {
      slug: 'belgrove-residences',
      name: 'Belgrove Residences – Mohammed Bin Rashid City (MBR City)',
      description: `Belgrove Residences offers 1 to 3-bedroom apartments that blend architectural precision with the serenity of nature. Set in MBR City and overlooking the Ras Al Khor Wildlife Sanctuary, the project creates a peaceful escape within a vibrant urban core. Designed with sacred geometry and natural balance.`,
      price: '350,000',
      roi: '-',
      reelVideoUrl: '/images/properties/belgrove4.jpg', // Placeholder video
      images: [
        '/images/properties/belgrove1.jpg',
        '/images/properties/belgrove2.jpg',
        '/images/properties/belgrove3.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Infinity Pool with Flamingo Views' },
        { icon: <FaDumbbell />, name: 'Indoor & Outdoor Fitness + Yoga Studios' },
        { icon: <FaFilm />, name: 'Outdoor Cinema & Clubhouse Lounge' },
        { icon: <FaGlassCheers />, name: 'BBQ Pods, Picnic Zones & Pet Wash Area' },
        { icon: <FaChild />, name: 'Kids\' Play Area + Daycare' },
        { icon: <FaMountain />, name: 'Rooftop Observatory & Flamingo Lounge' },
        { icon: <FaStore />, name: 'Retail + Dining Pavilion on Site' },
      ],
      location: {
        address: 'MBR City, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Proposed Dubai Metro – 2 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 9 km (≈9 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall – 10 min' },
          { icon: <FaFeather />, name: 'Nearby Landmark: Ras Al Khor Wildlife Sanctuary – 6 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['belgravia-gardens', 'pierside-marina-residences', 'timez-by-danube', 'claydon-house'],
    },
    {
      slug: 'claydon-house',
      name: 'Claydon House – Mohammed Bin Rashid City (MBR City)',
      description: `Claydon House offers 1 to 4-bedroom waterfront apartments thoughtfully designed for refined living in the heart of MBR City. Surrounded by nature and connected to urban life, the residences combine spacious layouts, premium finishes, and panoramic views of Ras Al Khor and Downtown Dubai.`,
      price: '450,000',
      roi: '-',
      reelVideoUrl: '/images/properties/claydon1.jpg', // Placeholder video
      images: [
        '/images/properties/claydon2.jpg',
        '/images/properties/claydon4.jpg',
        '/images/properties/claydon3.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Rooftop Infinity Pool with City Views' },
        { icon: <FaDumbbell />, name: 'State-of-the-Art Fitness Center & Yoga Studio' },
        { icon: <FaFilm />, name: 'Cinema & Arcade Lounge' },
        { icon: <FaChild />, name: "Children's Play Zone & Daycare" },
        { icon: <FaTree />, name: 'Landscaped Gardens & Outdoor Seating' },
        { icon: <FaCouch />, name: 'Lobby Lounge with Workstations' },
      ],
      location: {
        address: 'MBR City, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Meydan Metro Line – 1 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 17 km (≈17 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Festival City Mall – 12 min' },
          { icon: <FaFeather />, name: 'Nearby Landmark: Ras Al Khor Wildlife Sanctuary – 5 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['ellington-cove', 'mercer-house', 'ocean-house', 'one-river-point'],
    },
    {
      slug: 'ellington-cove',
      name: 'Ellington Cove – Dubai Islands',
      description: `Ellington Cove offers studio to 4-bedroom residences along the pristine shores of Dubai Islands. With private beach access and a calm coastal aesthetic, the development merges contemporary architecture with nature-inspired design. From waterfall pools to a beach clubhouse, every space reflects a laid-back rhythm of beachfront living, perfect for those seeking serenity and connection.`,
      price: '300,000',
      roi: '-',
      reelVideoUrl: '/images/properties/cove2.jpg', // Placeholder video
      images: [
        '/images/properties/cove1.jpg',
        '/images/properties/cove3.jpg',
        '/images/properties/cove4.jpg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Private Beach with Water Sports Pavilion' },
        { icon: <FaStore />, name: 'Beachfront Clubhouse with Sunset Terrace' },
        { icon: <FaSpa />, name: 'Yoga & Fitness Studio Overlooking the Sea' },
        { icon: <FaSwimmer />, name: 'Leisure Pool, Lap Pool & Waterfall Feature' },
        { icon: <FaGlassCheers />, name: 'Barbecue Deck & Beach Gardens' },
        { icon: <FaCouch />, name: 'Lobby Courtyard & Arrival Gardens' },
        { icon: <FaConciergeBell />, name: 'Dedicated Drop-Off & Concierge Zone' },
      ],
      location: {
        address: 'Dubai Islands, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 18 km (≈20 min drive)' },
          { icon: <FaShoppingBag />, name: 'Mall: Deira City Centre – 15 min' },
          { icon: <FaWater />, name: 'Nearby Landmark: Dubai Beaches – 2 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['claydon-house', 'mercer-house', 'ocean-house', 'one-river-point'],
    },
    {
      slug: 'mercer-house',
      name: 'Mercer House – Jumeirah Lakes Towers (JLT)',
      description: `Mercer House presents studio to 4-bedroom residences, including penthouses, in one of JLT's most dynamic addresses. Designed for modern urban living, the twin towers combine skyline views, wellness spaces, and high-end leisure with city convenience. From family pools to a rooftop beach club`,
      price: '350,000',
      roi: '-',
      reelVideoUrl: '/images/properties/mercer1.jpg', // Placeholder video
      images: [
        '/images/properties/mercer2.jpg',
        '/images/properties/mercer3.jpg',
        '/images/properties/mercer4.jpg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Urban Beach Club with Skyline Views' },
        { icon: <FaTableTennis />, name: 'Multi-Sports Hall with Padel & Squash Courts' },
        { icon: <FaSpa />, name: 'Scenic Sauna & Ice Room' },
        { icon: <FaCouch />, name: 'Clubhouse Lounge & Arcade Zone' },
        { icon: <FaSwimmer />, name: 'Rooftop & Family Pools' },
        { icon: <FaDumbbell />, name: 'Fully Equipped Fitness & Wellness Center' },
        { icon: <FaStore />, name: 'Retail & F&B Spaces on Site' },
      ],
      location: {
        address: 'JLT – Uptown Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: DMCC Metro – 3 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 30 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Marina Mall – 10 min' },
          { icon: <FaLandmark />, name: 'Nearby Landmark: Palm Jumeirah – 15 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['claydon-house', 'ellington-cove', 'ocean-house', 'one-river-point'],
    },
    {
      slug: 'ocean-house',
      name: 'Ocean House – Palm Jumeirah',
      description: `Ocean House offers 2 to 6-bedroom residences, duplexes, and penthouses on the prestigious Palm Jumeirah. Designed for those who seek a one-of-a-kind oceanside lifestyle, the development presents panoramic views of the Burj Al Arab, Marina Skyline, and Arabian Gulf. From wellness retreats to private club lounges, Ocean House blends privacy, luxury, and beachfront beauty in one iconic address.`,
      price: '4,200,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954791/Ocean_House_by_Ellington_-_exterior_nq7nfn.jpg', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954755/Ocean_House_by_Ellington_-_Balcony_view_fbjxnv.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954780/Ocean_House_by_Ellington_-_corner_unit_living_room_bwf3e0.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954758/Ocean_House_by_Ellington_-_penthouse_bedroom_vhe1g5.jpg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Direct Private Beach Access' },
        { icon: <FaSwimmer />, name: 'Olympic-Size Swimming Pool & Kids Pool' },
        { icon: <FaSpa />, name: 'Wellness Spa with Infrared Sauna & Salt Cave' },
        { icon: <FaTint />, name: 'Plunge Pool & Fitness Studio' },
        { icon: <FaFilm />, name: 'Cinema Room & Games Room' },
        { icon: <FaCouch />, name: 'Private Clubhouse with Dining Lounge' },
      ],
      location: {
        address: 'Palm Jumeirah, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Al Khail Metro Station – 10 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 27 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Nakheel Mall – 8 min' },
          { icon: <FaLandmark />, name: 'Nearby Landmark: Atlantis The Royal – 6 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['claydon-house', 'ellington-cove', 'mercer-house', 'one-river-point'],
    },
    {
      slug: 'one-river-point',
      name: 'One River Point – Business Bay',
      description: `Positioned along the Dubai Canal with direct views of Burj Khalifa, One River Point presents luxury living in the heart of Business Bay. The project redefines modern elegance with a sculptural façade, curated amenities, and seamless urban connectivity. Designed for refined lifestyles, this tower is both a landmark and a sanctuary for city dwellers.`,
      price: '460,000',
      roi: '-',
      reelVideoUrl: '/images/properties/orp1.jpg',// Placeholder video
      images: [
        '/images/properties/orp2.jpg',
        '/images/properties/orp3.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954755/One_River_Point_Aerial_View_rzeu25.jpg',
      ],
      amenities: [
        { icon: <FaConciergeBell />, name: 'Hotel-Style Drop-Off & Club Lounge' },
        { icon: <FaSwimmer />, name: 'Beach Club Pool with Sun Deck' },
        { icon: <FaFilm />, name: 'Immersive Room & Yoga Studio' },
        { icon: <FaDumbbell />, name: 'Fitness Centre with Climbing Net' },
        { icon: <FaWalking />, name: 'Boardwalk Access to Dubai Water Canal' },
        { icon: <FaChild />, name: 'Kids Play Zone & Adult Leisure Pool' },
        { icon: <FaCouch />, name: 'Clubhouse, Teens Room & BBQ Deck' },
        { icon: <FaParking />, name: 'Secure Parking, Landscaped Courtyards' },

      ],
      location: {
        address: 'Business Bay, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Business Bay Station – 5 min' },
          { icon: <FaPlane />, name: 'Airport: Dubai Intl – 18 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall – 7 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['claydon-house', 'mercer-house', 'ocean-house', 'playa-del-sol'],
    },
    {
      slug: 'playa-del-sol',
      name: 'Playa Del Sol – Al Marjan Island',
      description: `Playa Del Sol offers resort-inspired living on the serene shores of Al Marjan Island in Ras Al Khaimah. With studios to 5-bedroom villas, every residence is crafted for elegance, wellness, and panoramic sea views. From private yacht access to lush courtyards and a teens' lounge, it's a complete destination for families, second-home seekers, and investors alike.`,
      price: '272,000',
      roi: '-',
      reelVideoUrl: '/images/properties/psd1.jpg',
      images: [
        '/images/properties/psd2.jpg',
        '/images/properties/psd3.jpg',
        '/images/properties/psd4.jpeg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Private Beachfront & Yacht Jetty' },
        { icon: <FaSwimmer />, name: 'Infinity Pool with Kids Splash Zone' },
        { icon: <FaDumbbell />, name: 'Fitness Studios (Indoor/Outdoor) & Squash Court' },
        { icon: <FaSpa />, name: 'Spa Rooms, Sauna & Hair Salon Lounge' },
        { icon: <FaCouch />, name: 'Clubhouse, Teens Room & BBQ Deck' },
        { icon: <FaParking />, name: 'Secure Parking, Landscaped Courtyards' },
        { icon: <FaLeaf />, name: 'Kinetic Garden & Secret Club Room' },

      ],
      location: {
        address: 'Al Marjan Island, Ras Al Khaimah',
        city: 'Ras Al Khaimah, UAE',
        points: [
          { icon: <FaPlane />, name: 'Airport: RAK Intl – 34 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Al Hamra Mall – 12 min' },
          { icon: <FaLandmark />, name: 'Landmark: Wynn Resort – 5 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['the-crestmark', 'the-highgrove', 'the-sanctuary', 'ocean-house'],
    },
    {
      slug: 'the-crestmark',
      name: 'The Crestmark – Business Bay',
      description: `With bold design and tranquil detail, The Crestmark offers 189 upscale residences in the heart of Business Bay. From studios to signature penthouses, each space blends greenery, light, and luxury for a balanced urban lifestyle. Direct canal access, serene lounges, and kinetic amenities make The Crestmark a standout for those seeking calm amid the city pulse.`,
      price: '475,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954741/The_Crestmark_-_balcony_view_mlhx9g.jpg', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954758/The_Crestmark_-_library_lounge_xcygh9.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954741/The_Crestmark_-_balcony_view_mlhx9g.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954741/The_Crestmark_-_Kidtropolis_i5cjha.jpg',
      ],
      amenities: [
        { icon: <FaWalking />, name: 'Dubai Canal Boardwalk & Lounge Pool' },
        { icon: <FaSpa />, name: 'Zen Room & Wellness Studio' },
        { icon: <FaDumbbell />, name: 'Functional Training Zone' },
        { icon: <FaGamepad />, name: 'Mini Bowling & Arcade Area' },
        { icon: <FaLeaf />, name: 'Kinetic Garden & Secret Club Room' },
        { icon: <FaChild />, name: 'Kidtropolis Play World' },
      ],
      location: {
        address: 'Business Bay, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Business Bay Station – 6 min' },
          { icon: <FaPlane />, name: 'Airport: DXB – 20 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall – 9 min' },
          { icon: <FaLandmark />, name: 'Landmark: Burj Khalifa – 7 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['playa-del-sol', 'the-highgrove', 'the-sanctuary', 'ocean-house'],
    },
    {
      slug: 'the-highgrove',
      name: 'The Highgrove - MBR City',
      description: `The Highgrove by Ellington Properties redefines modern serenity, offering stylish 1 to 3-bedroom apartments, duplexes, a penthouse, and a sky villa. Nestled in the heart of MBR City and framed by a crystal lagoon, it's designed for those who seek both connection to nature and the sophistication of city life. Contemporary layouts, elegant finishes, and lush surroundings make it a haven for families and professionals alike.`,
      price: '520,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954755/The_Highgrove_-_hero_shot_1_wgkw9p.jpg', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954743/The_Highgrove_-_duplex_apartment_wtd5fb.jpg',
        '/images/properties/highgrove2.jpg',
        '/images/properties/highgrove1.jpg',
      ],
      amenities: [
        { icon: <FaSwimmer />, name: 'Infinity Lagoon Pool with Canopy' },
        { icon: <FaWater />, name: 'Crystal Lagoon Access' },
        { icon: <FaGlassCheers />, name: 'Sky-Dining & Viewing Deck' },
        { icon: <FaDumbbell />, name: 'Indoor & Outdoor Fitness Studio' },
        { icon: <FaCouch />, name: 'Clubhouse & Cinema Room' },
        { icon: <FaChild />, name: 'Kids Play Areas (Indoor & Outdoor)' },
      ],
      location: {
        address: 'MBR City, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Meydan Line – 6 min' },
          { icon: <FaPlane />, name: 'Airport: DXB – 15 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall – 12 min' },
          { icon: <FaLandmark />, name: 'Landmark: Ras Al Khor Wildlife Sanctuary – 10 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['playa-del-sol', 'the-crestmark', 'the-sanctuary', 'ocean-house'],
    },
    {
      slug: 'the-sanctuary',
      name: 'The Sanctuary – MBR City',
      description: `The Sanctuary by Ellington is a private villa community nestled beside the tranquil blue lagoon in MBR City. Featuring uninterrupted views of the Burj Khalifa and Downtown Dubai, this premium gated enclave offers exclusive villas with rooftop terraces, private lifts, and automated smart-home systems. Crafted for families who seek privacy without sacrificing access, The Sanctuary blends nature, luxury, and seamless connectivity into a rare lifestyle offering.`,
      price: '3,500,000',
      roi: '-',
      reelVideoUrl: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954196/santuary_w21rmh.jpg', // Placeholder video
      images: [
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954200/The_Sanctuary_-_Garden_view_fzh8ym.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954742/The_Sanctuary_-_Lagoon_views_kdmjxo.jpg',
        'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954190/The_Sanctuary_-_Living_area_jkmcxr.jpg',
      ],
      amenities: [
        { icon: <FaWater />, name: 'Crystal Lagoon Access' },
        { icon: <FaTree />, name: 'Private Garden with Pool & Sunken Seating' },
        { icon: <FaLeaf />, name: 'Zen Courtyards & Rooftop Terrace' },
        { icon: <FaCogs />, name: 'Home Automation in Every Villa' },
        { icon: <FaSwimmer />, name: 'Water Activity Zone & Nature Playground' },
        { icon: <FaConciergeBell />, name: 'Premium Gated Community with Clubhouse' },
      ],
      location: {
        address: 'MBR City, Dubai',
        city: 'Dubai, UAE',
        points: [
          { icon: <FaTrain />, name: 'Metro: Meydan Line – 6 min' },
          { icon: <FaPlane />, name: 'Airport: DXB – 15 min' },
          { icon: <FaShoppingBag />, name: 'Mall: Dubai Mall – 12 min' },
          { icon: <FaLandmark />, name: 'Landmark: Ras Al Khor Wildlife Sanctuary – 10 min' },
        ],
      },
      goldenVisa: false,
      relatedSlugs: ['playa-del-sol', 'the-crestmark', 'the-highgrove', 'ocean-house'],
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
  const mainVideoRef = React.useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (mainMedia.type === 'video' && mainVideoRef.current) {
      const video = mainVideoRef.current;
      video.muted = true;
      // Try to play the video programmatically
      const playPromise = video.play();
      if (playPromise && playPromise.catch) {
        playPromise.catch(() => {
          video.muted = true;
          video.play();
        });
      }
    }
  }, [mainMedia]);

  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+91', address: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState({ name: '', date: '', time: '', timezone: '', country: '', countryCode: '+91', email: '', phone: '' });
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
  const countryCodeList = [
    { code: '+91', country: 'India' },
    { code: '+1', country: 'United States' },
    { code: '+44', country: 'United Kingdom' },
    { code: '+971', country: 'UAE' },
    { code: '+61', country: 'Australia' },
    { code: '+65', country: 'Singapore' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
    { code: '+81', country: 'Japan' },
    { code: '+27', country: 'South Africa' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+974', country: 'Qatar' },
    { code: '+965', country: 'Kuwait' },
    { code: '+968', country: 'Oman' },
    { code: '+973', country: 'Bahrain' },
    { code: '+7', country: 'Russia' },
    { code: '+39', country: 'Italy' },
    { code: '+34', country: 'Spain' },
    { code: '+31', country: 'Netherlands' },
    { code: '+41', country: 'Switzerland' },
    { code: '+90', country: 'Turkey' },
    { code: '+55', country: 'Brazil' },
    { code: '+86', country: 'China' },
    { code: '+61', country: 'Australia' },
    { code: '+1', country: 'Canada' },
    { code: '+other', country: 'Other' },
  ];

  useEffect(() => {
    // No need to setSlug, just use slug directly
  }, [slug]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
        setCallForm({ name: '', date: '', time: '', timezone: '', country: '', countryCode: '+91', email: '', phone: '' });
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
      {/* Add gap below header */}
      <div className="mt-0 md:pt-8" />
      {/* Custom Login/Register Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl shadow-2xl p-1 sm:p-3 md:p-5 lg:p-8 w-full 
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
            relative animate-fadeIn border border-purple-700/40 max-h-[95vh] overflow-y-auto">
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => setShowModal(false)}>
              <FaTimes size={20} className="sm:w-[22px] sm:h-[22px]" />
            </button>
            <div className="flex flex-col items-center pt-6 sm:pt-8 pb-2 px-4 sm:px-8">
              <Image src="/logos/logo.png" alt="3rdshade Logo" width={500} height={40} className="mb-2 sm:w-[120px] sm:h-[20px]" />
              <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">Secure Your Property</h2>
              <p className="text-gray-300 text-center mb-4 text-xs sm:text-sm px-2">Fill in your details to proceed with your interest in <span className="font-bold text-white">{propertyData.name}</span>.</p>
              <div className="w-full bg-gradient-to-r from-purple-700/60 to-pink-700/60 rounded-xl p-[2px] mb-4 sm:mb-6">
                <div className="bg-black/80 rounded-xl p-3 sm:p-4 flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <FaMapMarkerAlt className="text-purple-400 text-sm sm:text-base flex-shrink-0" />
                    <span className="text-white font-semibold text-sm sm:text-base break-words">{propertyData.name}</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-gray-400">
                    <FaMapMarkerAlt className="text-pink-400 mt-0.5 flex-shrink-0" />
                    <span className="break-words">{propertyData.location.address}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <FaShoppingBag className="text-pink-400 flex-shrink-0" />
                    <span>Book now with <span className="text-white font-bold ml-1">AED 2000</span></span>
                  </div>
                </div>
              </div>
            </div>
            <div className="px-2 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-8">
              {formError && (
                <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm md:text-base break-words">{formError}</div>
              )}
              {formSuccess && (
                <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm md:text-base break-words">{formSuccess}</div>
              )}
              {amountWarning && (
                <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500/50 rounded-lg text-yellow-400 text-xs sm:text-sm md:text-base break-words">{amountWarning}</div>
              )}
              <form onSubmit={handlePayNowSubmit} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
                <div className="relative">
                  <div className="flex flex-col sm:flex-row gap-2">
                    <select
                      name="countryCode"
                      value={form.countryCode}
                      onChange={handleInputChange}
                      className="py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-1/3 text-xs sm:text-sm md:text-base"
                      required
                      disabled={isLoading}
                    >
                      {countryCodeList.map(opt => (
                        <option key={opt.code} value={opt.code}>{opt.code} ({opt.country})</option>
                      ))}
                    </select>
                    <div className="relative w-full sm:w-2/3">
                      <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg pointer-events-none" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone number"
                        value={form.phone}
                        onChange={handleInputChange}
                        className="py-2 sm:py-2.5 md:py-3 pl-10 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-xs sm:text-sm md:text-base"
                        required
                        disabled={isLoading}
                      />
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={form.email}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-xs sm:text-sm md:text-base"
                    required
                    disabled={isLoading}
                  />
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
                  <input
                    type="text"
                    name="address"
                    placeholder="Address"
                    value={form.address}
                    onChange={handleInputChange}
                    className="pl-10 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-xs sm:text-sm md:text-base"
                    required
                    disabled={isLoading}
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-base sm:text-lg tracking-wide ${
                    isLoading
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg active:scale-95'
                  }`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Submitting...</span>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="bg-neutral-900 rounded-xl shadow-2xl p-2 sm:p-4 md:p-6 lg:p-8 w-full 
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
            relative animate-fadeIn max-h-[95vh] overflow-y-auto">
            <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => setShowCallModal(false)}>
              <FaTimes size={18} className="sm:w-5 sm:h-5" />
            </button>
            <div className="flex flex-col items-center mb-4 sm:mb-6 pt-2">
              <FaPhoneAlt className="text-2xl sm:text-3xl text-purple-400 mb-2" />
              <h2 className="text-xl sm:text-2xl font-bold text-center text-white px-2">Book a Video Call Slot</h2>
            </div>
            {callFormSuccess && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm md:text-base text-center break-words">{callFormSuccess}</div>}
            {callFormError && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm md:text-base text-center break-words">{callFormError}</div>}
            <form onSubmit={handleCallSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 md:gap-4">
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={callForm.name}
                  onChange={handleCallInputChange}
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-xs sm:text-sm md:text-base"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={callForm.email}
                  onChange={handleCallInputChange}
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-xs sm:text-sm md:text-base"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Country</label>
                <select
                  name="country"
                  value={callForm.country}
                  onChange={handleCallInputChange}
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-xs sm:text-sm md:text-base"
                  required
                >
                  <option value="">Select Country</option>
                  {countryList.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Select Date</label>
                <input
                  type="date"
                  name="date"
                  value={callForm.date}
                  onChange={handleCallInputChange}
                  className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-full text-xs sm:text-sm md:text-base"
                  required
                />
              </div>
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Phone Number</label>
                <div className="flex gap-2">
                  <select
                    name="countryCode"
                    value={callForm.countryCode}
                    onChange={handleCallInputChange}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-1/3 text-xs sm:text-sm md:text-base"
                    required
                  >
                    {countryCodeList.map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.code} ({opt.country})</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={callForm.phone}
                    onChange={handleCallInputChange}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-2/3 text-xs sm:text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              <div className="col-span-1">
                <label className="text-xs sm:text-sm text-gray-300 block mb-1">Select Time & Timezone</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    name="time"
                    value={callForm.time}
                    onChange={handleCallInputChange}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-1/2 text-xs sm:text-sm md:text-base"
                    required
                  />
                  <select
                    name="timezone"
                    value={callForm.timezone}
                    onChange={handleCallInputChange}
                    className="px-2 sm:px-3 md:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-1/2 text-xs sm:text-sm md:text-base"
                    required
                  >
                    <option value="">Timezone</option>
                    {timezoneList.map(tz => <option key={tz} value={tz}>{tz}</option>)}
                  </select>
                </div>
              </div>
              <div className="col-span-1 sm:col-span-2">
                <button 
                  type="submit" 
                  className={`w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-sm sm:text-base ${
                    callFormLoading 
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg active:scale-95'
                  }`}
                  disabled={callFormLoading}
                >
                  {callFormLoading ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="text-sm sm:text-base">Submitting...</span>
                    </div>
                  ) : (
                    'Book Video Call'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showEnquireModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
          <div className="bg-gradient-to-br from-purple-900/90 via-black/90 to-pink-900/90 rounded-3xl shadow-2xl p-1 sm:p-3 md:p-5 lg:p-8 w-full 
            max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
            relative animate-fadeIn border border-purple-700/40">
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full px-6 py-2 shadow-lg text-white font-bold text-lg tracking-wide animate-fadeInUp">Enquire Now</div>
            <button className="absolute top-4 right-4 text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200" onClick={() => { setShowEnquireModal(false); setEnquireStep(1); }}>
              <FaTimes size={20} />
            </button>
            <div className="flex flex-col items-center mb-4 pt-8">
              <Image src="/logos/logo.png" alt="3rdshade Logo" width={120} height={40} className="mb-2 drop-shadow-lg" />
            </div>
            {enquireFormSuccess && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center shadow">{enquireFormSuccess}</div>}
            {enquireFormError && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center shadow">{enquireFormError}</div>}
            <form onSubmit={handleEnquireSubmit} className="flex flex-col gap-6 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
              {/* Stepper */}
              <div className="flex justify-center gap-2 mb-4">
                {[1, 2].map(step => (
                  <div key={step} className={`w-8 h-2 rounded-full transition-all duration-300 shadow ${enquireStep === step ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-neutral-800/80'}`}></div>
                ))}
              </div>
              {/* Step 1: Basic Info */}
              {enquireStep === 1 && (
                <div className="flex flex-col gap-4 animate-fadeIn">
                  <input type="text" name="name" placeholder="Name" value={enquireForm.name} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm placeholder:text-purple-200/60" required />
                  <input type="email" name="email" placeholder="Email" value={enquireForm.email} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm placeholder:text-purple-200/60" required />
                  <input type="tel" name="phone" placeholder="Phone (with country code)" value={enquireForm.phone} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm placeholder:text-purple-200/60" required />
                  <label className="text-sm text-purple-200/80 font-semibold mt-2">Preferred contact method</label>
                  <div className="flex gap-3">
                    {['WhatsApp', 'Email', 'Phone'].map(method => (
                      <label key={method} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.contactMethod === method ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
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
                  <label className="text-sm text-purple-200/80 font-semibold">Are you currently in India?</label>
                  <div className="flex gap-3">
                    {['Yes', 'No'].map(val => (
                      <label key={val} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.inIndia === val ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                        <input type="radio" name="inIndia" value={val} checked={enquireForm.inIndia === val} onChange={handleEnquireInputChange} className="hidden" />
                        {val}
                      </label>
                    ))}
                  </div>
                  <label className="text-sm text-purple-200/80 font-semibold">Select the country</label>
                  <select name="country" value={enquireForm.country} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm">
                    <option value="">Select Country</option>
                    {countryList.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <label className="text-sm text-purple-200/80 font-semibold">Type of visit</label>
                  <div className="flex gap-3">
                    {['Virtual', 'Physical'].map(type => (
                      <label key={type} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.visitType === type ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                        <input type="radio" name="visitType" value={type} checked={enquireForm.visitType === type} onChange={handleEnquireInputChange} className="hidden" />
                        {type}
                      </label>
                    ))}
                  </div>
                  <label className="text-sm text-purple-200/80 font-semibold">Preferred Date & Time</label>
                  <div className="flex gap-2">
                    <input type="date" name="date" value={enquireForm.date} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm cursor-pointer" required />
                    <input type="time" name="time" value={enquireForm.time} onChange={handleEnquireInputChange} className="px-5 py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm cursor-pointer" required />
                  </div>
                  <label className="text-sm text-purple-200/80 font-semibold">How soon are you looking to buy?</label>
                  <div className="flex flex-wrap gap-2">
                    {['Immediately', '1–3 Months', '3–6 Months', 'Just Exploring'].map(opt => (
                      <label key={opt} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.buyTimeline === opt ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
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
                  <button type="button" onClick={handleEnquireBack} className="px-6 py-2 rounded-full bg-neutral-900/80 text-purple-200/80 font-semibold transition-all duration-200 cursor-pointer hover:bg-neutral-800/80 hover:scale-105 shadow">Back</button>
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
      <main className="max-w-screen-2xl mx-auto px-6 sm:px-6 lg:px-8 py-20 pt-28 md:pt-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-15 items-stretch">
          {/* Left Column: Image/Video Gallery */}
          <div className="lg:col-span-1 flex flex-col h-full">
            <div className="relative w-full h-[635px] rounded-xl overflow-hidden mb-4 bg-black">
              {(() => {
                const isImage = /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(mainMedia.src);
                if (mainMedia.type === 'video' && !isImage) {
                  return (
                    <video
                      ref={mainVideoRef}
                      src={mainMedia.src}
                      className="w-full h-full object-contain bg-black"
                      autoPlay
                      loop
                      muted={true}
                      playsInline
                      controls={false}
                    />
                  );
                } else {
                  return (
                    <Image src={mainMedia.src} alt="Property Image" fill className="object-fit-contain" />
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
                    <Image src={img} alt={`Thumbnail ${idx + 1}`} fill className="object-fit-contain" />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Property Details */}
          <div className="lg:col-span-1 flex flex-col space-y-4 h-full">
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
            <div className="rounded-xl p-[2px] bg-gradient-to-r from-purple-600 to-pink-500 h-fit">
              <div className="bg-black rounded-xl p-4 h-full">
                <h2 className="text-lg font-bold text-white mb-3">Prime Location</h2>
                <div className="flex items-start gap-2 mb-3">
                  <FaMapMarkerAlt className="text-purple-400 mt-1 text-sm" />
                  <div>
                    <div className="font-semibold text-white text-sm">{location.address}</div>
                    <div className="text-xs text-gray-400">{location.city}</div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 md:flex-nowrap md:gap-4 text-xs">
                  {locationPoints.filter(Boolean).map((pt: { icon: React.ReactNode; name: string }) => (
                    <div key={pt.name} className="flex items-center gap-1 text-gray-300 bg-neutral-900/60 rounded px-2 py-1 mb-1 max-w-full md:max-w-xs">
                      <span className="text-purple-400 text-xs">{pt.icon}</span>
                      <span className="break-words whitespace-normal">{pt.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Golden Visa */}
            {propertyData.goldenVisa && (
              <div className="bg-gradient-to-r from-yellow-300/60 to-amber-200/40 backdrop-blur-md border border-yellow-200/40 rounded-xl p-4 flex items-center justify-between text-yellow-900/90 shadow-lg" style={{boxShadow: '0 4px 24px 0 rgba(255, 221, 51, 0.10)'}}>
                <div>
                  <h3 className="font-bold text-base drop-shadow">Golden Visa Eligibility</h3>
                  <p className="text-xs opacity-80">Qualify for UAE Golden Visa with this investment.</p>
                </div>
                <div className="text-center">
                  <FaCheckCircle size={24} className="mx-auto mb-1 text-yellow-600 drop-shadow" />
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
        <div className="mt-6 md:mt-4 lg:mt-2">
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