import React from "react";

const GamingLoungeCard = () => {
  return (
    <div className="bg-white dark:bg-dark-500 rounded-xl shadow-md border border-gray-300 dark:border-gray-600 p-5 flex flex-col items-center text-center w-full max-w-md">
      <img
        src="/images/kent-gaming-lounge.png"
        alt="Kent State Gaming Lounge"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-xl font-bold text-dark500_light900">
        Kent State Gaming Lounge
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Experience the ultimate **gaming hub** at Kent State! High-end PCs,
        next-gen consoles, and weekly gaming nights await you. 🎮🔥
      </p>
      <a
        href="https://www.kent.edu/gaming-lounge"
        className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Visit Now
      </a>
    </div>
  );
};

export default GamingLoungeCard;
