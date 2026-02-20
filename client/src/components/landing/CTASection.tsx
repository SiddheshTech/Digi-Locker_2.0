import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const CTASection = () => {
  return (
    <section className="section-padding bg-background">
      <div className="container-tight mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="hero-gradient rounded-3xl p-12 md:p-16 text-center relative overflow-hidden"
        >
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(175 65% 40% / 0.08) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }} />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-display font-bold text-primary-foreground mb-4">
              Ready to Modernize Academic Credentials?
            </h2>
            <p className="text-primary-foreground/60 max-w-xl mx-auto mb-8">
              Join 1,200+ institutions already using DigiLocker 2.0 to issue blockchain-verified, tamper-proof academic credentials trusted nationwide.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button size="lg" className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2 px-8 h-12">
                  Start Issuing Credentials
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12">
                  Try Verification Demo
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
