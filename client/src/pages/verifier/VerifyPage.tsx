import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Upload, Link2, QrCode, CheckCircle2, XCircle, AlertTriangle, Copy, ExternalLink, FileUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

type VerifyResult = "verified" | "tampered" | "revoked" | null;

const VerifyPage = () => {
  const [method, setMethod] = useState<"upload" | "link" | "qr">("upload");
  const [result, setResult] = useState<VerifyResult>(null);
  const [loading, setLoading] = useState(false);

  const simulateVerify = (type: VerifyResult) => {
    setLoading(true);
    setResult(null);
    setTimeout(() => {
      setResult(type);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="pt-24 pb-20 px-4">
        <div className="container-tight mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <div className="w-16 h-16 rounded-2xl accent-gradient flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">Verify a Credential</h1>
            <p className="text-muted-foreground max-w-lg mx-auto">
              Upload a document, paste a verification link, or scan a QR code to instantly verify the authenticity of any academic credential.
            </p>
          </motion.div>

          {/* Method tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {[
              { id: "upload" as const, label: "Upload Document", icon: Upload },
              { id: "link" as const, label: "Paste Link", icon: Link2 },
              { id: "qr" as const, label: "Scan QR", icon: QrCode },
            ].map((m) => (
              <Button
                key={m.id}
                variant={method === m.id ? "default" : "outline"}
                className={`gap-2 ${method === m.id ? "accent-gradient text-accent-foreground border-0" : ""}`}
                onClick={() => { setMethod(m.id); setResult(null); }}
              >
                <m.icon className="w-4 h-4" />
                {m.label}
              </Button>
            ))}
          </div>

          <div className="max-w-2xl mx-auto">
            {/* Upload method */}
            {method === "upload" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6">
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-accent/40 transition-colors cursor-pointer"
                  onClick={() => simulateVerify("verified")}
                >
                  <FileUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or image file</p>
                  <p className="text-xs text-muted-foreground mt-4">The file will be hashed client-side (SHA-256) and checked against on-chain records.</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Button variant="outline" size="sm" onClick={() => simulateVerify("tampered")} className="text-xs">Demo: Tampered File</Button>
                  <Button variant="outline" size="sm" onClick={() => simulateVerify("revoked")} className="text-xs">Demo: Revoked Credential</Button>
                </div>
              </motion.div>
            )}

            {/* Link method */}
            {method === "link" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6">
                <div className="flex gap-2">
                  <Input placeholder="Paste verification link or credential hash..." className="flex-1" />
                  <Button className="accent-gradient text-accent-foreground border-0" onClick={() => simulateVerify("verified")}>
                    Verify
                  </Button>
                </div>
              </motion.div>
            )}

            {/* QR method */}
            {method === "qr" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6 text-center">
                <div className="w-64 h-64 bg-muted rounded-xl mx-auto flex items-center justify-center mb-4">
                  <div className="text-center">
                    <QrCode className="w-16 h-16 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">Camera access required</p>
                  </div>
                </div>
                <Button onClick={() => simulateVerify("verified")}>Demo: Simulate QR Scan</Button>
              </motion.div>
            )}

            {/* Loading */}
            {loading && (
              <div className="text-center py-8">
                <div className="w-12 h-12 border-4 border-accent/20 border-t-accent rounded-full animate-spin mx-auto" />
                <p className="text-sm text-muted-foreground mt-4">Computing hash & querying blockchain...</p>
              </div>
            )}

            {/* Result */}
            <AnimatePresence>
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className={`rounded-2xl p-8 border-2 ${
                    result === "verified" ? "bg-accent/5 border-accent" :
                    result === "tampered" ? "bg-destructive/5 border-destructive" :
                    "bg-yellow-500/5 border-yellow-500"
                  }`}
                >
                  <div className="flex items-center gap-4 mb-6">
                    {result === "verified" && <CheckCircle2 className="w-12 h-12 text-accent" />}
                    {result === "tampered" && <XCircle className="w-12 h-12 text-destructive" />}
                    {result === "revoked" && <AlertTriangle className="w-12 h-12 text-yellow-500" />}
                    <div>
                      <h3 className="text-xl font-display font-bold text-foreground">
                        {result === "verified" && "✅ Credential Verified"}
                        {result === "tampered" && "❌ Verification Failed — Document Tampered"}
                        {result === "revoked" && "⚠️ Credential Revoked"}
                      </h3>
                      <p className="text-sm text-muted-foreground mt-1">
                        {result === "verified" && "This file matches an on-chain record. Authenticity confirmed."}
                        {result === "tampered" && "The document hash does not match any on-chain record. This file may have been altered."}
                        {result === "revoked" && "This credential was revoked by the issuing institution on Feb 10, 2026."}
                      </p>
                    </div>
                  </div>

                  {result === "verified" && (
                    <div className="space-y-3 mb-6">
                      {[
                        { label: "Issuer", value: "IIT Delhi" },
                        { label: "Issued Date", value: "January 15, 2026" },
                        { label: "Credential", value: "B.Tech Computer Science" },
                        { label: "Transaction ID", value: "0x7f3a8b2c1d8e9f0a1b2c3d4e5f6a7b8c...e91b", mono: true },
                        { label: "Block Number", value: "19,847,293" },
                      ].map((item) => (
                        <div key={item.label} className="flex justify-between items-center py-2 border-b border-border last:border-0">
                          <span className="text-sm text-muted-foreground">{item.label}</span>
                          <span className={`text-sm font-medium text-foreground ${item.mono ? "font-mono text-xs" : ""}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button variant="outline" className="gap-2"><Copy className="w-4 h-4" /> Copy Receipt</Button>
                    <Button variant="outline" className="gap-2"><ExternalLink className="w-4 h-4" /> View on Etherscan</Button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VerifyPage;
