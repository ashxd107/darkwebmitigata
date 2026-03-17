import { motion } from "framer-motion";
import { AlertTriangle, Key, Monitor, Database, ShieldX, Calendar } from "lucide-react";

const metrics = [
  { label: "Total Exposures", value: "24", icon: AlertTriangle, risk: "high" as const },
  { label: "Passwords Exposed", value: "8", icon: Key, risk: "high" as const },
  { label: "Devices Affected", value: "3", icon: Monitor, risk: "mid" as const },
  { label: "Leak Sources", value: "5", icon: Database, risk: "mid" as const },
  { label: "Risk Level", value: "Critical", icon: ShieldX, risk: "high" as const },
  { label: "Last Detected", value: "2 days ago", icon: Calendar, risk: "low" as const },
];

const riskColors = {
  high: "bg-risk-high",
  mid: "bg-risk-mid",
  low: "bg-risk-low",
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } }
};

const MetricCards = () => {
  return (
    <motion.section variants={containerVariants} initial="hidden" animate="visible">
      <p className="text-caps mb-4">Summary</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {metrics.map((m) => (
          <motion.div
            key={m.label}
            variants={cardVariants}
            whileHover={{ y: -4, transition: { duration: 0.2 } }}
            className="card-surface flex flex-col"
          >
            <div className="flex items-center justify-between mb-4">
              <m.icon className="h-5 w-5 text-muted-foreground" strokeWidth={1.5} />
              <div className={`h-2.5 w-2.5 rounded-full ${riskColors[m.risk]}`} />
            </div>
            <span className="text-display text-2xl">{m.value}</span>
            <span className="text-body text-xs mt-1">{m.label}</span>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default MetricCards;
