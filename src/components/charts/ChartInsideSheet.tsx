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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../ui/card";
import { TrendingUp } from "lucide-react";

// Define ChartPoint type if not already imported
export type ChartPoint = {
  date: string; // x axis, formatted as "YYYY-MM-DD"
  value: number; // y axis, numeric value for the chart
};

interface ChartInsideSheetProps {
  item: ChartPoint[]; // 차트 데이터 배열
}

export default function ChartInsideSheet({ item }: ChartInsideSheetProps) {
  const chartData = item;

  if (!Array.isArray(chartData) || chartData.length === 0) {
    return <div className="text-center py-8">차트 데이터가 없습니다.</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Line Chart</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>

      <CardContent className="h-64">
        {/* ResponsiveContainer should wrap only the chart itself */}
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>

      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
