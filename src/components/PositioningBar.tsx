import { Bot, Target, BarChart3, PenLine } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const defaultAnchors = [
  { icon: Bot, label: "AI-Augmented Workflow" },
  { icon: Target, label: "B2B & SaaS Focused" },
  { icon: BarChart3, label: "Data-Backed Strategy" },
  { icon: PenLine, label: "Short & Long-Cycle Copy" },
];

export default function PositioningBar() {
  const { data: settings } = useSettings();
  const { ref, isVisible } = useScrollReveal();

  const anchors = defaultAnchors.map((a, i) => ({
    ...a,
    label: settings?.[`positioning_${i + 1}_label`] || a.label,
  }));

  return (
    <section ref={ref} className="border-y bg-muted/50 py-8 md:py-10">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4">
          {anchors.map((a, i) => (
            <div
              key={a.label}
              className={cn(
                "flex items-center gap-2.5 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-semibold text-foreground transition-all duration-200 hover:scale-[1.03] hover:bg-primary/10 hover:border-primary/30",
                "opacity-0 translate-y-3",
                isVisible && "opacity-100 translate-y-0"
              )}
              style={{
                transitionDelay: isVisible ? `${i * 100}ms` : "0ms",
                transitionProperty: "opacity, transform, background-color, border-color",
                transitionDuration: "500ms, 500ms, 200ms, 200ms",
              }}
            >
              <a.icon className="h-[1.125rem] w-[1.125rem] text-foreground" />
              {a.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
