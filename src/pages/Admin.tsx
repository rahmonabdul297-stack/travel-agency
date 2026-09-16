// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   FaPlane, FaUsers, FaEnvelope, FaTimes, FaCheck,
//   FaPlus, FaEdit, FaTrashAlt, FaArrowLeft, FaPhone,
// } from 'react-icons/fa';
// import { Link } from 'react-router-dom';
// import { useTheme } from '@/context/ThemeContext';
// import { supabase } from '@/lib/supabase';
// import type { Service, Package, Submission } from '@/lib/supabase';

// type Tab = 'submissions' | 'services' | 'packages';

// export default function Admin() {
//   const { theme } = useTheme();
//   const [tab, setTab] = useState<Tab>('submissions');
//   const [submissions, setSubmissions] = useState<Submission[]>([]);
//   const [services, setServices] = useState<Service[]>([]);
//   const [packages, setPackages] = useState<Package[]>([]);
//   const [loading, setLoading] = useState(true);
//   const [editingService, setEditingService] = useState<Service | null>(null);
//   const [editingPackage, setEditingPackage] = useState<Package | null>(null);
//   const [showServiceModal, setShowServiceModal] = useState(false);
//   const [showPackageModal, setShowPackageModal] = useState(false);

//   useEffect(() => {
//     loadAll();
//   }, []);

//   const loadAll = async () => {
//     setLoading(true);
//     try {
//       const [subs, svcs] = await Promise.all([
//         supabase.from('submissions').select('*').order('created_at', { ascending: false }),
//         supabase.from('services').select('*').order('display_order', { ascending: true }),
//       ]);
//       setSubmissions(subs.data ?? []);
//       setServices(svcs.data ?? []);

//       if (svcs.data && svcs.data.length > 0) {
//         const pkgs = await supabase.from('packages').select('*').order('display_order', { ascending: true });
//         setPackages(pkgs.data ?? []);
//       }
//     } catch (err) {
//       console.error(err);
//     }
//     setLoading(false);
//   };

//   const tabs: { key: Tab; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
//     { key: 'submissions', label: 'Submissions', icon: FaEnvelope },
//     { key: 'services', label: 'Services', icon: FaPlane },
//     { key: 'packages', label: 'Packages', icon: FaUsers },
//   ];

//   const statusColors: Record<string, string> = {
//     new: 'bg-blue-500/10 text-blue-500',
//     contacted: 'bg-amber-500/10 text-amber-500',
//     completed: 'bg-green-500/10 text-green-500',
//   };

//   const updateSubmissionStatus = async (id: string, status: string) => {
//     await supabase.from('submissions').update({ status }).eq('id', id);
//     setSubmissions(prev => prev.map(s => s.id === id ? { ...s, status } : s));
//   };

//   const deleteSubmission = async (id: string) => {
//     await supabase.from('submissions').delete().eq('id', id);
//     setSubmissions(prev => prev.filter(s => s.id !== id));
//   };

//   const deleteService = async (id: string) => {
//     if (!confirm('Delete this service? This will also delete its packages.')) return;
//     await supabase.from('services').delete().eq('id', id);
//     setServices(prev => prev.filter(s => s.id !== id));
//     setPackages(prev => prev.filter(p => p.service_id !== id));
//   };

//   const deletePackage = async (id: string) => {
//     if (!confirm('Delete this package?')) return;
//     await supabase.from('packages').delete().eq('id', id);
//     setPackages(prev => prev.filter(p => p.id !== id));
//   };

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center pt-20">
//         <motion.div
//           animate={{ rotate: 360 }}
//           transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
//           className="w-12 h-12 border-4 border-brand-red-orange/20 border-t-brand-red-orange rounded-full"
//         />
//       </div>
//     );
//   }

//   return (
//     <div className={`min-h-screen pt-20 ${theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}`}>
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {/* Header */}
//         <div className="flex items-center justify-between mb-8">
//           <div>
//             <h1 className={`font-display text-2xl lg:text-3xl font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
//               Admin Panel
//             </h1>
//             <p className={`text-sm ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//               Manage services, packages, and customer submissions
//             </p>
//           </div>
//           <Link to="/" className={`flex items-center gap-2 text-sm ${theme === 'dark' ? 'text-ink-dark-secondary hover:text-brand-gold' : 'text-ink-light-secondary hover:text-brand-red-orange'}`}>
//             <FaArrowLeft /> Back to Site
//           </Link>
//         </div>

//         {/* Tabs */}
//         <div className="flex gap-1 mb-6 overflow-x-auto scrollbar-hide">
//           {tabs.map((t) => (
//             <button
//               key={t.key}
//               onClick={() => setTab(t.key)}
//               className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-colors ${
//                 tab === t.key
//                   ? 'bg-brand-gradient text-white'
//                   : theme === 'dark'
//                   ? 'bg-surface-dark-card text-ink-dark-secondary hover:text-ink-dark-primary border border-border-dark'
//                   : 'bg-white text-ink-light-secondary hover:text-ink-light-primary border border-border-light'
//               }`}
//             >
//               <t.icon className="text-sm" />
//               {t.label}
//               {t.key === 'submissions' && submissions.length > 0 && (
//                 <span className={`text-xs px-1.5 py-0.5 rounded-full ${tab === t.key ? 'bg-white/20' : 'bg-brand-red-orange/10 text-brand-red-orange'}`}>
//                   {submissions.length}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Content */}
//         <AnimatePresence mode="wait">
//           <motion.div
//             key={tab}
//             initial={{ opacity: 0, y: 10 }}
//             animate={{ opacity: 1, y: 0 }}
//             exit={{ opacity: 0, y: -10 }}
//             transition={{ duration: 0.2 }}
//           >
//             {/* Submissions */}
//             {tab === 'submissions' && (
//               <div className="space-y-4">
//                 {submissions.length === 0 ? (
//                   <div className={`text-center py-16 rounded-2xl ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light'}`}>
//                     <FaEnvelope className={`text-4xl mx-auto mb-3 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
//                     <p className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>No submissions yet.</p>
//                   </div>
//                 ) : (
//                   submissions.map((sub) => (
//                     <motion.div
//                       key={sub.id}
//                       layout
//                       className={`rounded-2xl p-5 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}
//                     >
//                       <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-3 mb-2">
//                             <h3 className={`font-semibold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
//                               {sub.full_name}
//                             </h3>
//                             <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${statusColors[sub.status] || statusColors.new}`}>
//                               {sub.status}
//                             </span>
//                           </div>
//                           <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
//                             <a href={`tel:${sub.phone}`} className={`flex items-center gap-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                               <FaPhone className="text-brand-red-orange text-xs" /> {sub.phone}
//                             </a>
//                             {sub.email && (
//                               <span className={`flex items-center gap-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                                 <FaEnvelope className="text-brand-amber text-xs" /> {sub.email}
//                               </span>
//                             )}
//                             {sub.service && (
//                               <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
//                                 Service: {sub.service}
//                               </span>
//                             )}
//                             {sub.destination && (
//                               <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
//                                 Destination: {sub.destination}
//                               </span>
//                             )}
//                             {sub.travel_date && (
//                               <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
//                                 Date: {sub.travel_date}
//                               </span>
//                             )}
//                           </div>
//                           {sub.message && (
//                             <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                               "{sub.message}"
//                             </p>
//                           )}
//                           <p className={`text-xs mt-2 ${theme === 'dark' ? 'text-ink-dark-secondary/60' : 'text-ink-light-secondary/60'}`}>
//                             {new Date(sub.created_at).toLocaleString()}
//                           </p>
//                         </div>
//                         <div className="flex flex-col gap-2 shrink-0">
//                           <select
//                             value={sub.status}
//                             onChange={(e) => updateSubmissionStatus(sub.id, e.target.value)}
//                             className={`text-xs px-3 py-1.5 rounded-lg border ${theme === 'dark' ? 'bg-surface-dark-hover border-border-dark text-ink-dark-primary' : 'bg-gray-50 border-border-light text-ink-light-primary'}`}
//                           >
//                             <option value="new">New</option>
//                             <option value="contacted">Contacted</option>
//                             <option value="completed">Completed</option>
//                           </select>
//                           <button
//                             onClick={() => deleteSubmission(sub.id)}
//                             className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors flex items-center gap-1 justify-center"
//                           >
//                             <FaTrashAlt /> Delete
//                           </button>
//                         </div>
//                       </div>
//                     </motion.div>
//                   ))
//                 )}
//               </div>
//             )}

//             {/* Services */}
//             {tab === 'services' && (
//               <div>
//                 <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => { setEditingService(null); setShowServiceModal(true); }}
//                     className="btn-brand flex items-center gap-2 text-sm"
//                   >
//                     <FaPlus /> Add Service
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {services.map((svc) => (
//                     <div key={svc.id} className={`rounded-2xl overflow-hidden ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
//                       <div className="h-32 relative">
//                         <img src={svc.hero_image} alt={svc.title} className="w-full h-full object-cover" />
//                         <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
//                         <h3 className="absolute bottom-2 left-3 text-white font-bold text-sm">{svc.title}</h3>
//                       </div>
//                       <div className="p-4">
//                         <p className={`text-xs mb-3 line-clamp-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                           {svc.short_description}
//                         </p>
//                         <div className="flex items-center justify-between">
//                           <span className={`text-xs ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                             Order: {svc.display_order}
//                           </span>
//                           <div className="flex gap-2">
//                             <button
//                               onClick={() => { setEditingService(svc); setShowServiceModal(true); }}
//                               className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${theme === 'dark' ? 'bg-surface-dark-hover hover:bg-brand-gradient hover:text-white' : 'bg-gray-100 hover:bg-brand-gradient hover:text-white'}`}
//                             >
//                               <FaEdit className="text-xs" />
//                             </button>
//                             <button
//                               onClick={() => deleteService(svc.id)}
//                               className="w-8 h-8 rounded-lg flex items-center justify-center bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
//                             >
//                               <FaTrashAlt className="text-xs" />
//                             </button>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             )}

//             {/* Packages */}
//             {tab === 'packages' && (
//               <div>
//                 <div className="flex justify-end mb-4">
//                   <button
//                     onClick={() => { setEditingPackage(null); setShowPackageModal(true); }}
//                     className="btn-brand flex items-center gap-2 text-sm"
//                   >
//                     <FaPlus /> Add Package
//                   </button>
//                 </div>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                   {packages.map((pkg) => {
//                     const svc = services.find(s => s.id === pkg.service_id);
//                     return (
//                       <div key={pkg.id} className={`rounded-2xl p-4 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light shadow-card-light'}`}>
//                         <div className="flex items-start justify-between mb-2">
//                           <h3 className={`font-bold text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
//                             {pkg.title}
//                           </h3>
//                           <span className="text-xs px-2 py-0.5 rounded-full bg-brand-gradient/10 text-brand-red-orange font-semibold">
//                             {pkg.duration}
//                           </span>
//                         </div>
//                         <p className={`text-xs mb-2 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                           Service: {svc?.title || 'N/A'}
//                         </p>
//                         <p className="text-sm font-bold brand-text-gradient mb-3">{pkg.price}</p>
//                         <p className={`text-xs line-clamp-2 mb-3 ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
//                           {pkg.description}
//                         </p>
//                         <div className="flex gap-2">
//                           <button
//                             onClick={() => { setEditingPackage(pkg); setShowPackageModal(true); }}
//                             className={`flex-1 text-xs py-1.5 rounded-lg flex items-center justify-center gap-1 transition-colors ${theme === 'dark' ? 'bg-surface-dark-hover hover:bg-brand-gradient hover:text-white' : 'bg-gray-100 hover:bg-brand-gradient hover:text-white'}`}
//                           >
//                             <FaEdit /> Edit
//                           </button>
//                           <button
//                             onClick={() => deletePackage(pkg.id)}
//                             className="text-xs px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-colors"
//                           >
//                             <FaTrashAlt />
//                           </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             )}
//           </motion.div>
//         </AnimatePresence>
//       </div>

//       {/* Service Modal */}
//       <AnimatePresence>
//         {showServiceModal && (
//           <ServiceModal
//             service={editingService}
//             services={services}
//             onClose={() => setShowServiceModal(false)}
//             onSaved={() => { setShowServiceModal(false); loadAll(); }}
//           />
//         )}
//       </AnimatePresence>

//       {/* Package Modal */}
//       <AnimatePresence>
//         {showPackageModal && (
//           <PackageModal
//             pkg={editingPackage}
//             services={services}
//             onClose={() => setShowPackageModal(false)}
//             onSaved={() => { setShowPackageModal(false); loadAll(); }}
//           />
//         )}
//       </AnimatePresence>
//     </div>
//   );
// }

// // Service Modal
// function ServiceModal({ service, onClose, onSaved }: {
//   service: Service | null;
//   services: Service[];
//   onClose: () => void;
//   onSaved: () => void;
// }) {
//   const { theme } = useTheme();
//   const [form, setForm] = useState({
//     slug: service?.slug || '',
//     title: service?.title || '',
//     short_description: service?.short_description || '',
//     long_description: service?.long_description || '',
//     icon_name: service?.icon_name || 'FaPlane',
//     hero_image: service?.hero_image || '',
//     features: (service?.features || []).join('\n'),
//     display_order: service?.display_order?.toString() || '0',
//     is_active: service?.is_active ?? true,
//   });
//   const [saving, setSaving] = useState(false);
//   const inputCls = `input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`;

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     const payload = {
//       slug: form.slug,
//       title: form.title,
//       short_description: form.short_description,
//       long_description: form.long_description,
//       icon_name: form.icon_name,
//       hero_image: form.hero_image,
//       gallery_images: [] as string[],
//       features: form.features.split('\n').filter(Boolean),
//       display_order: parseInt(form.display_order) || 0,
//       is_active: form.is_active,
//     };
//     if (service) {
//       await supabase.from('services').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', service.id);
//     } else {
//       await supabase.from('services').insert(payload);
//     }
//     setSaving(false);
//     onSaved();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.5, opacity: 0 }}
//         onClick={(e) => e.stopPropagation()}
//         className={`relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light'}`}
//       >
//         <button onClick={onClose} className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'hover:bg-surface-dark-hover' : 'hover:bg-gray-100'}`}>
//           <FaTimes className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'} />
//         </button>
//         <h3 className={`font-display text-lg font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
//           {service ? 'Edit Service' : 'Add Service'}
//         </h3>
//         <form onSubmit={handleSave} className="space-y-3">
//           <input value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} placeholder="Slug (e.g. flight-tickets)" className={inputCls} required />
//           <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Title" className={inputCls} required />
//           <input value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} placeholder="Short Description" className={inputCls} required />
//           <textarea value={form.long_description} onChange={(e) => setForm({ ...form, long_description: e.target.value })} placeholder="Long Description" rows={3} className={`${inputCls} resize-none`} />
//           <input value={form.icon_name} onChange={(e) => setForm({ ...form, icon_name: e.target.value })} placeholder="Icon Name (e.g. FaPlane)" className={inputCls} />
//           <input value={form.hero_image} onChange={(e) => setForm({ ...form, hero_image: e.target.value })} placeholder="Hero Image URL" className={inputCls} />
//           <textarea value={form.features} onChange={(e) => setForm({ ...form, features: e.target.value })} placeholder="Features (one per line)" rows={4} className={`${inputCls} resize-none`} />
//           <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} placeholder="Display Order" className={inputCls} />
//           <label className="flex items-center gap-2 text-sm">
//             <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-brand-red-orange" />
//             <span className={theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}>Active</span>
//           </label>
//           <button type="submit" disabled={saving} className="btn-brand w-full flex items-center justify-center gap-2">
//             <FaCheck /> {saving ? 'Saving...' : 'Save'}
//           </button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }

// // Package Modal
// function PackageModal({ pkg, services, onClose, onSaved }: {
//   pkg: Package | null;
//   services: Service[];
//   onClose: () => void;
//   onSaved: () => void;
// }) {
//   const { theme } = useTheme();
//   const [form, setForm] = useState({
//     service_id: pkg?.service_id || services[0]?.id || '',
//     title: pkg?.title || '',
//     duration: pkg?.duration || '',
//     price: pkg?.price || '',
//     description: pkg?.description || '',
//     itinerary: (pkg?.itinerary || []).join('\n'),
//     display_order: pkg?.display_order?.toString() || '0',
//     is_active: pkg?.is_active ?? true,
//   });
//   const [saving, setSaving] = useState(false);
//   const inputCls = `input-field ${theme === 'dark' ? 'input-field-dark' : 'input-field-light'}`;

//   const handleSave = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setSaving(true);
//     const payload = {
//       service_id: form.service_id,
//       title: form.title,
//       duration: form.duration,
//       price: form.price,
//       description: form.description,
//       itinerary: form.itinerary.split('\n').filter(Boolean),
//       gallery_images: [] as string[],
//       display_order: parseInt(form.display_order) || 0,
//       is_active: form.is_active,
//     };
//     if (pkg) {
//       await supabase.from('packages').update({ ...payload, updated_at: new Date().toISOString() }).eq('id', pkg.id);
//     } else {
//       await supabase.from('packages').insert(payload);
//     }
//     setSaving(false);
//     onSaved();
//   };

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       exit={{ opacity: 0 }}
//       onClick={onClose}
//       className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
//     >
//       <motion.div
//         initial={{ scale: 0.5, opacity: 0 }}
//         animate={{ scale: 1, opacity: 1 }}
//         exit={{ scale: 0.5, opacity: 0 }}
//         onClick={(e) => e.stopPropagation()}
//         className={`relative max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 ${theme === 'dark' ? 'bg-surface-dark-card border border-border-dark' : 'bg-white border border-border-light'}`}
//       >
//         <button onClick={onClose} className={`absolute top-4 right-4 w-8 h-8 rounded-lg flex items-center justify-center ${theme === 'dark' ? 'hover:bg-surface-dark-hover' : 'hover:bg-gray-100'}`}>
//           <FaTimes className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'} />
//         </button>
//         <h3 className={`font-display text-lg font-bold mb-4 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
//           {pkg ? 'Edit Package' : 'Add Package'}
//         </h3>
//         <form onSubmit={handleSave} className="space-y-3">
//           <select value={form.service_id} onChange={(e) => setForm({ ...form, service_id: e.target.value })} className={inputCls} required>
//             {services.map(s => <option key={s.id} value={s.id}>{s.title}</option>)}
//           </select>
//           <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Package Title" className={inputCls} required />
//           <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder="Duration (e.g. 14 days)" className={inputCls} />
//           <input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} placeholder="Price (e.g. From $2,500)" className={inputCls} />
//           <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Description" rows={3} className={`${inputCls} resize-none`} />
//           <textarea value={form.itinerary} onChange={(e) => setForm({ ...form, itinerary: e.target.value })} placeholder="Itinerary (one step per line)" rows={5} className={`${inputCls} resize-none`} />
//           <input type="number" value={form.display_order} onChange={(e) => setForm({ ...form, display_order: e.target.value })} placeholder="Display Order" className={inputCls} />
//           <label className="flex items-center gap-2 text-sm">
//             <input type="checkbox" checked={form.is_active} onChange={(e) => setForm({ ...form, is_active: e.target.checked })} className="w-4 h-4 accent-brand-red-orange" />
//             <span className={theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}>Active</span>
//           </label>
//           <button type="submit" disabled={saving} className="btn-brand w-full flex items-center justify-center gap-2">
//             <FaCheck /> {saving ? 'Saving...' : 'Save'}
//           </button>
//         </form>
//       </motion.div>
//     </motion.div>
//   );
// }