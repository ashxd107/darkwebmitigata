import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CreditCard, TrendingUp, ChevronRight, Filter, Download, Lock,
  AlertTriangle, Calendar, X, Building2, ShieldCheck, Plus, Info
} from "lucide-react";
import { Logo, mandates, Mandate } from "./autopayData";

type View = "payments" | "insights";
type TabKey = "all" | "monthly" | "yearly" | "paused";

const StatCard = ({
  label, value, suffix, meta, accent, badge,
}: {
  label: string; value: string; suffix?: string; meta: React.ReactNode;
  accent?: "primary" | "warn" | "default"; badge?: string;
}) => {
  const valueColor =
    accent === "primary" ? "text-primary" :
    accent === "warn" ? "text-[hsl(38,92%,42%)]" : "text-foreground";
  return (
    <div className="card-surface !p-6 transition-all hover:-translate-y-0.5">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-xs font-medium text-muted-foreground">{label}</span>
        {badge && (
          <span className="text-[10px] font-semibold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-[hsl(38,92%,90%)] text-[hsl(38,92%,30%)]">
            {badge}
          </span>
        )}
      </div>
      <div className={`text-display text-[28px] leading-none mb-2 ${valueColor}`}>
        {value}
        {suffix && <span className="text-sm font-medium text-muted-foreground ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs text-muted-foreground font-medium">{meta}</div>
    </div>
  );
};

const StatusPill = ({ status }: { status: Mandate["status"] }) => {
  if (status === "active") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />Active
      </span>
    );
  }
  if (status === "paused") {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[hsl(38,92%,90%)] text-[hsl(38,92%,30%)]">
        <span className="w-1.5 h-1.5 rounded-full bg-[hsl(38,92%,42%)]" />Paused
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />Cancelled
    </span>
  );
};

const MandateRow = ({ m, locked, onClick }: { m: Mandate; locked?: boolean; onClick?: () => void }) => (
  <button
    onClick={locked ? undefined : onClick}
    className={`w-full grid grid-cols-[1.6fr_1fr_1fr_auto_28px] gap-4 items-center px-5 py-4 text-left transition-colors border-b border-border/30 last:border-0 ${
      locked ? "cursor-default" : "hover:bg-primary/[0.04]"
    }`}
  >
    <div className={`flex items-center gap-3.5 ${locked ? "blur-[5px] select-none" : ""}`}>
      <Logo k={m.logo} />
      <div className="min-w-0">
        <div className="text-sm font-semibold text-foreground truncate">{m.name}</div>
        <div className="text-xs text-muted-foreground mt-0.5">{m.cycle} · {m.cat}</div>
      </div>
    </div>
    <div className={`text-sm text-foreground ${locked ? "blur-[5px] select-none" : ""}`}>
      {m.dateFull}
    </div>
    <div className={`flex items-center gap-2 ${locked ? "blur-[5px] select-none" : ""}`}>
      {m.status === "active" ? (
        <>
          <span className="text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded bg-foreground/5 text-muted-foreground">UPI</span>
          <span className="text-xs text-muted-foreground">{m.bank} ••{m.bankMask}</span>
        </>
      ) : <StatusPill status={m.status} />}
    </div>
    <div className={`text-sm font-bold tabular-nums text-right ${locked ? "blur-[5px] select-none" : ""}`}>
      ₹{m.amount.toLocaleString("en-IN")}
    </div>
    <ChevronRight className={`h-4 w-4 ${locked ? "text-muted-foreground/40" : "text-muted-foreground"}`} />
  </button>
);

const Tab = ({ active, onClick, children, count }: {
  active: boolean; onClick: () => void; children: React.ReactNode; count?: number;
}) => (
  <button
    onClick={onClick}
    className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition-all inline-flex items-center gap-1.5 ${
      active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
    }`}
  >
    {children}
    {count !== undefined && (
      <span className={`text-[11px] ${active ? "text-muted-foreground" : "text-muted-foreground/60"}`}>· {count}</span>
    )}
  </button>
);

const PaymentsView = ({ isPremium, onUpgrade, onSelect }: {
  isPremium: boolean; onUpgrade: () => void; onSelect: (m: Mandate) => void;
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
  const hidden = isPremium ? [] : list.slice(1);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Monthly total" value="₹3,553" meta={<><span className="text-primary font-semibold">+₹179</span> vs last month</>} />
        <StatCard label="Upcoming 7 days" value="₹1,198" meta="4 payments · Adobe debits tomorrow" />
        <StatCard label="Price changes" value="+₹70" accent="warn" badge="2" meta="Netflix +₹50, Spotify +₹20" />
      </div>

      {/* Table card */}
      <div className="bg-card rounded-[20px] border border-border/40 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 gap-3 flex-wrap">
          <div className="inline-flex bg-secondary/60 rounded-full p-1 gap-1">
            <Tab active={tab === "all"} onClick={() => setTab("all")} count={counts.all}>All</Tab>
            <Tab active={tab === "monthly"} onClick={() => setTab("monthly")} count={counts.monthly}>Monthly</Tab>
            <Tab active={tab === "yearly"} onClick={() => setTab("yearly")} count={counts.yearly}>Yearly</Tab>
            <Tab active={tab === "paused"} onClick={() => setTab("paused")} count={counts.paused}>Paused</Tab>
          </div>
          <div className="flex gap-2">
            <button className="h-9 px-4 rounded-full border border-border/60 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-secondary/60 transition">
              <Filter className="h-3.5 w-3.5 text-muted-foreground" />Filter
            </button>
            <button className="h-9 px-4 rounded-full border border-border/60 text-xs font-semibold inline-flex items-center gap-1.5 hover:bg-secondary/60 transition">
              <Download className="h-3.5 w-3.5 text-muted-foreground" />Export
            </button>
          </div>
        </div>

        {/* Header */}
        <div className="grid grid-cols-[1.6fr_1fr_1fr_auto_28px] gap-4 px-5 py-3 bg-secondary/40 border-y border-border/40 text-[11px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
          <div>Subscription</div>
          <div>Next debit</div>
          <div>Status</div>
          <div className="text-right">Amount</div>
          <div></div>
        </div>

        <div className="relative">
          <div>
            {visible.map(m => <MandateRow key={m.id} m={m} onClick={() => onSelect(m)} />)}
            {hidden.map(m => <MandateRow key={m.id} m={m} locked />)}
          </div>

          {!isPremium && hidden.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="bg-card/95 backdrop-blur-sm px-8 py-7 rounded-[20px] text-center max-w-[440px] pointer-events-auto border border-border/40 shadow-lg">
                <div className="w-14 h-14 rounded-2xl bg-primary grid place-items-center mx-auto mb-4 text-primary-foreground">
                  <Lock className="h-6 w-6" strokeWidth={2.2} />
                </div>
                <div className="text-display text-xl mb-2">See all {list.length} mandates</div>
                <div className="text-body text-sm mb-5">
                  Go Premium to see every autopay across banks, get price-change alerts, and access cancellation guides for every UPI app.
                </div>
                <button
                  onClick={onUpgrade}
                  className="h-11 px-6 rounded-full bg-primary text-primary-foreground font-semibold text-sm inline-flex items-center gap-2 hover:bg-primary/90 transition"
                >
                  Upgrade to Premium
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InsightRow = ({ m, inactive }: { m: Mandate; inactive?: boolean }) => (
  <div className={`flex items-center gap-4 px-5 py-4 border-b border-border/30 last:border-0 ${inactive ? "opacity-70" : ""}`}>
    <Logo k={m.logo} />
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-2">
        <div className="text-sm font-semibold text-foreground">{m.name}</div>
        {m.status === "paused" && <StatusPill status="paused" />}
        {m.status === "cancelled" && <StatusPill status="cancelled" />}
      </div>
      <div className="text-xs text-muted-foreground mt-0.5">
        {m.cat} · since {m.setupOn} · ₹{m.amount}/{m.cycle === "Yearly" ? "yr" : "mo"}
      </div>
    </div>
    <div className="text-right">
      <div className={`text-sm font-bold tabular-nums ${inactive ? "text-muted-foreground" : "text-foreground"}`}>
        {m.totalLabel.split(" over ")[0]}
      </div>
      <div className="text-xs text-muted-foreground">{m.months} months</div>
    </div>
  </div>
);

const InsightsView = () => {
  const active = mandates.filter(m => m.status === "active");
  const inactive = mandates.filter(m => m.status !== "active");
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard label="Lifetime spent" value="₹47,231" meta="Across 9 services since Sep 2023" />
        <StatCard label="Yearly commitments" value="₹4,788" suffix="/yr" meta="Disney+ renews Aug 2026" />
        <StatCard label="Saved by cancelling" value="₹3,096" accent="primary" meta="YouTube + Audible" />
      </div>

      <div className="bg-card rounded-[20px] border border-border/40 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-display text-sm">Active mandates</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold">{active.length}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1 ml-4">Currently debiting your bank</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total lifetime</div>
            <div className="text-display text-base">₹44,135</div>
          </div>
        </div>
        <div className="border-t border-border/40">
          {active.map(m => <InsightRow key={m.id} m={m} />)}
        </div>
      </div>

      <div className="bg-card rounded-[20px] border border-border/40 shadow-sm overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-muted-foreground/50" />
              <span className="text-display text-sm">Inactive mandates</span>
              <span className="text-[11px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground font-semibold">{inactive.length}</span>
            </div>
            <div className="text-xs text-muted-foreground mt-1 ml-4">Paused or cancelled · No longer debiting</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Total lifetime</div>
            <div className="text-display text-base">₹3,096</div>
          </div>
        </div>
        <div className="border-t border-border/40">
          {inactive.map(m => <InsightRow key={m.id} m={m} inactive />)}
        </div>
      </div>
    </div>
  );
};

const MandateDrawer = ({ m, onClose }: { m: Mandate | null; onClose: () => void }) => (
  <AnimatePresence>
    {m && (
      <>
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-foreground/30 backdrop-blur-sm z-50"
        />
        <motion.aside
          initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
          transition={{ type: "spring", damping: 30, stiffness: 280 }}
          className="fixed right-0 top-0 bottom-0 w-full sm:w-[440px] bg-card z-50 shadow-2xl flex flex-col"
        >
          <div className="flex items-center gap-3 p-5 border-b border-border/40">
            <Logo k={m.logo} />
            <div className="flex-1 min-w-0">
              <div className="text-display text-base truncate">{m.name}</div>
              <div className="flex items-center gap-2 mt-1">
                <StatusPill status={m.status} />
                <span className="text-xs text-muted-foreground">{m.cycle}</span>
              </div>
            </div>
            <button onClick={onClose} className="h-9 w-9 rounded-full hover:bg-secondary grid place-items-center">
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-6">
            <div className="rounded-2xl bg-primary/5 border border-primary/15 p-4">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Next debit</div>
              <div className="text-display text-3xl mt-1">₹{m.amount.toLocaleString("en-IN")}</div>
              <div className="text-xs text-muted-foreground mt-1">
                on <span className="text-foreground font-semibold">{m.dateFull}</span> · from <span className="text-foreground font-semibold">{m.bank} UPI ••{m.bankMask}</span>
              </div>
            </div>

            <div>
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-3">Details</div>
              <div className="space-y-3 text-sm">
                {[
                  ["UPI handle", m.handle],
                  ["Mandate ID", m.mid],
                  ["Set up on", m.setupOn],
                  ["Total paid", m.totalLabel],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-4 py-2 border-b border-border/30 last:border-0">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="text-foreground font-medium text-right">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="p-5 border-t border-border/40">
            <button className="w-full h-12 rounded-full bg-foreground text-background font-semibold text-sm inline-flex items-center justify-center gap-2 hover:opacity-90 transition">
              <AlertTriangle className="h-4 w-4" />
              How to cancel mandate
            </button>
          </div>
        </motion.aside>
      </>
    )}
  </AnimatePresence>
);

const ConnectedBank = () => (
  <div className="card-surface !p-5">
    <div className="flex items-center justify-between mb-4">
      <div>
        <div className="text-display text-sm">Connected banks</div>
        <div className="text-xs text-muted-foreground mt-0.5">2 banks · 8 mandates total</div>
      </div>
      <button className="h-9 px-4 rounded-full bg-primary text-primary-foreground text-xs font-semibold inline-flex items-center gap-1.5">
        <Plus className="h-3.5 w-3.5" strokeWidth={2.5} />Add bank
      </button>
    </div>
    <div className="space-y-2">
      {[
        { code: "H", name: "HDFC Bank", meta: "UPI ••8829 · connected Mar 12", count: 6 },
        { code: "S", name: "State Bank of India", meta: "UPI ••4821 · connected Aug 4", count: 2 },
      ].map(b => (
        <div key={b.code} className="flex items-center gap-3 p-3 rounded-2xl border border-border/40 hover:bg-secondary/40 transition">
          <div className="w-10 h-10 rounded-full bg-[hsl(220,60%,30%)] text-white grid place-items-center font-bold">{b.code}</div>
          <div className="flex-1 min-w-0">
            <div className="text-sm font-semibold">{b.name}</div>
            <div className="text-xs text-muted-foreground">{b.meta}</div>
          </div>
          <div className="text-right">
            <div className="text-display text-base">{b.count}</div>
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">mandates</div>
          </div>
        </div>
      ))}
    </div>
    <div className="flex items-center gap-2 mt-4 px-3 py-2.5 rounded-xl bg-secondary/40 text-xs text-muted-foreground">
      <Info className="h-3.5 w-3.5" />
      <span>Consent renews every <strong className="text-foreground">12 months</strong> via Account Aggregator.</span>
    </div>
  </div>
);

const AutopayDashboard = ({ isUnlocked, onUnlock }: { isUnlocked: boolean; onUnlock: () => void }) => {
  const [view, setView] = useState<View>("payments");
  const [selected, setSelected] = useState<Mandate | null>(null);

  return (
    <div className="py-4 lg:py-8 space-y-6">
      {/* Header */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div>
          <div className="text-xs text-muted-foreground font-medium mb-1.5">Good morning, Rahul</div>
          <h1 className="text-display text-[28px] lg:text-[32px] leading-tight">Autopay Tracker</h1>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-2 rounded-full bg-card border border-border/40">
            <div className="w-7 h-7 rounded-full bg-[hsl(220,60%,30%)] text-white grid place-items-center text-[11px] font-bold">H</div>
            <div className="text-xs">
              <div className="font-semibold leading-tight">HDFC Bank</div>
              <div className="text-muted-foreground leading-tight">UPI ••8829</div>
            </div>
            <span className="w-1.5 h-1.5 rounded-full bg-primary ring-2 ring-primary/20 ml-1" />
          </div>
          <div className="inline-flex bg-secondary/60 rounded-full p-1">
            <button
              onClick={() => isUnlocked || onUnlock()}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                !isUnlocked ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              Free
            </button>
            <button
              onClick={onUnlock}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition ${
                isUnlocked ? "bg-foreground text-background" : "text-muted-foreground"
              }`}
            >
              Premium
            </button>
          </div>
        </div>
      </div>

      {/* Sub-tabs Payments / Insights */}
      <div className="inline-flex bg-card border border-border/40 rounded-full p-1 shadow-sm">
        <button
          onClick={() => setView("payments")}
          className={`px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition ${
            view === "payments" ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <CreditCard className={`h-4 w-4 ${view === "payments" ? "text-primary" : ""}`} />
          Recurring Payments
        </button>
        <button
          onClick={() => setView("insights")}
          className={`px-5 py-2 rounded-full text-sm font-semibold inline-flex items-center gap-2 transition ${
            view === "insights" ? "bg-primary/10 text-foreground" : "text-muted-foreground hover:text-foreground"
          }`}
        >
          <TrendingUp className={`h-4 w-4 ${view === "insights" ? "text-primary" : ""}`} />
          Spending Insights
        </button>
      </div>

      {view === "payments" ? (
        <PaymentsView isPremium={isUnlocked} onUpgrade={onUnlock} onSelect={setSelected} />
      ) : (
        <div className="space-y-6">
          <InsightsView />
          <ConnectedBank />
        </div>
      )}

      <MandateDrawer m={selected} onClose={() => setSelected(null)} />
    </div>
  );
};

export default AutopayDashboard;
