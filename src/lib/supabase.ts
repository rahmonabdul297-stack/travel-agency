import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Service = {
  id: string;
  slug: string;
  title: string;
  short_description: string;
  long_description: string;
  icon_name: string;
  hero_image: string;
  gallery_images: string[];
  features: string[];
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
};

export type Package = {
  id: string;
  service_id: string;
  title: string;
  duration: string;
  price: string;
  description: string;
  itinerary: string[];
  gallery_images: string[];
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
};

export type Submission = {
  id: string;
  full_name: string;
  phone: string;
  email: string;
  service: string;
  destination: string;
  travel_date: string;
  message: string;
  document_url: string;
  status: string;
  created_at: string;
};

export type SiteSettings = {
  id: string;
  agency_name: string;
  tagline: string;
  phone: string;
  whatsapp: string;
  email: string;
  address: string;
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  about_text: string;
};
