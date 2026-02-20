import { Zap } from "lucide-react";

export default function AIWorkflow() {
  return (
    <section className="border-t bg-card py-24">
      <div className="container max-w-3xl">
        <div className="mb-2 flex items-center gap-2">
          <Zap className="h-5 w-5 text-primary" />
          <p className="text-sm font-medium uppercase tracking-widest text-primary">AI Workflow</p>
        </div>
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Faster. Smarter. Still strategically human.
        </h2>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>
            AI hasn't replaced the need for great strategy or deep market understanding. But it has
            changed what's possible in terms of speed, research depth, and content scale.
          </p>
          <p>
            I've built AI into my workflow at every stage — from research and outlining to drafting
            and optimization — so that clients get the benefits of both: the speed and scale of
            AI-assisted production, and the strategic judgment that ensures every piece is positioned
            correctly, written for real humans, and aligned with business objectives.
          </p>
          <p>
            For growing B2B and SaaS teams with ambitious content goals and lean resources, this is
            the edge that lets you compete with companies twice your size.
          </p>
        </div>
      </div>
    </section>
  );
}
