'use client'

import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ServiceHero from '../components/ServiceHero';
import ServiceIntro from '../components/ServiceIntro';
import ServiceSection from '../components/ServiceSection';

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
    services: string[];
  }>({
    name: '',
    organization: '',
    email: '',
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
        setForm({ name: '', organization: '', email: '', services: [] });
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
    <div className="font-montserrat">
      <Header />
      <main className="min-h-screen bg-black flex flex-col justify-center items-center relative">
        <div className="w-full max-w-screen-2xl mx-auto px-4 md:px-8">
          <ServiceHero />
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
      <Footer />

      {/* Example service card (add onClick to your actual service items) */}
      <div onClick={() => setShowModal(true)} className="cursor-pointer">
        {/* Service content here */}
      </div>

      {/* Modal Form */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-xl p-8 w-full max-w-md shadow-lg relative border border-gray-800">
            <button
              className="absolute top-2 right-3 text-white text-2xl"
              onClick={() => { setShowModal(false); setMessage(''); }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">Service Inquiry</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                placeholder="Your Name"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                placeholder="Organization"
                name="organization"
                value={form.organization}
                onChange={handleChange}
                required
              />
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                required
              />
              <div>
                <div className="text-white font-semibold mb-2">Select Services</div>
                <div className="flex flex-wrap gap-2">
                  {SERVICE_LIST.map(service => (
                    <label key={service} className="flex items-center gap-2 bg-neutral-900 border border-gray-700 rounded px-3 py-1 text-white cursor-pointer">
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
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 rounded mt-2"
                disabled={loading}
              >
                {loading ? 'Sending...' : 'Submit'}
              </button>
              {message && <div className="mt-2 text-center text-white">{message}</div>}
            </form>
          </div>
        </div>
      )}

      {/* Call Booking Modal */}
      {showCallModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-black rounded-xl p-8 w-full max-w-md shadow-lg relative border border-purple-800">
            <button
              className="absolute top-2 right-3 text-white text-2xl"
              onClick={() => { setShowCallModal(false); setCallMessage(''); }}
            >
              &times;
            </button>
            <h2 className="text-xl font-bold mb-4 text-white">Book a Call Slot</h2>
            <form className="flex flex-col gap-4" onSubmit={handleCallSubmit}>
              <div className="text-white font-semibold">Service: <span className="text-pink-400">{callForm.service}</span></div>
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                type="date"
                name="date"
                value={callForm.date}
                onChange={handleCallChange}
                required
              />
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                type="time"
                name="time"
                value={callForm.time}
                onChange={handleCallChange}
                required
              />
              <input
                className="border border-gray-700 bg-neutral-900 text-white rounded p-2"
                placeholder="Your Email"
                name="email"
                value={callForm.email}
                onChange={handleCallChange}
                type="email"
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-2 rounded mt-2"
                disabled={callLoading}
              >
                {callLoading ? 'Booking...' : 'Book Slot'}
              </button>
              {callMessage && <div className="mt-2 text-center text-white">{callMessage}</div>}
            </form>
          </div>
        </div>
      )}
    </div>
  );
} 