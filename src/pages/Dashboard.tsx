import { useState } from "react";
import { useParams } from "react-router-dom";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import ExposureSection from "@/components/dashboard/ExposureSection";
import Recommendations from "@/components/dashboard/Recommendations";
import CallAssistance from "@/components/dashboard/CallAssistance";
import InsurancePage from "@/components/dashboard/InsurancePage";
import StickyCTA from "@/components/dashboard/StickyCTA";
import InsuranceFlow from "@/components/dashboard/InsuranceFlow";
import InsuranceSuccess from "@/components/dashboard/InsuranceSuccess";
import LockedOverlay from "@/components/dashboard/LockedOverlay";
import UnlockPaymentModal from "@/components/dashboard/UnlockPaymentModal";
import ComprehensiveReport from "@/components/dashboard/comprehensive/ComprehensiveReport";
import type { FlowType } from "@/types/flow";

const Dashboard = () => {
  const { flow } = useParams<{ flow: string }>();
  const flowType: FlowType = flow === "policy" ? "policy" : "free";

  const [activeItem, setActiveItem] = useState("overview");
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [riskScore, setRiskScore] = useState(82);
  const [insuranceSuccess, setInsuranceSuccess] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);

  // Policy users get full access. Free users must pay to unlock.
  const [isUnlocked, setIsUnlocked] = useState(flowType === "policy");

  const handleUnlock = () => {
    if (!isUnlocked) {
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
  };

  const renderContent = () => {

    // Comprehensive report sections (main or sub-nav items)
    if (activeItem === "comprehensive-report" || activeItem.startsWith("comp-")) {
      if (!isUnlocked) {
        // Free user: show locked comprehensive report with limited preview
        return (
          <div className="py-4 lg:py-8 relative">
            <LockedOverlay onUnlock={handleUnlock} />
            <ComprehensiveReport activeSection={activeItem === "comprehensive-report" ? "comp-documents" : activeItem} isUnlocked={false} />
          </div>
        );
      }
      return <ComprehensiveReport activeSection={activeItem === "comprehensive-report" ? "comp-documents" : activeItem} isUnlocked={true} />;
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
            flowType={flowType}
          />
        );
      case "exposure":
        return (
          <div className="py-4 lg:py-8">
            <ExposureSection isUnlocked={isUnlocked} onUnlock={handleUnlock} />
          </div>
        );
      case "recommendations":
        return (
          <div className="py-4 lg:py-8 relative">
            {!isUnlocked && <LockedOverlay onUnlock={handleUnlock} />}
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
        isUnlocked={isUnlocked}
      />

      <main className="pt-16 lg:pt-0 lg:ml-[260px] px-4 sm:px-6 lg:px-8 xl:px-12 py-4 pb-24 max-w-[1200px]">
        {renderContent()}
      </main>

      {activeItem !== "insurance" && activeItem !== "insurance-success" && (
        <StickyCTA onClick={() => setInsuranceOpen(true)} />
      )}
      <InsuranceFlow open={insuranceOpen} onClose={() => setInsuranceOpen(false)} onSuccess={handleInsuranceComplete} />
      {!isUnlocked && (
        <UnlockPaymentModal open={paymentModalOpen} onClose={() => setPaymentModalOpen(false)} onSuccess={handlePaymentSuccess} />
      )}
    </div>
  );
};

export default Dashboard;
