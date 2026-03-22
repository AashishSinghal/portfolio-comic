import { cn } from "@/lib/utils";

interface SectionDividerProps {
  variant?: "zigzag" | "torn" | "dots";
  className?: string;
  fromColor?: string;
  toColor?: string;
}

export function SectionDivider({
  variant = "zigzag",
  className,
}: SectionDividerProps) {
  if (variant === "dots") {
    return (
      <div className={cn("flex items-center justify-center gap-3 py-4", className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-3 w-3 rounded-full bg-ink dark:bg-paper"
            style={{ opacity: 0.1 + i * 0.05 }}
          />
        ))}
      </div>
    );
  }

  if (variant === "torn") {
    return (
      <div className={cn("relative h-8 w-full overflow-hidden", className)}>
        <svg
          viewBox="0 0 1200 40"
          preserveAspectRatio="none"
          className="absolute inset-0 w-full h-full"
        >
          <path
            d="M0,20 Q30,0 60,20 Q90,40 120,20 Q150,0 180,20 Q210,40 240,20 Q270,0 300,20 Q330,40 360,20 Q390,0 420,20 Q450,40 480,20 Q510,0 540,20 Q570,40 600,20 Q630,0 660,20 Q690,40 720,20 Q750,0 780,20 Q810,40 840,20 Q870,0 900,20 Q930,40 960,20 Q990,0 1020,20 Q1050,40 1080,20 Q1110,0 1140,20 Q1170,40 1200,20"
            fill="none"
            stroke="currentColor"
            strokeWidth="3"
            className="text-ink/15 dark:text-paper/15"
          />
        </svg>
      </div>
    );
  }

  // zigzag
  return (
    <div className={cn("relative h-6 w-full overflow-hidden", className)}>
      <svg
        viewBox="0 0 1200 24"
        preserveAspectRatio="none"
        className="absolute inset-0 w-full h-full"
      >
        <path
          d="M0,12 L20,0 L40,12 L60,0 L80,12 L100,0 L120,12 L140,0 L160,12 L180,0 L200,12 L220,0 L240,12 L260,0 L280,12 L300,0 L320,12 L340,0 L360,12 L380,0 L400,12 L420,0 L440,12 L460,0 L480,12 L500,0 L520,12 L540,0 L560,12 L580,0 L600,12 L620,24 L640,12 L660,24 L680,12 L700,24 L720,12 L740,24 L760,12 L780,24 L800,12 L820,24 L840,12 L860,24 L880,12 L900,24 L920,12 L940,24 L960,12 L980,24 L1000,12 L1020,24 L1040,12 L1060,24 L1080,12 L1100,24 L1120,12 L1140,24 L1160,12 L1180,24 L1200,12"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.5"
          className="text-ink/10 dark:text-paper/10"
        />
      </svg>
    </div>
  );
}
