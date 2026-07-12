"use client";

import { useMemo, useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { interactions, partners } from "@/lib/crm-seed-data";
import type { InteractionType, PartnerCategory, PartnerStatus, PartnerType } from "@/types/crm";

const TYPE_LABELS: Record<PartnerType, string> = {
  current: "Current",
  prospect: "Prospect",
  outreach: "Outreach",
};

const STATUS_COLORS: Record<PartnerStatus, string> = {
  active: "bg-emerald-100 text-emerald-800",
  pending: "bg-amber-100 text-amber-800",
  dormant: "bg-gray-100 text-gray-600",
  lost: "bg-red-100 text-red-800",
};

const CATEGORY_COLORS: Record<PartnerCategory, string> = {
  investor: "bg-purple-100 text-purple-800",
  manufacturer: "bg-blue-100 text-blue-800",
  academic: "bg-cyan-100 text-cyan-800",
  government: "bg-indigo-100 text-indigo-800",
  supplier: "bg-orange-100 text-orange-800",
  client: "bg-pink-100 text-pink-800",
  partner: "bg-teal-100 text-teal-800",
};

const INTERACTION_LABELS: Record<InteractionType, string> = {
  call: "Call",
  email: "Email",
  meeting: "Meeting",
  whatsapp: "Message",
  document: "Document",
  note: "Note",
};

export default function CrmPage() {
  const [typeFilter, setTypeFilter] = useState<"all" | PartnerType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | PartnerStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();
    return partners.filter((partner) => {
      if (typeFilter !== "all" && partner.type !== typeFilter) return false;
      if (statusFilter !== "all" && partner.status !== statusFilter) return false;
      if (!query) return true;
      return [partner.name, partner.organization, ...partner.tags]
        .filter((value): value is string => Boolean(value))
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [search, statusFilter, typeFilter]);

  const selected = selectedId ? partners.find((partner) => partner.partnerId === selectedId) : undefined;
  const selectedInteractions = selected
    ? interactions
        .filter((interaction) => interaction.partnerId === selected.partnerId)
        .toSorted((left, right) => right.date.localeCompare(left.date))
    : [];

  const stats = {
    total: partners.length,
    current: partners.filter((partner) => partner.type === "current").length,
    prospect: partners.filter((partner) => partner.type === "prospect").length,
    outreach: partners.filter((partner) => partner.type === "outreach").length,
  };

  return (
    <AppShell active="/crm">
      <MobileNav />
      <div className="mx-auto max-w-[1400px] p-4 md:p-8">
        <div className="mb-4 rounded-lg border border-blue-200 bg-blue-50 p-3 text-sm text-blue-800">
          Read-only sanitized demonstration. Add, edit, and interaction logging remain disabled until an audited persistence layer and authorization model exist.
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy">Partners and CRM</h1>
          <p className="mt-1 text-sm text-text-muted">Explore synthetic relationship records and interaction history.</p>
        </div>

        <div className="mb-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          {[
            { label: "Total", value: stats.total, color: "bg-brand-navy text-white" },
            { label: "Current", value: stats.current, color: "border border-emerald-200 bg-emerald-50 text-emerald-800" },
            { label: "Prospects", value: stats.prospect, color: "border border-amber-200 bg-amber-50 text-amber-800" },
            { label: "Outreach", value: stats.outreach, color: "border border-blue-200 bg-blue-50 text-blue-800" },
          ].map((stat) => (
            <div key={stat.label} className={`rounded-lg p-3 text-center ${stat.color}`}>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs opacity-80">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="mb-4 flex flex-col gap-3 md:flex-row">
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {(["all", "current", "prospect", "outreach"] as const).map((candidate) => (
              <button
                key={candidate}
                onClick={() => setTypeFilter(candidate)}
                aria-pressed={typeFilter === candidate}
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${typeFilter === candidate ? "bg-white text-brand-navy shadow-sm" : "text-text-muted"}`}
              >
                {candidate === "all" ? "All" : TYPE_LABELS[candidate]}
              </button>
            ))}
          </div>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as "all" | PartnerStatus)}
            aria-label="Filter by status"
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm"
          >
            <option value="all">All statuses</option>
            <option value="active">Active</option>
            <option value="pending">Pending</option>
            <option value="dormant">Dormant</option>
            <option value="lost">Lost</option>
          </select>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search demo partners"
            className="min-w-0 flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm"
          />
        </div>

        <div className="grid gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.65fr)]">
          <section aria-label="Partner records" className="grid content-start gap-3 sm:grid-cols-2">
            {filtered.length === 0 ? (
              <p className="col-span-full rounded-lg border border-gray-200 bg-white p-5 text-sm text-text-muted">No demonstration records match these filters.</p>
            ) : null}
            {filtered.map((partner) => (
              <button
                key={partner.partnerId}
                onClick={() => setSelectedId(partner.partnerId)}
                aria-pressed={selectedId === partner.partnerId}
                className={`rounded-xl border bg-white p-4 text-left transition hover:shadow-md ${selectedId === partner.partnerId ? "border-brand-navy ring-2 ring-brand-navy/10" : "border-gray-200"}`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="font-bold text-brand-navy">{partner.name}</h2>
                    <p className="text-xs text-text-muted">{partner.organization}</p>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${STATUS_COLORS[partner.status]}`}>{partner.status}</span>
                </div>
                <span className={`mt-3 inline-block rounded px-2 py-0.5 text-[10px] font-medium ${CATEGORY_COLORS[partner.category]}`}>{partner.category}</span>
                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-text-secondary">{partner.notes}</p>
              </button>
            ))}
          </section>

          <aside className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm lg:sticky lg:top-4 lg:self-start" aria-live="polite">
            {!selected ? (
              <p className="text-sm text-text-muted">Select a demonstration partner to inspect its sanitized record.</p>
            ) : (
              <div>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-bold text-brand-navy">{selected.name}</h2>
                    <p className="text-sm text-text-muted">{selected.organization}</p>
                  </div>
                  <button onClick={() => setSelectedId(null)} className="rounded border border-gray-200 px-2 py-1 text-xs text-text-muted">Close</button>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text-secondary">{selected.notes}</p>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-xs">
                  <div><dt className="text-text-muted">Type</dt><dd className="font-semibold text-text-primary">{TYPE_LABELS[selected.type]}</dd></div>
                  <div><dt className="text-text-muted">Status</dt><dd className="font-semibold capitalize text-text-primary">{selected.status}</dd></div>
                  <div><dt className="text-text-muted">Last contact</dt><dd className="font-semibold text-text-primary">{selected.lastContactDate ?? "Not recorded"}</dd></div>
                  <div><dt className="text-text-muted">Next follow-up</dt><dd className="font-semibold text-text-primary">{selected.nextFollowUp ?? "Not scheduled"}</dd></div>
                </dl>

                <div className="mt-5 border-t border-gray-100 pt-4">
                  <h3 className="mb-3 text-sm font-semibold text-brand-navy">Interactions</h3>
                  <div className="space-y-3">
                    {selectedInteractions.length === 0 ? <p className="text-xs text-text-muted">No sanitized interactions recorded.</p> : null}
                    {selectedInteractions.map((interaction) => (
                      <article key={interaction.interactionId} className="rounded-lg bg-gray-50 p-3 text-sm">
                        <div className="flex justify-between gap-2 text-xs text-text-muted">
                          <span>{INTERACTION_LABELS[interaction.type]}</span>
                          <time dateTime={interaction.date}>{interaction.date}</time>
                        </div>
                        <p className="mt-1 text-text-primary">{interaction.summary}</p>
                        <p className="mt-1 text-xs text-text-muted">Recorded by {interaction.createdBy}</p>
                      </article>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
