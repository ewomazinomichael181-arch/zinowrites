import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useSettings } from "@/hooks/useSettings";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

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
      await Promise.all([
        updateSetting("brand_name", brandName),
        updateSetting("linkedin_url", linkedinUrl),
        updateSetting("contact_email", contactEmail),
      ]);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Settings saved");
    },
    onError: (err: Error) => toast.error(err.message),
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
