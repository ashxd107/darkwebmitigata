import { X, Trash2, Check } from "lucide-react";
import { Mandate, Logo } from "./autopayData";
import { motion, AnimatePresence } from "framer-motion";

export const MandateDrawer = ({
  mandate, onClose, onCancel,
}: { mandate: Mandate | null; onClose: () => void; onCancel: () => void }) => {
  const months = ["Oct", "Sep", "Aug", "Jul", "Jun"];
  const txns = ["TXN8476291045", "TXN8476190244", "TXN8475091443", "TXN8474092642", "TXN8473094841"];

  return (
    <AnimatePresence>
      {mandate && (
        <>
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0B1220]/40 backdrop-blur-sm z-[60]"
          />
          <motion.aside
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
            className="fixed top-0 right-0 bottom-0 w-full sm:w-[480px] bg-white z-[60] flex flex-col shadow-2xl"
          >
            <div className="px-6 pt-5 pb-4 flex items-start gap-3.5">
              <div className="w-12 h-12">
                <Logo k={mandate.logo} className="!w-12 !h-12" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-[19px] font-bold tracking-[-0.02em] text-[#0B1220] mb-1.5">{mandate.name}</div>
                <div className="flex items-center gap-2">
                  {mandate.status === "active" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#E6FBF2] text-[#024E2E]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#04DB7F]" />Active
                    </span>
                  )}
                  {mandate.status === "paused" && (
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-[#FFF4D6] text-[#C18A06]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#C18A06]" />Paused
                    </span>
                  )}
                  <span className="text-[13px] text-[#6B7280] font-medium">{mandate.cycle}</span>
                </div>
              </div>
              <button onClick={onClose} className="w-9 h-9 rounded-full bg-[#F3F4F6] grid place-items-center text-[#4B5563] hover:bg-[#E5E7EB] shrink-0">
                <X className="w-3.5 h-3.5" strokeWidth={2.5} />
              </button>
            </div>

            <div className="px-6 pb-5 overflow-y-auto flex-1">
              <div className="bg-[#F3F4F6] rounded-2xl p-5 text-center mb-6">
                <div className="text-[11px] tracking-[0.16em] text-[#6B7280] font-bold mb-2.5">NEXT DEBIT</div>
                <div className="text-[38px] font-bold tracking-[-0.035em] leading-none mb-3 text-[#0B1220] tabular-nums">₹{mandate.amount.toLocaleString("en-IN")}</div>
                <div className="text-[13px] text-[#4B5563]">
                  on <strong className="text-[#0B1220] font-semibold">{mandate.dateFull}</strong> · from <strong className="text-[#0B1220] font-semibold">{mandate.bank} UPI ••{mandate.bankMask}</strong>
                </div>
              </div>

              <div className="text-[11px] tracking-[0.14em] text-[#9CA3AF] font-bold mb-3.5">DETAILS</div>
              <div className="text-[13px]">
                {[
                  ["UPI handle", mandate.handle, true],
                  ["Mandate ID", mandate.mid, true],
                  ["Set up on", mandate.setupOn, false],
                  ["Total paid", mandate.totalLabel, false],
                ].map(([k, v, mono]) => (
                  <div key={k as string} className="flex justify-between items-center py-3 border-b border-[#F3F4F6] last:border-0">
                    <span className="text-[#6B7280] font-medium">{k}</span>
                    <span className={`text-[#0B1220] font-semibold ${mono ? "font-mono text-xs" : ""}`}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="flex justify-between items-center mt-7 mb-3.5">
                <span className="text-[11px] tracking-[0.14em] text-[#9CA3AF] font-bold">RECENT PAYMENTS</span>
                <a className="text-[13px] text-[#03B36A] font-bold cursor-pointer">See all</a>
              </div>
              <div>
                {months.map((mo, i) => (
                  <div key={i} className="flex items-center gap-3.5 py-3 border-b border-[#F3F4F6] last:border-0">
                    <div className="w-[30px] h-[30px] rounded-full bg-[#E6FBF2] text-[#03B36A] grid place-items-center shrink-0">
                      <Check className="w-3.5 h-3.5" strokeWidth={3} />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-[#0B1220]">{mo} 6, 2025</div>
                      <div className="text-xs text-[#6B7280] font-mono mt-0.5">{txns[i]}</div>
                    </div>
                    <div className="ml-auto font-bold text-[#0B1220] tabular-nums">₹{mandate.amount}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-6 pt-4 pb-5 border-t border-[#E5E7EB]">
              <button
                onClick={onCancel}
                className="w-full h-[50px] rounded-full bg-white border border-[#FFD9DA] text-[#E5484D] font-bold text-sm flex items-center justify-center gap-2 hover:bg-[#FFE9EA] transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                Cancel mandate
              </button>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
