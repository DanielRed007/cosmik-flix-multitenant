// app/features/page.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Search,
  Zap,
  Film,
  Heart,
  Shield,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/cosmik/homepage-navbar"; // Your updated vibrant navbar

export default function FeaturesPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-300 via-electric-green-400 to-lime-200 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bbh-bartle uppercase tracking-tight text-slate-900 mb-8 drop-shadow-2xl animate-pulse-glow">
            Powerful Features
          </h1>
          <p className="text-2xl md:text-3xl font-dm-sans text-slate-800 max-w-5xl mx-auto">
            Cosmik combines speed, beauty, and intelligence to deliver the ultimate movie catalog experience.
          </p>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-20 bg-gradient-to-br from-lime-200 to-lime-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-lime-500/30 rounded-2xl animate-pulse-glow-icon">
                  <Search className="h-12 w-12 text-lime-700" />
                </div>
                <h3 className="text-4xl font-bbh-bartle text-slate-900">Lightning-Fast Search</h3>
              </div>
              <p className="text-xl font-dm-sans text-slate-800 mb-8">
                Instant fuzzy search across millions of movies, actors, directors, and genres.
              </p>
              <ul className="space-y-4 text-lg font-dm-sans text-slate-700">
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-lime-600" /> Autocomplete suggestions</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-lime-600" /> Advanced filters & sorting</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-lime-600" /> Voice search ready</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 shadow-2xl hover:shadow-lime-500/30 transition-all">
                <div className="bg-gradient-to-br from-lime-100 to-emerald-100 border-4 border-dashed border-lime-300 rounded-2xl w-full max-w-lg h-96" />
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="flex justify-center">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 shadow-2xl hover:shadow-lime-500/30 transition-all">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 border-4 border-dashed border-emerald-300 rounded-2xl w-full max-w-lg h-96" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-emerald-500/30 rounded-2xl animate-pulse-glow-icon">
                  <Film className="h-12 w-12 text-emerald-700" />
                </div>
                <h3 className="text-4xl font-bbh-bartle text-slate-900">Rich Movie Profiles</h3>
              </div>
              <p className="text-xl font-dm-sans text-slate-800 mb-8">
                Beautiful, detailed pages with trailers, cast, reviews, ratings, similar movies, and more.
              </p>
              <ul className="space-y-4 text-lg font-dm-sans text-slate-700">
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-emerald-600" /> HD posters & backdrops</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-emerald-600" /> Integrated trailer playback</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-emerald-600" /> User reviews & ratings</li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-teal-500/30 rounded-2xl animate-pulse-glow-icon">
                  <Heart className="h-12 w-12 text-teal-700" />
                </div>
                <h3 className="text-4xl font-bbh-bartle text-slate-900">Personal Watchlists & Favorites</h3>
              </div>
              <p className="text-xl font-dm-sans text-slate-800 mb-8">
                Create custom lists, mark favorites, track watched movies, and get personalized recommendations.
              </p>
              <ul className="space-y-4 text-lg font-dm-sans text-slate-700">
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-teal-600" /> Unlimited custom lists</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-teal-600" /> Smart recommendations</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-teal-600" /> Sync across devices</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 shadow-2xl hover:shadow-lime-500/30 transition-all">
                <div className="bg-gradient-to-br from-teal-100 to-cyan-100 border-4 border-dashed border-teal-300 rounded-2xl w-full max-w-lg h-96" />
              </div>
            </div>
          </div>

          {/* Feature 4 */}
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="flex justify-center">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 shadow-2xl hover:shadow-lime-500/30 transition-all">
                <div className="bg-gradient-to-br from-orange-100 to-amber-100 border-4 border-dashed border-orange-300 rounded-2xl w-full max-w-lg h-96" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-6 mb-8">
                <div className="p-4 bg-orange-500/30 rounded-2xl animate-pulse-glow-icon">
                  <Shield className="h-12 w-12 text-orange-700" />
                </div>
                <h3 className="text-4xl font-bbh-bartle text-slate-900">Enterprise-Grade Security & Multi-Tenant</h3>
              </div>
              <p className="text-xl font-dm-sans text-slate-800 mb-8">
                Built from the ground up for scalability and privacy – perfect for personal or team use.
              </p>
              <ul className="space-y-4 text-lg font-dm-sans text-slate-700">
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-orange-600" /> Role-based access control</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-orange-600" /> Isolated tenant data</li>
                <li className="flex items-center gap-4"><Sparkles className="h-6 w-6 text-orange-600" /> Full audit logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-electric-green-400 to-lime-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-8 drop-shadow-lg">
            Ready to explore the future?
          </h2>
          <p className="text-2xl font-dm-sans text-slate-800 mb-12">
            Join thousands already enjoying Cosmik.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xl px-10 py-7 shadow-2xl hover:shadow-lime-500/40">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-slate-900 border-4 border-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xl px-10 py-7 backdrop-blur-sm">
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}