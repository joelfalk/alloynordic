import { Button } from "@/components/ui/button";
import alloyIcon from "@/assets/alloy-o-icon.png";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-primary to-primary/90 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Company Name - Crossword Layout */}
          <div className="relative text-5xl md:text-7xl lg:text-8xl font-bold text-primary-foreground tracking-tight inline-block">
            {/* Vertical: N (above the O) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none" style={{ bottom: '100%' }}>
              <span>N</span>
            </div>
            
            {/* Horizontal: ALLOY */}
            <div className="flex items-center justify-center leading-none">
              <span>A</span>
              <span>L</span>
              <span>L</span>
              <img src={alloyIcon} alt="O" className="h-[1em] w-auto brightness-0 invert" />
              <span>Y</span>
            </div>
            
            {/* Vertical: RDIC (below the O) */}
            <div className="absolute left-1/2 -translate-x-1/2 flex flex-col items-center leading-none" style={{ top: '100%' }}>
              <span>R</span>
              <span>D</span>
              <span>I</span>
              <span>C</span>
            </div>
          </div>

          {/* Tagline */}
          <p className="text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 font-light tracking-wide">
            Kvalitet utan kompromiss
          </p>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-primary-foreground/70 max-w-2xl mx-auto">
            Din partner för metalldelar från Asien sen 1989
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Button
              asChild
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6 font-semibold"
            >
              <a href="#kontakt">Kontakta oss</a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary text-lg px-8 py-6 font-semibold bg-transparent"
            >
              <a href="#om-oss">Om oss</a>
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
