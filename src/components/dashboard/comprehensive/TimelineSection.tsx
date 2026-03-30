import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

const events = [
  {
    date: "Jan 2025",
    source: "HiTeckGroop.in — JIO Karnataka",
    description: "Massive telecom data breach exposing personal and identity documents of cellular subscribers.",
    tags: ["Email", "Password", "Phone", "Aadhaar", "Address"],
  },
  {
    date: "Jan 2025",
    source: "Alien TxtBase — Stealer Logs",
    description: "Large-scale combolist from browser-stored credentials harvested via infostealer malware.",
    tags: ["Email", "Password", "Phone"],
  },
  {
    date: "Nov 2024",
    source: "DarkForums Dump — Financial Platform",
    description: "Database dump from financial services platform including PAN and banking credentials.",
    tags: ["Email", "Password", "PAN", "Address"],
  },
  {
    date: "Jul 2024",
    source: "BreachDB — Social Media",
    description: "Credential dump from multiple social media platform breaches.",
    tags: ["Email", "Password", "Username"],
  },
  {
    date: "Mar 2024",
    source: "InfoStealer Collection — E-commerce",
    description: "Data harvested from e-commerce and payment platforms via infostealer campaigns.",
    tags: ["Email", "Password", "Phone", "Address"],
  },
];

const TimelineSection = () => (
  <section>
    <p className="text-caps mb-2">Breach Timeline</p>
    <h2 className="text-display text-xl mb-1.5">Exposure chronology</h2>
    <p className="text-body text-sm mb-6">
      Timeline of breach events where your data was identified, ordered by recency.
    </p>

    <div className="relative">
      {/* Timeline line */}
      <div className="absolute left-[19px] top-0 bottom-0 w-px bg-border/50" />

      <div className="space-y-0">
        {events.map((event, i) => (
          <motion.div
            key={event.source}
            initial={{ opacity: 0, x: -12 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative pl-12 pb-6 last:pb-0"
          >
            {/* Dot */}
            <div className="absolute left-[14px] top-1.5 h-[11px] w-[11px] rounded-full border-2 border-primary bg-card z-10" />

            <div className="card-surface !p-5">
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="min-w-0">
                  <p className="text-display text-sm">{event.source}</p>
                  <p className="text-body text-xs mt-0.5 leading-relaxed">{event.description}</p>
                </div>
                <span className="text-caps text-[10px] shrink-0 mt-0.5">{event.date}</span>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {event.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="text-[9px] font-medium bg-secondary/50 text-muted-foreground border-border/30">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default TimelineSection;
