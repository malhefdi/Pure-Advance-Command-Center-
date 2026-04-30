"use client";

import type { MarketData } from "@/lib/coolvex-epic-data";

export function MarketBattlefield({ data }: { data: MarketData[] }) {
  const top = data.slice(0, 6);
  const maxSales = Math.max(...top.map((d) => d.sales2025E));
  return (
    <div className="space-y-3">
      {top.map((d) => (
        <div key={d.product} className="flex items-center gap-3">
          <div className="w-32 text-xs font-medium text-gray-700 text-right">{d.product}</div>
          <div className="flex-1 bg-gray-100 rounded-full h-6 overflow-hidden relative">
            <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(d.sales2025E / maxSales) * 100}%` }} />
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center px-2">
              <span className="max-w-[calc(100%-1rem)] truncate rounded-md bg-gray-950/90 px-2.5 py-1 leading-none text-[10px] font-medium text-white shadow-sm backdrop-blur-sm ring-1 ring-black/20">
                SAR {(d.sales2025E / 1_000_000).toFixed(1)}M
              </span>
            </div>
          </div>
          <div className={`w-16 text-xs text-right ${d.growth.startsWith("+") ? "text-emerald-600" : d.growth.startsWith("-") ? "text-red-500" : "text-gray-500"}`}>
            {d.growth}
          </div>
        </div>
      ))}
    </div>
  );
}
