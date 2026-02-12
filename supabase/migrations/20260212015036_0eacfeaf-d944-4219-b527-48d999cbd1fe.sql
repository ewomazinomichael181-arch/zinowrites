
-- Fix 1: Add write policies for user_roles table (admin only)
CREATE POLICY "Admins can insert roles"
ON public.user_roles FOR INSERT
TO authenticated
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update roles"
ON public.user_roles FOR UPDATE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete roles"
ON public.user_roles FOR DELETE
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Fix 2: Restrict storage to admin only
DROP POLICY IF EXISTS "Authenticated users can upload thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update thumbnails" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete thumbnails" ON storage.objects;

CREATE POLICY "Admins can upload thumbnails"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'project-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update thumbnails"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'project-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete thumbnails"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'project-thumbnails' 
  AND public.has_role(auth.uid(), 'admin')
);
