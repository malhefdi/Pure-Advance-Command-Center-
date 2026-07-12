"use client";

import type { Competitor } from "@/lib/coolvex-epic-data";

const trendColors: Record<string, string> = {
  Flat: "text-gray-500",
  Stable: "text-blue-600",
  "+61%": "text-emerald-600 font-bold",
  Growing: "text-emerald-600",
  Explosive: "text-orange-600 font-bold",
  "🚀": "text-purple-600 font-bold",
  Declining: "text-red-500",
};

export function CompetitorMatrix({ competitors }: { competitors: Competitor[] }) {
  return (
    <div className="space-y-3">
      <div className="grid gap-3 md:hidden">
        {competitors.map((c) => (
          <div key={c.name} className={`rounded-xl border p-4 ${c.name === "Coolvex" ? "border-purple-200 bg-purple-50" : "border-gray-200 bg-white"}`}>
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="font-semibold text-gray-900">{c.name === "Coolvex" ? "→ " : ""}{c.name}</div>
                <div className="mt-1 text-xs text-gray-500">{c.position}</div>
              </div>
              <div className={`rounded-full bg-white px-2 py-1 text-xs ${trendColors[c.trend] || "text-gray-600"}`}>{c.growth}</div>
            </div>
            <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
              <div className="rounded-lg bg-white/80 p-2">
                <div className="text-gray-400">Share</div>
                <div className="font-semibold text-gray-800">{c.share}</div>
              </div>
              <div className="rounded-lg bg-white/80 p-2">
                <div className="text-gray-400">Price</div>
                <div className="font-semibold text-gray-800">{c.price}</div>
              </div>
              <div className="rounded-lg bg-white/80 p-2">
                <div className="text-gray-400">2025E</div>
                <div className="font-semibold text-gray-800">{c.sales2025E > 0 ? `SAR ${(c.sales2025E / 1_000_000).toFixed(1)}M` : "—"}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-xl border border-gray-200 md:block">
        <table className="w-full text-sm">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left py-3 px-4 font-medium text-gray-500">Brand</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Share</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Price</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">2025E Sales</th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">Growth</th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">Position</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((c) => (
            <tr key={c.name} className={`border-b border-gray-100 ${c.name === "Coolvex" ? "bg-purple-50" : ""}`}>
              <td className="py-3 px-4 font-medium">{c.name === "Coolvex" ? "→ " : ""}{c.name}</td>
              <td className="py-3 px-4 text-right">{c.share}</td>
              <td className="py-3 px-4 text-right">{c.price}</td>
              <td className="py-3 px-4 text-right">{c.sales2025E > 0 ? `SAR ${(c.sales2025E / 1_000_000).toFixed(1)}M` : "—"}</td>
              <td className={`py-3 px-4 text-right ${trendColors[c.trend] || ""}`}>{c.growth}</td>
              <td className="py-3 px-4 text-gray-500 text-xs">{c.position}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}
