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
    <div className="overflow-x-auto rounded-xl border border-gray-200">
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
  );
}
