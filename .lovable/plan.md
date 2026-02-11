

# Zino's Anthology — Strategic Content Writer Portfolio

## Overview
A sophisticated, minimalist portfolio website with a private admin dashboard, built with React, Tailwind CSS, Shadcn UI, and Supabase backend.

---

## 1. Design System & Global Setup
- **Color palette**: Off-white (#F9F9F9) background, rich black (#1A1A1A) text, terracotta (#E26D5C) accents
- **Typography**: Lora (serif) for headings, Inter (sans-serif) for body text
- **Swiss-modernism aesthetic**: Clean grid layouts, generous whitespace, editorial feel

---

## 2. Public Pages

### Navigation (Sticky Header)
- Logo: "Zino's Anthology" in serif
- Links: Portfolio, Services, Testimonials
- Primary CTA button: "Get a Quote" (terracotta accent)

### Hero Section
- Bold headline: "Content that turns readers into loyal customers."
- Sub-headline about B2B Tech and Lifestyle brands
- LinkedIn button + email icon linking to provided URLs
- Clean, editorial layout with strong visual hierarchy

### Portfolio Grid
- Dynamic grid pulling projects from Supabase `projects` table
- Each card displays: category tag, project title, impact statement, and "Read Project" link
- Filterable by category (Blog, Whitepaper, Copy, Strategy)
- Responsive: stacked on mobile, multi-column on desktop

### Services Section
- Clean display of content writing & copywriting services offered

### Testimonials Section
- Client testimonials displayed in an elegant layout

### Footer
- Contact email, LinkedIn link, copyright

---

## 3. Admin Dashboard (Private)

### Authentication
- Supabase Auth login screen at `/admin`
- Password-protected — only authenticated users can access dashboard routes
- RLS policies on the `projects` table so only authenticated users can insert/update/delete

### Dashboard Overview
- Table listing all portfolio projects with title, category, and impact
- Edit and Delete actions per row
- Toast notifications (Sonner) for success/error on all operations

### Add/Edit Project Form
- Fields: Project Title, Category (dropdown), Impact Statement, Project URL, Thumbnail Image
- Image upload to Supabase Storage bucket
- Form validation with clear error states

### Settings Page
- Editable fields for Brand Name, LinkedIn URL, and Contact Email
- Stored in a Supabase `settings` table and pulled dynamically into the public site

---

## 4. Backend & Database (Supabase)

### Tables
- **`projects`**: id, title, category, impact, url, image_url, created_at
- **`settings`**: id, key, value (for brand name, LinkedIn URL, contact email)

### Storage
- Public bucket for project thumbnail images

### Security
- RLS on `projects`: public read, authenticated write/update/delete
- RLS on `settings`: public read, authenticated write/update

---

## 5. Responsive Design & UX
- Public site optimized for mobile conversion (large CTAs, readable typography)
- Dashboard functional on desktop/tablet
- Smooth toast notifications for all CRUD operations
- Clean loading states and empty states

