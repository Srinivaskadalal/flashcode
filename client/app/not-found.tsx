// "use client";

// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import { useEffect, useState } from "react";

// export default function NotFoundPage() {
//   const router = useRouter();
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   // Detect dark mode
//   useEffect(() => {
//     if (
//       window.matchMedia &&
//       window.matchMedia("(prefers-color-scheme: dark)").matches
//     ) {
//       setIsDarkMode(true);
//     }
//   }, []);

//   return (
//     <div
//       className={`flex min-h-screen flex-col items-center justify-center ${
//         isDarkMode ? "bg-black text-white" : "bg-gray-100 text-gray-900"
//       } text-center p-6 transition-all duration-300`}
//     >
//       {/* 404 Image */}
//       <Image
//         src="/images/404.png"
//         alt="404 Not Found"
//         width={500}
//         height={300}
//         priority
//         className="mb-6"
//       />

//       {/* Funny Coding-Themed Error Message */}
//       <h1 className="text-4xl font-extrabold">
//         {`<Error 404: Page Not Found />`}
//       </h1>
//       <p className="mt-3 text-lg opacity-80">
//         {`It looks like the page you're looking for got lost in an infinite loop!`}
//       </p>
//       <p className="mt-1 text-md opacity-60">
//         {`(Maybe you forgot to close your tags? 😉)`}
//       </p>

//       {/* Animated "Code Output" Effect */}
//       <pre
//         className={`mt-4 p-4 text-sm rounded-lg ${
//           isDarkMode
//             ? "bg-gray-800 text-green-400"
//             : "bg-gray-200 text-green-700"
//         }`}
//       >
//         <code>
//           {`function findPage() {
//   throw new Error("404: Page Not Found!");
// }`}
//         </code>
//       </pre>

//       {/* Call-to-Action Button */}
//       <button
//         onClick={() => router.push("/")}
//         className="mt-6 px-6 py-3 text-white bg-gradient-to-r from-yellow-500 to-red-500 rounded-lg shadow-lg hover:scale-105 transition"
//       >
//         Debug & Return Home 🏠
//       </button>

//       {/* Fun Blinking Cursor Animation */}
//       <p className="mt-4 text-sm opacity-70 animate-pulse">
//         Waiting for user input... <span className="animate-blink">|</span>
//       </p>
//     </div>
//   );
// }
"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div
      className="flex min-h-screen flex-col items-center justify-center bg-white
      text-center p-6 !text-black"
    >
      <div className="w-full max-w-2xl">
        <Image
          src="/images/404-d.png"
          alt="404 Not Found"
          width={900}
          height={600}
          priority
          className="mx-auto mb-8"
        />
      </div>

      <h1 className="text-5xl font-extrabold">
        Oops... You’ve wandered into the void!
      </h1>
      <p className="mt-3 text-lg opacity-80">
        The page you’re looking for doesn’t exist. Maybe it **segfaulted**, or
        it’s **hiding in the cache**?
      </p>
      <p className="mt-1 text-md opacity-60">
        (Or maybe you just **misspelled the URL**. We won’t judge 😆)
      </p>

      <button
        onClick={() => router.push("/")}
        className="mt-8 px-6 py-3  primary-gradient2 font-extrabold text-white rounded-lg shadow-lg hover:scale-105 transition"
      >
        Take me home →
      </button>

      <p className="mt-4 text-sm opacity-70">
        If you’re stuck here forever, at least bring snacks. 🍕
      </p>
    </div>
  );
}
