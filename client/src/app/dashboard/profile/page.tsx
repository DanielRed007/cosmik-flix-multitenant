// app/profile/page.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const ALL_GENRES = [
  "Action",
  "Adventure",
  "Animation",
  "Comedy",
  "Crime",
  "Documentary",
  "Drama",
  "Family",
  "Fantasy",
  "Horror",
  "Mystery",
  "Romance",
  "Sci-Fi",
  "Thriller",
  "Western",
] as const;

type Genre = typeof ALL_GENRES[number];

const profileSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  city: z.string(),
  zipCode: z.string().min(3, "Zip code is too short").max(20),
  age: z
    .number()
    .min(13, "You must be at least 13 years old")
    .max(120, "Age seems too high"),
  favoriteGenres: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      city: "",
      zipCode: "",
      age: undefined,
      favoriteGenres: [],
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      if (!isAuthenticated) return;

      try {
        setIsLoading(true);

        const res = await fetch("/api/profile", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) throw new Error("Failed to fetch profile");

        const data = await res.json();
        console.log("Fetched profile:", data);

        // Populate form with data from API (your "always populated" profile)
        form.reset({
          name: data.profile?.name || "",
          email: data.profile?.email || "",
          city: data.profile?.city || "",
          zipCode: data.profile?.zipCode || "",
          age: data.profile?.age ?? undefined,
          favoriteGenres: data.profile?.favoriteGenres || []
        });
      } catch (error) {
        console.error("Profile fetch error:", error);
      } finally {
        setIsLoading(false);
      }
    };

    // Ensure form fields are registered before resetting
    if (form.control) {
      fetchProfile();
    }
  }, [isAuthenticated, form.control]);

  const onSubmit = async (values: ProfileFormValues) => {
    console.log("Submitting:", values);

    try {
      const res = await fetch("/api/profile", {
        method: "PATCH", // ← now using PATCH
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
        }),
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      console.log("Updated profile:", data);

      // Optional: refetch or update local state
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      // toast error here
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Redirecting to login...</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-10 px-4">
      <Card>
        <CardHeader>
          <CardTitle>Your Profile</CardTitle>
          <CardDescription>Manage your personal information</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe(Test User)" disabled={!isEditing} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder={field.value}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* NEW ROW: City, Zip Code, Age */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder="New York" disabled={!isEditing} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="zipCode"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Zip Code</FormLabel>
                      <FormControl>
                        <Input placeholder="10001" disabled={!isEditing} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="age"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Age</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="30"
                          disabled={!isEditing}
                          {...field}
                          onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : undefined)}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Movie Genres Section */}
              <FormField
                control={form.control}
                name="favoriteGenres"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Favorite Movie Genres</FormLabel>
                    <FormControl>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {ALL_GENRES.map((genre) => {
                          const isSelected = field.value.includes(genre);

                          return (
                            <Badge
                              key={genre}
                              variant={isSelected ? "default" : "outline"}
                              className={`
                                cursor-pointer transition-all 
                                hover:scale-105 
                                ${isSelected ? "ring-2 ring-offset-2 ring-primary" : ""}
                              `}
                              onClick={() => {
                                if (isSelected) {
                                  // Remove genre
                                  field.onChange(field.value.filter((g) => g !== genre));
                                } else {
                                  // Add genre
                                  field.onChange([...field.value, genre]);
                                }
                              }}
                            >
                              {genre}
                            </Badge>
                          );
                        })}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="flex gap-3">
                {isEditing ? (
                  <>
                    <Button type="submit">Save Changes</Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => {
                        form.reset();
                        setIsEditing(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button type="button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}