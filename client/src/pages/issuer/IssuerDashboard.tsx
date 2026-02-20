import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, TrendingUp, Clock, XCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const metrics = [
  { label: "Total Issued", value: "12,847", change: "+234 this month", icon: CheckCircle2, trend: "up" },
  { label: "Pending Transactions", value: "18", change: "3 awaiting confirm", icon: Clock, trend: "neutral" },
  { label: "Revoked", value: "42", change: "+2 this week", icon: XCircle, trend: "down" },
  { label: "Verifications", value: "8,921", change: "+1,204 this month", icon: TrendingUp, trend: "up" },
];

const recentActivity = [
  { type: "issued", name: "B.Tech Certificate — Rahul Sharma", time: "2 hours ago", tx: "0x7f3a...e91b" },
  { type: "verified", name: "M.Sc Transcript — Priya Patel", time: "4 hours ago", tx: "0x8b2c...f43d" },
  { type: "revoked", name: "Diploma — Fake Entry #4891", time: "1 day ago", tx: "0x1a5e...b72f" },
  { type: "issued", name: "B.Com Certificate — Amit Kumar", time: "1 day ago", tx: "0x9d4f...a18c" },
  { type: "issued", name: "Ph.D Certificate — Dr. Neha Singh", time: "2 days ago", tx: "0x3c6b...d95e" },
];

const IssuerDashboard = () => {
  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="space-y-6">
        {/* Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <div className="dashboard-card">
            <h3 className="font-display font-semibold text-foreground mb-4">Quick Actions</h3>
            <div className="space-y-2">
              <Link to="/issuer/issue">
                <Button className="w-full justify-start gap-2 accent-gradient text-accent-foreground border-0">
                  <FilePlus className="w-4 h-4" /> Issue New Credential
                </Button>
              </Link>
              <Link to="/issuer/batch">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <Upload className="w-4 h-4" /> Batch Issue (CSV)
                </Button>
              </Link>
              <Link to="/issuer/records">
                <Button variant="outline" className="w-full justify-start gap-2">
                  <FileText className="w-4 h-4" /> View All Records
                </Button>
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="dashboard-card lg:col-span-2">
            <h3 className="font-display font-semibold text-foreground mb-4">Recent Activity</h3>
            <div className="space-y-3">
              {recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                  <div className="flex items-center gap-3">
                    <span className={`w-2 h-2 rounded-full ${
                      item.type === "issued" ? "bg-accent" : item.type === "verified" ? "bg-accent" : "bg-destructive"
                    }`} />
                    <div>
                      <p className="text-sm font-medium text-foreground">{item.name}</p>
                      <p className="text-xs text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <code className="text-xs text-accent font-mono">{item.tx}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default IssuerDashboard;
