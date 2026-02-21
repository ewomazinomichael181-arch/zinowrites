import { PenLine, FileText, BarChart3, Lightbulb, Target, Megaphone } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const icons = [PenLine, FileText, Megaphone, Target, BarChart3, Lightbulb];

const defaultServices = [
  { title: "Blog Writing", description: "SEO-optimized, engaging blog posts that establish authority and drive organic traffic." },
  { title: "Whitepapers & Case Studies", description: "In-depth, research-backed content that positions your brand as a thought leader." },
  { title: "Website Copywriting", description: "Conversion-focused copy for landing pages, homepages, and product descriptions." },
  { title: "Email Campaigns", description: "Nurture sequences and newsletters that build relationships and drive action." },
  { title: "Content Strategy", description: "Data-driven content roadmaps aligned with your business goals and audience needs." },
  { title: "Brand Messaging", description: "Cohesive brand voice and messaging frameworks that resonate with your audience." },
];

export default function Services() {
  const { data: settings } = useSettings();
  const { ref, isVisible } = useScrollReveal();

  const services = defaultServices.map((def, i) => ({
    icon: icons[i],
    title: settings?.[`service_${i + 1}_title`] || def.title,
    description: settings?.[`service_${i + 1}_description`] || def.description,
  }));

  const heading = settings?.services_heading || "What I Do";

  return (
    <section id="services" className="border-t bg-card py-24">
      <div ref={ref} className="container">
        <div
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Services</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Every service is built around one goal: content that earns attention and drives action.
          </p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s, i) => (
            <div
              key={s.title}
              className={cn(
                "group transition-all duration-500",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
              )}
              style={{ transitionDelay: isVisible ? `${200 + i * 100}ms` : "0ms" }}
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
