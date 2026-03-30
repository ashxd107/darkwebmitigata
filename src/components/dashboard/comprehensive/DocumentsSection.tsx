import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, CreditCard, BookOpen, Car, Globe, UserCheck, Wallet } from "lucide-react";

const documents = [
  { label: "Aadhaar Card", value: "XXXX XXXX 6042", icon: FileText, status: "found" as const },
  { label: "PAN Card", value: "ABCDE12XXF", icon: CreditCard, status: "found" as const },
  { label: "Passport", value: "Not Found", icon: BookOpen, status: "not-found" as const },
  { label: "Driving License", value: "Not Found", icon: Car, status: "not-found" as const },
  { label: "Leak Sites", value: "5 sources", icon: Globe, status: "found" as const },
  { label: "Profile Scraped", value: "2 platforms", icon: UserCheck, status: "found" as const },
  { label: "Financial Data", value: "Partial exposure", icon: Wallet, status: "found" as const },
];

const statusStyles = {
  found: "bg-destructive/10 text-destructive border-destructive/20",
  "not-found": "bg-primary/10 text-primary border-primary/20",
};

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const DocumentsSection = () => (
  <motion.section variants={fadeIn} initial="hidden" animate="visible">
    <p className="text-caps mb-2">Documents</p>
    <h2 className="text-display text-xl mb-1.5">Sensitive document exposure</h2>
    <p className="text-body text-sm mb-6">
      Presence or absence of sensitive identity documents detected across breach data.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
      {documents.map((doc) => (
        <div key={doc.label} className="card-surface !p-5 flex items-center gap-4">
          <div className={`h-10 w-10 rounded-xl flex items-center justify-center shrink-0 ${
            doc.status === "found" ? "bg-destructive/10" : "bg-secondary"
          }`}>
            <doc.icon className={`h-5 w-5 ${doc.status === "found" ? "text-destructive" : "text-muted-foreground"}`} strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-display text-sm">{doc.label}</p>
            <p className="text-body text-xs truncate">{doc.value}</p>
          </div>
          <Badge variant="outline" className={`text-[9px] font-medium shrink-0 ${statusStyles[doc.status]}`}>
            {doc.status === "found" ? "Found" : "Clear"}
          </Badge>
        </div>
      ))}
    </div>
  </motion.section>
);

export default DocumentsSection;
