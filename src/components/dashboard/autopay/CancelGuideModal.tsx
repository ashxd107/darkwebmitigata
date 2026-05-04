import { X, AlertTriangle, Check } from "lucide-react";
import { useState } from "react";

const STEPS: Record<string, [string, string][]> = {
  paytm: [
    ["Open Paytm", "Launch the Paytm app and sign in."],
    ["Tap your profile", 'Top-left profile icon → tap "Manage Subscriptions" or "Autopay".'],
    ["Find the mandate", "Locate this subscription in your active autopay list."],
    ["Cancel & confirm", 'Tap "Cancel autopay" and confirm with your UPI PIN.'],
  ],
  phonepe: [
    ["Open PhonePe", "Launch PhonePe and tap your profile picture (top-left)."],
    ["Go to Autopay", 'Scroll down and tap "Autopay" under Payments.'],
    ["Pick the mandate", "Tap on this subscription in your list."],
    ["Cancel autopay", 'Tap "Cancel autopay" → confirm with UPI PIN.'],
  ],
  gpay: [
    ["Open Google Pay", "Launch GPay and tap your profile photo (top-right)."],
    ["Tap Autopay", 'Choose "Autopay" from the menu.'],
    ["Select the mandate", "Tap this subscription in your list."],
    ["Cancel & verify", 'Tap "Cancel" → enter UPI PIN to confirm.'],
  ],
  amazonpay: [
    ["Open Amazon", "Launch the Amazon app and sign in."],
    ["Go to Amazon Pay", "Tap menu (☰) → Amazon Pay → Manage Autopay."],
    ["Pick the merchant", "Find this subscription under your active mandates."],
    ["Cancel autopay", 'Tap "Cancel autopay" and confirm.'],
  ],
  bhim: [
    ["Open BHIM", "Launch the BHIM app on your phone."],
    ["Open Mandates", 'Tap "Mandate" from the home screen.'],
    ["Find the subscription", "Tap on the relevant mandate."],
    ["Revoke", 'Tap "Revoke" and confirm with your UPI PIN.'],
  ],
};

const APPS: { key: string; label: string }[] = [
  { key: "paytm", label: "Paytm" },
  { key: "phonepe", label: "PhonePe" },
  { key: "gpay", label: "Google Pay" },
  { key: "amazonpay", label: "Amazon Pay" },
  { key: "bhim", label: "BHIM" },
];

export const CancelGuideModal = ({ name, onClose }: { name: string; onClose: () => void }) => {
  const [app, setApp] = useState("paytm");
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-5 bg-[#0B1220]/40 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-[540px] max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-7 pt-6 pb-1 flex justify-between items-start gap-4">
          <div>
            <h3 className="text-[22px] font-bold tracking-[-0.025em] text-[#0B1220]">How to cancel {name}</h3>
            <p className="text-[13px] text-[#4B5563] mt-1.5 leading-relaxed">
              Mitigata can't cancel UPI mandates directly — they live in your UPI app. Pick the app you used to set up the mandate and follow the steps below.
            </p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F3F4F6] grid place-items-center text-[#4B5563] hover:bg-[#E5E7EB] shrink-0">
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="flex gap-6 border-b border-[#E5E7EB] mt-4 px-7 overflow-x-auto scrollbar-none">
          {APPS.map((a) => (
            <button
              key={a.key}
              onClick={() => setApp(a.key)}
              className={`py-3.5 text-sm font-bold relative whitespace-nowrap transition-colors ${
                app === a.key ? "text-[#0B1220]" : "text-[#9CA3AF] hover:text-[#1F2937]"
              }`}
            >
              {a.label}
              {app === a.key && <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-[#04DB7F] rounded" />}
            </button>
          ))}
        </div>

        <div className="px-7 py-3 overflow-y-auto">
          {STEPS[app].map(([t, d], i) => (
            <div key={i} className="flex gap-3.5 py-3.5">
              <div className="w-[30px] h-[30px] rounded-full bg-[#04DB7F] text-white font-bold text-[13px] grid place-items-center shrink-0">{i + 1}</div>
              <div>
                <div className="font-semibold text-[15px] text-[#0B1220] mb-1 tracking-[-0.01em]">{t}</div>
                <div className="text-[13px] text-[#4B5563] leading-relaxed">{d}</div>
              </div>
            </div>
          ))}
        </div>

        <div className="mx-7 mb-4 mt-2 bg-[#FFF4D6] rounded-[14px] p-4 flex gap-3 text-[13px] text-[#6B5300] leading-relaxed">
          <AlertTriangle className="w-4 h-4 text-[#C18A06] shrink-0 mt-0.5" />
          <div>
            <strong className="text-[#0B1220] font-semibold">Note:</strong> Cancelling stops future auto-debits, but the service continues until the current billing cycle ends. Mitigata will detect the cancellation within 24 hours.
          </div>
        </div>

        <button onClick={onClose} className="mx-7 mb-6 h-[50px] rounded-full bg-[#04DB7F] hover:bg-[#03B36A] text-white font-semibold flex items-center justify-center gap-2 transition-colors">
          Got it
          <Check className="w-4 h-4" strokeWidth={2.5} />
        </button>
      </div>
    </div>
  );
};
