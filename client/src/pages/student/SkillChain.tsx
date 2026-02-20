import DashboardLayout from "@/components/layout/DashboardLayout";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, Share2, ClipboardList, Award, BarChart3, CheckCircle2, Plus, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/student/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "My Credentials", path: "/student/credentials", icon: <FolderOpen className="w-4 h-4" /> },
  { label: "Share & QR", path: "/student/share", icon: <Share2 className="w-4 h-4" /> },
  { label: "Consent Log", path: "/student/consents", icon: <ClipboardList className="w-4 h-4" /> },
  { label: "SkillChain", path: "/student/skills", icon: <Award className="w-4 h-4" /> },
  { label: "Share Analytics", path: "/student/analytics", icon: <BarChart3 className="w-4 h-4" /> },
];

const badges = [
  { title: "Python Advanced", issuer: "NPTEL", verified: true, hash: "0x4a2b...c1d3" },
  { title: "React Developer", issuer: "Meta Certifications", verified: true, hash: "0x7e8f...a5b6" },
  { title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", verified: true, hash: "0x3c6b...d95e" },
  { title: "Data Structures & Algorithms", issuer: "GeeksforGeeks", verified: false, hash: "pending" },
  { title: "UI/UX Design Fundamentals", issuer: "Coursera / Google", verified: true, hash: "0x9f1a...b2c4" },
  { title: "Summer Internship — SDE", issuer: "Google India", verified: false, hash: "pending" },
];

const SkillChain = () => {
  return (
    <DashboardLayout role="student" roleLabel="Student / Holder" navItems={navItems}>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">SkillChain Profile</h2>
            <p className="text-sm text-muted-foreground mt-1">Micro-credentials, badges, and verified skills.</p>
          </div>
          <Button className="accent-gradient text-accent-foreground border-0 gap-2"><Plus className="w-4 h-4" /> Add Badge</Button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.title}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 card-elevated border border-border hover:border-accent/30"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                  <Award className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-foreground">{badge.title}</h3>
                  <p className="text-xs text-muted-foreground">{badge.issuer}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {badge.verified ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    <span className="text-xs text-accent font-medium">Blockchain Verified</span>
                  </>
                ) : (
                  <>
                    <Shield className="w-3.5 h-3.5 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Verification Pending</span>
                  </>
                )}
              </div>
              {badge.hash !== "pending" && (
                <code className="text-[10px] text-accent/70 font-mono mt-2 block">{badge.hash}</code>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SkillChain;
