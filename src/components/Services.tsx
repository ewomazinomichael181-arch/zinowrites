import { PenLine, FileText, BarChart3, Lightbulb, Target, Megaphone } from "lucide-react";

const services = [
  {
    icon: PenLine,
    title: "Blog Writing",
    description: "SEO-optimized, engaging blog posts that establish authority and drive organic traffic.",
  },
  {
    icon: FileText,
    title: "Whitepapers & Case Studies",
    description: "In-depth, research-backed content that positions your brand as a thought leader.",
  },
  {
    icon: Megaphone,
    title: "Website Copywriting",
    description: "Conversion-focused copy for landing pages, homepages, and product descriptions.",
  },
  {
    icon: Target,
    title: "Email Campaigns",
    description: "Nurture sequences and newsletters that build relationships and drive action.",
  },
  {
    icon: BarChart3,
    title: "Content Strategy",
    description: "Data-driven content roadmaps aligned with your business goals and audience needs.",
  },
  {
    icon: Lightbulb,
    title: "Brand Messaging",
    description: "Cohesive brand voice and messaging frameworks that resonate with your audience.",
  },
];

export default function Services() {
  return (
    <section id="services" className="border-t bg-card py-24">
      <div className="container">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Services</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">What I Do</h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group">
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
