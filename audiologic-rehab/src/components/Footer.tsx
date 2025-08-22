import Image from "next/image";
import Link from "next/link";  


export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100">
      <div className="w-full max-w-5xl mx-auto px-4 py-8 flex flex-col items-center">
        <Image
          src="/assets/fulllogo_transparent.png"
          alt="Audiologic Rehab of America full logo"
          width={600}
          height={200}
          priority
          className="h-auto w-72 sm:w-80 md:w-96 lg:w-[24rem] xl:w-[36rem] select-none pointer-events-none"
        />

        <nav className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-xs text-gray-500">
          <Link href="/" className="hover:text-gray-700">Home</Link>
          <span className="text-gray-300">•</span>
          <Link href="/services" className="hover:text-gray-700">Services</Link>
          <span className="text-gray-300">•</span>
          <Link href="/blog" className="hover:text-gray-700">Blog</Link>
          <span className="text-gray-300">•</span>
          <Link href="/contact" className="hover:text-gray-700">Contact</Link>
          <span className="text-gray-300">•</span>
          <Link href="/book" className="hover:text-gray-700">Demo Today</Link>
        </nav>
      </div>
    </footer>
  );
}


