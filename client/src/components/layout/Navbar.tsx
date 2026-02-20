import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Home", path: "/" },
  {
    label: "Platform",
    children: [
      { label: "For Institutions", path: "/issuer/dashboard" },
      { label: "For Students", path: "/student/dashboard" },
      { label: "For Employers", path: "/verifier/verify" },
      { label: "For Admins", path: "/admin/dashboard" },
    ],
  },
  { label: "Verify", path: "/verify" },
  { label: "About", path: "/about" },
  { label: "Contact", path: "/contact" },
];

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState<string | null>(null);
  const location = useLocation();

  const isLanding = location.pathname === "/";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isLanding ? "bg-primary/95 backdrop-blur-md" : "bg-primary shadow-lg"}`}>
      <div className="container-wide mx-auto flex items-center justify-between h-16 px-4 md:px-8">
        <Link to="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-lg accent-gradient flex items-center justify-center">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          <div>
            <span className="text-lg font-bold font-display text-primary-foreground">DigiLocker</span>
            <span className="text-xs text-accent ml-1 font-semibold">2.0</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navItems.map((item) =>
            item.children ? (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => setDropdownOpen(item.label)}
                onMouseLeave={() => setDropdownOpen(null)}
              >
                <button className="nav-link text-primary-foreground/80 hover:text-primary-foreground px-3 py-2 flex items-center gap-1">
                  {item.label}
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
                <AnimatePresence>
                  {dropdownOpen === item.label && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full left-0 mt-1 w-52 bg-card rounded-lg shadow-xl border border-border overflow-hidden"
                    >
                      {item.children.map((child) => (
                        <Link
                          key={child.path}
                          to={child.path}
                          className="block px-4 py-3 text-sm text-card-foreground hover:bg-accent/10 hover:text-accent transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={item.path}
                to={item.path!}
                className="nav-link text-primary-foreground/80 hover:text-primary-foreground px-3 py-2"
              >
                {item.label}
              </Link>
            )
          )}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/login">
            <Button variant="ghost" className="text-primary-foreground/80 hover:text-primary-foreground hover:bg-primary-foreground/10">
              Sign In
            </Button>
          </Link>
          <Link to="/login">
            <Button className="accent-gradient text-accent-foreground border-0 hover:opacity-90">
              Get Started
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden text-primary-foreground" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden bg-primary border-t border-primary-foreground/10 overflow-hidden"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) =>
                item.children ? (
                  <div key={item.label}>
                    <p className="px-3 py-2 text-sm text-primary-foreground/50 font-semibold uppercase tracking-wider">
                      {item.label}
                    </p>
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        onClick={() => setMobileOpen(false)}
                        className="block px-6 py-2 text-sm text-primary-foreground/80 hover:text-accent"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Link
                    key={item.path}
                    to={item.path!}
                    onClick={() => setMobileOpen(false)}
                    className="block px-3 py-2 text-sm text-primary-foreground/80 hover:text-accent"
                  >
                    {item.label}
                  </Link>
                )
              )}
              <div className="pt-4 flex flex-col gap-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full accent-gradient text-accent-foreground border-0">Get Started</Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
