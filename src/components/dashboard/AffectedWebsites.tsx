import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

const websites = [
  { name: "email-provider.com", type: "Password leak", date: "Mar 15, 2026", risk: "Critical" },
  { name: "social-network.com", type: "Credential breach", date: "Mar 10, 2026", risk: "High" },
  { name: "shopping-site.com", type: "Session exposure", date: "Mar 8, 2026", risk: "High" },
  { name: "cloud-storage.io", type: "Password leak", date: "Feb 28, 2026", risk: "Medium" },
  { name: "news-portal.com", type: "Email exposure", date: "Feb 20, 2026", risk: "Low" },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const AffectedWebsites = () => (
  <section>
    <p className="text-caps mb-2">Affected Websites</p>
    <h2 className="text-display text-2xl mb-1.5">Websites linked to exposed records</h2>
    <p className="text-body text-sm mb-6">
      These are the websites or services linked to the exposed records found in your scan.
    </p>
    <div className="card-surface !p-0 divide-y divide-border/50">
      {websites.map((site, i) => (
        <motion.div
          key={site.name}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.05 }}
          className="flex items-center gap-4 px-6 py-4"
        >
          <div className="flex-1 min-w-0">
            <span className="text-display text-sm block">{site.name}</span>
            <span className="text-body text-xs">{site.type} · {site.date}</span>
          </div>
          <Badge variant="outline" className={`text-[10px] font-medium shrink-0 ${riskStyles[site.risk]}`}>
            {site.risk}
          </Badge>
          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground shrink-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </motion.div>
      ))}
    </div>
  </section>
);

export default AffectedWebsites;
