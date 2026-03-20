import { Eye, Database, Lightbulb, LayoutDashboard, X } from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";

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
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

const SidebarContent = ({ activeItem, onNavigate }: { activeItem: string; onNavigate: (id: string) => void }) => (
  <>
    <div className="p-6 pb-4">
      <img src={mitigataLogo} alt="Mitigata" className="h-8 w-auto" />
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
  </>
);

const DashboardSidebar = ({ activeItem, onNavigate, mobileOpen, onMobileClose }: DashboardSidebarProps) => {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Sheet open={mobileOpen} onOpenChange={onMobileClose}>
        <SheetContent side="left" className="w-[280px] p-0 bg-card border-border/20 [&>button]:hidden">
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-between p-4">
              <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
              <button onClick={onMobileClose} className="h-8 w-8 rounded-lg bg-secondary/60 flex items-center justify-center">
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            </div>
            <nav className="flex-1 px-3 py-2">
              <p className="text-caps px-3 mb-3">Menu</p>
              <ul className="space-y-1">
                {menuItems.map((item) => {
                  const isActive = activeItem === item.id;
                  return (
                    <li key={item.id}>
                      <button
                        onClick={() => { onNavigate(item.id); onMobileClose?.(); }}
                        className={`
                          w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm
                          transition-all duration-200
                          ${isActive
                            ? "bg-primary/8 text-foreground font-semibold"
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
            <div className="p-4">
              <p className="text-body text-[11px] leading-snug px-3">
                Monitoring your exposure across breach databases.
              </p>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border/20 flex-col z-40 hidden lg:flex">
      <SidebarContent activeItem={activeItem} onNavigate={onNavigate} />
    </aside>
  );
};

export default DashboardSidebar;
