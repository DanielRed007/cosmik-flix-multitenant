// app/features/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button"; // assuming shadcn/ui Button
import {
  Search,
  Zap,
  Users,
  Shield,
  Globe,
  Sparkles,
  Film,
  Heart,
  Star,
} from "lucide-react";
import Navbar from "@/components/cosmik/homepage-navbar";

export default function FeaturesPage() {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-white/5 bg-grid-16"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            Powerful Features for the Ultimate Movie Experience
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto">
            Cosmik combines speed, beauty, and intelligence to deliver a movie catalog that's miles ahead.
          </p>
        </div>
      </section>

      {/* Alternating Feature Sections */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Feature 1 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-blue-600/20 rounded-xl">
                  <Search className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Lightning-Fast Search</h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                Instant fuzzy search across millions of movies, actors, directors, and genres. Find what you want in milliseconds.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-blue-400" /> Autocomplete suggestions</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-blue-400" /> Advanced filters & sorting</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-blue-400" /> Voice search ready</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-12 shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-96 h-64" />
                {/* Placeholder – replace with real screenshot or illustration */}
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <div className="flex justify-center">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-12 shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-96 h-64" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-purple-600/20 rounded-xl">
                  <Film className="h-8 w-8 text-purple-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Rich Movie Profiles</h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                Beautiful, detailed pages with trailers, cast, reviews, ratings, similar movies, and more.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-purple-400" /> HD posters & backdrops</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-purple-400" /> Integrated trailer playback</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-purple-400" /> User reviews & ratings</li>
              </ul>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
            <div className="order-2 md:order-1">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-green-600/20 rounded-xl">
                  <Heart className="h-8 w-8 text-green-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Personal Watchlists & Favorites</h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                Create custom lists, mark favorites, track watched movies, and get personalized recommendations.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-green-400" /> Unlimited custom lists</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-green-400" /> Smart recommendations</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-green-400" /> Sync across devices</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-12 shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-96 h-64" />
              </div>
            </div>
          </div>

          {/* Add more features similarly... */}
          {/* Feature 4: Multi-tenant & Secure */}
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="flex justify-center">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-12 shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-96 h-64" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-orange-600/20 rounded-xl">
                  <Shield className="h-8 w-8 text-orange-400" />
                </div>
                <h3 className="text-3xl font-bold text-white">Enterprise-Grade Security & Multi-Tenant</h3>
              </div>
              <p className="text-lg text-slate-300 mb-6">
                Built from the ground up for scalability and privacy – perfect for personal or team use.
              </p>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-orange-400" /> Role-based access control</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-orange-400" /> Isolated tenant data</li>
                <li className="flex items-center gap-3"><Sparkles className="h-5 w-5 text-orange-400" /> Full audit logs</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to explore the future of movie catalogs?
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Join thousands already enjoying Cosmik.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
              <Link href="/contact">Request Demo</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}