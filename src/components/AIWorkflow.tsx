import { Zap } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export default function AIWorkflow() {
  const { data: settings } = useSettings();
  const { ref, isVisible } = useScrollReveal();

  const heading = settings?.ai_workflow_heading || "Faster. Smarter. Still strategically human.";
  const paragraph1 = settings?.ai_workflow_paragraph_1 || "AI hasn't replaced the need for great strategy or deep market understanding. But it has changed what's possible in terms of speed, research depth, and content scale.";
  const paragraph2 = settings?.ai_workflow_paragraph_2 || "I've built AI into my workflow at every stage — from research and outlining to drafting and optimization — so that clients get the benefits of both: the speed and scale of AI-assisted production, and the strategic judgment that ensures every piece is positioned correctly, written for real humans, and aligned with business objectives.";
  const paragraph3 = settings?.ai_workflow_paragraph_3 || "For growing B2B and SaaS teams with ambitious content goals and lean resources, this is the edge that lets you compete with companies twice your size.";

  return (
    <section className="border-t bg-card py-24">
      <div
        ref={ref}
        className={cn(
          "container max-w-3xl transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium uppercase tracking-widest text-primary">AI Workflow</p>
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
          <p>{paragraph3}</p>
        </div>
      </div>
    </section>
  );
}
