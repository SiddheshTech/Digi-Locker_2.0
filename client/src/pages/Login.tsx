import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, Building2, GraduationCap, Briefcase, ShieldCheck, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const roles = [
  { id: "issuer", label: "Institution / Issuer", icon: Building2, path: "/issuer/dashboard", color: "bg-accent" },
  { id: "student", label: "Student / Holder", icon: GraduationCap, path: "/student/dashboard", color: "bg-accent" },
  { id: "verifier", label: "Employer / Verifier", icon: Briefcase, path: "/verifier/verify", color: "bg-accent" },
  { id: "admin", label: "Admin / Auditor", icon: ShieldCheck, path: "/admin/dashboard", color: "bg-accent" },
];

const Login = () => {
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const role = roles.find((r) => r.id === selectedRole);
    if (role) navigate(role.path);
  };

  return (
    <div className="min-h-screen hero-gradient flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2.5 mb-6">
            <div className="w-10 h-10 rounded-lg accent-gradient flex items-center justify-center">
              <Shield className="w-5 h-5 text-accent-foreground" />
            </div>
            <div>
              <span className="text-xl font-bold font-display text-primary-foreground">DigiLocker</span>
              <span className="text-xs text-accent ml-1 font-semibold">2.0</span>
            </div>
          </Link>
          <h1 className="text-2xl font-display font-bold text-primary-foreground mb-2">Welcome Back</h1>
          <p className="text-sm text-primary-foreground/50">Sign in to your credential platform</p>
        </div>

        <div className="bg-card rounded-2xl p-8 shadow-2xl">
          {/* Role selection */}
          <div className="mb-6">
            <Label className="text-sm font-medium text-foreground mb-3 block">Select your role</Label>
            <div className="grid grid-cols-2 gap-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => setSelectedRole(role.id)}
                  className={`flex items-center gap-2 p-3 rounded-lg border-2 transition-all text-left ${
                    selectedRole === role.id
                      ? "border-accent bg-accent/10"
                      : "border-border hover:border-accent/30"
                  }`}
                >
                  <role.icon className={`w-4 h-4 ${selectedRole === role.id ? "text-accent" : "text-muted-foreground"}`} />
                  <span className={`text-xs font-medium ${selectedRole === role.id ? "text-accent" : "text-muted-foreground"}`}>
                    {role.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm">Email or Institution ID</Label>
              <Input id="email" placeholder="you@institution.edu.in" className="mt-1.5" />
            </div>
            <div>
              <Label htmlFor="password" className="text-sm">Password</Label>
              <div className="relative mt-1.5">
                <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="rounded border-border" />
                Remember me
              </label>
              <a href="#" className="text-accent hover:underline">Forgot password?</a>
            </div>

            <Button
              type="submit"
              className="w-full accent-gradient text-accent-foreground border-0 hover:opacity-90 h-11 gap-2"
              disabled={!selectedRole}
            >
              Sign In
              <ArrowRight className="w-4 h-4" />
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <a href="#" className="text-accent font-medium hover:underline">Register your institution</a>
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-border">
            <Button variant="outline" className="w-full gap-2 text-sm" onClick={() => navigate("/verify")}>
              <Shield className="w-4 h-4" />
              Quick Verify (No login required)
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
