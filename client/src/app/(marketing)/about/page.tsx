// app/about/page.tsx
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  Heart,
  Zap,
  Shield,
  Globe,
  Users,
} from "lucide-react";
import Navbar from "@/components/cosmik/homepage-navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 md:py-32">
        <div className="absolute inset-0 bg-grid-white/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-6">
            About Cosmik
          </h1>
          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto">
            We're on a mission to create the most powerful, beautiful, and accessible movie catalog in the universe.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Story</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Born from a shared passion for cinema and frustration with outdated movie databases.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                Cosmik started in 2024 when a small team of movie enthusiasts and developers realized there was no modern platform that truly respected the art of film while embracing cutting-edge technology.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed mb-6">
                We built Cosmik from the ground up using Next.js 16, React 19, and shadcn/ui – combining lightning-fast performance with a stunning, intuitive design that feels like the future.
              </p>
              <p className="text-lg text-slate-300 leading-relaxed">
                Today, Cosmik powers movie discovery for thousands, with multi-tenant support ready for personal collections, families, or entire communities.
              </p>
            </div>
            <div className="order-1 md:order-2 flex justify-center">
              <div className="bg-slate-900/50 backdrop-blur border border-slate-700 rounded-2xl p-8 shadow-2xl">
                <div className="bg-gray-200 border-2 border-dashed rounded-xl w-full max-w-lg h-96" />
                {/* Replace with a real Cosmik screenshot or illustration */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-white mb-4">Our Values</h2>
            <p className="text-xl text-slate-300 max-w-3xl mx-auto">
              Everything we do is guided by these core principles.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Sparkles className="h-10 w-10 text-blue-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Innovation</h3>
              <p className="text-slate-300">Pushing boundaries with the latest tech to make movie discovery magical.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-purple-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Heart className="h-10 w-10 text-purple-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Passion for Cinema</h3>
              <p className="text-slate-300">We love movies as much as you do – every feature is designed with film lovers in mind.</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-green-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Users className="h-10 w-10 text-green-400" />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-4">Community First</h3>
              <p className="text-slate-300">Building a platform that brings people together through shared love of stories.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Placeholder (optional) */}
      <section className="py-20 bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-12">Built by Movie Lovers, for Movie Lovers</h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-10">
            We're a distributed team of developers, designers, and cinephiles working together to redefine how the world discovers film.
          </p>
          {/* Add team member cards here when ready */}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-slate-900 to-slate-700">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Join the Cosmik journey
          </h2>
          <p className="text-xl text-slate-300 mb-10">
            Start cataloging your movie universe today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/sign-up">Get Started Free</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
              <Link href="/features">Explore Features</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}