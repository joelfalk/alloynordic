import { FileSearch, Users, Inbox, LineChart, Award, type LucideIcon } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = { num: string; labelKey: string; Icon: LucideIcon };

const STEPS: Step[] = [
  { num: "01", labelKey: "hero.flow.step1", Icon: FileSearch },
  { num: "02", labelKey: "hero.flow.step2", Icon: Users },
  { num: "03", labelKey: "hero.flow.step3", Icon: Inbox },
  { num: "04", labelKey: "hero.flow.step4", Icon: LineChart },
  { num: "05", labelKey: "hero.flow.step5", Icon: Award },
];

const BASE_DELAY = 900; // ms — efter hero-rullgardinen
const STEP_STEP = 120;  // ms mellan steg

const ProcessFlow = () => {
  const { t } = useLanguage();

  return (
    <div className="mt-8 max-w-3xl" aria-label={t("hero.banner.body")}>
      {/* Desktop / tablet: horisontellt */}
      <ol className="hidden md:flex items-center gap-3">
        {STEPS.map((step, i) => (
          <li key={step.num} className="flex items-center gap-3 flex-1 last:flex-none">
            <div
              className="flex flex-col items-start gap-2 motion-safe:opacity-0 motion-safe:animate-slide-in-left"
              style={{ animationDelay: `${BASE_DELAY + i * STEP_STEP}ms` }}
            >
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs text-accent tracking-[0.2em]">{step.num}</span>
                <step.Icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
              </div>
              <span className="text-xs md:text-sm font-medium text-white/90 uppercase tracking-wider whitespace-nowrap">
                {t(step.labelKey)}
              </span>
            </div>

            {i < STEPS.length - 1 && (
              <div className="relative flex-1 h-px bg-white/15 overflow-hidden">
                <div
                  className="absolute inset-0 bg-accent origin-left motion-safe:scale-x-0 motion-safe:animate-connector-grow"
                  style={{ animationDelay: `${BASE_DELAY + i * STEP_STEP + 200}ms` }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>

      {/* Mobil: vertikalt */}
      <ol className="md:hidden flex flex-col gap-2">
        {STEPS.map((step, i) => (
          <li key={step.num} className="flex flex-col items-start">
            <div
              className="flex items-center gap-3 motion-safe:opacity-0 motion-safe:animate-slide-in-left"
              style={{ animationDelay: `${BASE_DELAY + i * STEP_STEP}ms` }}
            >
              <span className="font-mono text-xs text-accent tracking-[0.2em]">{step.num}</span>
              <step.Icon className="w-4 h-4 text-white/70" strokeWidth={1.5} />
              <span className="text-sm font-medium text-white/90 uppercase tracking-wider">
                {t(step.labelKey)}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="ml-[0.4rem] w-px h-4 bg-white/15 relative overflow-hidden">
                <div
                  className="absolute inset-0 bg-accent origin-top motion-safe:scale-y-0 motion-safe:animate-connector-grow"
                  style={{ animationDelay: `${BASE_DELAY + i * STEP_STEP + 200}ms` }}
                />
              </div>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default ProcessFlow;