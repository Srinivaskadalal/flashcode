// import Link from "next/link";

// export default function UpcomingEvents() {
//   return (
//     <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-sm h-[250px] flex flex-col justify-between">
//       {/* Section Title */}
//       <h3 className="text-lg font-semibold text-dark100_light900">
//         🎟️ Events & Hackathons
//       </h3>

//       {/* Placeholder Text */}
//       <p className="text-sm text-gray-600 dark:text-gray-400">
//         Stay updated with the latest coding events and hackathons at Kent State
//         University.
//       </p>

//       {/* More Events Link */}
//       <div className="mt-auto">
//         <Link
//           href="/events"
//           className="text-primary font-medium hover:underline"
//         >
//           More →
//         </Link>
//       </div>
//     </div>
//   );
// }
import Link from "next/link";
import { CalendarIcon, TicketIcon } from "lucide-react";

export default function UpcomingEvents() {
  return (
    <div className="relative bg-white dark:bg-gray-900 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-gray-800 transition-all duration-300 hover:shadow-xl hover:scale-[1.02]">
      {/* Icon + Title */}
      <div className="flex items-center gap-2">
        <div className="bg-yellow-100 dark:bg-yellow-700 p-2 rounded-full">
          <TicketIcon className="h-6 w-6 text-yellow-600 dark:text-yellow-300" />
        </div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">
          Events & Hackathons
        </h3>
      </div>

      {/* Description */}
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Stay updated with the latest coding events and hackathons at Kent State
        University.
      </p>

      {/* More Events Link */}
      <div className="mt-4">
        <Link
          href="/events"
          className="inline-block text-white bg-gradient-to-r from-blue-500 to-blue-700 dark:from-blue-600 dark:to-blue-800 px-4 py-2 rounded-md font-semibold text-sm transition-all duration-300 hover:brightness-110"
        >
          More →
        </Link>
      </div>
    </div>
  );
}
