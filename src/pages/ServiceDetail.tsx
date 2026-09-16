import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaPlane,
  FaHotel,
  FaConciergeBell,
  FaKaaba,
  FaGraduationCap,
  FaCheckCircle,
  FaArrowRight,
  FaQuestionCircle,
  FaChevronDown,
} from '@/lib/icons';
import { useTheme } from '@/context/ThemeContext';
import LeadForm from '@/components/LeadForm';

type ServicePackage = {
  title: string;
  duration: string;
  price: string;
  description: string;
  itinerary: string[];
};

type ServiceData = {
  id: string;
  slug: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
  short_description: string;
  long_description: string;
  hero_image: string;
  features: string[];
  gallery_images?: string[];
  packages: ServicePackage[];
};

const SERVICES_DATA: ServiceData[] = [
  {
    id: '1',
    slug: 'flight-tickets',
    title: 'Domestic & International Flight Tickets',
    icon: FaPlane,
    short_description: 'Fast, hassle-free booking for worldwide and local flights with optimal schedules and competitive fares.',
    long_description: 'We provide end-to-end flight ticketing services covering both domestic routes and major international destinations. Our specialists assist with flight search, real-time fare comparison, seat selection, extra baggage requests, and flexible rebooking options.',
    hero_image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Domestic & Global Route Coverage',
      'Real-Time Flight Schedules & Availability',
      'Flexible Date Changes & Cancellations',
      'Special Corporate & Group Discounts',
    ],
    packages: [
      {
        title: 'Domestic Flight Ticketing',
        duration: 'One-Way / Round-Trip',
        price: 'Best Market Rates',
        description: 'Instant ticketing across all local airlines with preferred seat selection and luggage add-ons.',
        itinerary: ['Route & Schedule Search', 'Seat & Baggage Preference', 'Instant E-Ticket Issuance'],
      },
      {
        title: 'International Flight Ticketing',
        duration: 'One-Way / Multi-City',
        price: 'Competitive Global Fares',
        description: 'Comprehensive international routing, transit advisory, and priority cabin bookings across global carriers.',
        itinerary: ['Optimal Route Selection', 'Visa & Transit Verification', '24/7 Travel Assistance'],
      },
    ],
  },
  {
    id: '2',
    slug: 'hotel-reservations',
    title: 'Hotel Reservations',
    icon: FaHotel,
    short_description: 'Verified hotel bookings and accommodation arrangements in prime destinations worldwide.',
    long_description: 'Secure quality stays tailored to your budget and travel purpose. From luxury city-center hotels and boutique resorts to budget-friendly apartments, we handle reservations in major tourist and business hubs with transparent booking policies.',
    hero_image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=80',
    features: [
      'Worldwide Partner Hotel Network',
      'Prime Destination Access',
      'Flexible Check-in & Cancellation Options',
      'Group Booking & Special Requests',
    ],
    packages: [
      {
        title: 'Standard City Hotel Reservation',
        duration: 'Per Night / Custom Stay',
        price: 'Budget & Mid-Range Rates',
        description: 'Centrally located 3-star and 4-star property bookings ideal for city exploration and short stays.',
        itinerary: ['Destination & Location Selection', 'Room Type Confirmation', 'Voucher & Check-In Guarantee'],
      },
      {
        title: 'Luxury & Resort Accommodations',
        duration: 'Extended Stays',
        price: 'Premium Rates',
        description: 'Exclusive 5-star hotel and resort bookings featuring complimentary breakfast, airport shuttles, and VIP amenities.',
        itinerary: ['VIP Property Match', 'Exclusive Perks Inclusion', 'Dedicated Concierge Booking'],
      },
    ],
  },
  {
    id: '3',
    slug: 'travel-services',
    title: 'Other Travel Services',
    icon: FaConciergeBell,
    short_description: 'Comprehensive travel management including insurance, airport transfers, and customized itineraries.',
    long_description: 'Our agency provides complete support services to ensure every aspect of your journey is seamless. We handle travel insurance issuance, private ground transfers, guided city tours, and administrative visa processing support.',
    hero_image: '/images/office_banner.jpeg',
    features: [
      'Comprehensive Travel & Health Insurance',
      'Private Airport Pickups & Transfers',
      'Custom Itinerary & Tour Planning',
      'Visa Administrative Assistance',
    ],
    packages: [
      {
        title: 'Travel Insurance & Safety Pack',
        duration: 'Duration of Trip',
        price: 'Custom Coverage Quote',
        description: 'Medical coverage, lost baggage protection, and flight delay compensation policies.',
        itinerary: ['Policy Needs Audit', 'Instant Coverage Certificate', '24/7 Claims Assistance'],
      },
      {
        title: 'Airport Transfer & Ground Transport',
        duration: 'Single / Round Transfer',
        price: 'Fixed Airport Rates',
        description: 'Reliable private driver pickups and drop-offs between airports, hotels, and event venues.',
        itinerary: ['Flight Schedule Sync', 'Private Driver Pickup', 'Direct Destination Drop-off'],
      },
    ],
  },
  {
    id: '4',
    slug: 'umrah-packages',
    title: 'Umrah Visa & Packages',
    icon: FaKaaba,
    short_description: 'Spiritual Umrah journeys with complete visa support, close Haram accommodations, and guided ziyarat.',
    long_description: 'Experience a fulfilling pilgrimage to the Holy Cities of Makkah and Madinah. We provide complete Umrah visa processing, flights, comfortable hotels walking distance from Al-Masjid an-Nabawi and Masjid al-Haram, conditioned transport, and historical ziyarat tours.',
    hero_image: 'https://images.pexels.com/photos/28209449/pexels-photo-28209449.jpeg?auto=compress&cs=tinysrgb&h=400&w=300',
    gallery_images: [
      'https://images.unsplash.com/photo-1591604129939-f1efa4d9f7fa?auto=format&fit=crop&w=800&q=80', // Makkah Haram view
      'https://images.unsplash.com/photo-1565552645632-d725f8bfc19a?auto=format&fit=crop&w=800&q=80', // Madinah Mosque
    ],
    features: [
      'Official Saudi Umrah Visa Processing',
      'Hotels within Walking Distance to Haram',
      '14-Day, 21-Day, and 28-Day Package Options',
      'Guided Religious Ziyarat in Makkah & Madinah',
    ],
    packages: [
      {
        title: '14-Day Umrah Package',
        duration: '14 Days (7 Makkah / 7 Madinah)',
        price: 'From $1,350',
        description: 'Complete 2-week spiritual package including visa issuance, hotel bookings close to the Holy Mosques, and bus transfers.',
        itinerary: ['Umrah Visa Approval', 'Makkah Hotel & Umrah Rituals', 'Madinah Stay & Ziyarat Tours'],
      },
      {
        title: '21-Day Umrah Package',
        duration: '21 Days (11 Makkah / 10 Madinah)',
        price: 'From $1,850',
        description: 'Balanced 3-week itinerary allowing extended worship time in both Holy Cities with guided historical site visits.',
        itinerary: ['Visa & Ground Logistics', 'Extended Makkah Stay', 'Madinah Prophet Mosque Stay'],
      },
      {
        title: '28-Day Umrah Package',
        duration: '28 Days (14 Makkah / 14 Madinah)',
        price: 'From $2,400',
        description: 'Comprehensive month-long pilgrimage package offering full accommodation, flight ticketing, and dedicated ground support.',
        itinerary: ['Full Visa Clearance', '2 Weeks Makkah Accommodations', '2 Weeks Madinah Accommodations'],
      },
    ],
  },
  {
    id: '5',
    slug: 'student-visas',
    title: 'Student Visas',
    icon: FaGraduationCap,
    short_description: 'Complete admission guidance, visa processing, and university matching for Turkey and China.',
    long_description: 'Achieve your international study goals with dedicated educational consultancy. We specialize in Turkey and China student visa processing, university admission applications, scholarship guidance, and document verification for recognized higher institutions.',
    hero_image: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80',
    gallery_images: [
      'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=800&q=80', // University Campus
      'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=800&q=80', // College Architecture
    ],
    features: [
      'Turkey & China University Placement',
      'Document Translation & SOP Review',
      'Embassy Visa File Compilation',
      'Pre-Departure & Campus Registration Guidance',
    ],
    packages: [
      {
        title: 'Turkey Student Visa Package',
        duration: 'Full Admission Cycle',
        price: 'Consultation & Processing Fee',
        description: 'End-to-end guidance for Turkish university admissions, YÖK equivalency documentation, and embassy visa appointments.',
        itinerary: ['Turkey University Selection', 'Acceptance Letter Retrieval', 'Embassy Visa Submission'],
      },
      {
        title: 'China Student Visa Package (X1 / X2)',
        duration: 'Full Admission Cycle',
        price: 'Consultation & Processing Fee',
        description: 'Complete processing for Chinese universities, JW201/JW202 form clearance, and student visa application.',
        itinerary: ['JW201/JW202 Application', 'China Student Visa Filing', 'Pre-Flight & Arrival Support'],
      },
    ],
  },
];

export default function Services() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<string>(SERVICES_DATA[0].slug);
  const [openAccordion, setOpenAccordion] = useState<number | null>(0);

  const activeService = SERVICES_DATA.find((s) => s.slug === activeTab) || SERVICES_DATA[0];

  const accordionItems = [
    { title: 'Overview', content: activeService.long_description },
    { title: 'Key Features & Benefits', content: activeService.features.map((f) => `• ${f}`).join('\n') },
    {
      title: 'How to Apply',
      content: '1. Select your desired service or package\n2. Complete the quick inquiry form below\n3. Our travel specialist will reach out within 24 hours\n4. Finalize documentation and confirm booking',
    },
  ];

  return (
    <div className={theme === 'dark' ? 'bg-surface-dark' : 'bg-surface-light'}>
      {/* Header Banner */}
      <section className="relative h-[65vh] min-h-[360px] flex items-center justify-center overflow-hidden pt-16">
        <div className="absolute inset-0 h-full">
          <img
            src="/images/travel_banner.jpeg"
            alt="Our Services"
            className="w-full h-full "
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/55 to-black/85" />
        </div>
        <div className="relative z-10 text-center px-4 max-w-3xl">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/20 border border-white/20 text-brand-gold text-xs font-semibold tracking-wider uppercase mb-3"
          >
            What We Offer
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Professional Travel Services
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-base sm:text-lg text-white/80"
          >
            Reliable, tailored, and comprehensive solutions for your travel, stay, and spiritual needs.
          </motion.p>
        </div>
      </section>

     <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
  {/* Mobile View: Select Dropdown Option (Alternative to Horizontal Bar) */}
  <div className="block md:hidden mb-4">
    <div
      className={`p-2 rounded-2xl border backdrop-blur-md shadow-card-light ${
        theme === "dark"
          ? "bg-surface-dark-card/90 border-border-dark"
          : "bg-white/90 border-border-light"
      }`}
    >
      <div className="grid grid-cols-2 gap-2">
        {SERVICES_DATA.map((item) => {
          const IconComponent = item.icon;
          const isActive = activeTab === item.slug;
          return (
            <button
              key={item.slug}
              onClick={() => {
                setActiveTab(item.slug);
                setOpenAccordion(0);
              }}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-300 ${
                isActive
                  ? "bg-brand-gradient text-white shadow-brand-glow font-semibold"
                  : theme === "dark"
                  ? "bg-surface-dark-hover/50 text-ink-dark-secondary hover:text-ink-dark-primary"
                  : "bg-gray-100 text-ink-light-secondary hover:text-ink-light-primary"
              }`}
            >
              <IconComponent className="text-sm shrink-0" />
              <span className="truncate">{item.title}</span>
            </button>
          );
        })}
      </div>
    </div>
  </div>

  {/* Desktop & Tablet View: Animated Segmented Pills */}
  <div className="hidden md:flex mt-10 flex-wrap items-center justify-center gap-2 p-2 rounded-2xl border backdrop-blur-md shadow-card-light transition-colors duration-300 max-w-fit mx-auto">
    {SERVICES_DATA.map((item) => {
      const IconComponent = item.icon;
      const isActive = activeTab === item.slug;
      return (
        <button
          key={item.slug}
          onClick={() => {
            setActiveTab(item.slug);
            setOpenAccordion(0);
          }}
          className={`relative flex items-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm whitespace-nowrap transition-colors duration-300 ${
            isActive
              ? "text-white"
              : theme === "dark"
              ? "text-ink-dark-secondary hover:text-ink-dark-primary hover:bg-surface-dark-hover/50"
              : "text-ink-light-secondary hover:text-ink-light-primary hover:bg-gray-100"
          }`}
        >
          {/* Animated Background Indicator for Desktop */}
          {isActive && (
            <motion.div
              layoutId="activeTabIndicator"
              className="absolute inset-0 bg-brand-gradient rounded-xl shadow-brand-glow z-0"
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          )}

          <IconComponent className="text-base relative z-10" />
          <span className="relative z-10">{item.title}</span>
        </button>
      );
    })}
  </div>
</section>

      {/* Active Service Showcase */}
      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeService.slug}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center"
            >
              {/* Image Banner */}
              <div className="relative rounded-3xl overflow-hidden h-80 sm:h-96 shadow-card-light border border-border-light dark:border-border-dark">
                <img
                  src={activeService.hero_image}
                  alt={activeService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand-gold">
                    Featured Service
                  </span>
                  <h3 className="text-2xl font-bold font-display mt-1">{activeService.title}</h3>
                </div>
              </div>

              {/* Description & Details */}
              <div className="space-y-6">
                <div>
                  <h2 className={`font-display text-2xl sm:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    {activeService.title}
                  </h2>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                    {activeService.long_description}
                  </p>
                </div>

                {/* Features Checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {activeService.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2.5">
                      <div className="w-5 h-5 rounded-full bg-brand-gradient/10 flex items-center justify-center shrink-0">
                        <FaCheckCircle className="text-brand-red-orange text-xs" />
                      </div>
                      <span className={`text-sm font-medium ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Accordion */}
                <div className="space-y-2 pt-2">
                  {accordionItems.map((item, i) => (
                    <div
                      key={i}
                      className={`rounded-xl overflow-hidden border transition-colors ${
                        openAccordion === i
                          ? theme === 'dark' ? 'border-brand-red-orange/40' : 'border-brand-red-orange/30'
                          : theme === 'dark' ? 'border-border-dark' : 'border-border-light'
                      }`}
                    >
                      <button
                        onClick={() => setOpenAccordion(openAccordion === i ? null : i)}
                        className={`w-full flex items-center justify-between px-4 py-3 text-left transition-colors ${
                          theme === 'dark' ? 'bg-surface-dark-card hover:bg-surface-dark-hover' : 'bg-white hover:bg-gray-50'
                        }`}
                      >
                        <span className={`font-semibold text-sm ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                          {item.title}
                        </span>
                        <motion.div animate={{ rotate: openAccordion === i ? 180 : 0 }}>
                          <FaChevronDown className={`text-xs ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`} />
                        </motion.div>
                      </button>
                      <AnimatePresence>
                        {openAccordion === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className={`px-4 py-3 text-sm whitespace-pre-line ${theme === 'dark' ? 'text-ink-dark-secondary bg-surface-dark-hover' : 'text-ink-light-secondary bg-gray-50'}`}>
                              {item.content}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Packages Section */}
      <section className={`py-14 lg:py-18 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className={`font-display text-2xl sm:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
              Available Packages for {activeService.title}
            </h2>
            <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
              Select a package suited to your itinerary, group size, or travel requirements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeService.packages.map((pkg, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className={`rounded-2xl p-6 transition-all ${
                  theme === 'dark'
                    ? 'bg-surface-dark-hover border border-border-dark hover:border-brand-red-orange/40'
                    : 'bg-gray-50 border border-border-light hover:border-brand-red-orange/30 shadow-card-light'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <h3 className={`font-display text-lg font-bold ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                    {pkg.title}
                  </h3>
                  <span className="text-xs px-2.5 py-1 rounded-full bg-brand-gradient/10 text-brand-red-orange font-semibold">
                    {pkg.duration}
                  </span>
                </div>
                <p className={`text-sm mb-4 leading-relaxed ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                  {pkg.description}
                </p>
                <div className="text-xl font-bold brand-text-gradient mb-4">
                  {pkg.price}
                </div>
                <ul className="space-y-2">
                  {pkg.itinerary.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-xs">
                      <span className="w-4 h-4 rounded-full bg-brand-gradient/10 text-brand-red-orange font-bold text-[10px] flex items-center justify-center shrink-0">
                        {j + 1}
                      </span>
                      <span className={theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}>
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking / Application Form */}
      <section className="py-14 lg:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`rounded-3xl p-8 lg:p-12 ${
              theme === 'dark'
                ? 'bg-surface-dark-card border border-border-dark'
                : 'bg-white border border-border-light shadow-card-light'
            }`}
          >
            <div className="text-center mb-8">
              <span className="inline-block px-4 py-1.5 rounded-full bg-brand-gradient/10 text-brand-red-orange text-xs font-semibold mb-3">
                Inquire & Book
              </span>
              <h2 className={`font-display text-2xl sm:text-3xl font-bold mb-3 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
                Request {activeService.title} Services
              </h2>
              <p className={`text-sm sm:text-base ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
                Fill out the quick inquiry form below and our dedicated travel experts will get in touch with you.
              </p>
            </div>
            <LeadForm defaultService={activeService.title} />
          </div>
        </div>
      </section>

      {/* Inquiry Callout */}
      <section className={`py-14 ${theme === 'dark' ? 'bg-surface-dark-card' : 'bg-white'}`}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-brand-gradient items-center justify-center mb-4 shadow-brand-glow">
            <FaQuestionCircle className="text-white text-xl" />
          </div>
          <h2 className={`font-display text-2xl font-bold mb-3 ${theme === 'dark' ? 'text-ink-dark-primary' : 'text-ink-light-primary'}`}>
            Need Custom Assistance?
          </h2>
          <p className={`text-sm sm:text-base mb-6 max-w-xl mx-auto ${theme === 'dark' ? 'text-ink-dark-secondary' : 'text-ink-light-secondary'}`}>
            Have specific travel routes, visa inquiries, or corporate group requests? Get in touch directly with our support team.
          </p>
          <Link to="/contact" className="btn-brand inline-flex items-center gap-2">
            Contact Support <FaArrowRight className="text-xs" />
          </Link>
        </div>
      </section>
    </div>
  );
}