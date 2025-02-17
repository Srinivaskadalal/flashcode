import Image from "next/image";
import Link from "next/link";
import React from "react";
import TagCard from "../cards/TagCard";

type Question = {
  _id: string;
  title: string;
};

const buzzingQuestions: Question[] = [
  {
    _id: "1",
    title: "What coding courses are available at Kent State?",
  },
  {
    _id: "2",
    title: "Does Kent State have coding clubs or hackathons?",
  },
  {
    _id: "3",
    title: "What resources are available for CS students at Kent State?",
  },
  {
    _id: "4",
    title: "How can I apply for scholarships at Kent State?",
  },
  {
    _id: "5",
    title: "What are the best study spots at Kent State?",
  },
];

const kentStateTags = [
  { _id: "1", title: "Coding Bootcamps", questions: 5 },
  { _id: "2", title: "kent", questions: 8 },
  { _id: "3", title: "Kent", questions: 12 },
  { _id: "4", title: "javascript", questions: 4 },
  { _id: "5", title: "typescript", questions: 7 },
];

const RighrSidebar = () => {
  return (
    <section className="pt-36 custom-scrollbar background-light900_dark200 light-border sticky right-0 top-0 flex h-screen w-[350px] flex-col gap-6 overflow-y-auto border-l p-6 shadow-light-300 dark:shadow-none max-xl:hidden">
      <div>
        <h3 className="h2-bold text-dark200_light900">Buzzing Questions</h3>

        <div className="mt-7 flex w-full flex-col gap-[30px]">
          {buzzingQuestions.map(({ _id, title }) => (
            <Link
              key={_id}
              href={`/question/${_id}`}
              className="flex cursor-pointer items-center justify-between gap-7"
            >
              <p className="body-medium text-dark500_light700">{title}</p>
              <Image
                src="/icons/chevron-right.svg"
                alt="chevron_logo"
                width={20}
                height={20}
              />
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <h3 className="h3-bold text-dark200_light900">Popular Tags</h3>

        <div className="mt-7 flex flex-col gap-4">
          {kentStateTags.map(({ _id, title, questions }) => (
            <TagCard
              key={_id}
              _id={_id}
              name={title}
              questions={questions}
              showCount
              compact
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RighrSidebar;
