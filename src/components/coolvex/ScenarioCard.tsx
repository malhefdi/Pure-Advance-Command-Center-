"use client";

import type { Y1Scenario } from "@/lib/coolvex-epic-data";

const riskColors: Record<string, string> = {
  Low: "border-emerald-300 bg-emerald-50",
  Moderate: "border-amber-300 bg-amber-50",
  High: "border-red-300 bg-red-50",
};

const scenarioIcons: Record<string, string> = {
  Floor: "🔵",
  Conservative: "🟡",
  "Base Case": "🟢",
  Aggressive: "🔴",
};

export function ScenarioCard({ scenario, highlight = false }: { scenario: Y1Scenario; highlight?: boolean }) {
  const riskKey = scenario.risk.replace("Risk", "").trim();
  return (
    <div className={`rounded-xl border p-4 space-y-2 ${riskColors[riskKey] || "border-gray-200 bg-white"} ${highlight ? "ring-2 ring-blue-400" : ""}`}>
      <div className="flex items-center justify-between">
        <span className="font-bold text-gray-900">{scenarioIcons[scenario.scenario] || ""} {scenario.scenario}</span>
        {highlight && <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 font-medium">DEFAULT</span>}
      </div>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div><span className="text-gray-500">Units:</span> <strong>{scenario.units.toLocaleString()}</strong></div>
        <div><span className="text-gray-500">Velocity:</span> <strong>{scenario.velocity}/loc/mo</strong></div>
        <div><span className="text-gray-500">Profit:</span> <strong>SAR {scenario.profit.toLocaleString()}</strong></div>
        <div><span className="text-gray-500">Confidence:</span> <strong>{scenario.confidence}</strong></div>
      </div>
      <div className="text-xs text-gray-500">Riyadh share: {scenario.marketShareRiyadh} · Risk: {scenario.risk}</div>
    </div>
  );
}
