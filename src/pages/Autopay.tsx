import { useState } from "react";
import { LogOut, Plus, Info, ShieldCheck, Star } from "lucide-react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import AutopayDashboard from "@/components/dashboard/autopay/AutopayDashboard";
import { AddBankModal } from "@/components/dashboard/autopay/AddBankModal";

/**
 * Standalone /autopay page.
 *
 * Uses the EXACT same shell as the Mitigata (ClearShield) dashboard:
 * - DashboardSidebar (pill nav, semantic tokens, profile row)
 * - MobileHeader
 * - same main wrapper paddings & max-width
 * - AutopayDashboard renders the actual Autopay UI (already on tokens)
 */
const AutopayPage = () => {
  const [activeItem, setActiveItem] = useState("autopay");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [addBankOpen, setAddBankOpen] = useState(false);

  const handleUnlock = () => setIsUnlocked(true);

  const renderProfile = () => (
    <div className="py-4 lg:py-8 space-y-6">
      <div>
        <div className="text-xs text-muted-foreground font-medium mb-1.5">Account</div>
        <h1 className="text-display text-[28px] lg:text-[32px] leading-tight">Profile</h1>
      </div>

      <div className="card-surface flex items-center gap-5 flex-wrap">
        <div className="w-16 h-16 rounded-full bg-secondary text-foreground grid place-items-center font-bold text-[22px]">R</div>
        <div className="flex-1 min-w-0">
          <div className="text-display text-xl">Rahul Kumar</div>
          <div className="text-body text-sm mt-1">rahul.k@icloud.com · +91 73382 70444</div>
          <div className="flex gap-2 mt-2.5 flex-wrap">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-muted text-muted-foreground">
              <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />Free plan
            </span>
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
              <ShieldCheck className="w-3 h-3" strokeWidth={2.5} />Verified
            </span>
          </div>
        </div>
        <button className="ml-auto h-11 px-5 rounded-full bg-foreground text-background font-semibold text-sm inline-flex items-center gap-2 hover:opacity-90 transition">
          <Star className="w-3.5 h-3.5" />Upgrade to Pro
        </button>
      </div>

      <div className="card-surface">
        <div className="flex justify-between items-start mb-5 gap-3 flex-wrap">
          <div>
            <div className="text-display text-base">Connected banks</div>
            <div className="text-body text-xs mt-1">2 banks · 8 mandates total</div>
          </div>
          <button
            onClick={() => setAddBankOpen(true)}
            className="h-9 px-4 rounded-full border border-border/60 text-foreground text-[13px] font-semibold inline-flex items-center gap-2 hover:bg-secondary/60 transition"
          >
            <Plus className="w-3.5 h-3.5" strokeWidth={2.5} />Add bank
          </button>
        </div>

        <div className="divide-y divide-border/40">
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

      <button className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-card border border-border/60 text-destructive font-semibold text-sm hover:bg-destructive/5 transition">
        <LogOut className="w-4 h-4" />
        Log out
      </button>

      {addBankOpen && <AddBankModal onClose={() => setAddBankOpen(false)} />}
    </div>
  );

  const renderContent = () => {
    if (activeItem === "profile") return renderProfile();
    // Default to Autopay dashboard for every other nav item on this page
    return <AutopayDashboard isUnlocked={isUnlocked} onUnlock={handleUnlock} />;
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <DashboardSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onInsuranceClick={() => setActiveItem("insurance")}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        isUnlocked={isUnlocked}
      />

      <main className="pt-16 lg:pt-0 lg:ml-[260px] px-4 sm:px-6 lg:px-8 xl:px-12 py-4 pb-24 max-w-[1200px]">
        {renderContent()}
      </main>
    </div>
  );
};

export default AutopayPage;
