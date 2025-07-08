'use client';

import React from 'react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <Header onEnquire={() => {}} />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 text-white font-montserrat mt-12 mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Privacy Policy</h1>
        <p className="text-sm text-gray-400 mb-2">Effective Date: [Insert Date]</p>
        <p className="mb-4">Welcome to Third Shade Realty. We are a global digital marketing and creative solutions agency serving the real estate industry and its ecosystem. Our services include (but are not limited to) website design and development, social media marketing, branding, content creation, and digital performance advertising. Third Shade Realty and its affiliates (collectively, "Third Shade," "we," "our," or "us") provide access to www.thirdshaderealty.com (the "Website") and related platforms, tools, and services (the "Services").</p>
        <p className="mb-4">By accessing or using our Services, you agree to the terms of this Privacy Policy. If you do not agree, please refrain from using our Website or engaging with our digital platforms.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Why We Collect Your Information</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Provide and personalize our services based on your preferences or business needs</li>
          <li>Help you access relevant information, solutions, or platforms within your region</li>
          <li>Communicate updates, service changes, or marketing information that may be of interest</li>
          <li>Analyze usage patterns, improve performance, and optimize your digital experience</li>
          <li>Facilitate connections with service teams or consultants, where relevant</li>
        </ul>
        <p className="mb-4">Our aim is to deliver efficient, customized, and measurable marketing outcomes while maintaining transparency in how we handle your data.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">To Whom This Policy Applies</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Clients: Businesses or individuals engaging with our services for marketing, branding, web, or media support</li>
          <li>Partners & Vendors: Companies or contractors we collaborate with for campaigns, development, or delivery of services</li>
          <li>Website Users: Any visitor to our platforms, regardless of commercial relationship</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">What Information We Collect</h2>
        <p className="font-semibold mt-4 mb-1">From All Visitors:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Cookies and similar tracking technologies</li>
          <li>Web beacons, session logs, and browser metadata</li>
          <li>IP address, browser type, referring URLs, and pages visited</li>
        </ul>
        <p className="mb-4">We use this data for service delivery, analytics, optimization, and digital performance evaluation.</p>
        <p className="font-semibold mt-4 mb-1">Personal Information You Provide:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Name, email address, phone number</li>
          <li>Company name and contact preferences</li>
          <li>Inquiry details, business goals, or campaign specifications</li>
          <li>Profile photos (if submitted via social platforms or custom portals)</li>
        </ul>
        <p className="mb-4">This data is used solely to provide, improve, or personalize our services and communications with you.</p>
        <p className="font-semibold mt-4 mb-1">From Our Clients (Business Accounts):</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Billing and invoicing details</li>
          <li>Campaign briefs and creative material</li>
          <li>Social media and website access credentials (shared securely and only with authorization)</li>
        </ul>
        <p className="mb-4">This information is used only for the execution of agreed-upon services.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Use of Cookies and Tracking Technologies</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Maintain session data and website functionality</li>
          <li>Remember your login and preferences</li>
          <li>Track analytics for website improvement</li>
          <li>Deliver performance-based advertising across platforms</li>
        </ul>
        <p className="mb-4">You may disable cookies through your browser settings, although certain Services may function sub-optimally as a result.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">How We Use and Share Information</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Fulfill service requests and deliver contracted solutions</li>
          <li>Communicate updates or campaigns relevant to your inquiry or engagement</li>
          <li>Conduct performance analysis or retargeting (with your consent)</li>
          <li>Comply with legal or regulatory requirements when necessary</li>
        </ul>
        <p className="mb-4">We do not sell your personal data. However, we may share data with:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Trusted service providers (e.g., hosting, billing, analytics)</li>
          <li>Marketing platforms (e.g., Meta, Google Ads) strictly for performance-based campaigns</li>
          <li>Legal authorities when disclosure is legally mandated</li>
        </ul>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Data Security and Storage</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>SSL encryption during sensitive transmissions</li>
          <li>Secure password and access protocols</li>
          <li>Internal process audits and access controls</li>
        </ul>
        <p className="mb-4">Please note that while we take security seriously, no transmission method is 100% secure.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Third-Party Links</h2>
        <p className="mb-4">Our Website may contain links to external websites. We are not responsible for the privacy practices or content of those websites. We encourage you to review their privacy policies before engaging with them.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Global Users and Data Transfers</h2>
        <p className="mb-4">As we operate globally, your data may be transferred to and processed in countries outside of your residence. By using our Services, you consent to such transfers, subject to applicable data protection laws.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Updates to This Policy</h2>
        <p className="mb-4">We may update this Privacy Policy from time to time. When we do, the "Effective Date" at the top will be updated. We encourage you to review this page periodically.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">Contact Us</h2>
        <p className="mb-2">For questions regarding this Privacy Policy or to request data deletion, correction, or access, please contact:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Email: <a href="mailto:support@thirdshaderealty.com" className="underline">support@thirdshaderealty.com</a></li>
          <li>Website: <a href="https://www.thirdshaderealty.com" className="underline" target="_blank" rel="noopener noreferrer">www.thirdshaderealty.com</a></li>
        </ul>
      </main>
      <Footer />
    </div>
  );
} 