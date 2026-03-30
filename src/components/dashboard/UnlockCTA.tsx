import { motion } from "framer-motion";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UnlockCTAProps {
  onUnlock: () => void;
}

const UnlockCTA = ({ onUnlock }: UnlockCTAProps) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] }}
    className="card-surface !p-6 flex flex-col sm:flex-row items-center gap-5 sm:gap-6"
  >
    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
      <ShieldCheck className="h-7 w-7 text-primary" strokeWidth={1.5} />
    </div>
    <div className="flex-1 text-center sm:text-left">
      <h3 className="text-display text-base mb-1">Unlock full report for ₹49</h3>
      <p className="text-body text-sm leading-relaxed">
        Get complete leak details, breach sources, and recommended actions.
      </p>
    </div>
    <Button
      onClick={onUnlock}
      className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 py-2.5 h-auto font-semibold text-sm shrink-0"
    >
      Unlock Full Report
      <ArrowRight className="ml-2 h-4 w-4" />
    </Button>
  </motion.div>
);

export default UnlockCTA;
