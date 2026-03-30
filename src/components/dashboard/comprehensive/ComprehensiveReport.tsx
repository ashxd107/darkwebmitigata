import { useState } from "react";
import ComprehensiveSubNav from "./ComprehensiveSubNav";
import PersonalInfoSection from "./PersonalInfoSection";
import DocumentsSection from "./DocumentsSection";
import CompLeakSources from "./CompLeakSources";
import PasswordsSection from "./PasswordsSection";
import TimelineSection from "./TimelineSection";

const ComprehensiveReport = () => {
  const [activeSection, setActiveSection] = useState("personal-info");

  const renderSection = () => {
    switch (activeSection) {
      case "personal-info":
        return <PersonalInfoSection />;
      case "documents":
        return <DocumentsSection />;
      case "comp-leak-sources":
        return <CompLeakSources />;
      case "passwords":
        return <PasswordsSection />;
      case "timeline":
        return <TimelineSection />;
      default:
        return <PersonalInfoSection />;
    }
  };

  return (
    <div className="py-4 lg:py-6">
      <ComprehensiveSubNav activeSection={activeSection} onNavigate={setActiveSection} />
      {renderSection()}
    </div>
  );
};

export default ComprehensiveReport;
