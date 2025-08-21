import Link from "next/link";
import ApproachTimeline from "@/components/ApproachTimeline";
import { Check } from "lucide-react";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";

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
            <div className="bg-white/95 backdrop-blur rounded-2xl p-8 md:p-10 shadow-xl ring-1 ring-black/5 animate-fade-in-up" style={{ animationDelay: "120ms" }}>
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

      {/* Our Approach Timeline */}
      <ApproachTimeline />

      {/* Community + Blog (single feature) */}
      <section aria-labelledby="home-community-title" className="px-4 sm:px-6 lg:px-8 mt-12">
        <div className="mx-auto max-w-7xl">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
            <div className="mb-6">
              <div className="text-xs font-semibold tracking-[0.12em] text-cyan-700 uppercase">Community & Learning</div>
              <h2 id="home-community-title" className="mt-2 text-2xl md:text-3xl font-semibold text-gray-900">Join our Community</h2>
              <p className="mt-3 text-gray-600 text-sm md:text-base">Progress is faster together. Get small-group practice, personalized plans, and resources you can use every day.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6">
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Peer support and accountability</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Personalized plans to fit your goals</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Device coaching for real-world outcomes</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-gray-700">
                  <Check className="w-4 h-4 text-cyan-600 mt-0.5" />
                  <span>Strategies for home, work, and in noise</span>
                </li>
              </ul>

              {/* Featured Blog Card */}
              <FeaturedBlogCard
                href="/blog/understanding-hearing-rehabilitation"
                title="Understanding Hearing Rehabilitation"
                subtitle="Core principles and practical guidance for improving communication."
                imagePath="/videos/hero-option-2.jpg"
              />
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href="/book" className="inline-flex items-center justify-center rounded-full bg-cyan-600 hover:bg-cyan-700 text-white px-5 py-2.5 text-sm font-semibold">Join Us</Link>
              <Link href="/blog" className="text-sm underline text-gray-700">Visit the Blog</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}