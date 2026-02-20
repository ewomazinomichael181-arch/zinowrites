import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export default function ClosingCTA() {
  const { data: settings } = useSettings();
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";
  const linkedinUrl = settings?.linkedin_url || "https://www.linkedin.com/in/ewomazino-ovririe-89a762261";

  return (
    <section className="border-t bg-primary/5 py-24">
      <div className="container max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
          Ready to build content that actually grows your business?
        </h2>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Whether you need a single asset or a full content system, let's start with a conversation
          about your goals, your audience, and what's worked — or hasn't — so far.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Button asChild size="lg">
            <a href={`mailto:${contactEmail}?subject=Quote Request`}>
              <Mail className="mr-2 h-4 w-4" />
              Get a Quote
            </a>
          </Button>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <Linkedin className="h-4 w-4" />
            Or connect on LinkedIn <ArrowRight className="h-3 w-3" />
          </a>
        </div>
      </div>
    </section>
  );
}
