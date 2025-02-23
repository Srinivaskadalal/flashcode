"use client";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import Link from "next/link";

interface Event {
  title: string;
  date: string;
  description: string;
  link: string;
}

export default function UpcomingEvents() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/events") // Fetch from Flask API
      .then((res) => {
        if (!res.ok) throw new Error("Failed to load events");
        return res.json();
      })
      .then((data) => {
        setEvents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
  return (
    <div className="bg-white dark:bg-gray-900 p-6 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-4">
        🎟️ Upcoming Events & Hackathons
      </h3>

      <div className="space-y-4">
        {events.map((event, index) => (
          <div
            key={index}
            className="border-b border-gray-300 dark:border-gray-700 pb-3 last:border-none"
          >
            <h4 className="text-md font-semibold text-blue-600 dark:text-blue-400">
              {event.title}
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              {event.date}
            </p>
            <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">
              {event.description}
            </p>
            <Link
              href={event.link}
              target="_blank"
              className="text-blue-600 dark:text-blue-400 text-sm font-medium hover:underline mt-2 inline-block"
            >
              Learn More →
            </Link>
          </div>
        ))}
      </div>

      {/* ADD A EVENT */}
      <div className="mt-4 text-right">
        <Button>
          <Link
            href="/events"
            className="text-primary font-medium hover:underline"
          >
            ADD AN EVENT →
          </Link>
        </Button>
      </div>
    </div>
  );
}
