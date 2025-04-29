"use client";

import Link from "next/link";

export default function JobsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-6 py-12 bg-white dark:bg-gray-900 text-center text-gray-800 dark:text-white">
      <h1 className="text-4xl font-bold mb-6 text-blue-900 dark:text-white font-playfair-display">
        Campus Student Employment
      </h1>

      <p className="text-lg max-w-xl mb-8">
        Visit the official Kent State University Student Employment portal to
        explore on-campus job opportunities, work-study positions, and
        career-related resources for students.
      </p>

      <Link
        href="https://www.kent.edu/career/campus-student-employment"
        target="_blank"
        rel="noopener noreferrer"
        className="px-6 py-3 rounded-lg primary-gradient2 text-white font-semibold transition"
      >
        Visit Kent State Student Jobs →
      </Link>
    </div>
  );
}