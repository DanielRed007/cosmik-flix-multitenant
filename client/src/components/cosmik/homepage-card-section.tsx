export default function HomepageCardSection() {
  return (
    <section className="py-24 bg-gradient-to-br from-lime-400 via-electric-green-700 to-lime-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-xl md:text-2xl font-bbh-bartle uppercase tracking-tight text-slate-900 mb-3 drop-shadow-lg">
            Why Choose Cosmik?
          </h2>
          <p className="text-xl md:text-md font-dm-sans text-slate-800 max-w-4xl mx-auto">
            Discover the features that make your movie catalog experience seamless, powerful, and electrifying.
          </p>
        </div>

        {/* Three Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Card 1 */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-10 hover:bg-white/90 hover:border-lime-400 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-lime-500/40">
            <div className="w-20 h-20 bg-lime-500/20 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow-icon">
              <svg className="w-10 h-10 text-lime-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-xl font-bbh-bartle text-slate-900 mb-4">
              Lightning Fast
            </h3>
            <p className="text-md font-dm-sans text-slate-700 leading-relaxed">
              Built with Next.js 16 and optimized for performance. Instant searches and buttery-smooth navigation.
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-10 hover:bg-white/90 hover:border-lime-400 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-lime-500/40">
            <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow-icon">
              <svg className="w-10 h-10 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 12l-4-4-4 4" />
              </svg>
            </div>
            <h3 className="text-xl font-bbh-bartle text-slate-900 mb-4">
              Beautiful Design
            </h3>
            <p className="text-md font-dm-sans text-slate-700 leading-relaxed">
              Modern UI powered by shadcn/ui and Tailwind. Clean, responsive, and delightful on every device.
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-white/70 backdrop-blur-md border border-white/30 rounded-3xl p-10 hover:bg-white/90 hover:border-lime-400 transition-all duration-500 hover:-translate-y-4 hover:shadow-2xl hover:shadow-lime-500/40">
            <div className="w-20 h-20 bg-teal-500/20 rounded-2xl flex items-center justify-center mb-4 animate-pulse-glow-icon">
              <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-bbh-bartle text-slate-900 mb-4">
              Secure & Scalable
            </h3>
            <p className="text-md font-dm-sans text-slate-700 leading-relaxed">
              Multi-tenant ready architecture with authentication, role management, and future-proof scaling.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}