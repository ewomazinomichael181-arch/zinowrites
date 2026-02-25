import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useProjects, type Project } from "@/hooks/useProjects";
import { useScrollReveal } from "@/hooks/useScrollReveal";
import { cn } from "@/lib/utils";

const categories = ["All", "Blog", "Whitepaper", "Copy", "Strategy", "Thought Leadership", "Consumer Advocacy"];

export default function PortfolioGrid() {
  const { data: projects, isLoading } = useProjects();
  const [filter, setFilter] = useState("All");
  const { ref, isVisible } = useScrollReveal();

  const filtered = filter === "All" ? projects : projects?.filter((p) => p.category === filter);

  return (
    <section id="portfolio" className="py-24">
      <div ref={ref} className="container">
        <div
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          )}
        >
          <p className="text-sm font-medium uppercase tracking-widest text-primary">Portfolio</p>
          <h2 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Selected Work</h2>

          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((c) => (
              <Button
                key={c}
                variant={filter === c ? "default" : "outline"}
                size="sm"
                onClick={() => setFilter(c)}
              >
                {c}
              </Button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-64 rounded-lg" />
            ))}
          </div>
        ) : filtered && filtered.length > 0 ? (
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="mt-10 mx-auto max-w-xl text-center">
            <p className="text-muted-foreground leading-relaxed">
              Full case studies are being formatted and will be live shortly. In the meantime, I'm
              happy to share relevant writing samples, strategy documents, or client references
              directly. Just reach out — I respond within 24 hours.
            </p>
            <a
              href="mailto:ewomazinomichael181@gmail.com?subject=Writing Samples Request"
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Request Writing Samples <ExternalLink className="h-3 w-3" />
            </a>
          </div>
        )}
      </div>
    </section>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-lg border bg-card transition-shadow hover:shadow-lg">
      {project.image_url && (
        <div className="aspect-video overflow-hidden bg-muted">
          <img
            src={project.image_url}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-5">
        <Badge variant="secondary" className="w-fit text-xs">
          {project.category}
        </Badge>
        <h3 className="mt-3 text-lg font-semibold leading-snug">{project.title}</h3>
        {project.impact && (
          <p className="mt-2 text-sm text-muted-foreground">{project.impact}</p>
        )}
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-auto flex items-center gap-1 pt-4 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Read Project <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </article>
  );
}
