"use client";
import AddScheduleForm from "@/components/forms/AddScheduleForm";
import Link from "next/link";
import React, { useState } from "react";
const magazines = [
  {
    id: 1,
    name: "Name of Magazine",
    image: "/thund.svg",
    url: "https://www.kent.edu/magazine",
  },
  {
    id: 2,
    name: "Name of Magazine",
    image: "/thund.svg",
    url: "https://theamag.com",
  },
  {
    id: 3,
    name: "Name of Magazine",
    image: "/thund.svg",
    url: "https://theburr.com",
  },
  {
    id: 4,
    name: "Name of Magazine",
    image: "/thund.svg",
    url: "https://en.wikipedia.org/wiki/Fusion_(Kent_State_University)",
  },
  {
    id: 5,
    name: "Name of Magazine",
    image: "/thund.svg",
    url: "https://www.kent.edu/fashion/mag",
  },
];
const importantDates = {
  Spring2025: [
    { event: "New Year's Day", date: "Wed, Jan 1, 2025" },
    {
      event: "Spring classes begin for first-year Podiatric Medicine students",
      date: "Mon, Jan 6, 2025",
    },
    { event: "Spring Classes Begin", date: "Mon, Jan 13, 2025" },
    { event: "Spring Break", date: "Mon, Mar 10 - Sun, Mar 16, 2025" },
    { event: "Spring Classes End", date: "Sun, May 4, 2025" },
    { event: "Spring Final Exams", date: "Mon, May 5 - Sun, May 11, 2025" },
  ],
  Summer2025: [
    { event: "Summer Classes Begin", date: "Mon, May 19, 2025" },
    { event: "Independence Day (Holiday)", date: "Fri, Jul 4, 2025" },
    { event: "Summer Final Exams", date: "Mon, Aug 11 - Fri, Aug 15, 2025" },
  ],
  Fall2025: [
    { event: "Fall Classes Begin", date: "Mon, Aug 26, 2025" },
    { event: "Labor Day (Holiday)", date: "Mon, Sep 1, 2025" },
    { event: "Fall Break", date: "Thu, Oct 9 - Fri, Oct 10, 2025" },
    { event: "Fall Classes End", date: "Fri, Dec 12, 2025" },
    { event: "Final Exams", date: "Mon, Dec 15 - Fri, Dec 19, 2025" },
  ],
};

const page = () => {
  const [selectedTab, setSelectedTab] = useState("Spring2025");

  return (
    <>
      <div className="relative flex flex-col items-start justify-start  text-left bg-white dark:bg-black px-16 ">
        {/* Main Heading */}
        <h1 className="text-6xl font-extrabold uppercase text-blue-900  dark:text-white tracking-wide font-playfair-display">
          YOU <span className="text-yellow-500">BELONG</span> HERE
        </h1>

        {/* Decorative Lines */}
        <div className="mt-4 w-32 h-1 bg-yellow-500"></div>
        <div className="mt-2 w-48 h-1 bg-blue-900 dark:bg-white"></div>

        {/* Subtitle */}
        <p className="mt-6 text-md text-gray-700 font-medium max-w-xl dark:text-white">
          Join the Kent State University community and be part of something
          extraordinary.
        </p>
      </div>

      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />
      {/* 2 */}
      {/* Magazine Section */}
      <div className="px-8 py-18 bg-white dark:bg-gray-900 text-black dark:text-white">
        {/* Section Title */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-blue-900 dark:text-white font-playfair-display">
            Kent State Magazines
          </h2>
          <div className="w-32 h-1 bg-blue-900 dark:bg-white"></div>
        </div>

        {/* Magazines Grid Layout - First Row (3 Magazines) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {magazines.slice(0, 3).map((mag) => (
            <a
              key={mag.id}
              href={mag.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <img
                src={mag.image}
                alt={mag.name}
                className="w-full h-72 object-cover rounded-xl border border-gray-400 dark:border-gray-600"
              />
              <span className="absolute top-2 left-2 text-4xl font-extrabold text-yellow-400">
                {mag.id}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-blue-900 dark:text-yellow-300 font-playfair-display">
                {mag.name}
              </h3>
            </a>
          ))}
        </div>

        {/* Magazines Grid Layout - Second Row (2 Magazines) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
          {magazines.slice(3, 5).map((mag) => (
            <a
              key={mag.id}
              href={mag.url}
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-full flex flex-col items-center text-center transition-transform hover:scale-105"
            >
              <img
                src={mag.image}
                alt={mag.name}
                className="w-full h-72 object-cover rounded-xl border border-gray-400 dark:border-gray-600"
              />
              <span className="absolute top-2 left-2 text-4xl font-extrabold text-yellow-400">
                {mag.id}
              </span>
              <h3 className="mt-3 text-lg font-semibold text-blue-900 dark:text-yellow-300 font-playfair-display">
                {mag.name}
              </h3>
            </a>
          ))}
        </div>
      </div>
      {/* 3 merchendize */}
      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />

      <Link
        href="https://kent.spirit.bncollege.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-12 bg-blue-900 text-center text-white rounded-lg transition-transform hover:scale-105"
      >
        {/* Banner Content */}
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          {/* Left Side - Text */}
          <div className="text-left">
            <h2 className="text-4xl font-bold font-playfair-display">
              Official Kent State Merchandise
            </h2>
            <p className="mt-2 text-lg text-yellow-400">
              Shop apparel, accessories, and collectibles now!
            </p>
          </div>

          {/* Right Side - Image */}
          <div className="mt-6 md:mt-0">
            <img
              src="/images/merchen.png"
              alt="Kent State Merchandise"
              className="w-72 h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </Link>
      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />
      {/* <div className="px-6 py-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-4xl font-bold text-blue-900 dark:text-white font-playfair-display text-center mb-6">
          Important Dates - Kent State University
        </h2>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-left">Event</th>
                <th className="py-3 px-4 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              <tr className="border-b">
                <td className="py-3 px-4">Spring Break</td>
                <td className="py-3 px-4">March 25 - 29, 2025</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Final Exams</td>
                <td className="py-3 px-4">May 5 - 11, 2025</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Commencement</td>
                <td className="py-3 px-4">May 17, 2025</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 px-4">Fall Semester Begins</td>
                <td className="py-3 px-4">August 26, 2025</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div> */}
      <div className="px-6 py-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        {/* Section Title */}
        <h2 className="text-4xl font-bold text-blue-900 dark:text-white font-playfair-display text-center mb-6">
          Kent State Important Dates - 2025
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          {Object.keys(importantDates).map((semester) => (
            <button
              key={semester}
              className={`px-6 py-3 font-semibold text-lg rounded-t-lg ${
                selectedTab === semester
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              } transition duration-200`}
              onClick={() => setSelectedTab(semester)}
            >
              {semester.replace("2025", " 2025")}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-900 text-white">
                <th className="py-3 px-4 text-left">Event Name</th>
                <th className="py-3 px-4 text-left">Event Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 dark:text-gray-300">
              {importantDates[selectedTab].map((event, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "bg-gray-200 dark:bg-gray-700"
                      : "bg-gray-100 dark:bg-gray-800"
                  }
                >
                  <td className="py-3 px-4">{event.event}</td>
                  <td className="py-3 px-4">{event.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <AddScheduleForm />
    </>
  );
};

export default page;
