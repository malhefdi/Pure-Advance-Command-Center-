"use client";

import type { ActionItem } from "@/lib/coolvex-epic-data";

const priorityDot: Record<string, string> = {
  critical: "bg-red-500",
  high: "bg-amber-500",
  medium: "bg-blue-500",
  low: "bg-gray-400",
};

const statusBadge: Record<string, string> = {
  open: "bg-gray-100 text-gray-700",
  "in-progress": "bg-blue-100 text-blue-700",
  blocked: "bg-red-100 text-red-700",
  done: "bg-emerald-100 text-emerald-700",
};

export function ActionLane({ items }: { items: ActionItem[] }) {
  const sorted = [...items].sort((a, b) => {
    const order = { critical: 0, high: 1, medium: 2, low: 3 };
    return (order[a.priority] ?? 9) - (order[b.priority] ?? 9);
  });
  return (
    <div className="space-y-2">
      {sorted.map((item, i) => (
        <div key={i} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-3">
          <span className={`w-2.5 h-2.5 rounded-full ${priorityDot[item.priority]}`} />
          <div className="flex-1 min-w-0">
            <div className="text-sm font-medium text-gray-900 truncate">{item.title}</div>
            <div className="text-xs text-gray-500">{item.owner} · {item.product}</div>
          </div>
          <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${statusBadge[item.status]}`}>{item.status}</span>
          <span className="text-xs text-gray-400">{item.due}</span>
        </div>
      ))}
    </div>
  );
}
