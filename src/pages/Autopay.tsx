import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Menu, TrendingUp, Search, Bell, Filter, Download, Lock, ChevronRight,
  ArrowUpRight, User, ShieldCheck, Plus, Info, LogOut, Star
} from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";
import { Logo, mandates, Mandate } from "@/components/dashboard/autopay/autopayData";
import { MandateDrawer } from "@/components/dashboard/autopay/MandateDrawer";
import { CancelGuideModal } from "@/components/dashboard/autopay/CancelGuideModal";
import { AddBankModal } from "@/components/dashboard/autopay/AddBankModal";

type View = "payments" | "vendor" | "profile";
type TabKey = "all" | "monthly" | "yearly" | "paused";

/* ------------------------ shared bits ------------------------ */

const StatusPill = ({ status }: { status: Mandate["status"] }) => {
  if (status === "active") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6FBF2] text-[#024E2E]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#04DB7F]" />Active
    </span>
  );
  if (status === "paused") return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF4D6] text-[#C18A06]">
      <span className="w-1.5 h-1.5 rounded-full bg-[#C18A06]" />Paused
    </span>
  );
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-medium uppercase tracking-wider bg-[#FFE9EA] text-[#D14043]">
      Cancelled
    </span>
  );
};

/* ------------------------ Sidebar ------------------------ */

const Sidebar = ({
  view, setView, isPremium, setIsPremium,
}: { view: View; setView: (v: View) => void; isPremium: boolean; setIsPremium: (b: boolean) => void }) => {
  void isPremium; void setIsPremium;
  const items: { key: View; label: string; icon: JSX.Element }[] = [
    { key: "payments", label: "Recurring Payments",
      icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px]"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
    { key: "vendor", label: "Spending Insights",
      icon: <TrendingUp className="w-[18px] h-[18px]" strokeWidth={2} /> },
  ];
  return (
    <aside className="hidden lg:flex bg-white px-[18px] py-[22px] flex-col gap-7 sticky top-0 h-screen w-[264px] border-r border-[#E5E7EB]/40">
      <div className="px-2.5 pt-1.5 pb-1">
        <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
      </div>

      <div>
        <div className="text-[11px] text-[#9CA3AF] tracking-[0.14em] font-medium px-3 mb-1.5">MAIN</div>
        <nav className="flex flex-col gap-0.5">
          {items.map((it) => {
            const active = view === it.key;
            return (
              <button
                key={it.key}
                onClick={() => setView(it.key)}
                className={`flex items-center gap-3 px-3.5 py-3 rounded-[12px] font-medium text-sm w-full text-left transition ${
                  active ? "bg-[#E6FBF2] text-[#024E2E] font-semibold [&_svg]:text-[#03B36A]" : "text-[#4B5563] hover:bg-[#F3F4F6] hover:text-[#0B1220]"
                }`}
              >
                {it.icon}
                {it.label}
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto flex flex-col gap-2.5">
        <div className="border border-[#E5E7EB] rounded-[14px] px-3.5 py-3 bg-white">
          <div className="text-[10px] text-[#9CA3AF] tracking-[0.16em] font-semibold mb-2">CONNECTED</div>
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#1E3A8A] text-white grid place-items-center font-semibold text-[13px]">H</div>
            <div className="min-w-0">
              <div className="text-[13px] font-semibold leading-tight">HDFC Bank</div>
              <div className="text-[11px] text-[#6B7280] leading-tight">UPI ••8829</div>
            </div>
            <span className="ml-auto w-2 h-2 rounded-full bg-[#04DB7F] ring-[3px] ring-[#E6FBF2]" />
          </div>
        </div>
        <button
          onClick={() => setView("profile")}
          className={`flex items-center gap-2.5 px-3.5 py-3 rounded-[14px] w-full text-left border border-transparent transition ${
            view === "profile" ? "bg-[#E6FBF2]" : "hover:bg-[#F3F4F6]"
          }`}
        >
          <div className="w-8 h-8 rounded-full bg-[#E5E7EB] text-[#1F2937] grid place-items-center font-bold text-[13px] shrink-0">R</div>
          <div className="min-w-0">
            <div className={`text-[13px] font-semibold leading-tight ${view === "profile" ? "text-[#024E2E]" : ""}`}>Rahul Kumar</div>
            <div className="text-[11px] text-[#6B7280] leading-tight">Free plan</div>
          </div>
          <ChevronRight className="ml-auto w-4 h-4 text-[#9CA3AF]" />
        </button>
      </div>
    </aside>
  );
};

/* ------------------------ Topbar ------------------------ */

const Topbar = ({
  view, isPremium, setIsPremium, onMobileMenu,
}: { view: View; isPremium: boolean; setIsPremium: (b: boolean) => void; onMobileMenu: () => void }) => {
  const titles: Record<View, string> = { payments: "Recurring Payments", vendor: "Spending Insights", profile: "Profile" };
  return (
    <div className="flex items-end justify-between gap-6 mb-7 flex-wrap">
      <div className="flex items-center gap-3">
        <button onClick={onMobileMenu} className="lg:hidden w-10 h-10 rounded-xl bg-[#F3F4F6] grid place-items-center">
          <Menu className="w-5 h-5" />
        </button>
        <div>
          <div className="text-[13px] text-[#6B7280] font-medium mb-1 lg:mb-1">Good morning, Rahul</div>
          <h1 className="text-[24px] lg:text-[30px] font-bold tracking-[-0.03em] leading-[1.1] text-[#0B1220]">{titles[view]}</h1>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative w-[320px] hidden lg:block">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
          <input
            placeholder="Search..."
            className="w-full h-[42px] rounded-full border border-[#E5E7EB] bg-white px-[40px] text-sm text-[#1F2937] placeholder:text-[#9CA3AF] focus:outline-none focus:border-[#04DB7F] focus:ring-4 focus:ring-[#E6FBF2] transition"
          />
          <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[11px] font-bold font-mono text-[#6B7280] bg-[#F3F4F6] border border-[#E5E7EB] px-1.5 py-0.5 rounded-md">⌘K</span>
        </div>
        <button className="w-[42px] h-[42px] rounded-full bg-white border border-[#E5E7EB] grid place-items-center text-[#4B5563] hover:text-[#0B1220] hover:border-[#D1D5DB] transition relative">
          <Bell className="w-[18px] h-[18px]" />
          <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#04DB7F] border-2 border-white" />
        </button>
        <div className="hidden md:inline-flex bg-[#F3F4F6] rounded-full p-1 gap-0.5">
          <button onClick={() => setIsPremium(false)} className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition ${!isPremium ? "bg-[#0B1220] text-white" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Free</button>
          <button onClick={() => setIsPremium(true)} className={`px-[18px] py-2 rounded-full text-[13px] font-semibold transition ${isPremium ? "bg-[#0B1220] text-white" : "text-[#6B7280] hover:text-[#1F2937]"}`}>Premium</button>
        </div>
      </div>
    </div>
  );
};

/* ------------------------ Stats ------------------------ */

const StatCard = ({
  label, value, suffix, meta, accent, badge,
}: { label: string; value: string; suffix?: string; meta: React.ReactNode; accent?: "warn" | "savings"; badge?: string }) => {
  const valueColor = accent === "warn" ? "text-[#C18A06]" : accent === "savings" ? "text-[#03B36A]" : "text-[#0B1220]";
  return (
    <div className="bg-white rounded-[18px] px-6 py-[22px] border border-[#E5E7EB]/70 shadow-[0_1px_2px_rgba(16,24,40,.04)] hover:-translate-y-0.5 hover:shadow-[0_4px_16px_-6px_rgba(16,24,40,.08)] transition">
      <div className="text-xs text-[#6B7280] font-medium mb-3.5 inline-flex items-center gap-2">
        {label}
        {badge && <span className="bg-[#FFF4D6] text-[#C18A06] text-[10px] font-semibold px-1.5 py-0.5 rounded-full tracking-wider">{badge}</span>}
      </div>
      <div className={`text-[28px] font-bold tracking-[-0.03em] leading-none mb-2 tabular-nums ${valueColor}`}>
        {value}
        {suffix && <span className="text-sm font-medium text-[#6B7280] ml-0.5">{suffix}</span>}
      </div>
      <div className="text-xs text-[#6B7280] font-medium">{meta}</div>
    </div>
  );
};

/* ------------------------ Payments View ------------------------ */

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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-[18px] mb-6">
        <StatCard label="Monthly total" value="₹3,553" meta={<><span className="text-[#03B36A] font-semibold">+₹179</span> vs last month</>} />
        <StatCard label="Upcoming 7 days" value="₹1,198" meta="4 payments · Adobe debits tomorrow" />
        <StatCard label="Price changes" value="+₹70" accent="warn" badge="2" meta="Netflix +₹50, Spotify +₹20" />
      </div>

      <div className="bg-white rounded-[18px] border border-[#E5E7EB]/70 shadow-[0_1px_2px_rgba(16,24,40,.04)] overflow-hidden">
        {/* toolbar */}
        <div className="flex items-center justify-between gap-3 flex-wrap px-5 py-4">
          <div className="inline-flex bg-[#F3F4F6] rounded-full p-1 gap-0.5 overflow-x-auto scrollbar-none max-w-full">
            {(["all","monthly","yearly","paused"] as TabKey[]).map((k) => (
              <button
                key={k}
                onClick={() => setTab(k)}
                className={`px-4 py-1.5 rounded-full text-[13px] font-medium transition inline-flex items-center gap-1.5 whitespace-nowrap ${
                  tab === k ? "bg-white text-[#0B1220] shadow-sm font-semibold" : "text-[#6B7280]"
                }`}
              >
                {k.charAt(0).toUpperCase() + k.slice(1)}
                <span className={`text-[11px] ${tab === k ? "text-[#4B5563]" : "text-[#9CA3AF]"}`}>· {counts[k]}</span>
              </button>
            ))}
          </div>
          <div className="hidden md:flex gap-2">
            <button className="h-9 px-4 rounded-full border border-[#E5E7EB] text-[#1F2937] text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-[#F3F4F6] transition">
              <Filter className="w-3.5 h-3.5 text-[#4B5563]" />Filter
            </button>
            <button className="h-9 px-4 rounded-full border border-[#E5E7EB] text-[#1F2937] text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-[#F3F4F6] transition">
              <Download className="w-3.5 h-3.5 text-[#4B5563]" />Export
            </button>
          </div>
        </div>

        {/* desktop table */}
        <div className="hidden md:block relative">
          <div className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 px-6 py-3.5 bg-[#FAFBFC] border-y border-[#E5E7EB] text-[11px] tracking-[0.12em] font-semibold text-[#9CA3AF] uppercase">
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
                className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 items-center px-6 py-4 border-b border-[#F3F4F6] last:border-0 cursor-pointer hover:bg-[#F2FDF8] group transition"
              >
                <div className="flex items-center gap-3.5">
                  <Logo k={m.logo} />
                  <div>
                    <div className="font-bold text-sm text-[#0B1220]">{m.name}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{m.cat}</div>
                  </div>
                </div>
                <div className="text-sm text-[#1F2937]">{m.dateFull}</div>
                <div className="flex items-center gap-2">
                  {m.status === "active" ? (
                    <>
                      <span className="bg-[#FFF1E0] text-[#C75A00] text-[10px] tracking-[0.06em] font-medium px-1.5 py-0.5 rounded-md">UPI</span>
                      <span className="text-xs text-[#1F2937] font-mono font-semibold">{m.bank} UPI ••{m.bankMask}</span>
                    </>
                  ) : <StatusPill status={m.status} />}
                </div>
                <div className="text-sm font-bold text-right tabular-nums text-[#0B1220]">₹{m.amount.toLocaleString("en-IN")}</div>
                <div className="w-8 h-8 rounded-full grid place-items-center text-[#9CA3AF] group-hover:text-[#03B36A] group-hover:translate-x-0.5 transition-all">
                  <ChevronRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </div>
              </div>
            ))}
            {locked.map((m) => (
              <div key={m.id} className="grid grid-cols-[2fr_1fr_1.2fr_auto_36px] gap-4 items-center px-6 py-4 border-b border-[#F3F4F6] last:border-0">
                <div className="flex items-center gap-3.5 blur-[5px] select-none pointer-events-none">
                  <Logo k={m.logo} />
                  <div>
                    <div className="font-bold text-sm">{m.name}</div>
                    <div className="text-xs text-[#6B7280] mt-0.5">{m.cat}</div>
                  </div>
                </div>
                <div className="text-sm blur-[5px] select-none">{m.dateFull}</div>
                <div className="flex items-center gap-2 blur-[5px] select-none">
                  <span className="bg-[#FFF1E0] text-[#C75A00] text-[10px] px-1.5 py-0.5 rounded-md">UPI</span>
                  <span className="text-xs font-mono">{m.bank} UPI ••{m.bankMask}</span>
                </div>
                <div className="text-sm font-bold text-right blur-[5px] select-none">₹{m.amount}</div>
                <div className="w-8 h-8 grid place-items-center text-[#9CA3AF]"><ChevronRight className="w-3.5 h-3.5" /></div>
              </div>
            ))}
          </div>

          {!isPremium && locked.length > 0 && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none pt-12">
              <div className="bg-white/95 backdrop-blur-sm px-9 py-8 rounded-[20px] text-center max-w-[460px] pointer-events-auto shadow-[0_24px_60px_-20px_rgba(16,24,40,.18)]">
                <div className="w-16 h-16 rounded-[18px] bg-[#04DB7F] grid place-items-center mx-auto mb-5 text-white">
                  <Lock className="w-7 h-7" strokeWidth={2.2} />
                </div>
                <div className="text-[22px] font-bold tracking-[-0.025em] mb-2.5 text-[#0B1220]">See all {list.length} mandates</div>
                <div className="text-sm text-[#4B5563] mb-5 leading-relaxed font-medium">
                  Go Premium to see every autopay across banks, get price-change alerts, and access cancellation guides for every UPI app.
                </div>
                <button onClick={onUpgrade} className="h-[46px] px-[26px] rounded-full bg-[#04DB7F] hover:bg-[#03B36A] text-white font-semibold text-sm inline-flex items-center gap-2 transition">
                  Upgrade to Premium <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* mobile cards */}
        <div className="md:hidden relative">
          {visible.map((m) => (
            <button key={m.id} onClick={() => onSelect(m)} className="w-full px-4 py-3.5 grid grid-cols-[1fr_auto] gap-x-3 gap-y-1.5 items-center text-left border-b border-[#E5E7EB] last:border-0">
              <div className="col-span-2 flex items-center gap-3">
                <Logo k={m.logo} />
                <div className="flex-1 min-w-0">
                  <div className="font-bold text-sm text-[#0B1220] truncate">{m.name}</div>
                  <div className="text-xs text-[#6B7280] mt-0.5">{m.cycle} · {m.dateFull}</div>
                </div>
                <div className="text-sm font-bold tabular-nums text-[#0B1220]">₹{m.amount}</div>
              </div>
            </button>
          ))}
          {locked.length > 0 && (
            <div className="p-6 text-center">
              <div className="w-14 h-14 rounded-2xl bg-[#04DB7F] grid place-items-center mx-auto mb-3 text-white">
                <Lock className="w-6 h-6" strokeWidth={2.2} />
              </div>
              <div className="text-[18px] font-bold tracking-[-0.025em] mb-2 text-[#0B1220]">See all {list.length} mandates</div>
              <div className="text-[13px] text-[#4B5563] mb-4 font-medium">Upgrade to Premium for full access.</div>
              <button onClick={onUpgrade} className="h-11 px-6 rounded-full bg-[#04DB7F] text-white font-semibold text-sm inline-flex items-center gap-2">
                Upgrade <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

/* ------------------------ Insights View ------------------------ */

const InsightRow = ({ m, inactive }: { m: Mandate; inactive?: boolean }) => (
  <div className={`grid grid-cols-[auto_1fr_auto] items-center gap-4 px-3 py-3.5 rounded-xl hover:bg-[#F3F4F6] transition ${inactive ? "" : ""}`}>
    <div className={inactive ? "opacity-70 grayscale-[0.4]" : ""}>
      <Logo k={m.logo} />
    </div>
    <div className="min-w-0">
      <div className={`text-sm font-bold tracking-[-0.005em] mb-1 flex items-center gap-2 ${inactive ? "opacity-70" : "text-[#0B1220]"}`}>
        {m.name}
        {m.status === "paused" && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFF4D6] text-[#C18A06]">Paused</span>}
        {m.status === "cancelled" && <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full uppercase tracking-wider bg-[#FFE9EA] text-[#D14043]">Cancelled</span>}
      </div>
      <div className="text-xs text-[#6B7280] font-medium truncate">
        {m.cat} · {m.status === "active" ? `since ${m.setupOn.split(",")[0]}` : `paused ${m.setupOn.split(",")[0]}`} · {m.status === "cancelled" ? "was " : ""}₹{m.amount}/{m.cycle === "Yearly" ? "yr" : "mo"}
      </div>
    </div>
    <div className="text-right min-w-[90px]">
      <div className={`text-base font-bold tracking-[-0.025em] leading-none mb-1 tabular-nums ${inactive ? "text-[#4B5563]" : "text-[#0B1220]"}`}>
        {m.totalLabel.split(" over ")[0]}
      </div>
      <div className="text-[11px] text-[#6B7280] font-semibold">{m.months} months</div>
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

      {/* Active panel */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB]/70 shadow-[0_1px_2px_rgba(16,24,40,.04)] p-6">
        <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
          <div>
            <div className="text-base font-semibold tracking-[-0.015em] flex items-center gap-2.5 text-[#0B1220]">
              <span className="w-2 h-2 rounded-full bg-[#04DB7F] ring-4 ring-[#E6FBF2]" />
              Active mandates
              <span className="bg-[#F2FDF8] text-[#03B36A] text-[11px] font-medium px-2 py-0.5 rounded-full">{active.length}</span>
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-1">Currently debiting your bank</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Total lifetime</span>
            <span className="text-xl font-bold tracking-[-0.025em] text-[#0B1220] tabular-nums">₹44,135</span>
          </div>
        </div>
        <div>{active.map(m => <InsightRow key={m.id} m={m} />)}</div>
      </div>

      {/* Inactive panel */}
      <div className="bg-white rounded-[18px] border border-[#E5E7EB]/70 shadow-[0_1px_2px_rgba(16,24,40,.04)] p-6">
        <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
          <div>
            <div className="text-base font-semibold tracking-[-0.015em] flex items-center gap-2.5 text-[#0B1220]">
              <span className="w-2 h-2 rounded-full bg-[#9CA3AF] ring-4 ring-[#F3F4F6]" />
              Inactive mandates
              <span className="bg-[#F3F4F6] text-[#4B5563] text-[11px] font-medium px-2 py-0.5 rounded-full">{inactive.length}</span>
            </div>
            <div className="text-xs text-[#6B7280] font-medium mt-1">Paused or cancelled · No longer debiting your bank</div>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[11px] text-[#6B7280] font-medium uppercase tracking-wider">Total lifetime</span>
            <span className="text-xl font-bold tracking-[-0.025em] text-[#0B1220] tabular-nums">₹3,096</span>
          </div>
        </div>
        <div>{inactive.map(m => <InsightRow key={m.id} m={m} inactive />)}</div>
      </div>
    </div>
  );
};

/* ------------------------ Profile View ------------------------ */

const ProfileView = ({ onAddBank }: { onAddBank: () => void }) => (
  <div className="space-y-[18px]">
    <div className="bg-white border border-[#E5E7EB]/70 rounded-[18px] shadow-[0_1px_2px_rgba(16,24,40,.04)] px-7 py-6 flex items-center gap-[22px] flex-wrap">
      <div className="w-16 h-16 rounded-full bg-[#E5E7EB] text-[#1F2937] grid place-items-center font-bold text-[22px]">R</div>
      <div className="flex-1 min-w-0">
        <div className="text-[22px] font-bold tracking-[-0.025em] text-[#0B1220]">Rahul Kumar</div>
        <div className="text-[13px] text-[#6B7280] font-medium mt-1">rahul.k@icloud.com · +91 73382 70444</div>
        <div className="flex gap-2 mt-2.5 flex-wrap">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#F3F4F6] text-[#4B5563]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#6B7280]" />Free plan
          </span>
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6FBF2] text-[#024E2E]">
            <ShieldCheck className="w-3 h-3" strokeWidth={2.5} />Verified
          </span>
        </div>
      </div>
      <button className="ml-auto h-11 px-5 rounded-full bg-[#0B1220] hover:bg-[#1F2937] text-white font-semibold text-sm inline-flex items-center gap-2 transition">
        <Star className="w-3.5 h-3.5" />Upgrade to Pro
      </button>
    </div>

    <div className="bg-white border border-[#E5E7EB]/70 rounded-[18px] shadow-[0_1px_2px_rgba(16,24,40,.04)] px-7 py-6">
      <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
        <div>
          <div className="text-base font-semibold tracking-[-0.015em] text-[#0B1220]">Connected banks</div>
          <div className="text-xs text-[#6B7280] font-medium mt-1">2 banks · 8 mandates total</div>
        </div>
        <button onClick={onAddBank} className="h-[38px] px-4 rounded-full border border-[#E5E7EB] text-[#1F2937] text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-[#F3F4F6] transition">
          <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />Add bank
        </button>
      </div>

      {[
        { code: "H", name: "HDFC Bank", meta: "UPI ••8829 · connected Mar 12", count: 6 },
        { code: "S", name: "State Bank of India", meta: "UPI ••4821 · connected Aug 4", count: 2 },
      ].map((b, i) => (
        <div key={b.code} className={`flex items-center gap-3.5 py-4 ${i === 0 ? "border-t border-[#E5E7EB]" : "border-t border-[#F3F4F6]"}`}>
          <div className="w-10 h-10 rounded-full bg-[#1E3A8A] text-white grid place-items-center font-semibold text-[15px]">{b.code}</div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-[#0B1220]">{b.name}</div>
            <div className="text-xs text-[#6B7280] font-medium">{b.meta}</div>
          </div>
          <div className="ml-auto text-right">
            <div className="font-bold text-[19px] leading-none text-[#0B1220]">{b.count}</div>
            <div className="text-[11px] text-[#6B7280] mt-1 font-medium">mandates</div>
          </div>
        </div>
      ))}

      <div className="mt-4 bg-[#F3F4F6] rounded-xl px-4 py-3.5 text-xs text-[#4B5563] flex gap-2.5 items-start font-medium leading-relaxed">
        <Info className="w-3.5 h-3.5 text-[#6B7280] shrink-0 mt-0.5" />
        <span>Consent renews every <strong className="text-[#0B1220] font-semibold">12 months</strong> via Account Aggregator.</span>
      </div>
    </div>

    <button className="inline-flex items-center justify-center gap-2.5 h-[52px] px-6 rounded-[14px] bg-white border border-[#E5E7EB] text-[#D14043] font-semibold text-sm hover:bg-[#FFF5F5] hover:border-[#FFD8DA] transition w-full md:w-auto">
      <LogOut className="w-4 h-4" />
      Log out
    </button>
  </div>
);

/* ------------------------ Mobile drawer sidebar ------------------------ */

const MobileSidebar = ({ open, onClose, view, setView }: {
  open: boolean; onClose: () => void; view: View; setView: (v: View) => void;
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] lg:hidden">
      <div onClick={onClose} className="absolute inset-0 bg-[#0B1220]/40 backdrop-blur-sm" />
      <aside className="absolute left-0 top-0 bottom-0 w-[280px] bg-white px-4 py-5 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F3F4F6] grid place-items-center"><User className="w-4 h-4" /></button>
        </div>
        <nav className="flex flex-col gap-1">
          {[
            { key: "payments" as View, label: "Recurring Payments" },
            { key: "vendor" as View, label: "Spending Insights" },
            { key: "profile" as View, label: "Profile" },
          ].map((it) => (
            <button
              key={it.key}
              onClick={() => { setView(it.key); onClose(); }}
              className={`px-3.5 py-3 rounded-xl text-sm text-left ${view === it.key ? "bg-[#E6FBF2] text-[#024E2E] font-semibold" : "text-[#4B5563] hover:bg-[#F3F4F6]"}`}
            >
              {it.label}
            </button>
          ))}
        </nav>
      </aside>
    </div>
  );
};

/* ------------------------ Mobile bottom nav ------------------------ */

const MobileBottomNav = ({ view, setView }: { view: View; setView: (v: View) => void }) => (
  <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#E5E7EB] py-2 px-3 pb-[calc(8px+env(safe-area-inset-bottom))] z-[55] shadow-[0_-4px_20px_-8px_rgba(16,24,40,.08)]">
    <div className="grid grid-cols-3 gap-1 max-w-[480px] mx-auto">
      {[
        { key: "payments" as View, label: "Payments",
          icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={view === "payments" ? 2.4 : 2} strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[22px]"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg> },
        { key: "vendor" as View, label: "Insights", icon: <TrendingUp className="w-[22px] h-[22px]" strokeWidth={view === "vendor" ? 2.4 : 2} /> },
        { key: "profile" as View, label: "Profile", icon: <User className="w-[22px] h-[22px]" strokeWidth={view === "profile" ? 2.4 : 2} /> },
      ].map((it) => {
        const active = view === it.key;
        return (
          <button
            key={it.key}
            onClick={() => setView(it.key)}
            className={`flex flex-col items-center gap-1 py-2 rounded-xl transition ${active ? "text-[#03B36A]" : "text-[#6B7280]"}`}
          >
            <div className={`w-12 h-8 rounded-full grid place-items-center transition ${active ? "bg-[#F2FDF8]" : ""}`}>{it.icon}</div>
            <span className="text-[11px] font-semibold">{it.label}</span>
          </button>
        );
      })}
    </div>
  </nav>
);

/* ------------------------ Page ------------------------ */

const AutopayPage = () => {
  const navigate = useNavigate();
  const [view, setView] = useState<View>("payments");
  const [isPremium, setIsPremium] = useState(false);
  const [selected, setSelected] = useState<Mandate | null>(null);
  const [cancelOpen, setCancelOpen] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  void navigate;

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-[#0B1220]" style={{ fontFamily: "Poppins, system-ui, sans-serif" }}>
      <div className="grid lg:grid-cols-[264px_1fr] min-h-screen">
        <Sidebar view={view} setView={setView} isPremium={isPremium} setIsPremium={setIsPremium} />

        <main className="px-4 lg:px-8 py-5 lg:py-[22px] pb-[100px] lg:pb-[60px]">
          <Topbar view={view} isPremium={isPremium} setIsPremium={setIsPremium} onMobileMenu={() => setMobileMenu(true)} />

          {view === "payments" && (
            <PaymentsView isPremium={isPremium} onSelect={setSelected} onUpgrade={() => setIsPremium(true)} />
          )}
          {view === "vendor" && <InsightsView />}
          {view === "profile" && <ProfileView onAddBank={() => setAddBankOpen(true)} />}
        </main>
      </div>

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
