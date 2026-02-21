import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shield, Upload, Link2, CheckCircle2, XCircle, AlertTriangle, Copy, ExternalLink, FileUp, FileText, QrCode, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useSearchParams } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import axios from "axios";
import { toast } from "@/hooks/use-toast";

import { Html5QrcodeScanner } from "html5-qrcode";

const API = "http://localhost:5000";

type VerifyResult = "verified" | "tampered" | "revoked" | null;

const VerifyPage = () => {
  const [searchParams] = useSearchParams();
  const [method, setMethod] = useState<"upload" | "link" | "qr">("qr");
  const [result, setResult] = useState<VerifyResult>(null);
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [inputHash, setInputHash] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);

  const processResponse = (resData: any) => {
    setData(resData);
    if (resData.revoked) {
      setResult("revoked");
    } else {
      setResult("verified");
    }
  };

  const handleVerify = async (hash: string) => {
    if (!hash) return;
    setLoading(true);
    setResult(null);
    setData(null);

    try {
      const h = hash.replace(/^0x/, "");
      const res = await axios.get(`${API}/api/verify/${h}`);
      processResponse(res.data);
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || err.response?.data?.error || "Failed to connect to the verification service.";
      if (err.response?.status === 404) {
        setResult("tampered");
        toast({
          variant: "destructive",
          title: "Verification Failed",
          description: errorMessage,
        });
      } else {
        toast({
          variant: "destructive",
          title: "Verification Error",
          description: errorMessage,
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setLoading(true);
    setResult(null);
    setData(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post(`${API}/api/verify/file`, formData);
      if (res.data.verified) {
        processResponse(res.data);
      } else {
        setResult("tampered");
      }
    } catch (err) {
      setResult("tampered");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const hash = searchParams.get("hash");
    if (hash) {
      setMethod("link");
      setInputHash(hash);
      handleVerify(hash);
    }
  }, [searchParams]);

  useEffect(() => {
    if (method === "qr" && !loading && !result) {
      const scanner = new Html5QrcodeScanner(
        "reader",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        /* verbose= */ false
      );

      scanner.render((decodedText) => {
        // Stop scanning once something is found
        scanner.clear();

        // Handle both full URLs and raw hashes
        let hash = decodedText;
        if (decodedText.includes("hash=")) {
          const url = new URL(decodedText);
          hash = url.searchParams.get("hash") || decodedText;
        } else if (decodedText.startsWith("http")) {
          const parts = decodedText.split("/");
          hash = parts[parts.length - 1];
        }

        setInputHash(hash);
        handleVerify(hash);
      }, (error) => {
        // ignore errors
      });

      scannerRef.current = scanner;
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.error("Failed to clear scanner", err));
        scannerRef.current = null;
      }
    };
  }, [method, result]);

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
              Scan a QR code, upload a document, or paste a verification link to instantly verify the authenticity of any academic credential.
            </p>
          </motion.div>

          {/* Method tabs */}
          <div className="flex justify-center gap-2 mb-8">
            {[
              { id: "qr" as const, label: "Scan QR Code", icon: QrCode },
              { id: "upload" as const, label: "Upload Document", icon: Upload },
              { id: "link" as const, label: "Paste Link", icon: Link2 },
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
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileUpload}
            />

            {/* QR method */}
            {method === "qr" && !result && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6 overflow-hidden">
                <div id="reader" className="rounded-xl overflow-hidden border-0"></div>
                <div className="p-4 text-center">
                  <p className="text-xs text-muted-foreground">
                    Point your camera at a credential's QR code to verify instantly.
                  </p>
                </div>
              </motion.div>
            )}

            {/* Upload method */}
            {method === "upload" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6">
                <div
                  className="border-2 border-dashed border-border rounded-xl p-12 text-center hover:border-accent/40 transition-colors cursor-pointer"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <FileUp className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                  <p className="text-sm font-medium text-foreground">Drag & drop or click to upload</p>
                  <p className="text-xs text-muted-foreground mt-1">PDF, DOCX, or image file</p>
                  <p className="text-xs text-muted-foreground mt-4">The file will be hashed and checked against on-chain records.</p>
                </div>
              </motion.div>
            )}

            {/* Link method */}
            {method === "link" && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="dashboard-card mb-6">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link2 className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Paste verification link or hash (0x...)"
                      className="pl-10"
                      value={inputHash}
                      onChange={(e) => setInputHash(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleVerify(inputHash)}
                    />
                  </div>
                  <Button
                    className="accent-gradient text-accent-foreground border-0"
                    onClick={() => handleVerify(inputHash)}
                    disabled={!inputHash || loading}
                  >
                    Verify
                  </Button>
                </div>
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
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className={`relative overflow-hidden rounded-3xl p-8 border-2 shadow-2xl glass-morphism ${result === "verified" ? "border-accent/30 bg-accent/5" :
                    result === "tampered" ? "border-destructive/30 bg-destructive/5" :
                      "border-yellow-500/30 bg-yellow-500/5"
                    }`}
                >
                  {/* Background Glow */}
                  <div className={`absolute -top-24 -right-24 w-64 h-64 rounded-full blur-[100px] opacity-20 ${result === "verified" ? "bg-accent" :
                    result === "tampered" ? "bg-destructive" :
                      "bg-yellow-500"
                    }`} />

                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-8">
                      <div className={`w-20 h-20 rounded-2xl flex items-center justify-center shrink-0 ${result === "verified" ? "accent-gradient shadow-accent/20" :
                        result === "tampered" ? "bg-destructive shadow-destructive/20" :
                          "bg-yellow-500 shadow-yellow-500/20"
                        } shadow-xl`}>
                        {result === "verified" && <CheckCircle2 className="w-10 h-10 text-accent-foreground" />}
                        {result === "tampered" && <XCircle className="w-10 h-10 text-white" />}
                        {result === "revoked" && <AlertTriangle className="w-10 h-10 text-white" />}
                      </div>

                      <div className="text-center md:text-left">
                        <h3 className="text-2xl font-display font-bold text-foreground mb-2">
                          {result === "verified" && "Credential Authenticated"}
                          {result === "tampered" && "Verification Failed"}
                          {result === "revoked" && "Credential Revoked"}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {result === "verified" && "This document has been cryptographically verified against the blockchain registry. Authenticity and integrity are confirmed."}
                          {result === "tampered" && "The document fingerprint does not match any official record. This suggests the file has been altered or was never issued."}
                          {result === "revoked" && `This credential was officially revoked by the issuer${data?.revokedAt ? ' on ' + new Date(data.revokedAt).toLocaleDateString() : '.'}${data?.revokedReason ? ' Reason: ' + data.revokedReason : ''}`}
                        </p>
                      </div>
                    </div>

                    {result === "verified" && data && (
                      <div className="bg-background/40 backdrop-blur-sm rounded-2xl p-6 border border-border/50 space-y-4 mb-8">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                          {[
                            { label: "Student name", value: data.studentName },
                            { label: "Qualification", value: data.degree },
                            { label: "Completion Year", value: data.year },
                            { label: "Issuing Authority", value: data.issuerId },
                            { label: "Issuance Date", value: new Date(data.issuedAt).toLocaleDateString() },
                          ].map((item) => (
                            <div key={item.label} className="flex flex-col gap-1 border-b border-border/30 pb-2 last:border-0 sm:last:border-b">
                              <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">{item.label}</span>
                              <span className="text-sm font-medium text-foreground">{item.value}</span>
                            </div>
                          ))}
                        </div>

                        <div className="pt-4 space-y-3">
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Blockchain Proof</span>
                            <div className="flex items-center gap-2">
                              <Shield className="w-3 h-3 text-accent" />
                              <code className="text-xs font-mono text-accent truncate">{data.payloadHash}</code>
                            </div>
                          </div>
                          <div className="flex flex-col gap-1">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">Transaction ID</span>
                            <code className="text-[10px] font-mono text-muted-foreground truncate">{data.txHash}</code>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                      <Button variant="outline" className="gap-2 rounded-xl h-11 border-border/50 hover:bg-muted/50 transition-all">
                        <Copy className="w-4 h-4" /> Copy Receipt
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 rounded-xl h-11 border-border/50 hover:bg-muted/50 transition-all"
                        onClick={() => window.open(`https://sepolia.etherscan.io/tx/${data?.txHash}`, '_blank')}
                      >
                        <ExternalLink className="w-4 h-4" /> On-Chain Explorer
                      </Button>
                      {result === "verified" && (
                        <Button className="accent-gradient text-accent-foreground border-0 gap-2 rounded-xl h-11 px-6 shadow-lg shadow-accent/20">
                          <Download className="w-4 h-4" /> Download Signed PDF
                        </Button>
                      )}
                    </div>
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
