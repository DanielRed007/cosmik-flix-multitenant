'use client';

import { useAuthStore } from '@/store/authStore';
import { useEffect, useState } from 'react';
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import Loading from '../ui/loading';


export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { login, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function checkSession() {
      try {
        const res = await fetch('/api/auth/me', {
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          login(data.accessToken ?? null, data.user);
        } else {
          logout();
        }
      } catch (err) {
        logout();
      } finally {
        setIsLoading(false);
      }
    }

    checkSession();
  }, [login, logout]);

  if (isLoading) return <Loading />;

  return <>{children}</>;
}