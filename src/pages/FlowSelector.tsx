import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Shield, ShieldCheck, FileSearch, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import mitigataLogo from "@/assets/mitigata-logo.png";

const flows = [
  {
    id: "normal",
    title: "Normal User",
    subtitle: "Unlock for ₹49",
    description: "Free preview with limited data. Pay ₹49 to unlock the full data leak report with all breach sources and recommendations.",
    icon: Shield,
    route: "/dashboard/normal",
    badge: "Free Preview",
  },
  {
    id: "basic",
    title: "Cyber Insurance User",
    subtitle: "Basic Plan",
    description: "Full access to the standard data leak report. No payment required — included with your basic cyber insurance plan.",
    icon: ShieldCheck,
    route: "/dashboard/basic",
    badge: "Full Access",
  },
  {
    id: "comprehensive",
    title: "Cyber Insurance User",
    subtitle: "Comprehensive Plan",
    description: "Deep intelligence-grade exposure report with document analysis, password intelligence, and breach timeline. Report takes 8 hours to prepare.",
    icon: FileSearch,
    route: "/dashboard/comprehensive",
    badge: "Intelligence Report",
  },
];

const fadeIn = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } },
};

const FlowSelector = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b border-border/20 bg-card/80 backdrop-blur-md">
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center gap-3">
          <img src={mitigataLogo} alt="Mitigata" className="h-8 w-auto" />
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div variants={stagger} initial="hidden" animate="visible" className="max-w-4xl w-full">
          <motion.div variants={fadeIn} className="text-center mb-10">
            <p className="text-caps mb-2">Select Experience</p>
            <h1 className="text-display text-2xl lg:text-3xl mb-2">Choose your report flow</h1>
            <p className="text-body text-sm max-w-md mx-auto">
              Select a user type to preview the corresponding CyberGuard dashboard experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {flows.map((flow) => (
              <motion.div
                key={flow.id}
                variants={fadeIn}
                className="card-surface-hover !p-0 overflow-hidden cursor-pointer group"
                onClick={() => navigate(flow.route)}
              >
                <div className="p-6 flex flex-col h-full">
                  <div className="flex items-center justify-between mb-4">
                    <div className="h-11 w-11 rounded-2xl bg-primary/10 flex items-center justify-center">
                      <flow.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
                    </div>
                    <span className="text-[10px] font-medium text-primary bg-primary/10 rounded-full px-2.5 py-1">
                      {flow.badge}
                    </span>
                  </div>

                  <h3 className="text-display text-base mb-0.5">{flow.title}</h3>
                  <p className="text-primary text-xs font-semibold mb-3">{flow.subtitle}</p>
                  <p className="text-body text-xs leading-relaxed flex-1">{flow.description}</p>

                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-5 w-full justify-center text-xs font-semibold text-primary hover:bg-primary/10 rounded-xl group-hover:bg-primary/10 transition-colors"
                  >
                    Enter Dashboard
                    <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default FlowSelector;
