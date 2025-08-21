"use client";

import { ServiceIcon } from "@/components/ServiceIcon";
import { useEffect, useRef, useState } from "react";

export default function ApproachTimeline() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [revealedCount, setRevealedCount] = useState(0);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const rows = Array.from(node.querySelectorAll('[data-timeline-row="true"]')) as HTMLElement[];
    if (rows.length === 0) return;

    let hasTriggered = false;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasTriggered) {
            hasTriggered = true;
            // Stagger in each row
            rows.forEach((row, index) => {
              setTimeout(() => {
                setRevealedCount((prev) => Math.max(prev, index + 1));
              }, index * 140);
            });
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);
  const steps = [
    {
      number: 1,
      title: 'Start With Clarity',
      description:
        'Begin with a quick consult to clarify goals and map the best next step for your situation.',
      iconName: 'stethoscope',
    },
    {
      number: 2,
      title: 'Design Your Plan',
      description:
        'Collaborate to build a personalized rehabilitation plan with clear milestones and expectations.',
      iconName: 'brain',
    },
    {
      number: 3,
      title: 'Build Core Skills',
      description:
        'Strengthen communication and listening using evidence‑based training and real‑world strategies.',
      iconName: 'ear',
    },
    {
      number: 4,
      title: 'Tailor and Progress',
      description:
        'Device‑specific coaching, family support, and optional multi‑session bundles to accelerate results.',
      iconName: 'settings',
    },
  ];

  return (
    <section className="bg-white pt-14">
      <div className="mx-auto max-w-6xl px-6 py-14">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">
            Our <span className="text-cyan-700">Approach</span>
          </h2>
          <p className="mt-3 text-gray-600 max-w-3xl mx-auto">
            A simple four‑step path from clarity to confident everyday communication.
          </p>
        </div>

        <div className="relative" ref={containerRef}>
          {/* Vertical line */}
          <div className="absolute left-10 md:left-16 top-0 bottom-0 w-px bg-gray-200" />

          <div className="space-y-8">
            {steps.map((step, idx) => (
              <div
                key={step.number}
                data-timeline-row="true"
                className={`group flex items-start gap-6 transition-all duration-500 ease-out ${
                  revealedCount >= step.number ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${idx * 80}ms` }}
              >
                {/* Numbered badge with icon */}
                <div className="relative shrink-0">
                  <div className="flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-white text-black rounded-xl shadow-lg ring-1 ring-gray-200">
                    <ServiceIcon iconName={step.iconName} className="w-6 h-6 text-black transition-all duration-200 group-hover:text-cyan-700 group-hover:scale-110" />
                  </div>
                  <div className="absolute -top-2 -right-2 flex items-center justify-center w-6 h-6 rounded-full bg-white shadow-md ring-1 ring-gray-200 text-cyan-900 text-sm font-bold">
                    {step.number}
                  </div>
                </div>

                {/* Card */}
                <div className="flex-1">
                  <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-200 p-6">
                    <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2 transition-colors duration-200 group-hover:text-cyan-700">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 text-sm md:text-base">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


