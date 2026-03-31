import { motion } from "framer-motion";
import { User, Globe, Monitor, Lock, FileText } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const categories = [
  {
    id: "credentials",
    title: "Account Credentials",
    description: "Usernames, passwords, or login-related details found in one or more exposure records.",
    icon: User,
    items: [
      { service: "Gmail", detail: "username found: rahul****@gmail.com", locked: false },
      { service: "shopping-site.com", detail: "password exposure found", locked: true },
      { service: "social-network.com", detail: "login URL identified", locked: true },
    ],
  },
  {
    id: "personal",
    title: "Personal Information",
    description: "Email, phone, address, or other personal details linked to exposed records.",
    icon: Globe,
    items: [
      { service: "rahul****@gmail.com", detail: "found in breach data", locked: false },
      { service: "Phone number", detail: "detected in linked account records", locked: false },
      { service: "Physical address", detail: "partially exposed in one source", locked: true },
    ],
  },
  {
    id: "gov-ids",
    title: "Government IDs",
    description: "Identity documents such as Aadhaar, PAN, or passport found in exposure records.",
    icon: FileText,
    items: [
      { service: "Aadhaar Card", detail: "found — XXXX XXXX 6042", locked: true },
      { service: "PAN Card", detail: "found — ABCDE12XXF", locked: true },
      { service: "Passport", detail: "reference detected in one source", locked: true },
    ],
  },
  {
    id: "device-session",
    title: "Device & Session Data",
    description: "IP, browser sessions, cookies, and device-related metadata found in exposure logs.",
    icon: Monitor,
    items: [
      { service: "Malware log", detail: "browser cookies found", locked: true },
      { service: "Session record", detail: "device name found", locked: true },
      { service: "Exposure source", detail: "IP linked to session data", locked: true },
    ],
  },
];

interface ExposureSectionProps {
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

const ExposureSection = ({ isUnlocked = false, onUnlock }: ExposureSectionProps) => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-caps mb-2">Exposure</p>
      <h2 className="text-display text-2xl mb-1.5">What was found exposed</h2>
      <p className="text-body text-sm mb-6">
        This section summarizes the types of data found in your scan. For exact leak events, see the Comprehensive Report.
      </p>

      <div className="card-surface !p-0 overflow-hidden">
        <Accordion type="multiple" defaultValue={["credentials", "personal", "gov-ids", "device-session"]}>
          {categories.map((cat) => (
            <AccordionItem key={cat.id} value={cat.id} className="border-border/30 last:border-b-0">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <cat.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <div className="text-left">
                    <span className="text-display text-sm block">{cat.title}</span>
                    <span className="text-body text-[11px] font-normal">{cat.description}</span>
                  </div>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5">
                <ul className="space-y-2.5 pl-12">
                  {cat.items.map((item) => {
                    const isLocked = item.locked && !isUnlocked;
                    return (
                      <li key={item.service + item.detail} className="flex items-start gap-2.5">
                        <div className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${isLocked ? "bg-muted-foreground/30" : "bg-risk-mid"}`} />
                        {isLocked ? (
                          <span className="text-body text-sm flex items-center gap-2">
                            <span className="text-display">{item.service}</span>
                            {" — "}
                            <span className="bg-muted/80 text-transparent select-none rounded px-1" style={{ filter: "blur(4px)" }}>
                              {item.detail}
                            </span>
                            <Lock className="h-3 w-3 text-muted-foreground shrink-0" strokeWidth={1.5} />
                          </span>
                        ) : (
                          <span className="text-body text-sm">
                            <span className="text-display">{item.service}</span>
                            {" — "}
                            {item.detail}
                          </span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>

      {/* Unlock CTA for free users */}
      {!isUnlocked && onUnlock && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="mt-4 card-surface !p-5 flex items-center gap-4"
        >
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <Lock className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-display text-sm">Some details are hidden</p>
            <p className="text-body text-xs">Unlock the full report to see all exposed data and breach context.</p>
          </div>
          <button onClick={onUnlock} className="text-primary text-xs font-semibold hover:text-primary/80 transition-colors shrink-0">
            Unlock for ₹49 →
          </button>
        </motion.div>
      )}
    </motion.section>
  );
};

export default ExposureSection;
