import { Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LockedOverlayProps {
  onUnlock: () => void;
  compact?: boolean;
}

const LockedOverlay = ({ onUnlock, compact = false }: LockedOverlayProps) => (
  <div className="absolute inset-0 z-10 flex items-center justify-center">
    <div className="absolute inset-0 bg-card/60 backdrop-blur-[6px] rounded-[20px]" />
    <div className="relative z-20 flex flex-col items-center text-center px-6">
      <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center mb-3">
        <Lock className="h-5 w-5 text-primary" strokeWidth={1.5} />
      </div>
      {!compact && (
        <>
          <h4 className="text-display text-sm mb-1">Full report locked</h4>
          <p className="text-body text-xs max-w-[220px] mb-3">
            Unlock complete details, breach sources, and recommendations.
          </p>
        </>
      )}
      <Button
        onClick={onUnlock}
        size="sm"
        className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg px-4 font-semibold text-xs"
      >
        Unlock for ₹49
        <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
      </Button>
    </div>
  </div>
);

export default LockedOverlay;
