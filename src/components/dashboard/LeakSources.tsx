import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Lock } from "lucide-react";

interface LeakField {
  label: string;
  value: string;
  sensitive?: boolean;
  fullWidth?: boolean;
  freeVisible?: boolean;
}

interface LeakSource {
  id: number;
  title: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  contextLine: string;
  fields: LeakField[];
}

const leakSources: LeakSource[] = [
  {
    id: 1,
    title: "HiTeckGroop.in — JIO Karnataka (Cellular Operator)",
    risk: "Critical",
    contextLine: "Leak Details — Early 2025 • 1.8B records (300M unique) from Indian cellular operators",
    fields: [
      { label: "Full Name", value: "Rahul Sharma", freeVisible: false },
      { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
      { label: "Password", value: "••••••••••", freeVisible: true, sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", freeVisible: false, sensitive: true },
      { label: "Phone 2", value: "+91 88005XXXXX", freeVisible: false, sensitive: true },
      { label: "Region", value: "JIO Karnataka", freeVisible: false },
      { label: "Aadhaar Card", value: "XXXX XXXX 6042", freeVisible: false, sensitive: true },
      { label: "Source Date", value: "Early 2025", freeVisible: false },
      { label: "Address", value: "C/O T V S P Sekhar, NO-001 1ST FLOOR KRISHNA REDDY ENCLAVE, SHANABUGH LAYOUT, Bengaluru, Karnataka", fullWidth: true, freeVisible: false },
    ],
  },
  {
    id: 2,
    title: "Alien TxtBase — Stealer Log Combolist",
    risk: "High",
    contextLine: "Leak Details — Early 2025 • 2.8B unique records from stealer logs (browser-stored credentials)",
    fields: [
      { label: "Full Name", value: "Rahul Sharma", freeVisible: false },
      { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
      { label: "Password", value: "••••••••••", freeVisible: true, sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", freeVisible: false, sensitive: true },
      { label: "Source Type", value: "Stealer Log", freeVisible: false },
      { label: "Source Date", value: "Early 2025", freeVisible: false },
      { label: "Region", value: "India", freeVisible: false },
    ],
  },
  {
    id: 3,
    title: "DarkForums Dump — Financial Services Platform",
    risk: "Critical",
    contextLine: "Leak Details — Late 2024 • 450M records from financial and banking platforms",
    fields: [
      { label: "Full Name", value: "Rahul Sharma", freeVisible: false },
      { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
      { label: "Password", value: "••••••••••", freeVisible: true, sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", freeVisible: false, sensitive: true },
      { label: "PAN Card", value: "ABCDE12XXF", freeVisible: false, sensitive: true },
      { label: "Source Type", value: "Database Dump", freeVisible: false },
      { label: "Source Date", value: "Late 2024", freeVisible: false },
      { label: "Region", value: "India", freeVisible: false },
      { label: "Address", value: "HSR Layout, Bengaluru, Karnataka 560102", fullWidth: true, freeVisible: false },
    ],
  },
  {
    id: 4,
    title: "BreachDB — Social Media Credential Dump",
    risk: "Medium",
    contextLine: "Leak Details — Mid 2024 • 800M records from social media platform breaches",
    fields: [
      { label: "Email", value: "rahul****@gmail.com", freeVisible: true },
      { label: "Password", value: "••••••••••", freeVisible: true, sensitive: true },
      { label: "Source Type", value: "Credential Dump", freeVisible: false },
      { label: "Source Date", value: "Mid 2024", freeVisible: false },
    ],
  },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

interface LeakSourcesProps {
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

const FieldCard = ({ label, value, locked, sensitive }: { label: string; value: string; locked: boolean; sensitive?: boolean }) => (
  <div className="bg-secondary/50 rounded-2xl px-5 py-4">
    <p className="text-caps mb-1.5">{label}</p>
    {locked ? (
      <div className="flex items-center gap-2">
        <span
          className="text-display text-sm select-none text-transparent bg-muted/80 rounded px-1"
          style={{ filter: "blur(5px)" }}
        >
          {value}
        </span>
        <Lock className="h-3 w-3 text-muted-foreground" strokeWidth={1.5} />
      </div>
    ) : (
      <p className={`text-display text-sm ${sensitive ? "text-destructive" : ""}`}>{value}</p>
    )}
  </div>
);

const LeakSources = ({ isUnlocked = false, onUnlock }: LeakSourcesProps) => {
  const visibleSources = isUnlocked ? leakSources : leakSources.slice(0, 2);
  const totalCount = leakSources.length;

  return (
    <section>
      <p className="text-caps mb-2">Leak Source Details — {totalCount} Sources</p>
      <h2 className="text-display text-2xl mb-1.5">Where your data was found</h2>
      <p className="text-body text-sm mb-6">
        {isUnlocked
          ? "Each source below represents a distinct breach or exposure event where your information was identified."
          : "You're viewing a limited preview. Unlock the full report to see all sources and complete details."}
      </p>

      <div className="space-y-5">
        {visibleSources.map((source, i) => {
          const visibleFields = isUnlocked
            ? source.fields
            : source.fields.filter((f) => f.freeVisible);

          const lockedFields = isUnlocked
            ? []
            : source.fields.filter((f) => !f.freeVisible);

          const regularFields = visibleFields.filter((f) => !f.fullWidth);
          const fullWidthFields = visibleFields.filter((f) => f.fullWidth);
          const lockedRegular = lockedFields.filter((f) => !f.fullWidth);

          return (
            <motion.div
              key={source.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
              className="card-surface !p-0 overflow-hidden"
            >
              {/* Header */}
              <div className="flex items-center gap-4 px-6 py-5 border-b border-border/30">
                <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-display text-xs">{source.id}</span>
                </div>
                <h3 className="text-display text-sm flex-1 min-w-0">{source.title}</h3>
                <Badge variant="outline" className={`text-[10px] font-medium shrink-0 ${riskStyles[source.risk]}`}>
                  {source.risk}
                </Badge>
              </div>

              {/* Context line */}
              <div className="px-6 pt-4 pb-2">
                <p className="text-caps text-[9px]">{source.contextLine}</p>
              </div>

              {/* Detail grid */}
              <div className="px-6 pb-5 pt-2">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {regularFields.map((field) => (
                    <FieldCard
                      key={field.label}
                      label={field.label}
                      value={field.value}
                      locked={false}
                      sensitive={field.sensitive}
                    />
                  ))}
                  {/* Show locked previews for non-free fields */}
                  {!isUnlocked && lockedRegular.slice(0, 3).map((field) => (
                    <FieldCard
                      key={field.label}
                      label={field.label}
                      value={field.value}
                      locked={true}
                      sensitive={field.sensitive}
                    />
                  ))}
                </div>

                {/* Full-width fields */}
                {isUnlocked && fullWidthFields.map((field) => (
                  <div key={field.label} className="mt-3">
                    <FieldCard
                      label={field.label}
                      value={field.value}
                      locked={false}
                    />
                  </div>
                ))}

                {/* Locked full-width preview */}
                {!isUnlocked && source.fields.filter(f => f.fullWidth).length > 0 && (
                  <div className="mt-3">
                    <FieldCard
                      label="Address"
                      value="Full address available in complete report"
                      locked={true}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Remaining sources locked indicator + CTA */}
      {!isUnlocked && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-5 space-y-4"
        >
          {/* Locked source previews */}
          {leakSources.slice(2).map((source) => (
            <div key={source.id} className="card-surface relative overflow-hidden">
              <div className="absolute inset-0 bg-card/70 backdrop-blur-[6px] z-10 flex items-center justify-center rounded-[20px]">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Lock className="h-4 w-4" strokeWidth={1.5} />
                  <span className="text-display text-xs">Locked</span>
                </div>
              </div>
              <div className="flex items-center gap-4 opacity-40">
                <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                  <span className="text-display text-xs">{source.id}</span>
                </div>
                <h3 className="text-display text-sm flex-1">{source.title}</h3>
                <Badge variant="outline" className={`text-[10px] font-medium ${riskStyles[source.risk]}`}>
                  {source.risk}
                </Badge>
              </div>
            </div>
          ))}

          {/* Unlock CTA */}
          <div className="card-surface !p-6 flex flex-col sm:flex-row items-center gap-5">
            <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
              <Lock className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-display text-base mb-1">Unlock full report for ₹49</h3>
              <p className="text-body text-sm leading-relaxed">
                See all leak sources, full breach details, and complete exposed information.
              </p>
            </div>
            <Button
              onClick={onUnlock}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2.5 h-auto font-semibold text-sm shrink-0"
            >
              Unlock Full Report
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </section>
  );
};

export default LeakSources;
