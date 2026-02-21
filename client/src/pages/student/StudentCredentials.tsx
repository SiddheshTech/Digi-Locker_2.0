import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FolderOpen, Share2, ClipboardList, Award, BarChart3, Eye, Download, QrCode, CheckCircle2, Clock, Shield, XCircle, Loader2, AlertTriangle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

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

const [shareModalId, setShareModalId] = [0, () => { }]; // placeholder

const StudentCredentials = () => {
  const [selectedCred, setSelectedCred] = useState<any | null>(null);
  const [showShareModal, setShowShareModal] = useState(false);
  const [qrData, setQrData] = useState<{ url: string, qrDataUrl: string } | null>(null);
  const [loadingQr, setLoadingQr] = useState(false);

  // Use the actual credentials from the store/API in a real app, 
  // but for now we'll fetch them from the backend if possible.
  const [records, setRecords] = useState<any[]>([]);

  useState(() => {
    axios.get("http://localhost:5000/api/records").then(res => {
      setRecords(res.data.results || []);
    }).catch(err => {
      console.error("Failed to fetch records", err);
    });
  });

  const handleShareClick = async (cred: any) => {
    setSelectedCred(cred);
    setShowShareModal(true);
    setLoadingQr(true);
    setQrData(null);
    try {
      const res = await axios.get(`http://localhost:5000/api/records/${cred.id}/qr`);
      setQrData(res.data);
    } catch (err) {
      console.error("Failed to fetch QR", err);
    } finally {
      setLoadingQr(false);
    }
  };

  const handleDownloadQR = () => {
    if (!qrData) return;
    const link = document.createElement("a");
    link.href = qrData.qrDataUrl;
    link.download = `credential-qr-${selectedCred?.id}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyLink = () => {
    if (!qrData) return;
    navigator.clipboard.writeText(qrData.url);
    toast({
      title: "Link Copied",
      description: "Verification link copied to clipboard.",
    });
  };

  return (
    <DashboardLayout role="student" roleLabel="Student / Holder" navItems={navItems}>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">My Credentials</h2>
          <p className="text-sm text-muted-foreground mt-1">{records.length || credentials.length} verified credentials in your wallet</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {(records.length > 0 ? records : credentials).map((cred, i) => (
            <motion.div
              key={cred.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-card rounded-xl p-5 card-elevated border border-border hover:border-accent/30 transition-all"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-md bg-muted text-xs font-medium text-muted-foreground">{cred.type || "Degree"}</span>
                <span className={cred.status === "verified" || cred.status === "issued" ? "badge-verified" : "badge-pending"}>
                  {cred.status === "verified" || cred.status === "issued" ? <><CheckCircle2 className="w-3 h-3" /> Verified</> : <><Clock className="w-3 h-3" /> Pending</>}
                </span>
              </div>

              <h3 className="text-sm font-semibold text-foreground mb-1">{cred.title || cred.payload?.degree}</h3>
              <p className="text-xs text-muted-foreground mb-1">{cred.issuer || cred.payload?.issuerId}</p>
              <p className="text-xs text-muted-foreground">{cred.date || (cred.issuedAt ? new Date(cred.issuedAt).toLocaleDateString() : 'N/A')}</p>

              {(cred.tx !== "pending" && cred.txHash) && (
                <div className="mt-3 flex items-center gap-1.5">
                  <Shield className="w-3 h-3 text-accent" />
                  <code className="text-[10px] text-accent font-mono">{(cred.txHash || cred.tx).slice(0, 16)}...</code>
                </div>
              )}

              <div className="flex gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-xs h-8 flex-1 gap-1"><Eye className="w-3 h-3" /> View</Button>
                <Button variant="outline" size="sm" className="text-xs h-8 flex-1 gap-1" onClick={() => handleShareClick(cred)}>
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
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-display font-semibold text-foreground">Share Credential</h3>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowShareModal(false)}><XCircle className="w-4 h-4" /></Button>
              </div>
              <p className="text-sm text-muted-foreground mb-6">
                Scan this QR code or share the link to verify this credential instantly.
              </p>

              <div className="flex items-center justify-center p-6 bg-muted rounded-xl mb-6 relative min-h-[200px]">
                {loadingQr ? (
                  <div className="flex flex-col items-center gap-3">
                    <Loader2 className="w-8 h-8 animate-spin text-accent" />
                    <p className="text-xs text-muted-foreground">Generating QR Code...</p>
                  </div>
                ) : qrData ? (
                  <div className="bg-white p-3 rounded-lg shadow-sm">
                    <img src={qrData.qrDataUrl} alt="Credential QR Code" className="w-40 h-40" />
                  </div>
                ) : (
                  <div className="text-center">
                    <AlertTriangle className="w-8 h-8 text-yellow-500 mx-auto mb-2" />
                    <p className="text-xs text-muted-foreground">Failed to load QR code</p>
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4">
                <Button className="flex-1 accent-gradient text-accent-foreground border-0" onClick={handleCopyLink} disabled={!qrData}>
                  <Copy className="w-4 h-4 mr-2" /> Copy Link
                </Button>
                <Button variant="outline" className="flex-1" onClick={handleDownloadQR} disabled={!qrData}>
                  <Download className="w-4 h-4 mr-2" /> Download
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudentCredentials;
