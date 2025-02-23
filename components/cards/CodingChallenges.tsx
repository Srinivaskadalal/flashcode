import Link from "next/link";

export default function CodingChallenges() {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm h-[250px] flex flex-col justify-between">
      <h3 className="text-lg font-semibold text-dark100_light900">
        🚀 Coding Challenge of the Day
      </h3>

      <div className="flex flex-col gap-2">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          🧠 **Problem:** Reverse a string without using `.reverse()` in
          JavaScript.
        </p>
      </div>

      <Link
        href="/challenges/daily"
        className="text-primary font-medium hover:underline"
      >
        Try Now →
      </Link>
    </div>
  );
}
