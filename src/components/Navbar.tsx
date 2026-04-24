import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import alloyIcon from "@/assets/alloy-o-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { href: onHome ? "#om-oss" : "/#om-oss", label: t("footer.about") },
    { href: onHome ? "#tjanster" : "/#tjanster", label: t("footer.services") },
    { href: onHome ? "#process" : "/#process", label: t("footer.process") },
    { href: "/tillverkningsprocesser", label: t("footer.manufacturing"), router: true },
  ];

  const solid = scrolled || !onHome || mobileOpen;

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        solid
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent",
      )}
    >
      <div className="container px-4">
        <div className="h-16 flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <img
              src={alloyIcon}
              alt=""
              className={cn(
                "h-6 w-auto transition-all",
                solid ? "" : "brightness-0 invert",
              )}
            />
            <span
              className={cn(
                "font-bold tracking-tight text-base sm:text-lg",
                solid ? "text-foreground" : "text-white",
              )}
            >
              ALLOY NORDIC
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {links.map((l) =>
              l.router ? (
                <Link
                  key={l.href}
                  to={l.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    solid ? "text-foreground/80" : "text-white/90",
                  )}
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-accent",
                    solid ? "text-foreground/80" : "text-white/90",
                  )}
                >
                  {l.label}
                </a>
              ),
            )}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-3">
            {/* Lang switch */}
            <div
              className={cn(
                "hidden sm:flex items-center gap-1 text-xs font-mono",
                solid ? "text-foreground/60" : "text-white/70",
              )}
            >
              <button
                onClick={() => setLanguage("sv")}
                className={cn(
                  "px-1.5 py-0.5 transition-colors hover:text-accent",
                  language === "sv" && "text-accent",
                )}
                aria-label="Svenska"
              >
                SV
              </button>
              <span className="opacity-40">/</span>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "px-1.5 py-0.5 transition-colors hover:text-accent",
                  language === "en" && "text-accent",
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <Button
              asChild
              size="sm"
              className="hidden sm:inline-flex bg-accent text-accent-foreground hover:bg-accent/90"
            >
              <a href={onHome ? "#kontakt" : "/#kontakt"}>{t("hero.cta.contact")}</a>
            </Button>

            {/* Mobile hamburger */}
            <button
              className={cn(
                "lg:hidden p-2 -mr-2",
                solid ? "text-foreground" : "text-white",
              )}
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <nav className="lg:hidden pb-4 flex flex-col gap-1 border-t border-border pt-3">
            {links.map((l) =>
              l.router ? (
                <Link
                  key={l.href}
                  to={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium text-foreground/80 hover:text-accent"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMobileOpen(false)}
                  className="px-2 py-2.5 text-sm font-medium text-foreground/80 hover:text-accent"
                >
                  {l.label}
                </a>
              ),
            )}
            <div className="flex gap-2 pt-2 px-2">
              <button
                onClick={() => setLanguage("sv")}
                className={cn(
                  "text-xs font-mono px-2 py-1 border border-border",
                  language === "sv" && "bg-accent text-accent-foreground border-accent",
                )}
              >
                SV
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "text-xs font-mono px-2 py-1 border border-border",
                  language === "en" && "bg-accent text-accent-foreground border-accent",
                )}
              >
                EN
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Navbar;
