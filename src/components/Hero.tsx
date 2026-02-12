import { ArrowRight, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

export default function Hero() {
  const { data: settings } = useSettings();
  const linkedinUrl = settings?.linkedin_url || "https://www.linkedin.com/in/ewomazino-ovririe-89a762261";
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";

  return (
    <section className="relative overflow-hidden">
      <div className="container flex min-h-[80vh] flex-col items-start justify-center py-24 md:py-32">
        <p className="mb-4 text-sm font-medium uppercase tracking-widest text-primary">
          Strategic Content Writer & Copywriter
        </p>
        <h1 className="max-w-3xl text-3xl font-bold leading-tight tracking-tight sm:text-4xl md:text-6xl lg:text-7xl">
          Content that turns readers into loyal customers.
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
          Helping B2B Tech and Lifestyle brands scale through data-backed storytelling.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <Button asChild size="lg">
            <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
              <Linkedin className="mr-2 h-4 w-4" />
              Connect on LinkedIn
            </a>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href={`mailto:${contactEmail}`}>
              <Mail className="mr-2 h-4 w-4" />
              Send an Email
            </a>
          </Button>
        </div>

        <a
          href="#portfolio"
          className="mt-16 flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View my work <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      {/* Decorative element */}
      <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-primary/5 blur-3xl" />
    </section>
  );
}
