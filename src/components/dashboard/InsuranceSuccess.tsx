import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsuranceSuccessProps {
  onGoToDashboard: () => void;
}

const InsuranceSuccess = ({ onGoToDashboard }: InsuranceSuccessProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    className="flex items-center justify-center min-h-[60vh]"
  >
    <div className="card-surface !p-8 sm:!p-10 max-w-md w-full text-center">
      {/* Success Icon */}
      <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <ShieldCheck className="h-8 w-8 text-primary" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h2 className="text-display text-xl sm:text-2xl mb-2">Thank you for purchasing</h2>
      <p className="text-body text-sm mb-1">Your policy has been successfully activated.</p>
      <p className="text-body text-xs opacity-70 mb-8">
        You will receive your policy by email within 24 hours.
      </p>

      {/* Divider */}
      <div className="border-t border-border/30 mb-6" />

      {/* Support Section */}
      <div className="space-y-3 mb-8">
        <p className="text-caps">Need help?</p>
        <div className="flex items-center justify-center gap-2.5">
          <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <a href="mailto:contact@mitigata.com" className="text-display text-sm hover:text-primary transition-colors">
            contact@mitigata.com
          </a>
        </div>
        <div className="flex items-center justify-center gap-2.5">
          <Phone className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <a href="tel:+919876543210" className="text-display text-sm hover:text-primary transition-colors">
            +91 98765 43210
          </a>
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
    </div>
  </motion.div>
);

export default InsuranceSuccess;
