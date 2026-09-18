import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import alloyIcon from "@/assets/alloy-o-icon.png";
import { useLanguage } from "@/contexts/LanguageContext";

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { t, language, setLanguage } = useLanguage();
  const { pathname } = useLocation();
  const onHome = pathname === "/";
  const anchor = (hash: string) => (onHome ? hash : `/${hash}`);

  const links = [
    { href: anchor("#process"), label: t("nav.how") },
    { href: anchor("#tjanster"), label: t("nav.services") },
    { href: anchor("#material"), label: t("nav.materials") },
    { href: anchor("#om-oss"), label: t("nav.about") },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[rgba(241,240,236,0.9)] backdrop-blur-[10px] border-b border-border">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="h-[62px] flex items-center justify-between gap-6">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 text-foreground">
            <img src={alloyIcon} alt="" className="h-[22px] w-auto" />
            <span className="font-bold tracking-[-0.01em] text-base">ALLOY NORDIC</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-[30px]">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-[#4A4842] hover:text-accent-deep transition-colors duration-150"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-[18px]">
            {/* Lang switch */}
            <div className="hidden sm:flex items-center gap-[5px] font-mono text-[11px] text-[#6E6C64]">
              <button
                onClick={() => setLanguage("sv")}
                className={cn(
                  "transition-colors duration-150 hover:text-accent-deep",
                  language === "sv" && "text-accent-deep font-bold",
                )}
                aria-label="Svenska"
              >
                SV
              </button>
              <span className="opacity-50">/</span>
              <button
                onClick={() => setLanguage("en")}
                className={cn(
                  "transition-colors duration-150 hover:text-accent-deep",
                  language === "en" && "text-accent-deep font-bold",
                )}
                aria-label="English"
              >
                EN
              </button>
            </div>

            <a
              href={anchor("#kontakt")}
              className="hidden sm:inline-block bg-accent-deep text-accent-foreground text-[13px] font-semibold px-5 py-2.5 hover:bg-[#9C2E08] transition-colors duration-150"
            >
              {t("nav.cta")}
            </a>

            {/* Mobile hamburger */}
            <button
              className="lg:hidden p-2 -mr-2 text-foreground"
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
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="px-2 py-2.5 text-sm font-medium text-[#4A4842] hover:text-accent-deep"
              >
                {l.label}
              </a>
            ))}
            <a
              href={anchor("#kontakt")}
              onClick={() => setMobileOpen(false)}
              className="mt-2 mx-2 bg-accent-deep text-accent-foreground text-center text-[13px] font-semibold px-5 py-2.5"
            >
              {t("nav.cta")}
            </a>
            <div className="flex gap-2 pt-3 px-2 font-mono text-[11px] text-[#6E6C64]">
              <button
                onClick={() => setLanguage("sv")}
                className={cn("px-2 py-1 border border-border", language === "sv" && "text-accent-deep font-bold border-accent-deep")}
              >
                SV
              </button>
              <button
                onClick={() => setLanguage("en")}
                className={cn("px-2 py-1 border border-border", language === "en" && "text-accent-deep font-bold border-accent-deep")}
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
