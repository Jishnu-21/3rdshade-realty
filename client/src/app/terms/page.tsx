'use client';

import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-900 via-black to-pink-900">
      <Header onEnquire={() => {}} />
      <main className="flex-1 max-w-6xl mx-auto px-4 py-16 text-white font-montserrat mt-12 mb-12">
        <h1 className="text-4xl font-extrabold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Terms &amp; Conditions</h1>
        <p className="text-sm text-gray-400 mb-2">Effective Date: July 2025</p>
        <p className="mb-4">Welcome to Third Shade Realty (“Company”, “we”, “us”, or “our”). These Terms &amp; Conditions (“Terms”) govern your access to and use of the website <span className="underline">www.thirdshaderealty.com</span> (the “Website”) and the services we provide (collectively, the “Services”).</p>
        <p className="mb-4">By accessing or using this Website, you agree to comply with and be bound by these Terms. If you do not agree with any part of these Terms, please do not use our Website or Services.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">1. Use of the Website</h2>
        <p className="mb-4">The Website is intended to provide information about our services and enable you to engage with our team. You agree to use the Website for lawful purposes only and not to engage in any activity that could damage, disable, or impair the Website or interfere with any other user’s experience.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">2. Services We Provide</h2>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Website design and development</li>
          <li>Social media strategy and management</li>
          <li>Branding and identity creation</li>
          <li>Digital advertising and performance marketing</li>
          <li>[Insert any other specific services provided]</li>
        </ul>
        <p className="mb-4">All service engagements are governed by a separate written agreement outlining scope, deliverables, timelines, and fees.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">3. Intellectual Property</h2>
        <p className="mb-4">All content on this Website — including but not limited to text, graphics, images, videos, layout, and design — is the property of Third Shade Realty or its licensors and is protected by applicable intellectual property laws.<br/>You may not copy, reproduce, distribute, or create derivative works from any content on the Website without prior written permission from the Company.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">4. Confidentiality</h2>
        <p className="mb-4">Any information shared with us during your engagement, including but not limited to business strategy, login credentials, campaign data, or internal documents, will be treated as confidential.<br/>Both parties agree to maintain confidentiality unless required by law or authorized in writing.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">5. Payments and Invoicing</h2>
        <p className="mb-2">All payments for services will follow the structure agreed upon in the service contract. Invoices will be sent to the billing contact provided by the client.</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Payment terms: [Insert payment terms here]</li>
          <li>Accepted methods of payment: [Insert methods here]</li>
        </ul>
        <p className="mb-4">Late payments may incur interest charges as specified in the agreement.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">6. Data Collection and Use</h2>
        <p className="mb-4">By using our Website or Services, you agree to our <a href="/privacy" className="underline text-pink-300">Privacy Policy</a> which outlines how we collect, use, and protect your data. You are responsible for reviewing the Privacy Policy and ensuring that you understand your rights.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">7. Third-Party Tools and Platforms</h2>
        <p className="mb-4">Our services may include use of or integration with third-party platforms such as [Insert Examples]. Each platform is governed by its own terms of use, and we are not responsible for any changes, downtime, or limitations on those platforms.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">8. Termination</h2>
        <p className="mb-4">We reserve the right to suspend or terminate your access to the Website or our Services, with or without notice, if you violate these Terms or the terms of any service agreement.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">9. Limitation of Liability</h2>
        <p className="mb-4">To the fullest extent permitted by law, we shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our Website or Services.<br/>Our total liability shall be limited to the amount paid for the services in question.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">10. Governing Law</h2>
        <p className="mb-4">These Terms shall be governed by and interpreted in accordance with the laws of [Insert Country]. Any disputes arising under or in connection with these Terms shall be subject to the exclusive jurisdiction of the courts of [Insert City].</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">11. Changes to These Terms</h2>
        <p className="mb-4">We may update these Terms from time to time. Any changes will be posted on this page with an updated effective date. You are responsible for reviewing these Terms periodically.</p>
        <h2 className="text-xl font-semibold mt-8 mb-2 text-purple-300">12. Contact</h2>
        <p className="mb-2">If you have any questions or concerns about these Terms &amp; Conditions, you may contact us at:</p>
        <ul className="list-disc ml-6 mb-4 text-gray-300">
          <li>Email: [Insert Email]</li>
          <li>Phone: [Insert Contact Number]</li>
          <li>Business Address: [Insert Address]</li>
        </ul>
      </main>
      <Footer />
    </div>
  );
} 