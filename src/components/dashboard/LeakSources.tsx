import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import LeakDetailDrawer from "./LeakDetailDrawer";

const leaks = [
  {
    id: 1,
    title: "Malware Log Exposure",
    date: "Mar 15, 2026",
    domain: "email-provider.com",
    summary: "Username, password, and device information",
    risk: "Critical" as const,
    details: {
      username: "john.d****@email.com",
      password: "••••••••••",
      website: "email-provider.com",
      ip: "192.168.•••.•••",
      os: "Windows 11",
      country: "United States",
      malware: "Info Stealer detected",
    },
  },
  {
    id: 2,
    title: "Data Breach – Social Platform",
    date: "Mar 10, 2026",
    domain: "social-network.com",
    summary: "Email address and hashed password",
    risk: "High" as const,
    details: {
      username: "john.d****",
      password: "••••••••••",
      website: "social-network.com",
      ip: "—",
      os: "—",
      country: "—",
      malware: "Not applicable",
    },
  },
  {
    id: 3,
    title: "Session Hijack Risk",
    date: "Mar 8, 2026",
    domain: "shopping-site.com",
    summary: "Browser cookies and session tokens",
    risk: "High" as const,
    details: {
      username: "j.doe****",
      password: "—",
      website: "shopping-site.com",
      ip: "10.0.•••.•••",
      os: "macOS Ventura",
      country: "United States",
      malware: "Not applicable",
    },
  },
  {
    id: 4,
    title: "Credential Dump",
    date: "Feb 28, 2026",
    domain: "cloud-storage.io",
    summary: "Login credentials and access tokens",
    risk: "Medium" as const,
    details: {
      username: "johndoe****",
      password: "••••••••••",
      website: "cloud-storage.io",
      ip: "—",
      os: "—",
      country: "—",
      malware: "Not applicable",
    },
  },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const LeakSources = () => {
  const [selectedLeak, setSelectedLeak] = useState<typeof leaks[0] | null>(null);

  return (
    <section>
      <p className="text-caps mb-2">Leak Sources</p>
      <h2 className="text-display text-2xl mb-6">Where your data was found</h2>
      <div className="space-y-3">
        {leaks.map((leak, i) => (
          <motion.div
            key={leak.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="card-surface flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-3 mb-1">
                <h3 className="text-display text-sm">{leak.title}</h3>
                <Badge variant="outline" className={`text-[10px] font-medium ${riskStyles[leak.risk]}`}>
                  {leak.risk}
                </Badge>
              </div>
              <p className="text-body text-sm">{leak.summary}</p>
              <div className="flex gap-4 mt-2">
                <span className="text-caps">{leak.domain}</span>
                <span className="text-caps">{leak.date}</span>
              </div>
            </div>
            <Button
              variant="ghost"
              className="text-sm text-muted-foreground hover:text-foreground shrink-0"
              onClick={() => setSelectedLeak(leak)}
            >
              View details
              <ChevronRight className="ml-1 h-4 w-4" />
            </Button>
          </motion.div>
        ))}
      </div>

      <LeakDetailDrawer
        leak={selectedLeak}
        open={!!selectedLeak}
        onClose={() => setSelectedLeak(null)}
      />
    </section>
  );
};

export default LeakSources;
