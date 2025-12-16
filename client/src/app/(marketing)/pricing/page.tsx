// app/pricing/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Check, Zap } from "lucide-react";
import Navbar from "@/components/cosmik/homepage-navbar";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

  const plans = [
    {
      name: "Free",
      description: "Perfect for casual movie lovers",
      monthlyPrice: 0,
      annualPrice: 0,
      features: [
        "Up to 100 movies in watchlist",
        "Basic search & filters",
        "Community ratings",
        "Ads supported",
        "Mobile & web access",
      ],
      cta: "Start for Free",
      popular: false,
    },
    {
      name: "Pro",
      description: "Best for enthusiasts – most popular",
      monthlyPrice: 9,
      annualPrice: 90,
      features: [
        "Unlimited watchlists & favorites",
        "Advanced search with AI suggestions",
        "No ads",
        "HD trailers & offline posters",
        "Personal recommendations",
        "Priority support",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and power users",
      monthlyPrice: 29,
      annualPrice: 290,
      features: [
        "Everything in Pro",
        "Multi-tenant workspaces",
        "Custom branding",
        "API access & webhooks",
        "Role-based permissions",
        "Dedicated support & SLA",
        "Audit logs",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ];

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-300 via-electric-green-400 to-lime-200 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bbh-bartle uppercase tracking-tight text-slate-900 mb-8 drop-shadow-2xl animate-pulse-glow">
            Simple Pricing
          </h1>
          <p className="text-2xl md:text-3xl font-dm-sans text-slate-800 max-w-5xl mx-auto mb-12">
            Choose the perfect plan for your movie obsession. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-white/70 backdrop-blur-md rounded-full p-2 shadow-lg">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-8 py-4 rounded-full text-lg font-dm-sans font-semibold transition-all ${
                !isAnnual
                  ? "bg-lime-500 text-slate-900 shadow-md"
                  : "text-slate-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-8 py-4 rounded-full text-lg font-dm-sans font-semibold transition-all flex items-center gap-3 ${
                isAnnual
                  ? "bg-lime-500 text-slate-900 shadow-md"
                  : "text-slate-700"
              }`}
            >
              Annual
              <span className="bg-lime-600 text-white px-3 py-1 rounded-full text-sm">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-gradient-to-br from-lime-200 to-electric-green-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white/70 backdrop-blur-lg border-2 rounded-3xl p-10 transition-all duration-500 hover:-translate-y-6 hover:shadow-2xl hover:shadow-lime-500/50 ${
                  plan.popular
                    ? "border-lime-500 shadow-lime-500/30 scale-105"
                    : "border-white/40"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-6 left-1/2 -translate-x-1/2">
                    <span className="bg-lime-500 text-slate-900 px-6 py-2 rounded-full text-sm font-bbh-bartle flex items-center gap-3 shadow-lg">
                      <Zap className="h-6 w-6" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-10">
                  <h3 className="text-2xl font-bbh-bartle text-slate-900 mb-3">
                    {plan.name}
                  </h3>
                  <p className="text-lg font-dm-sans text-slate-700">{plan.description}</p>
                </div>

                <div className="text-center mb-10">
                  <span className="text-4xl font-bbh-bartle text-slate-900">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-2xl font-dm-sans text-slate-700">
                    {plan.monthlyPrice === 0 ? "" : isAnnual ? "/year" : "/month"}
                  </span>
                </div>

                <ul className="space-y-5 mb-12">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-4">
                      <Check className="h-7 w-7 text-lime-600 flex-shrink-0 animate-pulse" />
                      <span className="text-lg font-dm-sans text-slate-800">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  className={`w-full text-xl py-7 font-bold shadow-xl transition-all ${
                    plan.popular
                      ? "bg-lime-500 hover:bg-lime-400 text-slate-900 hover:shadow-lime-500/50"
                      : "bg-white/80 hover:bg-white text-slate-900 border-2 border-slate-900"
                  }`}
                >
                  <Link href={plan.name === "Enterprise" ? "/contact" : "/sign-up"}>
                    {plan.cta}
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-electric-green-400 to-lime-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-8 drop-shadow-lg">
            Ready to dive in?
          </h2>
          <p className="text-2xl font-dm-sans text-slate-800 mb-12">
            Start free today – upgrade when you're ready.
          </p>
          <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xl px-12 py-8 shadow-2xl hover:shadow-lime-500/40">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </>
  );
}