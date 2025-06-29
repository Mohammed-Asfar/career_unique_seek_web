import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateString) {
  if (!dateString) return "Date not available";

  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 1) return "1 day ago";
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 14) return "1 week ago";
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 60) return "1 month ago";

  return date.toLocaleDateString();
}

export function truncateText(text, maxLength = 150) {
  if (!text) return "";
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
}

export function cleanDescription(description) {
  if (!description) return "";

  // Remove HTML tags
  const withoutHtml = description.replace(/<[^>]*>/g, "");

  // Replace multiple whitespace with single space
  const cleaned = withoutHtml.replace(/\s+/g, " ").trim();

  return cleaned;
}

export function normalizeSkills(skills) {
  if (!skills) return [];

  // If it's already an array, return it
  if (Array.isArray(skills)) return skills;

  // If it's a string, try to split it
  if (typeof skills === "string") {
    return skills
      .split(",")
      .map((skill) => skill.trim())
      .filter((skill) => skill.length > 0);
  }

  // If it's something else, return empty array
  return [];
}
