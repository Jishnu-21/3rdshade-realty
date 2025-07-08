import React, { useState } from 'react';
import { FaTimes, FaPhoneAlt } from 'react-icons/fa';

interface CallFormProps {
  open: boolean;
  onClose: () => void;
  propertyName?: string;
  onSubmit?: (form: any) => Promise<void> | void;
  isLoading?: boolean;
  successMessage?: string;
  errorMessage?: string;
}

const defaultCountryList = [
  'India', 'United States', 'United Kingdom', 'UAE', 'Canada', 'Australia', 'Singapore', 'Germany', 'France', 'China', 'Japan', 'South Africa', 'Saudi Arabia', 'Qatar', 'Kuwait', 'Oman', 'Bahrain', 'Russia', 'Italy', 'Spain', 'Netherlands', 'Switzerland', 'Turkey', 'Brazil', 'Other'
];
const defaultTimezoneList = [
  'Asia/Kolkata (IST)',
  'Asia/Dubai (GST)',
  'Europe/London (GMT)',
  'Europe/Paris (CET)',
  'America/New_York (EST)',
  'America/Los_Angeles (PST)',
  'Asia/Singapore (SGT)',
  'Australia/Sydney (AEST)',
  'UTC',
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

const CallForm: React.FC<CallFormProps> = ({ open, onClose, propertyName, onSubmit, isLoading: externalLoading, successMessage, errorMessage }) => {
  const [form, setForm] = useState({ name: '', date: '', time: '', timezone: '', country: '', countryCode: '+91', email: '', phone: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const countryList = defaultCountryList;
  const timezoneList = defaultTimezoneList;

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
        setFormSuccess('Your call booking was submitted successfully!');
        setTimeout(() => {
          onClose();
          setForm({ name: '', date: '', time: '', timezone: '', country: '', countryCode: '+91', email: '', phone: '' });
          setFormSuccess('');
        }, 2000);
      } else {
        setTimeout(() => {
          setIsLoading(false);
          setFormSuccess('Your call booking was submitted successfully!');
          setTimeout(() => {
            onClose();
            setForm({ name: '', date: '', time: '', timezone: '', country: '', countryCode: '+91', email: '', phone: '' });
            setFormSuccess('');
          }, 1500);
        }, 1200);
        return;
      }
    } catch (err) {
      setFormError('There was an error submitting your request. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
      <div className="bg-neutral-900 rounded-xl shadow-2xl p-4 sm:p-8 w-full max-w-md relative animate-fadeIn max-h-[95vh] overflow-y-auto">
        <button className="absolute top-3 right-3 sm:top-4 sm:right-4 text-gray-400 hover:text-white transition-colors duration-200 cursor-pointer scale-100 hover:scale-110 z-10" onClick={() => onClose()}>
          <FaTimes size={18} className="sm:w-5 sm:h-5" />
        </button>
        <div className="flex flex-col items-center mb-4 sm:mb-6 pt-2">
          <FaPhoneAlt className="text-2xl sm:text-3xl text-purple-400 mb-2" />
          <h2 className="text-xl sm:text-2xl font-bold text-center text-white px-2">Book a Video Call Slot</h2>
          {propertyName && <div className="text-white text-center text-base font-semibold mb-2">For: {propertyName}</div>}
        </div>
        {formSuccess || successMessage ? (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/50 rounded-lg text-green-400 text-xs sm:text-sm text-center break-words">{formSuccess || successMessage}</div>
        ) : null}
        {formError || errorMessage ? (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-400 text-xs sm:text-sm text-center break-words">{formError || errorMessage}</div>
        ) : null}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3 sm:gap-4">
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Name</label>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleInputChange}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Country</label>
            <select
              name="country"
              value={form.country}
              onChange={handleInputChange}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base"
              required
            >
              <option value="">Select Country</option>
              {countryList.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Select Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleInputChange}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-full text-sm sm:text-base"
              required
            />
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Select Time & Timezone</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="time"
                name="time"
                value={form.time}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 cursor-pointer w-full sm:w-1/2 text-sm sm:text-base"
                required
              />
              <select
                name="timezone"
                value={form.timezone}
                onChange={handleInputChange}
                className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-1/2 text-sm sm:text-base"
                required
              >
                <option value="">Timezone</option>
                {timezoneList.map(tz => <option key={tz} value={tz}>{tz}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Phone Number</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <select
                name="countryCode"
                value={form.countryCode}
                onChange={handleInputChange}
                className="px-3 py-2.5 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-1/3 text-sm sm:text-base"
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
                value={form.phone}
                onChange={handleInputChange}
                className="px-3 py-2.5 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full sm:w-2/3 text-sm sm:text-base"
                required
              />
            </div>
          </div>
          <div>
            <label className="text-xs sm:text-sm text-gray-300 block mb-1">Your Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleInputChange}
              className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg bg-neutral-800 text-white border border-neutral-700 focus:outline-none focus:border-purple-500 w-full text-sm sm:text-base"
              required
            />
          </div>
          <button 
            type="submit" 
            className={`w-full font-bold py-2.5 sm:py-3 rounded-xl mt-2 transition-all duration-300 cursor-pointer shadow-md text-sm sm:text-base ${
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
              'Book Video Call'
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CallForm; 