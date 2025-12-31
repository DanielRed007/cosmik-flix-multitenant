'use client'; // Only needed in App Router

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Router
import { useAuthStore } from '@/store/authStore';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }

    getMovies()
  }, [isAuthenticated, router]);

  const getMovies = async() => {
      const res = await fetch('/api/dashboard', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
        });

        const data = await res.json();

        if (res.ok) {
          console.log({data})
          
          useAuthStore.getState().login(data.accessToken, data.user);
          
          setTimeout(() => router.push('/dashboard'), 1500);
    }
  }

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>; // or a loader
  }

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      {/* Two-column layout section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* First column: Full height block (spans 2 columns on md+) */}
        <Card className="md:col-span-2 h-full">
          <CardHeader>
            <CardTitle>Main Overview</CardTitle>
            <CardDescription>
              A larger block for charts, recent activity, or key metrics.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-96 flex items-center justify-center bg-muted/20">
            <p className="text-muted-foreground">
              Content area (e.g., chart, table, or list)
            </p>
          </CardContent>
        </Card>

        {/* Second column: Four squared sections (2x2 grid) */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="aspect-square flex items-center justify-center">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-2xl">Metric 1</CardTitle>
              <p className="text-4xl font-bold mt-2">1,234</p>
              <CardDescription>Sales</CardDescription>
            </CardContent>
          </Card>

          <Card className="aspect-square flex items-center justify-center">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-2xl">Metric 2</CardTitle>
              <p className="text-4xl font-bold mt-2">567</p>
              <CardDescription>Users</CardDescription>
            </CardContent>
          </Card>

          <Card className="aspect-square flex items-center justify-center">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-2xl">Metric 3</CardTitle>
              <p className="text-4xl font-bold mt-2">89%</p>
              <CardDescription>Growth</CardDescription>
            </CardContent>
          </Card>

          <Card className="aspect-square flex items-center justify-center">
            <CardContent className="p-6 text-center">
              <CardTitle className="text-2xl">Metric 4</CardTitle>
              <p className="text-4xl font-bold mt-2">$45k</p>
              <CardDescription>Revenue</CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* You can add more sections below if needed */}
    </div>
  );
}