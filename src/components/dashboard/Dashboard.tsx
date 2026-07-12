"use client";

import { useMemo, useState } from "react";
import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { filterTasks } from "@/lib/dashboard-domain";
import { cn, formatCompactSAR, formatSAR, isStale } from "@/lib/utils";
import type {
  DashboardSnapshot,
  PlatformBlockData,
  Product,
  RevenueProduct,
  Severity,
  StageId,
  Task,
  TaskFilter,
  TeamMember,
} from "@/types/command-center";

const severityStyles: Record<Severity, string> = {
  green: "bg-sem-green-bg text-sem-green",
  yellow: "bg-sem-yellow-bg text-sem-yellow",
  red: "bg-sem-red-bg text-sem-red",
  blue: "bg-sem-blue-bg text-sem-blue",
};
const stageStyles: Record<StageId, string> = {
  dd: "bg-sem-blue-bg text-sem-blue",
  reg: "bg-sem-yellow-bg text-sem-yellow",
  mfg: "bg-sem-red-bg text-sem-red",
  market: "bg-sem-green-bg text-sem-green",
};

type EscalationNotice = { kind: "pending" | "success" | "error"; message: string };

export function Dashboard({ data, userName }: { data: DashboardSnapshot; userName: string }) {
  const [taskFilter, setTaskFilter] = useState<TaskFilter>("overdue");
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [escalation, setEscalation] = useState<EscalationNotice | null>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const filteredTasks = useMemo(
    () => filterTasks(data.tasks, taskFilter, new Date(data.generatedAt)),
    [data.generatedAt, data.tasks, taskFilter],
  );

  async function previewEscalation(task: Task) {
    setPendingTaskId(task.taskId);
    setEscalation({ kind: "pending", message: `Preparing a preview for ${task.assignee}. Nothing will be sent.` });

    try {
      const response = await fetch(`/api/tasks/${task.taskId}/escalate`, { method: "POST" });
      const payload: unknown = await response.json().catch(() => null);
      if (!response.ok) {
        const error = payload && typeof payload === "object" && "error" in payload && typeof payload.error === "string"
          ? payload.error
          : `Preview failed (${response.status})`;
        throw new Error(error);
      }
      if (!payload || typeof payload !== "object" || !("preview" in payload) || payload.preview !== true) {
        throw new Error("The server did not return a safe preview response.");
      }

      const recipient = "recipient" in payload && typeof payload.recipient === "string" ? payload.recipient : task.manager;
      setEscalation({
        kind: "success",
        message: `Preview prepared for ${recipient}. No message was sent or queued.`,
      });
    } catch (error) {
      setEscalation({
        kind: "error",
        message: error instanceof Error ? error.message : "Could not prepare the escalation preview.",
      });
    } finally {
      setPendingTaskId(null);
    }
  }

  const runway = data.financialPulse.runwayMonths;

  return (
    <AppShell active="/">
      <div className="mx-auto w-full min-w-0 max-w-[1500px] overflow-x-hidden p-4 md:p-6 desktop:p-7">
        <TopBar generatedAt={data.generatedAt} lastUpdated={data.financialPulse.lastUpdated} userName={userName} />
        <p id="data-classification" className="mb-4 rounded-md border border-sem-blue/30 bg-sem-blue-bg px-4 py-3 text-sm font-semibold text-sem-blue">
          Synthetic demonstration data only. Connect an audited server-side adapter before operational use.
        </p>
        <AlertsStrip alerts={data.alerts} />
        <section aria-labelledby="financial-pulse" className="mt-5">
          <SectionHeader id="financial-pulse" title="Financial Pulse" caption="Synthetic MTD fixture in SAR; unknown values are not estimated" />
          <div className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2 desktop:grid-cols-4">
            <KPICard title="Revenue MTD" value={formatSAR(data.financialPulse.revenue)} delta="Source snapshot" tone="blue" spark={data.financialPulse.sparkSeries} />
            <KPICard title="Net Profit" value={formatSAR(data.financialPulse.netProfit)} delta="Source snapshot" tone={data.financialPulse.netProfit < 0 ? "red" : "blue"} />
            <KPICard title="Cash" value={formatSAR(data.financialPulse.cash)} delta={data.financialPulse.cash === null ? "Not disclosed" : "Source snapshot"} tone="blue" />
            <KPICard
              title="Runway"
              value={runway === null ? "Unknown" : `${runway.toFixed(1)} months`}
              delta={data.financialPulse.burnRate === null ? "Burn not disclosed" : `${formatCompactSAR(data.financialPulse.burnRate)} burn`}
              tone={runway === null ? "blue" : runway < 3 ? "red" : "green"}
              progress={runway === null ? undefined : Math.min(Math.max(runway / 12, 0), 1)}
            />
          </div>
        </section>
        <section className="mt-5 grid min-w-0 grid-cols-1 gap-4 desktop:grid-cols-12">
          <RevenuePanel revenue={data.revenueByProduct} />
          <InvoicesPanel invoices={data.invoices} />
        </section>
        <section aria-labelledby="product-status" className="mt-5">
          <SectionHeader id="product-status" title="Product Status by Platform" caption="Open a row to inspect its synthetic product profile" />
          <div className="grid min-w-0 grid-cols-1 gap-4">
            {data.productStatus.map((platform) => <PlatformBlock key={platform.id} platform={platform} onOpenProduct={setActiveProduct} />)}
          </div>
        </section>
        <section className="mt-5 grid min-w-0 grid-cols-1 gap-4 desktop:grid-cols-12">
          <TasksPanel
            tasks={filteredTasks}
            filter={taskFilter}
            onFilter={setTaskFilter}
            onPreviewEscalation={previewEscalation}
            notice={escalation}
            pendingTaskId={pendingTaskId}
          />
          <TeamPanel members={data.teamPulse} />
        </section>
      </div>
      {activeProduct ? <ProductDrawer product={activeProduct} onClose={() => setActiveProduct(null)} /> : null}
    </AppShell>
  );
}

function TopBar({ generatedAt, lastUpdated, userName }: { generatedAt: string; lastUpdated: string; userName: string }) {
  const dateLabel = new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric",
    timeZone: "Asia/Riyadh",
  }).format(new Date(generatedAt));
  const stale = isStale(lastUpdated, new Date(generatedAt));

  return (
    <header className="sticky top-0 z-20 -mx-4 mb-5 border-b border-border-default bg-surface-bg/95 px-4 py-3 backdrop-blur md:-mx-6 md:px-6 desktop:-mx-7 desktop:px-7">
      <div className="flex min-w-0 flex-wrap items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-caption uppercase tracking-[0.12em] text-text-muted">{dateLabel}</p>
          <h1 className="text-h1 text-brand-navy">Good morning, {userName}</h1>
          <p className="text-sm text-text-muted">Executive dashboard: money, products, people, and urgent work.</p>
        </div>
        <div className="flex w-full min-w-0 flex-wrap items-center gap-2 sm:w-auto">
          <MobileNav />
          <span className={cn("rounded-full px-3 py-1 text-caption", stale ? "bg-sem-yellow-bg text-sem-yellow" : "bg-sem-green-bg text-sem-green") }>
            {stale ? "Source snapshot is stale" : "Source updated under 24h"}
          </span>
          <a href="/finance" className="rounded-sm bg-brand-navy px-4 py-2 text-sm font-semibold text-white shadow-1 hover:bg-brand-navy-2">Review finance</a>
        </div>
      </div>
    </header>
  );
}

function AlertsStrip({ alerts }: { alerts: DashboardSnapshot["alerts"] }) {
  return (
    <section role="region" aria-label="Active alerts" className="-mx-4 max-w-[calc(100%+2rem)] overflow-x-auto px-4 md:mx-0 md:max-w-full md:px-0">
      <div className="flex min-w-max gap-3">
        {alerts.map((alert) => (
          <a key={alert.alertId} href={alert.sourceRef} className={cn("inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold shadow-1", severityStyles[alert.severity])}>
            <span className="h-2 w-2 rounded-full bg-current" aria-hidden="true" />
            {alert.message}
          </a>
        ))}
      </div>
    </section>
  );
}

function SectionHeader({ id, title, caption }: { id: string; title: string; caption: string }) {
  return <div className="mb-3"><h2 id={id} className="text-h2 text-brand-navy">{title}</h2><p className="text-caption text-text-muted">{caption}</p></div>;
}

function KPICard({ title, value, delta, tone, spark, progress }: { title: string; value: string; delta: string; tone: Severity; spark?: number[]; progress?: number }) {
  return (
    <article className="rounded-md border border-border-default bg-white p-4 text-left shadow-1" aria-label={`${title}, ${value}, ${delta}`}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-label uppercase text-text-muted">{title}</p>
        <span className={cn("rounded-full px-2 py-1 text-caption", severityStyles[tone])}>{delta}</span>
      </div>
      <p className="mt-3 font-num text-kpi text-text-primary">{value}</p>
      {spark ? <Sparkline values={spark} /> : null}
      {typeof progress === "number" ? <div className="mt-4 h-2 rounded-full bg-surface-bg"><div className={cn("h-2 rounded-full", tone === "red" ? "bg-sem-red" : "bg-brand-teal")} style={{ width: `${Math.min(Math.max(progress, 0), 1) * 100}%` }} /></div> : null}
    </article>
  );
}

function Sparkline({ values }: { values: number[] }) {
  const finiteValues = values.map((value) => Number.isFinite(value) ? value : 0);
  const max = Math.max(0, ...finiteValues);
  return (
    <div className="mt-4 flex h-10 items-end gap-1" aria-hidden="true">
      {finiteValues.map((value, index) => {
        const ratio = max > 0 ? value / max : 0;
        const height = Math.min(Math.max(ratio * 100, 18), 100);
        return <span key={`${value}-${index}`} className="w-full rounded-t-sm bg-brand-teal/55" style={{ height: `${height}%` }} />;
      })}
    </div>
  );
}

function RevenuePanel({ revenue }: { revenue: RevenueProduct[] }) {
  return (
    <section className="rounded-md border border-border-default bg-white p-4 shadow-1 desktop:col-span-8">
      <SectionHeader id="revenue-product" title="Revenue by Product" caption="Synthetic MTD contribution" />
      <div className="grid gap-3">
        {revenue.map((item) => (
          <div key={item.productId} className="grid gap-3 rounded-md border border-border-default p-3 md:grid-cols-[1fr_auto] md:items-center">
            <div><p className="font-semibold text-text-primary">{item.name}</p><p className="text-caption uppercase text-text-muted">{item.platform}</p></div>
            <div className="min-w-[180px]">
              <p className="text-right font-num font-semibold">{formatCompactSAR(item.amountSAR)}</p>
              <div className="mt-2 h-2 rounded-full bg-surface-bg"><div className="h-2 rounded-full bg-brand-teal" style={{ width: `${Math.min(Math.max(item.share, 0), 1) * 100}%` }} /></div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function InvoicesPanel({ invoices }: { invoices: DashboardSnapshot["invoices"] }) {
  return (
    <section className="rounded-md border border-border-default bg-white p-4 shadow-1 desktop:col-span-4">
      <SectionHeader id="invoices" title="Invoices" caption="Status derived from due date" />
      <div className="space-y-3">
        {invoices.map((invoice) => (
          <article id={invoice.invoiceId} key={invoice.invoiceId} className="rounded-md border border-border-default p-3">
            <div className="flex items-start justify-between gap-3">
              <div><p className="font-semibold">{invoice.partnerName}</p><p className="text-caption text-text-muted">Due {invoice.dueDate}</p></div>
              <span className={cn("rounded-full px-2 py-1 text-caption font-semibold uppercase", invoice.status === "overdue" ? severityStyles.red : invoice.status === "upcoming" ? severityStyles.yellow : invoice.status === "paid" ? severityStyles.green : severityStyles.blue)}>{invoice.status}</span>
            </div>
            <p className="mt-2 font-num text-sm font-semibold">{formatSAR(invoice.amountSAR)}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlatformBlock({ platform, onOpenProduct }: { platform: PlatformBlockData; onOpenProduct: (product: Product) => void }) {
  const [open, setOpen] = useState(false);
  const panelId = `platform-${platform.id}`;
  return (
    <section className="overflow-hidden rounded-md border border-border-default bg-white shadow-1">
      <button className="flex w-full items-center justify-between bg-gradient-to-r from-surface-bg to-white p-4 text-left" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-controls={panelId}>
        <span><span className="text-h2 text-brand-navy">{platform.name}</span><span className="ml-2 text-caption text-text-muted">{platform.productCount} products</span></span>
        <span className="text-sm font-semibold">{open ? "Collapse" : "Expand"}</span>
      </button>
      <div id={panelId} className={cn("grid transition-all", open ? "grid-rows-[1fr]" : "grid-rows-[0fr] md:grid-rows-[1fr]")}>
        <div className="overflow-hidden">{platform.products.map((product) => <ProductRow key={product.productId} product={product} onOpen={() => onOpenProduct(product)} />)}</div>
      </div>
    </section>
  );
}

function ProductRow({ product, onOpen }: { product: Product; onOpen: () => void }) {
  return (
    <button id={product.productId} onClick={onOpen} className="grid w-full gap-3 border-t border-border-default p-4 text-left hover:bg-surface-bg md:grid-cols-[1.3fr_0.8fr_1.3fr_auto] md:items-center">
      <span><span className="block max-w-[32ch] truncate font-semibold" title={product.name}>{product.name}</span><span className="text-caption text-text-muted">{product.subtitle} - Owner: {product.owner}</span></span>
      <StagePill stage={product.stage} label={product.stageLabel} />
      <span className="grid gap-2">
        {product.metrics.map((metric) => <span key={metric.label} className="flex items-center justify-between gap-3 text-sm"><span className="text-text-muted">{metric.label}</span><span className={cn("font-semibold", metric.tone === "red" && "text-sem-red")}>{metric.value}</span></span>)}
        {product.stock ? <StockBar current={product.stock.current} threshold={product.stock.threshold} max={product.stock.max} /> : null}
      </span>
      <span className="rounded-sm bg-brand-navy px-3 py-2 text-center text-sm font-semibold text-white">{product.actionLabel}</span>
    </button>
  );
}

function StagePill({ stage, label }: { stage: StageId; label: string }) {
  return <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase", stageStyles[stage])}>{label}</span>;
}

function StockBar({ current, threshold, max }: { current: number; threshold: number; max: number }) {
  const low = current < threshold;
  const width = max > 0 ? Math.min(Math.max((current / max) * 100, 0), 100) : 0;
  return <span><span className="block h-2 rounded-full bg-surface-bg"><span className={cn("block h-2 rounded-full", low ? "bg-sem-red" : "bg-sem-green")} style={{ width: `${width}%` }} /></span>{low ? <span className="mt-1 block text-caption font-semibold text-sem-red">Below reorder threshold</span> : null}</span>;
}

function TasksPanel({ tasks, filter, onFilter, onPreviewEscalation, notice, pendingTaskId }: {
  tasks: Task[];
  filter: TaskFilter;
  onFilter: (filter: TaskFilter) => void;
  onPreviewEscalation: (task: Task) => void;
  notice: EscalationNotice | null;
  pendingTaskId: string | null;
}) {
  const emptyMessage = filter === "overdue" ? "No overdue tasks." : filter === "week" ? "No tasks are due in the next seven days." : "No blocked tasks.";
  return (
    <section className="order-1 rounded-md border border-border-default bg-white p-4 shadow-1 desktop:order-2 desktop:col-span-8">
      <SectionHeader id="tasks" title="Tasks" caption="Statuses are derived from due dates; escalation is preview-only" />
      <div className="mb-4 flex gap-2">
        {(["overdue", "week", "blocked"] as TaskFilter[]).map((candidate) => <button key={candidate} onClick={() => onFilter(candidate)} aria-pressed={filter === candidate} className={cn("rounded-full px-3 py-1 text-sm font-semibold", filter === candidate ? "bg-brand-navy text-white" : "bg-surface-bg text-text-muted")}>{candidate}</button>)}
      </div>
      {notice ? <p role="status" aria-live="polite" className={cn("mb-3 rounded-sm px-3 py-2 text-sm font-semibold", notice.kind === "error" ? severityStyles.red : notice.kind === "pending" ? severityStyles.blue : severityStyles.green)}>{notice.message}</p> : null}
      <div className="space-y-3">
        {tasks.length === 0 ? <p className="rounded-md bg-sem-green-bg p-4 text-sm font-semibold text-sem-green">{emptyMessage}</p> : null}
        {tasks.map((task) => <TaskRow key={task.taskId} task={task} onPreviewEscalation={() => onPreviewEscalation(task)} pending={pendingTaskId === task.taskId} />)}
      </div>
    </section>
  );
}

function TaskRow({ task, onPreviewEscalation, pending }: { task: Task; onPreviewEscalation: () => void; pending: boolean }) {
  const [expanded, setExpanded] = useState(false);
  const blockerId = `${task.taskId}-blocker`;
  const statusTone = task.status === "overdue" ? severityStyles.red : task.status === "blocked" || task.status === "due-today" ? severityStyles.yellow : task.status === "on-track" ? severityStyles.green : severityStyles.blue;
  return (
    <article id={task.taskId} className="rounded-md border border-border-default p-3">
      <div className="grid gap-3 md:grid-cols-[auto_1fr_auto_auto] md:items-center">
        <span title={task.priority} aria-label={`${task.priority} priority`} className={cn("h-3 w-3 rounded-full", task.priority === "critical" ? "bg-sem-red" : task.priority === "high" ? "bg-sem-yellow" : "bg-sem-blue")} />
        <div><p className="font-semibold">{task.title}</p><p className="text-caption text-text-muted">{task.assignee} - {task.product} - due {task.dueDate}</p></div>
        <span className={cn("w-fit rounded-full px-3 py-1 text-xs font-semibold uppercase", statusTone)}>{task.status.replace("-", " ")}</span>
        <div className="flex gap-2">
          {task.blocker ? <button className="rounded-sm border border-border-default px-3 py-2 text-sm font-semibold" onClick={() => setExpanded((value) => !value)} aria-expanded={expanded} aria-controls={blockerId}>{expanded ? "Hide blocker" : "View blocker"}</button> : null}
          <button className="rounded-sm bg-brand-navy px-3 py-2 text-sm font-semibold text-white disabled:cursor-wait disabled:opacity-60" onClick={onPreviewEscalation} disabled={pending}>{pending ? "Preparing..." : "Preview escalation"}</button>
        </div>
      </div>
      {expanded && task.blocker ? <p id={blockerId} className="mt-3 rounded-sm bg-sem-yellow-bg p-3 text-sm text-sem-yellow">{task.blocker}</p> : null}
    </article>
  );
}

function TeamPanel({ members }: { members: TeamMember[] }) {
  return (
    <section className="order-2 rounded-md border border-border-default bg-white p-4 shadow-1 desktop:order-1 desktop:col-span-4">
      <SectionHeader id="team" title="Team Pulse" caption="Synthetic role-based snapshot" />
      <div className="space-y-3">
        {members.length === 0 ? <p className="rounded-md bg-surface-bg p-4 text-sm text-text-muted">No check-ins recorded.</p> : null}
        {members.map((member) => <div key={member.memberId} className="flex items-center justify-between gap-3 rounded-md border border-border-default p-3"><div className="flex items-center gap-3"><WhoChip name={member.name} /><div><p className="font-semibold">{member.name}</p><p className="text-caption text-text-muted">{member.openTasks} open - last {member.lastSeen}</p></div></div><span className={cn("rounded-full px-2 py-1 text-caption", member.status === "working" ? severityStyles.green : member.status === "in-meeting" ? severityStyles.blue : "bg-surface-bg text-text-muted")}>{member.status}</span></div>)}
      </div>
    </section>
  );
}

function WhoChip({ name }: { name: string }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  return <span className="grid h-7 w-7 place-items-center rounded-full bg-gradient-to-br from-brand-teal to-brand-navy text-caption font-semibold text-white" aria-hidden="true">{initials}</span>;
}

function ProductDrawer({ product, onClose }: { product: Product; onClose: () => void }) {
  const titleId = `product-drawer-${product.productId}`;
  return (
    <div className="fixed inset-0 z-40 bg-brand-navy/30" role="dialog" aria-modal="true" aria-labelledby={titleId}>
      <aside className="ml-auto flex h-full w-full max-w-xl flex-col bg-white p-5 shadow-2 md:rounded-l-lg">
        <div className="flex items-start justify-between gap-4">
          <div><p className="text-label uppercase text-text-muted">Module 2 profile</p><h2 id={titleId} className="text-h1 text-brand-navy">{product.name}</h2><p className="text-sm text-text-muted">{product.subtitle}</p></div>
          <button className="rounded-sm border border-border-default px-3 py-2 text-sm font-semibold" onClick={onClose} aria-label={`Close ${product.name} profile`}>Close</button>
        </div>
        <div className="mt-6 grid gap-3"><StagePill stage={product.stage} label={product.stageLabel} /><p className="rounded-md bg-surface-bg p-4 text-sm text-text-muted">This profile is a read-only view of the source snapshot. Finance, lifecycle, documents, and task workflows are not connected here.</p>{product.stock ? <StockBar current={product.stock.current} threshold={product.stock.threshold} max={product.stock.max} /> : null}</div>
      </aside>
    </div>
  );
}
