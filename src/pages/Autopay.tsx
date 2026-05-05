import { useMemo, useState } from "react";
import {
  Menu, TrendingUp, Search, Bell, Filter, Download, Lock, ChevronRight,
  ArrowUpRight, User, ShieldCheck, Plus, Info, LogOut, Star, CreditCard, X
} from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";
import { Logo, mandates, Mandate } from "@/components/dashboard/autopay/autopayData";
import { MandateDrawer } from "@/components/dashboard/autopay/MandateDrawer";
import { CancelGuideModal } from "@/components/dashboard/autopay/CancelGuideModal";
import { AddBankModal } from "@/components/dashboard/autopay/AddBankModal";

type View = "payments" | "insights" | "profile";
type TabKey = "all" | "monthly" | "yearly" | "paused";

/* ============== Status pill ============== */

const StatusPill = ({ status }: { status: Mandate["status"] }) => {
  if (status === "active") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
      <span className="w-1.5 h-1.5 rounded-full bg-primary" />Active
    </span>
  );
  if (status === "paused") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[hsl(38,92%,90%)] text-[hsl(38,92%,30%)]">
      <span className="w-1.5 h-1.5 rounded-full bg-[hsl(38,92%,42%)]" />Paused
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-destructive/10 text-destructive">
      Cancelled
    </span>
  );
};

/* ============== Sidebar (standalone, ClearShield-style) ============== */

const Sidebar = ({
  view, setView,
}: { view: View; setView: (v: View) => void }) => {
  const items: { key: View; label: string; icon: JSX.Element }[] = [
    { key: "payments", label: "Recurring Payments", icon: <CreditCard className="h-[18px] w-[18px]" strokeWidth={view === "payments" ? 2 : 1.5} /> },
    { key: "insights", label: "Spending Insights", icon: <TrendingUp className="h-[18px] w-[18px]" strokeWidth={view === "insights" ? 2 : 1.5} /> },
  ];

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border/20 flex-col z-40 hidden lg:flex">
      <div className="p-6 pb-4">
        <img src={mitigataLogo} alt="Mitigata" className="h-8 w-auto" />
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="text-caps px-3 mb-3">Menu</p>
        <ul className="space-y-1">
          {items.map((it) => {
            const active = view === it.key;
            return (
              <li key={it.key}>
                <button
                  onClick={() => setView(it.key)}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all duration-200 ${
                    active
                      ? "bg-primary/8 text-foreground font-semibold shadow-[inset_0_1px_2px_rgba(4,219,127,0.08)]"
                      : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                  }`}
                >
                  <span className={active ? "text-primary" : ""}>{it.icon}</span>
                  <span className="flex-1 text-left">{it.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Connected bank chip */}
      <div className="px-3 pb-2">
        <div className="rounded-2xl border border-border/40 bg-card px-3.5 py-3">
          <div className="text-[10px] uppercase tracking-[0.16em] font-semibold text-muted-foreground mb-2">Connected</div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[hsl(220,60%,30%)] text-white grid place-items-center font-semibold text-[13px]">H</div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold leading-tight text-foreground">HDFC Bank</div>
              <div className="text-[11px] text-muted-foreground leading-tight">UPI ••8829</div>
            </div>
            <span className="ml-auto w-2 h-2 rounded-full bg-primary ring-[3px] ring-primary/15" />
          </div>
        </div>
      </div>

      {/* Profile row (matches ClearShield ProfileRow style) */}
      <div className="p-3">
        <button
          onClick={() => setView("profile")}
          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2.5 transition ${
            view === "profile" ? "bg-primary/10" : "bg-secondary/40 hover:bg-secondary/70"
          }`}
        >
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary grid place-items-center text-xs font-semibold">R</div>
          <div className="min-w-0 text-left flex-1">
            <div className={`text-display text-sm leading-tight truncate ${view === "profile" ? "text-foreground" : ""}`}>Rahul Kumar</div>
            <div className="text-[11px] text-muted-foreground leading-tight">Free plan</div>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
    </aside>
  );
};

/* ============== Topbar ============== */

const Topbar = ({
  view, isPremium, setIsPremium, onMobileMenu,
}: { view: View; isPremium: boolean; setIsPremium: (b: boolean) => void; onMobileMenu: () => void }) => {
  const titles: Record<View, string> = { payments: "Recurring Payments", insights: "Spending Insights", profile: "Profile" };
  return (
    <div className="flex items-end justify-between gap-6 mb-6 lg:mb-7 flex-wrap">
      <div className="flex items-center gap-3">
        {/* Desktop: greeting + title */}
        <div className="hidden lg:block">
          <div className="text-[13px] text-muted-foreground font-medium mb-1">Good morning, Rahul</div>
          <h1 className="text-display text-[30px] leading-[1.1]">{titles[view]}</h1>
        </div>
        {/* Mobile: small section label, then big greeting */}
        <div className="lg:hidden">
          <div className="text-[13px] text-muted-foreground font-medium mb-1">{titles[view]}</div>
          <h1 className="text-display text-[26px] leading-[1.1]">Good morning, Rahul</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-[320px] hidden lg:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            placeholder="Search..."
            className="w-full h-[42px] rounded-full border border-border/60 bg-card px-[40px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/15 transition"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold font-mono text-muted-foreground bg-secondary border border-border/40 px-1.5 py-0.5 rounded-md">⌘K</span>
        </div>
        <button className="w-[42px] h-[42px] rounded-full bg-card border border-border/60 grid place-items-center text-muted-foreground hover:text-foreground hover:border-border transition relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary border-2 border-card" />
        </button>
        <div className="hidden md:inline-flex bg-secondary/60 rounded-full p-1 gap-0.5">
          <button onClick={() => setIsPremium(false)} className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition ${!isPremium ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>Free</button>
          <button onClick={() => setIsPremium(true)} className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition ${isPremium ? "bg-foreground text-background" : "text-muted-foreground hover:text-foreground"}`}>Premium</button>
        </div>
      </div>
    </div>
  );
};

/* ============== Stat card ============== */

const StatCard = ({
  label, value, suffix, meta, accent, badge,
}: { label: string; value: string; suffix?: string; meta: React.ReactNode; accent?: "warn" | "savings"; badge?: string }) => {
  const valueColor = accent === "warn" ? "text-[hsl(38,92%,42%)]" : accent === "savings" ? "text-primary" : "text-foreground";
  return (
    <div className="card-surface-hover !p-6">
      <div className="text-xs text-muted-foreground font-medium mb-3.5 inline-flex items-center gap-2">
        {label}
        {badge && <span className="bg-[hsl(38,92%,90%)] text-[hsl(38,92%,30%)] text-[10px] font-semibold px-1.5 py-0.5 rounded-full tracking-wider">{badge}</span>}
      </div>
      <div className={`text-display text-[28px] leading-none mb-2 tabular-nums ${valueColor}`}>
        {value}
        {suffix && <span className="text-sm font-medium text-muted-foreground ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs text-muted-foreground font-medium">{meta}</div>
    </div>
  );
};

/* ============== Payments view ============== */

const PaymentsView = ({ isPremium, onSelect, onUpgrade }: {
  isPremium: boolean; onSelect: (m: Mandate) => void; onUpgrade: () => void;
}) => {
  const [tab, setTab] = useState<TabKey>("all");

  const counts = useMemo(() => ({
    all: mandates.length,
    monthly: mandates.filter(m => m.cycle === "Monthly").length,
    yearly: mandates.filter(m => m.cycle === "Yearly").length,
    paused: mandates.filter(m => m.status === "paused").length,
  }), []);

  const list = useMemo(() => {
    if (tab === "monthly") return mandates.filter(m => m.cycle === "Monthly");
    if (tab === "yearly") return mandates.filter(m => m.cycle === "Yearly");
    if (tab === "paused") return mandates.filter(m => m.status === "paused");
    return mandates;
  }, [tab]);

  const visible = isPremium ? list : list.slice(0, 1);
  const locked = isPremium ? [] : list.slice(1);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        <StatCard label="Monthly total" value="₹3,553" meta={<><span className="text-primary font-semibold">+₹179</span> vs last month</>} />
        <StatCard label="Upcoming 7 days" value="₹1,198" meta="4 payments · Adobe debits tomorrow" />
        <StatCard label="Price changes" value="+₹70" accent="warn" badge="2" meta="Netflix +₹50, Spotify +₹20" />
      </div>

      <div className="bg-card rounded-[20px] border border-border/30 shadow-[0_1px_2px_rgba(0,0,0,0.03),0_8px_24px_rgba(0,0,0,0.02)] overflow-hidden">
        {/* toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4">
          <div className="inline-flex bg-secondary/60 rounded-full p-1 gap-0.5 overflow-x-auto max-w-full">
            {(["all","monthly","yearly","paused"] as TabKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition inline-flex items-center gap-1.5 whitespace-nowrap ${
                  tab === k ? "bg-card text-foreground shadow-sm font-semibold" : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
                <span className={`text-[11px] ${tab === k ? "text-muted-foreground" : "text-muted-foreground/70"}`}>· {counts[k]}</span>
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-2">
            <button className="h-9 px-4 rounded-full border border-border/60 text-foreground text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-secondary/60 transition">
              <Filter className="w-3.5 h-3.5 text-muted-foreground" />Filter
            </button>
            <button className="h-9 px-4 rounded-full border border-border/60 text-foreground text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-secondary/60 transition">
              <Download className="w-3.5 h-3.5 text-muted-foreground" />Export
            </button>
          </div>
        </div>

        {/* desktop list */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 px-6 py-3.5 bg-secondary/40 border-y border-border/40 text-[11px] tracking-[0.12em] font-semibold text-muted-foreground uppercase">
            <div>Subscription</div>
            <div>Next debit</div>
            <div>Status</div>
            <div className="text-right">Amount</div>
            <div></div>
          </div>
          <div>
            {visible.map((m) => (
              <div
                key={m.id}
                onClick={() => onSelect(m)}
                className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 items-center px-6 py-4 border-b border-border/30 last:border-0 cursor-pointer hover:bg-primary/[0.04] group transition"
              >
                <div className="flex items-center gap-3.5">
                  <Logo k={m.logo} />
                  <div>
                    <div className="font-semibold text-sm text-foreground">{m.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.cat}</div>
                  </div>
                </div>
                <div className="text-sm text-foreground">{m.dateFull}</div>
                <div className="flex items-center gap-2">
                  {m.status === "active" ? (
                    <>
                      <span className="bg-[hsl(25,95%,93%)] text-[hsl(25,95%,35%)] text-[10px] tracking-[0.06em] font-medium px-1.5 py-0.5 rounded-md">UPI</span>
                      <span className="text-xs text-foreground font-mono font-semibold">{m.bank} UPI ••{m.bankMask}</span>
                    </>
                  ) : <StatusPill status={m.status} />}
                </div>
                <div className="text-sm font-bold text-right tabular-nums text-foreground">₹{m.amount.toLocaleString("en-IN")}</div>
                <div className="w-8 h-8 rounded-full grid place-items-center text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
              </div>
            ))}
            {locked.map((m) => (
              <div key={m.id} className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 items-center px-6 py-4 border-b border-border/30 last:border-0">
                <div className="flex items-center gap-3.5 blur-[5px] select-none pointer-events-none">
                  <Logo k={m.logo} />
                  <div>
                    <div className="font-semibold text-sm">{m.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{m.cat}</div>
                  </div>
                </div>
                <div className="text-sm blur-[5px] select-none">{m.dateFull}</div>
                <div className="flex items-center gap-2 blur-[5px] select-none">
                  <span className="bg-[hsl(25,95%,93%)] text-[hsl(25,95%,35%)] text-[10px] px-1.5 py-0.5 rounded-md">UPI</span>
                  <span className="text-xs font-mono">{m.bank} UPI ••{m.bankMask}</span>
                </div>
                <div className="text-sm font-bold text-right blur-[5px] select-none">₹{m.amount}</div>
                <div className="w-8 h-8 grid place-items-center text-muted-foreground"><ChevronRight className="w-3.5 h-3.5" /></div>
              </div>
            ))}
          </div>

          {!isPremium && locked.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-12">
              <div className="bg-card/95 backdrop-blur-sm px-9 py-8 rounded-[20px] text-center max-w-[460px] pointer-events-auto shadow-[0_24px_60px_-20px_rgba(0,0,0,0.18)] border border-border/30">
                <div className="w-16 h-16 rounded-[18px] bg-primary grid place-items-center mx-auto mb-5 text-primary-foreground">
                  <Lock className="w-7 h-7" strokeWidth={2.2} />
                </div>
                <div className="text-display text-[22px] mb-2.5">See all {list.length} mandates</div>
                <div className="text-body text-sm mb-5">
                  Go Premium to see every autopay across banks, get price-change alerts, and access cancellation guides for every UPI app.
                </div>
                <button onClick={onUpgrade} className="h-[46px] px-[26px] rounded-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-sm inline-flex items-center gap-2 transition">
                  Upgrade to Premium <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* mobile cards */}
        <div className="md:hidden relative">
          {visible.map((m) => (
            <button key={m.id} onClick={() => onSelect(m)} className="w-full px-4 py-3.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 items-center text-left border-b border-border/30 last:border-0">
              <div className="col-span-2 flex items-center gap-3">
                <Logo k={m.logo} />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm text-foreground truncate">{m.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{m.cycle} · {m.dateFull}</div>
                </div>
                <div className="text-sm font-bold tabular-nums text-foreground">₹{m.amount}</div>
              </div>
            </button>
          ))}
          {locked.length > 0 && (
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-primary grid place-items-center mx-auto mb-3 text-primary-foreground">
                <Lock className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div className="text-display text-[18px] mb-2">See all {list.length} mandates</div>
              <div className="text-body text-[13px] mb-4">Upgrade to Premium for full access.</div>
              <button onClick={onUpgrade} className="h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center gap-2">
                Upgrade <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ============== Insights view ============== */

const InsightRow = ({ m, inactive }: { m: Mandate; inactive?: boolean }) => (
  <div className="grid grid-cols-[auto_1fr_auto] items-center gap-4 px-3 py-3.5 rounded-xl hover:bg-secondary/40 transition">
    <div className={inactive ? "opacity-70 grayscale-[0.4]" : ""}>
      <Logo k={m.logo} />
    </div>
    <div className="min-w-0">
      <div className={`text-sm font-semibold mb-1 flex items-center gap-2 ${inactive ? "opacity-70 text-foreground" : "text-foreground"}`}>
        {m.name}
        {m.status === "paused" && <StatusPill status="paused" />}
        {m.status === "cancelled" && <StatusPill status="cancelled" />}
      </div>
      <div className="text-xs text-muted-foreground font-medium truncate">
        {m.cat} · {m.status === "active" ? `since ${m.setupOn.split(",")[0]}` : `paused ${m.setupOn.split(",")[0]}`} · {m.status === "cancelled" ? "was " : ""}₹{m.amount}/{m.cycle === "Yearly" ? "yr" : "mo"}
      </div>
    </div>
    <div className="text-right min-w-[90px]">
      <div className={`text-display text-base leading-none mb-1 tabular-nums ${inactive ? "text-muted-foreground" : ""}`}>
        {m.totalLabel.split(" over ")[0]}
      </div>
      <div className="text-[11px] text-muted-foreground font-semibold">{m.months} months</div>
    </div>
  </div>
);

const InsightsView = () => {
  const active = mandates.filter(m => m.status === "active");
  const inactive = mandates.filter(m => m.status !== "active");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px]">
        <StatCard label="Lifetime spent" value="₹47,231" meta="Across 9 services since Sep 2023" />
        <StatCard label="Yearly commitments" value="₹4,788" suffix="/yr" meta="Disney+ renews Aug 2026" />
        <StatCard label="Saved by cancelling" value="₹3,096" accent="savings" meta="YouTube + Audible" />
      </div>

      <div className="card-surface !p-6">
        <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
          <div>
            <div className="text-display text-base flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-primary ring-4 ring-primary/15" />
              Active mandates
              <span className="bg-primary/10 text-primary text-[11px] font-semibold px-2 py-0.5 rounded-full">{active.length}</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Currently debiting your bank</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Total lifetime</span>
            <span className="text-display text-xl tabular-nums">₹44,135</span>
          </div>
        </div>
        <div>{active.map(m => <InsightRow key={m.id} m={m} />)}</div>
      </div>

      <div className="card-surface !p-6">
        <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
          <div>
            <div className="text-display text-base flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/60 ring-4 ring-muted/60" />
              Inactive mandates
              <span className="bg-muted text-muted-foreground text-[11px] font-semibold px-2 py-0.5 rounded-full">{inactive.length}</span>
            </div>
            <div className="text-xs text-muted-foreground font-medium mt-1">Paused or cancelled · No longer debiting your bank</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Total lifetime</span>
            <span className="text-display text-xl tabular-nums">₹3,096</span>
          </div>
        </div>
        <div>{inactive.map(m => <InsightRow key={m.id} m={m} inactive />)}</div>
      </div>
    </div>
  );
};

/* ============== Profile view ============== */

const ProfileView = ({ onAddBank }: { onAddBank: () => void }) => (
  <div className="space-y-[18px]">
    <div className="card-surface flex items-center gap-5 flex-wrap">
      <div className="w-16 h-16 rounded-full bg-secondary text-foreground grid place-items-center font-bold text-[22px]">R</div>
      <div className="flex-1 min-w-0">
        <div className="text-display text-[22px]">Rahul Kumar</div>
        <div className="text-body text-[13px] mt-1">rahul.k@icloud.com · +91 73382 70444</div>
        <div className="flex gap-2 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
            <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />Free plan
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
            <ShieldCheck className="w-3 h-3" strokeWidth={2.5} />Verified
          </span>
        </div>
      </div>
      <button className="ml-auto h-11 px-5 rounded-full bg-foreground hover:opacity-90 text-background font-semibold text-sm inline-flex items-center gap-2 transition">
        <Star className="w-3.5 h-3.5" />Upgrade to Pro
      </button>
    </div>

    <div className="card-surface">
      <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
        <div>
          <div className="text-display text-base">Connected banks</div>
          <div className="text-body text-xs mt-1">2 banks · 8 mandates total</div>
        </div>
        <button onClick={onAddBank} className="h-9 px-4 rounded-full border border-border/60 text-foreground text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-secondary/60 transition">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />Add bank
        </button>
      </div>

      <div className="divide-y divide-border/30">
        {[
          { code: "H", name: "HDFC Bank", meta: "UPI ••8829 · connected Mar 12", count: 6 },
          { code: "S", name: "State Bank of India", meta: "UPI ••4821 · connected Aug 4", count: 2 },
        ].map((b) => (
          <div key={b.code} className="flex items-center gap-3.5 py-4">
            <div className="w-10 h-10 rounded-full bg-[hsl(220,60%,30%)] text-white grid place-items-center font-semibold text-[15px]">{b.code}</div>
            <div className="min-w-0">
              <div className="text-sm font-semibold text-foreground">{b.name}</div>
              <div className="text-xs text-muted-foreground">{b.meta}</div>
            </div>
            <div className="ml-auto text-right">
              <div className="text-display text-lg leading-none">{b.count}</div>
              <div className="text-[11px] text-muted-foreground mt-1 font-medium">mandates</div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 bg-secondary/50 rounded-xl px-4 py-3 text-xs text-muted-foreground flex gap-2.5 items-start">
        <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
        <span>Consent renews every <strong className="text-foreground font-semibold">12 months</strong> via Account Aggregator.</span>
      </div>
    </div>

    <button className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-card border border-border/60 text-destructive font-semibold text-sm hover:bg-destructive/5 transition w-full md:w-auto">
      <LogOut className="w-4 h-4" />
      Log out
    </button>
  </div>
);

/* ============== Mobile drawer + bottom nav ============== */

const MobileSidebar = ({ open, onClose, view, setView }: {
  open: boolean; onClose: () => void; view: View; setView: (v: View) => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div onClick={onClose} className="absolute inset-0 bg-foreground/30 backdrop-blur-sm" />
      <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-card px-4 py-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-secondary/60 grid place-items-center"><X className="w-4 h-4" /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { key: "payments" as View, label: "Recurring Payments", icon: <CreditCard className="h-[18px] w-[18px]" /> },
            { key: "insights" as View, label: "Spending Insights", icon: <TrendingUp className="h-[18px] w-[18px]" /> },
            { key: "profile" as View, label: "Profile", icon: <User className="h-[18px] w-[18px]" /> },
          ].map((it) => (
            <button
              key={it.key}
              onClick={() => { setView(it.key); onClose(); }}
              className={`flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm text-left ${
                view === it.key ? "bg-primary/10 text-foreground font-semibold [&_svg]:text-primary" : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
              }`}
            >
              {it.icon}{it.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

const MobileBottomNav = ({ view, setView }: { view: View; setView: (v: View) => void }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border/40 py-2 px-3 pb-[calc(8px+env(safe-area-inset-bottom))] z-[55] shadow-[0_-4px_20px_-8px_rgba(0,0,0,0.08)]">
    <div className="grid grid-cols-3 gap-1 max-w-[480px] mx-auto">
      {[
        { key: "payments" as View, label: "Payments", icon: <CreditCard className="w-[22px] h-[22px]" strokeWidth={view === "payments" ? 2.4 : 2} /> },
        { key: "insights" as View, label: "Insights", icon: <TrendingUp className="w-[22px] h-[22px]" strokeWidth={view === "insights" ? 2.4 : 2} /> },
        { key: "profile" as View, label: "Profile", icon: <User className="w-[22px] h-[22px]" strokeWidth={view === "profile" ? 2.4 : 2} /> },
      ].map((it) => {
        const active = view === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl transition ${active ? "text-primary" : "text-muted-foreground"}`}
          >
            <div className={`w-12 h-8 rounded-full grid place-items-center transition ${active ? "bg-primary/10" : ""}`}>{it.icon}</div>
            <span className="text-[11px] font-semibold">{it.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

/* ============== Page ============== */

const AutopayPage = () => {
  const [view, setView] = useState<View>("payments");
  const [isPremium, setIsPremium] = useState(false);
  const [selected, setSelected] = useState<Mandate | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Sidebar view={view} setView={setView} />

      <main className="lg:ml-[260px] px-4 sm:px-6 lg:px-8 xl:px-12 py-5 lg:py-[22px] pb-[100px] lg:pb-[60px] max-w-[1240px]">
        <Topbar view={view} isPremium={isPremium} setIsPremium={setIsPremium} onMobileMenu={() => setMobileMenu(true)} />

        {view === "payments" && (
          <PaymentsView isPremium={isPremium} onSelect={setSelected} onUpgrade={() => setIsPremium(true)} />
        )}
        {view === "insights" && <InsightsView />}
        {view === "profile" && <ProfileView onAddBank={() => setAddBankOpen(true)} />}
      </main>

      <MobileBottomNav view={view} setView={setView} />
      <MobileSidebar open={mobileMenu} onClose={() => setMobileMenu(false)} view={view} setView={setView} />

      <MandateDrawer
        mandate={selected}
        onClose={() => setSelected(null)}
        onCancel={() => setCancelOpen(true)}
      />
      {cancelOpen && selected && (
        <CancelGuideModal name={selected.name} onClose={() => setCancelOpen(false)} />
      )}
      {addBankOpen && <AddBankModal onClose={() => setAddBankOpen(false)} />}
    </div>
  );
};

export default AutopayPage;
