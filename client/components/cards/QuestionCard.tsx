// import React from "react";
// import { getTimeStamp } from "@/lib/utils";
// import Link from "next/link";
// import ROUTES from "@/constants/routes";
// import TagCard from "@/components/cards/TagCard";
// import Metric from "../ui/Metric";

// interface Props {
//   question: Question;
// }
// export default function QuestionCard({
//   question: { _id, title, tags, author, createdAt, upvotes, answers, views },
// }: Props) {
//   return (
//     <div className="card-wrapper rounded-[10px] p-9 sm:px-11">
//       <div className=" flex flex-col-reverse items-start justify-between gap-5 sm:flex-row">
//         <div>
//           <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
//             {getTimeStamp(createdAt)}
//           </span>
//           <Link href={ROUTES.QUESTION(_id)}>
//             <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
//               {title}
//             </h3>
//           </Link>
//         </div>
//       </div>

//       <div className="mt-3.5 flex w-full flex-wrap gap-2">
//         {tags.map((tag) => (
//           <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
//         ))}
//       </div>

//       <div className="flex-between mt-6 w-full flex-wrap gap-3">
//         <Metric
//           imgUrl={author.image}
//           alt={author.name}
//           value={author.name}
//           title={`.asked ${getTimeStamp(createdAt)}`}
//           href={ROUTES.PROFILE(author._id)}
//           textStyles="body-medium text-dark400_light700"
//           isAuthor
//         />

//         <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
//           <Metric
//             imgUrl="/icons/like.svg"
//             alt="Like Button"
//             value={upvotes}
//             title="Votes"
//             textStyles="small-medium text-dark400_light800"
//           />
//           <Metric
//             imgUrl="/icons/message.svg"
//             alt="Answers icon"
//             value={answers}
//             title="Answers"
//             textStyles="small-medium text-dark400_light800"
//           />

//           <Metric
//             imgUrl="/icons/eye.svg"
//             alt="Views"
//             value={views}
//             title="Views"
//             textStyles="small-medium text-dark400_light800"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

//2
// import React from "react";
// import { getTimeStamp } from "@/lib/utils";
// import Link from "next/link";
// import ROUTES from "@/constants/routes";
// import TagCard from "@/components/cards/TagCard";
// import Metric from "../ui/Metric";

// interface Props {
//   question: Question;
// }

// export default function QuestionCard({
//   question: { _id, title, tags, author, createdAt, upvotes, answers, views },
// }: Props) {
//   return (
//     <div className="relative overflow-hidden rounded-xl p-8 sm:px-10 backdrop-blur-md shadow-md border border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-gray-900/50 transition-all duration-300 hover:shadow-lg">
//       {/* ⚡ Thunder Emoji in Top Right Without Any Borders */}
//       <div className="absolute top-4 right-4 text-xl">⚡</div>

//       {/* Header */}
//       <div className="relative z-10 flex flex-col sm:flex-row justify-between gap-4">
//         <div>
//           <Link href={ROUTES.QUESTION(_id)}>
//             <h3 className="text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-500 transition-all">
//               {title}
//             </h3>
//           </Link>
//           <span className="text-sm text-gray-500 dark:text-gray-400">
//             {author.name} · {getTimeStamp(createdAt)}
//           </span>
//         </div>
//       </div>

//       {/* Tags */}
//       <div className="relative z-10 mt-4 flex flex-wrap gap-2">
//         {tags.map((tag) => (
//           <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
//         ))}
//       </div>

//       {/* Stats */}
//       <div className="relative z-10 flex justify-between items-center mt-5">
//         <Metric
//           imgUrl={author.image}
//           alt={author.name}
//           value={author.name}
//           title="Asked"
//           href={ROUTES.PROFILE(author._id)}
//           textStyles="text-sm text-gray-600 dark:text-gray-300"
//           isAuthor
//         />

//         <div className="flex items-center gap-4">
//           <Metric
//             imgUrl="/icons/like.svg"
//             alt="Votes"
//             value={upvotes}
//             title="Votes"
//             textStyles="text-sm text-gray-600 dark:text-gray-300"
//           />
//           <Metric
//             imgUrl="/icons/message.svg"
//             alt="Answers"
//             value={answers}
//             title="Answers"
//             textStyles="text-sm text-gray-600 dark:text-gray-300"
//           />
//           <Metric
//             imgUrl="/icons/eye.svg"
//             alt="Views"
//             value={views}
//             title="Views"
//             textStyles="text-sm text-gray-600 dark:text-gray-300"
//           />
//         </div>
//       </div>
//     </div>
//   );
// }
import React from "react";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import TagCard from "@/components/cards/TagCard";
import Metric from "../ui/Metric";
import Image from "next/image";
interface Props {
  question: Question;
}

export default function QuestionCard({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) {
  return (
    <div className="relative card-wrapper rounded-[10px] p-9 sm:px-11 overflow-hidden bg-white dark:bg-gray-900">
      <div className="absolute bottom-[-40px] right-[-50px] opacity-5 pointer-events-none">
        <Image
          src="/thunder.svg"
          alt="Thunder Icon"
          width={400} // Adjusted for partial visibility
          height={400}
          className="dark:invert dark:brightness-200"
          priority
        />
      </div>

      <div className="flex flex-col-reverse items-start justify-between gap-5 sm:flex-row relative z-10">
        <div>
          <span className="subtle-regular text-dark400_light700 line-clamp-1 flex sm:hidden">
            {getTimeStamp(createdAt)}
          </span>
          <Link href={ROUTES.QUESTION(_id)}>
            <h3 className="sm:h3-semibold base-semibold text-dark200_light900 line-clamp-1 flex-1">
              {title}
            </h3>
          </Link>
        </div>
      </div>

      <div className="mt-3.5 flex w-full flex-wrap gap-2 relative z-10">
        {tags.map((tag) => (
          <TagCard key={tag._id} _id={tag._id} name={tag.name} compact />
        ))}
      </div>

      <div className="flex-between mt-6 w-full flex-wrap gap-3 relative z-10">
        <Metric
          imgUrl={author.image}
          alt={author.name}
          value={author.name}
          title={`.asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
        />

        <div className="flex items-center gap-3 max-sm:flex-wrap max-sm:justify-start">
          <Metric
            imgUrl="/icons/like.svg"
            alt="Like Button"
            value={upvotes}
            title="Votes"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/message.svg"
            alt="Answers icon"
            value={answers}
            title="Answers"
            textStyles="small-medium text-dark400_light800"
          />
          <Metric
            imgUrl="/icons/eye.svg"
            alt="Views"
            value={views}
            title="Views"
            textStyles="small-medium text-dark400_light800"
          />
        </div>
      </div>
    </div>
  );
}
