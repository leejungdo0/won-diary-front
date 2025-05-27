"use client"

import Gyemun from "@/components/Gyemun";
import MirijoonbiWrapper from "@/components/MirijoonbiWrapper";
import ResetLocalStorageButton from "@/components/ResetLocalStorageButton";
import TimeInput from "@/components/TimeInput";
import { useEffect } from "react";



export default function Home() {
  const getTodayDateString = () => new Date().toISOString().split("T")[0];
  
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
    <main className="min-h-screen flex flex-col items-center justify-center p-4 space-y-8">
      <h1 className="text-2xl font-semibold">상시일기</h1>
      <div className="block italic">- work in progress -</div>
      <MirijoonbiWrapper />
      <TimeInput />
      <Gyemun />
      <ResetLocalStorageButton />
    </main>
  );
}
