import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key, ShieldCheck, LogOut, Search, CreditCard, ArrowRight } from "lucide-react";

const actions = [
  {
    title: "Change your passwords",
    description: "Update passwords for all compromised accounts immediately.",
    risk: "Critical",
    icon: Key,
  },
  {
    title: "Enable two-factor authentication",
    description: "Add an extra layer of security to your most important accounts.",
    risk: "High",
    icon: ShieldCheck,
  },
  {
    title: "Log out of all sessions",
    description: "Terminate any active sessions that may have been compromised.",
    risk: "High",
    icon: LogOut,
  },
  {
    title: "Scan your devices",
    description: "Run a full security scan to detect malware or threats.",
    risk: "Medium",
    icon: Search,
  },
  {
    title: "Monitor financial activity",
    description: "Watch for unauthorized transactions on your bank accounts.",
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
    <h2 className="text-display text-2xl mb-6">Actions you should take</h2>
    <div className="grid md:grid-cols-2 gap-4">
      {actions.map((action, i) => (
        <motion.div
          key={action.title}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="card-surface flex flex-col"
        >
          <div className="flex items-start justify-between mb-4">
            <div className="h-10 w-10 rounded-xl bg-secondary flex items-center justify-center">
              <action.icon className="h-5 w-5 text-foreground" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className={`text-[10px] font-medium ${riskStyles[action.risk]}`}>
              {action.risk}
            </Badge>
          </div>
          <h3 className="text-display text-sm mb-1">{action.title}</h3>
          <p className="text-body text-sm flex-1">{action.description}</p>
          <Button variant="ghost" className="mt-4 w-fit text-sm text-muted-foreground hover:text-foreground px-0">
            Take Action
            <ArrowRight className="ml-1 h-4 w-4" />
          </Button>
        </motion.div>
      ))}
    </div>
  </section>
);

export default Recommendations;
