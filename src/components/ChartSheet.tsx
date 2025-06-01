// components/ChartSheet.tsx
"use client";

import React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import ChartInsideSheet from "./ChartInsideSheet"; // 실제 경로에 맞게 수정하세요

interface ChartSheetProps {
  /** Sheet를 여는 트리거에 표시할 레이블 */
  label: string;
  /** ChartInsideSheet에 전달할 데이터 */
  data: { date: string; value: number }[];
}

export default function ChartSheet({ label, data }: ChartSheetProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <span>{label}</span>
      </SheetTrigger>

      <SheetContent side="right" className="w-full sm:w-1/2">
        <SheetHeader>
          <SheetTitle className="text-lg font-medium">{label} 차트</SheetTitle>
        </SheetHeader>

        <div className="mt-4 h-64">
          <ChartInsideSheet item={data} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
