import { motion } from "framer-motion";
import { Phone, Mail, ShieldAlert, Info, CreditCard, Smartphone, AlertTriangle, FileText, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const situations = [
  { icon: CreditCard, text: "Block my card after suspected fraud" },
  { icon: AlertTriangle, text: "Help after suspicious transaction activity" },
  { icon: ShieldAlert, text: "Assistance after account compromise" },
  { icon: Smartphone, text: "Guidance on digital payment fraud" },
  { icon: HelpCircle, text: "Help understanding next steps after exposure" },
];

const prepItems = [
  "Registered phone number",
  "Suspicious transaction details",
  "Affected app / bank / website name",
  "Alerts or screenshots if available",
];

const CallAssistance = () => {
  return (
    <div className="py-4 lg:py-8 space-y-8 lg:space-y-10">
      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-caps mb-2">Support</p>
        <h1 className="text-display text-xl sm:text-2xl mb-2">Call Assistance</h1>
        <p className="text-body text-sm sm:text-base max-w-2xl leading-relaxed">
          Get guided help from our support partner for urgent fraud and account-related situations.
          If you need help with actions such as blocking a card, responding to suspicious activity, or understanding what to do next — contact assistance directly.
        </p>
      </motion.section>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Primary Contact Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="card-surface !p-6 sm:!p-8 space-y-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Phone className="h-6 w-6 text-primary" strokeWidth={1.5} />
            </div>
            <div>
              <h2 className="text-display text-base sm:text-lg">Mitigata Support Partner</h2>
              <p className="text-body text-xs">Available Mon–Sat, 9 AM – 7 PM IST</p>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-3 text-sm">
              <Phone className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <a href="tel:+919876543210" className="text-display hover:text-primary transition-colors">
                +91 98765 43210
              </a>
            </div>
            <div className="flex items-center gap-3 text-sm">
              <Mail className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
              <a href="mailto:support@mitigata.com" className="text-display hover:text-primary transition-colors">
                support@mitigata.com
              </a>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              asChild
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-semibold flex-1 h-12 text-base"
            >
              <a href="tel:+919876543210">
                <Phone className="mr-2 h-4 w-4" />
                Call Now
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              className="rounded-xl px-6 font-semibold flex-1 h-12 text-base"
            >
              <a href="mailto:support@mitigata.com">
                <Mail className="mr-2 h-4 w-4" />
                Email Support
              </a>
            </Button>
          </div>
        </motion.div>

        {/* When to Use */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="card-surface !p-6 sm:!p-8"
        >
          <div className="flex items-center gap-2 mb-5">
            <Info className="h-4 w-4 text-primary" strokeWidth={1.5} />
            <h3 className="text-display text-sm">When to use this</h3>
          </div>
          <ul className="space-y-3">
            {situations.map((s) => (
              <li key={s.text} className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-primary/8 flex items-center justify-center shrink-0 mt-0.5">
                  <s.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
                </div>
                <span className="text-body text-sm leading-relaxed pt-1">{s.text}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </div>

      {/* Before You Call */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="card-surface !p-6 sm:!p-8"
      >
        <div className="flex items-center gap-2 mb-4">
          <FileText className="h-4 w-4 text-primary" strokeWidth={1.5} />
          <h3 className="text-display text-sm">Before you call</h3>
        </div>
        <p className="text-body text-xs mb-4">Keep the following information ready for a faster resolution:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {prepItems.map((item) => (
            <div key={item} className="flex items-center gap-2.5 bg-secondary/40 rounded-xl px-4 py-2.5">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span className="text-body text-sm">{item}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CallAssistance;
