import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface LeakDetail {
  id: number;
  title: string;
  date: string;
  domain: string;
  summary: string;
  risk: string;
  details: {
    username: string;
    password: string;
    website: string;
    ip: string;
    os: string;
    country: string;
    malware: string;
  };
}

interface LeakDetailDrawerProps {
  leak: LeakDetail | null;
  open: boolean;
  onClose: () => void;
}

const DetailRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex items-start justify-between py-3 border-b border-border/50 last:border-0">
    <span className="text-body text-sm">{label}</span>
    <span className="text-display text-sm text-right max-w-[180px] sm:max-w-[200px]">{value}</span>
  </div>
);

const LeakDetailDrawer = ({ leak, open, onClose }: LeakDetailDrawerProps) => {
  if (!leak) return null;

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-md bg-card border-border/30 overflow-y-auto">
        <SheetHeader className="pb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="h-10 w-10 rounded-xl bg-destructive/10 flex items-center justify-center">
              <Shield className="h-5 w-5 text-destructive" strokeWidth={1.5} />
            </div>
            <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20 text-xs">
              {leak.risk}
            </Badge>
          </div>
          <SheetTitle className="text-display text-lg">{leak.title}</SheetTitle>
          <p className="text-body text-sm">{leak.summary}</p>
        </SheetHeader>

        <div className="space-y-0">
          <p className="text-caps mb-3">Exposed Information</p>
          <DetailRow label="Username" value={leak.details.username} />
          <DetailRow label="Password" value={leak.details.password} />
          <DetailRow label="Website" value={leak.details.website} />
          <DetailRow label="Device IP" value={leak.details.ip} />
          <DetailRow label="Operating System" value={leak.details.os} />
          <DetailRow label="Country" value={leak.details.country} />
          <DetailRow label="Threat Type" value={leak.details.malware} />
        </div>

        <div className="mt-6">
          <p className="text-caps mb-3">Detected</p>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            <span className="text-body text-sm">{leak.domain}</span>
            <span className="text-body text-sm">{leak.date}</span>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeakDetailDrawer;
