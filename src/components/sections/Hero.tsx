import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import alloyIcon from "@/assets/alloy-o-icon.png";
import heroBg from "@/assets/hero-bg.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      
      {/* Dark overlay with orange tint */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/80 via-primary/70 to-black/60" />

      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Company Name */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground tracking-tight flex items-center justify-center gap-0">
            <span>ALL</span>
            <img src={alloyIcon} alt="O" className="h-[0.90em] w-auto inline-block brightness-0 invert" />
            <span>Y NORDIC</span>
          </h1>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 font-light tracking-wide">
            {t("hero.tagline")}
          </p>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            {t("hero.subtitle")}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 font-semibold"
            >
              <a href="#kontakt">{t("hero.cta.contact")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 font-semibold bg-transparent"
            >
              <a href="#om-oss">{t("hero.cta.about")}</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 font-semibold bg-transparent"
            >
              <Link to="/tillverkningsprocesser">{t("hero.cta.manufacturing")}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center">
          <div className="w-1.5 h-3 bg-primary-foreground/50 rounded-full mt-2" />
        </div>
      </div>
    </section>
  );
};

export default Hero;
