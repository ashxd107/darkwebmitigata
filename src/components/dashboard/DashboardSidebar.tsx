import { Eye, Database, Lightbulb, LayoutDashboard } from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "exposure", label: "Exposure", icon: Eye },
  { id: "leak-sources", label: "Leak Sources", icon: Database },
  { id: "recommendations", label: "Recommendations", icon: Lightbulb },
];

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (id: string) => void;
  onInsuranceClick: () => void;
}

const DashboardSidebar = ({ activeItem, onNavigate, onInsuranceClick }: DashboardSidebarProps) => {
  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border/20 flex flex-col z-40">
      <div className="p-6 pb-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <span className="text-display text-lg">Mitigata</span>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4">
        <p className="text-caps px-3 mb-3">Menu</p>
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm
                    transition-all duration-200
                    ${isActive
                      ? "bg-primary/8 text-foreground font-semibold shadow-[inset_0_1px_2px_rgba(4,219,127,0.08)]"
                      : "text-muted-foreground font-medium hover:bg-secondary/60 hover:text-foreground"
                    }
                  `}
                >
                  <item.icon
                    className={`h-[18px] w-[18px] shrink-0 ${isActive ? "text-primary" : ""}`}
                    strokeWidth={isActive ? 2 : 1.5}
                  />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="p-4 space-y-3">
        <div className="px-3">
          <p className="text-body text-[11px] leading-snug">
            Monitoring your exposure across breach databases.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
