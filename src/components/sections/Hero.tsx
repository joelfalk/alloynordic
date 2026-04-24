import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import alloyIcon from "@/assets/alloy-o-icon.png";
import heroBg from "@/assets/hero-options/raw-materials.jpg";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      {/* Layered overlays — keep image visible */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/70 to-primary/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-transparent to-primary/40" />

      {/* Decorative kicker line */}
      <div className="absolute top-24 left-0 right-0 hidden md:block">
        <div className="container px-4">
          <div className="flex items-center gap-3 text-white/60 font-mono text-xs uppercase tracking-[0.25em]">
            <span className="block w-12 h-px bg-accent" />
            EST. 1989 · STOCKHOLM
          </div>
        </div>
      </div>

      <div className="container relative z-10 px-4 pt-24 pb-32">
        <div className="max-w-4xl">
          {/* Company Name */}
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white tracking-tight flex items-center gap-0 leading-none">
            <span>ALL</span>
            <img
              src={alloyIcon}
              alt="O"
              className="h-[0.85em] w-auto inline-block brightness-0 invert"
            />
            <span>Y</span>
            <span className="text-accent ml-3 sm:ml-4">NORDIC</span>
          </h1>

          {/* Tagline */}
          <p className="mt-8 text-2xl md:text-3xl lg:text-4xl text-white font-light tracking-tight max-w-2xl">
            {t("hero.tagline")}
          </p>

          {/* Subtitle */}
          <p className="mt-5 text-base md:text-lg text-white/70 max-w-xl leading-relaxed">
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 px-7 py-6 text-base font-semibold rounded-none"
            >
              <a href="#kontakt" className="inline-flex items-center gap-2">
                {t("hero.cta.contact")}
                <ArrowRight className="w-4 h-4" />
              </a>
            </Button>
            <Link
              to="/tillverkningsprocesser"
              className="group inline-flex items-center gap-2 text-white/90 hover:text-accent text-base font-medium transition-colors"
            >
              {t("hero.cta.manufacturing")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>

      {/* Stat bar at bottom of hero */}
      <div className="absolute bottom-0 left-0 right-0 z-10 border-t border-white/15 bg-primary/40 backdrop-blur-sm">
        <div className="container px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {[
              { v: "35+", l: t("hero.stat.years") },
              { v: "20+", l: t("hero.stat.countries") },
              { v: "24h", l: t("hero.stat.response") },
              { v: "100%", l: t("hero.stat.qc") },
            ].map((s, i) => (
              <div key={i} className="py-5 px-4 first:pl-0">
                <div className="font-mono text-2xl md:text-3xl font-bold text-accent leading-none">
                  {s.v}
                </div>
                <div className="mt-1.5 text-[11px] md:text-xs uppercase tracking-wider text-white/60">
                  {s.l}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
