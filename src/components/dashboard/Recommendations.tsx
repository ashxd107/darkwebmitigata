import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Key, ShieldCheck, LogOut, Search, CreditCard } from "lucide-react";

const actions = [
  {
    title: "Change your passwords immediately",
    description: "Update passwords for all affected accounts. Use unique, strong passwords for each service.",
    risk: "Critical",
    icon: Key,
  },
  {
    title: "Enable two-factor authentication",
    description: "Add an extra layer of security to your most important accounts to prevent unauthorized access.",
    risk: "High",
    icon: ShieldCheck,
  },
  {
    title: "Log out of all active sessions",
    description: "Terminate any active sessions that may have been compromised across affected platforms.",
    risk: "High",
    icon: LogOut,
  },
  {
    title: "Scan your devices for threats",
    description: "Run a full security scan on all devices to detect malware, keyloggers, or other threats.",
    risk: "Medium",
    icon: Search,
  },
  {
    title: "Monitor your financial activity",
    description: "Watch for unauthorized transactions on your bank accounts and cards over the coming weeks.",
    risk: "Medium",
    icon: CreditCard,
  },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
};

const Recommendations = () => (
  <section>
    <p className="text-caps mb-2">Recommendations</p>
    <h2 className="text-display text-2xl mb-1.5">What you should know</h2>
    <p className="text-body text-sm mb-6">
      These are the most relevant next steps based on the data found in your scan.
    </p>
    <div className="space-y-3">
      {actions.map((action, i) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.06, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          className="card-surface flex items-start gap-5"
        >
          <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center shrink-0 mt-0.5">
            <action.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1">
              <h3 className="text-display text-sm">{action.title}</h3>
              <Badge variant="outline" className={`text-[10px] font-medium ${riskStyles[action.risk]}`}>
                {action.risk}
              </Badge>
            </div>
            <p className="text-body text-sm leading-relaxed">{action.description}</p>
          </div>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Recommendations;
