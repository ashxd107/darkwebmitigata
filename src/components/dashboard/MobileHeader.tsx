import { Menu } from "lucide-react";
import mitigataLogo from "@/assets/mitigata-logo.png";

interface MobileHeaderProps {
  onMenuClick: () => void;
}

const MobileHeader = ({ onMenuClick }: MobileHeaderProps) => (
  <header className="fixed top-0 left-0 right-0 z-40 bg-card/95 backdrop-blur-md border-b border-border/20 px-4 py-3 flex items-center justify-between lg:hidden">
    <img src={mitigataLogo} alt="Mitigata" className="h-7 w-auto" />
    <button
      onClick={onMenuClick}
      className="h-10 w-10 rounded-xl bg-secondary/60 flex items-center justify-center text-foreground"
    >
      <Menu className="h-5 w-5" strokeWidth={1.5} />
    </button>
  </header>
);

export default MobileHeader;
