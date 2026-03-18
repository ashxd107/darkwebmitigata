import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  User, Users, ArrowRight, ArrowLeft, Check, ShieldCheck,
  CreditCard, X, Plus, Trash2, AlertCircle,
} from "lucide-react";

interface InsuranceFlowProps {
  open: boolean;
  onClose: () => void;
}

type MemberRelation = "Self" | "Spouse" | "Child";

interface FamilyMember {
  id: string;
  relation: MemberRelation;
  name: string;
  email: string;
  phone: string;
}

const plans = [
  {
    id: "individual",
    title: "Individual",
    price: "₹1,499",
    priceRaw: "₹1,499 / year",
    icon: User,
    features: [
      "Identity theft protection",
      "Fraud reimbursement up to ₹5,00,000",
      "Legal assistance",
      "Data breach support",
      "Account recovery",
    ],
  },
  {
    id: "family",
    title: "Family",
    price: "₹3,499",
    priceRaw: "₹3,499 / year",
    icon: Users,
    features: [
      "Covers up to 5 members",
      "Child identity protection",
      "Shared fraud protection",
      "Device coverage",
      "Priority support",
    ],
  },
];

const createMember = (relation: MemberRelation): FamilyMember => ({
  id: crypto.randomUUID(),
  relation,
  name: "",
  email: "",
  phone: "",
});

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

const InsuranceFlow = ({ open, onClose }: InsuranceFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [members, setMembers] = useState<FamilyMember[]>([createMember("Self")]);
  const [consent, setConsent] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const totalSteps = 5;
  const selectedPlanData = plans.find((p) => p.id === selectedPlan);

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "individual") {
      setMembers([createMember("Self")]);
    } else if (planId === "family" && members.length === 1) {
      setMembers([members[0]]);
    }
  };

  const updateMember = (id: string, field: keyof FamilyMember, value: string) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMember = (relation: MemberRelation) => {
    if (members.length >= 5) return;
    setMembers((prev) => [...prev, createMember(relation)]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const hasSpouse = members.some((m) => m.relation === "Spouse");
  const childCount = members.filter((m) => m.relation === "Child").length;

  const handlePayAttempt = () => {
    // Simulate payment — in real app, integrate Stripe here
    setPaymentFailed(true);
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSelectedPlan(null);
    setMembers([createMember("Self")]);
    setConsent(false);
    setPaymentFailed(false);
  };

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
              {step === 1 && "Choose your plan"}
              {step === 2 && "Coverage details"}
              {step === 3 && (selectedPlan === "family" ? "Insured members" : "Your information")}
              {step === 4 && "Review your plan"}
              {step === 5 && "Payment"}
            </h2>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose} className="text-muted-foreground">
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
            {/* STEP 1: Plan Selection */}
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
                    <p className="text-display text-2xl mt-1">{plan.price}<span className="text-body text-sm font-normal"> / year</span></p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* STEP 2: Coverage Details */}
            {step === 2 && selectedPlanData && (
              <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit">
                <div className="card-surface">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <selectedPlanData.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-display text-sm">{selectedPlanData.title} Plan</h3>
                      <p className="text-body text-xs">{selectedPlanData.priceRaw}</p>
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

            {/* STEP 3: Member Details */}
            {step === 3 && (
              <motion.div key="step3" variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-4">
                {members.map((member, idx) => (
                  <div key={member.id} className="card-surface !p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-[10px] font-semibold">
                          {member.relation}
                        </Badge>
                        {idx === 0 && (
                          <span className="text-body text-[10px]">Primary insured</span>
                        )}
                      </div>
                      {idx > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMember(member.id)}
                          className="text-muted-foreground hover:text-destructive h-7 w-7 p-0"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                    <div className="grid md:grid-cols-3 gap-3">
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Full Name</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateMember(member.id, "name", e.target.value)}
                          placeholder="Full name"
                          className="rounded-xl h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Email</Label>
                        <Input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateMember(member.id, "email", e.target.value)}
                          placeholder="email@example.com"
                          className="rounded-xl h-9 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Phone</Label>
                        <Input
                          value={member.phone}
                          onChange={(e) => updateMember(member.id, "phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className="rounded-xl h-9 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add family members (only for family plan) */}
                {selectedPlan === "family" && members.length < 5 && (
                  <div className="flex gap-2">
                    {!hasSpouse && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addMember("Spouse")}
                        className="rounded-xl text-xs font-medium border-dashed"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" />
                        Add Spouse
                      </Button>
                    )}
                    {childCount < 3 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addMember("Child")}
                        className="rounded-xl text-xs font-medium border-dashed"
                      >
                        <Plus className="h-3.5 w-3.5 mr-1.5" />
                        Add Child
                      </Button>
                    )}
                  </div>
                )}

                {/* Consent */}
                <div className="flex items-start gap-3 pt-2">
                  <Checkbox
                    id="consent"
                    checked={consent}
                    onCheckedChange={(v) => setConsent(v === true)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="consent" className="text-body text-xs leading-relaxed cursor-pointer">
                    I confirm that the details provided are accurate and I agree to be contacted regarding policy issuance.
                  </Label>
                </div>
              </motion.div>
            )}

            {/* STEP 4: Review */}
            {step === 4 && selectedPlanData && (
              <motion.div key="step4" variants={stepVariants} initial="enter" animate="center" exit="exit">
                <div className="card-surface space-y-4">
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Plan</span>
                    <span className="text-display text-sm">{selectedPlanData.title}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Annual Premium</span>
                    <span className="text-display text-sm">{selectedPlanData.priceRaw}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Members Covered</span>
                    <span className="text-display text-sm">{members.length}</span>
                  </div>

                  {/* Member list */}
                  <div className="space-y-2 pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Insured Members</span>
                    {members.map((m) => (
                      <div key={m.id} className="flex items-center justify-between pl-3">
                        <span className="text-display text-xs">{m.name || "—"}</span>
                        <Badge variant="outline" className="text-[9px] font-medium bg-secondary/50">
                          {m.relation}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-body text-sm">Coverage</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">Active on payment</Badge>
                  </div>
                </div>
              </motion.div>
            )}

            {/* STEP 5: Payment */}
            {step === 5 && selectedPlanData && (
              <motion.div key="step5" variants={stepVariants} initial="enter" animate="center" exit="exit" className="text-center py-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-display text-xl mb-2">Complete your purchase</h3>
                <p className="text-body text-sm mb-2">
                  Total premium: <span className="text-display">{selectedPlanData.priceRaw}</span>
                </p>
                <p className="text-body text-[11px] mb-6">
                  {members.length} member{members.length > 1 ? "s" : ""} covered under {selectedPlanData.title} plan
                </p>

                {paymentFailed && (
                  <div className="flex items-center gap-2 justify-center bg-destructive/10 text-destructive rounded-xl px-4 py-3 mb-6 text-sm max-w-sm mx-auto">
                    <AlertCircle className="h-4 w-4 shrink-0" />
                    <span>Payment failed. Please try again or contact <strong>contact@mitigata.com</strong> for support.</span>
                  </div>
                )}

                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-8 py-3 h-auto font-semibold text-base w-fit mx-auto"
                  onClick={handlePayAttempt}
                >
                  <ShieldCheck className="mr-2 h-5 w-5" />
                  Pay & Activate
                </Button>

                <p className="text-body text-[11px] mt-5 max-w-xs mx-auto leading-relaxed">
                  Your policy will be emailed to you within 24 hours after successful payment.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 pt-0">
          <Button
            variant="ghost"
            onClick={() => { setStep(Math.max(1, step - 1)); setPaymentFailed(false); }}
            disabled={step === 1}
            className="text-muted-foreground"
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back
          </Button>
          {step < 5 && (
            <Button
              onClick={() => setStep(Math.min(totalSteps, step + 1))}
              disabled={(step === 1 && !selectedPlan) || (step === 3 && !consent)}
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
