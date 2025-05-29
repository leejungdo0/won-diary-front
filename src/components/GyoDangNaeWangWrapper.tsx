"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import GyoDangNaeWang from "./GyoDangNaeWang";

interface SectionData {
  title: string;
  yunyum: number;
  munyum: number;
}

export default function GyoDangNaeWangWrapper() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [sections, setSections] = useState<SectionData[]>([
    { title: "공부문답", yunyum: 0, munyum: 0 },
    { title: "감각감정", yunyum: 0, munyum: 0 },
    { title: "의심해오", yunyum: 0, munyum: 0 },
  ]);

  const getStorageKey = (date: string) => `gyodangnaewang-${date}`;

  useEffect(() => {
    const stored = localStorage.getItem(getStorageKey(today));
    if (stored) {
      try {
        setSections(JSON.parse(stored));
      } catch (e) {
        console.error("불러오기 실패:", e);
      }
    }
  }, [today]);

  useEffect(() => {
    localStorage.setItem(getStorageKey(today), JSON.stringify(sections));
  }, [sections, today]);

  const handleIncrement = (index: number, type: "yunyum" | "munyum") => {
    setSections(prev =>
      prev.map((item, i) => (i === index ? { ...item, [type]: item[type] + 1 } : item))
    );
  };

  return <GyoDangNaeWang sections={sections} handleIncrement={handleIncrement} />;
}
