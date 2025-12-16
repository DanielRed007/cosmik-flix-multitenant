// app/about/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Heart,
  Users,
} from "lucide-react";
import Navbar from "@/components/cosmik/homepage-navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-lime-300 via-electric-green-400 to-lime-200 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-slate-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bbh-bartle uppercase tracking-tight text-slate-900 mb-8 drop-shadow-2xl animate-pulse-glow">
            About Cosmik
          </h1>
          <p className="text-2xl md:text-3xl font-dm-sans text-slate-800 max-w-5xl mx-auto">
            We're on a mission to create the most powerful, beautiful, and accessible movie catalog in the universe.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gradient-to-br from-lime-200 to-electric-green-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-6 drop-shadow-lg">
              Our Story
            </h2>
            <p className="text-xl md:text-2xl font-dm-sans text-slate-800 max-w-4xl mx-auto">
              Born from a shared passion for cinema and frustration with outdated movie databases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 md:order-1">
              <p className="text-xl font-dm-sans text-slate-800 leading-relaxed mb-8">
                Cosmik started in 2024 when a small team of movie enthusiasts and developers realized there was no modern platform that truly respected the art of film while embracing cutting-edge technology.
              </p>
              <p className="text-xl font-dm-sans text-slate-800 leading-relaxed mb-8">
                We built Cosmik from the ground up using Next.js 16, React 19, and shadcn/ui – combining lightning-fast performance with a stunning, intuitive design that feels like the future.
              </p>
              <p className="text-xl font-dm-sans text-slate-800 leading-relaxed">
                Today, Cosmik powers movie discovery for thousands, with multi-tenant support ready for personal collections, families, or entire communities.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-white/60 backdrop-blur-md border border-white/40 rounded-3xl p-12 shadow-2xl hover:shadow-lime-500/40 transition-all">
                <div className="bg-gradient-to-br from-lime-100 to-emerald-100 border-4 border-dashed border-lime-400 rounded-2xl w-full max-w-lg h-96" />
                {/* Replace with real illustration/screenshot */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-gradient-to-br from-electric-green-300/50 to-lime-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-6 drop-shadow-lg">
              Our Values
            </h2>
            <p className="text-xl md:text-2xl font-dm-sans text-slate-800 max-w-4xl mx-auto">
              Everything we do is guided by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="text-center bg-white/70 backdrop-blur-md rounded-3xl p-10 hover:shadow-2xl hover:shadow-lime-500/40 transition-all">
              <div className="w-24 h-24 bg-lime-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow-icon">
                <Sparkles className="h-14 w-14 text-lime-700" />
              </div>
              <h3 className="text-3xl font-bbh-bartle text-slate-900 mb-4">Innovation</h3>
              <p className="text-lg font-dm-sans text-slate-700">Pushing boundaries with the latest tech to make movie discovery magical.</p>
            </div>

            <div className="text-center bg-white/70 backdrop-blur-md rounded-3xl p-10 hover:shadow-2xl hover:shadow-lime-500/40 transition-all">
              <div className="w-24 h-24 bg-emerald-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow-icon">
                <Heart className="h-14 w-14 text-emerald-700" />
              </div>
              <h3 className="text-3xl font-bbh-bartle text-slate-900 mb-4">Passion for Cinema</h3>
              <p className="text-lg font-dm-sans text-slate-700">We love movies as much as you do – every feature is designed with film lovers in mind.</p>
            </div>

            <div className="text-center bg-white/70 backdrop-blur-md rounded-3xl p-10 hover:shadow-2xl hover:shadow-lime-500/40 transition-all">
              <div className="w-24 h-24 bg-teal-500/30 rounded-3xl flex items-center justify-center mx-auto mb-8 animate-pulse-glow-icon">
                <Users className="h-14 w-14 text-teal-700" />
              </div>
              <h3 className="text-3xl font-bbh-bartle text-slate-900 mb-4">Community First</h3>
              <p className="text-lg font-dm-sans text-slate-700">Building a platform that brings people together through shared love of stories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gradient-to-br from-lime-200 to-electric-green-300/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-12 drop-shadow-lg">
            Built by Movie Lovers, for Movie Lovers
          </h2>
          <p className="text-xl md:text-2xl font-dm-sans text-slate-800 max-w-4xl mx-auto mb-16">
            We're a distributed team of developers, designers, and cinephiles working together to redefine how the world discovers film.
          </p>
          {/* Add team member avatars/cards here when ready */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-electric-green-400 to-lime-300">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl md:text-6xl font-bbh-bartle uppercase text-slate-900 mb-8 drop-shadow-lg">
            Join the Cosmik journey
          </h2>
          <p className="text-2xl font-dm-sans text-slate-800 mb-12">
            Start cataloging your movie universe today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button asChild size="lg" className="bg-white hover:bg-slate-100 text-slate-900 font-bold text-xl px-10 py-7 shadow-2xl hover:shadow-lime-500/40">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="bg-transparent text-slate-900 border-4 border-slate-900 hover:bg-slate-900 hover:text-white font-bold text-xl px-10 py-7 backdrop-blur-sm">
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}