'use client'; // Only needed in App Router

import { useEffect } from 'react';
import { useRouter } from 'next/navigation'; // App Router
import { useAuthStore } from '@/store/authStore';



export default function Dashboard() {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/sign-in');
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>; // or a loader
  }

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>This is your protected dashboard.</p>
      {/* Your dashboard content */}
    </div>
  );
}