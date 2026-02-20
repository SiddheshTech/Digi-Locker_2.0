import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Send, MessageSquare, HelpCircle, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24">
        <section className="section-padding hero-gradient text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="container-tight mx-auto">
            <h1 className="text-4xl md:text-5xl font-display font-bold text-primary-foreground mb-4">Contact Us</h1>
            <p className="text-lg text-primary-foreground/60 max-w-xl mx-auto">
              Have questions about DigiLocker 2.0? Our team is here to help institutions, students, and employers get started.
            </p>
          </motion.div>
        </section>

        <section className="section-padding">
          <div className="container-tight mx-auto grid lg:grid-cols-3 gap-8">
            {/* Contact info cards */}
            <div className="space-y-4">
              {[
                { icon: Mail, title: "Email Us", info: "support@digilocker2.gov.in", sub: "We respond within 24 hours" },
                { icon: Phone, title: "Call Us", info: "1800-XXX-XXXX (Toll Free)", sub: "Mon–Fri, 9 AM – 6 PM IST" },
                { icon: MapPin, title: "Visit Us", info: "Ministry of Electronics & IT", sub: "Electronics Niketan, New Delhi" },
              ].map((c) => (
                <motion.div key={c.title} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="dashboard-card">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <c.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">{c.title}</h3>
                      <p className="text-sm text-accent font-medium">{c.info}</p>
                      <p className="text-xs text-muted-foreground">{c.sub}</p>
                    </div>
                  </div>
                </motion.div>
              ))}

              <div className="dashboard-card">
                <h3 className="text-sm font-semibold text-foreground mb-3">Quick Links</h3>
                <div className="space-y-2">
                  {[
                    { icon: HelpCircle, label: "FAQs" },
                    { icon: MessageSquare, label: "Support Desk" },
                    { icon: Building2, label: "Institution Onboarding" },
                  ].map((link) => (
                    <button key={link.label} className="flex items-center gap-2 w-full text-sm text-muted-foreground hover:text-accent transition-colors p-2 rounded-lg hover:bg-muted/50">
                      <link.icon className="w-4 h-4" />
                      {link.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:col-span-2 dashboard-card"
            >
              <h2 className="text-xl font-display font-semibold text-foreground mb-6">Send us a message</h2>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label>Full Name</Label>
                    <Input placeholder="Your name" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Email</Label>
                    <Input placeholder="you@email.com" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Organization</Label>
                    <Input placeholder="University / Company" className="mt-1.5" />
                  </div>
                  <div>
                    <Label>Role</Label>
                    <Input placeholder="e.g., Registrar, HR Manager" className="mt-1.5" />
                  </div>
                </div>
                <div>
                  <Label>Subject</Label>
                  <Input placeholder="How can we help?" className="mt-1.5" />
                </div>
                <div>
                  <Label>Message</Label>
                  <Textarea placeholder="Tell us more about your inquiry..." rows={5} className="mt-1.5" />
                </div>
                <Button className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2 h-11">
                  <Send className="w-4 h-4" /> Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
