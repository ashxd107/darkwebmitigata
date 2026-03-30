import DocumentsSection from "./DocumentsSection";
import CompLeakSources from "./CompLeakSources";
import PasswordsSection from "./PasswordsSection";
import TimelineSection from "./TimelineSection";

interface ComprehensiveReportProps {
  activeSection?: string;
}

const ComprehensiveReport = ({ activeSection = "comp-documents" }: ComprehensiveReportProps) => {
  const renderSection = () => {
    switch (activeSection) {
      case "comp-documents":
        return <DocumentsSection />;
      case "comp-leak-sources":
        return <CompLeakSources />;
      case "comp-passwords":
        return <PasswordsSection />;
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
