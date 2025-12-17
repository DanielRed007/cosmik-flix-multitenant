import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-lime-700 via-lime-300 to-lime-700 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Text */}
          <div className="text-center lg:text-left">
            <h1 className="text-xl md:text-5xl lg:text-5xl font-bbh-bartle uppercase tracking-tight text-slate-900 mb-3 drop-shadow-2xl">
              Cosmik
            </h1>
            <p className="text-xl md:text-xl font-dm-sans text-slate-800 font-semibold max-w-2xl">
              Your universal movie catalog
            </p>
            <p className="mt-3 text-lg font-dm-sans text-slate-900">
              The most powerful MERN replacement built with Next.js 16, React 19, and shadcn/ui.
            </p>
          </div>

          {/* Right: CTA Buttons */}
          <div className="flex flex-col items-center lg:items-start gap-6">
            <Button asChild size="lg" className="w-full max-w-sm bg-white hover:bg-slate-100 text-slate-900 font-semibold text-lg px-4 py-4 shadow-2xl hover:shadow-white/50 transition-all">
              <Link href="auth/sign-up">Get Started</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="w-full max-w-sm bg-transparent text-slate-900 border-1 border-slate-900 hover:bg-slate-900 hover:text-white font-semibold text-lg px-4 py-4 backdrop-blur-sm transition-all">
              <Link href="auth/sign-in">Sign In</Link>
            </Button>
          </div>
        </div>
      </div>
    </main>
  );
}