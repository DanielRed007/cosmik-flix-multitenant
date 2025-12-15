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
      annualPrice: 90, // ~17% discount shown
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
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto mb-10">
            Choose the perfect plan for your movie obsession. Cancel anytime.
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex items-center bg-slate-800 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all ${
                !isAnnual
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-3 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${
                isAnnual
                  ? "bg-white text-slate-900 shadow-lg"
                  : "text-slate-400"
              }`}
            >
              Annual
              <span className="bg-green-500/20 text-green-400 px-2 py-1 rounded text-xs">
                Save 20%
              </span>
            </button>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-slate-900/50 backdrop-blur border rounded-2xl p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  plan.popular
                    ? "border-purple-600 shadow-purple-600/20 shadow-2xl"
                    : "border-slate-700"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-purple-600 text-white px-4 py-1 rounded-full text-sm font-medium flex items-center gap-2">
                      <Zap className="h-4 w-4" /> Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-400">{plan.description}</p>
                </div>

                <div className="text-center mb-8">
                  <span className="text-5xl font-bold text-white">
                    ${isAnnual ? plan.annualPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-400">
                    {plan.monthlyPrice === 0
                      ? ""
                      : isAnnual
                      ? "/year"
                      : "/month"}
                  </span>
                </div>

                <ul className="space-y-4 mb-10">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-green-400 flex-shrink-0" />
                      <span className="text-slate-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  size="lg"
                  variant={plan.popular ? "default" : "outline"}
                  className={`w-full ${
                    plan.popular
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-white text-white hover:bg-white hover:text-slate-900"
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
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to dive into the ultimate movie catalog?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Start free today – upgrade when you're ready.
          </p>
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started Free</Link>
          </Button>
        </div>
      </section>
    </>
  );
}