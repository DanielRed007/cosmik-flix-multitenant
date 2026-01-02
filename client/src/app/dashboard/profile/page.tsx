// app/profile/page.tsx

"use client";

import { useAuthStore } from "@/store/authStore";
import { useProfileStore } from "@/store/profileStore";
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
  city: z.string().optional(),
  zipCode: z.string().optional(),
  age: z
    .number()
    .min(13, "You must be at least 13")
    .max(120, "Age seems too high")
    .optional(),
  favoriteGenres: z.array(z.string()),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { isAuthenticated, user } = useAuthStore();
  const { profile, getProfile } = useProfileStore();

  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<any>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: "",
      email: "",
      city: "",
      zipCode: "",
      age: undefined,
      favoriteGenres: [],
    },
  });

  // Fetch profile on mount (only if authenticated)
  useEffect(() => {
    if (isAuthenticated && !profile) {
      getProfile();
    }
  }, [isAuthenticated, profile, getProfile]);

  // Populate form when profile data becomes available
  useEffect(() => {
    if (profile) {
      form.reset({
        name: profile.name || user?.name || "",
        email: profile.email || user?.email || "",
        city: profile.city || "",
        zipCode: profile.zipCode || "",
        age: profile.age || undefined,
        favoriteGenres: profile.favoriteGenres || [],
      });
    }
  }, [profile, user, form]);

  const onSubmit = async (values: ProfileFormValues) => {
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Update failed");
      }

      const updatedProfile = await res.json();
      console.log("Profile updated:", updatedProfile);

      // Optionally update store if needed
      // updateProfile(updatedProfile);

      setIsEditing(false);
      // You could show a toast success here
    } catch (error) {
      console.error("Profile update error:", error);
      // Show toast error
    }
  };

  // Show auth guard
  if (!isAuthenticated) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-lg">Redirecting to login...</p>
      </div>
    );
  }

  // Show loading while fetching profile
  if ((!profile && isAuthenticated)) {
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
          <CardDescription>Manage your personal information and preferences</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input disabled={false} {...field} />
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
                        <Input type="email" disabled {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input disabled={false} {...field} />
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
                        <Input disabled={false} {...field} />
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
                          // disabled={!isEditing}
                          {...field}
                          value={field.value ?? ""}
                          onChange={(e) =>
                            field.onChange(e.target.value ? Number(e.target.value) : undefined)
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

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
                                cursor-pointer transition-all hover:scale-105
                                ${isSelected ? "ring-2 ring-offset-2 ring-primary" : ""}
                                ${!isEditing ? "cursor-not-allowed opacity-70" : ""}
                              `}
                              onClick={
                                isEditing
                                  ? () => {
                                      if (isSelected) {
                                        field.onChange(field.value.filter((g: any) => g !== genre));
                                      } else {
                                        field.onChange([...field.value, genre]);
                                      }
                                    }
                                  : undefined
                              }
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

              <div className="flex gap-3 pt-4">
                {isEditing ? (
                  <>
                    <Button type="submit" disabled={false}>
                      {form.formState.isSubmitting ? "Saving..." : "Save Changes"}
                    </Button>
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