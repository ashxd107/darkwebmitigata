import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Key, Lock } from "lucide-react";

const passwords = [
  { account: "Gmail", password: "r@hul$h@rm@90", source: "HiTeckGroop.in", risk: "Critical" as const, freeVisible: true },
  { account: "Gmail", password: "Rahul@2024!", source: "Alien TxtBase", risk: "High" as const, freeVisible: true },
  { account: "Banking Portal", password: "Fin@nce#2023", source: "DarkForums Dump", risk: "Critical" as const, freeVisible: false },
  { account: "Social Media", password: "Social@Pass1", source: "BreachDB", risk: "Medium" as const, freeVisible: false },
  { account: "Shopping Site", password: "Shop@2024#R", source: "InfoStealer Collection", risk: "High" as const, freeVisible: false },
  { account: "Work Email", password: "T3chC0rp@W0rk", source: "Alien TxtBase", risk: "High" as const, freeVisible: false },
  { account: "Cloud Storage", password: "Cl0ud#Acc3ss", source: "DarkForums Dump", risk: "Critical" as const, freeVisible: false },
  { account: "Payment App", password: "P@y••••••", source: "InfoStealer Collection", risk: "High" as const, freeVisible: false },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
};

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

interface PasswordsSectionProps {
  isUnlocked?: boolean;
}

const PasswordsSection = ({ isUnlocked = true }: PasswordsSectionProps) => {
  const visiblePasswords = isUnlocked ? passwords : passwords.filter(p => p.freeVisible);
  const lockedCount = isUnlocked ? 0 : passwords.filter(p => !p.freeVisible).length;

  return (
    <motion.section variants={fadeIn} initial="hidden" animate="visible">
      <p className="text-caps mb-2">Leaked Passwords — {passwords.length} Found</p>
      <h2 className="text-display text-xl mb-1.5">Compromised credentials</h2>
      <p className="text-body text-sm mb-6">
        Passwords extracted from breach data linked to your identity. Change these immediately.
      </p>

      <div className="card-surface !p-0 overflow-hidden">
        {/* Header */}
        <div className="grid grid-cols-12 gap-4 px-6 py-3 border-b border-border/30 bg-secondary/30">
          <span className="col-span-3 text-caps text-[9px]">Account</span>
          <span className="col-span-4 text-caps text-[9px]">Password</span>
          <span className="col-span-3 text-caps text-[9px]">Source</span>
          <span className="col-span-2 text-caps text-[9px] text-right">Risk</span>
        </div>

        {visiblePasswords.map((pw, i) => (
          <motion.div
            key={`${pw.account}-${i}`}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.04 }}
            className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-border/15 last:border-b-0 hover:bg-secondary/20 transition-colors"
          >
            <div className="col-span-3 flex items-center gap-2 min-w-0">
              <Key className="h-3.5 w-3.5 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <span className="text-display text-xs truncate">{pw.account}</span>
            </div>
            <div className="col-span-4 min-w-0">
              <code className="text-xs text-destructive font-mono bg-destructive/5 rounded px-2 py-0.5 truncate block">
                {pw.password}
              </code>
            </div>
            <div className="col-span-3 min-w-0">
              <span className="text-body text-xs truncate block">{pw.source}</span>
            </div>
            <div className="col-span-2 flex justify-end">
              <Badge variant="outline" className={`text-[9px] font-medium ${riskStyles[pw.risk]}`}>
                {pw.risk}
              </Badge>
            </div>
          </motion.div>
        ))}

        {!isUnlocked && lockedCount > 0 && (
          <div className="px-6 py-4 flex items-center gap-2 text-muted-foreground bg-secondary/20">
            <Lock className="h-3.5 w-3.5" strokeWidth={1.5} />
            <span className="text-body text-xs">{lockedCount} more passwords hidden — unlock the full report to see all</span>
          </div>
        )}
      </div>
    </motion.section>
  );
};

export default PasswordsSection;
