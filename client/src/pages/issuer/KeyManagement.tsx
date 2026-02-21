import DashboardLayout from "@/components/layout/DashboardLayout";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, ShieldCheck, RotateCcw, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const KeyManagement = () => {
  const { address, isConnected } = useWallet();

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="max-w-3xl space-y-6">
        <div>
          <h2 className="text-2xl font-display font-bold text-foreground">Key Management</h2>
          <p className="text-sm text-muted-foreground mt-1">Manage signing keys and multi-sig configuration.</p>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <KeyRound className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Primary Signing Address</h3>
              <p className="text-xs text-muted-foreground">Connected via MetaMask</p>
            </div>
          </div>
          <div className="p-4 bg-muted rounded-lg">
            <code className="text-sm font-mono text-accent break-all">{address || "0x... (Connect Wallet)"}</code>
          </div>
          <div className="flex items-center gap-2 mt-4">
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-accent" : "bg-destructive"}`} />
            <span className={`text-sm font-medium ${isConnected ? "text-accent" : "text-destructive"}`}>{isConnected ? "Active" : "Disconnected"}</span>
            {isConnected && <span className="text-xs text-muted-foreground ml-2">Currently connected</span>}
          </div>
        </div>

        <div className="dashboard-card">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display font-semibold text-foreground">Multi-Sig Configuration</h3>
              <p className="text-xs text-muted-foreground">2-of-3 approval required for issuance</p>
            </div>
          </div>
          <div className="space-y-3">
            {[
              { name: "Registrar Office", addr: "0x742d...bD18", status: "Active" },
              { name: "Dean of Academics", addr: "0x8f3e...c4a2", status: "Active" },
              { name: "Controller of Exams", addr: "0x1b7c...e9d5", status: "Pending" },
            ].map((signer) => (
              <div key={signer.addr} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-accent" />
                  <div>
                    <p className="text-sm font-medium text-foreground">{signer.name}</p>
                    <code className="text-xs text-muted-foreground font-mono">{signer.addr}</code>
                  </div>
                </div>
                <span className={signer.status === "Active" ? "badge-verified" : "badge-pending"}>{signer.status}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button variant="outline" className="gap-2">
            <RotateCcw className="w-4 h-4" /> Rotate Key
          </Button>
          <Button variant="outline" className="gap-2">
            <Users className="w-4 h-4" /> Add Signer
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default KeyManagement;
