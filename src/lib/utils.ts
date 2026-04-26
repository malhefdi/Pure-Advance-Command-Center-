import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSAR(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "-";
  }
  return `${Math.round(value).toLocaleString("en-US")} SAR`;
}

export function formatCompactSAR(value: number) {
  if (Math.abs(value) >= 1_000_000) return `${(value / 1_000_000).toFixed(1)}M SAR`;
  if (Math.abs(value) >= 1_000) return `${Math.round(value / 1_000).toLocaleString("en-US")}K SAR`;
  return formatSAR(value);
}

export function isStale(isoDate: string, now = new Date()) {
  const updatedAt = new Date(isoDate).getTime();
  return now.getTime() - updatedAt > 24 * 60 * 60 * 1000;
}

export function daysUntil(isoDate: string, now = new Date()) {
  const due = new Date(`${isoDate}T00:00:00`).getTime();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  return Math.ceil((due - today) / (24 * 60 * 60 * 1000));
}
