"use client";

import type { PharmacyData } from "@/lib/coolvex-epic-data";

export function PharmacyFootprint({ data, totalPilot }: { data: PharmacyData[]; totalPilot: number }) {
  const maxCount = Math.max(...data.map((d) => d.count));
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-sm font-medium text-gray-900">Pilot Target: {totalPilot} pharmacies</div>
          <div className="text-xs text-gray-500">7 chains in Riyadh</div>
        </div>
        <div className="text-right">
          <div className="text-sm font-medium text-gray-900">{data.reduce((s, d) => s + d.count, 0).toLocaleString()} total SFDA records</div>
          <div className="text-xs text-gray-500">Licensed pharmacies list</div>
        </div>
      </div>
      <div className="space-y-2">
        {data.slice(0, 10).map((d) => (
          <div key={d.cityEn} className="flex items-center gap-3">
            <div className="w-24 text-xs text-gray-600 text-right">{d.cityEn}</div>
            <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
              <div className="bg-blue-500 h-full rounded-full" style={{ width: `${(d.count / maxCount) * 100}%` }} />
            </div>
            <div className="w-16 text-xs font-medium text-gray-700">{d.count.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
