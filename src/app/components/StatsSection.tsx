'use client';

import React from 'react';

const StatItem = ({ number, label }: { number: string; label: string }) => (
  <div className="flex flex-col items-center justify-center p-4">
    <div className="text-white text-4xl md:text-5xl lg:text-6xl font-bold mb-2">
      {number}
    </div>
    <div className="text-white text-lg md:text-xl text-center">
      {label}
    </div>
  </div>
);

const StatsSection = () => {
  const stats = [
    { number: '12', label: 'Exclusive Properties' },
    { number: '$50M+', label: 'Average Property Value' },
    { number: '100%', label: 'Client Satisfaction' },
    { number: '25+', label: 'Years Experience' },
  ];

  return (
    <section className="relative w-full py-20 flex items-center justify-center">
      {/* <div className="absolute inset-0 bg-black opacity-50 z-[-1]"></div> Dark overlay for readability */}
      <div className="relative z-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {stats.map((stat, index) => (
          <StatItem key={index} number={stat.number} label={stat.label} />
        ))}
      </div>
    </section>
  );
};

export default StatsSection; 