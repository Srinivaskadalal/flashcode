import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import Image from "next/image";
import Link from "next/link";

const questions = [
  {
    _id: "1",
    title: "How does TypeScript improve JavaScript development?",
    tags: [
      { _id: "1", name: "JavaScript" },
      { _id: "2", name: "TypeScript" },
    ],
    author: { _id: "1", name: "Nithin", image: "/dummy.png" },
    upvotes: 10,
    answers: 7,
    views: 256,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "What are the key differences between React and Angular?",
    tags: [
      { _id: "3", name: "React" },
      { _id: "4", name: "Angular" },
    ],
    author: { _id: "2", name: "Sarah" },
    upvotes: 15,
    answers: 5,
    views: 312,
    createdAt: new Date(),
  },
  {
    _id: "3",
    title: "How does Java's garbage collection work?",
    tags: [
      { _id: "5", name: "Java" },
      { _id: "6", name: "Memory Management" },
    ],
    author: { _id: "3", name: "Mike" },
    upvotes: 8,
    answers: 3,
    views: 189,
    createdAt: new Date(),
  },
  {
    _id: "4",
    title: "What is the difference between SQL and NoSQL databases?",
    tags: [
      { _id: "7", name: "SQL" },
      { _id: "8", name: "NoSQL" },
    ],
    author: { _id: "4", name: "Emma" },
    upvotes: 20,
    answers: 6,
    views: 410,
    createdAt: new Date(),
  },
  {
    _id: "5",
    title: "How can I get involved in the Kent State University Coding Club?",
    tags: [
      { _id: "9", name: "Kent State University" },
      { _id: "10", name: "Coding Community" },
    ],
    author: { _id: "5", name: "David" },
    upvotes: 12,
    answers: 4,
    views: 275,
    createdAt: new Date("2024-12-13"),
  },
  {
    _id: "6",
    title: "What are some coding competitions hosted at Kent State University?",
    tags: [
      { _id: "9", name: "Kent State University" },
      { _id: "11", name: "Hackathons" },
    ],
    author: { _id: "6", name: "Sophia" },
    upvotes: 18,
    answers: 9,
    views: 330,
    createdAt: new Date(),
  },
  {
    _id: "7",
    title: "What are the best study spots on the Kent State University campus?",
    tags: [
      { _id: "9", name: "Kent State University" },
      { _id: "12", name: "Campus Life" },
    ],
    author: { _id: "7", name: "Liam" },
    upvotes: 22,
    answers: 10,
    views: 450,
    createdAt: new Date(),
  },
];

interface SearchParams {
  searchParams: Promise<{ [Key: string]: string }>;
}
export default async function Home({ searchParams }: SearchParams) {
  const session = await auth();
  console.log(session);

  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });
  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient2 min-h-[46px] px-4 py-3 dark:text-white ">
          <Link href={ROUTES.ASK_FLASH}>Ask Flashes</Link>
        </Button>
      </section>

      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="search question"
          otherClasses="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard key={question._id} question={question} />
        ))}
      </div>
    </>
  );
}
