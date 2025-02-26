"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import {
  CalendarIcon,
  ClockIcon,
  MapPinIcon,
  LinkIcon,
  FileTextIcon,
} from "lucide-react";

// ZOD SCHEMA
const eventSchema = z.object({
  title: z.string().min(3, "Title is required"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Invalid date format (YYYY-MM-DD)"),
  time: z
    .string()
    .regex(
      /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/,
      "Invalid time format (HH:MM AM/PM)"
    ),
  description: z.string().min(10, "Description must be at least 10 characters"),
  location: z.string().min(3, "Location is required"),
  link: z.string().url("Invalid URL"),
});

export default function EventForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(eventSchema),
  });

  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: any) => {
    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:5000/events/post", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("Failed to add event");

      toast.success("🎉 Event added successfully!");
      reset();

      setTimeout(() => {
        router.push("/events");
      }, 1000);
    } catch (error: any) {
      toast.error(error.message || "❌ Failed to add event");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 p-8 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 max-w-2xl mx-auto transition-all hover:shadow-2xl">
      <Toaster />

      <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white text-center mb-6">
        Add a New Event
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Event Title */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="title"
            className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <FileTextIcon
              size={18}
              className="mr-2 text-blue-500 dark:text-blue-400"
            />{" "}
            Event Title
          </Label>
          <Input {...register("title")} placeholder="Enter event title" />
          {errors.title && (
            <p className="text-red-500 text-sm">
              {errors.title.message?.toString()}
            </p>
          )}
        </div>

        {/* Date & Time Fields (Aligned) */}
        <div className="grid grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="date"
              className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
            >
              <CalendarIcon
                size={18}
                className="mr-2 text-green-500 dark:text-green-400"
              />{" "}
              Event Date
            </Label>
            <Input type="date" {...register("date")} />
            {errors.date && (
              <p className="text-red-500 text-sm">
                {errors.date.message?.toString()}
              </p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label
              htmlFor="time"
              className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
            >
              <ClockIcon
                size={18}
                className="mr-2 text-purple-500 dark:text-purple-400"
              />{" "}
              Event Time
            </Label>
            <Input type="text" {...register("time")} placeholder="06:30 PM" />
            {errors.time && (
              <p className="text-red-500 text-sm">
                {errors.time.message?.toString()}
              </p>
            )}
          </div>
        </div>

        {/* Event Location */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="location"
            className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <MapPinIcon
              size={18}
              className="mr-2 text-red-500 dark:text-red-400"
            />{" "}
            Event Location
          </Label>
          <Input {...register("location")} placeholder="Enter event location" />
          {errors.location && (
            <p className="text-red-500 text-sm">
              {errors.location.message?.toString()}
            </p>
          )}
        </div>

        {/* Event Description */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="description"
            className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <FileTextIcon
              size={18}
              className="mr-2 text-yellow-500 dark:text-yellow-400"
            />{" "}
            Description
          </Label>
          <Input
            {...register("description")}
            placeholder="Enter event details"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">
              {errors.description.message?.toString()}
            </p>
          )}
        </div>

        {/* Event Link */}
        <div className="flex flex-col gap-2">
          <Label
            htmlFor="link"
            className="font-medium text-gray-700 dark:text-gray-300 flex items-center"
          >
            <LinkIcon
              size={18}
              className="mr-2 text-indigo-500 dark:text-indigo-400"
            />{" "}
            Event Link
          </Label>
          <Input {...register("link")} placeholder="https://event.com" />
          {errors.link && (
            <p className="text-red-500 text-sm">
              {errors.link.message?.toString()}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-blue-500 to-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all hover:scale-[1.02] hover:shadow-lg"
        >
          {loading ? "Submitting..." : "🚀 Submit Event"}
        </Button>
      </form>

      {/* Back Button */}
      <div className="mt-6 text-center">
        <Link
          href="/events"
          className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg font-medium transition-all hover:scale-[1.05] hover:shadow-md"
        >
          ← Go Back
        </Link>
      </div>
    </div>
  );
}
