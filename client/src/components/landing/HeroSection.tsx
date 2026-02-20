import { motion } from "framer-motion";
import { ArrowRight, Shield, Lock, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center hero-gradient overflow-hidden">
      {/* Background image overlay */}
      <div
        className="absolute inset-0 opacity-15 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Grid pattern overlay */}
      <div className="absolute inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(175 65% 40% / 0.08) 1px, transparent 0)`,
        backgroundSize: "40px 40px",
      }} />

      <div className="container-wide mx-auto px-4 md:px-8 relative z-10 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card mb-6">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-medium text-primary-foreground/80">Powered by Blockchain Technology</span>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-primary-foreground leading-tight mb-6">
              DigiLocker{" "}
              <span className="text-gradient">2.0</span>
              <br />
              <span className="text-3xl md:text-4xl lg:text-5xl text-primary-foreground/80">
                Verifiable Academic Credentials
              </span>
            </h1>

            <p className="text-lg text-primary-foreground/60 max-w-lg mb-8 leading-relaxed">
              India's next-generation platform for issuing, managing, and verifying academic credentials on an immutable blockchain. Tamper-proof, instant, and universally trusted.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Link to="/login">
                <Button size="lg" className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2 px-8 h-12 text-base">
                  Get Started Free
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              <Link to="/verify">
                <Button size="lg" variant="outline" className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 h-12 text-base">
                  Verify a Credential
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap gap-6">
              {[
                { icon: Shield, text: "Government Backed" },
                { icon: Lock, text: "End-to-End Encrypted" },
                { icon: CheckCircle2, text: "W3C Compliant" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2">
                  <Icon className="w-4 h-4 text-accent" />
                  <span className="text-sm text-primary-foreground/60">{text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="hidden lg:block"
          >
            {/* Floating credential cards */}
            <div className="relative">
              <motion.div
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="glass-card rounded-2xl p-6 max-w-sm mx-auto"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full accent-gradient flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-primary-foreground">Verified Credential</p>
                    <p className="text-xs text-primary-foreground/50">Blockchain Anchored</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-xs text-primary-foreground/40">Degree</span>
                    <span className="text-xs text-primary-foreground/80 font-medium">B.Tech Computer Science</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-primary-foreground/40">Institution</span>
                    <span className="text-xs text-primary-foreground/80 font-medium">IIT Delhi</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-primary-foreground/40">Year</span>
                    <span className="text-xs text-primary-foreground/80 font-medium">2026</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-xs text-primary-foreground/40">Tx Hash</span>
                    <span className="text-xs text-accent font-mono">0x7f3a…e91b</span>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-primary-foreground/10 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <span className="text-xs text-accent font-medium">Verified on Ethereum</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="glass-card rounded-xl p-4 absolute -bottom-8 -left-8 max-w-[200px]"
              >
                <div className="flex items-center gap-2">
                  <Lock className="w-4 h-4 text-accent" />
                  <span className="text-xs text-primary-foreground/80 font-medium">SHA-256 Hash Match</span>
                </div>
                <p className="text-[10px] text-primary-foreground/40 mt-1 font-mono">f7a3b2c1d8e9…</p>
              </motion.div>

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="glass-card rounded-xl p-4 absolute -top-4 -right-4 max-w-[180px]"
              >
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-accent" />
                  <span className="text-xs text-primary-foreground/80 font-medium">2.4M+ Verified</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path d="M0 40C360 80 720 0 1080 40C1260 60 1380 60 1440 50V100H0V40Z" fill="hsl(var(--background))" />
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;
