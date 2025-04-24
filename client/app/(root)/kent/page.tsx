"use client";
import AddScheduleForm from "@/components/forms/AddScheduleForm";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

// Updated Type Definition
type Magazine = {
  name: string;
  link: string;
  image_url: string;
};

type ImportantDate = {
  event: string;
  date: string;
};

type ImportantDates = {
  Spring2025: ImportantDate[];
  Summer2025: ImportantDate[];
  Fall2025: ImportantDate[];
};

const page = () => {
  const [magazines, setMagazines] = useState<Magazine[]>([]);
  const [selectedTab, setSelectedTab] =
    useState<keyof ImportantDates>("Spring2025");
  const [importantDates, setImportantDates] = useState<ImportantDates>({
    Spring2025: [],
    Summer2025: [],
    Fall2025: [],
  });

  const [loadingMagazines, setLoadingMagazines] = useState(true);
  const [loadingDates, setLoadingDates] = useState(true);

  useEffect(() => {
    const fetchMagazines = async () => {
      try {
        const res = await fetch("/api/kent?type=magazine");
        const data = await res.json();
        setMagazines(data.magazines || []);
      } catch (err) {
        console.error("Failed to fetch magazines:", err);
      } finally {
        setLoadingMagazines(false);
      }
    };
    fetchMagazines();
  }, []);

  useEffect(() => {
    const fetchImportantDates = async () => {
      try {
        const res = await fetch(
          "https://serverflash.onrender.com/api/important-dates/semester-wise"
        );
        const data = await res.json();
        const transformed: ImportantDates = {
          Spring2025: data.spring.map((item: any) => ({
            event: item.event,
            date: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          })),
          Summer2025: data.summer.map((item: any) => ({
            event: item.event,
            date: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          })),
          Fall2025: data.fall.map((item: any) => ({
            event: item.event,
            date: new Date(item.date).toLocaleDateString("en-US", {
              weekday: "short",
              month: "short",
              day: "numeric",
              year: "numeric",
            }),
          })),
        };
        setImportantDates(transformed);
      } catch (error) {
        console.error("Failed to fetch important dates:", error);
      } finally {
        setLoadingDates(false);
      }
    };
    fetchImportantDates();
  }, []);

  return (
    <>
      {/* Header Section */}
      <div className="relative flex flex-col items-start justify-start text-left bg-white dark:bg-black px-16">
        <h1 className="text-6xl font-extrabold uppercase text-blue-900 dark:text-white tracking-wide font-playfair-display">
          YOU <span className="text-yellow-500">BELONG</span> HERE
        </h1>
        <div className="mt-4 w-32 h-1 bg-yellow-500"></div>
        <div className="mt-2 w-48 h-1 bg-blue-900 dark:bg-white"></div>
        <p className="mt-6 text-md text-gray-700 font-medium max-w-xl dark:text-white">
          Join the Kent State University community and be part of something
          extraordinary.
        </p>
      </div>

      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />

      {/* Magazine Section */}
      <div className="px-8 py-18 bg-white dark:bg-gray-900 text-black dark:text-white">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-4xl font-bold text-blue-900 dark:text-white font-playfair-display">
            Kent State Magazines
          </h2>
          <div className="w-32 h-1 bg-blue-900 dark:bg-white"></div>
        </div>

        {loadingMagazines ? (
          <p className="text-center text-lg font-medium py-10">
            Loading magazines...
          </p>
        ) : (
          <>
            {/* First Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {magazines.slice(0, 3).map((mag, index) => (
                <a
                  key={index}
                  href={mag.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="relative w-full h-80">
                    {mag.image_url ? (
                      <Image
                        src={mag.image_url}
                        alt={mag.name}
                        fill
                        className="object-cover rounded-xl border border-gray-400 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl">
                        <span className="text-gray-500 dark:text-gray-300">
                          No Image
                        </span>
                      </div>
                    )}

                    <span className="absolute top-2 left-2 text-4xl font-extrabold text-yellow-400">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-blue-900 dark:text-yellow-300 font-playfair-display">
                    {mag.name}
                  </h3>
                </a>
              ))}
            </div>

            {/* Second Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 max-w-4xl mx-auto">
              {magazines.slice(3, 5).map((mag, index) => (
                <a
                  key={index + 3}
                  href={mag.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative w-full flex flex-col items-center text-center transition-transform hover:scale-105"
                >
                  <div className="relative w-full aspect-[3/4] max-w-[300px] bg-white dark:bg-gray-900 rounded-xl">
                    {mag.image_url ? (
                      <Image
                        src={mag.image_url}
                        alt={mag.name}
                        fill
                        className="object-contain rounded-xl border border-gray-400 dark:border-gray-600"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 rounded-xl">
                        <span className="text-gray-500 dark:text-gray-300">
                          No Image
                        </span>
                      </div>
                    )}
                    <span className="absolute top-2 left-2 text-4xl font-extrabold text-yellow-400">
                      {index + 4}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-blue-900 dark:text-yellow-300 font-playfair-display">
                    {mag.name}
                  </h3>
                </a>
              ))}
            </div>
          </>
        )}
      </div>

      {/* ✅ Official Merchandise Section */}
      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />
      <Link
        href="https://kent.spirit.bncollege.com"
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full px-6 py-12 bg-blue-900 text-center text-white rounded-lg transition-transform hover:scale-105"
      >
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="text-left">
            <h2 className="text-4xl font-bold font-playfair-display">
              Official Kent State Merchandise
            </h2>
            <p className="mt-2 text-lg text-yellow-400">
              Shop apparel, accessories, and collectibles now!
            </p>
          </div>
          <div className="mt-6 md:mt-0">
            <img
              src="/images/merchen.png"
              alt="Kent State Merchandise"
              className="w-72 h-auto rounded-lg object-cover"
            />
          </div>
        </div>
      </Link>

      {/* Important Dates */}
      <hr className="my-12 border-t border-gray-300 dark:border-gray-700" />
      <div className="px-6 py-10 bg-gray-100 dark:bg-gray-900 text-black dark:text-white">
        <h2 className="text-4xl font-bold text-blue-900 dark:text-white font-playfair-display text-center mb-6">
          Kent State Important Dates - 2025
        </h2>

        {/* Tabs */}
        <div className="flex justify-center space-x-6 mb-6">
          {["Spring2025", "Summer2025", "Fall2025"].map((semester) => (
            <button
              key={semester}
              className={`px-6 py-3 font-semibold text-lg rounded-t-lg ${
                selectedTab === semester
                  ? "bg-blue-900 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              } transition duration-200`}
              onClick={() => setSelectedTab(semester as keyof ImportantDates)}
            >
              {semester.replace("2025", " 2025")}
            </button>
          ))}
        </div>

        {loadingDates ? (
          <p className="text-center text-lg font-medium py-10">
            Loading important dates...
          </p>
        ) : (
          <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-blue-900 text-white">
                  <th className="py-3 px-4 text-left">Event Name</th>
                  <th className="py-3 px-4 text-left">Event Date</th>
                </tr>
              </thead>
              <tbody className="text-gray-700 dark:text-gray-300">
                {importantDates[selectedTab]?.map((event, index) => (
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
        )}
      </div>

      <h1 className="mt-9 text-center">More Later.....</h1>
    </>
  );
};

export default page;