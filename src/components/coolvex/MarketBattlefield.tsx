"use client";

import type { MarketData } from "@/lib/coolvex-epic-data";

export function MarketBattlefield({ data }: { data: MarketData[] }) {
  const top = data.slice(0, 6);
  const maxSales = Math.max(0, ...top.map((record) => record.sales2025E));

  if (top.length === 0) {
    return <p className="text-sm text-gray-500">No market records are loaded.</p>;
  }

  return (
    <div className="space-y-3">
      {maxSales === 0 ? <p className="rounded-lg bg-gray-50 p-3 text-sm text-gray-600">Commercial values are withheld until a licensed, current source is approved.</p> : null}
      {top.map((record) => {
        const width = maxSales > 0 ? Math.min(Math.max((record.sales2025E / maxSales) * 100, 0), 100) : 0;
        return (
          <div key={record.product} className="grid gap-2 sm:grid-cols-[140px_1fr_80px] sm:items-center">
            <div className="text-xs font-medium text-gray-700 sm:text-right">{record.product}</div>
            <div className="relative h-6 overflow-hidden rounded-full bg-gray-100">
              <div className="h-full rounded-full bg-blue-500" style={{ width: `${width}%` }} />
              <div className="absolute inset-0 flex items-center justify-center text-[10px] font-medium text-gray-700">
                {record.sales2025E > 0 ? `${(record.sales2025E / 1_000_000).toFixed(1)}M SAR` : "Withheld"}
              </div>
            </div>
            <div className="text-xs text-gray-500 sm:text-right">{record.growth}</div>
          </div>
        );
      })}
    </div>
  );
}
