"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";

interface SectionData {
  title: string;
  yunyum: number;
  munyum: number;
}

export default function GyoDangNaeWang() {
  const [sections, setSections] = useState<SectionData[]>([
    { title: "공부문답", yunyum: 0, munyum: 0 },
    { title: "감각감정", yunyum: 0, munyum: 0 },
    { title: "의심해오", yunyum: 0, munyum: 0 },
  ]);

  const handleIncrement = (index: number, type: "yunyum" | "munyum") => {
    setSections((prev) => {
      const currentValue = prev[index][type];
      const displayedValue = sections[index][type];
      if (currentValue !== displayedValue) return prev;
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [type]: updated[index][type] + 1,
      };
      return updated;
    });
  };

  console.log('교당내왕')

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
