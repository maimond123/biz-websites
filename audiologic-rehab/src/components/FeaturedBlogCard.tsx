"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Props = {
  href: string;
  title: string;
  subtitle: string;
  imagePath: string; // public path
};

export default function FeaturedBlogCard({ href, title, subtitle, imagePath }: Props) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;
    img.onload = () => setIsLoading(false);
  }, [imagePath]);

  return (
    <Link href={href} className="group rounded-xl overflow-hidden border border-gray-200 hover:border-cyan-500 transition-colors">
      <div className="relative aspect-[16/9] bg-gray-100">
        {isLoading && (
          <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200" />
        )}
        <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url('${imagePath}')`, opacity: isLoading ? 0 : 1, transition: "opacity 300ms ease" }} />
      </div>
      <div className="p-5">
        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-cyan-800">{title}</h3>
        <p className="mt-1 text-sm text-gray-600">{subtitle}</p>
        <div className="mt-3 text-cyan-700 group-hover:text-cyan-800 text-sm font-medium">Read article →</div>
      </div>
    </Link>
  );
}


