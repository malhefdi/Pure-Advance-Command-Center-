"use client";

import { useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { productStatus } from "@/lib/seed-data";
import type { Product, PlatformBlockData } from "@/types/command-center";

const STAGE_COLORS: Record<string, string> = {
  dd: "bg-blue-100 text-blue-800",
  reg: "bg-amber-100 text-amber-800",
  mfg: "bg-purple-100 text-purple-800",
  market: "bg-emerald-100 text-emerald-800",
};

const PLATFORM_ICONS: Record<string, string> = {
  bio: "🌿",
  med: "💊",
  aca: "🎓",
};

function ProductCard({ product }: { product: Product }) {
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 hover:shadow-md transition">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-bold text-brand-navy">{product.name}</h3>
          <p className="text-sm text-text-muted">{product.subtitle}</p>
        </div>
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${STAGE_COLORS[product.stage] || "bg-gray-100 text-gray-600"}`}>
          {product.stageLabel}
        </span>
      </div>

      <div className="text-xs text-text-muted mb-3">
        Owner: <span className="font-medium text-text-primary">{product.owner}</span>
      </div>

      <div className="grid grid-cols-2 gap-2">
        {product.metrics.map((m, i) => (
          <div key={i} className="rounded-lg bg-gray-50 px-3 py-2">
            <div className="text-[10px] text-text-muted uppercase tracking-wide">{m.label}</div>
            <div className="text-sm font-semibold text-text-primary">{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ProductsPage() {
  const [selectedPlatform, setSelectedPlatform] = useState<string>("all");

  const allProducts = productStatus.flatMap((p) => p.products);
  const filtered = selectedPlatform === "all"
    ? productStatus
    : productStatus.filter((p) => p.id === selectedPlatform);

  return (
    <AppShell active="/products">
      <MobileNav />
      <div className="p-4 md:p-8 max-w-[1400px] mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-brand-navy">Product Profiles</h1>
          <p className="text-sm text-text-muted mt-1">
            {allProducts.length} products across {productStatus.length} platforms
          </p>
        </div>

        {/* Platform filter */}
        <div className="flex gap-1 rounded-lg bg-gray-100 p-1 mb-6 w-fit">
          <button
            onClick={() => setSelectedPlatform("all")}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
              selectedPlatform === "all" ? "bg-white shadow-sm text-brand-navy" : "text-text-muted hover:text-text-primary"
            }`}
          >
            All Platforms
          </button>
          {productStatus.map((p) => (
            <button
              key={p.id}
              onClick={() => setSelectedPlatform(p.id)}
              className={`rounded-md px-3 py-1.5 text-sm font-medium transition ${
                selectedPlatform === p.id ? "bg-white shadow-sm text-brand-navy" : "text-text-muted hover:text-text-primary"
              }`}
            >
              {PLATFORM_ICONS[p.id]} {p.name}
            </button>
          ))}
        </div>

        {/* Products by platform */}
        {filtered.map((platform) => (
          <div key={platform.id} className="mb-8">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">{PLATFORM_ICONS[platform.id]}</span>
              <h2 className="text-lg font-bold text-brand-navy">{platform.name}</h2>
              <span className="text-xs text-text-muted">({platform.productCount} products)</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {platform.products.map((product) => (
                <ProductCard key={product.productId} product={product} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
