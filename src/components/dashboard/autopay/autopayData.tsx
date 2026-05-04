export type Mandate = {
  id: string;
  name: string;
  cat: string;
  logo: LogoKey;
  cycle: "Monthly" | "Yearly";
  dateFull: string;
  status: "active" | "paused" | "cancelled";
  amount: number;
  handle: string;
  bank: "HDFC" | "SBI";
  bankMask: string;
  mid: string;
  setupOn: string;
  totalLabel: string;
  months: number;
};

export type LogoKey =
  | "netflix" | "adobe" | "amazon" | "spotify" | "ms365" | "disney" | "youtube" | "audible";

export const logoBg: Record<LogoKey, string> = {
  netflix: "#000000",
  adobe: "#FA0F00",
  amazon: "#232F3E",
  spotify: "#000000",
  ms365: "#FFFFFF",
  disney: "#0B0E2D",
  youtube: "#FFFFFF",
  audible: "#F8B53C",
};

export const mandates: Mandate[] = [
  { id: "netflix", name: "Netflix Premium", cat: "Streaming", logo: "netflix", cycle: "Monthly", dateFull: "Nov 6, 2025", status: "active", amount: 199, handle: "netflix@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203847", setupOn: "Mar 12, 2024", totalLabel: "₹3,582 over 18 months", months: 18 },
  { id: "adobe", name: "Adobe Creative Cloud", cat: "Software", logo: "adobe", cycle: "Monthly", dateFull: "Nov 7, 2025", status: "active", amount: 999, handle: "adobe@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203848", setupOn: "Jan 18, 2024", totalLabel: "₹19,980 over 20 months", months: 20 },
  { id: "amazon", name: "Amazon Prime", cat: "Shopping", logo: "amazon", cycle: "Monthly", dateFull: "Nov 8, 2025", status: "active", amount: 499, handle: "prime@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203849", setupOn: "Sep 4, 2023", totalLabel: "₹12,975 over 26 months", months: 26 },
  { id: "spotify", name: "Spotify Family", cat: "Music", logo: "spotify", cycle: "Monthly", dateFull: "Nov 9, 2025", status: "active", amount: 179, handle: "spotify@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203850", setupOn: "Apr 9, 2024", totalLabel: "₹3,222 over 18 months", months: 18 },
  { id: "ms365", name: "Microsoft 365", cat: "Productivity", logo: "ms365", cycle: "Monthly", dateFull: "Nov 10, 2025", status: "active", amount: 850, handle: "ms365@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203851", setupOn: "Feb 22, 2024", totalLabel: "₹15,300 over 18 months", months: 18 },
  { id: "disney", name: "Disney+ Hotstar", cat: "Streaming", logo: "disney", cycle: "Yearly", dateFull: "Aug 12, 2026", status: "active", amount: 1499, handle: "hotstar@sbi", bank: "SBI", bankMask: "4821", mid: "MND/8749203852", setupOn: "Aug 12, 2025", totalLabel: "₹1,499 over 12 months", months: 12 },
  { id: "youtube", name: "YouTube Premium", cat: "Streaming", logo: "youtube", cycle: "Monthly", dateFull: "—", status: "paused", amount: 129, handle: "youtube@hdfcbank", bank: "HDFC", bankMask: "8829", mid: "MND/8749203853", setupOn: "Jul 14, 2024", totalLabel: "₹1,806 over 14 months", months: 14 },
  { id: "audible", name: "Audible", cat: "Audiobooks", logo: "audible", cycle: "Monthly", dateFull: "—", status: "cancelled", amount: 199, handle: "audible@sbi", bank: "SBI", bankMask: "4821", mid: "MND/8749203854", setupOn: "Dec 1, 2024", totalLabel: "₹1,290 over 7 months", months: 7 },
];

export const Logo = ({ k, className = "" }: { k: LogoKey; className?: string }) => {
  const svgs: Record<LogoKey, JSX.Element> = {
    netflix: <svg viewBox="0 0 24 24"><path fill="#E50914" d="M5.398 0v.006c3.028 8.556 5.37 15.175 8.348 23.596 2.344.058 4.85.398 4.854.398-2.8-7.924-5.923-16.747-8.487-24zm8.489 0v9.63L18.6 22.96c-.043-7.86-.004-15.913.002-22.96zM5.398 1.05V24c1.873-.225 2.81-.312 4.715-.398v-9.22z"/></svg>,
    adobe: <svg viewBox="0 0 24 24"><path fill="#fff" d="M14.55 2H22v20zm-5.1 0H2v20zm2.55 7.37L17.79 22h-3.13l-1.42-3.59h-3.48z"/></svg>,
    amazon: <svg viewBox="0 0 24 24"><path fill="#FF9900" d="M.045 18.02c.072-.116.187-.124.348-.022 3.636 2.11 7.594 3.166 11.87 3.166 2.852 0 5.668-.533 8.447-1.595l.315-.14c.138-.06.234-.1.293-.13.226-.088.39-.046.525.13.12.174.09.336-.12.48-.256.19-.6.41-1.006.654-1.244.743-2.64 1.316-4.185 1.726a17.617 17.617 0 01-10.951-.577 17.88 17.88 0 01-5.43-3.35c-.1-.074-.151-.15-.151-.22 0-.047.021-.09.051-.122zm6.565-6.218c0-1.005.247-1.863.743-2.577.495-.71 1.17-1.25 2.04-1.615.796-.335 1.756-.575 2.92-.72.39-.046 1.033-.103 1.92-.174v-.37c0-.93-.105-1.558-.3-1.875-.302-.43-.778-.65-1.426-.65h-.171c-.479.046-.893.196-1.225.47-.336.27-.555.65-.65 1.115-.06.27-.205.42-.435.46l-2.515-.31c-.245-.06-.376-.18-.376-.39 0-.04.005-.08.016-.13.255-1.286.87-2.246 1.846-2.876C9.969 1.527 11.115 1.18 12.43 1.13h.564c1.682 0 2.996.435 3.94 1.31.143.16.27.327.39.495.116.17.21.32.273.46.06.14.12.34.18.59.06.255.105.43.135.53.03.1.054.32.084.66.024.34.04.53.04.58v5.51c0 .395.06.755.165 1.08.107.32.21.555.314.69l.51.66c.09.135.135.255.135.36 0 .12-.06.222-.18.305-1.244 1.082-1.92 1.668-2.025 1.755-.18.135-.39.146-.658.04-.224-.18-.42-.355-.585-.526a8.422 8.422 0 01-.45-.51l-.317-.405-.27-.39c-.766.836-1.514 1.36-2.246 1.57-.46.137-1.03.207-1.71.207-1.05 0-1.92-.32-2.595-.97-.675-.65-1.012-1.57-1.012-2.756zm3.79-.434c0 .53.135.96.405 1.282.275.32.645.485 1.117.485l.21-.014c.6-.165 1.065-.555 1.395-1.18.16-.27.275-.575.345-.92.075-.34.114-.616.124-.83.014-.21.02-.56.02-1.05V8.7c-.84 0-1.485.06-1.92.18-1.275.36-1.916 1.17-1.916 2.43z"/></svg>,
    spotify: <svg viewBox="0 0 24 24"><path fill="#1DB954" d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12C24 5.4 18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.42 1.56-.299.421-1.02.599-1.559.3z"/></svg>,
    ms365: <svg viewBox="0 0 24 24"><path fill="#F25022" d="M0 0h11.4v11.4H0z"/><path fill="#7FBA00" d="M12.6 0H24v11.4H12.6z"/><path fill="#00A4EF" d="M0 12.6h11.4V24H0z"/><path fill="#FFB900" d="M12.6 12.6H24V24H12.6z"/></svg>,
    disney: <svg viewBox="0 0 24 24"><text x="12" y="17" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="12" fontWeight="900" fill="#fff" fontStyle="italic">D+</text></svg>,
    youtube: <svg viewBox="0 0 24 24"><path fill="#FF0000" d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>,
    audible: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" fill="#fff"/><text x="12" y="16" textAnchor="middle" fontFamily="Arial Black, sans-serif" fontSize="11" fontWeight="900" fill="#F8B53C">a</text></svg>,
  };
  const padMap: Partial<Record<LogoKey, string>> = {
    netflix: "p-2", adobe: "p-[7px]", amazon: "p-1.5", spotify: "p-1.5",
    ms365: "p-[7px] border border-border", disney: "p-1.5",
    youtube: "p-[7px] border border-border", audible: "p-1.5",
  };
  return (
    <div
      className={`w-10 h-10 rounded-full grid place-items-center shrink-0 overflow-hidden shadow-sm ${padMap[k] ?? ""} ${className}`}
      style={{ background: logoBg[k] }}
    >
      {svgs[k]}
    </div>
  );
};
