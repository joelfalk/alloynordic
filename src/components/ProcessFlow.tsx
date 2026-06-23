import {
  FileSearch,
  BrainCircuit,
  Globe2,
  Inbox,
  ScanSearch,
  Sparkles,
  Presentation,
  type LucideIcon,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

type Step = { num: string; key: string; Icon: LucideIcon };

const STEPS: Step[] = [
  { num: "01", key: "hero.flow.step1", Icon: FileSearch },
  { num: "02", key: "hero.flow.step2", Icon: BrainCircuit },
  { num: "03", key: "hero.flow.step3", Icon: Globe2 },
  { num: "04", key: "hero.flow.step4", Icon: Inbox },
  { num: "05", key: "hero.flow.step5", Icon: ScanSearch },
  { num: "06", key: "hero.flow.step6", Icon: Sparkles },
  { num: "07", key: "hero.flow.step7", Icon: Presentation },
];

const BASE_DELAY = 600;
const STEP_STEP = 140;

const StepCard = ({ step, delay }: { step: Step; delay: number }) => {
  const { t } = useLanguage();
  return (
    <div
      className="group relative flex h-full w-full min-h-[14rem] flex-col gap-3 border border-white/15 bg-white/5 backdrop-blur-sm p-5 motion-safe:opacity-0 motion-safe:animate-slide-in-left transition-colors hover:border-accent/60 hover:bg-white/[0.08]"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-accent tracking-[0.25em]">{step.num}</span>
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/40">
          <step.Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
        </span>
      </div>
      <h3 className="text-base md:text-lg font-semibold text-white leading-tight">
        {t(`${step.key}.title`)}
      </h3>
      <p className="text-sm text-white/70 leading-relaxed">
        {t(`${step.key}.desc`)}
      </p>
    </div>
  );
};

const Connector = ({ delay, vertical = false }: { delay: number; vertical?: boolean }) => (
  <div
    className={
      vertical
        ? "relative mx-auto h-6 w-px bg-white/15 overflow-hidden"
        : "relative flex-1 h-px bg-white/15 overflow-hidden self-center"
    }
  >
    <div
      className={`absolute inset-0 bg-accent ${
        vertical
          ? "origin-top motion-safe:scale-y-0"
          : "origin-left motion-safe:scale-x-0"
      } motion-safe:animate-connector-grow`}
      style={{ animationDelay: `${delay}ms` }}
    />
  </div>
);

const ProcessFlow = () => {
  return (
    <div aria-label="AI-driven RFQ process">
      {/* Desktop: 7 lika stora kort i grid med animerade konnektorer */}
      <ol className="hidden lg:grid grid-cols-7 gap-3 items-stretch">
        {STEPS.map((step, i) => {
          const delay = BASE_DELAY + i * STEP_STEP;
          return (
            <li key={step.num} className="relative h-full">
              {i > 0 && (
                <div className="pointer-events-none absolute top-11 -left-3 w-3 h-px bg-white/15 overflow-hidden">
                  <div
                    className="absolute inset-0 bg-accent origin-left motion-safe:scale-x-0 motion-safe:animate-connector-grow"
                    style={{ animationDelay: `${delay + 100}ms` }}
                  />
                </div>
              )}
              <StepCard step={step} delay={delay} />
            </li>
          );
        })}
      </ol>

      {/* Tablet: 2/3-kolumns grid med lika stora kort */}
      <ol className="hidden md:grid lg:hidden grid-cols-2 sm:grid-cols-3 gap-4 items-stretch">
        {STEPS.map((step, i) => (
          <li key={step.num} className="h-full">
            <StepCard step={step} delay={BASE_DELAY + i * STEP_STEP} />
          </li>
        ))}
      </ol>

      {/* Mobil: vertikalt */}
      <ol className="md:hidden flex flex-col">
        {STEPS.map((step, i) => {
          const delay = BASE_DELAY + i * STEP_STEP;
          return (
            <li key={step.num} className="flex flex-col">
              <StepCard step={step} delay={delay} />
              {i < STEPS.length - 1 && <Connector delay={delay + 220} vertical />}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default ProcessFlow;