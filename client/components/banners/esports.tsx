import React from "react";

const KentEsportsCard = () => {
  return (
    <div className="bg-white dark:bg-dark-500 rounded-xl shadow-md border border-gray-300 dark:border-gray-600 p-5 flex flex-col items-center text-center w-full max-w-md">
      <img
        src="/images/kent-esports.png"
        alt="Kent State Esports"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="text-xl font-bold text-dark500_light900">
        Kent State Esports Club
      </h3>
      <p className="text-gray-600 dark:text-gray-300 mt-2">
        Join Kent State's official **Esports Club**, where students compete in
        top games like **League of Legends, Valorant, and Rocket League**.
      </p>
      <a
        href="https://www.kent.edu/esports"
        className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition-all"
      >
        Join Now
      </a>
    </div>
  );
};

export default KentEsportsCard;
