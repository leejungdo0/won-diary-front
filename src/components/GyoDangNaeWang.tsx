"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { format } from "date-fns";

interface SectionData {
  title: string;
  yunyum: number;
  munyum: number;
}

export default function GyoDangNaeWang() {
  const getTodayDateString = () => format(new Date(), "yyyy-MM-dd");
  const [date, setDate] = useState(getTodayDateString());

  const getStorageKey = (date: string) => `gyodangnaewang-${date}`;

  const defaultSections: SectionData[] = [
    { title: "공부문답", yunyum: 0, munyum: 0 },
    { title: "감각감정", yunyum: 0, munyum: 0 },
    { title: "의심해오", yunyum: 0, munyum: 0 },
  ];

  const [sections, setSections] = useState<SectionData[]>(defaultSections);

  // ✅ 데이터 불러오기
  useEffect(() => {
    if (typeof window === "undefined") return;

    const stored = localStorage.getItem(getStorageKey(date));
    if (stored) {
      try {
        setSections(JSON.parse(stored));
      } catch (e) {
        console.error("불러오기 실패:", e);
      }
    } else {
      setSections(defaultSections);
    }
  }, [date]);

  // ✅ 데이터 저장
  useEffect(() => {
    if (typeof window === "undefined") return;

    localStorage.setItem(getStorageKey(date), JSON.stringify(sections));
  }, [sections, date]);

  const handleIncrement = (index: number, type: "yunyum" | "munyum") => {
    setSections((prev) => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [type]: updated[index][type] + 1,
      };
      return updated;
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-6">
      <Card>
        {sections.map((section, index) => (
          <CardContent key={section.title} className="space-y-4 pt-6">
            <div className="block">{section.title}</div>

            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-medium block">
                有念 ({section.yunyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(index, "yunyum")}
              >
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>

            <div className="flex items-center justify-between mt-4 mb-2">
              <label className="text-sm font-medium block">
                無念 ({section.munyum})
              </label>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(index, "munyum")}
              >
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
          </CardContent>
        ))}
      </Card>
    </div>
  );
}
