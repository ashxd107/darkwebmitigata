import { motion } from "framer-motion";
import { User, Globe, Monitor } from "lucide-react";
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
    icon: User,
    items: ["Username exposed", "Password exposed", "Login URLs identified"],
  },
  {
    id: "personal",
    title: "Personal Information",
    icon: Globe,
    items: ["Email address found in breaches", "Phone number detected", "Physical address partially exposed"],
  },
  {
    id: "device-session",
    title: "Device & Session Data",
    icon: Monitor,
    items: [
      "IP address detected",
      "Operating system identified",
      "Device name found",
      "Location approximated",
      "Browser cookies found",
      "Active sessions may be compromised",
    ],
  },
];

const ExposureSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-caps mb-2">What Was Exposed</p>
      <h2 className="text-display text-2xl mb-6">Your compromised information</h2>

      <div className="card-surface !p-0 overflow-hidden">
        <Accordion type="multiple" defaultValue={["credentials", "personal", "device-session"]}>
          {categories.map((cat) => (
            <AccordionItem key={cat.id} value={cat.id} className="border-border/30 last:border-b-0">
              <AccordionTrigger className="px-6 py-5 hover:no-underline hover:bg-secondary/30">
                <div className="flex items-center gap-3">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
                    <cat.icon className="h-4.5 w-4.5 text-primary" strokeWidth={1.5} />
                  </div>
                  <span className="text-display text-sm">{cat.title}</span>
                  <span className="text-muted-foreground text-xs font-normal ml-1">
                    {cat.items.length} items
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-5">
                <ul className="space-y-2.5 pl-12">
                  {cat.items.map((item) => (
                    <li key={item} className="flex items-start gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-risk-mid mt-2 shrink-0" />
                      <span className="text-body text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </motion.section>
  );
};

export default ExposureSection;
