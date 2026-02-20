import { motion } from "framer-motion";
import { Upload, Hash, LinkIcon, CheckCircle2 } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Institution Issues Credential",
    description: "The university uploads the academic document, which is canonicalized and hashed using SHA-256. The resulting hash, along with metadata, is anchored on-chain via a smart contract.",
  },
  {
    icon: Hash,
    step: "02",
    title: "Blockchain Records Proof",
    description: "The credential hash, issuer identity, and timestamp are permanently recorded on the Ethereum blockchain. A unique transaction hash serves as the immutable proof of issuance.",
  },
  {
    icon: LinkIcon,
    step: "03",
    title: "Student Shares Securely",
    description: "Students receive their verified credential and can generate QR codes or short links with selective disclosure — choosing exactly which fields to reveal to each verifier.",
  },
  {
    icon: CheckCircle2,
    step: "04",
    title: "Employer Verifies Instantly",
    description: "The employer scans the QR or uploads the document. The system re-computes the hash and checks it against the on-chain record, confirming authenticity in seconds.",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="section-padding bg-muted/30">
      <div className="container-wide mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-accent/10 text-accent text-xs font-semibold mb-4 uppercase tracking-wider">
            How It Works
          </span>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-4">
            From Issuance to Verification in Four Steps
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A streamlined process that ensures every credential is verifiable, tamper-proof, and privacy-respecting.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection line */}
          <div className="hidden lg:block absolute top-24 left-[12.5%] right-[12.5%] h-0.5 bg-border" />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, i) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center relative"
              >
                <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-6 relative z-10">
                  <step.icon className="w-7 h-7 text-accent-foreground" />
                </div>
                <span className="text-xs font-bold text-accent tracking-widest mb-2 block">{step.step}</span>
                <h3 className="text-lg font-display font-semibold text-foreground mb-3">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
