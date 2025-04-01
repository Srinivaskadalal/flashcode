// import { formatNumber } from "@/lib/utils";

// interface Props {
//   totalAnswers: number;
//   totalQuestions: number;
//   badges: BadgeCounts;
// }

// const Stats = ({ totalAnswers, totalQuestions, badges }: Props) => {
//   return (
//     <div className="mt-3 space-y-6">
//       <h4 className="h3-semibold text-dark200_light900">Stats</h4>

//       {/* Questions and Answers */}
//       <div className="flex flex-wrap gap-4 sm:gap-6 text-dark200_light900">
//         <p className="text-lg font-medium bg-light-800 dark:bg-dark-400 px-4 py-2 rounded-md shadow-sm">
//           {formatNumber(totalQuestions)} Questions
//         </p>
//         <p className="text-lg font-medium bg-light-800 dark:bg-dark-400 px-4 py-2 rounded-md shadow-sm">
//           {formatNumber(totalAnswers)} Answers
//         </p>
//       </div>

//       {/* Badge Cards */}
//       <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
//         {/* Blue Flash Badge */}
//         <div className="flex items-start gap-4 rounded-2xl border border-blue-400 bg-blue-50 dark:bg-blue-900 p-5 shadow-sm dark:shadow-none">
//           <span className="text-3xl pt-1 text-blue-600 dark:text-blue-300">
//             🏆
//           </span>
//           <div>
//             <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 leading-tight">
//               {badges.GOLD}
//             </p>
//             <p className="text-base font-semibold text-blue-700 dark:text-blue-300 mt-1">
//               Blue Flash Badge
//             </p>
//             <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
//               Earned by receiving more than 50 upvotes on your answers.
//             </p>
//           </div>
//         </div>

//         {/* Golden Eagle Badge */}
//         <div className="flex items-start gap-4 rounded-2xl border border-yellow-400 bg-yellow-50 dark:bg-yellow-800 p-5 shadow-sm dark:shadow-none">
//           <span className="text-3xl pt-1 text-yellow-600 dark:text-yellow-300">
//             🦅
//           </span>
//           <div>
//             <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-100 leading-tight">
//               {badges.SILVER}
//             </p>
//             <p className="text-base font-semibold text-yellow-700 dark:text-yellow-200 mt-1">
//               Golden Eagle Badge
//             </p>
//             <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
//               Granted when your answers receive at least 30 upvotes.
//             </p>
//           </div>
//         </div>

//         {/* Founder's Torch Badge */}
//         <div className="flex items-start gap-4 rounded-2xl border border-amber-400 bg-amber-100 dark:bg-amber-900 p-5 shadow-sm dark:shadow-none">
//           <span className="text-3xl pt-1 text-amber-600 dark:text-amber-300">
//             🛡️
//           </span>
//           <div>
//             <p className="text-2xl font-bold text-amber-800 dark:text-amber-200 leading-tight">
//               {badges.BRONZE}
//             </p>
//             <p className="text-base font-semibold text-amber-700 dark:text-amber-300 mt-1">
//               Founder's Torch Badge
//             </p>
//             <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
//               Awarded after your answers earn 15+ upvotes.
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Stats;
import { formatNumber } from "@/lib/utils";

interface Props {
  totalAnswers: number;
  totalQuestions: number;
  badges: BadgeCounts;
}

const Stats = ({ totalAnswers, totalQuestions, badges }: Props) => {
  return (
    <div className="mt-3 space-y-6">
      <h4 className="h3-semibold text-dark200_light900">Stats</h4>

      {/* Questions and Answers */}
      <div className="flex flex-wrap gap-4 sm:gap-6 text-dark200_light900">
        <p className="text-lg font-medium bg-light-800 dark:bg-dark-400 px-4 py-2 rounded-md shadow-sm">
          {formatNumber(totalQuestions)} Questions
        </p>
        <p className="text-lg font-medium bg-light-800 dark:bg-dark-400 px-4 py-2 rounded-md shadow-sm">
          {formatNumber(totalAnswers)} Answers
        </p>
      </div>

      {/* Badge Cards */}
      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-5">
        {/* Blue Flash Badge */}
        <div className="flex items-start gap-4 rounded-2xl border border-blue-400 bg-blue-50 dark:bg-blue-900 p-5 shadow-sm dark:shadow-none">
          <span className="text-3xl pt-1 text-blue-600 dark:text-blue-300">
            🏆
          </span>
          <div>
            <p className="text-2xl font-bold text-blue-800 dark:text-blue-200 leading-tight">
              {badges.GOLD}
            </p>
            <p className="text-base font-semibold text-blue-700 dark:text-blue-300 mt-1">
              Blue Flash Badge
            </p>
            <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
              Earned by receiving more than 50 upvotes on your answers.
            </p>
          </div>
        </div>

        {/* Golden Eagle Badge */}
        <div className="flex items-start gap-4 rounded-2xl border border-yellow-400 bg-yellow-50 dark:bg-yellow-800 p-5 shadow-sm dark:shadow-none">
          <span className="text-3xl pt-1 text-yellow-600 dark:text-yellow-300">
            🦅
          </span>
          <div>
            <p className="text-2xl font-bold text-yellow-800 dark:text-yellow-100 leading-tight">
              {badges.SILVER}
            </p>
            <p className="text-base font-semibold text-yellow-700 dark:text-yellow-200 mt-1">
              Golden Eagle Badge
            </p>
            <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
              Granted when your answers receive at least 30 upvotes.
            </p>
          </div>
        </div>

        {/* Founder's Torch Badge */}
        <div className="flex items-start gap-4 rounded-2xl border border-purple-400 bg-purple-50 dark:bg-purple-900 p-5 shadow-sm dark:shadow-none">
          <span className="text-3xl pt-1 text-purple-600 dark:text-purple-300">
            🛡️
          </span>
          <div>
            <p className="text-2xl font-bold text-purple-800 dark:text-purple-200 leading-tight">
              {badges.BRONZE}
            </p>
            <p className="text-base font-semibold text-purple-700 dark:text-purple-300 mt-1">
              Founder's Torch Badge
            </p>
            <p className="text-sm text-purple-700 dark:text-purple-400 mt-1">
              Awarded after your answers earn 15+ upvotes.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stats;
