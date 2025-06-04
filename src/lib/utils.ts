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
  const maxBase = Math.min(1440, MAX_TOTAL - sumExcept);
  return Math.min(Math.max(base, 0), maxBase);
};

export const getTodayDateString = () => new Date().toISOString().slice(0, 10); // 오늘 날짜 YYYY-MM-DD

const development: boolean = !process.env.NODE_ENV || process.env.NODE_ENV === "development";
export default function isDev(): boolean {
  return development;
}

/**
 * Debounce 함수: 마지막 호출 이후 주어진 대기 시간(ms)만큼 추가 호출이 없을 때 실행
 * @param fn - 호출할 함수
 * @param wait - 대기 시간(ms)
 * @returns debounced function
 */
export function debounce<T extends (...args: any[]) => any>(fn: T, wait: number): T {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return function (this: any, ...args: any[]) {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, wait);
  } as T;
}
