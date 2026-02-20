import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, FolderOpen, Share2, ClipboardList, Award, BarChart3, Eye, Clock, Building2 } from "lucide-react";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "My Credentials", path: "/student/credentials", icon: <FolderOpen className="w-4 h-4" /> },
  { label: "Share & QR", path: "/student/share", icon: <Share2 className="w-4 h-4" /> },
  { label: "Consent Log", path: "/student/consents", icon: <ClipboardList className="w-4 h-4" /> },
  { label: "SkillChain", path: "/student/skills", icon: <Award className="w-4 h-4" /> },
  { label: "Share Analytics", path: "/student/analytics", icon: <BarChart3 className="w-4 h-4" /> },
];

const logs = [
  { who: "Infosys HR Portal", credential: "B.Tech Certificate", action: "Verified", when: "Feb 19, 2026 — 2:34 PM", fields: ["Degree", "Institution", "Year"] },
  { who: "TCS iON Recruitment", credential: "ML Specialization", action: "Viewed", when: "Feb 18, 2026 — 11:15 AM", fields: ["Certificate Name", "Issuer"] },
  { who: "UPSC Verification Board", credential: "B.Tech Certificate", action: "Downloaded Proof", when: "Feb 15, 2026 — 9:20 AM", fields: ["All Fields"] },
  { who: "Wipro Campus Hiring", credential: "B.Tech Transcript", action: "Verified", when: "Feb 12, 2026 — 4:45 PM", fields: ["CGPA", "Semester Grades"] },
  { who: "Google India HR", credential: "Internship Certificate", action: "Viewed", when: "Feb 10, 2026 — 1:30 PM", fields: ["Duration", "Role", "Issuer"] },
];

const ConsentLog = () => {
  return (
    <DashboardLayout role="student" roleLabel="Student / Holder" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Consent Log</h2>
          <p className="text-sm text-muted-foreground mt-1">Complete timeline of who accessed your credentials and when.</p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-border" />

          <div className="space-y-6">
            {logs.map((log, i) => (
              <div key={i} className="relative pl-14">
                <div className="absolute left-4 top-2 w-4 h-4 rounded-full bg-accent/20 border-2 border-accent" />
                <div className="dashboard-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                        <Building2 className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{log.who}</p>
                        <p className="text-xs text-muted-foreground">{log.action} — {log.credential}</p>
                        <div className="flex items-center gap-1.5 mt-2">
                          <Clock className="w-3 h-3 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">{log.when}</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5 mt-2">
                          {log.fields.map((f) => (
                            <span key={f} className="px-2 py-0.5 rounded bg-muted text-[10px] font-medium text-muted-foreground">{f}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                    <button className="text-accent hover:underline text-xs flex items-center gap-1">
                      <Eye className="w-3 h-3" /> Details
                    </button>
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

export default ConsentLog;
