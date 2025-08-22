"use client";

import { useState } from "react";

export default function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`New inquiry from ${name || "Website Visitor"}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:info@audiologicrehab.com?subject=${subject}&body=${body}`;
  };

  return (
    <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="mb-8 text-center">
        <div className="text-xs font-semibold tracking-[0.12em] text-cyan-700 uppercase">Get in touch</div>
        <h1 className="mt-2 text-3xl md:text-4xl font-extrabold text-gray-900">Contact Us</h1>
        <p className="mt-3 text-gray-600">Have a question about services, plans, or getting started? Send us a note.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-6 md:p-10">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-600 focus:border-cyan-600"
              placeholder="Your name"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-600 focus:border-cyan-600"
              placeholder="you@example.com"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <textarea
              id="message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:ring-cyan-600 focus:border-cyan-600"
              placeholder="How can we help?"
              required
            />
          </div>
          <div className="pt-2">
            <button type="submit" className="inline-flex items-center justify-center rounded-full bg-cyan-600 hover:bg-cyan-700 text-white px-6 py-2.5 text-sm font-semibold">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}


