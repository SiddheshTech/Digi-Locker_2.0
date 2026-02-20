import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, Share2, ClipboardList, Award, BarChart3, Eye, Download, QrCode, CheckCircle2, Clock, Shield } from "lucide-react";
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
  { id: 1, title: "B.Tech Computer Science", issuer: "IIT Delhi", status: "verified", date: "Jan 15, 2026", tx: "0x7f3a...e91b", type: "Degree" },
  { id: 2, title: "Machine Learning Specialization", issuer: "NPTEL / IIT Madras", status: "verified", date: "Dec 10, 2025", tx: "0x8b2c...f43d", type: "Certificate" },
  { id: 3, title: "Summer Internship Completion", issuer: "Google India", status: "pending", date: "Mar 2, 2026", tx: "pending", type: "Internship" },
  { id: 4, title: "B.Tech Transcript (Semester 1-8)", issuer: "IIT Delhi", status: "verified", date: "Jan 20, 2026", tx: "0x9d4f...a18c", type: "Transcript" },
  { id: 5, title: "AWS Cloud Practitioner", issuer: "Amazon Web Services", status: "verified", date: "Nov 5, 2025", tx: "0x3c6b...d95e", type: "Certification" },
];

const [shareModalId, setShareModalId] = [0, () => {}]; // placeholder

const StudentCredentials = () => {
  const [selectedCred, setSelectedCred] = useState<number | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);

  return (
    <DashboardLayout role="student" roleLabel="Student / Holder" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">My Credentials</h2>
          <p className="text-sm text-muted-foreground mt-1">{credentials.length} verified credentials in your wallet</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {credentials.map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 card-elevated border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{cred.type}</span>
                <span className={cred.status === "verified" ? "badge-verified" : "badge-pending"}>
                  {cred.status === "verified" ? <><CheckCircle2 className="w-3 h-3" /> Verified</> : <><Clock className="w-3 h-3" /> Pending</>}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-1">{cred.title}</h3>
              <p className="text-xs text-muted-foreground mb-1">{cred.issuer}</p>
              <p className="text-xs text-muted-foreground">{cred.date}</p>

              {cred.tx !== "pending" && (
                <div className="mt-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-accent" />
                  <code className="text-[10px] text-accent font-mono">{cred.tx}</code>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs h-8 flex-1 gap-1"><Eye className="w-3 h-3" /> View</Button>
                <Button variant="outline" size="sm" className="text-xs h-8 flex-1 gap-1" onClick={() => setShowShareModal(true)}>
                  <Share2 className="w-3 h-3" /> Share
                </Button>
                <Button variant="outline" size="sm" className="text-xs h-8 gap-1"><Download className="w-3 h-3" /></Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Share Modal */}
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">Share Credential</h3>
              <p className="text-sm text-muted-foreground mb-6">
                By sharing this link you disclose ONLY the fields you selected. You can revoke access anytime.
              </p>

              <div className="space-y-3 mb-6">
                <h4 className="text-sm font-medium text-foreground">Select fields to disclose:</h4>
                {["Degree Name", "Institution", "Year of Completion", "CGPA / Grade", "Student Name", "Roll Number"].map((field) => (
                  <label key={field} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                    <input type="checkbox" defaultChecked={["Degree Name", "Institution", "Year of Completion"].includes(field)} className="rounded border-border accent-accent" />
                    <span className="text-sm text-foreground">{field}</span>
                  </label>
                ))}
              </div>

              <div className="flex items-center justify-center p-6 bg-muted rounded-xl mb-4">
                <div className="w-32 h-32 bg-foreground/10 rounded-lg flex items-center justify-center">
                  <QrCode className="w-16 h-16 text-muted-foreground" />
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 accent-gradient text-accent-foreground border-0">Copy Share Link</Button>
                <Button variant="outline" className="flex-1">Download QR</Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentCredentials;
