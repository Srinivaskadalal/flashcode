import React from "react";
import { getTimeStamp } from "@/lib/utils";
import Link from "next/link";
import ROUTES from "@/constants/routes";
import TagCard from "@/components/cards/TagCard";
import Metric from "../Metric";
import Image from "next/image";
interface Props {
  question: Question;
}

export default function QuestionCard({
  question: { _id, title, tags, author, createdAt, upvotes, answers, views },
}: Props) {
  console.log("QuestionCard Props:", {
    _id,
    title,
    tags,
    author,
    createdAt,
    upvotes,
    answers,
    views,
  });

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
          title={`• asked ${getTimeStamp(createdAt)}`}
          href={ROUTES.PROFILE(author._id)}
          textStyles="body-medium text-dark400_light700"
          isAuthor
          titleStyles="max-sm:hidden"
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
