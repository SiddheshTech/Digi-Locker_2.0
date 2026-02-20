import { Link } from "react-router-dom";
import { Shield, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="hero-gradient text-primary-foreground">
      <div className="container-wide mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-9 h-9 rounded-lg accent-gradient flex items-center justify-center">
                <Shield className="w-5 h-5 text-accent-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold font-display">DigiLocker</span>
                <span className="text-xs text-accent ml-1 font-semibold">2.0</span>
              </div>
            </div>
            <p className="text-primary-foreground/60 text-sm leading-relaxed mb-6">
              India's next-generation verifiable academic credential system powered by blockchain technology. Secure, transparent, and tamper-proof.
            </p>
            <div className="flex gap-3">
              {["twitter", "linkedin", "github"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 rounded-lg bg-primary-foreground/10 hover:bg-accent/20 flex items-center justify-center transition-colors">
                  <span className="text-xs text-primary-foreground/60 uppercase font-bold">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2.5">
              {[
                { label: "For Institutions", path: "/issuer/dashboard" },
                { label: "For Students", path: "/student/dashboard" },
                { label: "For Employers", path: "/verifier/verify" },
                { label: "For Admins", path: "/admin/dashboard" },
                { label: "Verify Credential", path: "/verify" },
              ].map((item) => (
                <li key={item.path}>
                  <Link to={item.path} className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2.5">
              {["Documentation", "API Reference", "Smart Contracts", "White Paper", "FAQs"].map((item) => (
                <li key={item}>
                  <Link to="/about" className="text-sm text-primary-foreground/60 hover:text-accent transition-colors">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold mb-4">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-accent mt-0.5 shrink-0" />
                <span className="text-sm text-primary-foreground/60">Ministry of Electronics & IT, New Delhi, India</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">support@digilocker2.gov.in</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-accent shrink-0" />
                <span className="text-sm text-primary-foreground/60">1800-XXX-XXXX (Toll Free)</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-primary-foreground/40">
            © 2026 DigiLocker 2.0 — Government of India. All rights reserved.
          </p>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Accessibility"].map((item) => (
              <Link key={item} to="/about" className="text-xs text-primary-foreground/40 hover:text-accent transition-colors">
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
