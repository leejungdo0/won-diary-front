// GyoDangNaeWang.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

interface SectionData {
  title: string;
  yunyum: number;
  munyum: number;
}

export default function GyoDangNaeWang({
  sections,
  handleIncrement,
}: {
  sections: SectionData[];
  handleIncrement: (index: number, type: "yunyum" | "munyum") => void;
}) {
  return (
    <div className="max-w-md mx-auto space-y-6">
      <Card>
        {sections.map((section, index) => (
          <CardContent key={section.title} className="pt-6 space-y-3">
            <div className="font-semibold">{section.title}</div>
            <div className="flex items-center justify-between">
              <span>有念: {section.yunyum}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleIncrement(index, "yunyum")}
              >
                <PlusIcon className="h-4 w-4 text-green-600" />
              </Button>
            </div>
            <div className="flex items-center justify-between">
              <span>無念: {section.munyum}</span>
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
