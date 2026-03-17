import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1], staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } }
};

interface HeroSectionProps {
  onInsuranceClick: () => void;
}

const HeroSection = ({ onInsuranceClick }: HeroSectionProps) => {
  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-12 gap-8 py-8"
    >
      <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 flex flex-col justify-center">
        <p className="text-caps mb-4">Personal Data Exposure Report</p>
        <h1 className="text-display text-4xl lg:text-5xl leading-tight" style={{ textWrap: "balance" as any }}>
          Your digital footprint has been compromised.
        </h1>
        <p className="text-body text-lg mt-4 max-w-2xl">
          We found your personal information across multiple breach sources.
          Immediate action is recommended to protect your accounts and identity.
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
        <div className="bg-foreground text-card p-8 rounded-[24px]">
          <ShieldAlert className="h-8 w-8 mb-4 text-primary" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold mb-2">Protect yourself</h3>
          <p className="text-sm opacity-70 mb-6 leading-relaxed">
            Get financial protection against fraud and identity theft with our cyber insurance.
          </p>
          <Button
            onClick={onInsuranceClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 w-fit font-semibold"
          >
            Get Cyber Insurance
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
