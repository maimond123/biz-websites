import Link from "next/link";
import Image from "next/image";

export default function NavBar() {
  return (
    <nav className="bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-100">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/assets/icononly_nobuffer.png"
                alt="Audiologic Rehab of America logo"
                width={36}
                height={36}
                className="h-9 w-9 object-contain"
                priority
              />
              <span className="text-xl font-semibold text-gray-900">
                Audiologic Rehab of America
              </span>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 px-3.5 py-2.5 text-[15px] md:text-base font-medium rounded-lg transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Home
            </Link>
            <Link 
              href="/services" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 px-3.5 py-2.5 text-[15px] md:text-base font-medium rounded-lg transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Services
            </Link>
            <Link 
              href="/blog" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 px-3.5 py-2.5 text-[15px] md:text-base font-medium rounded-lg transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Blog
            </Link>
            <Link 
              href="/contact" 
              className="inline-flex items-center text-gray-700 hover:text-gray-900 px-3.5 py-2.5 text-[15px] md:text-base font-medium rounded-lg transition-transform duration-150 hover:scale-105 active:scale-95"
            >
              Contact
            </Link>
            
            {/* Book Online Button */}
            <Link 
              href="/book" 
              className="bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 rounded-full text-base font-semibold transition-colors shadow-md transform-gpu hover:scale-105 active:scale-95"
            >
              Demo Today
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-cyan-500 p-2"
              aria-label="Open menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
