'use client';

import { FaHome, FaUserTie, FaLock } from 'react-icons/fa';

const services = [
  {
    icon: <FaHome size={72} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-6" />,
    title: 'Property Curation',
    description: 'Hand-selected properties that meet our exacting standards for luxury and exclusivity.'
  },
  {
    icon: <FaUserTie size={72} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-6" />,
    title: 'Personal Concierge',
    description: 'Dedicated specialists providing white-glove service throughout your journey.'
  },
  {
    icon: <FaLock size={72} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-6" />,
    title: 'Confidential Transactions',
    description: 'Discretion and privacy guaranteed for all high-profile clientele.'
  },
];

const EliteServices = () => (
  <section className="py-20  bg-black">
    <div className="container mx-auto px-8">
      <h2 className="text-white text-center text-3xl md:text-4xl font-bold mb-2">Elite Services</h2>
      <p className="text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
        Our comprehensive suite of services ensures a seamless luxury real estate experience.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
        {services.map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center">
            <div className="mb-4">{service.icon}</div>
            <h3 className="text-white font-semibold text-lg mb-2">{service.title}</h3>
            <p className="text-neutral-400 text-sm max-w-xs">{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default EliteServices; 