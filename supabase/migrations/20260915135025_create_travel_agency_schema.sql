/*
# Excellent Travel Agency — Database Schema

1. Purpose
   This migration creates the full database schema for the Excellent Travel Agency website.
   It is a single-tenant, no-auth public app — visitors submit inquiries and applications
   without signing in. Admins manage content via the admin panel.

2. New Tables
   - `services` — Travel services (flights, hotels, umrah, student visas, etc.)
     with slug, title, description, icon, image, features, and content blocks.
   - `packages` — Sub-packages under services (e.g. 14-day Umrah, Turkey Student Visa)
     with price, duration, itinerary, gallery images.
   - `submissions` — Customer inquiries and applications submitted via the lead forms.
     Includes name, phone, email, service, destination, message, and document URL.
   - `site_settings` — Global agency settings (phone, whatsapp, address, social links).

3. Security
   - RLS enabled on all tables.
   - `services`, `packages`, `site_settings`: public read (anon + authenticated),
     write restricted to authenticated (admin).
   - `submissions`: public insert (anyone can submit a form), read/update/delete
     restricted to authenticated (admin only).
*/

-- Services table
CREATE TABLE IF NOT EXISTS services (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  slug text UNIQUE NOT NULL,
  title text NOT NULL,
  short_description text NOT NULL DEFAULT '',
  long_description text NOT NULL DEFAULT '',
  icon_name text NOT NULL DEFAULT 'FaPlane',
  hero_image text NOT NULL DEFAULT '',
  gallery_images text[] NOT NULL DEFAULT '{}',
  features text[] NOT NULL DEFAULT '{}',
  display_order int NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_services" ON services;
CREATE POLICY "anon_read_services" ON services FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_services" ON services;
CREATE POLICY "auth_insert_services" ON services FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_services" ON services;
CREATE POLICY "auth_update_services" ON services FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_services" ON services;
CREATE POLICY "auth_delete_services" ON services FOR DELETE
  TO authenticated USING (true);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  service_id uuid REFERENCES services(id) ON DELETE CASCADE,
  title text NOT NULL,
  duration text NOT NULL DEFAULT '',
  price text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  itinerary text[] NOT NULL DEFAULT '{}',
  gallery_images text[] NOT NULL DEFAULT '{}',
  is_active boolean NOT NULL DEFAULT true,
  display_order int NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE packages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_packages" ON packages;
CREATE POLICY "anon_read_packages" ON packages FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_insert_packages" ON packages;
CREATE POLICY "auth_insert_packages" ON packages FOR INSERT
  TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_update_packages" ON packages;
CREATE POLICY "auth_update_packages" ON packages FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_packages" ON packages;
CREATE POLICY "auth_delete_packages" ON packages FOR DELETE
  TO authenticated USING (true);

-- Submissions table
CREATE TABLE IF NOT EXISTS submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text NOT NULL DEFAULT '',
  service text NOT NULL DEFAULT '',
  destination text NOT NULL DEFAULT '',
  travel_date text NOT NULL DEFAULT '',
  message text NOT NULL DEFAULT '',
  document_url text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE submissions ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_insert_submissions" ON submissions;
CREATE POLICY "anon_insert_submissions" ON submissions FOR INSERT
  TO anon, authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "auth_read_submissions" ON submissions;
CREATE POLICY "auth_read_submissions" ON submissions FOR SELECT
  TO authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_submissions" ON submissions;
CREATE POLICY "auth_update_submissions" ON submissions FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_delete_submissions" ON submissions;
CREATE POLICY "auth_delete_submissions" ON submissions FOR DELETE
  TO authenticated USING (true);

-- Site settings table (single row)
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  agency_name text NOT NULL DEFAULT 'Excellent Travel Agency',
  tagline text NOT NULL DEFAULT 'A Reliable Way Towards a Brighter Future',
  phone text NOT NULL DEFAULT '',
  whatsapp text NOT NULL DEFAULT '',
  email text NOT NULL DEFAULT '',
  address text NOT NULL DEFAULT '',
  facebook text NOT NULL DEFAULT '',
  instagram text NOT NULL DEFAULT '',
  twitter text NOT NULL DEFAULT '',
  youtube text NOT NULL DEFAULT '',
  about_text text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "anon_read_site_settings" ON site_settings;
CREATE POLICY "anon_read_site_settings" ON site_settings FOR SELECT
  TO anon, authenticated USING (true);

DROP POLICY IF EXISTS "auth_update_site_settings" ON site_settings;
CREATE POLICY "auth_update_site_settings" ON site_settings FOR UPDATE
  TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "auth_insert_site_settings" ON site_settings;
CREATE POLICY "auth_insert_site_settings" ON site_settings FOR INSERT
  TO authenticated WITH CHECK (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_services_slug ON services(slug);
CREATE INDEX IF NOT EXISTS idx_packages_service_id ON packages(service_id);
CREATE INDEX IF NOT EXISTS idx_submissions_created_at ON submissions(created_at DESC);
