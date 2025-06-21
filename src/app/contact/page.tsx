import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-black flex flex-col">
      <Header />
      {/* Glowing Gradient slightly higher and wider */}
      <div className="pointer-events-none absolute right-0 top-10 w-1/2 h-40 z-0">
        <div className="absolute right-0 top-0 h-full w-2/3 rounded-full blur-3xl opacity-70 bg-gradient-to-br from-rose-500 via-purple-500 to-cyan-400"></div>
      </div>
      <main className="flex-1 min-h-screen flex flex-col md:flex-row items-stretch justify-between max-w-screen-2xl mx-auto w-full px-4 md:px-12 pt-32 pb-20 relative z-10">
        {/* Left: Large Text */}
        <div className="flex-1 flex flex-col justify-center">
          <h1 className="text-white text-[clamp(2.5rem,10vw,7.5rem)] leading-[0.95] font-light tracking-tight whitespace-pre-line" style={{fontFamily: 'Inter, Arial, Helvetica, sans-serif'}}>
            {`JUST A CLICK\nAWAY FROM\n3RD SHADE`}<span className="align-super text-[0.5em] ml-2"></span>
          </h1>
        </div>
        {/* Right: Contact Info - align to far right */}
        <div className="w-full md:w-[420px] flex flex-col justify-center gap-12 text-white text-sm md:text-base font-medium z-10 md:items-end md:text-right md:ml-auto">
          <div>
            <div className="uppercase text-xs text-neutral-400 mb-2 tracking-widest">Get in touch</div>
            <div className="font-bold text-white">INFO@3RDSHADE.IN<br />+91 826 296 5961</div>
          </div>
          <div>
            <div className="uppercase text-xs text-neutral-400 mb-2 tracking-widest">Our address</div>
            <div className="font-bold text-white">3RD SHADE MEDIA<br />KORE ROAD<br />PUNE, MAHARASTRA<br />INDIA<br />411001</div>
          </div>
          <div>
            <div className="uppercase text-xs text-neutral-400 mb-2 tracking-widest">Connect with us</div>
            <div className="font-bold text-white flex flex-col gap-1 md:items-end md:text-right">
              <a href="#" className="hover:underline">Instagram<span className="ml-1">↗</span></a>
              <a href="#" className="hover:underline">LinkedIn<span className="ml-1">↗</span></a>
              <a href="#" className="hover:underline">Youtube<span className="ml-1">↗</span></a>
              <a href="#" className="hover:underline">Behence<span className="ml-1">↗</span></a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 