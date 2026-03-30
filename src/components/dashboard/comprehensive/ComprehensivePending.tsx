import { motion } from "framer-motion";
import { Clock, Mail, ArrowRight, FileSearch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ComprehensivePendingProps {
  onGoToDashboard: () => void;
  onSimulateReady: () => void;
}

const ComprehensivePending = ({ onGoToDashboard, onSimulateReady }: ComprehensivePendingProps) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
    className="py-8 lg:py-12 max-w-xl mx-auto"
  >
    <div className="card-surface !p-8 text-center">
      <div className="h-16 w-16 rounded-3xl bg-primary/10 flex items-center justify-center mx-auto mb-6">
        <FileSearch className="h-8 w-8 text-primary" strokeWidth={1.5} />
      </div>

      <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20 text-xs font-medium px-3 py-1 mb-4">
        <Clock className="h-3 w-3 mr-1.5" />
        Report In Progress
      </Badge>

      <h2 className="text-display text-xl lg:text-2xl mb-2">
        Your comprehensive report is being prepared
      </h2>
      <p className="text-body text-sm leading-relaxed mb-6 max-w-md mx-auto">
        We are processing deeper exposure intelligence across documents, leak records, and identity-linked breach data.
      </p>

      <div className="card-surface !p-4 !bg-secondary/30 !border-border/20 mb-6">
        <div className="flex items-center gap-3 justify-center">
          <Clock className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-body text-xs">
            Your comprehensive report will be ready within <span className="text-display text-xs">8 hours</span>
          </p>
        </div>
        <div className="flex items-center gap-3 justify-center mt-2">
          <Mail className="h-4 w-4 text-muted-foreground" strokeWidth={1.5} />
          <p className="text-body text-xs">
            We will notify you by email once it is available.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Button
          onClick={onGoToDashboard}
          variant="outline"
          className="rounded-xl px-5 text-sm font-semibold"
        >
          Go to Dashboard
        </Button>
        <Button
          onClick={onSimulateReady}
          className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl px-5 text-sm font-semibold"
        >
          Simulate Report Ready
          <ArrowRight className="ml-1.5 h-4 w-4" />
        </Button>
      </div>
    </div>
  </motion.div>
);

export default ComprehensivePending;
