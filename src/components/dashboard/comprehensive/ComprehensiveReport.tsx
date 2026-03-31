import PersonalInfoSection from "./PersonalInfoSection";
import DocumentsSection from "./DocumentsSection";
import CompLeakSources from "./CompLeakSources";
import PasswordsSection from "./PasswordsSection";
import TimelineSection from "./TimelineSection";

interface ComprehensiveReportProps {
  activeSection?: string;
  isUnlocked?: boolean;
}

const ComprehensiveReport = ({ activeSection = "comp-documents", isUnlocked = true }: ComprehensiveReportProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case "comp-personal-info":
        return <PersonalInfoSection />;
      case "comp-documents":
        return <DocumentsSection />;
      case "comp-leak-sources":
        return <CompLeakSources isUnlocked={isUnlocked} />;
      case "comp-passwords":
        return <PasswordsSection isUnlocked={isUnlocked} />;
      case "comp-timeline":
        return <TimelineSection />;
      default:
        return <DocumentsSection />;
    }
  };

  return (
    <div className="py-4 lg:py-6">
      {renderSection()}
    </div>
  );
};

export default ComprehensiveReport;
