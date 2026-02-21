import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, FileUp, GitBranch, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import axios from "axios";

const API = "http://localhost:5000";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const BatchIssuance = () => {
  const { address } = useWallet();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFile(f);
  };

  const handleBatch = async () => {
    if (!file) return;
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(`${API}/api/issue/batch`, formData, {
        headers: {
          "x-issuer-address": address || "0xMOCK_ISSUER"
        }
      });
      setResult(res.data);
    } catch (err) {
      console.error("Batch issuance failed", err);
      alert("Batch issuance failed. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="max-w-4xl space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Batch Issuance</h2>
          <p className="text-sm text-muted-foreground mt-1">Issue hundreds of credentials with a single on-chain transaction using Merkle Tree aggregation.</p>
        </div>

        <div className="dashboard-card">
          <h3 className="font-display font-semibold text-foreground mb-4">Upload CSV</h3>
          <div
            className="border-2 border-dashed border-border rounded-xl p-10 text-center hover:border-accent/40 transition-colors cursor-pointer"
            onClick={() => fileRef.current?.click()}
          >
            <FileUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">{file ? file.name : "Upload CSV file with student data"}</p>
            <p className="text-xs text-muted-foreground mt-1">Columns: studentName, rollNo, degree, year, serialNo, fileHash</p>
            <input ref={fileRef} type="file" accept=".csv" className="hidden" onChange={handleFile} />
          </div>
        </div>

        {file && !result && (
          <Button
            disabled={loading}
            onClick={handleBatch}
            className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            Process Batch & Anchor Root
          </Button>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="dashboard-card border-green-500/20 bg-green-500/5">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 text-green-500" />
                <h3 className="font-display font-semibold text-foreground">Batch Anchored Successfully</h3>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><p className="text-muted-foreground">Merkle Root</p><code className="text-xs font-mono text-accent">{result.merkleRoot.slice(0, 16)}...</code></div>
                <div><p className="text-muted-foreground">Student Count</p><span className="font-bold text-foreground">{result.studentCount}</span></div>
                <div className="col-span-2"><p className="text-muted-foreground">Transaction Hash</p><code className="text-xs font-mono text-accent">{result.txHash}</code></div>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="font-display font-semibold text-foreground mb-4">Batch Preview (Top 5)</h3>
              <div className="space-y-2">
                {result.students.slice(0, 5).map((s: any) => (
                  <div key={s.rollNo} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">{s.studentName}</span>
                      <span className="text-xs text-muted-foreground">{s.rollNo}</span>
                    </div>
                    <code className="text-xs text-accent font-mono">{s.payloadHash.slice(0, 10)}...</code>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BatchIssuance;
