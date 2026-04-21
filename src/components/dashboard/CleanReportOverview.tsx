import { motion } from "framer-motion";
import { Check, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import type { FlowType } from "@/types/flow";

interface CleanReportOverviewProps {
  flowType?: FlowType;
  isUnlocked?: boolean;
  onUnlock?: () => void;
  onNavigate?: (id: string) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

type Node =
  | { type: "checked"; label: string }
  | { type: "locked"; label: string; tooltip: string };

const nodes: Node[] = [
  { type: "checked", label: "Public breaches" },
  { type: "checked", label: "Combo lists" },
  { type: "locked", label: "Dark web", tooltip: "Live identity sale listings" },
  { type: "locked", label: "Stealer logs", tooltip: "Saved creds and sessions" },
  { type: "locked", label: "Aadhaar", tooltip: "Aadhaar & PAN leak sources" },
  { type: "locked", label: "Telegram", tooltip: "Telegram leak channels" },
  { type: "locked", label: "Family", tooltip: "Family-linked exposure" },
  { type: "locked", label: "Address", tooltip: "Home and delivery records" },
  { type: "locked", label: "KYC docs", tooltip: "Identity and financial documents" },
  { type: "locked", label: "Websites", tooltip: "Affected websites & apps" },
];

// Compact circular progress ring — 2 of 10
const ProgressRing = () => {
  const size = 132;
  const stroke = 6;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const pct = 2 / 10;
  const dash = c * pct;

  return (
    <div className="relative shrink-0" style={{ width: size, height: size }}>
      {/* Subtle radial green wash */}
      <div
        className="absolute inset-0 rounded-full"
        style={{
          background:
            "radial-gradient(circle at center, hsl(var(--primary) / 0.10) 0%, transparent 65%)",
        }}
      />
      <svg width={size} height={size} className="relative -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--border))"
          strokeWidth={stroke}
          opacity={0.7}
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="hsl(var(--primary))"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - dash }}
          transition={{ duration: 1.1, ease: [0.2, 0.8, 0.2, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="flex items-baseline">
          <span className="text-display text-2xl lg:text-[28px] leading-none">2</span>
          <span className="text-display text-2xl lg:text-[28px] leading-none text-muted-foreground/70">/10</span>
        </div>
        <span className="text-caps mt-2">Scanned</span>
      </div>
    </div>
  );
};

const CoverageNode = ({ node }: { node: Node }) => {
  const inner =
    node.type === "checked" ? (
      <div className="relative h-10 w-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_0_6px_hsl(var(--primary)/0.12)]">
        <Check className="h-4 w-4 text-primary-foreground" strokeWidth={3} />
      </div>
    ) : (
      <div className="h-10 w-10 rounded-full bg-card border border-border flex items-center justify-center">
        <Lock className="h-3.5 w-3.5 text-muted-foreground" strokeWidth={2} />
      </div>
    );

  const labelEl = (
    <span className="text-[11px] text-foreground/80 mt-2.5 text-center leading-tight max-w-[72px]">
      {node.label}
    </span>
  );

  if (node.type === "locked") {
    return (
      <Tooltip delayDuration={120}>
        <TooltipTrigger asChild>
          <div className="flex flex-col items-center cursor-default">
            {inner}
            {labelEl}
          </div>
        </TooltipTrigger>
        <TooltipContent
          side="top"
          className="bg-foreground text-card border-0 text-[11px] px-2.5 py-1.5 rounded-md shadow-lg"
        >
          {node.tooltip}
        </TooltipContent>
      </Tooltip>
    );
  }

  return (
    <div className="flex flex-col items-center">
      {inner}
      {labelEl}
    </div>
  );
};

const CleanReportOverview = ({
  flowType = "free",
  isUnlocked = false,
  onUnlock,
  onNavigate,
}: CleanReportOverviewProps) => {
  const showCTA = flowType === "free" && !isUnlocked;

  return (
    <TooltipProvider>
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="visible"
        className="py-3 lg:py-5"
      >
        {/* Single main white card */}
        <motion.div variants={fadeUp} className="card-surface !p-6 lg:!p-10 space-y-8 lg:space-y-10">
          {/* HERO BLOCK */}
          <div className="flex flex-col lg:flex-row lg:items-center gap-6 lg:gap-12">
            <div className="flex justify-center lg:justify-start">
              <ProgressRing />
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-caps">Personal exposure report</p>
              <h1 className="text-display text-[28px] lg:text-[40px] leading-[1.1] mt-3">
                <span className="text-primary">Nothing found</span>{" "}
                <span>in the 2 sources checked.</span>
              </h1>
              <p className="text-body text-sm lg:text-[15px] mt-3 max-w-xl">
                In 7 out of 10 scans like this, the other 8 layers still show risk.
              </p>
            </div>
          </div>

          {/* COVERAGE CARD */}
          <motion.div
            variants={fadeUp}
            className="rounded-[18px] border border-border/40 bg-secondary/40 px-5 lg:px-7 py-5 lg:py-6"
          >
            <div className="flex items-center justify-between mb-6">
              <span className="text-caps">Coverage</span>
              <span className="text-[11px] text-muted-foreground">2 checked · 8 locked</span>
            </div>

            {/* Strip with connecting line */}
            <div className="relative">
              {/* connector line — sits behind nodes, aligned with circle centers (10px from top of node block) */}
              <div className="absolute left-0 right-0 top-5 h-px pointer-events-none">
                <div className="relative w-full h-full px-5">
                  <div className="absolute inset-x-5 top-0 h-px bg-border" />
                  {/* Green segment covering first 2 of 10 nodes (≈ 1/9 of gaps between centers) */}
                  <div
                    className="absolute top-0 h-px bg-primary"
                    style={{ left: "calc(5% + 1.25rem)", width: "calc(11.111% - 0rem)" }}
                  />
                </div>
              </div>

              {/* Desktop: single row of 10 */}
              <div className="hidden md:grid grid-cols-10 gap-2 relative">
                {nodes.map((n) => (
                  <div key={n.label} className="flex justify-center">
                    <CoverageNode node={n} />
                  </div>
                ))}
              </div>

              {/* Mobile/tablet: 2 rows of 5 */}
              <div className="grid md:hidden grid-cols-5 gap-y-5 gap-x-2">
                {nodes.map((n) => (
                  <div key={n.label} className="flex justify-center">
                    <CoverageNode node={n} />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* CTA CARD — free users only */}
        {showCTA && (
          <motion.div
            variants={fadeUp}
            className="relative mt-5 lg:mt-6 rounded-[20px] overflow-hidden bg-foreground text-card"
            style={{
              boxShadow:
                "0 1px 0 hsl(0 0% 100% / 0.06) inset, 0 20px 50px -20px hsl(var(--primary) / 0.25), 0 10px 30px rgba(0,0,0,0.15)",
            }}
          >
            {/* subtle ambient emerald glow in one corner */}
            <div
              aria-hidden
              className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, hsl(var(--primary) / 0.22) 0%, transparent 60%)",
              }}
            />

            <div className="relative px-6 lg:px-9 py-6 lg:py-7 flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-7">
              {/* Price */}
              <div className="shrink-0">
                <div className="flex items-baseline gap-2">
                  <span className="text-display text-card text-[44px] lg:text-[52px] leading-none">₹99</span>
                  <span className="text-[11px] text-card/60">+ 18% IGST</span>
                </div>
                <p className="text-caps mt-2 text-card/55">One-time</p>
              </div>

              {/* Divider */}
              <div className="hidden lg:block w-px h-16 bg-card/15" />

              {/* Copy */}
              <div className="flex-1 min-w-0">
                <p className="text-[10px] uppercase tracking-[0.14em] font-medium text-primary">
                  Comprehensive scan
                </p>
                <p className="text-display text-card text-lg lg:text-xl mt-1.5">
                  Check the other 8 layers.
                </p>
                <p className="text-[12px] text-card/60 mt-1">
                  Under 60 seconds. 3 family members included.
                </p>
              </div>

              {/* CTA */}
              <Button
                onClick={onUnlock}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-6 h-12 font-semibold text-sm shrink-0 w-full lg:w-auto transition-transform duration-150 hover:-translate-y-0.5 shadow-[0_10px_30px_-10px_hsl(var(--primary)/0.7)]"
              >
                Run deeper scan
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Policy users — quiet status card linking to comprehensive report */}
        {flowType === "policy" && (
          <motion.div
            variants={fadeUp}
            className="mt-5 lg:mt-6 card-surface !p-6 flex flex-col lg:flex-row lg:items-center gap-4 lg:gap-6"
          >
            <div className="flex-1 min-w-0">
              <p className="text-caps text-primary">Comprehensive access active</p>
              <p className="text-display text-base lg:text-lg mt-1.5">
                All 10 layers are being monitored.
              </p>
              <p className="text-body text-[12px] mt-1">
                We'll notify you the moment anything changes.
              </p>
            </div>
            <Button
              onClick={() => onNavigate?.("comprehensive-report")}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-5 h-11 font-semibold text-sm shrink-0 w-full lg:w-auto"
            >
              View report
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </motion.div>
    </TooltipProvider>
  );
};

export default CleanReportOverview;
