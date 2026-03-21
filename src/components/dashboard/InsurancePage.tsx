import { motion } from "framer-motion";
import { ShieldCheck, Check, User, Users, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface InsurancePageProps {
  onGetStarted: () => void;
}

const coverageItems = [
  {
    title: "Card Fraud Protection",
    description: "Protection against unauthorized or fraudulent card use",
  },
  {
    title: "Online Payment Protection",
    description: "Protection against digital theft of funds during UPI, net banking, and online transactions",
  },
  {
    title: "Wallet Fraud Protection",
    description: "Protection against misuse or fraudulent loss involving digital wallets",
  },
  {
    title: "Third-Party App Transactions",
    description: "Protection for eligible fraudulent transactions through third-party or NPCI-linked apps",
  },
];

const plans = [
  {
    id: "individual",
    title: "Individual",
    price: "₹1,499",
    period: " / year",
    icon: User,
    features: coverageItems.map(c => c.title),
  },
  {
    id: "family",
    title: "Family",
    price: "₹3,499",
    period: " / year",
    icon: Users,
    popular: true,
    features: ["Covers up to 3 members", ...coverageItems.map(c => c.title)],
  },
];

const InsurancePage = ({ onGetStarted }: InsurancePageProps) => {
  return (
    <div className="space-y-10 lg:space-y-16">
      {/* Why section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-surface bg-foreground text-card p-6 sm:p-10 rounded-[20px] sm:rounded-[24px]">
          <div className="flex items-center gap-3 mb-4">
            <ShieldCheck className="h-6 sm:h-7 w-6 sm:w-7 text-primary" strokeWidth={1.5} />
            <Badge variant="outline" className="bg-primary/20 text-primary border-primary/30 text-xs font-medium">
              Recommended
            </Badge>
          </div>
          <h2 className="text-xl sm:text-2xl font-semibold mb-3">Why you need cyber insurance</h2>
          <p className="text-sm sm:text-base opacity-70 leading-relaxed max-w-2xl">
            Your exposed data — including passwords, session tokens, and personal information — significantly
            increases your risk of fraud, identity theft, and financial loss. Cyber insurance provides a
            financial safety net when prevention isn't enough.
          </p>
        </div>
      </motion.section>

      {/* Plans */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <p className="text-caps mb-2">Plans</p>
        <h2 className="text-display text-xl sm:text-2xl mb-6 sm:mb-8">Choose your coverage</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
          {plans.map((plan) => (
            <motion.div
              key={plan.id}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className={`card-surface flex flex-col relative ${plan.popular ? "ring-2 ring-primary border-primary/20" : ""}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-6">
                  <Badge className="bg-primary text-primary-foreground border-0 text-xs font-medium px-3">
                    Most Popular
                  </Badge>
                </div>
              )}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <plan.icon className="h-6 w-6 text-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="text-display text-lg">{plan.title}</h3>
                  <p className="text-body text-xs">Protection plan</p>
                </div>
              </div>

              <div className="mb-6">
                <span className="text-display text-2xl sm:text-3xl">{plan.price}</span>
                <span className="text-body text-sm">{plan.period}</span>
              </div>

              <ul className="space-y-3 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-center gap-3">
                    <div className="h-5 w-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Check className="h-3 w-3 text-primary" strokeWidth={2.5} />
                    </div>
                    <span className="text-body text-sm">{f}</span>
                  </li>
                ))}
              </ul>

              <Button
                onClick={onGetStarted}
                className="mt-8 bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 font-semibold w-full"
              >
                Continue to secure checkout
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
};

export default InsurancePage;
