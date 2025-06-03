"use client";

import GyeMoon from "@/components/GyeMoon";
import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";
import TimeInput from "@/components/TimeInput";
import isDev, { getTodayDateString } from "@/lib/utils";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import OnSaengChwi from "@/components/OnSaengChwi";

export default function Home() {
  // reset localStorage if today is a new day
  useEffect(() => {
    if (typeof window === "undefined") return;
    const lastClearDate = localStorage.getItem("lastClearDate");
    const today = getTodayDateString();
    if (lastClearDate !== today) {
      localStorage.clear();
      localStorage.setItem("lastClearDate", today);
    }
  }, []);

  return (
    <>
      {!isDev() && <Analytics />}
      <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
        <h1 className="text-2xl font-semibold">상시일기</h1>
        <div className="block italic">- work in progress -</div>
        <OnSaengChwi />
        <TimeInput />
        <GyeMoon />
        <ResetLocalStorageButton />
      </main>
    </>
  );
}
