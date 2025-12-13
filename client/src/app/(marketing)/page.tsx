// app/(marketing)/page.tsx   ← this becomes https://yoursite.com/ (or /home if you redirect)
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <main className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-700 text-white">
        <h1 className="text-6xl font-bold mb-6">Cosmik - Your universal movie Catalog</h1>
        <p className="text-xl mb-12 max-w-2xl text-center">
          The most powerful MERN replacement built with Next.js 16, React 19 and shadcn/ui.
        </p>

        <div className="flex gap-4">
          <Button asChild size="lg">
            <Link href="/sign-up">Get Started</Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-slate-900">
            <Link href="/sign-in">Sign In</Link>
          </Button>
        </div>
      </main>
    </>
  );
}