"use client";

import React from "react";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

// Define ChartPoint type if not already imported
export type ChartPoint = {
  date: string; // x axis, formatted as "YYYY-MM-DD"
  value: number; // y axis, numeric value for the chart
};
interface ChartInsideSheetProps {
  item: ChartPoint[]; // 차트 데이터 배열
}

/**
 * ChartInsideSheet는 OnSaengChwiWithSheet 컴포넌트 내부에서 사용될
 * Recharts 기반의 선형 시계열 차트 컴포넌트입니다.
 */
export default function ChartInsideSheet({ item }: ChartInsideSheetProps) {
  // useSangSiIlGiStore에서 차트 데이터를 가져옵니다.
  const chartData = item;

  // 데이터 없으면 안내 메시지 표시
  if (!Array.isArray(chartData) || chartData.length === 0) {
    return <div className="text-center py-8">차트 데이터가 없습니다.</div>;
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" tick={{ fontSize: 12 }} />
        <YAxis tick={{ fontSize: 12 }} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
      </LineChart>
    </ResponsiveContainer>
  );
}
