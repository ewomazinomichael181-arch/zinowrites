import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { z } from "zod";

const settingsSchema = z.object({
  brand_name: z.string().trim().max(100, "Brand name must be under 100 characters"),
  linkedin_url: z.string().url("Invalid LinkedIn URL").max(500, "URL too long").optional().or(z.literal("")),
  contact_email: z.string().email("Invalid email address").max(255, "Email too long").optional().or(z.literal("")),
});

export default function DashboardSettings() {
  const { data: settings, isLoading } = useSettings();
  const queryClient = useQueryClient();
  const [brandName, setBrandName] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  useEffect(() => {
    if (settings) {
      setBrandName(settings.brand_name || "");
      setLinkedinUrl(settings.linkedin_url || "");
      setContactEmail(settings.contact_email || "");
    }
  }, [settings]);

  const updateSetting = async (key: string, value: string) => {
    const { error } = await supabase
      .from("settings")
      .update({ value })
      .eq("key", key);
    if (error) throw error;
  };

  const mutation = useMutation({
    mutationFn: async () => {
      const validated = settingsSchema.parse({
        brand_name: brandName,
        linkedin_url: linkedinUrl || undefined,
        contact_email: contactEmail || undefined,
      });
      await Promise.all([
        updateSetting("brand_name", validated.brand_name),
        updateSetting("linkedin_url", validated.linkedin_url || ""),
        updateSetting("contact_email", validated.contact_email || ""),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved");
    },
    onError: (err: unknown) => {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message || "Validation error");
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  if (isLoading) return <p className="text-muted-foreground">Loading settings...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Settings</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          mutation.mutate();
        }}
        className="mt-6 max-w-lg space-y-4"
      >
        <div className="space-y-2">
          <Label>Brand Name</Label>
          <Input value={brandName} onChange={(e) => setBrandName(e.target.value)} />
        </div>
        <div className="space-y-2">
          <Label>LinkedIn URL</Label>
          <Input value={linkedinUrl} onChange={(e) => setLinkedinUrl(e.target.value)} type="url" />
        </div>
        <div className="space-y-2">
          <Label>Contact Email</Label>
          <Input value={contactEmail} onChange={(e) => setContactEmail(e.target.value)} type="email" />
        </div>
        <Button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Saving..." : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
