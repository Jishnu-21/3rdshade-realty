import React, { useState } from 'react';
import { FaTimes, FaUser, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import Image from 'next/image';

interface PayNowFormProps {
  open: boolean;
  onClose: () => void;
  propertyName?: string;
  onSubmit?: (form: any) => Promise<void> | void;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

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

const PayNowForm: React.FC<PayNowFormProps> = ({ open, onClose, propertyName, onSubmit, isLoading: externalLoading, successMessage, errorMessage }) => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', countryCode: '+91', address: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');
    setIsLoading(true);
    try {
      if (onSubmit) {
        await onSubmit(form);
        setFormSuccess('Your payment was submitted successfully!');
        setTimeout(() => {
          onClose();
          setForm({ name: '', email: '', phone: '', countryCode: '+91', address: '' });
          setFormSuccess('');
        }, 2000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setFormSuccess('Your payment was submitted successfully!');
          setTimeout(() => {
            onClose();
            setForm({ name: '', email: '', phone: '', countryCode: '+91', address: '' });
            setFormSuccess('');
          }, 1500);
        }, 1200);
        return;
      }
    } catch (err) {
      setFormError('There was an error submitting your payment. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
      <div className="bg-gradient-to-br from-purple-900/90 to-black/90 rounded-2xl shadow-2xl p-1 sm:p-3 md:p-5 lg:p-8 w-full 
        max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl 
        relative animate-fadeIn border border-purple-700/40 max-h-[95vh] overflow-y-auto">
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => onClose()}>
          <FaTimes size={20} className="sm:w-[22px] sm:h-[22px]" />
        </button>
        <div className="flex flex-col items-center pt-6 sm:pt-8 pb-2 px-4 sm:px-8">
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-2 text-center bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent px-2">Secure Your Property</h2>
          <p className="text-gray-300 text-center mb-4 text-xs sm:text-sm px-2">Fill in your details to proceed with your interest{propertyName && <span> in <span className="font-bold text-white">{propertyName}</span></span>}.</p>
          <div className="w-full bg-gradient-to-r from-purple-700/60 to-pink-700/60 rounded-xl p-[2px] mb-4 sm:mb-6">
            <div className="bg-black/80 rounded-xl p-3 sm:p-4 flex flex-col gap-1">
              {propertyName && (
                <div className="flex items-center gap-2">
                  <FaMapMarkerAlt className="text-purple-400 text-sm sm:text-base flex-shrink-0" />
                  <span className="text-white font-semibold text-sm sm:text-base break-words">{propertyName}</span>
                </div>
              )}
              {/* You can add more property details here if needed */}
            </div>
          </div>
        </div>
        <div className="px-2 sm:px-4 md:px-8 pb-4 sm:pb-6 md:pb-8">
          {formError || errorMessage ? (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm break-words">{formError || errorMessage}</div>
          ) : null}
          {formSuccess || successMessage ? (
            <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm break-words">{formSuccess || successMessage}</div>
          ) : null}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4 md:gap-5">
            <div className="relative">
              <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-xs sm:text-sm md:text-base"
                required
                disabled={isLoading || externalLoading}
              />
            </div>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-xs sm:text-sm md:text-base"
                required
                disabled={isLoading || externalLoading}
              />
            </div>
            <div className="relative">
              <FaPhoneAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
              <div className="flex flex-col sm:flex-row gap-2 pl-7">
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleInputChange}
                  className="py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-1/3 text-xs sm:text-sm md:text-base"
                  required
                  disabled={isLoading || externalLoading}
                >
                  {countryCodeList.map(opt => (
                    <option key={opt.code} value={opt.code}>{opt.code} ({opt.country})</option>
                  ))}
                </select>
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone number"
                  value={form.phone}
                  onChange={handleInputChange}
                  className="py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-2/3 text-xs sm:text-sm md:text-base"
                  required
                  disabled={isLoading || externalLoading}
                />
              </div>
            </div>
            <div className="relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 -translate-y-1/2 text-purple-400 text-base sm:text-lg" />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleInputChange}
                className="pl-10 pr-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-neutral-900 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full shadow-sm focus:shadow-purple-900/20 transition text-xs sm:text-sm md:text-base"
                required
                disabled={isLoading || externalLoading}
              />
            </div>
            <button
              type="submit"
              className={`w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-base sm:text-lg tracking-wide ${
                isLoading || externalLoading
                  ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-500 text-white hover:scale-105 hover:shadow-lg active:scale-95'
              }`}
              disabled={isLoading || externalLoading}
            >
              {(isLoading || externalLoading) ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span className="text-sm sm:text-base">Submitting...</span>
                </div>
              ) : (
                'Submit'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PayNowForm; 