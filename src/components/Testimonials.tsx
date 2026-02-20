import { Quote } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

const defaultTestimonials = [
  { quote: "Zino transformed our content strategy. Blog traffic increased by 150% in just three months.", name: "Sarah Chen", role: "Marketing Director, TechFlow" },
  { quote: "The whitepapers delivered were exceptional—well-researched, polished, and on-brand. Our sales team uses them daily.", name: "James Okoro", role: "Head of Content, FinScale" },
  { quote: "Working with Zino's Anthology was seamless. The copy captured our voice perfectly and our conversion rate jumped 35%.", name: "Maria Lopez", role: "Founder, Bloom Lifestyle" },
];

export default function Testimonials() {
  const { data: settings } = useSettings();

  const heading = settings?.testimonials_heading || "Results clients have seen";

  const testimonials = defaultTestimonials.map((def, i) => ({
    quote: settings?.[`testimonial_${i + 1}_quote`] || def.quote,
    name: settings?.[`testimonial_${i + 1}_name`] || def.name,
    role: settings?.[`testimonial_${i + 1}_role`] || def.role,
  }));

  return (
    <section id="testimonials" className="py-24">
      <div className="container">
        <p className="text-sm font-medium uppercase tracking-widest text-primary">Testimonials</p>
        <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">{heading}</h2>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <blockquote
              key={i}
              className="flex flex-col rounded-lg border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <Quote className="mb-4 h-6 w-6 text-primary/30" />
              <p className="flex-1 text-sm leading-relaxed text-foreground">"{t.quote}"</p>
              <footer className="mt-6 border-t pt-4">
                <p className="text-sm font-semibold">{t.name}</p>
                <p className="text-xs text-muted-foreground">{t.role}</p>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
