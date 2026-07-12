import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatSAR(value: number | null | undefined) {
  if (value === null || value === undefined || Number.isNaN(value)) {
    return "Unknown";
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
  if (!Number.isFinite(updatedAt)) return true;
  return now.getTime() - updatedAt > 24 * 60 * 60 * 1000;
}

export function daysUntil(isoDate: string, now = new Date()) {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(isoDate);
  if (!match || !Number.isFinite(now.getTime())) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const due = Date.UTC(year, month - 1, day);
  const parsed = new Date(due);

  if (
    parsed.getUTCFullYear() !== year ||
    parsed.getUTCMonth() !== month - 1 ||
    parsed.getUTCDate() !== day
  ) {
    return null;
  }

  const today = Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());
  return Math.round((due - today) / (24 * 60 * 60 * 1000));
}
