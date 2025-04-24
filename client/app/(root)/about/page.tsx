"use client";
import TechStackCard from "@/components/cards/TechStackCard";
import React from "react";

const teamMembers = [
  { name: "Nithin", role: "Frontend Lead (Next.js, TypeScript, Tailwind CSS)" },
  { name: "Rakesh", role: "UI/UX Developer (ShadCN, Tailwind Design System)" },
  {
    name: "Srinivas",
    role: "Backend Lead (Flask, MongoDB, API Integration)",
  },
  {
    name: "Shiva",
    role: "Authentication & Security (NextAuth.js, OAuth, JWT)",
  },
  { name: "Tarun", role: "Form Handling & Validation (React Hook Form, Zod)" },
  {
    name: "Nithin K",
    role: "Database & Data Modeling (MongoDB, Schema Design)",
  },
];

const techStack = [
  {
    name: "Next.js",
    description:
      "A React framework for building fast and SEO-friendly web apps.",
    reason:
      "We chose it for its excellent developer experience, routing system, and server-side rendering support.",
  },

  {
    name: "TypeScript",
    description:
      "A programming language that builds on JavaScript by adding type safety.",
    reason:
      "It helps catch errors early, makes the code more reliable, and improves the overall development experience.",
  },
  {
    name: "Flask",
    description: "A lightweight Python web framework.",
    reason:
      "Used for creating fast, scalable, and flexible backend APIs for managing user and magazine data.",
  },
  {
    name: "Tailwind CSS",
    description:
      "A utility-first CSS framework that makes styling faster and more flexible.",
    reason:
      "It allows us to build a clean and responsive UI quickly without writing much custom CSS.",
  },
  {
    name: "ShadCN",
    description: "A collection of modern pre-built UI components.",
    reason:
      "It helps maintain consistent design while speeding up UI development with ready-to-use components.",
  },
  {
    name: "MongoDB",
    description: "A NoSQL database for storing and managing data.",
    reason:
      "Its scalability and flexibility make it ideal for handling Q&A content efficiently.",
  },
  {
    name: "Zod",
    description: "A schema validation library for TypeScript.",
    reason:
      "It ensures all API requests and responses follow a strict structure, preventing invalid data.",
  },
  {
    name: "NextAuth.js",
    description: "Authentication library for Next.js.",
    reason:
      "It provides secure authentication with support for multiple providers like OAuth and JWT.",
  },
  {
    name: "React Hook Form",
    description: "A lightweight form-handling library for React.",
    reason:
      "It simplifies form validation and state management, improving user experience.",
  },
];

const AboutUs = () => {
  return (
    <div className="px-8 py-12 max-w-6xl mx-auto text-gray-800 dark:text-white">
      <h1 className="text-5xl font-bold text-blue-900 dark:text-white font-playfair-display mb-4">
        About FlashCode
      </h1>
      <p className="text-lg mb-8">
        <strong>FlashCode</strong> is a collaborative Q&A platform designed to
        help students share knowledge and find solutions to coding-related
        problems. It enables users to ask questions, provide answers, and engage
        in discussions to enhance learning. The platform focuses on ease of use,
        quick access to information, and a seamless experience for students.
      </p>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <h2 className="text-3xl font-semibold text-yellow-500 mb-4">
        Meet the Team
      </h2>
      <ul className="list-disc list-inside mb-8 space-y-2">
        {teamMembers.map((member, index) => (
          <li key={index} className="text-lg">
            <strong>{member.name}:</strong> {member.role}
          </li>
        ))}
      </ul>

      <hr className="my-8 border-gray-300 dark:border-gray-700" />

      <h2 className="text-3xl font-semibold text-yellow-500 mb-4">
        Tech Stack
      </h2>
      <div className="grid grid-cols-1  gap-6">
        {techStack.map((tech, idx) => (
          <TechStackCard key={idx} {...tech} />
        ))}
      </div>

      <h2 className=" font-pacifico text-3xl font-semibold text-yellow-500 mb-4 mt-4 text-center">
        Thank you
      </h2>
    </div>
  );
};

export default AboutUs;