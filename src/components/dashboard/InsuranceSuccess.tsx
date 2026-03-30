import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface InsuranceSuccessProps {
  onGoToDashboard: () => void;
}

const InsuranceSuccess = ({ onGoToDashboard }: InsuranceSuccessProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
    className="flex items-center justify-center min-h-[70vh] px-4"
  >
    <div className="max-w-lg w-full">
      {/* Success Animation */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200, damping: 15 }}
        className="flex justify-center mb-8"
      >
        <div className="relative">
          <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
            <ShieldCheck className="h-10 w-10 text-primary" strokeWidth={1.5} />
          </div>
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute -bottom-1 -right-1 h-7 w-7 rounded-full bg-primary flex items-center justify-center"
          >
            <CheckCircle2 className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
          </motion.div>
        </div>
      </motion.div>

      {/* Main Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="card-surface !p-8 sm:!p-10 text-center"
      >
        {/* Title */}
        <h2 className="text-display text-2xl sm:text-[28px] mb-3 leading-tight">
          Thank you for purchasing
        </h2>
        <p className="text-body text-sm sm:text-base mb-2">
          Your policy has been successfully activated.
        </p>

        {/* Policy Delivery Note */}
        <div className="inline-flex items-center gap-2 bg-primary/5 border border-primary/10 rounded-xl px-4 py-2.5 mt-4 mb-8">
          <Mail className="h-4 w-4 text-primary shrink-0" strokeWidth={1.5} />
          <p className="text-display text-xs sm:text-sm font-medium">
            You will receive your policy by email within 24 hours
          </p>
        </div>

        {/* Divider */}
        <div className="border-t border-border/40 mb-6" />

        {/* Support Section */}
        <p className="text-caps mb-4">Need help? Contact us</p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 mb-8">
          <a
            href="mailto:contact@mitigata.com"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <Mail className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
            <span className="text-display text-sm">contact@mitigata.com</span>
          </a>
          <a
            href="tel:+919876543210"
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-muted/50 hover:bg-muted transition-colors group"
          >
            <Phone className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" strokeWidth={1.5} />
            <span className="text-display text-sm">+91 98765 43210</span>
          </a>
        </div>

        {/* CTA */}
        <Button
          onClick={onGoToDashboard}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 h-auto font-semibold text-sm w-full sm:w-auto"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </div>
  </motion.div>
);

export default InsuranceSuccess;
