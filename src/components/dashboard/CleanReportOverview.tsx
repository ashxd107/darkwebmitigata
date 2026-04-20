import { motion } from "framer-motion";
import { ShieldCheck, Check, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FlowType } from "@/types/flow";

interface CleanReportOverviewProps {
  flowType?: FlowType;
  isUnlocked?: boolean;
  onUnlock?: () => void;
  onNavigate?: (id: string) => void;
}

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

const basicChecks = [
  {
    title: "Public breach databases",
    description: "Checked against HaveIBeenPwned-tier breach records. Your credentials weren't found.",
  },
  {
    title: "Basic credential combo lists",
    description: "Compared with common email-password dumps circulating online. No matches found.",
  },
];

const lockedSources = [
  { title: "Dark web", description: "Identity bundles sold live" },
  { title: "Aadhaar", description: "Government ID leak sources" },
  { title: "Family", description: "Parents & contacts" },
  { title: "Address", description: "Home & delivery records" },
];

const CleanReportOverview = ({
  flowType = "free",
  isUnlocked = false,
  onUnlock,
  onNavigate,
}: CleanReportOverviewProps) => {
  const showDeeperScanCTA = flowType === "free" && !isUnlocked;

  return (
    <motion.div
      variants={stagger}
      initial="hidden"
      animate="visible"
      className="py-4 lg:py-6 space-y-8"
    >
      {/* HERO — Clean status */}
      <motion.div variants={fadeIn} className="flex items-start gap-5 lg:gap-7">
        <div className="relative shrink-0">
          <div className="absolute inset-0 rounded-full bg-primary/10 blur-xl" />
          <div className="absolute inset-2 rounded-full bg-primary/15" />
          <div className="relative h-20 w-20 lg:h-24 lg:w-24 rounded-full bg-primary flex items-center justify-center shadow-elegant">
            <ShieldCheck className="h-9 w-9 lg:h-10 lg:w-10 text-primary-foreground" strokeWidth={1.8} />
          </div>
        </div>

        <div className="flex-1 min-w-0 pt-1">
          <p className="text-caps text-xs mb-2 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            Basic scan complete
          </p>
          <h1 className="text-display text-2xl lg:text-4xl leading-tight tracking-tight">
            Your basic report is clean, Rahul.
          </h1>
          <p className="text-body text-sm lg:text-base mt-3 max-w-2xl leading-relaxed">
            Your email and phone were checked against public breach databases and common credential dumps.
            Nothing exposed. Your basic digital identity looks good.
          </p>
        </div>
      </motion.div>

      {/* RESULTS CARD */}
      <motion.div variants={fadeIn} className="card-surface !p-0 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-5 border-b border-border/40">
          <div>
            <h2 className="text-display text-base">Free basic scan · results</h2>
          </div>
          <p className="text-body text-xs">2 sources checked · all clear</p>
        </div>

        <div className="divide-y divide-border/30">
          {basicChecks.map((check) => (
            <div key={check.title} className="flex items-start gap-4 px-6 py-5">
              <div className="h-9 w-9 rounded-full bg-primary flex items-center justify-center shrink-0">
                <Check className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-display text-sm">{check.title}</h3>
                <p className="text-body text-xs mt-1 leading-relaxed">{check.description}</p>
              </div>
              <div className="shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                <Check className="h-3 w-3" strokeWidth={2.5} />
                <span className="text-[11px] font-medium">Clear</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* COMPREHENSIVE UPSELL — only for free, locked users */}
      {showDeeperScanCTA && (
        <>
          <motion.div variants={fadeIn}>
            <p className="text-caps text-xs">Want deeper peace of mind?</p>
          </motion.div>

          <motion.div variants={fadeIn} className="card-surface !p-0 overflow-hidden">
            <div className="flex items-start justify-between gap-6 px-6 py-5 border-b border-border/40">
              <div className="min-w-0">
                <h2 className="text-display text-base">Comprehensive scan · 8 more sources</h2>
                <p className="text-body text-xs mt-1.5 max-w-2xl leading-relaxed">
                  The basic scan covers the first layer. For complete coverage, the comprehensive scan checks
                  8 additional sources where Indian data most often appears.
                </p>
              </div>
              <div className="shrink-0 text-right">
                <p className="text-display text-2xl leading-none">
                  8<span className="text-muted-foreground text-base">/8</span>
                </p>
                <p className="text-caps text-[9px] mt-1">More layers</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 px-6 py-5">
              {lockedSources.map((src) => (
                <div
                  key={src.title}
                  className="rounded-xl border border-border/40 bg-secondary/20 p-4 flex flex-col gap-3"
                >
                  <div className="h-8 w-8 rounded-lg border border-border/50 bg-card flex items-center justify-center">
                    <Lock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="text-display text-sm">{src.title}</h4>
                    <p className="text-body text-[11px] mt-0.5">{src.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="px-6 pb-5">
              <p className="text-body text-xs">
                Plus <span className="text-foreground font-medium">Stealer logs, Telegram channels, KYC documents, and affected websites.</span>
              </p>
            </div>

            {/* Black sticky CTA bar */}
            <div className="bg-foreground text-card px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-baseline gap-3 min-w-0">
                <span className="text-display text-3xl leading-none">₹49</span>
                <span className="text-xs opacity-60 leading-snug">
                  One-time scan across 8 additional layers. Results in 60 seconds.
                </span>
              </div>
              <Button
                onClick={onUnlock}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 py-5 font-semibold text-sm shrink-0"
              >
                Run deeper scan
                <ArrowRight className="ml-1.5 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        </>
      )}

      {/* For policy users — gentle next step */}
      {flowType === "policy" && (
        <motion.div variants={fadeIn} className="card-surface !p-5 flex items-center justify-between gap-4">
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
