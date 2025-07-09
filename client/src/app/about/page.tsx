'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { FaAward, FaUsers, FaHome, FaGlobe, FaHandshake, FaChartLine, FaStar, FaCheckCircle, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaLinkedin, FaTwitter, FaInstagram, FaFacebook } from 'react-icons/fa';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useRouter } from 'next/navigation';

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const stats = [
    { number: '500+', label: 'Properties Sold', icon: <FaHome /> },
    { number: '1000+', label: 'Happy Clients', icon: <FaUsers /> },
    { number: '15+', label: 'Years Experience', icon: <FaAward /> },
    { number: '50+', label: 'Countries Served', icon: <FaGlobe /> },
  ];

  const values = [
    {
      icon: <FaHandshake />,
      title: 'Trust & Integrity',
      description: "We believe in doing business the right way by being honest, transparent, and dependable at every step. Strong partnerships are built on trust, and that's where we start."
    },
    {
      icon: <FaChartLine />,
      title: 'Excellence',
      description: "We approach every project with clarity and purpose. Our campaigns are driven by data, refined by experience, and aligned with each client's business vision."
    },
    {
      icon: <FaStar />,
      title: 'Innovation',
      description: "Our ideas are original, but never vague. We focus on delivering sharp, targeted content and visuals that connect with the right audience at the right time."
    },
    {
      icon: <FaCheckCircle />,
      title: 'Quality',
      description: "Everything we do is built around our clients' goals. From strategy to execution, we stay responsive, focused, and committed to delivering meaningful outcomes."
    }
  ];

  
  return (
    <div className="bg-black text-white font-montserrat">
      <Header onEnquire={() => {}} />      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=2000&q=80" 
            alt="Luxury Real Estate" 
            layout="fill" 
            className="object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-black/80"></div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
          transition={{ duration: 1 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-6"
        >
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-6xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
          >
            About Us
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed"
          >
          Elevating luxury real estate globally, we connect discerning clients with exceptional properties that redefine modern living.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 30 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300"
              onClick={() => router.push('/properties')}
            >
              Our Properties
            </button>
            <button
              className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              onClick={() => router.push('/contact')}
            >
              Contact Us
            </button>
          </motion.div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="text-purple-400 text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {stat.icon}
                </div>
                <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Our Story
              </h2>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              3rd Shade Realty was built to help property brands gain serious traction in a fast-moving, digital-first market. We combine real estate insight with strategic marketing to shape how high-value homes are seen, shared, and sold.
              </p>
              <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              What began as a focused agency in Dubai has evolved into a global partner for developers and brokers across 50+ countries. Our work reflects the quality of the properties we represent - clear, confident, and built for results.              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
              We collaborate closely with clients to create visibility where it matters most. No frills, just sharp thinking, tailored campaigns, and measurable outcomes that move the market.              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] rounded-2xl overflow-hidden">
                <Image 
                  src="https://res.cloudinary.com/dzmxqwlse/image/upload/v1750954758/Ocean_House_by_Ellington_-_penthouse_bedroom_vhe1g5.jpg" 
                  alt="Luxury Development" 
                  layout="fill" 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              Our Values
            </h2>
            <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Why our clients trust us - and how we stay accountable
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-black/50 backdrop-blur-sm rounded-2xl p-8 text-center group hover:bg-black/70 transition-all duration-300"
              >
                <div className="text-purple-400 text-4xl mb-6 group-hover:scale-110 transition-transform duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-4">{value.title}</h3>
                <p className="text-gray-400 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Ready to Put Your Property on the Map?
            </h2>
            <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Work with our experts to build visibility, generate leads, and drive qualified results.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:++918600181189"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-4 px-8 rounded-full hover:from-purple-700 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-2"
                style={{ display: 'inline-flex' }}
              >
                <FaPhoneAlt /> Get in Touch
              </a>
              <a
                href="/talk-to-experts"
                className="border-2 border-white text-white font-bold py-4 px-8 rounded-full hover:bg-white hover:text-black transition-all duration-300 flex items-center justify-center gap-2"
                style={{ display: 'inline-flex' }}
              >
                Talk To Experts
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage; 