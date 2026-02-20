import { motion } from "framer-motion";
import { Shield, FileCheck, Users, Lock, Zap, Globe, QrCode, Database, Eye } from "lucide-react";

const features = [
  {
    icon: Shield,
    title: "Blockchain Anchored",
    description: "Every credential is anchored on-chain with an immutable timestamp and hash. No single entity can alter or forge a record.",
  },
  {
    icon: FileCheck,
    title: "Instant Verification",
    description: "Employers and institutions can verify any credential in seconds using a QR code, short link, or direct document upload.",
  },
  {
    icon: Lock,
    title: "Privacy by Design",
    description: "Zero-knowledge selective disclosure lets students share only the fields they choose — no unnecessary data exposure.",
  },
  {
    icon: Users,
    title: "Multi-Role Platform",
    description: "Dedicated dashboards for Institutions, Students, Employers, and Government Auditors — each with tailored workflows.",
  },
  {
    icon: QrCode,
    title: "Offline QR Verification",
    description: "Signed QR codes contain compressed metadata enabling verification even without internet connectivity.",
  },
  {
    icon: Database,
    title: "Batch Merkle Issuance",
    description: "Issue hundreds of credentials in a single on-chain transaction using Merkle tree aggregation — cost-efficient and scalable.",
  },
  {
    icon: Zap,
    title: "W3C Verifiable Credentials",
    description: "Full compliance with W3C VC standards including JSON-LD format, cryptographic proofs, and interoperability.",
  },
  {
    icon: Globe,
    title: "National Scale",
    description: "Designed for India's 1000+ universities and 50M+ students with multi-language support and accessibility-first design.",
  },
  {
    icon: Eye,
    title: "Fraud Detection",
    description: "AI-powered anomaly detection identifies suspicious issuance patterns and flags potential forgeries in real time.",
  },
];

const FeaturesSection = () => {
  return (
    <section className="section-padding bg-background" id="features">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 uppercase tracking-wider">
            Platform Features
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            Built for Trust, Designed for Scale
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive credential verification ecosystem that combines cutting-edge blockchain technology with intuitive user experiences.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="group bg-card rounded-xl p-6 card-elevated border border-border hover:border-accent/30"
            >
              <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:bg-accent/20 transition-colors">
                <feature.icon className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
