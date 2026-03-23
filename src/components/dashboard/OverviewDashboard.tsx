import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight, AlertTriangle, Key, Database, ShieldX,
  User, Globe, Monitor, Lock, ShieldCheck, CreditCard, ShieldAlert,
  CheckCircle2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RiskScoreMeter from "./RiskScoreMeter";
import ExposureBreakdownChart from "./ExposureBreakdownChart";
import SeverityDistribution from "./SeverityDistribution";
import { getRiskContent, emptyStates, type RiskBand } from "@/lib/riskContent";

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
};

interface OverviewDashboardProps {
  onInsuranceClick: () => void;
  onNavigate: (id: string) => void;
  riskScore?: number;
}

// Simulated data — in production this comes from API/state
const EXPOSURE_COUNT = 24;
const PASSWORD_COUNT = 8;
const LEAK_SOURCE_COUNT = 5;

const metrics = [
  { label: "Total Exposures", value: String(EXPOSURE_COUNT), icon: AlertTriangle, risk: EXPOSURE_COUNT > 10 ? "high" as const : EXPOSURE_COUNT > 0 ? "mid" as const : "low" as const },
  { label: "Passwords Exposed", value: String(PASSWORD_COUNT), icon: Key, risk: PASSWORD_COUNT > 5 ? "high" as const : PASSWORD_COUNT > 0 ? "mid" as const : "low" as const },
  { label: "Leak Sources", value: String(LEAK_SOURCE_COUNT), icon: Database, risk: LEAK_SOURCE_COUNT > 3 ? "mid" as const : "low" as const },
  { label: "Risk Level", value: riskContent.badgeLabel.replace(" Risk", ""), icon: ShieldX, risk: riskContent.band === "critical" ? "high" as const : riskContent.band === "medium" ? "mid" as const : "low" as const },
];

const riskColors = { high: "bg-risk-high", mid: "bg-risk-mid", low: "bg-risk-low" };

const exposureItems = [
  { icon: User, label: "Username & password exposed" },
  { icon: Globe, label: "Email & phone detected" },
  { icon: Monitor, label: "IP address & OS identified" },
  { icon: Lock, label: "Browser cookies & sessions found" },
];

const topLeaks = [
  { source: "Malware Log", impact: "Password exposed", risk: "Critical" },
  { source: "Social Platform", impact: "Credential breach", risk: "High" },
  { source: "Shopping Site", impact: "Session hijack risk", risk: "High" },
];

const domains = [
  { name: "email-provider.com", type: "Password leak", risk: "Critical" },
  { name: "social-network.com", type: "Credential breach", risk: "High" },
  { name: "shopping-site.com", type: "Session exposure", risk: "High" },
  { name: "cloud-storage.io", type: "Password leak", risk: "Medium" },
];

const recommendations = [
  { icon: Key, label: "Change compromised passwords" },
  { icon: ShieldCheck, label: "Enable two-factor authentication" },
  { icon: CreditCard, label: "Monitor financial activity" },
];

const riskBadge: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
};

const EmptyState = ({ message, icon: Icon }: { message: string; icon: React.ElementType }) => (
  <div className="flex flex-col items-center justify-center py-8 text-center">
    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
      <Icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
    </div>
    <p className="text-body text-sm max-w-xs">{message}</p>
  </div>
);

const OverviewDashboard = ({ onInsuranceClick, onNavigate }: OverviewDashboardProps) => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="py-4 lg:py-6 space-y-5">
      {/* ROW 1: Identity + Score Meter + CTA */}
      <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* LEFT: User Identity */}
        <div className="lg:col-span-3 flex flex-col justify-center">
          <p className="text-caps mb-2">Personal Exposure Report</p>
          <h2 className="text-display text-lg lg:text-xl leading-tight">Rahul Sharma</h2>
          <p className="text-body text-sm mt-1">+91 98XXXXXX10</p>
          <p className="text-body text-[11px] mt-3 opacity-50">
            {riskContent.supportingLine}
          </p>
        </div>

        {/* CENTER: Risk Score Meter */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center py-4 lg:py-0">
          <RiskScoreMeter score={RISK_SCORE} />
          <p className="text-body text-xs mt-2 text-center">
            {riskContent.secondarySupportingLine}
          </p>
        </div>

        {/* RIGHT: CTA Card */}
        <div className="lg:col-span-4">
          <div className="bg-foreground text-card p-6 rounded-[20px] h-full flex flex-col justify-center">
            <ShieldAlert className="h-6 w-6 mb-3 text-primary" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold mb-1">{riskContent.ctaCardTitle}</h3>
            <p className="text-xs opacity-60 mb-4 leading-relaxed">
              {riskContent.ctaCardBody}
            </p>
            <Button
              onClick={onInsuranceClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 w-fit font-semibold text-xs"
            >
              {riskContent.ctaLabel}
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Dynamic Banner */}
      <motion.div variants={fadeIn} className="card-surface !p-5">
        <div className="flex items-center gap-3">
          <Badge variant="outline" className={`text-[10px] font-medium ${riskContent.badgeClass}`}>
            {riskContent.badgeLabel}
          </Badge>
          <h2 className="text-display text-base lg:text-lg">{riskContent.headline}</h2>
        </div>
        <p className="text-body text-sm mt-1.5">{riskContent.body}</p>
      </motion.div>

      {/* ROW 2: Metric Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="card-surface !p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <m.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <div className={`h-2 w-2 rounded-full ${riskColors[m.risk]}`} />
            </div>
            <span className="text-display text-xl lg:text-2xl">{m.value}</span>
            <span className="text-body text-[11px] mt-0.5">{m.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ROW 3: Exposure Breakdown + Severity + Top Risks */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 lg:gap-5">
        <motion.div variants={fadeIn} className="md:col-span-1 lg:col-span-4">
          <ExposureBreakdownChart />
        </motion.div>

        <motion.div variants={fadeIn} className="md:col-span-1 lg:col-span-4">
          <SeverityDistribution />
        </motion.div>

        <motion.div variants={fadeIn} className="md:col-span-2 lg:col-span-4">
          <div className="card-surface !p-5 h-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-display text-sm">Top Risk Sources</h3>
              <button
                onClick={() => onNavigate("leak-sources")}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                View all →
              </button>
            </div>
            {hasExposures ? (
              <div className="space-y-3">
                {topLeaks.map((leak) => (
                  <div key={leak.source} className="flex items-center justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-display text-xs">{leak.source}</p>
                      <p className="text-body text-[11px] truncate">{leak.impact}</p>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-medium shrink-0 ${riskBadge[leak.risk]}`}>
                      {leak.risk}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message={emptyStates.leakSources} icon={CheckCircle2} />
            )}
          </div>
        </motion.div>
      </div>

      {/* ROW 4: Domains + Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-5">
        <motion.div variants={fadeIn} className="lg:col-span-8">
          <div className="card-surface !p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-display text-sm">Affected Domains</h3>
              <button
                onClick={() => onNavigate("leak-sources")}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                View all →
              </button>
            </div>
            {hasExposures ? (
              <div className="divide-y divide-border/40">
                {domains.map((d) => (
                  <div key={d.name} className="flex items-center justify-between py-2 first:pt-0 last:pb-0">
                    <div className="min-w-0">
                      <span className="text-display text-xs block">{d.name}</span>
                      <span className="text-body text-[11px]">{d.type}</span>
                    </div>
                    <Badge variant="outline" className={`text-[9px] font-medium shrink-0 ${riskBadge[d.risk]}`}>
                      {d.risk}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message={emptyStates.affectedDomains} icon={CheckCircle2} />
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="lg:col-span-4">
          <div className="card-surface !p-5 h-full">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-display text-sm">Recommendations</h3>
              <button
                onClick={() => onNavigate("recommendations")}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                View all →
              </button>
            </div>
            {hasExposures ? (
              <div className="space-y-3">
                {recommendations.map((rec) => (
                  <div key={rec.label} className="flex items-center gap-2.5">
                    <div className="h-7 w-7 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                      <rec.icon className="h-3.5 w-3.5 text-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="text-body text-xs leading-snug">{rec.label}</span>
                  </div>
                ))}
              </div>
            ) : (
              <EmptyState message={emptyStates.recommendations} icon={CheckCircle2} />
            )}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewDashboard;
