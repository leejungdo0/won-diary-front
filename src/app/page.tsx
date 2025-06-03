"use client";

import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";
import isDev, { getTodayDateString } from "@/lib/utils";
import { useEffect } from "react";
import { Analytics } from "@vercel/analytics/next";
import dynamic from "next/dynamic";
import Loading from "@/components/Loading";

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

  const OnSaengChwi = dynamic(() => import("@/components/OnSaengChwi"), {
    ssr: false,
    loading: () => <Loading />,
  });
  const TimeInput = dynamic(() => import("@/components/SooYangYeonGooSigan"), {
    ssr: false,
    loading: () => <Loading />,
  });
  const GyeMoon = dynamic(() => import("@/components/GyeMoon"), {
    ssr: false,
    loading: () => <Loading />,
  });

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
