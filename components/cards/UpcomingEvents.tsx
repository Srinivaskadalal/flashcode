import Link from "next/link";

export default function UpcomingEvents() {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm h-[250px] flex flex-col justify-between">
      {/* Section Title */}
      <h3 className="text-lg font-semibold text-dark100_light900">
        🎟️ Events & Hackathons
      </h3>

      {/* Placeholder Text */}
      <p className="text-sm text-gray-600 dark:text-gray-400">
        Stay updated with the latest coding events and hackathons at Kent State
        University.
      </p>

      {/* More Events Link */}
      <div className="mt-auto">
        <Link
          href="/events"
          className="text-primary font-medium hover:underline"
        >
          More →
        </Link>
      </div>
    </div>
  );
}
