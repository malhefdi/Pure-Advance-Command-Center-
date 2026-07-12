"use client";

import type { Y1Scenario } from "@/lib/coolvex-epic-data";

export function ScenarioCard({ scenario, highlight = false }: { scenario: Y1Scenario; highlight?: boolean }) {
  const modeled = scenario.units > 0 || scenario.velocity > 0 || scenario.profit !== 0;
  return (
    <article className={`space-y-3 rounded-xl border border-gray-200 bg-white p-4 ${highlight ? "ring-2 ring-blue-400" : ""}`}>
      <div className="flex items-center justify-between gap-3">
        <h2 className="font-bold text-gray-900">{scenario.scenario}</h2>
        <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] font-medium text-gray-600">{scenario.confidence}</span>
      </div>
      <dl className="grid grid-cols-2 gap-2 text-sm">
        <div><dt className="text-gray-500">Units</dt><dd className="font-semibold">{modeled ? scenario.units.toLocaleString() : "Not modeled"}</dd></div>
        <div><dt className="text-gray-500">Velocity</dt><dd className="font-semibold">{modeled ? `${scenario.velocity}/location/month` : "Not modeled"}</dd></div>
        <div><dt className="text-gray-500">Profit</dt><dd className="font-semibold">{modeled ? `${scenario.profit.toLocaleString()} SAR` : "Not modeled"}</dd></div>
        <div><dt className="text-gray-500">Risk</dt><dd className="font-semibold">{scenario.risk}</dd></div>
      </dl>
      <p className="text-xs text-gray-500">Market share: {scenario.marketShareRiyadh}</p>
    </article>
  );
}
