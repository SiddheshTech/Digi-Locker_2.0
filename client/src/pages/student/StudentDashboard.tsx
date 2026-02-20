import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, Share2, ClipboardList, Award, BarChart3, FileCheck, Clock, Eye } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "My Credentials", path: "/student/credentials", icon: <FolderOpen className="w-4 h-4" /> },
  { label: "Share & QR", path: "/student/share", icon: <Share2 className="w-4 h-4" /> },
  { label: "Consent Log", path: "/student/consents", icon: <ClipboardList className="w-4 h-4" /> },
  { label: "SkillChain", path: "/student/skills", icon: <Award className="w-4 h-4" /> },
  { label: "Share Analytics", path: "/student/analytics", icon: <BarChart3 className="w-4 h-4" /> },
];

const credentials = [
  { title: "B.Tech Computer Science", issuer: "IIT Delhi", status: "verified", date: "Jan 2026" },
  { title: "Machine Learning Certificate", issuer: "NPTEL", status: "verified", date: "Dec 2025" },
  { title: "Internship Completion", issuer: "Google India", status: "pending", date: "Mar 2026" },
];

const StudentDashboard = () => {
  return (
    <DashboardLayout role="student" roleLabel="Student / Holder" navItems={navItems}>
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {[
            { label: "My Credentials", value: "5", icon: FileCheck },
            { label: "Recent Shares", value: "12", icon: Share2 },
            { label: "Pending Requests", value: "2", icon: Clock },
          ].map((m, i) => (
            <motion.div key={m.label} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="dashboard-card">
              <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center mb-3">
                <m.icon className="w-5 h-5 text-accent" />
              </div>
              <p className="text-2xl font-display font-bold text-foreground">{m.value}</p>
              <p className="text-sm text-muted-foreground">{m.label}</p>
            </motion.div>
          ))}
        </div>

        <div className="dashboard-card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-display font-semibold text-foreground">My Credentials</h3>
            <Link to="/student/credentials"><Button variant="ghost" size="sm" className="text-accent">View All →</Button></Link>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {credentials.map((cred) => (
              <div key={cred.title} className="p-4 rounded-xl bg-muted/50 border border-border hover:border-accent/30 transition-colors">
                <div className="flex items-center justify-between mb-3">
                  <span className={cred.status === "verified" ? "badge-verified" : "badge-pending"}>
                    {cred.status === "verified" ? "Verified" : "Pending"}
                  </span>
                  <span className="text-xs text-muted-foreground">{cred.date}</span>
                </div>
                <h4 className="text-sm font-semibold text-foreground mb-1">{cred.title}</h4>
                <p className="text-xs text-muted-foreground">{cred.issuer}</p>
                <div className="flex gap-2 mt-3">
                  <Button variant="outline" size="sm" className="text-xs h-7 gap-1"><Eye className="w-3 h-3" /> View</Button>
                  <Button variant="outline" size="sm" className="text-xs h-7 gap-1"><Share2 className="w-3 h-3" /> Share</Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Recent Consent Activity</h3>
          <div className="space-y-3">
            {[
              { who: "Infosys HR", what: "B.Tech Certificate", when: "2 hours ago", action: "Viewed" },
              { who: "TCS Recruitment", what: "ML Certificate", when: "1 day ago", action: "Verified" },
              { who: "UPSC Board", what: "B.Tech Certificate", when: "3 days ago", action: "Downloaded" },
            ].map((item, i) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{item.who} — {item.action}</p>
                    <p className="text-xs text-muted-foreground">{item.what} • {item.when}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
