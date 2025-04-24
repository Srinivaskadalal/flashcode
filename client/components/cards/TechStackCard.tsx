import Image from "next/image";
import { BookIcon, InfoIcon } from "lucide-react";

interface TechStackProps {
  name: string;
  description: string;
  reason: string;
  icon?: string; // optional icon path for each tech
}

export default function TechStackCard({
  name,
  description,
  reason,
  icon = "/thund.svg", // fallback to thunder icon
}: TechStackProps) {
  return (
    <div className="relative rounded-[10px] p-6 sm:px-8 overflow-hidden bg-white dark:bg-gray-900 shadow-md border border-gray-200 dark:border-gray-800 transition-all hover:shadow-lg">
      {/* Left Gradient Bar */}
      <div className="absolute left-0 top-0 h-full w-2 primary-gradient "></div>

      {/* Background Thunder Icon */}
      <div className="absolute bottom-[-40px] right-[-50px] opacity-5 pointer-events-none">
        <Image
          src="/thunder.svg"
          alt="Background Thunder"
          width={400}
          height={400}
          className="dark:invert dark:brightness-200"
          priority
        />
      </div>

      {/* Main Content */}
      <div className="flex items-start gap-4 relative z-10">
        {/* Icon */}
        <div className="p-2 shrink-0">
          <Image src={icon} alt={`${name} logo`} width={40} height={40} />
        </div>

        {/* Details */}
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {name}
          </h3>

          <div className="text-sm text-gray-600 dark:text-gray-400 mt-1 space-y-2">
            <p className="flex items-start gap-2">
              <InfoIcon size={16} className="mt-[2px]" />
              <span>
                <strong>What it is:</strong> {description}
              </span>
            </p>
            <p className="flex items-start gap-2">
              <BookIcon size={16} className="mt-[2px]" />
              <span>
                <strong>Why we chose it:</strong> {reason}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}