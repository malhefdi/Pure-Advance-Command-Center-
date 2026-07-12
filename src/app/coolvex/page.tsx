"use client";

import { useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { ActionLane } from "@/components/coolvex/ActionLane";
import { CompetitorMatrix } from "@/components/coolvex/CompetitorMatrix";
import { EvidenceDrawer } from "@/components/coolvex/EvidenceDrawer";
import { EvidenceMetricCard } from "@/components/coolvex/EvidenceMetricCard";
import { ManufacturingReadiness } from "@/components/coolvex/ManufacturingReadiness";
import { MarketBattlefield } from "@/components/coolvex/MarketBattlefield";
import { PharmacyFootprint } from "@/components/coolvex/PharmacyFootprint";
import { ScenarioCard } from "@/components/coolvex/ScenarioCard";
import {
  actionItems,
  competitors,
  coolvexStorageLogisticsQuote,
  evidenceSources,
  gtmStats,
  manufacturingQuote,
  marketData,
  milestones,
  oakParkSupplierQuote,
  patentInfo,
  pharmacyData,
  productStrategyStory,
  regulatoryCertificate,
  y1Scenarios,
} from "@/lib/coolvex-epic-data";

type Section = "cockpit" | "story" | "timeline" | "market" | "scenarios" | "actions" | "evidence";

const STATUS_COLORS: Record<string, string> = {
  done: "border-emerald-300 bg-emerald-50",
  next: "border-blue-400 bg-blue-50 ring-2 ring-blue-200",
  pending: "border-gray-200 bg-gray-50",
  blocked: "border-red-200 bg-red-50",
};

const sections: { id: Section; label: string }[] = [
  { id: "cockpit", label: "Launch cockpit" },
  { id: "story", label: "Product story" },
  { id: "timeline", label: "Timeline" },
  { id: "market", label: "Market and channels" },
  { id: "scenarios", label: "Scenarios" },
  { id: "actions", label: "Actions" },
  { id: "evidence", label: "Evidence" },
];

export default function CoolvexPage() {
  const [section, setSection] = useState<Section>("cockpit");
  const criticalActions = actionItems.filter((action) => action.priority === "critical");
  const verifiedSources = evidenceSources.filter((source) => source.confidence === "verified").length;

  return (
    <AppShell active="/coolvex">
      <MobileNav />
      <main className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6 lg:py-8">
        <header className="rounded-2xl border border-purple-100 bg-gradient-to-br from-white via-purple-50 to-blue-50 p-5 shadow-sm sm:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-purple-700">Sanitized launch workflow</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-navy sm:text-3xl">Care Product A launch cockpit</h1>
          <p className="mt-2 max-w-3xl text-sm leading-6 text-text-muted sm:text-base">
            This page preserves the intended evidence-driven launch workflow without publishing private quotes, contacts, filings, forecasts, or unapproved product claims.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <SummaryCard label="Next gate" value="Regulatory evidence review" detail="No launch commitment is represented." />
            <SummaryCard label="Data classification" value="Synthetic demonstration" detail="Production evidence must remain server-side." />
            <SummaryCard label="Evidence posture" value={`${verifiedSources} safe classification record${verifiedSources === 1 ? "" : "s"}`} detail="Operational claims remain withheld or unverified." />
          </div>
        </header>

        <nav aria-label="Launch cockpit sections" className="sticky top-0 z-10 -mx-4 overflow-x-auto border-y border-gray-100 bg-white/95 px-4 py-2 backdrop-blur sm:mx-0 sm:rounded-xl sm:border sm:bg-gray-100 sm:p-1">
          <div className="flex min-w-max gap-1 sm:min-w-0 sm:flex-wrap">
            {sections.map((candidate) => (
              <button
                key={candidate.id}
                onClick={() => setSection(candidate.id)}
                aria-pressed={section === candidate.id}
                className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-purple-300 ${section === candidate.id ? "bg-brand-navy text-white shadow-sm sm:bg-white sm:text-brand-navy" : "text-text-muted hover:bg-white hover:text-text-primary"}`}
              >
                {candidate.label}
              </button>
            ))}
          </div>
        </nav>

        {section === "cockpit" ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {gtmStats.map((stat) => <EvidenceMetricCard key={stat.label} stat={stat} />)}
            </div>
            <ManufacturingReadiness
              quote={manufacturingQuote}
              supplierQuote={oakParkSupplierQuote}
              logisticsQuote={coolvexStorageLogisticsQuote}
              patent={patentInfo}
              certificate={regulatoryCertificate}
            />
            <section className="rounded-xl border border-red-200 bg-red-50 p-4">
              <h2 className="font-bold text-red-900">Critical approval gates</h2>
              <ul className="mt-2 space-y-1 text-sm text-red-800">
                {criticalActions.map((action) => <li key={action.title}>- {action.title} ({action.owner})</li>)}
              </ul>
            </section>
          </div>
        ) : null}

        {section === "story" ? (
          <div className="grid gap-4 lg:grid-cols-2">
            {productStrategyStory.map((item) => (
              <article key={item.title} className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
                <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">Safety-reviewed story card</p>
                <h2 className="mt-1 text-lg font-bold text-gray-900">{item.title}</h2>
                <p className="mt-2 text-sm leading-6 text-gray-600">{item.summary}</p>
                <ul className="mt-3 space-y-2 text-sm text-gray-700">
                  {item.bullets.map((bullet) => <li key={bullet}>- {bullet}</li>)}
                </ul>
                <p className="mt-4 rounded-lg border border-gray-100 bg-gray-50 p-3 text-xs text-gray-500">Source: {item.source}</p>
              </article>
            ))}
          </div>
        ) : null}

        {section === "timeline" ? (
          <div className="space-y-3">
            {milestones.map((milestone) => (
              <article key={milestone.label} className={`flex items-center gap-4 rounded-xl border p-4 ${STATUS_COLORS[milestone.status]}`}>
                <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold uppercase text-text-muted">{milestone.status}</span>
                <div className="flex-1">
                  <h2 className="font-medium text-text-primary">{milestone.label}</h2>
                  <p className="text-xs text-text-muted">{milestone.date} - {milestone.owner}</p>
                </div>
              </article>
            ))}
          </div>
        ) : null}

        {section === "market" ? (
          <div className="space-y-6">
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Market model</h2>
              <MarketBattlefield data={marketData} />
            </section>
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Comparable products</h2>
              <CompetitorMatrix competitors={competitors} />
            </section>
            <section className="rounded-xl border border-gray-200 bg-white p-5">
              <h2 className="mb-3 text-lg font-bold text-gray-900">Channel footprint</h2>
              <PharmacyFootprint data={pharmacyData} totalPilot={0} />
            </section>
          </div>
        ) : null}

        {section === "scenarios" ? (
          <div className="space-y-4">
            <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">Legacy forecasts were removed. These cards intentionally show that no finance-approved scenario is available.</div>
            <div className="grid gap-4 md:grid-cols-2">
              {y1Scenarios.map((scenario) => <ScenarioCard key={scenario.scenario} scenario={scenario} />)}
            </div>
          </div>
        ) : null}

        {section === "actions" ? <ActionLane items={actionItems} /> : null}

        {section === "evidence" ? (
          <div className="space-y-4">
            <EvidenceDrawer sources={evidenceSources} />
            <p className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-800">
              Private evidence belongs in access-controlled storage with provenance, review status, and an accountable owner. A repository fixture is never an operational source of truth.
            </p>
          </div>
        ) : null}
      </main>
    </AppShell>
  );
}

function SummaryCard({ label, value, detail }: { label: string; value: string; detail: string }) {
  return (
    <div className="rounded-xl border border-white/70 bg-white/80 p-3">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-gray-500">{label}</p>
      <p className="mt-1 text-sm font-bold text-gray-900">{value}</p>
      <p className="mt-1 text-xs text-gray-500">{detail}</p>
    </div>
  );
}
