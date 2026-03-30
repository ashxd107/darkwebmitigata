import { motion } from "framer-motion";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, AtSign, KeyRound } from "lucide-react";

const personalData = [
  { label: "Full Name", value: "Rahul Sharma", icon: User, found: true },
  { label: "Email Address", value: "rahul.sharma@gmail.com", icon: Mail, found: true },
  { label: "Phone Numbers", value: "2 numbers found", icon: Phone, found: true },
  { label: "Date of Birth", value: "15-08-1990", icon: Calendar, found: true },
  { label: "Username", value: "rahul_sh90", icon: AtSign, found: true },
  { label: "Passwords", value: "8 exposed", icon: KeyRound, found: true },
  { label: "Address", value: "1 address found", icon: MapPin, found: true },
  { label: "Employer / Job", value: "TechCorp India Pvt Ltd", icon: Briefcase, found: true },
];

const fadeIn = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.2, 0.8, 0.2, 1] as const } },
};

const PersonalInfoSection = () => (
  <motion.section variants={fadeIn} initial="hidden" animate="visible">
    <p className="text-caps mb-2">Personal Information</p>
    <h2 className="text-display text-xl mb-1.5">Identity data found in breaches</h2>
    <p className="text-body text-sm mb-6">
      Summary of personal information identified across all exposure sources.
    </p>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
      {personalData.map((item) => (
        <div key={item.label} className="card-surface !p-4 flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
            <item.icon className="h-4 w-4 text-primary" strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="text-caps text-[9px] mb-0.5">{item.label}</p>
            <p className="text-display text-sm truncate">{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  </motion.section>
);

export default PersonalInfoSection;
