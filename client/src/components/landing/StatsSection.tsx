import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const stats = [
  { value: 2400000, suffix: "+", label: "Credentials Verified", prefix: "" },
  { value: 1200, suffix: "+", label: "Institutions Onboarded", prefix: "" },
  { value: 99.97, suffix: "%", label: "Verification Accuracy", prefix: "" },
  { value: 50, suffix: "M+", label: "Students Served", prefix: "" },
];

function AnimatedNumber({ value, suffix, prefix }: { value: number; suffix: string; prefix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const duration = 1500;
    const start = Date.now();
    const tick = () => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = value * eased;
      if (value >= 1000000) setDisplay((current / 1000000).toFixed(1) + "M");
      else if (value >= 1000) setDisplay(Math.round(current).toLocaleString());
      else if (value < 100) setDisplay(current.toFixed(2));
      else setDisplay(Math.round(current).toString());
      if (progress < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, value]);

  return (
    <span ref={ref} className="text-4xl md:text-5xl font-display font-bold text-accent">
      {prefix}{display}{value >= 1000000 ? "+" : suffix}
    </span>
  );
}

const StatsSection = () => {
  return (
    <section className="section-padding hero-gradient relative overflow-hidden">
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(175 65% 40% / 0.06) 1px, transparent 0)`,
        backgroundSize: "32px 32px",
      }} />
      <div className="container-wide mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
            Trusted by India's Academic Ecosystem
          </h2>
          <p className="text-primary-foreground/60 max-w-xl mx-auto">
            Scaling to serve every university and student across the nation with transparent, verifiable credentials.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center glass-card rounded-xl p-8"
            >
              <AnimatedNumber value={stat.value} suffix={stat.suffix} prefix={stat.prefix} />
              <p className="text-sm text-primary-foreground/50 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
