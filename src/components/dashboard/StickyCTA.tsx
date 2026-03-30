import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StickyCTAProps {
  onClick: () => void;
  isUnlocked?: boolean;
  onUnlock?: () => void;
}

const StickyCTA = ({ onClick, isUnlocked = false, onUnlock }: StickyCTAProps) => {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {/* Desktop: slim bottom bar, not floating card */}
      <motion.div
        key="desktop-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="fixed bottom-0 left-0 lg:left-[260px] right-0 z-50 hidden md:block"
      >
        <div className="bg-card/95 backdrop-blur-md border-t border-border/30 px-6 py-2.5 flex items-center justify-between max-w-[1200px]">
          <div className="flex items-center gap-3">
            <ShieldCheck className="text-primary w-4 h-4 shrink-0" strokeWidth={1.5} />
            <p className="text-body text-xs">
              {!isUnlocked
                ? <>Unlock the full report — <span className="text-display text-xs">₹49 one-time</span></>
                : <>Protect yourself against fraud — <span className="text-display text-xs">get covered now</span></>
              }
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              onClick={!isUnlocked && onUnlock ? onUnlock : onClick}
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 font-semibold text-xs h-8"
            >
              {!isUnlocked ? "Unlock for ₹49" : "Get Cyber Insurance"}
            </Button>
            <button
              onClick={() => setDismissed(true)}
              className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Mobile: slim sticky bottom bar */}
      <motion.div
        key="mobile-cta"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="fixed bottom-0 left-0 right-0 z-50 md:hidden"
      >
        <div className="bg-card/95 backdrop-blur-md border-t border-border/30 px-4 py-2.5 flex items-center gap-3">
          <div className="flex-1 min-w-0 flex items-center gap-2">
            <ShieldCheck className="text-primary w-4 h-4 shrink-0" strokeWidth={1.5} />
            <p className="text-body text-[11px] truncate">Get financial protection</p>
          </div>
          <Button
            onClick={onClick}
            size="sm"
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-3 font-semibold text-xs h-8 shrink-0"
          >
            Get Protected
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center text-muted-foreground shrink-0"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default StickyCTA;
