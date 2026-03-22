import { motion } from "framer-motion";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getRiskContent } from "@/lib/riskContent";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1, y: 0,
    transition: { duration: 0.6, ease: [0.2, 0.8, 0.2, 1] as const, staggerChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] as const } }
};

interface HeroSectionProps {
  onInsuranceClick: () => void;
  riskScore?: number;
}

const HeroSection = ({ onInsuranceClick, riskScore = 82 }: HeroSectionProps) => {
  const content = getRiskContent(riskScore);

  return (
    <motion.section
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-12 gap-8 py-8"
    >
      <motion.div variants={itemVariants} className="col-span-12 lg:col-span-8 flex flex-col justify-center">
        <div className="flex items-center gap-3 mb-5">
          <Badge variant="outline" className={`text-xs font-semibold px-3 py-1 ${content.badgeClass}`}>
            {content.badgeLabel}
          </Badge>
          <span className="text-body text-xs">{content.secondarySupportingLine}</span>
        </div>
        <h1 className="text-display text-4xl lg:text-5xl leading-tight" style={{ textWrap: "balance" as any }}>
          {content.headline}
        </h1>
        <p className="text-body text-lg mt-4 max-w-2xl leading-relaxed">
          {content.body}
        </p>
        <p className="text-body text-xs mt-6 opacity-60">
          {content.supportingLine}
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="col-span-12 lg:col-span-4">
        <div className="bg-foreground text-card p-8 rounded-[24px]">
          <ShieldAlert className="h-8 w-8 mb-4 text-primary" strokeWidth={1.5} />
          <h3 className="text-lg font-semibold mb-2">{content.ctaCardTitle}</h3>
          <p className="text-sm opacity-70 mb-6 leading-relaxed">
            {content.ctaCardBody}
          </p>
          <Button
            onClick={onInsuranceClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-6 w-fit font-semibold"
          >
            {content.ctaLabel}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </motion.div>
    </motion.section>
  );
};

export default HeroSection;
