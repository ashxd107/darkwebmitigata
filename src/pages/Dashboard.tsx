import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import ExposureSection from "@/components/dashboard/ExposureSection";
import LeakSources from "@/components/dashboard/LeakSources";
import Recommendations from "@/components/dashboard/Recommendations";
import InsurancePage from "@/components/dashboard/InsurancePage";
import CallAssistance from "@/components/dashboard/CallAssistance";
import StickyCTA from "@/components/dashboard/StickyCTA";
import InsuranceFlow from "@/components/dashboard/InsuranceFlow";
import InsuranceSuccess from "@/components/dashboard/InsuranceSuccess";
import LockedOverlay from "@/components/dashboard/LockedOverlay";
import UnlockPaymentModal from "@/components/dashboard/UnlockPaymentModal";
import ComprehensivePending from "@/components/dashboard/comprehensive/ComprehensivePending";
import ComprehensiveReport from "@/components/dashboard/comprehensive/ComprehensiveReport";
import type { FlowType, ComprehensiveStatus } from "@/types/flow";

const Dashboard = () => {
  const { flow } = useParams<{ flow: string }>();
  const flowType: FlowType = (flow === "basic" || flow === "comprehensive") ? flow : "normal";

  const [activeItem, setActiveItem] = useState("overview");
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [riskScore, setRiskScore] = useState(82);
  const [insuranceSuccess, setInsuranceSuccess] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Normal flow: unlock state
  const [isUnlocked, setIsUnlocked] = useState(flowType === "basic");

  // Comprehensive flow: report status
  const [compStatus, setCompStatus] = useState<ComprehensiveStatus>("pending");

  const handleUnlock = () => {
    if (flowType === "normal") {
      setPaymentModalOpen(true);
    }
  };

  const handlePaymentSuccess = () => {
    setPaymentModalOpen(false);
    setIsUnlocked(true);
  };

  const handleInsuranceComplete = () => {
    setInsuranceOpen(false);
    setInsuranceSuccess(true);
    setActiveItem("insurance-success");
  };

  const renderContent = () => {
    if (activeItem === "insurance-success" && insuranceSuccess) {
      return (
        <div className="py-4 lg:py-8">
          <InsuranceSuccess onGoToDashboard={() => { setActiveItem("overview"); setInsuranceSuccess(false); }} />
        </div>
      );
    }

    // Comprehensive report section
    if (activeItem === "comprehensive-report" && flowType === "comprehensive") {
      if (compStatus === "pending") {
        return (
          <ComprehensivePending
            onGoToDashboard={() => setActiveItem("overview")}
            onSimulateReady={() => setCompStatus("ready")}
          />
        );
      }
      return <ComprehensiveReport />;
    }

    switch (activeItem) {
      case "overview":
        return (
          <OverviewDashboard
            onInsuranceClick={() => setInsuranceOpen(true)}
            onNavigate={setActiveItem}
            riskScore={riskScore}
            isUnlocked={isUnlocked}
            onUnlock={handleUnlock}
          />
        );
      case "exposure":
        return (
          <div className="py-4 lg:py-8">
            <ExposureSection isUnlocked={isUnlocked} onUnlock={handleUnlock} />
          </div>
        );
      case "leak-sources":
        return (
          <div className="py-4 lg:py-8">
            <LeakSources isUnlocked={isUnlocked} onUnlock={handleUnlock} />
          </div>
        );
      case "recommendations":
        return (
          <div className="py-4 lg:py-8 relative">
            {!isUnlocked && flowType === "normal" && <LockedOverlay onUnlock={handleUnlock} />}
            <Recommendations />
          </div>
        );
      case "call-assistance":
        return <CallAssistance />;
      case "insurance":
        return (
          <div className="py-4 lg:py-8">
            <InsurancePage onGetStarted={() => setInsuranceOpen(true)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <MobileHeader onMenuClick={() => setMobileMenuOpen(true)} />
      <DashboardSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onInsuranceClick={() => setActiveItem("insurance")}
        mobileOpen={mobileMenuOpen}
        onMobileClose={() => setMobileMenuOpen(false)}
        riskScore={riskScore}
        onRiskScoreChange={setRiskScore}
        flowType={flowType}
        compStatus={flowType === "comprehensive" ? compStatus : undefined}
      />

      <main className="pt-16 lg:pt-0 lg:ml-[260px] px-4 sm:px-6 lg:px-8 xl:px-12 py-4 pb-24 max-w-[1200px]">
        {renderContent()}
      </main>

      {activeItem !== "insurance" && activeItem !== "insurance-success" && (
        <StickyCTA onClick={() => setInsuranceOpen(true)} />
      )}
      <InsuranceFlow open={insuranceOpen} onClose={() => setInsuranceOpen(false)} onSuccess={handleInsuranceComplete} />
      {flowType === "normal" && (
        <UnlockPaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} onSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default Dashboard;
