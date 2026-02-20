import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, Hash, FileUp, CheckCircle2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const IssueCred = () => {
  const [file, setFile] = useState<File | null>(null);
  const [hash, setHash] = useState("");
  const [showPreview, setShowPreview] = useState(false);

  const simulateHash = () => {
    setHash("f7a3b2c1d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5");
  };

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Issue New Credential</h2>
          <p className="text-sm text-muted-foreground mt-1">Upload a document and anchor its hash on the blockchain.</p>
        </div>

        {/* File upload */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="dashboard-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">1. Upload Document</h3>
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent/40 transition-colors cursor-pointer"
            onClick={() => {
              const el = document.getElementById("file-input");
              el?.click();
            }}
          >
            <FileUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">{file ? file.name : "Drag & drop or click to upload"}</p>
            <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or image (max 10 MB)</p>
            <input id="file-input" type="file" className="hidden" onChange={(e) => {
              setFile(e.target.files?.[0] || null);
              simulateHash();
            }} />
          </div>
          {hash && (
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Hash className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">SHA-256 Hash</span>
              </div>
              <code className="text-xs text-accent font-mono break-all">{hash}</code>
            </div>
          )}
        </motion.div>

        {/* Metadata */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="dashboard-card"
        >
          <h3 className="font-display font-semibold text-foreground mb-4">2. Credential Metadata</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label>Student Name</Label>
              <Input placeholder="Rahul Sharma" className="mt-1.5" />
            </div>
            <div>
              <Label>Roll Number</Label>
              <Input placeholder="2023BTCS001" className="mt-1.5" />
            </div>
            <div>
              <Label>Degree / Certificate</Label>
              <Input placeholder="B.Tech Computer Science" className="mt-1.5" />
            </div>
            <div>
              <Label>Year of Completion</Label>
              <Input placeholder="2026" className="mt-1.5" />
            </div>
            <div>
              <Label>Serial Number</Label>
              <Input placeholder="IITD/2026/BTCS/001" className="mt-1.5" />
            </div>
            <div>
              <Label>CGPA / Grade</Label>
              <Input placeholder="9.2" className="mt-1.5" />
            </div>
          </div>
          <div className="mt-4">
            <Label>Additional Notes</Label>
            <Textarea placeholder="Any additional remarks..." className="mt-1.5" rows={3} />
          </div>
        </motion.div>

        {/* On-chain info */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="p-4 rounded-xl bg-accent/5 border border-accent/20"
        >
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-accent mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">What will be recorded on-chain:</p>
              <p className="text-xs text-muted-foreground mt-1">
                Issuer ID, Document SHA-256 Hash, Timestamp, Revocation Flag. <strong>No personal information (PII) is stored on-chain.</strong>
              </p>
            </div>
          </div>
        </motion.div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button variant="outline" className="gap-2" onClick={() => setShowPreview(true)}>
            <Eye className="w-4 h-4" /> Preview On-Chain Payload
          </Button>
          <Button className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2">
            Issue Credential (MetaMask)
          </Button>
        </div>

        {showPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="dashboard-card"
          >
            <h3 className="font-display font-semibold text-foreground mb-3">On-Chain Payload Preview</h3>
            <pre className="bg-muted rounded-lg p-4 text-xs font-mono text-foreground overflow-x-auto">
{JSON.stringify({
  issuerId: "0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18",
  documentHash: hash || "pending...",
  timestamp: new Date().toISOString(),
  revoked: false,
  credentialType: "DEGREE_CERTIFICATE",
  version: "2.0"
}, null, 2)}
            </pre>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default IssueCred;
