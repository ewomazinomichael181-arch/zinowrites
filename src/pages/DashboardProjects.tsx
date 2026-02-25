import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useProjects, type Project } from "@/hooks/useProjects";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

const CATEGORIES = ["Blog", "Whitepaper", "Copy", "Strategy", "Thought Leadership", "Consumer Advocacy"] as const;

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

const projectSchema = z.object({
  title: z.string().trim().min(1, "Title is required").max(200, "Title must be under 200 characters"),
  category: z.enum(CATEGORIES, { errorMap: () => ({ message: "Invalid category" }) }),
  impact: z.string().max(500, "Impact must be under 500 characters").optional().or(z.literal("")),
  url: z.string().url("Invalid URL format").max(2000, "URL too long").optional().or(z.literal("")),
});

type ProjectForm = {
  title: string;
  category: string;
  impact: string;
  url: string;
  imageFile: File | null;
};

const emptyForm: ProjectForm = { title: "", category: "Blog", impact: "", url: "", imageFile: null };

export default function DashboardProjects() {
  const { data: projects, isLoading } = useProjects();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<ProjectForm>(emptyForm);

  const validateFile = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      throw new Error("Image must be under 5MB");
    }
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      throw new Error("Only JPEG, PNG, WebP, and GIF images are allowed");
    }
  };

  const uploadImage = async (file: File) => {
    validateFile(file);
    const ext = file.name.split(".").pop();
    const path = `${crypto.randomUUID()}.${ext}`;
    const { error } = await supabase.storage.from("project-thumbnails").upload(path, file);
    if (error) throw error;
    const { data } = supabase.storage.from("project-thumbnails").getPublicUrl(path);
    return data.publicUrl;
  };

  const saveMutation = useMutation({
    mutationFn: async () => {
      const validated = projectSchema.parse({
        title: form.title,
        category: form.category,
        impact: form.impact || undefined,
        url: form.url || undefined,
      });
      let image_url: string | undefined;
      if (form.imageFile) {
        image_url = await uploadImage(form.imageFile);
      }

      const dbData: { title: string; category: string; impact: string; url: string; image_url?: string } = {
        title: validated.title,
        category: validated.category,
        impact: validated.impact || "",
        url: validated.url || "",
      };
      if (image_url) dbData.image_url = image_url;

      if (editingId) {
        const { error } = await supabase.from("projects").update(dbData).eq("id", editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("projects").insert([dbData]);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success(editingId ? "Project updated" : "Project added");
      closeDialog();
    },
    onError: (err: unknown) => {
      if (err instanceof z.ZodError) {
        toast.error(err.errors[0]?.message || "Validation error");
      } else if (err instanceof Error) {
        toast.error(err.message);
      }
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      toast.success("Project deleted");
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const openAdd = () => {
    setEditingId(null);
    setForm(emptyForm);
    setDialogOpen(true);
  };

  const openEdit = (p: Project) => {
    setEditingId(p.id);
    setForm({ title: p.title, category: p.category, impact: p.impact || "", url: p.url || "", imageFile: null });
    setDialogOpen(true);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Projects</h1>
        <Button onClick={openAdd}>
          <Plus className="mr-2 h-4 w-4" /> Add Project
        </Button>
      </div>

      {isLoading ? (
        <p className="mt-8 text-muted-foreground">Loading projects...</p>
      ) : projects && projects.length > 0 ? (
        <div className="mt-6 rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="hidden md:table-cell">Impact</TableHead>
                <TableHead className="w-24">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {projects.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-medium">{p.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{p.category}</Badge>
                  </TableCell>
                  <TableCell className="hidden text-sm text-muted-foreground md:table-cell">
                    {p.impact || "—"}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" onClick={() => openEdit(p)}>
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteMutation.mutate(p.id)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <p className="mt-8 text-center text-muted-foreground">
          No projects yet. Click "Add Project" to get started.
        </p>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingId ? "Edit Project" : "Add New Project"}</DialogTitle>
          </DialogHeader>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              saveMutation.mutate();
            }}
            className="space-y-4"
          >
            <div className="space-y-2">
              <Label>Title</Label>
              <Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
            </div>
            <div className="space-y-2">
              <Label>Category</Label>
              <Select value={form.category} onValueChange={(v) => setForm({ ...form, category: v })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORIES.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Impact Statement</Label>
              <Textarea
                value={form.impact}
                onChange={(e) => setForm({ ...form, impact: e.target.value })}
                placeholder="e.g., Increased ROI by 20%"
              />
            </div>
            <div className="space-y-2">
              <Label>Project URL</Label>
              <Input value={form.url} onChange={(e) => setForm({ ...form, url: e.target.value })} type="url" />
            </div>
            <div className="space-y-2">
              <Label>Thumbnail Image</Label>
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setForm({ ...form, imageFile: e.target.files?.[0] || null })}
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
              <Button type="submit" disabled={saveMutation.isPending}>
                {saveMutation.isPending ? "Saving..." : "Save"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
