import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Users, ArrowRight, ArrowLeft, Check, ShieldCheck, CreditCard, X } from "lucide-react";

interface InsuranceFlowProps {
  open: boolean;
  onClose: () => void;
}

const plans = [
  {
    id: "individual",
    title: "Individual",
    price: "$9.99/mo",
    icon: User,
    features: ["Identity theft protection", "Fraud reimbursement up to $50K", "Legal assistance", "Data breach support", "Account recovery"],
  },
  {
    id: "family",
    title: "Family",
    price: "$19.99/mo",
    icon: Users,
    features: ["Covers up to 5 members", "Child identity protection", "Shared fraud protection", "Device coverage", "Priority support"],
  },
];

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

const InsuranceFlow = ({ open, onClose }: InsuranceFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", dob: "", address: "" });

  const totalSteps = 5;

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  if (!open) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/20 backdrop-blur-sm p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="bg-card rounded-[24px] w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-0">
          <div>
            <p className="text-caps mb-1">Cyber Insurance</p>
            <h2 className="text-display text-xl">
              {step === 1 && "Who do you want to protect?"}
              {step === 2 && "Coverage details"}
              {step === 3 && "Your information"}
              {step === 4 && "Review your plan"}
              {step === 5 && "Payment"}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose} className="text-muted-foreground">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Stepper */}
        <div className="flex gap-1.5 px-6 pt-4">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div
              key={i}
              className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                i < step ? "bg-primary" : "bg-border"
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" className="grid md:grid-cols-2 gap-4">
                {plans.map((plan) => (
                  <motion.button
                    key={plan.id}
                    whileHover={{ y: -4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handlePlanSelect(plan.id)}
                    className={`card-surface text-left transition-all duration-200 ${
                      selectedPlan === plan.id ? "ring-2 ring-primary border-primary/30" : ""
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                        <plan.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                      </div>
                      {selectedPlan === plan.id && (
                        <div className="h-6 w-6 rounded-full bg-primary flex items-center justify-center ml-auto">
                          <Check className="h-4 w-4 text-primary-foreground" strokeWidth={2} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-display text-lg">{plan.title}</h3>
                    <p className="text-display text-2xl mt-1">{plan.price}</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {step === 2 && selectedPlanData && (
              <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                <div className="card-surface">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <selectedPlanData.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-display text-sm">{selectedPlanData.title} Plan</h3>
                      <p className="text-body text-xs">{selectedPlanData.price}</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    {selectedPlanData.features.map((f) => (
                      <li key={f} className="flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-primary" strokeWidth={2} />
                        </div>
                        <span className="text-body text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-body text-xs mb-1.5 block">Full Name</Label>
                    <Input value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="John Doe" className="rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-body text-xs mb-1.5 block">Email</Label>
                    <Input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="john@example.com" className="rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-body text-xs mb-1.5 block">Phone</Label>
                    <Input value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} placeholder="+1 (555) 000-0000" className="rounded-xl" />
                  </div>
                  <div>
                    <Label className="text-body text-xs mb-1.5 block">Date of Birth</Label>
                    <Input type="date" value={formData.dob} onChange={(e) => setFormData({ ...formData, dob: e.target.value })} className="rounded-xl" />
                  </div>
                </div>
                <div>
                  <Label className="text-body text-xs mb-1.5 block">Address</Label>
                  <Input value={formData.address} onChange={(e) => setFormData({ ...formData, address: e.target.value })} placeholder="123 Main St, City, State" className="rounded-xl" />
                </div>
              </motion.div>
            )}

            {step === 4 && selectedPlanData && (
              <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit">
                <div className="card-surface space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Plan</span>
                    <span className="text-display text-sm">{selectedPlanData.title}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Monthly Premium</span>
                    <span className="text-display text-sm">{selectedPlanData.price}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Name</span>
                    <span className="text-display text-sm">{formData.name || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Email</span>
                    <span className="text-display text-sm">{formData.email || "—"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-body text-sm">Coverage</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">Active on payment</Badge>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 5 && selectedPlanData && (
              <motion.div key="step5" variants={stepVariants} initial="enter" animate="center" exit="exit" className="text-center py-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-display text-xl mb-2">Complete your purchase</h3>
                <p className="text-body text-sm mb-8">
                  You'll be charged <span className="text-display">{selectedPlanData.price}</span> for the {selectedPlanData.title} plan.
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 h-auto font-semibold text-base w-fit mx-auto"
                  onClick={() => {
                    onClose();
                    setStep(1);
                  }}
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Pay & Activate
                </Button>
                <p className="text-body text-xs mt-4">Payment processing will be integrated with Stripe</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-0">
          <Button
            variant="ghost"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          {step < 5 && (
            <Button
              onClick={() => setStep(Math.min(totalSteps, step + 1))}
              disabled={step === 1 && !selectedPlan}
              className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-semibold"
            >
              Continue
              <ArrowRight className="ml-1 h-4 w-4" />
            </Button>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default InsuranceFlow;
