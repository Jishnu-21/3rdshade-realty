import React, { useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import Image from 'next/image';

interface EnquireFormProps {
  open: boolean;
  onClose: () => void;
  propertyName?: string;
  onSubmit?: (form: any) => Promise<void> | void;
}

const defaultCountryList = [
  'India', 'United States', 'United Kingdom', 'UAE', 'Canada', 'Australia', 'Singapore', 'Germany', 'France', 'China', 'Japan', 'South Africa', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Russia', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Turkey', 'Brazil', 'Other'
];

const countryCodeList = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'United States' },
  { code: '+44', country: 'United Kingdom' },
  { code: '+971', country: 'UAE' },
  { code: '+61', country: 'Australia' },
  { code: '+65', country: 'Singapore' },
  { code: '+49', country: 'Germany' },
  { code: '+33', country: 'France' },
  { code: '+81', country: 'Japan' },
  { code: '+27', country: 'South Africa' },
  { code: '+966', country: 'Saudi Arabia' },
  { code: '+974', country: 'Qatar' },
  { code: '+965', country: 'Kuwait' },
  { code: '+968', country: 'Oman' },
  { code: '+973', country: 'Bahrain' },
  { code: '+7', country: 'Russia' },
  { code: '+39', country: 'Italy' },
  { code: '+34', country: 'Spain' },
  { code: '+31', country: 'Netherlands' },
  { code: '+41', country: 'Switzerland' },
  { code: '+90', country: 'Turkey' },
  { code: '+55', country: 'Brazil' },
  { code: '+86', country: 'China' },
  { code: '+61', country: 'Australia' },
  { code: '+1', country: 'Canada' },
  { code: '+other', country: 'Other' },
];

const EnquireForm: React.FC<EnquireFormProps> = ({ open, onClose, propertyName, onSubmit }) => {
  const [enquireStep, setEnquireStep] = useState(1);
  const [enquireForm, setEnquireForm] = useState({
    name: '',
    email: '',
    phone: '',
    countryCode: '+91',
    contactMethod: 'WhatsApp',
    inIndia: '',
    country: '',
    visitType: '',
    date: '',
    time: '',
    buyTimeline: '',
  });
  const [enquireFormSuccess, setEnquireFormSuccess] = useState('');
  const [enquireFormError, setEnquireFormError] = useState('');
  const [enquireFormLoading, setEnquireFormLoading] = useState(false);
  const countryList = defaultCountryList;

  const handleEnquireInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setEnquireForm({ ...enquireForm, [name]: value });
  };
  const handleEnquireNext = () => setEnquireStep(s => Math.min(s + 1, 2));
  const handleEnquireBack = () => setEnquireStep(s => Math.max(s - 1, 1));
  const handleEnquireSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setEnquireFormSuccess('');
    setEnquireFormError('');
    setEnquireFormLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(enquireForm);
        setEnquireFormSuccess('Your enquiry was submitted successfully!');
        setTimeout(() => {
          onClose();
          setEnquireStep(1);
          setEnquireForm({
            name: '',
            email: '',
            phone: '',
            countryCode: '+91',
            contactMethod: 'WhatsApp',
            inIndia: '',
            country: '',
            visitType: '',
            date: '',
            time: '',
            buyTimeline: '',
          });
          setEnquireFormSuccess('');
        }, 2000);
      } else {
        setTimeout(() => {
          setEnquireFormLoading(false);
          setEnquireFormSuccess('Your enquiry was submitted successfully!');
          setTimeout(() => {
            onClose();
            setEnquireStep(1);
            setEnquireForm({
              name: '',
              email: '',
              phone: '',
              countryCode: '+91',
              contactMethod: 'WhatsApp',
              inIndia: '',
              country: '',
              visitType: '',
              date: '',
              time: '',
              buyTimeline: '',
            });
            setEnquireFormSuccess('');
          }, 1500);
        }, 1200);
        return;
      }
    } catch (err) {
      setEnquireFormError('There was an error submitting your enquiry. Please try again.');
    } finally {
      setEnquireFormLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
      <div className="bg-gradient-to-br from-purple-900/90 via-black/90 to-pink-900/90 rounded-3xl shadow-2xl p-1 sm:p-3 md:p-5 lg:p-8 w-full 
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
        relative animate-fadeIn border border-purple-700/40">
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-full px-6 py-2 shadow-lg text-white font-bold text-lg tracking-wide animate-fadeInUp">Enquire Now</div>
        <button className="absolute top-4 right-4 text-white bg-gradient-to-r from-purple-600 to-pink-500 rounded-full p-2 shadow-lg hover:scale-110 transition-all duration-200" onClick={() => { onClose(); setEnquireStep(1); }}>
          <FaTimes size={20} />
        </button>
        <div className="flex flex-col items-center mb-4 pt-8">
          <Image src="/logos/logo3.png" alt="3rdshade Logo" width={120} height={40} className="mb-2 drop-shadow-lg" />
          {propertyName && <div className="text-white text-center text-base font-semibold mb-2">For: {propertyName}</div>}
        </div>
        {enquireFormSuccess && <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-sm text-center shadow">{enquireFormSuccess}</div>}
        {enquireFormError && <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-sm text-center shadow">{enquireFormError}</div>}
        <form onSubmit={handleEnquireSubmit} className="flex flex-col gap-6 px-2 sm:px-4 md:px-6 pb-4 sm:pb-6">
          {/* Stepper */}
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2].map(step => (
              <div key={step} className={`w-8 h-2 rounded-full transition-all duration-300 shadow ${enquireStep === step ? 'bg-gradient-to-r from-purple-600 to-pink-500' : 'bg-neutral-800/80'}`}></div>
            ))}
          </div>
          {/* Step 1: Basic Info */}
          {enquireStep === 1 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <input type="text" name="name" placeholder="Name" value={enquireForm.name} onChange={handleEnquireInputChange} className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm placeholder:text-purple-200/60 text-xs sm:text-sm md:text-base" required />
              <input type="email" name="email" placeholder="Email" value={enquireForm.email} onChange={handleEnquireInputChange} className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm placeholder:text-purple-200/60 text-xs sm:text-sm md:text-base" required />
              <div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <select
                    name="countryCode"
                    value={enquireForm.countryCode}
                    onChange={handleEnquireInputChange}
                    className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm w-full sm:w-1/3 text-xs sm:text-sm md:text-base"
                    required
                  >
                    {countryCodeList.map(opt => (
                      <option key={opt.code} value={opt.code}>{opt.code} ({opt.country})</option>
                    ))}
                  </select>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="Phone number"
                    value={enquireForm.phone}
                    onChange={handleEnquireInputChange}
                    className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm w-full sm:w-2/3 text-xs sm:text-sm md:text-base"
                    required
                  />
                </div>
              </div>
              <label className="text-sm text-purple-200/80 font-semibold mt-2">Preferred contact method</label>
              <div className="flex gap-3">
                {['WhatsApp', 'Email', 'Phone'].map(method => (
                  <label key={method} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.contactMethod === method ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                    <input type="radio" name="contactMethod" value={method} checked={enquireForm.contactMethod === method} onChange={handleEnquireInputChange} className="hidden" />
                    {method}
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Step 2: Property Visit Preferences */}
          {enquireStep === 2 && (
            <div className="flex flex-col gap-4 animate-fadeIn">
              <label className="text-sm text-purple-200/80 font-semibold">Are you currently in India?</label>
              <div className="flex gap-3">
                {['Yes', 'No'].map(val => (
                  <label key={val} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.inIndia === val ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                    <input type="radio" name="inIndia" value={val} checked={enquireForm.inIndia === val} onChange={handleEnquireInputChange} className="hidden" />
                    {val}
                  </label>
                ))}
              </div>
              <label className="text-sm text-purple-200/80 font-semibold">Select the country</label>
              <select name="country" value={enquireForm.country} onChange={handleEnquireInputChange} className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm text-xs sm:text-sm md:text-base">
                <option value="">Select Country</option>
                {countryList.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <label className="text-sm text-purple-200/80 font-semibold">Type of visit</label>
              <div className="flex gap-3">
                {['Virtual', 'Physical'].map(type => (
                  <label key={type} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.visitType === type ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                    <input type="radio" name="visitType" value={type} checked={enquireForm.visitType === type} onChange={handleEnquireInputChange} className="hidden" />
                    {type}
                  </label>
                ))}
              </div>
              <label className="text-sm text-purple-200/80 font-semibold">Preferred Date & Time</label>
              <div className="flex gap-2">
                <input type="date" name="date" value={enquireForm.date} onChange={handleEnquireInputChange} className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm cursor-pointer text-xs sm:text-sm md:text-base" required />
                <input type="time" name="time" value={enquireForm.time} onChange={handleEnquireInputChange} className="px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 rounded-xl bg-neutral-900/80 text-white border border-purple-700/40 focus:outline-none focus:border-pink-500 shadow-sm cursor-pointer text-xs sm:text-sm md:text-base" required />
              </div>
              <label className="text-sm text-purple-200/80 font-semibold">How soon are you looking to buy?</label>
              <div className="flex flex-wrap gap-2">
                {['Immediately', '1–3 Months', '3–6 Months', 'Just Exploring'].map(opt => (
                  <label key={opt} className={`px-4 py-2 rounded-full cursor-pointer font-semibold transition-all duration-200 shadow-sm ${enquireForm.buyTimeline === opt ? 'bg-gradient-to-r from-purple-600 to-pink-500 text-white' : 'bg-neutral-900/80 text-purple-200/80 hover:bg-neutral-800/80'}`}>
                    <input type="radio" name="buyTimeline" value={opt} checked={enquireForm.buyTimeline === opt} onChange={handleEnquireInputChange} className="hidden" />
                    {opt}
                  </label>
                ))}
              </div>
            </div>
          )}
          {/* Step Navigation */}
          <div className="flex justify-between mt-2">
            {enquireStep > 1 ? (
              <button type="button" onClick={handleEnquireBack} className="px-6 py-2 rounded-full bg-neutral-900/80 text-purple-200/80 font-semibold transition-all duration-200 cursor-pointer hover:bg-neutral-800/80 hover:scale-105 shadow">Back</button>
            ) : <div />}
            {enquireStep < 2 ? (
              <button type="button" onClick={handleEnquireNext} className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg">Next</button>
            ) : (
              <button type="submit" className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-600 to-pink-500 text-white font-semibold transition-all duration-200 cursor-pointer shadow-md hover:scale-105 hover:shadow-lg" disabled={enquireFormLoading}>
                {enquireFormLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Submitting...
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquireForm; 