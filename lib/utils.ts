import { techMap } from "@/constants/techMap";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDeviconClassName = (techName: string): string => {
  if (!techName) return "devicon-devicon-plain"; // Handle empty input

  // Step 1: Normalize input
  const normalizedTechName = techName
    .replace(/[.\-_]/g, "") // Remove dots, hyphens, and underscores
    .replace(/\s+/g, "") // Remove spaces
    .toLowerCase()
    .trim();

  // Step 2: Check for Kent-related names
  const kentNames = ["kent", "flash", "kentstate", "ksu"];
  if (kentNames.some((name) => normalizedTechName.includes(name))) {
    return "IMAGE:/kent.svg"; // Special identifier for images
  }

  // Step 3: Direct match
  if (techMap[normalizedTechName]) {
    return `${techMap[normalizedTechName]} colored`;
  }

  // Step 4: Common aliases and abbreviations
  const aliasMap: { [key: string]: string } = {
    js: "javascript",
    ts: "typescript",
    reactjs: "react",
    vue: "vuejs",
    tailwind: "tailwindcss",
    next: "nextjs",
    node: "nodejs",
    deno: "denojs",
    postgres: "postgresql",
    aws: "amazonwebservices",
    gcp: "googlecloud",
    azuredevops: "azure",
  };

  if (aliasMap[normalizedTechName]) {
    return techMap[aliasMap[normalizedTechName]]
      ? `${techMap[aliasMap[normalizedTechName]]} colored`
      : "devicon-devicon-plain";
  }

  // Step 5: Multi-word input handling
  const words = techName.toLowerCase().split(/\s+/); // Split by spaces
  for (let word of words) {
    if (techMap[word]) return `${techMap[word]} colored`;
    if (aliasMap[word] && techMap[aliasMap[word]])
      return `${techMap[aliasMap[word]]} colored`;
  }

  // Step 6: Fuzzy matching (Partial match in techMap keys)
  for (const key in techMap) {
    if (key.includes(normalizedTechName) || normalizedTechName.includes(key)) {
      return `${techMap[key]} colored`;
    }
  }

  // Step 7: Default icon
  return "devicon-devicon-plain";
};
