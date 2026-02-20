import { Bot, Target, BarChart3, PenLine } from "lucide-react";

const anchors = [
  { icon: Bot, label: "AI-Augmented Workflow" },
  { icon: Target, label: "B2B & SaaS Focused" },
  { icon: BarChart3, label: "Data-Backed Strategy" },
  { icon: PenLine, label: "Short & Long-Cycle Copy" },
];

export default function PositioningBar() {
  return (
    <section className="border-y bg-muted/50 py-6">
      <div className="container">
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
          {anchors.map((a) => (
            <div key={a.label} className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <a.icon className="h-4 w-4 text-primary" />
              {a.label}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
