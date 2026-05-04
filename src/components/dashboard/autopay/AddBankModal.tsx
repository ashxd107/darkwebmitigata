import { X, ShieldCheck, Lock, Info, ArrowRight, Check } from "lucide-react";
import { useState } from "react";

export const AddBankModal = ({ onClose }: { onClose: () => void }) => {
  const [consent, setConsent] = useState(true);
  return (
    <div className="fixed inset-0 z-[80] grid place-items-center p-5 bg-[#0B1220]/40 backdrop-blur-sm" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-[24px] shadow-2xl w-full max-w-[460px] overflow-hidden animate-in fade-in zoom-in-95 duration-200"
      >
        <div className="px-7 pt-6 pb-1 flex justify-between items-start gap-4">
          <div>
            <div className="w-[52px] h-[52px] rounded-2xl bg-[#04DB7F] grid place-items-center text-white mb-1">
              <ShieldCheck className="w-6 h-6" strokeWidth={2} />
            </div>
            <h3 className="text-[22px] font-bold tracking-[-0.025em] mt-3.5 text-[#0B1220]">Connect your bank</h3>
            <p className="text-[13px] text-[#4B5563] mt-1.5">Via Account Aggregator · RBI approved · Read-only access</p>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F3F4F6] grid place-items-center text-[#4B5563] hover:bg-[#E5E7EB] shrink-0">
            <X className="w-3.5 h-3.5" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-7 pt-2.5 pb-2">
          <div className="text-[11px] text-[#6B7280] tracking-[0.14em] font-medium mt-1 mb-2">MOBILE NUMBER</div>
          <div className="flex items-center border-2 border-[#04DB7F] rounded-2xl h-14 px-4 bg-white">
            <span className="text-[#1F2937] font-semibold text-[15px] pr-3.5 border-r border-[#E5E7EB] mr-3.5">+91</span>
            <input defaultValue="73382 70444" className="flex-1 outline-none text-[17px] font-bold text-[#0B1220] tracking-wide" />
          </div>
          <div className="text-xs text-[#6B7280] mt-2 font-medium">Linked to your bank account</div>

          <div className="flex gap-3 items-start mt-4 text-[13px] text-[#4B5563] leading-relaxed">
            <button
              onClick={() => setConsent(!consent)}
              className={`w-[22px] h-[22px] rounded-md grid place-items-center shrink-0 mt-0.5 transition-colors ${
                consent ? "bg-[#04DB7F] text-white" : "bg-white border-[1.5px] border-[#D1D5DB]"
              }`}
            >
              {consent && <Check className="w-3 h-3" strokeWidth={3} />}
            </button>
            <div>
              I agree this mobile number is linked to my bank account, and consent to look up existing Account Aggregator profiles. By continuing you agree to our <a className="text-[#0B1220] font-semibold underline">Terms</a>.
            </div>
          </div>

          <div className="flex gap-3.5 mt-5 p-3.5 bg-[#F2FDF8] rounded-xl flex-wrap">
            <div className="flex items-center gap-1.5 text-[11px] text-[#024E2E] font-medium">
              <Lock className="w-3 h-3 text-[#03B36A]" />End-to-end encrypted
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#024E2E] font-medium">
              <ShieldCheck className="w-3 h-3 text-[#03B36A]" />RBI-licensed AA
            </div>
            <div className="flex items-center gap-1.5 text-[11px] text-[#024E2E] font-medium">
              <Info className="w-3 h-3 text-[#03B36A]" />No password needed
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 px-7 pt-4 pb-6">
          <button onClick={onClose} className="h-[50px] rounded-full bg-white border border-[#E5E7EB] text-[#1F2937] font-semibold text-sm hover:bg-[#F3F4F6] transition">
            Cancel
          </button>
          <button onClick={onClose} className="h-[50px] rounded-full bg-[#04DB7F] hover:bg-[#03B36A] text-white font-semibold text-sm flex items-center justify-center gap-2 transition">
            Continue <ArrowRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
};
