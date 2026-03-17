import { motion, useMotionValue, useTransform, animate } from "framer-motion";
import { useEffect, useRef } from "react";

interface RiskScoreMeterProps {
  score: number; // 0–100
}

const getScoreColor = (score: number) => {
  if (score <= 30) return "hsl(155, 96%, 44%)";
  if (score <= 60) return "hsl(38, 92%, 50%)";
  if (score <= 80) return "hsl(25, 90%, 55%)";
  return "hsl(0, 84%, 60%)";
};

const getScoreLabel = (score: number) => {
  if (score <= 30) return "Low";
  if (score <= 60) return "Medium";
  if (score <= 80) return "High";
  return "Critical";
};

const RiskScoreMeter = ({ score }: RiskScoreMeterProps) => {
  const displayScore = useMotionValue(0);
  const rounded = useTransform(displayScore, (v) => Math.round(v));
  const scoreRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const controls = animate(displayScore, score, {
      duration: 0.8,
      ease: [0.2, 0.8, 0.2, 1],
    });
    return controls.stop;
  }, [score, displayScore]);

  useEffect(() => {
    const unsubscribe = rounded.on("change", (v) => {
      if (scoreRef.current) scoreRef.current.textContent = String(v);
    });
    return unsubscribe;
  }, [rounded]);

  const color = getScoreColor(score);
  const label = getScoreLabel(score);
  const percentage = score;

  // SVG arc meter (semi-circle)
  const radius = 80;
  const strokeWidth = 10;
  const cx = 100;
  const cy = 95;
  const startAngle = Math.PI;
  const endAngle = 0;
  const totalAngle = Math.PI;

  const arcPath = (r: number) => {
    const x1 = cx + r * Math.cos(startAngle);
    const y1 = cy - r * Math.sin(startAngle);
    const x2 = cx + r * Math.cos(endAngle);
    const y2 = cy - r * Math.sin(endAngle);
    return `M ${x1} ${y1} A ${r} ${r} 0 0 1 ${x2} ${y2}`;
  };

  const indicatorAngle = startAngle - (percentage / 100) * totalAngle;
  const dotX = cx + radius * Math.cos(indicatorAngle);
  const dotY = cy - radius * Math.sin(indicatorAngle);

  const circumference = Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div className="flex flex-col items-center">
      <div className="relative" style={{ width: 200, height: 110 }}>
        <svg viewBox="0 0 200 110" className="w-full h-full">
          <defs>
            <linearGradient id="risk-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="hsl(155, 96%, 44%)" />
              <stop offset="35%" stopColor="hsl(38, 92%, 50%)" />
              <stop offset="65%" stopColor="hsl(25, 90%, 55%)" />
              <stop offset="100%" stopColor="hsl(0, 84%, 60%)" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Background arc */}
          <path
            d={arcPath(radius)}
            fill="none"
            stroke="hsl(0, 0%, 92%)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />

          {/* Colored arc */}
          <motion.path
            d={arcPath(radius)}
            fill="none"
            stroke="url(#risk-gradient)"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset: dashOffset }}
            transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
          />

          {/* Indicator dot */}
          <motion.circle
            cx={dotX}
            cy={dotY}
            r={6}
            fill={color}
            filter="url(#glow)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          />
          <motion.circle
            cx={dotX}
            cy={dotY}
            r={3}
            fill="white"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.2 }}
          />
        </svg>

        {/* Score number */}
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-1">
          <span ref={scoreRef} className="text-display text-4xl leading-none">0</span>
          <span className="text-body text-[11px] mt-1">out of 100</span>
        </div>
      </div>

      {/* Label */}
      <div className="flex items-center gap-2 mt-1">
        <div className="h-2 w-2 rounded-full" style={{ backgroundColor: color }} />
        <span className="text-display text-sm" style={{ color }}>
          {label} Risk
        </span>
      </div>
    </div>
  );
};

export default RiskScoreMeter;
