import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { LayoutDashboard, Building2, Search, AlertTriangle, Settings, Activity, TrendingUp, Users, FileCheck, XCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navItems = [
  { label: "National Dashboard", path: "/admin/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Institutions", path: "/admin/institutions", icon: <Building2 className="w-4 h-4" /> },
  { label: "On-Chain Explorer", path: "/admin/explorer", icon: <Search className="w-4 h-4" /> },
  { label: "Fraud Analytics", path: "/admin/fraud", icon: <AlertTriangle className="w-4 h-4" /> },
  { label: "Policy Controls", path: "/admin/policies", icon: <Settings className="w-4 h-4" /> },
  { label: "Governance Log", path: "/admin/governance", icon: <Activity className="w-4 h-4" /> },
];

const metrics = [
  { label: "Institutions Registered", value: "1,247", icon: Building2, change: "+18 this month" },
  { label: "Total Credentials", value: "2.4M", icon: FileCheck, change: "+124K this month" },
  { label: "Verifications Today", value: "8,921", icon: TrendingUp, change: "+12% vs yesterday" },
  { label: "Revocations", value: "342", icon: XCircle, change: "+8 this week" },
  { label: "Active Students", value: "50M+", icon: Users, change: "Across 28 states" },
  { label: "States Covered", value: "28", icon: Globe, change: "100% coverage" },
];

const AdminDashboard = () => {
  return (
    <DashboardLayout role="admin" roleLabel="Admin / Auditor" navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">National Dashboard</h2>
            <p className="text-sm text-muted-foreground mt-1">Real-time overview of India's academic credential ecosystem.</p>
          </div>
          <Button variant="outline" className="gap-2">
            <Activity className="w-4 h-4" /> Export Report
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric, i) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="dashboard-card"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
                  <metric.icon className="w-5 h-5 text-accent" />
                </div>
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{metric.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{metric.label}</p>
              <p className="text-xs text-accent mt-2">{metric.change}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <div className="dashboard-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Top Institutions (by issuance)</h3>
            <div className="space-y-3">
              {[
                { name: "IIT Delhi", count: "24,891", status: "Compliant" },
                { name: "IIT Bombay", count: "22,456", status: "Compliant" },
                { name: "Delhi University", count: "18,234", status: "Under Review" },
                { name: "IIT Madras", count: "15,789", status: "Compliant" },
                { name: "BITS Pilani", count: "12,345", status: "Compliant" },
              ].map((inst, i) => (
                <div key={inst.name} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-muted-foreground w-6">{i + 1}</span>
                    <span className="text-sm font-medium text-foreground">{inst.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">{inst.count}</span>
                    <span className={inst.status === "Compliant" ? "badge-verified" : "badge-pending"}>{inst.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="dashboard-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Fraud Flags</h3>
            <div className="space-y-3">
              {[
                { title: "Duplicate hash — Unknown University", severity: "High", time: "1 hour ago" },
                { title: "Mass issuance anomaly — XYZ College", severity: "Medium", time: "4 hours ago" },
                { title: "Unregistered issuer attempt", severity: "High", time: "1 day ago" },
              ].map((flag, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <AlertTriangle className={`w-4 h-4 ${flag.severity === "High" ? "text-destructive" : "text-yellow-500"}`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{flag.title}</p>
                      <p className="text-xs text-muted-foreground">{flag.time}</p>
                    </div>
                  </div>
                  <span className={flag.severity === "High" ? "badge-revoked" : "badge-pending"}>{flag.severity}</span>
                </div>
              ))}
            </div>
            <Link to="/admin/fraud">
              <Button variant="ghost" size="sm" className="text-accent mt-2">View All Alerts →</Button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard;
