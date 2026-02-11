
-- Create projects table
CREATE TABLE public.projects (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT NOT NULL,
  impact TEXT,
  url TEXT,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read projects" ON public.projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert projects" ON public.projects FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update projects" ON public.projects FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete projects" ON public.projects FOR DELETE USING (auth.uid() IS NOT NULL);

-- Create settings table
CREATE TABLE public.settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT NOT NULL UNIQUE,
  value TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can insert settings" ON public.settings FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update settings" ON public.settings FOR UPDATE USING (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete settings" ON public.settings FOR DELETE USING (auth.uid() IS NOT NULL);

-- Seed default settings
INSERT INTO public.settings (key, value) VALUES
  ('brand_name', 'Zino''s Anthology'),
  ('linkedin_url', 'https://www.linkedin.com/in/ewomazino-ovririe-89a762261'),
  ('contact_email', 'ewomazinomichael181@gmail.com');

-- Create storage bucket for project thumbnails
INSERT INTO storage.buckets (id, name, public) VALUES ('project-thumbnails', 'project-thumbnails', true);

CREATE POLICY "Anyone can view thumbnails" ON storage.objects FOR SELECT USING (bucket_id = 'project-thumbnails');
CREATE POLICY "Authenticated users can upload thumbnails" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'project-thumbnails' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update thumbnails" ON storage.objects FOR UPDATE USING (bucket_id = 'project-thumbnails' AND auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can delete thumbnails" ON storage.objects FOR DELETE USING (bucket_id = 'project-thumbnails' AND auth.uid() IS NOT NULL);
