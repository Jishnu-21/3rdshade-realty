'use client';

import { FaGlobe, FaFileAlt, FaChartLine, FaUniversity, FaVideo, FaHandshake } from 'react-icons/fa';

const services = [
  {
    icon: <FaGlobe size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'International Relocation Support',
    description: 'We assist with end-to-end relocation—from property search and school recommendations to settling-in services across global cities.',
  },
  {
    icon: <FaFileAlt size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'Legal & Documentation Assistance',
    description: 'Our in-house experts and partner legal teams ensure your transactions are secure, compliant, and streamlined—across borders and jurisdictions.',
  },
  {
    icon: <FaChartLine size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'Investment Advisory & ROI Insights',
    description: 'Gain access to market research, rental yield forecasts, and resale value insights to make confident, data-driven property investments.',
  },
  {
    icon: <FaUniversity size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'Banking & Mortgage Facilitation',
    description: 'We connect you with preferred banking partners for smooth financing, NRI mortgage options, and custom lending solutions.',
  },
  {
    icon: <FaVideo size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'Virtual Viewings & Private Showcases',
    description: 'Can’t visit in person? Our immersive video tours and on-request private showcases make decision-making easier—no matter where you are.',
  },
  {
    icon: <FaHandshake size={56} className="text-white bg-gradient-to-b from-purple-400 to-pink-400 rounded-full p-5" />,
    title: 'Post-Purchase Relationship Management',
    description: 'From handover coordination to leasing support and resale planning—we’re your long-term partners, not just transaction agents.',
  },

];

const EliteServices = () => (
  <section className="py-20 bg-black">
    <div className="container mx-auto px-8">
      <h2 className="text-white text-center text-3xl md:text-4xl font-bold mb-2">Elite Services</h2>
      <p className="text-neutral-300 text-center mb-12 max-w-2xl mx-auto">
        Our curated suite of services is designed for discerning clients who value discretion, efficiency, and expertise. Whether you're acquiring, selling, or building a global portfolio, we ensure a seamless luxury real estate experience at every touchpoint.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-screen-2xl mx-auto">
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