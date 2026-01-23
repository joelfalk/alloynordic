const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Company Info */}
            <div>
              <h3 className="text-2xl font-bold mb-2">FERRA AB</h3>
              <p className="text-primary-foreground/70">
                Kvalitet utan kompromiss
              </p>
            </div>
            
            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Snabblänkar</h4>
              <nav className="space-y-2">
                <a href="#om-oss" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Om oss
                </a>
                <a href="#tjanster" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Tjänster
                </a>
                <a href="#process" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Vår process
                </a>
                <a href="#kontakt" className="block text-primary-foreground/70 hover:text-primary-foreground transition-colors">
                  Kontakt
                </a>
              </nav>
            </div>
            
            {/* Contact Info */}
            <div>
              <h4 className="font-semibold mb-4">Kontakt</h4>
              <div className="space-y-2 text-primary-foreground/70">
                <p>info@ferra.se</p>
                <p>+46 8 123 45 67</p>
                <p>Stockholm, Sverige</p>
              </div>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-primary-foreground/20 pt-8 text-center">
            <p className="text-primary-foreground/60">
              © {currentYear} Ferra AB. Alla rättigheter förbehållna.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
