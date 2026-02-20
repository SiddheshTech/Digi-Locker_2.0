import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, FileUp, GitBranch, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const BatchIssuance = () => {
  const [uploaded, setUploaded] = useState(false);

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
            onClick={() => setUploaded(true)}
          >
            <FileUp className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm text-foreground font-medium">{uploaded ? "batch_credentials_2026.csv" : "Upload CSV file with student data"}</p>
            <p className="text-xs text-muted-foreground mt-1">Columns: name, rollNo, degree, year, serialNo, documentHash</p>
          </div>
        </div>

        {uploaded && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="dashboard-card">
              <div className="flex items-center gap-3 mb-4">
                <GitBranch className="w-5 h-5 text-accent" />
                <h3 className="font-display font-semibold text-foreground">Merkle Tree Visualization</h3>
              </div>
              <div className="bg-muted rounded-xl p-6 text-center">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="px-4 py-2 rounded-lg bg-accent/20 text-accent text-xs font-mono font-bold">
                      Root: 0xab3f...7c2e
                    </div>
                  </div>
                  <div className="flex justify-center gap-8">
                    <div className="px-3 py-1.5 rounded bg-accent/10 text-accent text-[10px] font-mono">0x1a2b...3c4d</div>
                    <div className="px-3 py-1.5 rounded bg-accent/10 text-accent text-[10px] font-mono">0x5e6f...7a8b</div>
                  </div>
                  <div className="flex justify-center gap-4">
                    {["0x9c0d...", "0xe1f2...", "0x3a4b...", "0x5c6d..."].map((h) => (
                      <div key={h} className="px-2 py-1 rounded bg-muted-foreground/10 text-[9px] font-mono text-muted-foreground">{h}</div>
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-4">148 credentials → 1 on-chain transaction</p>
              </div>
            </div>

            <div className="dashboard-card">
              <h3 className="font-display font-semibold text-foreground mb-4">Preview (4 of 148)</h3>
              <div className="space-y-2">
                {[
                  { name: "Rahul Sharma", roll: "2023BTCS001", hash: "0x7f3a...e91b" },
                  { name: "Priya Patel", roll: "2023BTCS002", hash: "0x8b2c...f43d" },
                  { name: "Amit Kumar", roll: "2023BTCS003", hash: "0x1a5e...b72f" },
                  { name: "Neha Singh", roll: "2023BTCS004", hash: "0x9d4f...a18c" },
                ].map((s) => (
                  <div key={s.roll} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <div className="flex items-center gap-3">
                      <CheckCircle2 className="w-4 h-4 text-accent" />
                      <span className="text-sm font-medium text-foreground">{s.name}</span>
                      <span className="text-xs text-muted-foreground">{s.roll}</span>
                    </div>
                    <code className="text-xs text-accent font-mono">{s.hash}</code>
                  </div>
                ))}
              </div>
            </div>

            <Button className="accent-gradient text-accent-foreground border-0 hover:opacity-90 gap-2">
              Anchor Merkle Root on-chain (MetaMask)
            </Button>
          </motion.div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default BatchIssuance;
