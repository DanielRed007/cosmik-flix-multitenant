import React from 'react'

export default function HomepageCardSection() {
  return (
    <>
        <section className="py-24 bg-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Optional Section Header */}
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-white mb-4">
                Why Choose Cosmik?
              </h2>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto">
                Discover the features that make your movie catalog experience seamless and powerful.
              </p>
            </div>

            {/* Three Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-16 h-16 bg-blue-600/20 rounded-xl flex items-center justify-center mb-6">
                  {/* Placeholder for icon - replace with your own or use lucide-react */}
                  <svg className="w-8 h-8 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Lightning Fast
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Built with Next.js 16 and optimized for performance. Instant searches and smooth navigation.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-16 h-16 bg-purple-600/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 12l-4-4-4 4" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Beautiful Design
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Modern UI powered by shadcn/ui and Tailwind. Clean, responsive, and delightful on any device.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-8 hover:bg-slate-900/70 hover:border-slate-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
                <div className="w-16 h-16 bg-green-600/20 rounded-xl flex items-center justify-center mb-6">
                  <svg className="w-8 h-8 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold text-white mb-4">
                  Secure & Scalable
                </h3>
                <p className="text-slate-300 leading-relaxed">
                  Multi-tenant ready architecture with authentication, role management, and future-proof scaling.
                </p>
              </div>
            </div>
          </div>
        </section>
      </>)
}
