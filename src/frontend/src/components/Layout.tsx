import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Toaster } from "@/components/ui/sonner";
import { useAuth } from "@/hooks/use-auth";
import { useIsAdmin } from "@/hooks/use-vehicles";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Car,
  LayoutDashboard,
  LogIn,
  LogOut,
  Menu,
  Shield,
  X,
} from "lucide-react";
import { useState } from "react";

const NAV_LINKS = [
  { href: "/vehicles", label: "Fleet" },
  { href: "/#why-choose-us", label: "How It Works" },
  { href: "/#featured", label: "Why DriveEasy" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, isLoggingIn, login, logout } = useAuth();
  const { data: isAdmin } = useIsAdmin();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-card border-b border-border shadow-card">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-display font-bold text-xl text-foreground hover:text-accent transition-colors duration-200"
              data-ocid="nav.logo.link"
            >
              <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center">
                <Car className="w-4 h-4 text-accent-foreground" />
              </div>
              <span>DriveEasy</span>
              <span className="text-accent">Rentals</span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    currentPath === link.href
                      ? "bg-accent/10 text-accent"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                  data-ocid={`nav.${link.label.toLowerCase().replace(/\s+/g, "-")}.link`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Auth Controls */}
            <div className="hidden md:flex items-center gap-2">
              {isAuthenticated && (
                <>
                  <Link to="/dashboard">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="gap-2"
                      data-ocid="nav.dashboard.button"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Bookings
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="gap-2 text-accent hover:text-accent"
                        data-ocid="nav.admin.button"
                      >
                        <Shield className="w-4 h-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className="gap-2"
                    data-ocid="nav.logout.button"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              )}
              {!isAuthenticated && (
                <Button
                  size="sm"
                  onClick={login}
                  disabled={isLoggingIn}
                  className="gap-2 bg-accent hover:bg-accent/90 text-accent-foreground"
                  data-ocid="nav.login.button"
                >
                  <LogIn className="w-4 h-4" />
                  {isLoggingIn ? "Signing in…" : "Sign In"}
                </Button>
              )}
            </div>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              type="button"
              onClick={() => setMobileOpen((o) => !o)}
              aria-label="Toggle menu"
              data-ocid="nav.mobile_menu.toggle"
            >
              {mobileOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border bg-card">
            <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
                >
                  {link.label}
                </Link>
              ))}
              <Separator className="my-2" />
              {isAuthenticated ? (
                <>
                  <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start gap-2"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      My Bookings
                    </Button>
                  </Link>
                  {isAdmin && (
                    <Link to="/admin" onClick={() => setMobileOpen(false)}>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-start gap-2 text-accent"
                      >
                        <Shield className="w-4 h-4" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      logout();
                      setMobileOpen(false);
                    }}
                    className="gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </Button>
                </>
              ) : (
                <Button
                  size="sm"
                  onClick={() => {
                    login();
                    setMobileOpen(false);
                  }}
                  disabled={isLoggingIn}
                  className="gap-2 bg-accent text-accent-foreground"
                >
                  <LogIn className="w-4 h-4" />
                  Sign In with Internet Identity
                </Button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 bg-background">{children}</main>

      {/* Footer */}
      <footer className="bg-card border-t border-border">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 font-display font-bold text-lg text-foreground mb-3">
                <div className="w-7 h-7 rounded-md bg-accent flex items-center justify-center">
                  <Car className="w-4 h-4 text-accent-foreground" />
                </div>
                DriveEasy Rentals
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Premium vehicle rental made simple. Discover our fleet and book
                your next journey with confidence.
              </p>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/vehicles"
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Our Fleet
                  </Link>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    About Us
                  </span>
                </li>
                <li>
                  <span className="text-sm text-muted-foreground">
                    Locations
                  </span>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                Support
              </h4>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "FAQs"].map((item) => (
                  <li key={item}>
                    <span className="text-sm text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-display font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">
                Legal
              </h4>
              <ul className="space-y-2">
                {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(
                  (item) => (
                    <li key={item}>
                      <span className="text-sm text-muted-foreground">
                        {item}
                      </span>
                    </li>
                  ),
                )}
              </ul>
            </div>
          </div>

          <Separator className="my-8" />

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} DriveEasy Rentals. All rights
              reserved.
            </p>
            <p className="text-sm text-muted-foreground">
              Built with love using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>

      <Toaster richColors position="top-right" />
    </div>
  );
}
