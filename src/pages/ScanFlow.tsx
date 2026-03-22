import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Phone, Mail, FileText, ArrowLeft, ShieldCheck, CheckCircle2, Loader2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate } from "react-router-dom";
import mitigataLogo from "@/assets/mitigata-logo.png";

const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.25 } },
};

const STEPS = ["Details", "OTP Verification", "Scanning"];

interface FormData {
  fullName: string;
  phone: string;
  email: string;
  policyId: string;
}

const scanStages = [
  "Verifying identity",
  "Checking leak sources",
  "Reviewing exposed credentials",
  "Preparing your dashboard",
];

const Stepper = ({ current }: { current: number }) => (
  <div className="flex items-center gap-1 sm:gap-2 mb-8 sm:mb-10 bg-secondary/50 rounded-2xl p-2 sm:p-2.5">
    {STEPS.map((label, i) => (
      <div key={label} className="flex items-center gap-1 sm:gap-2 flex-1">
        <div
          className={`flex items-center gap-2 px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-all duration-300 flex-1 justify-center ${
            i === current
              ? "bg-card shadow-sm border border-border/50"
              : i < current
              ? "bg-primary/10"
              : ""
          }`}
        >
          <div
            className={`h-6 w-6 rounded-full flex items-center justify-center text-[11px] font-bold shrink-0 ${
              i < current
                ? "bg-primary text-primary-foreground"
                : i === current
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            }`}
          >
            {i < current ? <CheckCircle2 className="h-3.5 w-3.5" /> : i + 1}
          </div>
          <span
            className={`text-xs font-semibold hidden sm:inline ${
              i <= current ? "text-foreground" : "text-muted-foreground"
            }`}
          >
            {label}
          </span>
        </div>
      </div>
    ))}
  </div>
);

const DetailsStep = ({
  form,
  setForm,
  onSubmit,
}: {
  form: FormData;
  setForm: (f: FormData) => void;
  onSubmit: () => void;
}) => (
  <motion.div key="details" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
    <h1 className="text-display text-xl sm:text-2xl mb-1.5">Start your free scan</h1>
    <p className="text-body text-sm mb-2">We'll verify your details before starting the scan.</p>
    <p className="text-xs text-muted-foreground mb-6">
      Your Request ID will be sent to your registered email address.
    </p>

    <div className="card-surface p-4 sm:p-5 mb-6 border-l-2 border-primary/40">
      <div className="flex items-start gap-2.5">
        <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
        <div>
          <p className="text-sm font-medium text-foreground">Identity Protection Active</p>
          <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
            Enter your details to start the verification process. We scan breach and exposure sources linked to your information.
          </p>
        </div>
      </div>
    </div>

    <div className="space-y-4">
      <div>
        <label className="text-xs font-medium text-foreground mb-1.5 block">Full Name</label>
        <div className="relative">
          <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Enter your full name"
            value={form.fullName}
            onChange={(e) => setForm({ ...form, fullName: e.target.value })}
            className="pl-9 h-11 rounded-xl bg-secondary/40 border-border/40 focus:bg-card"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-1.5 block">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="98765 43210"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="pl-9 h-11 rounded-xl bg-secondary/40 border-border/40 focus:bg-card"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-1.5 block">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="email"
            placeholder="you@example.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="pl-9 h-11 rounded-xl bg-secondary/40 border-border/40 focus:bg-card"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-foreground mb-1.5 block">Policy ID</label>
        <div className="relative">
          <FileText className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="e.g. MIT-2026-XXXXX"
            value={form.policyId}
            onChange={(e) => setForm({ ...form, policyId: e.target.value })}
            className="pl-9 h-11 rounded-xl bg-secondary/40 border-border/40 focus:bg-card"
          />
        </div>
      </div>
    </div>

    <Button
      onClick={onSubmit}
      disabled={!form.fullName || !form.phone || !form.email || !form.policyId}
      className="w-full h-12 rounded-xl mt-6 text-sm font-semibold"
    >
      Send Verification Code
    </Button>

    <p className="text-[11px] text-muted-foreground text-center mt-4 leading-relaxed">
      By continuing, you agree to our{" "}
      <a href="#" className="underline hover:text-foreground">Terms of Service</a> and{" "}
      <a href="#" className="underline hover:text-foreground">Privacy Policy</a>.
    </p>
  </motion.div>
);

const OTPStep = ({
  otp,
  setOtp,
  email,
  onVerify,
  onBack,
  error,
  onResend,
}: {
  otp: string;
  setOtp: (v: string) => void;
  email: string;
  onVerify: () => void;
  onBack: () => void;
  error: string;
  onResend: () => void;
}) => {
  const masked = email.replace(/(.{2})(.*)(@.*)/, "$1****$3");
  return (
    <motion.div key="otp" variants={fadeIn} initial="hidden" animate="visible" exit="exit">
      <h1 className="text-display text-xl sm:text-2xl mb-1.5">Verify your code</h1>
      <p className="text-body text-sm mb-1">
        Enter the one-time verification code sent to your registered contact method.
      </p>
      <p className="text-xs text-muted-foreground mb-6">
        Code sent to <span className="font-medium text-foreground">{masked}</span>
      </p>

      <div className="card-surface p-4 sm:p-5 mb-6 border-l-2 border-primary/40">
        <div className="flex items-start gap-2.5">
          <ShieldCheck className="h-4 w-4 text-primary mt-0.5 shrink-0" />
          <div>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Your Request ID was sent to your registered email address.
            </p>
          </div>
        </div>
      </div>

      <div className="flex justify-center mb-6">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <InputOTPSlot
                key={i}
                index={i}
                className="h-12 w-11 sm:h-14 sm:w-12 rounded-xl border-border/60 text-lg font-semibold"
              />
            ))}
          </InputOTPGroup>
        </InputOTP>
      </div>

      {error && (
        <p className="text-xs text-destructive text-center mb-4">{error}</p>
      )}

      <div className="flex items-center justify-center gap-4 mb-6 text-xs">
        <button onClick={onResend} className="text-primary font-medium hover:underline flex items-center gap-1">
          <RefreshCw className="h-3 w-3" /> Resend code
        </button>
        <button onClick={onBack} className="text-muted-foreground hover:text-foreground">
          Change details
        </button>
      </div>

      <Button
        onClick={onVerify}
        disabled={otp.length < 6}
        className="w-full h-12 rounded-xl text-sm font-semibold"
      >
        Verify & Continue
      </Button>

      <Button variant="ghost" onClick={onBack} className="w-full mt-2 text-sm text-muted-foreground">
        <ArrowLeft className="h-4 w-4 mr-1" /> Back
      </Button>
    </motion.div>
  );
};

const ScanningStep = ({ onComplete }: { onComplete: () => void }) => {
  const [activeStage, setActiveStage] = useState(0);
  const [completed, setCompleted] = useState(false);

  useState; // just to keep hook order
  // Use effect to animate stages
  const startScan = () => {
    let stage = 0;
    const interval = setInterval(() => {
      stage++;
      if (stage >= scanStages.length) {
        clearInterval(interval);
        setCompleted(true);
        setTimeout(onComplete, 1200);
      } else {
        setActiveStage(stage);
      }
    }, 1500);
    return () => clearInterval(interval);
  };

  // Start on mount
  const [started, setStarted] = useState(false);
  if (!started) {
    setStarted(true);
    setTimeout(() => startScan(), 300);
  }

  return (
    <motion.div key="scanning" variants={fadeIn} initial="hidden" animate="visible" exit="exit" className="text-center">
      <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 mb-8">
        {/* Outer pulsing ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-primary/20"
          animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute inset-2 rounded-full border-2 border-primary/30"
          animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
        />
        {/* Center circle */}
        <div className="absolute inset-4 rounded-full bg-primary/10 flex items-center justify-center">
          {completed ? (
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}>
              <CheckCircle2 className="h-10 w-10 text-primary" />
            </motion.div>
          ) : (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="h-10 w-10 text-primary" />
            </motion.div>
          )}
        </div>
      </div>

      <h1 className="text-display text-xl sm:text-2xl mb-1.5">
        {completed ? "Scan complete" : "Scanning for exposed data"}
      </h1>
      <p className="text-body text-sm mb-8">
        {completed
          ? "Your exposure report is ready."
          : "We're checking breach, leak, and exposure sources linked to your information."}
      </p>

      <div className="max-w-sm mx-auto space-y-3 text-left">
        {scanStages.map((stage, i) => (
          <motion.div
            key={stage}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="flex items-center gap-3"
          >
            <div className="shrink-0">
              {i < activeStage || completed ? (
                <CheckCircle2 className="h-4.5 w-4.5 text-primary" />
              ) : i === activeStage && !completed ? (
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}>
                  <Loader2 className="h-4.5 w-4.5 text-primary" />
                </motion.div>
              ) : (
                <div className="h-4.5 w-4.5 rounded-full border border-border" />
              )}
            </div>
            <span
              className={`text-sm ${
                i <= activeStage || completed
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              }`}
            >
              {stage}
            </span>
          </motion.div>
        ))}
      </div>

      {!completed && (
        <p className="text-xs text-muted-foreground mt-8">This may take a few moments.</p>
      )}
    </motion.div>
  );
};

const ScanFlow = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormData>({ fullName: "", phone: "", email: "", policyId: "" });
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");

  const handleSendOtp = () => {
    setStep(1);
  };

  const handleVerify = () => {
    // Simulate OTP check — accept any 6-digit code for now
    if (otp === "000000") {
      setOtpError("Invalid or expired code. Please try again.");
      return;
    }
    setOtpError("");
    setStep(2);
  };

  const handleScanComplete = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row">
      {/* Left brand panel — subtle, not dark */}
      <div className="lg:w-[340px] xl:w-[380px] shrink-0 bg-card border-r border-border/30 p-6 sm:p-8 lg:p-10 flex flex-col">
        <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto mb-8 lg:mb-12" />

        <div className="hidden lg:block flex-1">
          <h2 className="text-display text-lg mb-2">Check if your personal details are exposed</h2>
          <p className="text-body text-sm mb-8">
            Your personal data can be misused without you knowing.
          </p>

          <div className="space-y-5">
            {[
              { num: "01", label: "Identity Verification", desc: "Verify your identity securely" },
              { num: "02", label: "Breach Scanning", desc: "We check known leak and breach sources" },
              { num: "03", label: "Exposure Report", desc: "Get a detailed exposure dashboard" },
            ].map((item) => (
              <div key={item.num} className="flex items-start gap-3">
                <span className="text-caps text-primary font-semibold">{item.num}</span>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-muted-foreground mt-auto pt-6 hidden lg:block">
          Your data is encrypted end-to-end and never shared with third parties.
        </p>
      </div>

      {/* Main content */}
      <div className="flex-1 flex items-start lg:items-center justify-center p-4 sm:p-6 lg:p-10">
        <div className="w-full max-w-md">
          <Stepper current={step} />

          <AnimatePresence mode="wait">
            {step === 0 && (
              <DetailsStep form={form} setForm={setForm} onSubmit={handleSendOtp} />
            )}
            {step === 1 && (
              <OTPStep
                otp={otp}
                setOtp={setOtp}
                email={form.email}
                onVerify={handleVerify}
                onBack={() => { setStep(0); setOtp(""); setOtpError(""); }}
                error={otpError}
                onResend={() => { setOtp(""); setOtpError(""); }}
              />
            )}
            {step === 2 && <ScanningStep onComplete={handleScanComplete} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ScanFlow;
