"use client";

import { useState, useMemo } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { partners as seedPartners, interactions as seedInteractions } from "@/lib/crm-seed-data";
import type { Partner, PartnerType, PartnerStatus, PartnerCategory, Interaction, InteractionType } from "@/types/crm";

/* ─── Helpers ──────────────────────────────────── */
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
const INTERACTION_ICONS: Record<InteractionType, string> = {
  call: "📞",
  email: "📧",
  meeting: "🤝",
  whatsapp: "💬",
  document: "📄",
  note: "📝",
};

function relativeTime(dateStr?: string): string {
  if (!dateStr) return "—";
  const diff = Date.now() - new Date(dateStr).getTime();
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;
  if (days < 30) return `${Math.floor(days / 7)}w ago`;
  return `${Math.floor(days / 30)}mo ago`;
}

function formatSAR(n?: number): string {
  if (!n) return "—";
  return new Intl.NumberFormat("en-SA", { style: "currency", currency: "SAR", maximumFractionDigits: 0 }).format(n);
}

/* ─── Page ─────────────────────────────────────── */
export default function CrmPage() {
  const [partners, setPartners] = useState<Partner[]>(seedPartners);
  const [interactions, setInteractions] = useState<Interaction[]>(seedInteractions);
  const [filter, setFilter] = useState<"all" | PartnerType>("all");
  const [statusFilter, setStatusFilter] = useState<"all" | PartnerStatus>("all");
  const [search, setSearch] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [showAdd, setShowAdd] = useState(false);

  /* ── New partner form state ── */
  const [newName, setNewName] = useState("");
  const [newType, setNewType] = useState<PartnerType>("prospect");
  const [newCategory, setNewCategory] = useState<PartnerCategory>("partner");
  const [newOrg, setNewOrg] = useState("");
  const [newContact, setNewContact] = useState("");
  const [newNotes, setNewNotes] = useState("");

  /* ── New interaction form state ── */
  const [showAddInteraction, setShowAddInteraction] = useState(false);
  const [intType, setIntType] = useState<InteractionType>("note");
  const [intSummary, setIntSummary] = useState("");
  const [intFollowUp, setIntFollowUp] = useState("");

  const filtered = useMemo(() => {
    return partners.filter((p) => {
      if (filter !== "all" && p.type !== filter) return false;
      if (statusFilter !== "all" && p.status !== statusFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          p.name.toLowerCase().includes(q) ||
          p.organization?.toLowerCase().includes(q) ||
          p.tags.some((t) => t.toLowerCase().includes(q))
        );
      }
      return true;
    });
  }, [partners, filter, statusFilter, search]);

  const selected = selectedId ? partners.find((p) => p.partnerId === selectedId) : null;
  const selectedInteractions = selectedId
    ? interactions.filter((i) => i.partnerId === selectedId).sort((a, b) => b.date.localeCompare(a.date))
    : [];

  const stats = useMemo(() => ({
    total: partners.length,
    current: partners.filter((p) => p.type === "current").length,
    prospect: partners.filter((p) => p.type === "prospect").length,
    outreach: partners.filter((p) => p.type === "outreach").length,
    followUps: partners.filter((p) => p.nextFollowUp && new Date(p.nextFollowUp) <= new Date(Date.now() + 7 * 86400000)).length,
  }), [partners]);

  function handleAddPartner() {
    if (!newName.trim()) return;
    const id = `p-${newName.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`;
    const now = new Date().toISOString().split("T")[0];
    const partner: Partner = {
      partnerId: id,
      name: newName,
      type: newType,
      category: newCategory,
      status: "pending",
      organization: newOrg || undefined,
      contactName: newContact || undefined,
      notes: newNotes,
      tags: [],
      products: [],
      createdAt: now,
    };
    setPartners((prev) => [...prev, partner]);
    setNewName("");
    setNewOrg("");
    setNewContact("");
    setNewNotes("");
    setShowAdd(false);
  }

  function handleAddInteraction() {
    if (!selectedId || !intSummary.trim()) return;
    const now = new Date().toISOString().split("T")[0];
    const interaction: Interaction = {
      interactionId: `int-${Date.now()}`,
      partnerId: selectedId,
      type: intType,
      date: now,
      summary: intSummary,
      followUpDate: intFollowUp || undefined,
      createdBy: "Mohammed",
    };
    setInteractions((prev) => [...prev, interaction]);
    setIntSummary("");
    setIntFollowUp("");
    setShowAddInteraction(false);
    // Update lastContactDate on the partner
    setPartners((prev) =>
      prev.map((p) => (p.partnerId === selectedId ? { ...p, lastContactDate: now } : p))
    );
  }

  return (
    <AppShell active="/crm">
      <MobileNav />
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        {/* ── Header ── */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Partners & CRM</h1>
            <p className="text-sm text-text-muted mt-1">Track partners, prospects, and outreach targets</p>
          </div>
          <button
            onClick={() => setShowAdd(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90 transition"
          >
            + Add Partner
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
          {[
            { label: "Total", value: stats.total, color: "bg-brand-navy text-white" },
            { label: "Current", value: stats.current, color: "bg-emerald-50 text-emerald-800 border border-emerald-200" },
            { label: "Prospects", value: stats.prospect, color: "bg-amber-50 text-amber-800 border border-amber-200" },
            { label: "Outreach", value: stats.outreach, color: "bg-blue-50 text-blue-800 border border-blue-200" },
            { label: "Follow-ups (7d)", value: stats.followUps, color: stats.followUps > 0 ? "bg-red-50 text-red-800 border border-red-200" : "bg-gray-50 text-gray-600 border border-gray-200" },
          ].map((s) => (
            <div key={s.label} className={`rounded-lg p-3 text-center ${s.color}`}>
              <div className="text-2xl font-bold">{s.value}</div>
              <div className="text-xs opacity-80">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col md:flex-row gap-3 mb-4">
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {(["all", "current", "prospect", "outreach"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setFilter(t)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  filter === t ? "bg-white shadow-sm text-brand-navy" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {t === "all" ? "All" : TYPE_LABELS[t]}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
            {(["all", "active", "pending", "dormant", "lost"] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                  statusFilter === s ? "bg-white shadow-sm text-brand-navy" : "text-text-muted hover:text-text-primary"
                }`}
              >
                {s === "all" ? "All Status" : s.charAt(0).toUpperCase() + s.slice(1)}
              </button>
            ))}
          </div>
          <input
            type="text"
            placeholder="Search partners..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="flex-1 rounded-lg border border-gray-200 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-brand-navy/30"
          />
        </div>

        <div className="flex gap-6">
          {/* ── Partner Table ── */}
          <div className={`flex-1 ${selected ? "hidden md:block" : ""}`}>
            <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50/50">
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Partner</th>
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Type</th>
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Category</th>
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Status</th>
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Last Contact</th>
                    <th className="px-4 py-3 text-left font-semibold text-text-muted">Follow-up</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((p) => (
                    <tr
                      key={p.partnerId}
                      onClick={() => setSelectedId(p.partnerId)}
                      className={`cursor-pointer border-b border-gray-50 transition hover:bg-blue-50/40 ${
                        selectedId === p.partnerId ? "bg-blue-50" : ""
                      }`}
                    >
                      <td className="px-4 py-3">
                        <div className="font-medium text-text-primary">{p.name}</div>
                        {p.organization && <div className="text-xs text-text-muted">{p.organization}</div>}
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs font-medium">{TYPE_LABELS[p.type]}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${CATEGORY_COLORS[p.category]}`}>
                          {p.category}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`inline-block rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_COLORS[p.status]}`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-text-muted text-xs">{relativeTime(p.lastContactDate)}</td>
                      <td className="px-4 py-3 text-xs">
                        {p.nextFollowUp ? (
                          <span className={new Date(p.nextFollowUp) <= new Date(Date.now() + 7 * 86400000) ? "text-red-600 font-medium" : "text-text-muted"}>
                            {p.nextFollowUp}
                          </span>
                        ) : (
                          <span className="text-gray-300">—</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-4 py-8 text-center text-text-muted">
                        No partners match your filters
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Detail Panel ── */}
          {selected && (
            <div className="w-full md:w-[380px] flex-shrink-0">
              <div className="rounded-xl border border-gray-200 bg-white p-5 sticky top-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-lg font-bold text-brand-navy">{selected.name}</h2>
                    {selected.organization && <p className="text-sm text-text-muted">{selected.organization}</p>}
                  </div>
                  <button onClick={() => setSelectedId(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
                </div>

                <div className="flex gap-2 mb-4">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${CATEGORY_COLORS[selected.category]}`}>
                    {selected.category}
                  </span>
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_COLORS[selected.status]}`}>
                    {selected.status}
                  </span>
                  <span className="rounded-full px-2.5 py-0.5 text-xs font-medium bg-gray-100 text-gray-700">
                    {TYPE_LABELS[selected.type]}
                  </span>
                </div>

                {selected.contactName && (
                  <div className="text-sm mb-1"><span className="text-text-muted">Contact:</span> {selected.contactName}</div>
                )}
                {selected.contactEmail && (
                  <div className="text-sm mb-1"><span className="text-text-muted">Email:</span> {selected.contactEmail}</div>
                )}
                {selected.dealValue ? (
                  <div className="text-sm mb-3"><span className="text-text-muted">Deal value:</span> {formatSAR(selected.dealValue)}</div>
                ) : null}

                <p className="text-sm text-text-secondary mb-3 leading-relaxed">{selected.notes}</p>

                {selected.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {selected.tags.map((t) => (
                      <span key={t} className="rounded bg-gray-100 px-1.5 py-0.5 text-[10px] text-gray-600">#{t}</span>
                    ))}
                  </div>
                )}

                {selected.products.length > 0 && (
                  <div className="mb-4">
                    <div className="text-xs font-semibold text-text-muted mb-1">Products</div>
                    <div className="flex flex-wrap gap-1">
                      {selected.products.map((p) => (
                        <span key={p} className="rounded bg-brand-navy/10 text-brand-navy px-2 py-0.5 text-xs font-medium">{p}</span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ── Interactions ── */}
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-semibold text-brand-navy">Interactions</h3>
                    <button
                      onClick={() => setShowAddInteraction(!showAddInteraction)}
                      className="text-xs text-brand-navy hover:underline"
                    >
                      + Log interaction
                    </button>
                  </div>

                  {showAddInteraction && (
                    <div className="mb-4 rounded-lg border border-gray-200 p-3 bg-gray-50/50">
                      <div className="flex gap-2 mb-2">
                        {(["call", "email", "meeting", "whatsapp", "document", "note"] as const).map((t) => (
                          <button
                            key={t}
                            onClick={() => setIntType(t)}
                            className={`text-sm ${intType === t ? "opacity-100" : "opacity-40"}`}
                            title={t}
                          >
                            {INTERACTION_ICONS[t]}
                          </button>
                        ))}
                      </div>
                      <textarea
                        placeholder="What happened?"
                        value={intSummary}
                        onChange={(e) => setIntSummary(e.target.value)}
                        className="w-full rounded border border-gray-200 px-2 py-1.5 text-sm mb-2 resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <input
                          type="date"
                          value={intFollowUp}
                          onChange={(e) => setIntFollowUp(e.target.value)}
                          className="flex-1 rounded border border-gray-200 px-2 py-1 text-xs"
                          placeholder="Follow-up"
                        />
                        <button
                          onClick={handleAddInteraction}
                          className="rounded bg-brand-navy px-3 py-1 text-xs text-white font-medium hover:bg-brand-navy/90"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-3 max-h-[300px] overflow-y-auto">
                    {selectedInteractions.length === 0 && (
                      <p className="text-xs text-text-muted text-center py-4">No interactions logged yet</p>
                    )}
                    {selectedInteractions.map((int) => (
                      <div key={int.interactionId} className="flex gap-3 text-sm">
                        <span className="text-base flex-shrink-0">{INTERACTION_ICONS[int.type]}</span>
                        <div>
                          <p className="text-text-primary">{int.summary}</p>
                          <p className="text-xs text-text-muted mt-0.5">
                            {int.date} · {int.createdBy}
                            {int.followUpDate && <span className="text-amber-600"> · Follow-up: {int.followUpDate}</span>}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ── Add Partner Modal ── */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowAdd(false)}>
          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-bold text-brand-navy mb-4">Add Partner</h2>
            <div className="space-y-3">
              <input
                placeholder="Partner name *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <div className="flex gap-3">
                <select value={newType} onChange={(e) => setNewType(e.target.value as PartnerType)} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <option value="current">Current</option>
                  <option value="prospect">Prospect</option>
                  <option value="outreach">Outreach</option>
                </select>
                <select value={newCategory} onChange={(e) => setNewCategory(e.target.value as PartnerCategory)} className="flex-1 rounded-lg border border-gray-200 px-3 py-2 text-sm">
                  <option value="partner">Partner</option>
                  <option value="investor">Investor</option>
                  <option value="manufacturer">Manufacturer</option>
                  <option value="academic">Academic</option>
                  <option value="government">Government</option>
                  <option value="supplier">Supplier</option>
                  <option value="client">Client</option>
                </select>
              </div>
              <input
                placeholder="Organization"
                value={newOrg}
                onChange={(e) => setNewOrg(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <input
                placeholder="Contact name"
                value={newContact}
                onChange={(e) => setNewContact(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm"
              />
              <textarea
                placeholder="Notes"
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm resize-none"
                rows={3}
              />
            </div>
            <div className="flex justify-end gap-3 mt-5">
              <button onClick={() => setShowAdd(false)} className="px-4 py-2 text-sm text-text-muted hover:text-text-primary">Cancel</button>
              <button
                onClick={handleAddPartner}
                disabled={!newName.trim()}
                className="rounded-lg bg-brand-navy px-4 py-2 text-sm font-medium text-white hover:bg-brand-navy/90 disabled:opacity-40"
              >
                Add Partner
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
