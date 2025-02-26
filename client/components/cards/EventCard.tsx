import Link from "next/link";
import Image from "next/image";
import { CalendarIcon, ClockIcon, MapPinIcon } from "lucide-react";

interface EventProps {
  title: string;
  date: string;
  description: string;
  location: string;
  link: string;
  time: string;
}

export default function EventCard({
  title,
  date,
  description,
  location,
  link,
  time,
}: EventProps) {
  return (
    <div className="relative rounded-[10px] p-6 sm:px-8 overflow-hidden bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-800 transition-all hover:shadow-lg">
      <div className="absolute left-0 top-0 h-full w-2 primary-gradient "></div>

      {/* Thunder Icon in Background (Faint Like in QuestionCard) */}
      <div className="absolute bottom-[-40px] right-[-50px] opacity-5 pointer-events-none">
        <Image
          src="/thunder.svg"
          alt="Thunder Icon"
          width={400}
          height={400}
          className="dark:invert dark:brightness-200"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex items-center gap-4 relative z-10">
        {/* Left: Thunder Icon */}
        <div className=" text-black p-2  ">
          <Image src="thund.svg" alt="thundrerlogo" width={50} height={30} />
        </div>

        {/* Middle: Event Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm mt-1 line-clamp-2">
            {description}
          </p>

          {/* Meta Info */}
          <div className="flex items-center gap-4 text-gray-500 dark:text-gray-400 text-xs mt-2">
            <span className="flex items-center gap-1">
              <CalendarIcon size={14} /> {date}
            </span>
            <span className="flex items-center gap-1">
              <ClockIcon size={14} /> {time} {/* ✅ Added Time Field */}
            </span>
            <span className="flex items-center gap-1">
              <MapPinIcon size={14} /> {location}
            </span>
          </div>
        </div>

        {/* Right: View Event */}
        <Link
          href={link}
          target="_blank"
          className="dark:text-[#f2a900] text-[#1e3a8a]  text-sm font-medium hover:underline"
        >
          View Event →
        </Link>
      </div>
    </div>
  );
}
