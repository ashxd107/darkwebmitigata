import { Eye, Database, Lightbulb, LayoutDashboard, X, PhoneCall, MoreHorizontal, LogOut, Settings, UserRound } from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const menuItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "exposure", label: "Exposure", icon: Eye },
  { id: "leak-sources", label: "Leak Sources", icon: Database },
  { id: "recommendations", label: "Recommendations", icon: Lightbulb },
  { id: "call-assistance", label: "Call Assistance", icon: PhoneCall },
];

const userData = {
  name: "Rahul Sharma",
  email: "rahul.sharma@email.com",
  phone: "+91 98XXXXXX10",
};

interface DashboardSidebarProps {
  activeItem: string;
  onNavigate: (id: string) => void;
  onInsuranceClick: () => void;
  mobileOpen?: boolean;
  onMobileClose?: () => void;
  riskScore?: number;
  onRiskScoreChange?: (score: number) => void;
}

const RiskScoreControl = ({ score, onChange }: { score: number; onChange: (v: number) => void }) => (
  <div className="p-3">
    <div className="rounded-xl bg-secondary/40 px-4 py-3 space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-[11px] text-muted-foreground font-medium uppercase tracking-wider">Risk Score</span>
        <span className="text-display text-sm font-semibold">{score}</span>
      </div>
      <Slider
        value={[score]}
        onValueChange={(v) => onChange(v[0])}
        max={100}
        step={1}
        className="w-full"
      />
      <div className="flex justify-between text-[10px] text-muted-foreground">
        <span>Safe</span>
        <span>Critical</span>
      </div>
    </div>
  </div>
);

const ProfileRow = () => {
  const [profileOpen, setProfileOpen] = useState(false);

  return (
    <>
      <div className="p-3">
        <div className="flex items-center gap-3 rounded-xl bg-secondary/40 px-3 py-2.5">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary/10 text-primary text-xs font-semibold">
              RS
            </AvatarFallback>
          </Avatar>
          <span className="text-display text-sm flex-1 truncate">{userData.name}</span>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="h-7 w-7 rounded-lg hover:bg-secondary/60 flex items-center justify-center shrink-0 transition-colors">
                <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40 rounded-xl">
              <DropdownMenuItem onClick={() => setProfileOpen(true)} className="rounded-lg text-sm cursor-pointer">
                <UserRound className="h-4 w-4 mr-2" />
                View Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg text-sm cursor-pointer">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem className="rounded-lg text-sm cursor-pointer text-destructive focus:text-destructive">
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="sm:max-w-sm rounded-[20px]">
          <DialogHeader>
            <DialogTitle className="text-display text-lg">Profile</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback className="bg-primary/10 text-primary text-base font-semibold">RS</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-display text-sm">{userData.name}</p>
                <p className="text-body text-xs">Personal Account</p>
              </div>
            </div>
            <div className="space-y-3 pt-2">
              <div className="flex justify-between items-center">
                <span className="text-body text-sm">Email</span>
                <span className="text-display text-sm">{userData.email}</span>
              </div>
              <div className="border-t border-border/30" />
              <div className="flex justify-between items-center">
                <span className="text-body text-sm">Phone</span>
                <span className="text-display text-sm">{userData.phone}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

const NavList = ({ activeItem, onNavigate, onItemClick }: { activeItem: string; onNavigate: (id: string) => void; onItemClick?: () => void }) => (
  <ul className="space-y-1">
    {menuItems.map((item) => {
      const isActive = activeItem === item.id;
      return (
        <li key={item.id}>
          <button
            onClick={() => { onNavigate(item.id); onItemClick?.(); }}
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
              <NavList activeItem={activeItem} onNavigate={onNavigate} onItemClick={onMobileClose} />
            </nav>
            <ProfileRow />
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-[260px] bg-card border-r border-border/20 flex-col z-40 hidden lg:flex">
      <div className="p-6 pb-4">
        <img src={mitigataLogo} alt="Mitigata" className="h-8 w-auto" />
      </div>
      <nav className="flex-1 px-3 py-4">
        <p className="text-caps px-3 mb-3">Menu</p>
        <NavList activeItem={activeItem} onNavigate={onNavigate} />
      </nav>
      <ProfileRow />
    </aside>
  );
};

export default DashboardSidebar;
