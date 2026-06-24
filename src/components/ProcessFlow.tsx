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

const StepCard = ({
  step,
  delay,
  variant = "card",
}: {
  step: Step;
  delay: number;
  variant?: "card" | "node";
}) => {
  const { t } = useLanguage();
  const isNode = variant === "node";
  return (
    <div
      className={`group relative flex h-full w-full flex-col gap-3 overflow-hidden motion-safe:opacity-0 motion-safe:animate-slide-in-left transition-colors ${
        isNode
          ? "items-center text-center px-3 pt-0 pb-4"
          : "min-h-[9rem] border border-white/15 bg-white/5 backdrop-blur-sm p-6 hover:border-accent/60 hover:bg-white/[0.08]"
      }`}
      style={{ animationDelay: `${delay}ms` }}
    >
      {isNode ? (
        <>
          <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background ring-1 ring-accent/40 transition-all group-hover:ring-accent group-hover:bg-accent/10">
            <step.Icon className="h-5 w-5 text-accent" strokeWidth={1.5} />
          </span>
          <span className="font-mono text-[10px] text-accent tracking-[0.25em]">{step.num}</span>
          <h3 className="text-xs md:text-sm font-medium text-white leading-tight tracking-wide whitespace-nowrap">
            {t(`${step.key}.title`)}
          </h3>
          <div className="grid w-full grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
            <p className="overflow-hidden text-xs text-white/70 leading-relaxed">
              {t(`${step.key}.desc`)}
            </p>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between">
            <span className="font-mono text-xs text-accent tracking-[0.25em]">{step.num}</span>
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/40">
              <step.Icon className="h-6 w-6 text-accent" strokeWidth={1.5} />
            </span>
          </div>
          <h3 className="text-sm md:text-base font-medium text-white leading-tight whitespace-normal md:whitespace-nowrap">
            {t(`${step.key}.title`)}
          </h3>
          <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-300 ease-out">
            <p className="overflow-hidden text-xs text-white/70 leading-relaxed">
              {t(`${step.key}.desc`)}
            </p>
          </div>
        </>
      )}
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
      {/* XL desktop: 7 noder på en rad förbundna av en animerad processlinje */}
      <div className="hidden xl:block relative pt-2">
        {/* Processlinje, ligger i höjd med ikonernas mitt (pt-2 + h-12/2 = ~2rem) */}
        <div className="pointer-events-none absolute left-0 right-0 top-[2rem] h-px bg-white/15 overflow-hidden">
          <div
            className="absolute inset-0 bg-accent origin-left motion-safe:scale-x-0 motion-safe:animate-connector-grow"
            style={{ animationDelay: `${BASE_DELAY}ms` }}
          />
        </div>
        <ol className="grid grid-cols-7 gap-0 items-start relative">
          {STEPS.map((step, i) => (
            <li key={step.num} className="h-full">
              <StepCard step={step} delay={BASE_DELAY + i * STEP_STEP} variant="node" />
            </li>
          ))}
        </ol>
      </div>

      {/* LG desktop: 4 + 3 (bredare rutor) */}
      <ol className="hidden lg:grid xl:hidden grid-cols-4 gap-4 items-stretch">
        {STEPS.map((step, i) => (
          <li key={step.num} className="h-full">
            <StepCard step={step} delay={BASE_DELAY + i * STEP_STEP} />
          </li>
        ))}
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