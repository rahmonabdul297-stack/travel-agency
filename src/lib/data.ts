// import { supabase, type Service, type Package, type SiteSettings, type Submission } from './supabase';

// export async function fetchServices(): Promise<Service[]> {
//   const { data, error } = await supabase
//     .from('services')
//     .select('*')
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
//   if (error) throw error;
//   return data ?? [];
// }

// export async function fetchServiceBySlug(slug: string): Promise<Service | null> {
//   const { data, error } = await supabase
//     .from('services')
//     .select('*')
//     .eq('slug', slug)
//     .eq('is_active', true)
//     .maybeSingle();
//   if (error) throw error;
//   return data;
// }

// export async function fetchPackagesByService(serviceId: string): Promise<Package[]> {
//   const { data, error } = await supabase
//     .from('packages')
//     .select('*')
//     .eq('service_id', serviceId)
//     .eq('is_active', true)
//     .order('display_order', { ascending: true });
//   if (error) throw error;
//   return data ?? [];
// }

// export async function fetchSiteSettings(): Promise<SiteSettings | null> {
//   const { data, error } = await supabase
//     .from('site_settings')
//     .select('*')
//     .limit(1)
//     .maybeSingle();
//   if (error) throw error;
//   return data;
// }

// export async function submitLead(input: Omit<Submission, 'id' | 'status' | 'created_at'>): Promise<Submission> {
//   const { data, error } = await supabase
//     .from('submissions')
//     .insert({ ...input, status: 'new' })
//     .select('*')
//     .single();
//   if (error) throw error;
//   return data;
// }
