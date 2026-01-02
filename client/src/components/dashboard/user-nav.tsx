"use client"

// components/user-nav.tsx
import { useState } from "react";
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { useRedirect } from "@/hooks/use-redirect";

export function UserNav() {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const { redirectRoute } = useRedirect();

  const handleLogout = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      const res = await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include', // Important: sends & receives cookies (refreshToken)
      });

      const data = await res.json();

      if (res.ok) {
        toast.success('Logged Out! See you soon', {
          description: 'Redirecting to home...',
        });
        
        useAuthStore.setState({
          accessToken: null,
          user: null,
          isAuthenticated: false
        })
        
        setTimeout(() => router.push('/'), 1500);
      } else {
        toast.error(data.message || 'Error. Please try again.');
      }
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="relative h-10 w-10 rounded-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/avatar-placeholder.jpg" alt="User" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">John Doe</p>
            <p className="text-xs leading-none text-muted-foreground">
              john@example.com
            </p>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => redirectRoute("/dashboard/profile")}>
            <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => redirectRoute("/dashboard/settings")}>
            <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        <DropdownMenuItem className="text-destructive focus:text-destructive" onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}