import { motion } from "framer-motion";
import { ShieldCheck, Mail, Phone, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";

interface InsuranceSuccessProps {
  open: boolean;
  onClose: () => void;
}

const InsuranceSuccess = ({ open, onClose }: InsuranceSuccessProps) => (
  <Dialog open={open} onOpenChange={onClose}>
    <DialogContent className="sm:max-w-[440px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="p-6 sm:p-8 space-y-5"
      >
        {/* Success Header */}
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
            className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4"
          >
            <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />
          </motion.div>
          <h2 className="text-display text-xl sm:text-2xl mb-1">Thank you for purchasing</h2>
          <p className="text-body text-sm">Your policy has been successfully activated.</p>
        </div>

        {/* Policy Info */}
        <div className="rounded-2xl bg-secondary/40 p-4">
          <p className="text-caps mb-2">Policy delivery</p>
          <p className="text-body text-sm">
            You will receive your policy by email within <span className="text-display font-medium">24 hours</span>.
          </p>
        </div>

        {/* Support */}
        <div className="rounded-2xl bg-secondary/40 p-4">
          <p className="text-caps mb-2">Need help?</p>
          <div className="space-y-2">
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
          onClick={onClose}
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl h-11 font-semibold text-sm"
        >
          Go to Dashboard
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>
    </DialogContent>
  </Dialog>
);

export default InsuranceSuccess;
