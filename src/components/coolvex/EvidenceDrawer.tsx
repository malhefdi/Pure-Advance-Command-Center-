"use client";

import { useState } from "react";
import type { EvidenceSource } from "@/lib/coolvex-epic-data";

const confidenceBadge: Record<string, string> = {
  verified: "bg-emerald-100 text-emerald-700",
  corrected: "bg-amber-100 text-amber-700",
  unverified: "bg-red-100 text-red-700",
  estimated: "bg-blue-100 text-blue-700",
};

export function EvidenceDrawer({ sources }: { sources: EvidenceSource[] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="rounded-xl border border-gray-200 bg-white">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition">
        <span className="text-sm font-medium text-gray-700">📋 {sources.length} sources cited</span>
        <span className="text-xs text-gray-400">{open ? "▲ Collapse" : "▼ Expand"}</span>
      </button>
      {open && (
        <div className="border-t border-gray-100 overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-50">
                <th className="text-left py-2 px-4 font-medium text-gray-500">Claim</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500">Value</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500">Source</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500">Modified</th>
                <th className="text-left py-2 px-4 font-medium text-gray-500">Confidence</th>
              </tr>
            </thead>
            <tbody>
              {sources.map((s, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="py-2 px-4 font-medium text-gray-800">{s.claim}</td>
                  <td className="py-2 px-4 text-gray-700">{s.value}</td>
                  <td className="py-2 px-4 text-gray-500 truncate max-w-[200px]" title={s.source}>{s.source.split("/").pop()}</td>
                  <td className="py-2 px-4 text-gray-500">{s.modified}</td>
                  <td className="py-2 px-4"><span className={`px-2 py-0.5 rounded-full font-medium ${confidenceBadge[s.confidence]}`}>{s.confidence}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
