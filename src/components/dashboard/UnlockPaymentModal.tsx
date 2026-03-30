import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ShieldCheck, CheckCircle2, FileText, Database, Lightbulb, Lock, ArrowRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface UnlockPaymentModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

type Step = "summary" | "processing" | "success" | "failed";

const UnlockPaymentModal = ({ open, onClose, onSuccess }: UnlockPaymentModalProps) => {
  const [step, setStep] = useState<Step>("summary");

  const handlePay = () => {
    setStep("processing");
    // Simulate Razorpay payment flow
    setTimeout(() => {
      setStep("success");
    }, 2000);
  };

  const handleDone = () => {
    setStep("summary");
    onSuccess();
  };

  const handleClose = () => {
    if (step === "processing") return;
    setStep("summary");
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[420px] p-0 rounded-[20px] border-border/30 overflow-hidden gap-0 [&>button]:hidden">
        <AnimatePresence mode="wait">
          {step === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6"
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 h-8 w-8 rounded-lg hover:bg-secondary/60 flex items-center justify-center transition-colors"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Lock className="h-5 w-5 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-display text-lg">Unlock Full Report</h3>
                  <p className="text-body text-xs">One-time payment</p>
                </div>
              </div>

              {/* What you get */}
              <div className="rounded-2xl bg-secondary/40 p-4 mb-5">
                <p className="text-caps mb-3">What you'll get</p>
                <ul className="space-y-3">
                  {[
                    { icon: Database, text: "All leak source records & breach details" },
                    { icon: FileText, text: "Complete exposed data categories" },
                    { icon: Lightbulb, text: "Detailed security recommendations" },
                    { icon: ShieldCheck, text: "Full breach source context & metadata" },
                  ].map((item) => (
                    <li key={item.text} className="flex items-center gap-3">
                      <div className="h-7 w-7 rounded-lg bg-card flex items-center justify-center shrink-0">
                        <item.icon className="h-3.5 w-3.5 text-primary" strokeWidth={1.5} />
                      </div>
                      <span className="text-body text-sm">{item.text}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Price */}
              <div className="flex items-center justify-between mb-5 px-1">
                <span className="text-body text-sm">Total</span>
                <span className="text-display text-2xl">₹49</span>
              </div>

              {/* CTA */}
              <Button
                onClick={handlePay}
                className="w-full bg-foreground hover:bg-foreground/90 text-background rounded-xl h-12 font-semibold text-sm"
              >
                Pay ₹49 & Unlock
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>

              {/* Trust line */}
              <p className="text-center text-muted-foreground text-[11px] mt-3">
                Secure payment via Razorpay · No recurring charges
              </p>
            </motion.div>
          )}

          {step === "processing" && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 py-16 flex flex-col items-center text-center"
            >
              <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin mb-5" />
              <h3 className="text-display text-base mb-1">Processing payment…</h3>
              <p className="text-body text-sm">Please wait while we verify your payment.</p>
            </motion.div>
          )}

          {step === "success" && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="p-6 py-12 flex flex-col items-center text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.1 }}
                className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-5"
              >
                <CheckCircle2 className="h-8 w-8 text-primary" strokeWidth={1.5} />
              </motion.div>
              <h3 className="text-display text-lg mb-1">Full report unlocked</h3>
              <p className="text-body text-sm max-w-[280px] mb-6">
                You now have access to complete leak details, source records, and recommended actions.
              </p>
              <Button
                onClick={handleDone}
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 h-11 font-semibold text-sm"
              >
                View Full Report
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {step === "failed" && (
            <motion.div
              key="failed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="p-6 py-12 flex flex-col items-center text-center"
            >
              <div className="h-16 w-16 rounded-full bg-destructive/10 flex items-center justify-center mb-5">
                <X className="h-8 w-8 text-destructive" strokeWidth={1.5} />
              </div>
              <h3 className="text-display text-lg mb-1">Payment was not completed</h3>
              <p className="text-body text-sm max-w-[280px] mb-2">
                Your full report is still locked. Please try again or contact support if the issue continues.
              </p>
              <p className="text-body text-xs mb-6">contact@mitigata.com</p>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={handleClose}
                  className="rounded-xl px-5 h-10 text-sm"
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => setStep("summary")}
                  className="bg-foreground hover:bg-foreground/90 text-background rounded-xl px-5 h-10 font-semibold text-sm"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
};

export default UnlockPaymentModal;
