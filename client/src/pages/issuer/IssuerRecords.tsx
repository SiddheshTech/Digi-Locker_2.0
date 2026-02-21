import DashboardLayout from "@/components/layout/DashboardLayout";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, FilePlus, FileText, KeyRound, AlertTriangle, Upload, Search, Copy, Share2, XCircle, ExternalLink, Loader2, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useWallet } from "@/context/WalletContext";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

const API = "http://localhost:5000";

const navItems = [
  { label: "Dashboard", path: "/issuer/dashboard", icon: <LayoutDashboard className="w-4 h-4" /> },
  { label: "Issue Credential", path: "/issuer/issue", icon: <FilePlus className="w-4 h-4" /> },
  { label: "Issued Records", path: "/issuer/records", icon: <FileText className="w-4 h-4" /> },
  { label: "Key Management", path: "/issuer/keys", icon: <KeyRound className="w-4 h-4" /> },
  { label: "Batch Issuance", path: "/issuer/batch", icon: <Upload className="w-4 h-4" /> },
  { label: "Fraud Alerts", path: "/issuer/alerts", icon: <AlertTriangle className="w-4 h-4" /> },
];

const IssuerRecords = () => {
  const { getSigner, address } = useWallet();
  const [records, setRecords] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [showQrModal, setShowQrModal] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [qrData, setQrData] = useState<any>(null);
  const [loadingQr, setLoadingQr] = useState(false);

  const fetchRecords = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API}/api/records`);
      setRecords(res.data.results || []);
    } catch (err) {
      console.error("Failed to fetch records", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecords();
  }, []);

  const handleCopyHash = (hash: string) => {
    navigator.clipboard.writeText(hash);
    toast({
      title: "Hash Copied",
      description: "Credential payload hash copied to clipboard.",
    });
  };

  const getVerifyUrl = (payloadHash: string) => {
    const h = payloadHash.replace(/^0x/, "");
    // Use the origin of the current window for verification links
    return `${window.location.origin}/verify?hash=${h}`;
  };

  const handleShareLink = (payloadHash: string) => {
    const url = getVerifyUrl(payloadHash);
    navigator.clipboard.writeText(url);
    toast({
      title: "Link Copied",
      description: "Verification link copied to clipboard.",
    });
  };

  const handleOpenLink = (payloadHash: string) => {
    const url = getVerifyUrl(payloadHash);
    window.open(url, "_blank");
  };

  const handleQrClick = async (record: any) => {
    setSelectedRecord(record);
    setShowQrModal(true);
    setLoadingQr(true);
    setQrData(null);
    try {
      const res = await axios.get(`${API}/api/records/${record.id}/qr`);
      setQrData(res.data);
    } catch (err) {
      console.error("Failed to fetch QR", err);
    } finally {
      setLoadingQr(false);
    }
  };

  const handleRevoke = async (id: string, payloadHash: string) => {
    const reason = window.prompt("Enter revocation reason:");
    if (!reason) return;

    try {
      const signer = await getSigner();
      if (!signer) throw new Error("Wallet not connected");

      // Sign the payload hash to prove authority
      const msg = `Revoke credential: ${payloadHash}\nReason: ${reason}`;
      const signature = await signer.signMessage(msg);

      await axios.post(`${API}/api/records/${id}/revoke`, {
        reason,
        signature,
        issuerId: address,
        effectiveDate: new Date().toISOString()
      });

      toast({
        title: "Credential Revoked",
        description: "The revocation has been anchored on-chain.",
      });
      fetchRecords();
    } catch (err) {
      console.error("Revocation failed", err);
      toast({
        variant: "destructive",
        title: "Revocation Failed",
        description: (err as Error).message || "An error occurred during revocation.",
      });
    }
  };

  const filtered = records.filter((r) =>
    r.payload?.studentName?.toLowerCase().includes(search.toLowerCase()) ||
    r.payloadHash?.toLowerCase().includes(search.toLowerCase()) ||
    r.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout role="issuer" roleLabel="Institution / Issuer" navItems={navItems}>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-display font-bold text-foreground">Issued Records</h2>
            <p className="text-sm text-muted-foreground mt-1">{records.length} credentials issued</p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name or serial..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Serial</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Student</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Degree</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tx Hash</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Date</th>
                  <th className="text-right px-4 py-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((record) => (
                  <tr key={record.id} className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3 text-sm font-mono text-foreground">{record.payload.serialNo || record.id.slice(0, 8)}</td>
                    <td className="px-4 py-3 text-sm font-medium text-foreground">{record.payload.studentName}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{record.payload.degree}</td>
                    <td className="px-4 py-3">
                      <span className={record.status === "issued" ? "badge-verified" : "badge-revoked"}>
                        {record.status === "issued" ? "Active" : "Revoked"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <code className="text-xs text-accent font-mono">{record.txHash?.slice(0, 8)}...</code>
                    </td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">{new Date(record.issuedAt).toLocaleDateString()}</td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Copy Hash" onClick={() => handleCopyHash(record.payloadHash)}><Copy className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="QR Code" onClick={() => handleQrClick(record)}><QrCode className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Share Link" onClick={() => handleShareLink(record.payloadHash)}><Share2 className="w-3.5 h-3.5" /></Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8" title="Open Verification" onClick={() => handleOpenLink(record.payloadHash)}><ExternalLink className="w-3.5 h-3.5" /></Button>
                        {record.status === "issued" && (
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" title="Revoke" onClick={() => handleRevoke(record.id, record.payloadHash)}>
                            <XCircle className="w-3.5 h-3.5" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && !loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                      No records found.
                    </td>
                  </tr>
                )}
                {loading && (
                  <tr>
                    <td colSpan={7} className="px-4 py-12 text-center">
                      <Loader2 className="w-6 h-6 animate-spin text-accent mx-auto" />
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQrModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4 blur-backdrop"
          onClick={() => setShowQrModal(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            className="bg-card rounded-2xl p-8 max-w-md w-full shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-xl font-display font-semibold text-foreground">Credential QR Code</h3>
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setShowQrModal(false)}>
                <XCircle className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-6">
              This QR code points to the official verification page for this specific credential.
            </p>

            <div className="flex flex-col items-center justify-center p-8 bg-muted rounded-xl mb-6 min-h-[250px]">
              {loadingQr ? (
                <div className="flex flex-col items-center gap-3">
                  <Loader2 className="w-8 h-8 animate-spin text-accent" />
                  <p className="text-xs text-muted-foreground">Fetching QR Code...</p>
                </div>
              ) : qrData ? (
                <>
                  <div className="bg-white p-4 rounded-xl shadow-lg mb-4">
                    <img src={qrData.qrDataUrl} alt="Credential QR" className="w-48 h-48" />
                  </div>
                  <p className="text-[10px] font-mono text-muted-foreground truncate max-w-full">
                    {selectedRecord?.payloadHash}
                  </p>
                </>
              ) : (
                <div className="text-center">
                  <AlertTriangle className="w-10 h-10 text-yellow-500 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Failed to load QR code</p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="gap-2"
                onClick={() => {
                  navigator.clipboard.writeText(qrData?.url);
                  toast({ title: "Link Copied" });
                }}
                disabled={!qrData}
              >
                <Copy className="w-4 h-4" /> Link
              </Button>
              <Button
                className="accent-gradient text-accent-foreground border-0 gap-2"
                onClick={() => {
                  const link = document.createElement('a');
                  link.href = qrData.qrDataUrl;
                  link.download = `qr-${selectedRecord?.id?.slice(0, 8)}.png`;
                  link.click();
                }}
                disabled={!qrData}
              >
                <Download className="w-4 h-4" /> Download
              </Button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </DashboardLayout>
  );
};

export default IssuerRecords;
