"use client";

import Link from "next/link";
import { useState } from "react";
import { services, serviceCategories } from "@/data/services";
import { ServiceIcon } from "@/components/ServiceIcon";
import { ServiceModeIndicator } from "@/components/ServiceModeIndicator";
import { Check, ChevronDown, ChevronUp } from "lucide-react";

export default function ServicesPage() {
  const [expandedCards, setExpandedCards] = useState<Set<string>>(new Set());
  const [loadingSlug, setLoadingSlug] = useState<string | null>(null);
  
  const toggleCard = (serviceSlug: string) => {
    setExpandedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(serviceSlug)) {
        newSet.delete(serviceSlug);
      } else {
        newSet.add(serviceSlug);
      }
      return newSet;
    });
  };
  
  const getServicesByCategory = () => {
    return serviceCategories.map(category => ({
      ...category,
      services: services.filter(service => service.category === category.id)
    }));
  };

  const categorizedServices = getServicesByCategory();

  const handleBookNow = async (serviceSlug: string) => {
    try {
      setLoadingSlug(serviceSlug);
      const res = await fetch('/api/stripe/create-checkout-session', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ serviceId: serviceSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || 'Failed to start checkout');
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (e) {
      console.error(e);
      alert('Sorry, something went wrong starting checkout. Please try again.');
    } finally {
      setLoadingSlug(null);
    }
  };

  return (
    <main className="mx-auto max-w-[1200px] px-6 sm:px-8">
      <div className="mt-12 space-y-16">
        {categorizedServices.map((category) => (
          <section key={category.id}>
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-xl font-semibold tracking-tight text-foreground">
                  {category.title}
                </h2>
              </div>
              <p className="text-sm text-foreground/70">{category.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
              {category.services.map((svc) => {
                const isExpanded = expandedCards.has(svc.slug);
                
                return (
                  <article 
                    key={svc.slug} 
                    className="group relative overflow-hidden rounded-lg border border-border bg-card hover:shadow-lg transition-all duration-300"
                  >
   
                    {/* Clickable area for expansion (everything except CTA) */}
                    <div 
                      className="cursor-pointer"
                      onClick={() => toggleCard(svc.slug)}
                    >
                      <div className="p-6 pb-4">
                        {/* Icon and title section */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <ServiceIcon iconName={svc.iconName} className="w-6 h-6 text-black" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className="font-semibold text-foreground leading-tight">{svc.title}</h3>
                              <div className="flex-shrink-0">
                                {isExpanded ? (
                                  <ChevronUp className="w-4 h-4 text-foreground/60" />
                                ) : (
                                  <ChevronDown className="w-4 h-4 text-foreground/60" />
                                )}
                              </div>
                            </div>
                            <p className={`mt-1 text-sm text-foreground/70 ${isExpanded ? '' : 'line-clamp-2'}`}>
                              {svc.summary}
                            </p>
                          </div>
                        </div>

                        {/* Mode indicators */}
                        <div className="mb-4">
                          <ServiceModeIndicator mode={svc.mode} isGroup={svc.isGroup} />
                        </div>

                        {/* Duration and pricing */}
                        <div className="mb-4 text-xs text-foreground/60 flex items-center gap-3">
                          <span>{svc.durationMinutes} min</span>
                          {typeof svc.priceCents === "number" ? (
                            <span className="font-medium">${(svc.priceCents / 100).toFixed(0)}</span>
                          ) : (
                            <span className="text-accent font-medium">Free consult</span>
                          )}
                        </div>

                        {/* Expanded content */}
                        <div className={`transition-all duration-300 overflow-hidden ${
                          isExpanded ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                        }`}>
                          {/* Full description */}
                          <div className="mb-4">
                            <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">
                              Description
                            </h4>
                            <p className="text-sm text-foreground/70">
                              {svc.description}
                            </p>
                          </div>

                          {/* Key outcomes - only shown when expanded */}
                          <div className="mb-6">
                            <h4 className="text-xs font-medium text-foreground/60 uppercase tracking-wide mb-2">
                              Key Outcomes
                            </h4>
                            <ul className="space-y-2">
                              {svc.outcomes.map((outcome, i) => (
                                <li key={i} className="text-sm text-foreground/70 flex items-start gap-2">
                                  <Check className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                                  <span>{outcome}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* CTA - not clickable for expansion */}
                    <div className="px-6 pb-6">
                      {svc.ctaVariant === "plans" ? (
                        <div className="flex flex-col items-start gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center justify-center w-full rounded-md bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
                            onClick={(e) => { e.stopPropagation(); handleBookNow(svc.slug); }}
                            disabled={loadingSlug === svc.slug}
                          >
                            {loadingSlug === svc.slug ? 'Starting checkout...' : 'Book Now'}
                          </button>
                          <Link 
                            href="/pricing" 
                            className="text-sm underline text-foreground"
                            onClick={(e) => e.stopPropagation()}
                          >
                            Explore Plans
                          </Link>
                        </div>
                      ) : (
                        <button
                          type="button"
                          className="inline-flex items-center justify-center w-full rounded-md bg-blue-600 text-white px-4 py-2.5 text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-60"
                          onClick={(e) => { e.stopPropagation(); handleBookNow(svc.slug); }}
                          disabled={loadingSlug === svc.slug}
                        >
                          {loadingSlug === svc.slug ? 'Starting checkout...' : 'Book Now'}
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
        
      </div>
    </main>
  );
} 