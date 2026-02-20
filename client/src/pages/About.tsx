import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Shield, Target, Eye, Users, Lock, Globe, Award, Zap } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        {/* Hero */}
        <section className="section-padding hero-gradient text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-tight mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">About DigiLocker 2.0</h1>
            <p className="text-lg text-primary-foreground/60 max-w-2xl mx-auto">
              India's most ambitious initiative to bring trust, transparency, and verifiability to academic credentials through blockchain technology.
            </p>
          </motion.div>
        </section>

        {/* Mission & Vision */}
        <section className="section-padding">
          <div className="container-tight mx-auto grid md:grid-cols-2 gap-8">
            <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="dashboard-card">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Target className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed">
                To eliminate academic credential fraud in India by providing a blockchain-anchored verification system that is accessible to every student, institution, and employer — ensuring that merit is never questioned and trust is never broken.
              </p>
            </motion.div>
            <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="dashboard-card">
              <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <Eye className="w-6 h-6 text-accent" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-3">Our Vision</h2>
              <p className="text-muted-foreground leading-relaxed">
                A future where every academic achievement in India is instantly verifiable, universally trusted, and fully owned by the individual — powered by decentralized technology that puts privacy and transparency at its core.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Values */}
        <section className="section-padding bg-muted/30">
          <div className="container-tight mx-auto">
            <h2 className="text-3xl font-display font-bold text-foreground text-center mb-12">Core Principles</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Lock, title: "Privacy First", desc: "Zero-knowledge proofs and selective disclosure ensure students control their data." },
                { icon: Shield, title: "Immutable Trust", desc: "Blockchain anchoring guarantees tamper-proof records that cannot be altered." },
                { icon: Globe, title: "National Scale", desc: "Designed to serve 1,000+ universities and 50M+ students across all states." },
                { icon: Award, title: "W3C Standards", desc: "Full compliance with international Verifiable Credential standards." },
              ].map((v, i) => (
                <motion.div key={v.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                  <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <v.icon className="w-7 h-7 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-foreground mb-2">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Initiative */}
        <section className="section-padding">
          <div className="container-tight mx-auto text-center">
            <h2 className="text-3xl font-display font-bold text-foreground mb-4">A Government of India Initiative</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              DigiLocker 2.0 is developed under the National Blockchain Framework by the Ministry of Electronics & Information Technology (MeitY), building upon the success of the original DigiLocker platform that serves over 200 million citizens.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { value: "200M+", label: "DigiLocker Users" },
                { value: "1,200+", label: "Partner Institutions" },
                { value: "28", label: "States Covered" },
                { value: "99.97%", label: "Uptime SLA" },
              ].map((stat) => (
                <div key={stat.label} className="stat-card text-center">
                  <p className="text-2xl font-display font-bold text-accent">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default About;
