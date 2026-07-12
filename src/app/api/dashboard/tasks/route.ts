import { NextRequest, NextResponse } from "next/server";
import { enforceApiAccess } from "@/lib/access-control";
import { getTasks } from "@/lib/dashboard-service";
import type { TaskFilter } from "@/types/command-center";
const filters = new Set(["overdue", "week", "blocked"]);
export function GET(request: NextRequest) {
  const denied = enforceApiAccess(request);
  if (denied) return denied;
  const filter = request.nextUrl.searchParams.get("filter");
  const safeFilter = filter && filters.has(filter) ? (filter as TaskFilter) : undefined;
  return NextResponse.json(getTasks(safeFilter));
}
