import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import {
  User, Users, ArrowRight, ArrowLeft, Check, ShieldCheck,
  CreditCard, X, Plus, Trash2, AlertCircle, CalendarIcon,
} from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface InsuranceFlowProps {
  open: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

type MemberRelation = "Self" | "Spouse" | "Child";

interface FamilyMember {
  id: string;
  relation: MemberRelation;
  name: string;
  email: string;
  phone: string;
  dob: Date | undefined;
  address: string;
}

type SumInsured = 50000 | 100000;

const pricing: Record<string, Record<SumInsured, string>> = {
  individual: { 50000: "₹1,499", 100000: "₹2,999" },
  family: { 50000: "₹3,499", 100000: "₹5,999" },
};

const formatSumInsured = (v: SumInsured) => (v === 50000 ? "₹50,000" : "₹1,00,000");

const plans = [
  {
    id: "individual",
    title: "Individual",
    icon: User,
    features: [],
  },
  {
    id: "family",
    title: "Family",
    icon: Users,
    features: [],
  },
];

const coverageItems = [
  {
    title: "Card Fraud Protection",
    description: "Protection against unauthorized or fraudulent use of your debit or credit card.",
    insurer: "Protection / Card Security Cover",
  },
  {
    title: "Online Payment Protection",
    description: "Protection against digital theft of funds during UPI, net banking, and other online payment transactions.",
    insurer: "Digital Transaction Protection / UPI & Netbanking Protection",
  },
  {
    title: "Wallet Fraud Protection",
    description: "Protection against misuse or fraudulent loss involving digital wallets.",
    insurer: "Digital Wallet Security / Wallet Loss Protection",
  },
  {
    title: "Third-Party App Transactions Covered",
    description: "Protection for eligible fraudulent transactions through third-party or NPCI-linked apps.",
    insurer: "Protection on Partner Apps / NPCI App Protection",
  },
];

const createMember = (relation: MemberRelation): FamilyMember => ({
  id: crypto.randomUUID(),
  relation,
  name: "",
  email: "",
  phone: "",
  dob: undefined,
  address: "",
});

const stepVariants = {
  enter: { opacity: 0, x: 40 },
  center: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, x: -40, transition: { duration: 0.3 } },
};

const InsuranceFlow = ({ open, onClose, onSuccess }: InsuranceFlowProps) => {
  const [step, setStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [sumInsured, setSumInsured] = useState<SumInsured>(50000);
  const [members, setMembers] = useState<FamilyMember[]>([createMember("Self")]);
  const [consent, setConsent] = useState(false);
  const [paymentFailed, setPaymentFailed] = useState(false);

  const totalSteps = 5;
  const selectedPlanData = plans.find((p) => p.id === selectedPlan);
  const currentPrice = selectedPlan ? pricing[selectedPlan]?.[sumInsured] : "";
  const currentPriceRaw = currentPrice ? `${currentPrice} / year` : "";

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
    if (planId === "individual") {
      setMembers([createMember("Self")]);
    } else if (planId === "family" && members.length === 1) {
      setMembers([members[0]]);
    }
  };

  const updateMember = (id: string, field: keyof FamilyMember, value: string | Date | undefined) => {
    setMembers((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const addMember = (relation: MemberRelation) => {
    if (members.length >= 3) return;
    setMembers((prev) => [...prev, createMember(relation)]);
  };

  const removeMember = (id: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
  };

  const hasSpouse = members.some((m) => m.relation === "Spouse");
  const hasChild = members.some((m) => m.relation === "Child");

  const handlePayAttempt = () => {
    if (onSuccess) {
      handleClose();
      onSuccess();
    } else {
      setPaymentFailed(true);
    }
  };

  const handleClose = () => {
    onClose();
    setStep(1);
    setSelectedPlan(null);
    setSumInsured(50000);
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
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-foreground/20 backdrop-blur-sm sm:p-4"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const }}
        className="bg-card rounded-t-[24px] sm:rounded-[24px] w-full sm:max-w-2xl max-h-[95vh] sm:max-h-[90vh] overflow-y-auto"
        style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.12)" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 sm:p-6 pb-0">
          <div>
            <p className="text-caps mb-1">Cyber Insurance</p>
            <h2 className="text-display text-lg sm:text-xl">
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
        <div className="flex gap-1.5 px-4 sm:px-6 pt-4">
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
        <div className="p-4 sm:p-6 min-h-[300px]">
          <AnimatePresence mode="wait">
            {/* STEP 1: Plan Selection */}
            {step === 1 && (
              <motion.div key="step1" variants={stepVariants} initial="enter" animate="center" exit="exit" className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                    <p className="text-body text-xs mt-1">Starting from {pricing[plan.id][50000]} / year</p>
                  </motion.button>
                ))}
              </motion.div>
            )}

            {/* STEP 2: Coverage Details + Sum Insured */}
            {step === 2 && selectedPlanData && (
              <motion.div key="step2" variants={stepVariants} initial="enter" animate="center" exit="exit" className="space-y-6">
                <div>
                  <p className="text-display text-sm mb-3">Choose Sum Insured</p>
                  <div className="grid grid-cols-2 gap-3">
                    {([50000, 100000] as SumInsured[]).map((val) => (
                      <button
                        key={val}
                        onClick={() => setSumInsured(val)}
                        className={`rounded-xl border px-4 py-3 text-left transition-all duration-200 ${
                          sumInsured === val
                            ? "ring-2 ring-primary border-primary/30 bg-primary/5"
                            : "border-border bg-card hover:border-primary/20"
                        }`}
                      >
                        <span className="text-display text-base sm:text-lg">{formatSumInsured(val)}</span>
                        <p className="text-body text-xs mt-0.5">
                          Premium: {pricing[selectedPlanData.id][val]} / year
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="card-surface">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                      <selectedPlanData.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <div>
                      <h3 className="text-display text-sm">{selectedPlanData.title} Plan</h3>
                      <p className="text-body text-xs">{currentPriceRaw}</p>
                    </div>
                  </div>
                  <p className="text-caps mb-3">Coverage Included</p>
                  <ul className="space-y-4">
                    {coverageItems.map((item) => (
                      <li key={item.title} className="space-y-0.5">
                        <div className="flex items-start gap-3">
                          <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="h-3 w-3 text-primary" strokeWidth={2} />
                          </div>
                          <div>
                            <span className="text-display text-sm block">{item.title}</span>
                            <span className="text-body text-xs leading-relaxed block mt-0.5">{item.description}</span>
                            <span className="text-muted-foreground text-[10px] italic block mt-0.5">{item.insurer}</span>
                          </div>
                        </div>
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

                    {/* Row 1: Name + DOB */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Full Name</Label>
                        <Input
                          value={member.name}
                          onChange={(e) => updateMember(member.id, "name", e.target.value)}
                          placeholder="Full name"
                          className="rounded-xl h-10 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Date of Birth</Label>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              className={cn(
                                "w-full justify-start text-left font-normal rounded-xl h-10 text-sm",
                                !member.dob && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {member.dob ? format(member.dob, "dd MMM yyyy") : <span>Select date</span>}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={member.dob}
                              onSelect={(date) => updateMember(member.id, "dob", date)}
                              disabled={(date) =>
                                date > new Date() || date < new Date("1900-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    {/* Row 2: Phone + Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Phone Number</Label>
                        <Input
                          value={member.phone}
                          onChange={(e) => updateMember(member.id, "phone", e.target.value)}
                          placeholder="+91 98765 43210"
                          className="rounded-xl h-10 text-sm"
                        />
                      </div>
                      <div>
                        <Label className="text-body text-[11px] mb-1 block">Email</Label>
                        <Input
                          type="email"
                          value={member.email}
                          onChange={(e) => updateMember(member.id, "email", e.target.value)}
                          placeholder="email@example.com"
                          className="rounded-xl h-10 text-sm"
                        />
                      </div>
                    </div>

                    {/* Row 3: Address */}
                    <div>
                      <Label className="text-body text-[11px] mb-1 block">Address</Label>
                      <Textarea
                        value={member.address}
                        onChange={(e) => updateMember(member.id, "address", e.target.value)}
                        placeholder="Full address"
                        className="rounded-xl text-sm min-h-[60px] resize-none"
                        rows={2}
                      />
                    </div>
                  </div>
                ))}

                {/* Add family members (only for family plan, max 3) */}
                {selectedPlan === "family" && members.length < 3 && (
                  <div className="flex flex-wrap gap-2">
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
                    {!hasChild && (
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
                    I confirm that I have read and agree to the{" "}
                    <a
                      href="https://mitigata.com/terms"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary underline underline-offset-2 hover:text-primary/80"
                    >
                      policy terms and conditions
                    </a>
                    .
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
                    <span className="text-body text-sm">Sum Insured</span>
                    <span className="text-display text-sm">{formatSumInsured(sumInsured)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Annual Premium</span>
                    <span className="text-display text-sm">{currentPriceRaw}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Members Covered</span>
                    <span className="text-display text-sm">{members.length}</span>
                  </div>

                  {/* Member list */}
                  <div className="space-y-3 pb-4 border-b border-border/50">
                    <span className="text-body text-sm block">Insured Members</span>
                    {members.map((m) => (
                      <div key={m.id} className="flex items-center justify-between pl-3 gap-2">
                        <div className="min-w-0">
                          <span className="text-display text-xs block">{m.name || "—"}</span>
                          {m.dob && (
                            <span className="text-body text-[10px]">DOB: {format(m.dob, "dd MMM yyyy")}</span>
                          )}
                        </div>
                        <Badge variant="outline" className="text-[9px] font-medium bg-secondary/50 shrink-0">
                          {m.relation}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pb-4 border-b border-border/50">
                    <span className="text-body text-sm">Consent</span>
                    <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs">
                      <Check className="h-3 w-3 mr-1" /> Accepted
                    </Badge>
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
              <motion.div key="step5" variants={stepVariants} initial="enter" animate="center" exit="exit" className="text-center py-4 sm:py-8">
                <div className="h-16 w-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <CreditCard className="h-8 w-8 text-primary" strokeWidth={1.5} />
                </div>
                <h3 className="text-display text-lg sm:text-xl mb-2">Complete your purchase</h3>
                <p className="text-body text-sm mb-1">
                  {selectedPlanData.title} Plan · Sum Insured: <span className="text-display">{formatSumInsured(sumInsured)}</span>
                </p>
                <p className="text-body text-sm mb-2">
                  Total premium: <span className="text-display">{currentPriceRaw}</span>
                </p>
                <p className="text-body text-[11px] mb-6">
                  {members.length} member{members.length > 1 ? "s" : ""} covered under {selectedPlanData.title} plan
                </p>

                {paymentFailed && (
                  <div className="flex items-start gap-2 justify-center bg-destructive/10 text-destructive rounded-xl px-4 py-3 mb-6 text-sm max-w-sm mx-auto text-left">
                    <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                    <span>Payment failed. Please try again or contact <strong>contact@mitigata.com</strong> for support.</span>
                  </div>
                )}

                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 sm:px-8 py-3 h-auto font-semibold text-base w-full sm:w-fit mx-auto"
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
        <div className="flex items-center justify-between p-4 sm:p-6 pt-0">
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
