import { auth, signOut } from "@/auth";
import QuestionCard from "@/components/cards/QuestionCard";
import DataRenderer from "@/components/DataRenderer";
import CommonFilter from "@/components/filters/CommonFilter";
import HomeFilter from "@/components/filters/HomeFilter";
import Pagination from "@/components/Pagination";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import { HomePageFilters } from "@/constants/filter";
import ROUTES from "@/constants/routes";
import { EMPTY_QUESTION } from "@/constants/states";
import { getQuestions } from "@/lib/actions/question.action";
import { api } from "@/lib/api";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";
import Image from "next/image";
import Link from "next/link";
import { title } from "process";

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

export default async function Home({ searchParams }: SearchParams) {
  const { page, pageSize, query, filter } = await searchParams;

  const { success, data, error } = await getQuestions({
    page: Number(page) || 1,
    pageSize: Number(pageSize) || 10,
    query: query || "",
    filter: filter || "",
  });

  const { questions, isNext } = data || {};

  return (
    <>
      <section className="flex w-full flex-col-reverse justify-between gap-4 sm:flex-row sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>

        <Button className="primary-gradient2 min-h-[46px] px-4 py-3 dark:text-white ">
          <Link href={ROUTES.ASK_FLASH}>Ask Flashes</Link>
        </Button>
      </section>
      <section className="mt-11 flex justify-between gap-5 max-sm:flex-col sm:items-center">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="search question"
          otherClasses="flex-1"
        />
        <CommonFilter
          filters={HomePageFilters}
          otherClasses="min-h-[56px] sm:min-w-[170px]"
          containerClasses="hidden max-md:flex"
        />
      </section>
      <HomeFilter />
      <DataRenderer
        success={success}
        error={error}
        data={questions}
        empty={EMPTY_QUESTION}
        render={(questions) => (
          <div className="mt-10 flex w-full flex-col gap-6">
            {questions.map((question) => (
              <QuestionCard key={question._id} question={question} />
            ))}
          </div>
        )}
      />

      <Pagination page={page} isNext={isNext || false} />
      <footer className="mt-16 w-full bg-light-100 dark:bg-dark-800 p-6 text-center border-t border-gray-300 dark:border-dark-600">
        <div className="container mx-auto px-4">
          {/* Flashcode Branding */}
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
            ⚡ Flashcode - Built for Better
          </h3>

          {/* Responsive Navigation Links */}
          <div className="mt-4 flex flex-wrap justify-center gap-4 sm:gap-6 sm:flex-row flex-col md:flex-row">
            <Link
              href="/about"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              About
            </Link>
            <Link
              href="/support"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Support
            </Link>
            <Link
              href={ROUTES.JOBS}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Student Opportunities
            </Link>
            <Link
              href={ROUTES.BLOG}
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Insights & Stories
            </Link>
            <Link
              href="https://twitter.com/yourhandle"
              target="_blank"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              X (Twitter)
            </Link>
            <Link
              href="/contact"
              className="text-gray-600 dark:text-gray-400 hover:text-primary"
            >
              Contact
            </Link>
          </div>

          {/* Copyright Text */}
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Flashcode. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
}
