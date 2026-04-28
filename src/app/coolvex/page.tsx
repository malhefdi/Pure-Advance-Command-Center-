"use client";

import { useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";

const MILESTONES = [
  { label: "Oak Park Ingredient Failed Specs", date: "Mar 2026", status: "done", icon: "❌" },
  { label: "Ingredient Procured & Paid by PA", date: "Apr 2026", status: "done", icon: "✅" },
  { label: "50% Manufacturing Payment", date: "Apr 28, 2026", status: "done", icon: "✅" },
  { label: "Oak Park Delivery to ACCMi", date: "May 4, 2026", status: "next", icon: "📦" },
  { label: "Product Ready (1-10 days)", date: "May 5-14, 2026", status: "pending", icon: "⏳" },
  { label: "SFDA Application Submitted", date: "May 2026", status: "pending", icon: "📋" },
  { label: "SFDA Certified", date: "TBD", status: "blocked", icon: "🔴" },
  { label: "First Pharmacy Delivery", date: "TBD", status: "blocked", icon: "🏪" },
];

const GTM_STATS = [
  { label: "Market Size (KSA C05A2)", value: "SAR 91.8M", sub: "2025 projected" },
  { label: "Target Price", value: "SAR 69", sub: "wholesale" },
  { label: "Y1 Realistic Target", value: "8,400-10,500 units", sub: "IMS-validated" },
  { label: "Y1 Projected Profit", value: "SAR 180K-320K", sub: "corrected" },
  { label: "Riyadh Pharmacies Mapped", value: "420+", sub: "with GPS data" },
  { label: "E-Commerce Platforms", value: "15 researched", sub: "3 ready to register" },
];

const COMPETITORS = [
  { name: "Neo Healar", share: "46.9%", price: "SAR 58-75", trend: "Flat" },
  { name: "Hemagel Procto", share: "17.4%", price: "~SAR 86", trend: "Stable" },
  { name: "Procto-Glyvenol", share: "12.3%", price: "SAR 26-47", trend: "+61%" },
  { name: "Rohelar", share: "5.2%", price: "~SAR 68", trend: "Growing" },
  { name: "Healarido", share: "4.6%", price: "~SAR 69", trend: "Explosive" },
  { name: "Coolvex", share: "NEW", price: "SAR 69", trend: "🚀" },
];

const STATUS_COLORS: Record<string, string> = {
  done: "border-emerald-300 bg-emerald-50",
  next: "border-blue-400 bg-blue-50 ring-2 ring-blue-200",
  pending: "border-gray-200 bg-gray-50",
  blocked: "border-red-200 bg-red-50",
};

const TREND_COLORS: Record<string, string> = {
  Flat: "text-gray-500",
  Stable: "text-blue-600",
  "+61%": "text-emerald-600 font-bold",
  Growing: "text-emerald-600",
  Explosive: "text-orange-600 font-bold",
  "🚀": "text-purple-600 font-bold",
};

export default function CoolvexPage() {
  const [tab, setTab] = useState<"timeline" | "market" | "competitive">("timeline");

  return (
    <AppShell>
      <MobileNav />
      <main className="mx-auto max-w-6xl px-4 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-brand-navy">Coolvex™ Dashboard</h1>
            <p className="text-sm text-text-muted">Topical natural ointment — hemorrhoid/fissure treatment</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="rounded-full bg-purple-100 text-purple-800 px-3 py-1 text-xs font-medium">
              Manufacturing
            </span>
            <span className="rounded-full bg-amber-100 text-amber-800 px-3 py-1 text-xs font-medium">
              SFDA Pending
            </span>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Patent", value: "SA 1020257888", color: "text-emerald-600" },
            { label: "Manufacturer", value: "ACCMi", color: "text-blue-600" },
            { label: "Payment", value: "50% Paid", color: "text-emerald-600" },
            { label: "Delivery", value: "May 4", color: "text-amber-600" },
          ].map((m) => (
            <div key={m.label} className="rounded-xl border border-gray-200 bg-white p-4">
              <div className="text-[10px] text-text-muted uppercase tracking-wide">{m.label}</div>
              <div className={`text-lg font-bold ${m.color}`}>{m.value}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1">
          {(["timeline", "market", "competitive"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition ${
                tab === t
                  ? "bg-white text-brand-navy shadow-sm"
                  : "text-text-muted hover:text-text-primary"
              }`}
            >
              {t === "timeline" ? "📅 Manufacturing Timeline" : t === "market" ? "📊 Market Intelligence" : "⚔️ Competition"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "timeline" && (
          <div className="space-y-3">
            {MILESTONES.map((m, i) => (
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
                  <span className="rounded-full bg-blue-100 text-blue-700 px-2 py-0.5 text-xs font-medium animate-pulse">
                    NEXT
                  </span>
                )}
              </div>
            ))}
          </div>
        )}

        {tab === "market" && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {GTM_STATS.map((s) => (
                <div key={s.label} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="text-[10px] text-text-muted uppercase tracking-wide">{s.label}</div>
                  <div className="text-xl font-bold text-brand-navy">{s.value}</div>
                  <div className="text-xs text-text-muted">{s.sub}</div>
                </div>
              ))}
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

        {tab === "competitive" && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-text-muted">Brand</th>
                  <th className="text-right py-3 px-4 font-medium text-text-muted">Market Share</th>
                  <th className="text-right py-3 px-4 font-medium text-text-muted">Price</th>
                  <th className="text-right py-3 px-4 font-medium text-text-muted">Trend</th>
                </tr>
              </thead>
              <tbody>
                {COMPETITORS.map((c) => (
                  <tr key={c.name} className={`border-b border-gray-100 ${c.name === "Coolvex" ? "bg-purple-50" : ""}`}>
                    <td className="py-3 px-4 font-medium">
                      {c.name === "Coolvex" ? "→ " : ""}{c.name}
                    </td>
                    <td className="py-3 px-4 text-right">{c.share}</td>
                    <td className="py-3 px-4 text-right">{c.price}</td>
                    <td className={`py-3 px-4 text-right ${TREND_COLORS[c.trend] || ""}`}>{c.trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </main>
    </AppShell>
  );
}
