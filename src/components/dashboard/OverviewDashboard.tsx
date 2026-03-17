import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  ArrowRight,
  AlertTriangle,
  Key,
  Database,
  ShieldX,
  User,
  Globe,
  Monitor,
  Lock,
  ShieldCheck,
  CreditCard,
  ShieldAlert,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import RiskScoreMeter from "./RiskScoreMeter";

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
}

const metrics = [
  { label: "Total Exposures", value: "24", icon: AlertTriangle, risk: "high" as const },
  { label: "Passwords Exposed", value: "8", icon: Key, risk: "high" as const },
  { label: "Leak Sources", value: "5", icon: Database, risk: "mid" as const },
  { label: "Risk Level", value: "Critical", icon: ShieldX, risk: "high" as const },
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

const OverviewDashboard = ({ onInsuranceClick, onNavigate }: OverviewDashboardProps) => {
  return (
    <motion.div variants={stagger} initial="hidden" animate="visible" className="py-6 space-y-5">
      {/* ROW 1: Identity + Score Meter + CTA */}
      <motion.div variants={fadeIn} className="grid grid-cols-12 gap-5">
        {/* LEFT: User Identity */}
        <div className="col-span-12 lg:col-span-3 flex flex-col justify-center">
          <p className="text-caps mb-2">Personal Exposure Report</p>
          <h2 className="text-display text-xl leading-tight">Rahul Sharma</h2>
          <p className="text-body text-sm mt-1">+91 98XXXXXX10</p>
          <p className="text-body text-[11px] mt-3 opacity-50">
            Your data has been found across multiple breach sources
          </p>
        </div>

        {/* CENTER: Risk Score Meter */}
        <div className="col-span-12 lg:col-span-5 flex flex-col items-center justify-center">
          <RiskScoreMeter score={82} />
          <p className="text-body text-xs mt-2 text-center">
            Immediate action is recommended
          </p>
        </div>

        {/* RIGHT: CTA Card */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-foreground text-card p-6 rounded-[20px] h-full flex flex-col justify-center">
            <ShieldAlert className="h-6 w-6 mb-3 text-primary" strokeWidth={1.5} />
            <h3 className="text-sm font-semibold mb-1">Reduce your risk</h3>
            <p className="text-xs opacity-60 mb-4 leading-relaxed">
              Your exposed data can be used for fraud or identity misuse.
            </p>
            <Button
              onClick={onInsuranceClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 w-fit font-semibold text-xs"
            >
              Get Cyber Insurance
              <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
      </motion.div>

      {/* ROW 2: Metric Cards */}
      <motion.div variants={fadeIn} className="grid grid-cols-4 gap-4">
        {metrics.map((m) => (
          <div key={m.label} className="card-surface !p-4 flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <m.icon className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
              <div className={`h-2 w-2 rounded-full ${riskColors[m.risk]}`} />
            </div>
            <span className="text-display text-2xl">{m.value}</span>
            <span className="text-body text-[11px] mt-0.5">{m.label}</span>
          </div>
        ))}
      </motion.div>

      {/* ROW 3: Exposure + Top Risks */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
          <div className="card-surface !p-5">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-display text-sm">What is exposed</h3>
              <button
                onClick={() => onNavigate("exposure")}
                className="text-[11px] text-muted-foreground hover:text-foreground transition-colors font-medium"
              >
                View all →
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {exposureItems.map((item) => (
                <div key={item.label} className="flex items-center gap-2.5 py-1.5">
                  <div className="h-7 w-7 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-body text-xs leading-snug">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-4">
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
          </div>
        </motion.div>
      </div>

      {/* ROW 4: Domains + Recommendations */}
      <div className="grid grid-cols-12 gap-5">
        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-8">
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
          </div>
        </motion.div>

        <motion.div variants={fadeIn} className="col-span-12 lg:col-span-4">
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
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default OverviewDashboard;
