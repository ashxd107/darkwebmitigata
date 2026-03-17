import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyCTAProps {
  onClick: () => void;
}

const StickyCTA = ({ onClick }: StickyCTAProps) => (
  <div className="fixed bottom-8 right-8 z-50">
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: 1.5, duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
      whileHover={{ scale: 1.02, boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}
      className="bg-card p-4 rounded-2xl border border-border/30 flex items-center gap-4 min-w-[320px]"
      style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.06)" }}
    >
      <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
        <ShieldCheck className="text-primary w-6 h-6" strokeWidth={1.5} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-display text-sm">Your data is exposed</p>
        <p className="text-body text-xs">Reduce financial risk instantly</p>
      </div>
      <Button
        onClick={onClick}
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 font-semibold text-sm shrink-0"
      >
        Get Protected
      </Button>
    </motion.div>
  </div>
);

export default StickyCTA;
