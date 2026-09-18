import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import machineOperator from "@/assets/factory/machine-operator.webp";
import robotArm from "@/assets/factory/robot-arm.webp";
import sheetInspection from "@/assets/factory/sheet-inspection.webp";
import assemblyLine from "@/assets/factory/assembly-line.webp";

const IMAGES = [machineOperator, robotArm, sheetInspection, assemblyLine];

const About = () => {
  const { t } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true });
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());
    emblaApi.on("select", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
    };
  }, [emblaApi]);

  // Auto-advance; paused on hover and skipped for reduced-motion users.
  useEffect(() => {
    if (!emblaApi || paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => emblaApi.scrollNext(), 5000);
    return () => clearInterval(id);
  }, [emblaApi, paused]);

  return (
    <section id="om-oss" className="bg-background py-16 md:py-[110px]">
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[5fr_7fr] gap-10 lg:gap-[72px] items-start">
          <div>
            <span className="font-mono text-[11px] tracking-[0.2em] text-accent-deep">{t("about.kicker")}</span>
            <h2 className="mt-[18px] text-4xl md:text-[44px] font-semibold tracking-[-0.02em] leading-[1.08] [text-wrap:balance]">
              {t("about.h2")}
            </h2>
          </div>
          <div className="lg:pt-2.5">
            <p className="text-lg leading-[1.65] text-[#4A4842]">{t("about.para")}</p>
            <div className="mt-9 flex flex-wrap items-center gap-3.5 font-mono text-[11px] tracking-[0.12em] text-[#6E6C64]">
              <span>{t("about.meta1")}</span>
              <span className="w-[5px] h-[5px] bg-accent" aria-hidden="true" />
              <span>ANDERSTORP</span>
              <span className="w-[5px] h-[5px] bg-accent" aria-hidden="true" />
              <span>{t("about.meta3")}</span>
            </div>
          </div>
        </div>

        {/* Factory carousel */}
        <div
          className="mt-12 md:mt-16 border border-border"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {IMAGES.map((src, i) => (
                <div key={i} className="min-w-0 flex-[0_0_100%]">
                  <div className="aspect-[4/3] sm:aspect-[2/1] overflow-hidden">
                    <img src={src} alt="" loading="lazy" className="w-full h-full object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-between border-t border-border px-4 py-2">
            <span className="font-mono text-[11px] tracking-[0.2em] text-[#6E6C64]">
              {String(index + 1).padStart(2, "0")} / {String(IMAGES.length).padStart(2, "0")}
            </span>
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => emblaApi?.scrollPrev()}
                aria-label={t("about.carousel.prev")}
                className="p-2 text-foreground hover:text-accent-deep transition-colors duration-150"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => emblaApi?.scrollNext()}
                aria-label={t("about.carousel.next")}
                className="p-2 -mr-2 text-foreground hover:text-accent-deep transition-colors duration-150"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
