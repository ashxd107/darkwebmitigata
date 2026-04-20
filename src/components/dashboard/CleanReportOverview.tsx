import { motion } from "framer-motion";
import {
  ShieldCheck,
  Check,
  Lock,
  ArrowRight,
  Skull,
  KeyRound,
  IdCard,
  Send,
  Users,
  MapPin,
  FileText,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlowType } from "@/types/flow";

interface CleanReportOverviewProps {
  flowType?: FlowType;
  isUnlocked?: boolean;
  onUnlock?: () => void;
  onNavigate?: (id: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.05, delayChildren: 0.05 } },
};

const basicChecks = [
  {
    title: "Public breach databases",
    description: "Public breach records checked. No match found.",
  },
  {
    title: "Basic credential combo lists",
    description: "Common combo dumps checked. No match found.",
  },
];

type Severity = "Critical" | "High" | "Medium";

const lockedSources: { title: string; description: string; severity: Severity; icon: typeof Skull }[] = [
  { title: "Dark web", description: "Live identity sale listings.", severity: "Critical", icon: Skull },
  { title: "Stealer logs", description: "Saved creds and sessions.", severity: "Critical", icon: KeyRound },
  { title: "Aadhaar & PAN", description: "ID records in leak circles.", severity: "High", icon: IdCard },
  { title: "Telegram leaks", description: "Fast-moving resale drops.", severity: "High", icon: Send },
  { title: "Family-linked", description: "Parent and contact exposure.", severity: "High", icon: Users },
  { title: "Address", description: "Home and delivery records.", severity: "High", icon: MapPin },
  { title: "KYC documents", description: "Identity and financial docs.", severity: "Critical", icon: FileText },
  { title: "Websites & apps", description: "Linked breach sources.", severity: "Medium", icon: Globe },
];

const severityStyles: Record<Severity, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-[hsl(var(--risk-mid))]/10 text-[hsl(var(--risk-mid))] border-[hsl(var(--risk-mid))]/20",
  Medium: "bg-muted text-muted-foreground border-border/40",
};

const CleanReportOverview = ({
  flowType = "free",
  isUnlocked = false,
  onUnlock,
  onNavigate,
}: CleanReportOverviewProps) => {
  const showDeeperScan = flowType === "free" && !isUnlocked;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="py-3 lg:py-5 space-y-5"
    >
      {/* SECTION 1 — FREE RESULT CARD */}
      <motion.div variants={fadeIn} className="card-surface !p-5 lg:!p-6">
        {/* Hero row */}
        <div className="flex items-start gap-4 lg:gap-5">
          <div className="relative shrink-0">
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-lg" />
            <div className="relative h-14 w-14 lg:h-16 lg:w-16 rounded-full bg-primary flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 lg:h-7 lg:w-7 text-primary-foreground" strokeWidth={2} />
            </div>
          </div>

          <div className="flex-1 min-w-0 pt-0.5">
            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-medium tracking-wide">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              Basic scan complete
            </span>
            <h1 className="text-display text-xl lg:text-2xl leading-tight mt-2.5">
              Basic scan is clean.
            </h1>
            <p className="text-body text-sm mt-1.5">
              We checked 2 public sources. No exposure found there.
            </p>
          </div>
        </div>

        {/* Inline results */}
        <div className="mt-5 rounded-[14px] border border-border/40 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/40 bg-secondary/30">
            <h2 className="text-display text-sm">Basic scan · results</h2>
            <p className="text-body text-[11px]">2 layers checked · 0 matches</p>
          </div>
          <div className="divide-y divide-border/30">
            {basicChecks.map((check) => (
              <div key={check.title} className="flex items-center gap-3 px-4 py-3">
                <div className="h-7 w-7 rounded-full bg-primary flex items-center justify-center shrink-0">
                  <Check className="h-3.5 w-3.5 text-primary-foreground" strokeWidth={2.5} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-display text-[13px]">{check.title}</h3>
                  <p className="text-body text-[11px] mt-0.5">{check.description}</p>
                </div>
                <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20 text-[10px] font-medium">
                  <Check className="h-2.5 w-2.5" strokeWidth={3} />
                  Clear
                </span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* SECTION 2 — DEEPER SCAN CARD (free only) */}
      {showDeeperScan && (
        <motion.div variants={fadeIn} className="card-surface !p-0 overflow-hidden">
          {/* Header */}
          <div className="flex items-start justify-between gap-4 px-5 lg:px-6 py-5 border-b border-border/40">
            <div className="min-w-0">
              <span className="inline-flex items-center gap-1.5 text-destructive text-[10px] font-medium tracking-wide uppercase">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75 animate-ping" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-destructive" />
                </span>
                8 deeper sources still unchecked
              </span>
              <h2 className="text-display text-xl lg:text-2xl leading-tight mt-2">
                8 deeper sources are still unchecked.
              </h2>
              <p className="text-body text-sm mt-1.5 max-w-xl">
                The free scan checks the surface. The paid scan checks the rest.
              </p>
            </div>
            <div className="shrink-0 text-right rounded-xl border border-border/40 bg-secondary/30 px-3 py-2">
              <p className="text-display text-xl leading-none">
                8<span className="text-muted-foreground text-sm">/8</span>
              </p>
              <p className="text-caps text-[9px] mt-1">Unchecked</p>
            </div>
          </div>

          {/* Stat tiles */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 px-5 lg:px-6 py-4 border-b border-border/40">
            {[
              { stat: "2 / 10", label: "checked free" },
              { stat: "8", label: "still unchecked" },
              { stat: "₹99", label: "one-time scan" },
            ].map((tile) => (
              <div
                key={tile.label}
                className="rounded-xl border border-border/40 bg-secondary/20 px-4 py-3"
              >
                <p className="text-display text-lg leading-none">{tile.stat}</p>
                <p className="text-body text-[11px] mt-1.5">{tile.label}</p>
              </div>
            ))}
          </div>

          {/* Locked source grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 px-5 lg:px-6 py-5">
            {lockedSources.map((src) => {
              const Icon = src.icon;
              return (
                <div
                  key={src.title}
                  className="group rounded-xl border border-border/40 bg-card p-3.5 transition-colors hover:border-border/70"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="h-8 w-8 rounded-lg border border-border/50 bg-secondary/40 flex items-center justify-center">
                      <Icon className="h-4 w-4 text-foreground/70" strokeWidth={1.75} />
                    </div>
                    <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={2} />
                  </div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <h4 className="text-display text-[13px] truncate">{src.title}</h4>
                  </div>
                  <p className="text-body text-[11px] leading-snug line-clamp-1">{src.description}</p>
                  <span
                    className={`mt-2.5 inline-flex items-center px-2 py-0.5 rounded-full border text-[10px] font-medium ${severityStyles[src.severity]}`}
                  >
                    {src.severity}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Supporting line */}
          <div className="px-5 lg:px-6 pb-4">
            <p className="text-body text-[11px]">Includes 3 family members.</p>
          </div>

          {/* Bottom dark CTA bar */}
          <div className="bg-foreground text-card px-5 lg:px-6 py-5 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6">
            <div className="flex items-baseline gap-2 shrink-0">
              <span className="text-display text-3xl leading-none text-card">₹99</span>
              <span className="text-[10px] opacity-60">+ 18% IGST</span>
            </div>
            <div className="hidden lg:block w-px h-10 bg-card/15" />
            <div className="flex-1 min-w-0">
              <p className="text-display text-sm text-card leading-tight">Check all 8 now.</p>
              <p className="text-[11px] opacity-60 mt-0.5">
                Results in about 60 seconds. 3 family members included.
              </p>
            </div>
            <Button
              onClick={onUnlock}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-11 font-semibold text-sm shrink-0 w-full lg:w-auto"
            >
              Run deeper scan
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}

      {/* Policy users — gentle next step */}
      {flowType === "policy" && (
        <motion.div
          variants={fadeIn}
          className="card-surface !p-5 flex items-center justify-between gap-4"
        >
          <div>
            <h3 className="text-display text-sm">Comprehensive monitoring active</h3>
            <p className="text-body text-xs mt-1">
              We continuously monitor 8 additional sources. You'll be notified if anything changes.
            </p>
          </div>
          <Button
            onClick={() => onNavigate?.("comprehensive-report")}
            variant="outline"
            size="sm"
            className="rounded-full shrink-0"
          >
            View report
            <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
};

export default CleanReportOverview;
