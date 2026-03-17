import { motion } from "framer-motion";
import { User, Monitor, Globe } from "lucide-react";

const categories = [
  {
    title: "Account Credentials",
    icon: User,
    items: ["Username exposed", "Password exposed", "Login URLs identified"],
  },
  {
    title: "Device Information",
    icon: Monitor,
    items: ["IP address detected", "Operating system identified", "Device name found", "Location approximated"],
  },
  {
    title: "Session Data",
    icon: Globe,
    items: ["Browser cookies found", "Active sessions may be compromised"],
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.2, 0.8, 0.2, 1] } },
};

const ExposureSection = () => {
  return (
    <motion.section variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-50px" }}>
      <p className="text-caps mb-2">What Was Exposed</p>
      <h2 className="text-display text-2xl mb-6">Your compromised information</h2>
      <div className="grid md:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <motion.div key={cat.title} variants={cardVariants} className="card-surface">
            <div className="flex items-center gap-3 mb-5">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <cat.icon className="h-5 w-5 text-primary" strokeWidth={1.5} />
              </div>
              <h3 className="text-display text-sm">{cat.title}</h3>
            </div>
            <ul className="space-y-3">
              {cat.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-risk-mid mt-2 shrink-0" />
                  <span className="text-body text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default ExposureSection;
