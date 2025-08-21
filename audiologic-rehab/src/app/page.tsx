import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div 
        className="relative min-h-[calc(100vh-5rem)] md:min-h-[calc(100vh-5rem)] flex items-center bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/assets/hero.png')"
        }}
      >
        {/* Subtle vignette to improve text contrast at edges */}
        <div className="pointer-events-none absolute inset-0 bg-black/10"></div>
        
        {/* Hero content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            {/* Content card */}
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 md:p-10 shadow-xl ring-1 ring-black/5">
              {/* Tagline */}
              <div className="text-cyan-600 text-xs md:text-sm font-semibold tracking-[0.15em] uppercase mb-5">
                COMMUNICATION • SUPPORT • TECHNOLOGY
              </div>
              
              {/* Main heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Helping Ease Your Hearing Challenges
              </h1>
              
              {/* Subtitle */}
              <p className="text-base md:text-lg text-gray-600 mb-8">
                Hearing Health, Tailored For You. Join Audiologic Rehab of America.
              </p>
              
              {/* CTA Button */}
              <Link 
                href="/book" 
                className="inline-flex items-center justify-center bg-cyan-600 hover:bg-cyan-700 text-white px-6 md:px-8 py-3 rounded-full text-base md:text-lg font-semibold transition-colors shadow-lg"
              >
                Book Demo
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}