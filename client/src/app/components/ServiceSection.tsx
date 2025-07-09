'use client'
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import Modal from 'react-modal';
import 'aos/dist/aos.css';
import AOS from 'aos';

const services = [
  {
    title: 'Branding',
    description: 'Build a powerful, memorable brand identity that sets you apart in the real estate market.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1751967877/branding_cojlmm.png',
  },
  {
    title: 'SEO',
    description: 'Optimize your online presence to rank higher in search results and attract more qualified leads.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750498823/seo_q1e3dk.png',
  },
  {
    title: 'Website Development',
    description: 'Get a stunning, high-performance website tailored for real estate, with seamless user experience.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1751967883/web-dev_oa4gpo.png',
  },
  {
    title: 'Performance Marketing',
    description: 'Drive measurable results with targeted digital campaigns and data-driven marketing strategies.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750656187/performance_kksaww.png',
  },
  {
    title: 'UI/UX',
    description: 'Delight your users with intuitive, beautiful interfaces and seamless digital experiences.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1751967887/ui-ux_bw4ynz.png',
  },
  {
    title: 'Consulting',
    description: 'Expert advice and strategic guidance to help you grow and scale your real estate business.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750656187/consulting_hglv1k.png',
  },
  {
    title: 'Ecommerce Listing',
    description: 'Expand your reach with professional ecommerce listing services for your properties.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750656192/ecom_hb3oui.png',
  },
  {
    title: 'Social Media',
    description: 'Engage your audience and build your brand with creative, effective social media strategies.',
    image: 'https://res.cloudinary.com/dzmxqwlse/image/upload/v1750656185/social-media_izbxum.png',
  },
];

const serviceVariants = {
  hidden: { opacity: 0, y: 60 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, type: 'spring' as const, stiffness: 80 } },
};

// Animation variants for letter-by-letter title
const titleParent: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.07,
    },
  },
};
const letterVariant: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: 'spring' as const, stiffness: 500, damping: 30 } },
};

export default function ServiceSection({ onEnquire, onCallNow }: { onEnquire: () => void, onCallNow: (service: string) => void }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [pointer, setPointer] = useState<{ x: number; y: number } | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', services: [] as string[], message: '', countryCode: '+91' });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  // Hide pointer on mouse leave
  const handlePointerLeave = () => {
    setPointer(null);
    setHoveredIdx(null);
  };

  // Show pointer and update position
  const handlePointerMove = (e: React.MouseEvent, idx: number) => {
    setHoveredIdx(idx);
    setPointer({ x: e.clientX, y: e.clientY });
  };

  // Open modal with selected service (pre-check it)
  const handleOpenModal = (serviceTitle: string) => {
    setForm(f => ({ ...f, services: [serviceTitle] }));
    setShowModal(true);
    setResult(null);
  };

  // Handle form input
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox' && e.target instanceof HTMLInputElement) {
      const checked = e.target.checked;
      setForm(f => ({
        ...f,
        services: checked
          ? [...f.services, value]
          : f.services.filter(s => s !== value),
      }));
    } else {
      setForm(f => ({ ...f, [name]: value }));
    }
  };

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch('/api/send-service-inquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          services: form.services,
          message: form.message,
        }),
      });
      if (res.ok) {
        setResult('Thank you! Your enquiry has been sent.');
        setForm({ name: '', email: '', phone: '', services: [], message: '', countryCode: '+91' });
      } else {
        setResult('Sorry, there was an error sending your enquiry.');
      }
    } catch {
      setResult('Sorry, there was an error sending your enquiry.');
    }
    setLoading(false);
  };

  useEffect(() => {
    AOS.init({ once: true, duration: 700, offset: 100 });
  }, []);

  return (
    <section className="w-full py-20 relative font-montserrat">
      <div className="w-full max-w-screen-4xl ">
        <div className="flex items-center mb-2">
          <motion.h2
            className="text-4xl md:text-7xl font-normal text-center mx-auto flex gap-1 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent"
            variants={titleParent}
            initial="hidden"
            whileInView="visible"
            style={{
              fontFamily: 'Montserrat, Helvetica, sans-serif',
            }}
            viewport={{ once: true }}
          >
            {Array.from('OUR SERVICES').map((char, idx) => (
              <motion.span
                key={idx}
                variants={letterVariant}
                style={{ 
                  display: char === ' ' ? 'inline-block' : 'inline-block', 
                  minWidth: char === ' ' ? '0.5em' : undefined,
                  fontFamily: 'Montserrat, Helvetica, sans-serif'
                }}
                className="font-sans"
              >
                {char}
              </motion.span>
            ))}
          </motion.h2>
        </div>
        <hr className="border-neutral-700 mb-12" />
        <div className="flex flex-col gap-32">
          {services.map((service, idx) => (
            <React.Fragment key={service.title}>
              <motion.div
                className="w-full"
                variants={serviceVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
              >
                <div
                  className={`w-full flex flex-col md:flex-row ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} gap-4 md:gap-10 items-end group relative`}
                >
                  {/* Image */}
                  <div className="w-full md:w-1/2 relative flex-shrink-0"
                    onMouseMove={e => handlePointerMove(e, idx)}
                    onMouseLeave={handlePointerLeave}
                    data-aos={idx % 2 === 0 ? 'fade-right' : 'fade-left'}
                  >
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-80 md:h-[500px] object-cover rounded-2xl shadow-2xl transition-transform duration-300 group-hover:scale-105 cursor-pointer"
                      onClick={() => handleOpenModal(service.title)}
                    />
                  </div>
                  {/* Text (beside image, bottom-aligned) */}
                  <div
                    className={`w-full md:w-1/2 flex flex-col justify-end h-80 md:h-[500px] pb-4
                      ${idx % 2 === 0 ? 'text-left items-start' : 'text-right items-end'}
                    `}
                  >
                    <h3
                      className="text-white text-4xl md:text-7xl font-normal leading-tight transition-all duration-300 inline-block group tracking-wide"
                      style={{ fontFamily: 'Montserrat, Helvetica, sans-serif', textTransform: 'uppercase' }}
                      data-aos="fade-up"
                    >
                      {service.title.split(' ').map((word, i) => (
                        <span key={i} className="relative block">
                          {word}
                          <span
                            className="absolute left-0 -bottom-0.5 h-0.5 w-full origin-left scale-x-0 group-hover:scale-x-100 bg-white transition-transform duration-300"
                            aria-hidden="true"
                          />
                        </span>
                      ))}
                    </h3>
                    <p
                      className="text-neutral-300 text-lg md:text-xl leading-relaxed mt-2"
                      style={{ fontFamily: 'Montserrat, Helvetica, sans-serif' }}
                    >
                      {service.description}
                    </p>
                  </div>
                </div>
              </motion.div>
              <hr className="border-neutral-700 my-12" />
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* Modal Enquiry Form */}
      <Modal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        className="fixed inset-0 flex items-center justify-center z-[9999] bg-black/70"
        overlayClassName="fixed inset-0 bg-black/70 z-[9998]"
        ariaHideApp={false}
      >
        <div className="bg-neutral-900 rounded-xl shadow-2xl p-2 sm:p-4 md:p-6 lg:p-8 xl:p-6 2xl:p-8 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-md 2xl:max-w-lg relative animate-fadeIn font-montserrat max-h-screen overflow-visible">
          <button className="absolute top-2 right-2 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 font-montserrat text-base sm:text-lg md:text-xl" onClick={() => setShowModal(false)}>
            ×
          </button>
          <h2 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3 text-center text-white font-montserrat">Service Enquiry</h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 sm:gap-3 md:gap-4">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleInputChange}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 font-montserrat text-xs sm:text-sm md:text-base"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 font-montserrat text-xs sm:text-sm md:text-base"
              required
            />
            <div className="flex flex-row gap-1">
              <select
                name="countryCode"
                value={form.countryCode || '+91'}
                onChange={handleInputChange}
                className="px-1 py-1 sm:px-2 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 font-montserrat text-xs sm:text-sm md:text-base w-16"
                required
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+971">+971</option>
                <option value="+61">+61</option>
                <option value="+65">+65</option>
                <option value="+49">+49</option>
                <option value="+33">+33</option>
                <option value="+81">+81</option>
                <option value="+27">+27</option>
                <option value="+966">+966</option>
                <option value="+974">+974</option>
                <option value="+965">+965</option>
                <option value="+968">+968</option>
                <option value="+973">+973</option>
                <option value="+7">+7</option>
                <option value="+39">+39</option>
                <option value="+34">+34</option>
                <option value="+31">+31</option>
                <option value="+41">+41</option>
                <option value="+90">+90</option>
                <option value="+55">+55</option>
                <option value="+86">+86</option>
                <option value="+other">Other</option>
              </select>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={form.phone}
                onChange={handleInputChange}
                className="px-2 py-1 sm:px-3 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 font-montserrat text-xs sm:text-sm md:text-base flex-1"
                required
              />
            </div>
            <div>
              <label className="block text-white mb-1 font-montserrat text-xs sm:text-sm md:text-base">Select Service(s):</label>
              <select
                name="services"
                multiple
                value={form.services}
                onChange={e => {
                  const selected = Array.from(e.target.selectedOptions, option => option.value);
                  setForm(f => ({ ...f, services: selected }));
                }}
                className="w-full px-2 py-1 sm:px-3 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 font-montserrat text-xs sm:text-sm md:text-base min-h-[40px]"
                required
              >
                {services.map(s => (
                  <option key={s.title} value={s.title}>{s.title}</option>
                ))}
              </select>
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={form.message}
              onChange={handleInputChange}
              className="px-2 py-1 sm:px-3 sm:py-2 rounded bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 min-h-[60px] sm:min-h-[80px] md:min-h-[100px] font-montserrat text-xs sm:text-sm md:text-base"
              required
            />
            <button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold py-2 sm:py-2.5 md:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg font-montserrat text-sm sm:text-base md:text-lg" disabled={loading}>
              {loading ? 'Sending...' : 'Send Enquiry'}
            </button>
            {result && <div className="text-center text-xs sm:text-sm md:text-base mt-2 text-white font-montserrat">{result}</div>}
          </form>
        </div>
      </Modal>
      {/* Custom Pointer */}
      <AnimatePresence>
        {pointer && hoveredIdx !== null && (
          <motion.div
            className="fixed  pointer-events-none"
            style={{ left: pointer.x - 80, top: pointer.y - 80 }}
            initial={{ opacity: 1, scale: 0.7 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.7 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-40 h-40 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-500 via-pink-500 to-yellow-400 shadow-2xl animate-pulse">
              <span className="text-white font-bold text-lg select-none font-montserrat">Enquire Now</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}