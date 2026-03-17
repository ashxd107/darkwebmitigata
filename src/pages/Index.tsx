import { useState } from "react";
import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import HeroSection from "@/components/dashboard/HeroSection";
import MetricCards from "@/components/dashboard/MetricCards";
import ExposureSection from "@/components/dashboard/ExposureSection";
import LeakSources from "@/components/dashboard/LeakSources";
import AffectedWebsites from "@/components/dashboard/AffectedWebsites";
import Recommendations from "@/components/dashboard/Recommendations";
import StickyCTA from "@/components/dashboard/StickyCTA";
import InsuranceFlow from "@/components/dashboard/InsuranceFlow";

const Index = () => {
  const [activeItem, setActiveItem] = useState("overview");
  const [insuranceOpen, setInsuranceOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar
        activeItem={activeItem}
        onNavigate={setActiveItem}
        onInsuranceClick={() => setInsuranceOpen(true)}
      />

      <main className="ml-[260px] px-8 lg:px-12 py-6 pb-32 max-w-[1200px]">
        <HeroSection onInsuranceClick={() => setInsuranceOpen(true)} />

        <div className="space-y-12 mt-8">
          <MetricCards />
          <ExposureSection />
          <LeakSources />
          <AffectedWebsites />
          <Recommendations />
        </div>
      </main>

      <StickyCTA onClick={() => setInsuranceOpen(true)} />
      <InsuranceFlow open={insuranceOpen} onClose={() => setInsuranceOpen(false)} />
    </div>
  );
};

export default Index;
