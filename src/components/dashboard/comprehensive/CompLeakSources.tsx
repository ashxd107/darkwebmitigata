import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface LeakField {
  label: string;
  value: string;
  sensitive?: boolean;
  fullWidth?: boolean;
}

interface CompLeakSource {
  id: number;
  title: string;
  risk: "Critical" | "High" | "Medium" | "Low";
  contextLine: string;
  fields: LeakField[];
}

const leakSources: CompLeakSource[] = [
  {
    id: 1,
    title: "HiTeckGroop.in — JIO Karnataka (Cellular Operator)",
    risk: "Critical",
    contextLine: "Leak Details — Early 2025 • 1.8B records (300M unique) from Indian cellular operators",
    fields: [
      { label: "Full Name", value: "Rahul Sharma" },
      { label: "Email", value: "rahul.sharma@gmail.com" },
      { label: "Password", value: "r@hul$h@rm@90", sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true },
      { label: "Phone 2", value: "+91 88005XXXXX", sensitive: true },
      { label: "Region", value: "JIO Karnataka" },
      { label: "Aadhaar Card", value: "XXXX XXXX 6042", sensitive: true },
      { label: "Source Date", value: "Early 2025" },
      { label: "Source Type", value: "Telecom Breach" },
      { label: "Address", value: "C/O T V S P Sekhar, NO-001 1ST FLOOR KRISHNA REDDY ENCLAVE, SHANABUGH LAYOUT, Bengaluru, Karnataka", fullWidth: true },
    ],
  },
  {
    id: 2,
    title: "Alien TxtBase — Stealer Log Combolist",
    risk: "High",
    contextLine: "Leak Details — Early 2025 • 2.8B unique records from stealer logs (browser-stored credentials)",
    fields: [
      { label: "Full Name", value: "Rahul Sharma" },
      { label: "Email", value: "rahul.sharma@gmail.com" },
      { label: "Password", value: "Rahul@2024!", sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true },
      { label: "Source Type", value: "Stealer Log" },
      { label: "Source Date", value: "Early 2025" },
      { label: "Region", value: "India" },
    ],
  },
  {
    id: 3,
    title: "DarkForums Dump — Financial Services Platform",
    risk: "Critical",
    contextLine: "Leak Details — Late 2024 • 450M records from financial and banking platforms",
    fields: [
      { label: "Full Name", value: "Rahul Sharma" },
      { label: "Email", value: "rahul.sharma@gmail.com" },
      { label: "Password", value: "Fin@nce#2023", sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true },
      { label: "PAN Card", value: "ABCDE12XXF", sensitive: true },
      { label: "Source Type", value: "Database Dump" },
      { label: "Source Date", value: "Late 2024" },
      { label: "Region", value: "India" },
      { label: "Address", value: "HSR Layout, Bengaluru, Karnataka 560102", fullWidth: true },
    ],
  },
  {
    id: 4,
    title: "BreachDB — Social Media Credential Dump",
    risk: "Medium",
    contextLine: "Leak Details — Mid 2024 • 800M records from social media platform breaches",
    fields: [
      { label: "Email", value: "rahul.sharma@gmail.com" },
      { label: "Password", value: "Social@Pass1", sensitive: true },
      { label: "Username", value: "rahul_sh90" },
      { label: "Source Type", value: "Credential Dump" },
      { label: "Source Date", value: "Mid 2024" },
    ],
  },
  {
    id: 5,
    title: "InfoStealer Collection — E-commerce Platform",
    risk: "High",
    contextLine: "Leak Details — Q1 2024 • 120M records from e-commerce and payment platforms",
    fields: [
      { label: "Full Name", value: "Rahul Sharma" },
      { label: "Email", value: "rahul.sharma@gmail.com" },
      { label: "Password", value: "Shop@2024#R", sensitive: true },
      { label: "Phone 1", value: "+91 93810XXXXX", sensitive: true },
      { label: "Source Type", value: "InfoStealer" },
      { label: "Source Date", value: "Q1 2024" },
      { label: "Address", value: "Koramangala, Bengaluru, Karnataka 560034", fullWidth: true },
    ],
  },
];

const riskStyles: Record<string, string> = {
  Critical: "bg-destructive/10 text-destructive border-destructive/20",
  High: "bg-risk-mid/10 text-risk-mid border-risk-mid/20",
  Medium: "bg-primary/10 text-primary border-primary/20",
  Low: "bg-muted text-muted-foreground border-border",
};

const FieldCard = ({ label, value, sensitive }: { label: string; value: string; sensitive?: boolean }) => (
  <div className="bg-secondary/50 rounded-2xl px-5 py-4">
    <p className="text-caps mb-1.5">{label}</p>
    <p className={`text-display text-sm ${sensitive ? "text-destructive" : ""}`}>{value}</p>
  </div>
);

const CompLeakSources = () => (
  <section>
    <p className="text-caps mb-2">Leak Source Intelligence — {leakSources.length} Sources</p>
    <h2 className="text-display text-xl mb-1.5">Detailed breach source analysis</h2>
    <p className="text-body text-sm mb-6">
      Each source below represents a distinct breach or exposure event with full intelligence-grade detail.
    </p>

    <div className="space-y-5">
      {leakSources.map((source, i) => {
        const regularFields = source.fields.filter((f) => !f.fullWidth);
        const fullWidthFields = source.fields.filter((f) => f.fullWidth);

        return (
          <motion.div
            key={source.id}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
            className="card-surface !p-0 overflow-hidden"
          >
            <div className="flex items-center gap-4 px-6 py-5 border-b border-border/30">
              <div className="h-8 w-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <span className="text-display text-xs">{source.id}</span>
              </div>
              <h3 className="text-display text-sm flex-1 min-w-0">{source.title}</h3>
              <Badge variant="outline" className={`text-[10px] font-medium shrink-0 ${riskStyles[source.risk]}`}>
                {source.risk}
              </Badge>
            </div>

            <div className="px-6 pt-4 pb-2">
              <p className="text-caps text-[9px]">{source.contextLine}</p>
            </div>

            <div className="px-6 pb-5 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {regularFields.map((field) => (
                  <FieldCard key={field.label} label={field.label} value={field.value} sensitive={field.sensitive} />
                ))}
              </div>
              {fullWidthFields.map((field) => (
                <div key={field.label} className="mt-3">
                  <FieldCard label={field.label} value={field.value} />
                </div>
              ))}
            </div>
          </motion.div>
        );
      })}
    </div>
  </section>
);

export default CompLeakSources;
