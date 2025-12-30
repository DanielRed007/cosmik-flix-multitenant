"use client"

import { useAuthStore } from "@/store/authStore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from 'sonner';


export default function Profile() {
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("What?", isAuthenticated)

    getMyProfile();

  }, []);

  if (!isAuthenticated) {
    return <p>Redirecting to login...</p>;
  }

  const getMyProfile = async () => {

    // If the profile is empty we show notification "Hey Get your profile"
    // if () {
    //   toast.error('Please fill in all fields');
    //   return;
    // }

    setIsLoading(true);

    try {
      const res = await fetch('/api/profile', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await res.json();

      console.log(data, "My Response")
    } catch (error) {
      toast.error('Network error. Please check your connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  

  return (
    <>
      <h1>Profile</h1>
    </>
  )
}