import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

type FieldDef = { key: string; label: string; type?: "text" | "textarea" };

const heroFields: FieldDef[] = [
  { key: "hero_subtitle", label: "Subtitle" },
  { key: "hero_heading", label: "Heading" },
  { key: "hero_description", label: "Description", type: "textarea" },
];

const serviceFields: FieldDef[] = Array.from({ length: 6 }, (_, i) => [
  { key: `service_${i + 1}_title`, label: `Service ${i + 1} Title` },
  { key: `service_${i + 1}_description`, label: `Service ${i + 1} Description`, type: "textarea" as const },
]).flat();

const testimonialFields: FieldDef[] = Array.from({ length: 3 }, (_, i) => [
  { key: `testimonial_${i + 1}_quote`, label: `Testimonial ${i + 1} Quote`, type: "textarea" as const },
  { key: `testimonial_${i + 1}_name`, label: `Testimonial ${i + 1} Name` },
  { key: `testimonial_${i + 1}_role`, label: `Testimonial ${i + 1} Role` },
]).flat();

const otherFields: FieldDef[] = [
  { key: "services_heading", label: "Services Section Heading" },
  { key: "testimonials_heading", label: "Testimonials Section Heading" },
  { key: "footer_tagline", label: "Footer Tagline" },
];

const allFields = [...heroFields, ...serviceFields, ...testimonialFields, ...otherFields];

export default function DashboardContent() {
  const { data: settings, isLoading } = useSettings();
  const queryClient = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});

  useEffect(() => {
    if (settings) {
      const v: Record<string, string> = {};
      allFields.forEach((f) => { v[f.key] = settings[f.key] || ""; });
      setValues(v);
    }
  }, [settings]);

  const mutation = useMutation({
    mutationFn: async () => {
      const updates = allFields
        .filter((f) => values[f.key] !== (settings?.[f.key] || ""))
        .map((f) =>
          supabase.from("settings").update({ value: values[f.key] }).eq("key", f.key)
        );
      const results = await Promise.all(updates);
      const err = results.find((r) => r.error);
      if (err?.error) throw err.error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Content saved");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const set = (key: string, value: string) =>
    setValues((prev) => ({ ...prev, [key]: value }));

  if (isLoading) return <p className="text-muted-foreground">Loading...</p>;

  const renderSection = (title: string, fields: FieldDef[]) => (
    <div key={title} className="space-y-4">
      <h2 className="text-lg font-semibold border-b pb-2">{title}</h2>
      {fields.map((f) => (
        <div key={f.key} className="space-y-1">
          <Label htmlFor={f.key}>{f.label}</Label>
          {f.type === "textarea" ? (
            <Textarea
              id={f.key}
              value={values[f.key] || ""}
              onChange={(e) => set(f.key, e.target.value)}
              rows={3}
            />
          ) : (
            <Input
              id={f.key}
              value={values[f.key] || ""}
              onChange={(e) => set(f.key, e.target.value)}
            />
          )}
        </div>
      ))}
    </div>
  );

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Content</h1>
      <form
        onSubmit={(e) => { e.preventDefault(); mutation.mutate(); }}
        className="mt-6 max-w-2xl space-y-8"
      >
        {renderSection("Hero Section", heroFields)}
        {renderSection("Section Headings", otherFields)}
        {renderSection("Services", serviceFields)}
        {renderSection("Testimonials", testimonialFields)}
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save All Content"}
        </Button>
      </form>
    </div>
  );
}
