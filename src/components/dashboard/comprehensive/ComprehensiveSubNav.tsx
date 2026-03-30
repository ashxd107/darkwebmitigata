import { User, FileText, Database, Key, Clock } from "lucide-react";

const subNavItems = [
  { id: "personal-info", label: "Personal Info", icon: User },
  { id: "documents", label: "Documents", icon: FileText },
  { id: "comp-leak-sources", label: "Leak Sources", icon: Database },
  { id: "passwords", label: "Passwords", icon: Key },
  { id: "timeline", label: "Timeline", icon: Clock },
];

interface ComprehensiveSubNavProps {
  activeSection: string;
  onNavigate: (id: string) => void;
}

const ComprehensiveSubNav = ({ activeSection, onNavigate }: ComprehensiveSubNavProps) => (
  <div className="flex gap-1.5 overflow-x-auto pb-1 mb-5 scrollbar-hide">
    {subNavItems.map((item) => {
      const isActive = activeSection === item.id;
      return (
        <button
          key={item.id}
          onClick={() => onNavigate(item.id)}
          className={`
            flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-medium whitespace-nowrap transition-all duration-200
            ${isActive
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
            }
          `}
        >
          <item.icon className="h-3.5 w-3.5" strokeWidth={1.5} />
          {item.label}
        </button>
      );
    })}
  </div>
);

export default ComprehensiveSubNav;
