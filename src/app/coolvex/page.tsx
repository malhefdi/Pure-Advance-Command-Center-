"use client";

import { useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import {
  milestones,
  gtmStats,
  competitors,
  y1Scenarios,
  pharmacyData,
  marketData,
  actionItems,
  evidenceSources,
  manufacturingQuote,
  patentInfo,
} from "@/lib/coolvex-epic-data";
import { EvidenceMetricCard } from "@/components/coolvex/EvidenceMetricCard";
import { ScenarioCard } from "@/components/coolvex/ScenarioCard";
import { CompetitorMatrix } from "@/components/coolvex/CompetitorMatrix";
import { PharmacyFootprint } from "@/components/coolvex/PharmacyFootprint";
import { ActionLane } from "@/components/coolvex/ActionLane";
import { EvidenceDrawer } from "@/components/coolvex/EvidenceDrawer";
import { MarketBattlefield } from "@/components/coolvex/MarketBattlefield";
import { ManufacturingReadiness } from "@/components/coolvex/ManufacturingReadiness";

const STATUS_COLORS: Record<string, string> = {
  done: "border-emerald-300 bg-emerald-50",
  next: "border-blue-400 bg-blue-50 ring-2 ring-blue-200",
  pending: "border-gray-200 bg-gray-50",
  blocked: "border-red-200 bg-red-50",
};

export default function CoolvexPage() {
  const [section, setSection] = useState<
    "cockpit" | "timeline" | "market" | "competitors" | "pharmacy" | "scenarios" | "actions" | "evidence"
  >("cockpit");

  const verifiedSources = evidenceSources.filter((source) => source.confidence === "verified").length;
  const criticalActions = actionItems.filter((action) => action.priority === "critical");

  const sections = [
    { id: "cockpit" as const, label: "🎯 Launch Cockpit" },
    { id: "timeline" as const, label: "📅 Timeline" },
    { id: "market" as const, label: "📊 Market" },
    { id: "competitors" as const, label: "⚔️ Competitors" },
    { id: "pharmacy" as const, label: "🏪 Pharmacies" },
    { id: "scenarios" as const, label: "📈 Scenarios" },
    { id: "actions" as const, label: "✅ Actions" },
    { id: "evidence" as const, label: "📋 Evidence" },
  ];

  return (
    <AppShell active="/coolvex">
      <MobileNav />
      <main className="mx-auto max-w-6xl px-4 py-6 space-y-6 sm:px-6 lg:py-8">
        {/* Header */}
        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-blue-50 p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl space-y-2">
              <div className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">Phase 4 executive cockpit</div>
              <h1 className="text-2xl font-bold text-brand-navy sm:text-3xl">Coolvex™ Dashboard</h1>
              <p className="text-sm leading-6 text-text-muted sm:text-base">
                Topical natural ointment — hemorrhoid/fissure treatment. Built for investor and operator review with
                evidence confidence, channel readiness, and next-action ownership visible above the fold.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2 lg:justify-end">
              <span className="rounded-full bg-purple-100 px-3 py-1 text-xs font-medium text-purple-800">Manufacturing ready</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">SFDA Cosmetic Notification (CN-2026-59889)</span>
              <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-800">{verifiedSources}/{evidenceSources.length} verified sources</span>
            </div>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <div className="rounded-xl border border-white/70 bg-white/80 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Next unlock</div>
              <div className="mt-1 text-sm font-bold text-gray-900">Purchase order before ACCMi expiry</div>
              <div className="mt-1 text-xs text-gray-500">Executive risk surfaced from critical action lane.</div>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/80 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Pilot footprint</div>
              <div className="mt-1 text-sm font-bold text-gray-900">420 Riyadh pharmacies mapped</div>
              <div className="mt-1 text-xs text-gray-500">Seven chains from the Y1 target dashboard.</div>
            </div>
            <div className="rounded-xl border border-white/70 bg-white/80 p-3">
              <div className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Evidence posture</div>
              <div className="mt-1 text-sm font-bold text-gray-900">Claims labelled by confidence</div>
              <div className="mt-1 text-xs text-gray-500">Unverified or reconciled numbers are flagged, not buried.</div>
            </div>
          </div>
        </div>

        {/* Section Nav */}
        <div className="sticky top-0 z-10 -mx-4 overflow-x-auto border-y border-gray-100 bg-white/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-gray-100 sm:p-1">
          <div className="flex min-w-max gap-1 sm:min-w-0 sm:flex-wrap">
            {sections.map((s) => (
              <button
                key={s.id}
                onClick={() => setSection(s.id)}
                className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-purple-300 ${
                  section === s.id
                    ? "bg-brand-navy text-white shadow-sm sm:bg-white sm:text-brand-navy"
                    : "text-text-muted hover:bg-white hover:text-text-primary"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        {/* ─── Launch Cockpit ─── */}
        {section === "cockpit" && (
          <div className="space-y-6">
            {/* Key Metrics with Evidence */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gtmStats.map((stat) => (
                <EvidenceMetricCard key={stat.label} stat={stat} />
              ))}
            </div>

            {/* Manufacturing + Patent */}
            <ManufacturingReadiness quote={manufacturingQuote} patent={patentInfo} />

            {/* Quick Actions */}
            <div className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h3 className="font-bold text-red-900 mb-2">⚠️ Critical Next Actions</h3>
              <ul className="text-sm text-red-800 space-y-1">
                {criticalActions.map((a, i) => (
                  <li key={i}>• {a.title} ({a.owner})</li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* ─── Manufacturing Timeline ─── */}
        {section === "timeline" && (
          <div className="space-y-3">
            {milestones.map((m, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 rounded-xl border p-4 transition ${STATUS_COLORS[m.status]}`}
              >
                <span className="text-2xl">{m.icon}</span>
                <div className="flex-1">
                  <div className="font-medium text-text-primary">{m.label}</div>
                  <div className="text-xs text-text-muted">{m.date}</div>
                </div>
                {m.status === "next" && (
                  <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium animate-pulse">NEXT</span>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ─── Market Intelligence ─── */}
        {section === "market" && (
          <div className="space-y-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-3">C05A2 Market — Top Competitors by 2025E Sales</h2>
              <MarketBattlefield data={marketData} />
            </div>
            <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
              <h3 className="font-bold text-blue-900 mb-2">🔵 Amazon.sa Blue Ocean Confirmed</h3>
              <p className="text-sm text-blue-800">
                Neo Healar and Hemagel Procto are <strong>absent</strong> from Amazon.sa.
                Coolvex can capture first-mover advantage in the e-commerce hemorrhoid treatment category.
              </p>
            </div>
          </div>
        )}

        {/* ─── Competitors ─── */}
        {section === "competitors" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Competitive Landscape</h2>
            <CompetitorMatrix competitors={competitors} />
            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
              <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-2">
                <div className="font-bold text-gray-800">Positioning Lanes</div>
                <div>• <strong>Market Leader:</strong> Neo Healar (46.9% share, flat)</div>
                <div>• <strong>Chemical Challenger:</strong> Procto-Glyvenol (+61% growth)</div>
                <div>• <strong>Super-Premium:</strong> Hemagel Procto (~SAR 86)</div>
                <div>• <strong>Local Disruptor:</strong> Healarido (explosive growth)</div>
                <div>• <strong>Best Analog:</strong> Rohelar (Coolvex trajectory model)</div>
              </div>
              <div className="rounded-xl border border-purple-200 bg-purple-50 p-4 space-y-2">
                <div className="font-bold text-purple-800">Coolvex Positioning</div>
                <div>• Price: SAR 69 (premium herbal tier)</div>
                <div>• Competes with: Rohelar, Healarido, Neo Healar</div>
                <div>• Differentiator: nanocomposite ZnO + patent protection</div>
                <div>• Channel: pharmacy pilot → Amazon/Noon/Salasa</div>
              </div>
            </div>
          </div>
        )}

        {/* ─── Pharmacy Rollout ─── */}
        {section === "pharmacy" && (
          <div className="space-y-6">
            <h2 className="text-lg font-bold text-gray-900">Pharmacy Rollout</h2>
            <PharmacyFootprint data={pharmacyData} totalPilot={420} />
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
              <div className="font-bold text-gray-800 mb-2">Chain Targeting (Riyadh Pilot)</div>
              <div>7 chains mapped: LEMON (135), Innova (88), Zahrat (76), Shams (33), Orange (33), Al Jazea (32), Adam (23)</div>
              <div className="mt-2 text-xs text-gray-500">Source: Coolvex_Y1_Target_Dashboard_2.xlsx</div>
            </div>
          </div>
        )}

        {/* ─── Y1 Scenarios ─── */}
        {section === "scenarios" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Year 1 Target Scenarios</h2>
            <p className="text-sm text-gray-500">Net profit: 12.65 SAR/unit · 420 pilot pharmacies · Riyadh = 50% national private market</p>
            <div className="grid md:grid-cols-2 gap-4">
              {y1Scenarios.map((s) => (
                <ScenarioCard key={s.scenario} scenario={s} highlight={s.scenario === "Base Case"} />
              ))}
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-800">
              <strong>⚠️ Note:</strong> Previous page showed Y1 profit as "SAR 180K-320K". Extracted sheet base case is SAR 132,825.
              The higher range may represent an older or alternate model. Needs reconciliation.
            </div>
          </div>
        )}

        {/* ─── Action Lane ─── */}
        {section === "actions" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Action Lane</h2>
            <ActionLane items={actionItems} />
          </div>
        )}

        {/* ─── Evidence Drawer ─── */}
        {section === "evidence" && (
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-gray-900">Evidence & Sources</h2>
            <EvidenceDrawer sources={evidenceSources} />
            <div className="rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-600">
              <div className="font-bold text-gray-800 mb-2">Data Quality Notes</div>
              <ul className="space-y-1">
                <li>✅ High confidence: XLSX-derived market/scenario numbers, pharmacy counts, CRM seed data</li>
                <li>⚠️ Medium: Narrative claims from KSA Hemorrhoid Market Analysis until citations audited</li>
                <li>❌ Blocked: Feb 2026 Google Slides need Drive API export</li>
              </ul>
            </div>
          </div>
        )}
      </main>
    </AppShell>
  );
}
