import { MAX_TOTAL } from "@/constants";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import process from "process";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatTime = (minutes: number): string => {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m}분`;
  if (m === 0) return `${h}시간`;
  return `${h}시간 ${m}분`;
};

// Helper: clamp base time for slider and inputs
export const clampTime = (
  item: string,
  base: number,
  siGan: Record<string, number> = {}
): number => {
  const sumExcept = Object.values(siGan).reduce((s, t) => s + t, 0) - (siGan[item] || 0);
  const maxBase = Math.min(720, MAX_TOTAL - sumExcept);
  console.log(`clampTime: item=${item}, base=${base}, maxBase=${maxBase}`);
  return Math.min(Math.max(base, 0), maxBase);
};

export const getTodayDateString = () => new Date().toISOString().slice(0, 10); // 오늘 날짜 YYYY-MM-DD

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
export default function isDev(): boolean {
  return development;
}
