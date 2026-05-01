"use client";

import type { ManufacturingQuote, PatentInfo, RegulatoryCertificate } from "@/lib/coolvex-epic-data";

export function ManufacturingReadiness({
  quote,
  patent,
  certificate,
}: {
  quote: ManufacturingQuote;
  patent: PatentInfo;
  certificate: RegulatoryCertificate;
}) {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
        <div className="text-xs uppercase tracking-wide text-gray-400">Manufacturing</div>
        <div className="text-lg font-bold text-gray-900">{quote.partner.split("(")[0].trim()}</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Quote:</span> <strong>SAR {quote.totalPriceSAR.toLocaleString()}</strong></div>
          <div><span className="text-gray-500">Units:</span> <strong>{quote.quantity.toLocaleString()}</strong></div>
          <div><span className="text-gray-500">Unit price:</span> <strong>SAR {quote.unitPriceSAR}</strong></div>
          <div><span className="text-gray-500">Status:</span> <strong className="text-amber-600">{quote.status}</strong></div>
        </div>
        <div className="text-xs text-red-600 bg-red-50 rounded-lg p-2">⚠️ {quote.nextAction}</div>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-4 space-y-3">
        <div className="text-xs uppercase tracking-wide text-gray-400">Intellectual Property</div>
        <div className="text-lg font-bold text-gray-900">{patent.number}</div>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div><span className="text-gray-500">Filed:</span> <strong>{patent.filedDate}</strong></div>
          <div><span className="text-gray-500">Status:</span> <strong className="text-amber-600">{patent.status}</strong></div>
          <div><span className="text-gray-500">Timeline:</span> <strong>{patent.timeline}</strong></div>
          <div><span className="text-gray-500">Authority:</span> <strong>{patent.authority.split("(")[0].trim()}</strong></div>
        </div>
        <div className="rounded-lg bg-amber-50 p-2 text-xs text-amber-700">Patent application is pending; do not describe as granted patent protection.</div>
      </div>
      <div className="rounded-xl border border-teal-200 bg-teal-50 p-4 space-y-3">
        <div className="text-xs uppercase tracking-wide text-teal-600">Regulatory</div>
        <div className="text-lg font-bold text-gray-900">{certificate.certificateNumber}</div>
        <div className="space-y-2 text-sm">
          <div><span className="text-gray-500">Authority:</span> <strong>{certificate.authority}</strong></div>
          <div><span className="text-gray-500">Status:</span> <strong className="text-teal-700">{certificate.status}</strong></div>
          <div><span className="text-gray-500">Deck wording:</span> <strong>{certificate.compliantWording}</strong></div>
        </div>
        <div className="rounded-lg bg-white/75 p-2 text-xs text-teal-800">{certificate.scope}</div>
      </div>
    </div>
  );
}
