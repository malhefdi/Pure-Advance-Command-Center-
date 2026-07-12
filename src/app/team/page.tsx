"use client";

import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { teamPulse } from "@/lib/seed-data";

const DEPT_COLORS: Record<string, string> = {
  Executive: "bg-brand-navy text-white",
  Research: "bg-blue-100 text-blue-800",
  Product: "bg-purple-100 text-purple-800",
  Finance: "bg-amber-100 text-amber-800",
  Programs: "bg-emerald-100 text-emerald-800",
};

const STATUS_DOT: Record<string, string> = {
  working: "bg-emerald-500",
  "in-meeting": "bg-amber-500",
  offline: "bg-gray-400",
};

const TEAM_PROFILES: Record<string, { title: string; dept: string; expertise: string }> = {
  "executive-lead": { title: "Executive lead", dept: "Executive", expertise: "Strategy, governance, and executive prioritization." },
  "research-lead": { title: "Research lead", dept: "Research", expertise: "Research planning, evidence quality, and technical readiness." },
  "product-lead": { title: "Product lead", dept: "Product", expertise: "Product lifecycle, regulatory coordination, and launch readiness." },
  "finance-lead": { title: "Finance lead", dept: "Finance", expertise: "Financial controls, invoice review, and source-of-truth reporting." },
  "program-lead": { title: "Program lead", dept: "Programs", expertise: "Program delivery, partner coordination, and outcome tracking." },
};

export default function TeamPage() {
  return (
    <AppShell active="/team">
      <MobileNav />
      <div className="mx-auto max-w-[1400px] p-4 md:p-8">
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
          Synthetic role-based profiles only. Personal contact details and biographies are intentionally excluded.
        </div>
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy">Team Operations</h1>
          <p className="mt-1 text-sm text-text-muted">{teamPulse.length} demonstration roles</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {teamPulse.map((member) => {
            const profile = TEAM_PROFILES[member.memberId];
            return (
              <article key={member.memberId} className="rounded-xl border border-gray-200 bg-white p-5 transition hover:shadow-md">
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h2 className="text-base font-bold text-brand-navy">{member.name}</h2>
                    <p className="text-xs text-text-muted">{profile?.title}</p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className={`h-2 w-2 rounded-full ${STATUS_DOT[member.status]}`} aria-hidden="true" />
                    <span className="text-[10px] capitalize text-text-muted">{member.status.replace("-", " ")}</span>
                  </div>
                </div>

                {profile ? (
                  <>
                    <span className={`mb-3 inline-block rounded-full px-2 py-0.5 text-[10px] font-medium ${DEPT_COLORS[profile.dept] ?? "bg-gray-100 text-gray-600"}`}>
                      {profile.dept}
                    </span>
                    <p className="mb-3 text-xs leading-relaxed text-text-secondary">{profile.expertise}</p>
                  </>
                ) : null}

                <div className="border-t border-gray-100 pt-3 text-xs text-text-muted">
                  Open tasks: <span className="font-semibold text-text-primary">{member.openTasks}</span>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </AppShell>
  );
}
