"use client";

import type { PharmacyData } from "@/lib/coolvex-epic-data";

export function PharmacyFootprint({ data, totalPilot }: { data: PharmacyData[]; totalPilot: number }) {
  const maxCount = Math.max(0, ...data.map((record) => record.count));
  const total = data.reduce((sum, record) => sum + record.count, 0);

  return (
    <div className="space-y-4">
      <div className="grid gap-3 text-sm sm:grid-cols-2">
        <p><span className="text-gray-500">Approved pilot target:</span> <strong>{totalPilot > 0 ? totalPilot.toLocaleString() : "Not available"}</strong></p>
        <p><span className="text-gray-500">Current licensed count:</span> <strong>{total > 0 ? total.toLocaleString() : "Not available"}</strong></p>
      </div>
      <div className="space-y-2">
        {data.map((record) => {
          const width = maxCount > 0 ? Math.min(Math.max((record.count / maxCount) * 100, 0), 100) : 0;
          return (
            <div key={record.cityEn} className="grid gap-2 sm:grid-cols-[100px_1fr_100px] sm:items-center">
              <div className="text-xs text-gray-600 sm:text-right">{record.cityEn}</div>
              <div className="h-5 overflow-hidden rounded-full bg-gray-100"><div className="h-full rounded-full bg-blue-500" style={{ width: `${width}%` }} /></div>
              <div className="text-xs font-medium text-gray-700">{record.count > 0 ? record.count.toLocaleString() : "Not available"}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
