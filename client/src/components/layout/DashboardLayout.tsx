import { ReactNode, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { Shield, ChevronLeft, ChevronRight, LogOut, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import WalletButton from "@/components/wallet/WalletButton";

interface NavItem {
  label: string;
  path: string;
  icon: ReactNode;
}

interface DashboardLayoutProps {
  children: ReactNode;
  role: string;
  roleLabel: string;
  navItems: NavItem[];
}

const DashboardLayout = ({ children, role, roleLabel, navItems }: DashboardLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <motion.aside
        animate={{ width: collapsed ? 72 : 260 }}
        className="bg-sidebar flex flex-col shrink-0 border-r border-sidebar-border"
      >
        <div className="flex items-center gap-2.5 h-16 px-4 border-b border-sidebar-border">
          <div className="w-9 h-9 rounded-lg accent-gradient flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-accent-foreground" />
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <span className="text-sm font-bold font-display text-sidebar-foreground">DigiLocker</span>
              <span className="text-[10px] text-sidebar-primary ml-1 font-semibold">2.0</span>
            </div>
          )}
        </div>

        {!collapsed && (
          <div className="px-4 py-3">
            <div className="px-3 py-2 rounded-lg bg-sidebar-accent">
              <p className="text-xs text-sidebar-foreground/60 uppercase tracking-wider font-semibold">{roleLabel}</p>
            </div>
          </div>
        )}

        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const active = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`sidebar-nav-item ${active ? "active" : "text-sidebar-foreground/70"}`}
              >
                <span className="shrink-0">{item.icon}</span>
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-3 border-t border-sidebar-border space-y-1">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="sidebar-nav-item text-sidebar-foreground/50 w-full"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            {!collapsed && <span>Collapse</span>}
          </button>
          <Link to="/" className="sidebar-nav-item text-sidebar-foreground/50">
            <LogOut className="w-4 h-4" />
            {!collapsed && <span>Sign Out</span>}
          </Link>
        </div>
      </motion.aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shrink-0">
          <h1 className="text-lg font-display font-semibold text-foreground">
            {navItems.find((i) => i.path === location.pathname)?.label || roleLabel}
          </h1>
          <div className="flex items-center gap-3">
            <WalletButton />
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-accent" />
            </Button>
            <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
              <span className="text-xs font-bold text-accent">{role[0].toUpperCase()}</span>
            </div>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
