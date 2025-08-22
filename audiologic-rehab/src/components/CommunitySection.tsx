"use client";

import Link from "next/link";
import FeaturedBlogCard from "@/components/FeaturedBlogCard";
import { Check } from "lucide-react";
import { useEffect, useState } from "react";

export default function CommunitySection() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onFinish = () => setShow(true);
    // If user lands mid-page, show immediately after short delay
    const timeout = setTimeout(() => setShow(true), 3000);
    window.addEventListener('approach:finished', onFinish, { once: true } as any);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener('approach:finished', onFinish as any);
    };
  }, []);

  return (
    <section
      aria-labelledby="home-community-title"
      className={`px-4 sm:px-6 lg:px-8 mt-12 transition-all duration-700 ease-out ${
        show ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
    >
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
  );
}


