import { Shield, Eye, Database, Lightbulb, Heart, LayoutDashboard } from "lucide-react";
import { motion } from "framer-motion";

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
                    w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium
                    transition-all duration-200 relative
                    ${isActive
                      ? "text-foreground bg-secondary"
                      : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                    }
                  `}
                >
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-active"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 bg-primary rounded-r-full"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <item.icon className="h-5 w-5" strokeWidth={1.5} />
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
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={onInsuranceClick}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl bg-primary text-primary-foreground font-semibold text-sm transition-colors"
        >
          <Heart className="h-5 w-5" strokeWidth={1.5} />
          <span>Get Insurance</span>
        </motion.button>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
