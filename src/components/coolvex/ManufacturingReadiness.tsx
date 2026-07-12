"use client";

import type {
  IngredientSupplierQuote,
  ManufacturingQuote,
  PatentInfo,
  RegulatoryCertificate,
  StorageLogisticsQuote,
} from "@/lib/coolvex-epic-data";

function privateNumber(value: number, suffix = "") {
  return value > 0 ? `${value.toLocaleString()}${suffix}` : "Withheld";
}

export function ManufacturingReadiness({
  quote,
  supplierQuote,
  logisticsQuote,
  patent,
  certificate,
}: {
  quote: ManufacturingQuote;
  supplierQuote: IngredientSupplierQuote;
  logisticsQuote: StorageLogisticsQuote;
  patent: PatentInfo;
  certificate: RegulatoryCertificate;
}) {
  return (
    <section aria-label="Private readiness records" className="grid gap-4 lg:grid-cols-2 xl:grid-cols-5">
      <ReadinessCard title="Manufacturing" heading={quote.partner} tone="gray">
        <DataRow label="Quote" value={privateNumber(quote.totalPriceSAR, " SAR")} />
        <DataRow label="Units" value={privateNumber(quote.quantity)} />
        <DataRow label="Unit price" value={privateNumber(quote.unitPriceSAR, " SAR")} />
        <DataRow label="Status" value={quote.status} />
        <Notice>{quote.nextAction}</Notice>
      </ReadinessCard>

      <ReadinessCard title="Ingredient supply" heading={supplierQuote.supplier} tone="orange">
        <DataRow label="Minimum order" value={privateNumber(supplierQuote.minimumOrderKg, " kg")} />
        <DataRow label="Lead time" value={privateNumber(supplierQuote.leadTimeBusinessDays, " business days")} />
        <DataRow label="Price" value={privateNumber(supplierQuote.unitPrice)} />
        <DataRow label="Terms" value={supplierQuote.incoterm} />
        <Notice>{supplierQuote.riskNote}</Notice>
      </ReadinessCard>

      <ReadinessCard title="Storage and logistics" heading={logisticsQuote.quoteAge} tone="indigo">
        <DataRow label="Warehouse" value={privateNumber(logisticsQuote.warehouseAnnualPriceSAR, " SAR/year")} />
        <DataRow label="Delivery" value={privateNumber(logisticsQuote.deliveryTripPriceSAR, " SAR/trip")} />
        <DataRow label="Status" value={logisticsQuote.status} />
        <Notice>{logisticsQuote.riskNote}</Notice>
      </ReadinessCard>

      <ReadinessCard title="Intellectual property" heading={patent.number} tone="amber">
        <DataRow label="Filed" value={patent.filedDate} />
        <DataRow label="Status" value={patent.status} />
        <DataRow label="Timeline" value={patent.timeline} />
        <DataRow label="Authority" value={patent.authority} />
        <Notice>Verify the current private record before making any intellectual-property statement.</Notice>
      </ReadinessCard>

      <ReadinessCard title="Regulatory" heading={certificate.certificateNumber} tone="teal">
        <DataRow label="Authority" value={certificate.authority} />
        <DataRow label="Status" value={certificate.status} />
        <DataRow label="Approved wording" value={certificate.compliantWording} />
        <Notice>{certificate.scope}</Notice>
      </ReadinessCard>
    </section>
  );
}

const TONES = {
  gray: "border-gray-200 bg-white",
  orange: "border-orange-200 bg-orange-50",
  indigo: "border-indigo-200 bg-indigo-50",
  amber: "border-amber-200 bg-amber-50",
  teal: "border-teal-200 bg-teal-50",
};

function ReadinessCard({ title, heading, tone, children }: { title: string; heading: string; tone: keyof typeof TONES; children: React.ReactNode }) {
  return (
    <article className={`space-y-3 rounded-xl border p-4 ${TONES[tone]}`}>
      <p className="text-xs uppercase tracking-wide text-gray-500">{title}</p>
      <h2 className="text-lg font-bold text-gray-900">{heading}</h2>
      <dl className="space-y-2 text-sm">{children}</dl>
    </article>
  );
}

function DataRow({ label, value }: { label: string; value: string }) {
  return <div><dt className="text-gray-500">{label}</dt><dd className="font-semibold text-gray-900">{value}</dd></div>;
}

function Notice({ children }: { children: React.ReactNode }) {
  return <div className="rounded-lg bg-white/80 p-2 text-xs text-gray-700">{children}</div>;
}
