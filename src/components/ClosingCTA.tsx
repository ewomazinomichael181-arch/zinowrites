import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

export default function ClosingCTA() {
  const { data: settings } = useSettings();
  const { ref, isVisible } = useScrollReveal();
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";

  const heading = settings?.cta_heading || "Ready to build content that actually grows your business?";
  const description = settings?.cta_description || "Whether you need a single asset or a full content system, let's start with a conversation about your goals, your audience, and what's worked — or hasn't — so far.";

  return (
    <section ref={ref} className="border-t bg-primary/5 py-24">
      <div
        className={cn(
          "container max-w-2xl text-center transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        )}
      >
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          {heading}
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          {description}
        </p>

        <div className="mt-10 flex justify-center">
          <Button asChild size="lg">
            <a href={`mailto:${contactEmail}?subject=Quote Request`}>
              <Mail className="mr-2 h-4 w-4" />
              Get a Quote
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
