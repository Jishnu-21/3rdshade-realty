"use client";

import React from "react";
import Link from "next/link";
import { FaLinkedin } from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";
import CallForm from "../components/CallForm";

export default function TalkToExpertsPage() {
  const [showCallForm, setShowCallForm] = React.useState(false);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-900 via-black to-pink-900 text-white font-montserrat flex flex-col">
      <Header onEnquire={() => {}} />
      <div className="mt-8 sm:mt-12" />
      <main className="flex-1 flex flex-col items-center justify-center px-2 sm:px-4 py-16 w-full">
        <div className="w-full max-w-6xl rounded-3xl shadow-2xl p-8 sm:p-10 flex flex-col items-center bg-neutral-900/90 border border-neutral-800">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-6 text-center">Talk to Our Experts</h1>
          <p className="text-lg sm:text-xl text-gray-200 mb-8 text-center">
            Making the right real estate investment can be life-changing. Our experts are here to guide you every step of the way—helping you make informed decisions, avoid costly mistakes, and maximize your returns.
          </p>
          <div className="w-full flex flex-col md:flex-row gap-6 mb-8">
            <div className="bg-neutral-950/80 rounded-xl p-5 flex-1 border border-neutral-800">
              <h2 className="text-xl font-semibold mb-2 text-purple-300">Why Talk to an Expert?</h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2 text-base">
                <li>Personalized advice for your goals and budget</li>
                <li>Latest market trends & investment opportunities</li>
                <li>Guidance through legal, financial, and documentation steps</li>
                <li>Confidence to make the right choice for you and your family</li>
              </ul>
            </div>
            <div className="bg-neutral-950/70 rounded-xl p-5 flex-1 border border-neutral-800">
              <h2 className="text-xl font-semibold mb-2 text-purple-300">Why Invest in Real Estate?</h2>
              <ul className="list-disc list-inside text-gray-200 space-y-2 text-base">
                <li>Build long-term wealth & financial security</li>
                <li>Benefit from appreciation & rental income</li>
                <li>Diversify your portfolio with property assets</li>
              </ul>
            </div>
          </div>
          <div className="w-full flex justify-center my-4">
            <div className="h-px w-2/3 bg-neutral-800" />
          </div>
          <div className="flex flex-col items-center gap-2 w-full">
            <h3 className="text-lg font-semibold text-white mb-1 mt-1">Connect with Our Lead Expert</h3>
            <Link href="https://www.linkedin.com/in/ayyaz-shaikh-1961b5193/?originalSubdomain=in" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 bg-neutral-950/80 border border-purple-700 rounded-full px-4 py-2 hover:bg-purple-900/80 transition-colors">
              <FaLinkedin className="text-blue-400 text-2xl" />
              <span className="font-semibold text-white">Mr. Ayyaz Shaikh, MD 3rdshade</span>
            </Link>
            <button
              className="mt-4 mb-1 bg-gradient-to-r from-purple-600 to-pink-500 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:scale-105 hover:shadow-xl active:scale-95 transition-all text-base sm:text-lg"
              onClick={() => setShowCallForm(true)}
            >
              Book Now
            </button>
            <span className="text-xs text-gray-400 mt-1">(Click to view LinkedIn profile)</span>
          </div>
        </div>
      </main>
      <Footer />
      <CallForm
        open={showCallForm}
        onClose={() => setShowCallForm(false)}
        propertyName="Mr. Ayyaz Shaikh, MD 3rdshade"
      />
    </div>
  );
} 