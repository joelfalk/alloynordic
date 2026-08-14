import { useLanguage } from "@/contexts/LanguageContext";
import alloyIcon from "@/assets/alloy-o-icon.png";

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  const links = [
    { href: "#process", label: t("nav.how") },
    { href: "#tjanster", label: t("nav.services") },
    { href: "#om-oss", label: t("nav.about") },
    { href: "#kontakt", label: t("nav.contact") },
  ];

  return (
    <footer className="bg-background border-t border-border">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8 py-7 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-[9px]">
          <img src={alloyIcon} alt="" className="h-4 w-auto" />
          <span className="text-[13px] font-bold">ALLOY NORDIC</span>
          <span className="text-[13px] text-[#8C8A82]">© {currentYear} · Anderstorp</span>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-[13px] text-[#6E6C64] hover:text-accent transition-colors duration-150"
            >
              {l.label}
            </a>
          ))}
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
