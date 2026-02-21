import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export default function About() {
  const { data: settings } = useSettings();
  const { ref, isVisible } = useScrollReveal();

  const heading = settings?.about_heading || "Why Zino Writes?";
  const paragraph1 = settings?.about_paragraph_1 || "There's no shortage of content writers. What's harder to find is someone who understands the difference between content that fills a calendar and content that moves a pipeline.";
  const paragraph2 = settings?.about_paragraph_2 || "At Zino Writes, I bring together strategic thinking, market research, and AI-augmented production to build content that does both — driving near-term conversions while compounding your authority over time.";
  const paragraph3 = settings?.about_paragraph_3 || "That means your blog posts are built around real search intent, not guesswork. Your whitepapers are structured to accelerate sales conversations, not just sit in a Dropbox folder. And your website copy is written to convert the right visitors, not impress the wrong ones.";
  const paragraph4 = settings?.about_paragraph_4 || "If you're a B2B or SaaS company looking to build a content function that actually contributes to revenue — this is where we start.";

  return (
    <section id="about" className="py-24">
      <div
        ref={ref}
        className={cn(
          "container max-w-3xl transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <p className="text-sm font-medium uppercase tracking-widest text-primary">About</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>

        <div className="mt-8 space-y-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          <p>{paragraph1}</p>
          <p>{paragraph2}</p>
          <p>{paragraph3}</p>
          <p>{paragraph4}</p>
        </div>
      </div>
    </section>
  );
}
