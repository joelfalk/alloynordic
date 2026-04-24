import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";
import alloyIcon from "@/assets/alloy-o-icon.png";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  const {
    t
  } = useLanguage();
  return <footer className="bg-primary text-primary-foreground py-16 border-t border-white/10">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-3 tracking-tight flex items-center gap-0">
                <span>ALL</span>
                <img
                  src={alloyIcon}
                  alt="O"
                  className="h-[0.85em] w-auto inline-block brightness-0 invert"
                />
                <span>Y&nbsp;NORDIC</span>
              </h3>
              <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
                {t("footer.tagline")}
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.quickLinks")}</h4>
              <nav className="space-y-2">
                <a href="#om-oss" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t("footer.about")}
                </a>
                <a href="#tjanster" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t("footer.services")}
                </a>
                <a href="#process" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t("footer.process")}
                </a>
                <Link to="/tillverkningsprocesser" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t("footer.manufacturing")}
                </Link>
                <a href="#kontakt" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  {t("footer.contactLink")}
                </a>
              </nav>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">{t("footer.contact")}</h4>
              <div className="space-y-2 text-primary-foreground/70">
                <p>joel@alloynordic.se</p>
                <p>+46 070 66 750 99</p>
                <p>Ågatan 47, 334 32 Anderstorp</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © {currentYear} Alloy Nordic. {t("footer.rights")}
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;