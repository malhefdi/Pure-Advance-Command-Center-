"use client";

import type { GtmStat } from "@/lib/coolvex-epic-data";

const confidenceColors: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-700",
  corrected: "bg-amber-100 text-amber-700",
  unverified: "bg-red-100 text-red-700",
  estimated: "bg-blue-100 text-blue-700",
};

export function EvidenceMetricCard({ stat }: { stat: GtmStat }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-1">
      <div className="text-[10px] text-gray-400 uppercase tracking-wide">{stat.label}</div>
      <div className="text-xl font-bold text-gray-900">{stat.value}</div>
      <div className="text-xs text-gray-500">{stat.sub}</div>
      <div className="flex items-center gap-2 pt-1">
        <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-medium ${confidenceColors[stat.confidence] || "bg-gray-100 text-gray-600"}`}>
          {stat.confidence}
        </span>
        <span className="text-[10px] text-gray-400 truncate" title={stat.source}>{stat.source.split("/").pop()}</span>
      </div>
    </div>
  );
}
