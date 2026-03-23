import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import OverviewDashboard from "@/components/dashboard/OverviewDashboard";
import ExposureSection from "@/components/dashboard/ExposureSection";
import LeakSources from "@/components/dashboard/LeakSources";
import AffectedWebsites from "@/components/dashboard/AffectedWebsites";
import Recommendations from "@/components/dashboard/Recommendations";
import InsurancePage from "@/components/dashboard/InsurancePage";
import CallAssistance from "@/components/dashboard/CallAssistance";
import StickyCTA from "@/components/dashboard/StickyCTA";
import InsuranceFlow from "@/components/dashboard/InsuranceFlow";

const Index = () => {
  const [activeItem, setActiveItem] = useState("overview");
  const [insuranceOpen, setInsuranceOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [riskScore, setRiskScore] = useState(82);

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return (
          <OverviewDashboard
            onInsuranceClick={() => setInsuranceOpen(true)}
            onNavigate={setActiveItem}
            riskScore={riskScore}
          />
        );
      case "exposure":
        return (
          <div className="py-4 lg:py-8">
            <ExposureSection />
          </div>
        );
      case "leak-sources":
        return (
          <div className="py-4 lg:py-8 space-y-8 lg:space-y-14">
            <LeakSources />
            <AffectedWebsites />
          </div>
        );
      case "recommendations":
        return (
          <div className="py-4 lg:py-8">
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
      />

      <main className="pt-16 lg:pt-0 lg:ml-[260px] px-4 sm:px-6 lg:px-8 xl:px-12 py-4 pb-24 max-w-[1200px]">
        {renderContent()}
      </main>

      {activeItem !== "insurance" && (
        <StickyCTA onClick={() => setInsuranceOpen(true)} />
      )}
      <InsuranceFlow open={insuranceOpen} onClose={() => setInsuranceOpen(false)} />
    </div>
  );
};

export default Index;
