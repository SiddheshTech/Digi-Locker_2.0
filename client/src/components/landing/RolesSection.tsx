import { motion } from "framer-motion";
import { Building2, GraduationCap, Briefcase, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const roles = [
  {
    icon: Building2,
    title: "Institutions & Issuers",
    description: "Issue tamper-proof academic credentials on-chain. Manage batch issuance via Merkle trees, handle revocations, rotate signing keys, and monitor your institution's credential ecosystem.",
    features: ["Single & Batch Issuance", "Revocation Management", "Key Rotation", "Fraud Alerts"],
    path: "/issuer/dashboard",
    cta: "Issuer Dashboard",
  },
  {
    icon: GraduationCap,
    title: "Students & Holders",
    description: "Own and control your verified academic credentials. Share selectively with employers using privacy-preserving disclosure, generate QR codes, and track who accesses your records.",
    features: ["Credential Wallet", "Selective Disclosure", "Share Analytics", "Consent Logs"],
    path: "/student/dashboard",
    cta: "Student Portal",
  },
  {
    icon: Briefcase,
    title: "Employers & Verifiers",
    description: "Verify any credential instantly by uploading a document, scanning a QR code, or pasting a link. Receive signed verification receipts and integrate verification into your hiring pipeline.",
    features: ["Instant Verification", "Batch Verify", "API Access", "Verification Receipts"],
    path: "/verifier/verify",
    cta: "Verify Now",
  },
  {
    icon: ShieldCheck,
    title: "Government & Auditors",
    description: "Oversee the national credential ecosystem with real-time analytics, fraud detection, institution compliance monitoring, and on-chain explorer tools built for MeitY-level oversight.",
    features: ["National Dashboard", "Fraud Analytics", "Compliance Tracking", "On-Chain Explorer"],
    path: "/admin/dashboard",
    cta: "Admin Console",
  },
];

const RolesSection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 uppercase tracking-wider">
            For Every Stakeholder
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            One Platform, Four Powerful Roles
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Purpose-built dashboards for every participant in the academic credential lifecycle.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {roles.map((role, i) => (
            <motion.div
              key={role.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card rounded-2xl p-8 card-elevated border border-border group hover:border-accent/30"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0 group-hover:bg-accent/20 transition-colors">
                  <role.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold text-foreground">{role.title}</h3>
                </div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-5">{role.description}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {role.features.map((f) => (
                  <span key={f} className="px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {f}
                  </span>
                ))}
              </div>
              <Link to={role.path}>
                <Button variant="outline" className="border-accent/30 text-accent hover:bg-accent/10 hover:text-accent">
                  {role.cta} →
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RolesSection;
