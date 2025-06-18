'use client';

const VIDEO_URL = "https://videos.pexels.com/video-files/5838634/5838634-uhd_2560_1440_30fps.mp4";

const CallToAction = () => (
  <section className="relative w-full h-[400px] flex items-center justify-center overflow-hidden">
    {/* Background Video */}
    <video
      src={VIDEO_URL}
      autoPlay
      loop
      muted
      playsInline
      className="absolute inset-0 w-full h-full object-cover z-[-2]"
    />
    <div className="absolute inset-0 bg-black opacity-60 z-[-1]" />
    <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 text-center">
      <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg">
        Ready to Find Your Dream Property?
      </h2>
      <p className="text-white text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow">
        Let our experts guide you to the perfect luxury home that exceeds your expectations.
      </p>
      <div className="flex flex-col md:flex-row gap-4 justify-center">
        <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300">
          Schedule Consultation
        </button>
        <button className="border-2 border-white text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:bg-white hover:text-black transition-all duration-300">
          View All Properties
        </button>
      </div>
    </div>
  </section>
);

export default CallToAction; 