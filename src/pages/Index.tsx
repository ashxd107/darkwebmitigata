import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HeroSection from "@/components/dashboard/HeroSection";
import MetricCards from "@/components/dashboard/MetricCards";
import ExposureSection from "@/components/dashboard/ExposureSection";
import LeakSources from "@/components/dashboard/LeakSources";
import AffectedWebsites from "@/components/dashboard/AffectedWebsites";
import Recommendations from "@/components/dashboard/Recommendations";
import InsurancePage from "@/components/dashboard/InsurancePage";
import StickyCTA from "@/components/dashboard/StickyCTA";
import InsuranceFlow from "@/components/dashboard/InsuranceFlow";

const Index = () => {
  const [activeItem, setActiveItem] = useState("overview");
  const [insuranceOpen, setInsuranceOpen] = useState(false);

  const handleInsuranceNav = () => {
    setActiveItem("insurance");
  };

  const renderContent = () => {
    switch (activeItem) {
      case "overview":
        return (
          <>
            <HeroSection onInsuranceClick={() => setInsuranceOpen(true)} />
            <div className="space-y-14 mt-10">
              <MetricCards />
              <ExposureSection />
              <LeakSources />
              <AffectedWebsites />
            </div>
          </>
        );
      case "exposure":
        return (
          <div className="py-8">
            <ExposureSection />
          </div>
        );
      case "leak-sources":
        return (
          <div className="py-8 space-y-14">
            <LeakSources />
            <AffectedWebsites />
          </div>
        );
      case "recommendations":
        return (
          <div className="py-8">
            <Recommendations />
          </div>
        );
      case "insurance":
        return (
          <div className="py-8">
            <InsurancePage onGetStarted={() => setInsuranceOpen(true)} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onInsuranceClick={handleInsuranceNav}
      />

      <main className="ml-[260px] px-8 lg:px-12 py-6 pb-32 max-w-[1200px]">
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
