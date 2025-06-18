'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left Side: Image/Gradient, Logo, Text */}
      <div className="md:w-1/2 w-full flex flex-col justify-between bg-gradient-to-br from-purple-700 to-pink-600 p-8 rounded-b-3xl md:rounded-b-none md:rounded-l-3xl">
        <div className="flex flex-col h-full justify-between">
          <div className="flex justify-between items-center mb-8">
            <Image src="/logos/logo.png" alt="3RD SHADE Logo" width={120} height={32} className="object-contain w-full max-w-[120px]" />
            <Link href="/" className="bg-white/20 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-white/30 transition flex items-center gap-2">
              Back to website
              <span className="ml-1">→</span>
            </Link>
          </div>
          <div className="flex-1 flex flex-col justify-end pb-8">
            <Image src="/images/register-side.jpg" alt="Register Visual" width={400} height={300} className="rounded-2xl w-full max-w-full object-cover mb-8" />
            <h3 className="text-white text-2xl font-semibold mb-2">Capturing Moments, Creating Memories</h3>
          </div>
        </div>
      </div>
      {/* Right Side: Form */}
      <div className="md:w-1/2 w-full flex items-center justify-center bg-black p-8">
        <div className="w-full max-w-md">
          <h2 className="text-4xl font-bold text-white mb-2">Create an account</h2>
          <p className="mb-6 text-neutral-300">Already have an account? <Link href="/login" className="text-purple-300 hover:text-pink-300 underline">Log in</Link></p>
          <form className="space-y-5">
            <div className="flex gap-3">
              <input type="text" placeholder="First name" className="flex-1 rounded-md bg-[#23202b] border border-[#3a3350] text-white px-4 py-3 focus:outline-none focus:border-pink-400" />
              <input type="text" placeholder="Last name" className="flex-1 rounded-md bg-[#23202b] border border-[#3a3350] text-white px-4 py-3 focus:outline-none focus:border-pink-400" />
            </div>
            <input type="email" placeholder="Email" className="w-full rounded-md bg-[#23202b] border border-[#3a3350] text-white px-4 py-3 focus:outline-none focus:border-pink-400" />
            <input type="password" placeholder="Enter your password" className="w-full rounded-md bg-[#23202b] border border-[#3a3350] text-white px-4 py-3 focus:outline-none focus:border-pink-400" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id="terms" className="accent-pink-500" />
              <label htmlFor="terms" className="text-neutral-300 text-sm">I agree to the <a href="#" className="underline text-purple-300 hover:text-pink-300">Terms & Conditions</a></label>
            </div>
            <button type="submit" className="w-full py-3 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold shadow-md hover:from-purple-700 hover:to-pink-700 transition-colors">Create account</button>
          </form>
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-neutral-700" />
            <span className="mx-4 text-neutral-400 text-sm">Or register with</span>
            <div className="flex-1 h-px bg-neutral-700" />
          </div>
          <div className="flex gap-4">
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-600 rounded-lg py-3 text-white hover:bg-neutral-800 transition"><img src="/icons/google.svg" alt="Google" className="w-5 h-5" /> Google</button>
            <button className="flex-1 flex items-center justify-center gap-2 border border-neutral-600 rounded-lg py-3 text-white hover:bg-neutral-800 transition"><img src="/icons/apple.svg" alt="Apple" className="w-5 h-5" /> Apple</button>
          </div>
        </div>
      </div>
    </div>
  );
} 