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
        <div
          key={i}
          className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:flex-nowrap sm:items-center sm:gap-3"
        >
          <div className="flex min-w-0 gap-3 sm:flex-1 sm:items-center">
            <span
              className={`mt-1.5 h-2.5 w-2.5 shrink-0 rounded-full sm:mt-0 ${priorityDot[item.priority]}`}
            />
            <div className="min-w-0 flex-1 space-y-1">
              <div className="text-sm font-medium break-words text-gray-900 sm:truncate">{item.title}</div>
              <div className="w-full text-xs text-gray-500 break-words">
                {item.owner} · {item.product}
              </div>
            </div>
          </div>
          <div className="flex w-full min-w-0 shrink-0 flex-col gap-2 pt-1 sm:w-auto sm:flex-row sm:flex-nowrap sm:items-center sm:justify-end sm:gap-3 sm:pt-0">
            <span
              className={`inline-flex w-fit max-w-full px-2 py-0.5 text-[10px] font-medium rounded-full ${statusBadge[item.status]}`}
            >
              {item.status}
            </span>
            <span className="w-full min-w-0 text-xs break-words text-gray-400 sm:w-auto">{item.due}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
