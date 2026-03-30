import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsuranceSuccessProps {
  onGoToDashboard: () => void;
}

const InsuranceSuccess = ({ onGoToDashboard }: InsuranceSuccessProps) => (
  <motion.div
    initial={{ opacity: 0, y: 12 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    className="py-4 lg:py-8 space-y-6"
  >
    {/* Success Header Card */}
    <div className="card-surface !p-6 sm:!p-8 flex flex-col items-center text-center">
      <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-5">
        <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />
      </div>
      <h2 className="text-display text-xl sm:text-2xl mb-2">Thank you for purchasing</h2>
      <p className="text-body text-sm">Your policy has been successfully activated.</p>
    </div>

    {/* Policy Info Card */}
    <div className="card-surface !p-6">
      <p className="text-caps mb-4">Policy delivery</p>
      <p className="text-body text-sm">
        You will receive your policy by email within <span className="text-display font-medium">24 hours</span>.
      </p>
    </div>

    {/* Support Card */}
    <div className="card-surface !p-6">
      <p className="text-caps mb-4">Need help?</p>
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <a href="mailto:contact@mitigata.com" className="text-display text-sm hover:text-primary transition-colors">
            contact@mitigata.com
          </a>
        </div>
        <div className="flex items-center gap-3">
          <Phone className="h-4 w-4 text-muted-foreground shrink-0" strokeWidth={1.5} />
          <a href="tel:+919876543210" className="text-display text-sm hover:text-primary transition-colors">
            +91 98765 43210
          </a>
        </div>
      </div>
    </div>

    {/* CTA */}
    <Button
      onClick={onGoToDashboard}
      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2.5 h-auto font-semibold text-sm w-full sm:w-auto"
    >
      Go to Dashboard
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
);

export default InsuranceSuccess;
