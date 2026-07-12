import Image from "next/image";
import { moduleSummaries } from "@/lib/seed-data";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/", label: "Dashboard" },
  { href: "/products", label: "Products" },
  { href: "/coolvex", label: "Launch cockpit" },
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
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-white focus:px-3 focus:py-2 focus:shadow-2">
        Skip to content
      </a>
      <aside className="fixed left-0 top-0 z-30 hidden h-screen w-[240px] bg-brand-navy text-white md:block">
        <div className="flex h-full flex-col p-4">
          <div className="mb-7 rounded-lg bg-black/30 p-3 ring-1 ring-white/10">
            <Image src="/pure-advance-logo.png" alt="Pure Advance" width={1024} height={510} priority className="h-auto w-full" />
            <p className="mt-2 text-xs text-white/65">Command Center</p>
          </div>
          <nav aria-label="Primary navigation" className="space-y-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center justify-between rounded-sm px-3 py-2 text-sm text-white/78 transition hover:bg-brand-navy-2 hover:text-white",
                  active === item.href && "bg-brand-navy-2 text-white",
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
          <div className="mt-auto rounded-md border border-white/12 bg-white/8 p-3 text-xs text-white/70">
            {moduleSummaries.length + 1} modules represented. All repository fixtures are synthetic and read-only.
          </div>
        </div>
      </aside>
      <main id="main" className="min-h-screen w-full min-w-0 max-w-full overflow-x-hidden md:pl-[240px]">{children}</main>
    </div>
  );
}

export function MobileNav() {
  return (
    <details className="md:hidden">
      <summary className="cursor-pointer rounded-sm border border-border-default bg-white px-3 py-2 text-sm font-semibold text-brand-navy shadow-1">
        Menu
      </summary>
      <nav className="mt-2 grid gap-2 rounded-md border border-border-default bg-white p-2 shadow-2" aria-label="Mobile navigation">
        {navItems.map((item) => (
          <a key={item.href} href={item.href} className="rounded-sm px-3 py-2 text-sm font-medium text-text-muted hover:bg-surface-bg">
            {item.label}
          </a>
        ))}
      </nav>
    </details>
  );
}
