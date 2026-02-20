import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Mail, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Portfolio", href: "#portfolio" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const brandName = settings?.brand_name || "Zino Writes";
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";
  const linkedinUrl = settings?.linkedin_url || "https://www.linkedin.com/in/ewomazino-ovririe-89a762261";

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <nav className="container flex h-16 items-center justify-between">
          <Link to="/" className="font-serif text-xl font-bold tracking-tight text-foreground">
            {brandName}
          </Link>

          {/* Desktop */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <Button asChild size="sm">
              <a href={`mailto:${contactEmail}?subject=Quote Request`}>Get a Quote</a>
            </Button>
          </div>

          {/* Mobile toggle */}
          <button
            className="relative z-[60] flex h-10 w-10 items-center justify-center rounded-md md:hidden"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      {open && (
        <div className="fixed inset-0 z-[55] flex flex-col bg-background md:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <span className="font-serif text-xl font-bold tracking-tight text-foreground">
              {brandName}
            </span>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="flex h-10 w-10 items-center justify-center rounded-md"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-1 flex-col justify-center px-8">
            <nav className="space-y-2">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block py-4 text-2xl font-semibold text-foreground transition-colors hover:text-primary"
                >
                  {l.label}
                </a>
              ))}
            </nav>

            <div className="mt-10 space-y-4">
              <Button asChild size="lg" className="w-full">
                <a href={`mailto:${contactEmail}?subject=Quote Request`}>
                  <Mail className="mr-2 h-4 w-4" />
                  Get a Quote
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="w-full">
                <a href={linkedinUrl} target="_blank" rel="noopener noreferrer">
                  <Linkedin className="mr-2 h-4 w-4" />
                  Connect on LinkedIn
                </a>
              </Button>
            </div>
          </div>

          <div className="px-8 pb-8">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {brandName}
            </p>
          </div>
        </div>
      )}
    </>
  );
}
