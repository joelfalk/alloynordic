import { cn } from "@/lib/utils";

interface SectionKickerProps {
  children: React.ReactNode;
  className?: string;
}

const SectionKicker = ({ children, className }: SectionKickerProps) => (
  <div className={cn("kicker inline-flex items-center gap-2", className)}>
    <span className="block w-6 h-px bg-accent" />
    {children}
  </div>
);

export default SectionKicker;
