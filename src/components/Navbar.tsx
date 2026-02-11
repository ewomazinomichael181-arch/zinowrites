import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSettings } from "@/hooks/useSettings";

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#services" },
  { label: "Testimonials", href: "#testimonials" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { data: settings } = useSettings();
  const brandName = settings?.brand_name || "Zino's Anthology";
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";

  return (
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
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div className="border-t bg-background px-4 pb-4 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm font-medium text-muted-foreground"
            >
              {l.label}
            </a>
          ))}
          <Button asChild size="sm" className="mt-2 w-full">
            <a href={`mailto:${contactEmail}?subject=Quote Request`}>Get a Quote</a>
          </Button>
        </div>
      )}
    </header>
  );
}
