import { NextRequest, NextResponse } from "next/server";
import { getTasks } from "@/lib/dashboard-service";
import type { TaskFilter } from "@/types/command-center";
const filters = new Set(["overdue", "week", "blocked"]);
export function GET(request: NextRequest) {
  const filter = request.nextUrl.searchParams.get("filter");
  const safeFilter = filter && filters.has(filter) ? (filter as TaskFilter) : undefined;
  return NextResponse.json(getTasks(safeFilter));
}
