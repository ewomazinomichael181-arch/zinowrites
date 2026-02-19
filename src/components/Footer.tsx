import { Linkedin, Mail } from "lucide-react";
import { useSettings } from "@/hooks/useSettings";

export default function Footer() {
  const { data: settings } = useSettings();
  const brandName = settings?.brand_name || "Zino's Anthology";
  const linkedinUrl = settings?.linkedin_url || "#";
  const contactEmail = settings?.contact_email || "ewomazinomichael181@gmail.com";

  return (
    <footer className="border-t bg-card py-12">
      <div className="container flex flex-col items-center justify-between gap-6 md:flex-row">
        <div>
          <p className="font-serif text-lg font-bold">{brandName}</p>
          <p className="mt-1 text-sm text-muted-foreground">
            {settings?.footer_tagline || "Strategic Content Writer & Copywriter"}
          </p>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${contactEmail}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            aria-label="Email"
          >
            <Mail className="h-4 w-4" />
          </a>
        </div>

        <p className="text-xs text-muted-foreground">
          © {new Date().getFullYear()} {brandName}. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
