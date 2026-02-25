
-- Drop the overly permissive public SELECT policy on settings
DROP POLICY IF EXISTS "Anyone can read settings" ON public.settings;

-- Create a new policy that only allows public read for whitelisted safe keys
CREATE POLICY "Public can read whitelisted settings"
ON public.settings
FOR SELECT
USING (
  key IN (
    'brand_name',
    'contact_email',
    'about_paragraph_1',
    'about_paragraph_2',
    'about_paragraph_3',
    'about_paragraph_4',
    'ai_workflow_heading',
    'ai_workflow_paragraph_1',
    'ai_workflow_paragraph_2',
    'ai_workflow_paragraph_3',
    'positioning_label_1',
    'positioning_label_2',
    'positioning_label_3',
    'positioning_label_4',
    'closing_cta_heading',
    'closing_cta_description',
    'service_title_1', 'service_desc_1',
    'service_title_2', 'service_desc_2',
    'service_title_3', 'service_desc_3',
    'service_title_4', 'service_desc_4',
    'service_title_5', 'service_desc_5',
    'service_title_6', 'service_desc_6'
  )
  OR has_role(auth.uid(), 'admin'::app_role)
);
