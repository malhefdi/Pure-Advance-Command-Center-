import { AppShell, MobileNav } from "@/components/layout/AppShell";
import { cn } from "@/lib/utils";
import type { ModuleSummary } from "@/types/command-center";

export function ModulePage({ module, active }: { module: ModuleSummary; active: string }) {
  return (
    <AppShell active={active}>
      <div className="mx-auto max-w-6xl p-4 md:p-6 desktop:p-7">
        <div className="mb-5 flex items-center justify-between gap-4">
          <div><p className="text-label uppercase text-text-muted">{module.eyebrow}</p><h1 className="text-h1 text-brand-navy">{module.title}</h1></div>
          <MobileNav />
        </div>
        <section className="rounded-lg border border-border-default bg-white p-6 shadow-1">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className={cn("rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide", module.status === "live" && "bg-sem-green-bg text-sem-green", module.status === "foundation" && "bg-sem-blue-bg text-sem-blue", module.status === "planned" && "bg-sem-yellow-bg text-sem-yellow")}>{module.status}</span>
            <span className="text-caption text-text-faint">Roadmap foundation implemented</span>
          </div>
          <p className="max-w-3xl text-body text-text-muted">{module.description}</p>
          <div className="mt-6 grid gap-3 md:grid-cols-3">
            {module.bullets.map((bullet) => <div key={bullet} className="rounded-md border border-border-default bg-surface-bg p-4"><p className="text-sm font-semibold text-text-primary">{bullet}</p><p className="mt-2 text-caption text-text-muted">Requires an audited server-side adapter before operational data is connected.</p></div>)}
          </div>
        </section>
      </div>
    </AppShell>
  );
}
