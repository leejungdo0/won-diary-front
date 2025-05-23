// MirijoonbiWrapper.tsx
"use client";

import { useState, useEffect } from "react";
import { format } from "date-fns";
import Mirijoonbi from "./Mirijoonbi";
import OnSaengChwi from "./OnSaengChwi";
import GyoDangNaeWang from "./GyoDangNaeWang";

interface CountState {
  yunyum: number;
  munyum: number;
}

interface SectionData {
  title: string;
  yunyum: number;
  munyum: number;
}

export default function MirijoonbiWrapper() {
  const today = format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState(today);
  const [team, setTeam] = useState("");

  const [miRiJoonBi, setMirijoonbi] = useState<CountState>({ yunyum: 0, munyum: 0 });
  const [gyoDangData, setGyoDangData] = useState<SectionData[]>([
    { title: "공부문답", yunyum: 0, munyum: 0 },
    { title: "감각감정", yunyum: 0, munyum: 0 },
    { title: "의심해오", yunyum: 0, munyum: 0 },
  ]);

  const getKey = (base: string) => `${base}-${date}`;

  useEffect(() => {
    const mirStored = localStorage.getItem(getKey("mirijoonbi"));
    const teamStored = localStorage.getItem(getKey("team"));
    const gyoStored = localStorage.getItem(getKey("gyodangnaewang"));

    if (mirStored) setMirijoonbi(JSON.parse(mirStored));
    if (teamStored) setTeam(teamStored);
    if (gyoStored) setGyoDangData(JSON.parse(gyoStored));
  }, [date]);

  useEffect(() => {
    localStorage.setItem(getKey("mirijoonbi"), JSON.stringify(miRiJoonBi));
  }, [miRiJoonBi, date]);

  useEffect(() => {
    localStorage.setItem(getKey("gyodangnaewang"), JSON.stringify(gyoDangData));
  }, [gyoDangData, date]);

  useEffect(() => {
    localStorage.setItem(getKey("team"), team);
  }, [team, date]);

  const increment = (key: keyof CountState) => {
    setMirijoonbi((prev) => ({ ...prev, [key]: prev[key] + 1 }));
  };

  const decrement = (key: keyof CountState) => {
    setMirijoonbi((prev) => ({ ...prev, [key]: Math.max(0, prev[key] - 1) }));
  };

  const incrementGyo = (index: number, type: keyof CountState) => {
    setGyoDangData((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, [type]: item[type] + 1 } : item
      )
    );
  };

  // 외부 상태의 합계를 계산해서 OnSaengChwi에 전달
  const gyoTotal = gyoDangData.reduce(
    (acc, item) => ({
      yunyum: acc.yunyum + item.yunyum,
      munyum: acc.munyum + item.munyum,
    }),
    { yunyum: 0, munyum: 0 }
  );

  const synced = {
    yunyum: miRiJoonBi?.yunyum + gyoTotal.yunyum || 0,
    munyum: miRiJoonBi?.munyum + gyoTotal.munyum || 0,
  };

  return (
    <div className="w-full mx-auto mt-10 space-y-6">
      <OnSaengChwi synced={synced} />

      <Mirijoonbi
        miRiJoonBi={miRiJoonBi}
        increment={increment}
        decrement={decrement}
      />

      <GyoDangNaeWang
        sections={gyoDangData}
        handleIncrement={incrementGyo}
      />
    </div>
  );
}
