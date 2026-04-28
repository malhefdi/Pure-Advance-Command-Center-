import { moduleSummaries } from "@/lib/seed-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard", count: 4 },
  { href: "/products", label: "Products" },
  { href: "/coolvex", label: "Coolvex™" },
  { href: "/team", label: "Team" },
  { href: "/finance", label: "Finance" },
  { href: "/pipeline", label: "Pipeline" },
  { href: "/crm", label: "Partners" },
  { href: "/ownership", label: "Ownership" },
  { href: "/ai", label: "AI" },
];

export function AppShell({ children, active = "/" }: { children: React.ReactNode; active?: string }) {
  return (
    <div className="min-h-screen bg-surface-bg text-text-primary">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-3 focus:py-2 focus:shadow-2">Skip to content</a>
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[240px] bg-brand-navy text-white md:block">
        <div className="flex h-full flex-col p-4">
          <div className="mb-7 rounded-lg bg-black/30 p-3 ring-1 ring-white/10">
            <img
              src="/pure-advance-logo.png"
              alt="Pure Advance"
              className="h-auto w-full"
            />
            <p className="mt-2 text-xs text-white/65">Command Center</p>
          </div>
          <nav aria-label="Primary navigation" className="space-y-2">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={cn("flex items-center justify-between rounded-sm px-3 py-2 text-sm text-white/78 transition hover:bg-brand-navy-2 hover:text-white", active === item.href && "bg-brand-navy-2 text-white")}>
                <span>{item.label}</span>{item.count ? <span className="rounded-full bg-sem-red px-2 py-0.5 text-[11px] font-semibold">{item.count}</span> : null}
              </a>
            ))}
          </nav>
          <div className="mt-auto rounded-md border border-white/12 bg-white/8 p-3 text-xs text-white/70">Modules {moduleSummaries.length + 1} planned. Module 1 is live on seeded data.</div>
        </div>
      </aside>
      <main id="main" className="min-h-screen md:pl-[240px]">{children}</main>
    </div>
  );
}

export function MobileNav() {
  return (
    <details className="md:hidden">
      <summary className="cursor-pointer rounded-sm border border-border-default bg-white px-3 py-2 text-sm font-semibold text-brand-navy shadow-1">Menu</summary>
      <nav className="mt-2 grid gap-2 rounded-md border border-border-default bg-white p-2 shadow-2" aria-label="Mobile navigation">
        {navItems.map((item) => <a key={item.href} href={item.href} className="rounded-sm px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-bg">{item.label}</a>)}
      </nav>
    </details>
  );
}
