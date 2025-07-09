'use client'

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceHero from '../components/ServiceHero';
import ServiceIntro from '../components/ServiceIntro';
import ServiceSection from '../components/ServiceSection';
import CallToAction from '../components/CallToAction';

const SERVICE_LIST = [
  'Branding',
  'SEO',
  'Website Development',
  'Performance Marketing',
  'UI/UX',
  'Consulting',
  'Ecommerce Listing',
  'Social Media',
];

export default function ServicesPage() {
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState<{
    name: string;
    organization: string;
    email: string;
    phone: string;
    services: string[];
  }>({
    name: '',
    organization: '',
    email: '',
    phone: '',
    services: [],
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Call booking modal state
  const [showCallModal, setShowCallModal] = useState(false);
  const [callForm, setCallForm] = useState({
    service: '',
    date: '',
    time: '',
    email: '',
  });
  const [callLoading, setCallLoading] = useState(false);
  const [callMessage, setCallMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox') {
      setForm((prev) => ({
        ...prev,
        services: checked
          ? [...prev.services, value]
          : prev.services.filter((s) => s !== value),
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const res = await fetch('/api/send-service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      setLoading(false);
      if (res.ok) {
        setMessage("Inquiry sent! We'll get back to you soon.");
        setForm({ name: '', organization: '', email: '', phone: '', services: [] });
      } else {
        setMessage('Failed to send. Please try again.');
      }
    } catch {
      setLoading(false);
      setMessage('Failed to send. Please try again.');
    }
  };

  // Call booking handlers
  const handleCallChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCallForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCallSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setCallLoading(true);
    setCallMessage('');
    try {
      const res = await fetch('/api/send-service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: '',
          organization: '',
          email: callForm.email,
          services: [],
          callBooking: {
            service: callForm.service,
            date: callForm.date,
            time: callForm.time,
          },
        }),
      });
      setCallLoading(false);
      if (res.ok) {
        setCallMessage('Call slot booked! We will contact you.');
        setCallForm({ service: '', date: '', time: '', email: '' });
      } else {
        setCallMessage('Failed to book. Please try again.');
      }
    } catch {
      setCallLoading(false);
      setCallMessage('Failed to book. Please try again.');
    }
  };

  return (
    <div className="relative w-full min-h-screen">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        poster="/path/to/lightweight-poster.jpg" // <-- Add a small poster image in public/
        disablePictureInPicture
        className="fixed top-0 left-0 w-full h-full object-cover z-0"
        style={{ 
          minHeight: '100vh', 
          minWidth: '100vw',
          filter: 'brightness(0.8) contrast(1.1)',
          opacity: 1,
          backfaceVisibility: 'hidden',
          perspective: '1000px',
          // Remove willChange unless you animate transform/opacity
        }}
        onLoadedData={(e) => {
          const video = e.target as HTMLVideoElement;
          video.playbackRate = 1;
          video.play().catch(console.error);
        }}
      >
        <source src="https://upcdn.io/223k2J2/raw/bg-service3d_xxpg9p.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>

      {/* Gradient Overlay for better readability */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 bg-gradient-to-b from-black/60 via-transparent to-black/80" />
      
      {/* Animated Gradient Overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 opacity-30"
        style={{
          background: `
            radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%),
            radial-gradient(circle at 40% 40%, rgba(120, 119, 198, 0.2) 0%, transparent 50%)
          `,
          animation: 'pulse 4s ease-in-out infinite alternate'
        }}
      />

      {/* Noise Texture Overlay */}
      <div 
        className="fixed top-0 left-0 w-full h-full pointer-events-none z-10 opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          mixBlendMode: 'overlay'
        }}
      />

      {/* Page Content */}
      <div className="relative z-20">
      <Header onEnquire={() => {}} />
        <main className="min-h-screen flex flex-col justify-center items-center relative">
          <ServiceHero />
          <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
            <ServiceIntro />
            <ServiceSection
              onEnquire={() => setShowModal(true)}
              onCallNow={(service) => {
                setCallForm((prev) => ({ ...prev, service }));
                setShowCallModal(true);
              }}
            />
          </div>
        </main>
        <CallToAction/>
        <Footer />

        {/* Example service card (add onClick to your actual service items) */}
        <div onClick={() => setShowModal(true)} className="cursor-pointer">
          {/* Service content here */}
        </div>

        {/* Modal Form */}
        {showModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
    <div className="bg-black/90 backdrop-blur-md rounded-lg p-3 sm:p-5 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-2xl relative border border-gray-800/50">
      <button
        className="absolute top-2 right-2 text-white text-lg md:text-xl hover:text-purple-400 transition-colors"
        onClick={() => { setShowModal(false); setMessage(''); }}
      >
        &times;
      </button>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-white text-center">Service Inquiry</h2>
      <form className="flex flex-col gap-2 sm:gap-3" onSubmit={handleSubmit}>
        <input
          className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm"
          placeholder="Your Name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
        <input
          className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm"
          placeholder="Organization"
          name="organization"
          value={form.organization}
          onChange={handleChange}
          required
        />
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
          <input
            className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm flex-1"
            placeholder="Email"
            name="email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
          <input
            className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm flex-1"
            placeholder="Phone"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            type="tel"
            required
          />
        </div>
        <div>
          <div className="text-white font-medium mb-1 text-sm">Select Services</div>
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {SERVICE_LIST.map(service => (
              <label
                key={service}
                className="flex items-center gap-1 border border-gray-700 bg-neutral-900/80 rounded px-2 py-1 text-white cursor-pointer hover:border-purple-500 transition-colors text-xs sm:text-sm"
              >
                <input
                  type="checkbox"
                  name="services"
                  value={service}
                  checked={form.services.includes(service)}
                  onChange={handleChange}
                  className="accent-purple-500"
                />
                <span>{service}</span>
              </label>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded mt-2 hover:from-purple-700 hover:to-pink-600 transition-all transform hover:scale-105 text-sm"
          disabled={loading}
        >
          {loading ? 'Sending...' : 'Submit'}
        </button>
        {message && <div className="mt-2 text-center text-white text-sm">{message}</div>}
      </form>
    </div>
  </div>
)}

{showCallModal && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-2 sm:p-4">
    <div className="bg-black/80 backdrop-blur-md rounded-lg p-3 sm:p-5 md:p-6 w-full max-w-xs sm:max-w-sm md:max-w-md shadow-2xl relative border border-purple-800/50">
      <button
        className="absolute top-2 right-2 text-white text-lg md:text-xl hover:text-purple-400 transition-colors"
        onClick={() => { setShowCallModal(false); setCallMessage(''); }}
      >
        &times;
      </button>
      <h2 className="text-base sm:text-lg md:text-xl font-semibold mb-3 text-white text-center">Book a Call Slot</h2>
      <form className="flex flex-col gap-2 sm:gap-3" onSubmit={handleCallSubmit}>
        <div className="text-white font-medium text-sm">Service: <span className="text-pink-400">{callForm.service}</span></div>
        <input
          className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm"
          type="date"
          name="date"
          value={callForm.date}
          onChange={handleCallChange}
          required
        />
        <input
          className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm"
          type="time"
          name="time"
          value={callForm.time}
          onChange={handleCallChange}
          required
        />
        <input
          className="border border-gray-700 bg-neutral-900/80 text-white rounded p-2 focus:border-purple-500 focus:outline-none text-sm"
          placeholder="Your Email"
          name="email"
          value={callForm.email}
          onChange={handleCallChange}
          type="email"
          required
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 rounded mt-2 hover:from-purple-700 hover:to-pink-600 transition-all transform hover:scale-105 text-sm"
          disabled={callLoading}
        >
          {callLoading ? 'Booking...' : 'Book Slot'}
        </button>
        {callMessage && <div className="mt-2 text-center text-white text-sm">{callMessage}</div>}
      </form>
    </div>
  </div>
)}

      </div>

      <style jsx>{`
        @keyframes pulse {
          0% { opacity: 0.2; }
          100% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}