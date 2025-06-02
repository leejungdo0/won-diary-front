"use client";

import React from "react";
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ChartNoAxesCombined } from "lucide-react";
import dynamic from "next/dynamic";

interface ChartSheetProps {
  /** Sheet를 여는 트리거에 표시할 레이블 */
  label: string;
  /** ChartInsideSheet에 전달할 데이터 */
  data: { date: string; value: number }[];
}

export default function ChartSheet({ label, data }: ChartSheetProps) {
  const ChartInsideSheet = dynamic(() => import("./ChartInsideSheet"));

  return (
    <Sheet>
      <div className="relative w-full h-10">
        {/* 첫 번째 span: 부모의 가로 절반 위치, -50%만큼 왼쪽으로 이동해 중앙에 놓음 */}
        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          {label}
        </span>{" "}
        <SheetTrigger asChild>
          {/* 두 번째 span(아이콘): 부모의 오른쪽 끝에 배치 */}
          <span className="absolute right-2 top-1/2 cursor-pointer gray -translate-y-1/2 hover:text-blue-700 transition-colors">
            <ChartNoAxesCombined size={16} />
          </span>
        </SheetTrigger>
      </div>

      <SheetContent side="right" className="w-full">
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
