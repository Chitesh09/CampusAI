import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Search,
  Phone,
  Mail,
  MapPin,
  Clock,
  ExternalLink,
  ChevronRight,
  Users,
  BookOpen,
  Briefcase,
  Shield,
  Bus,
  Coffee,
  Heart,
  Lightbulb,
  GraduationCap,
  Building2,
  Cpu,
  Star,
  Navigation,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

interface ServiceContact {
  id: string;
  name: string;
  category: string;
  description: string;
  phone?: string;
  email?: string;
  location?: string;
  hours?: string;
  website?: string;
  highlight?: string;
  urgent?: boolean;
}

const SERVICES_CATEGORIES = [
  { id: 'all', label: 'All Services', icon: <Building2 className="w-4 h-4" />, color: 'text-slate-500' },
  { id: 'faculty', label: 'Faculty Directory', icon: <Users className="w-4 h-4" />, color: 'text-indigo-500' },
  { id: 'dept', label: 'Department', icon: <GraduationCap className="w-4 h-4" />, color: 'text-purple-500' },
  { id: 'office', label: 'Office Contacts', icon: <Building2 className="w-4 h-4" />, color: 'text-blue-500' },
  { id: 'exam', label: 'Exam Cell', icon: <BookOpen className="w-4 h-4" />, color: 'text-amber-500' },
  { id: 'library', label: 'Library', icon: <BookOpen className="w-4 h-4" />, color: 'text-emerald-500' },
  { id: 'placement', label: 'Placement Cell', icon: <Briefcase className="w-4 h-4" />, color: 'text-rose-500' },
  { id: 'nss', label: 'NSS', icon: <Heart className="w-4 h-4" />, color: 'text-pink-500' },
  { id: 'ncc', label: 'NCC', icon: <Shield className="w-4 h-4" />, color: 'text-orange-500' },
  { id: 'innovation', label: 'Innovation Cell', icon: <Lightbulb className="w-4 h-4" />, color: 'text-yellow-500' },
  { id: 'clubs', label: 'Student Clubs', icon: <Star className="w-4 h-4" />, color: 'text-cyan-500' },
  { id: 'hostel', label: 'Hostel', icon: <Building2 className="w-4 h-4" />, color: 'text-teal-500' },
  { id: 'transport', label: 'Transport', icon: <Bus className="w-4 h-4" />, color: 'text-violet-500' },
  { id: 'cafeteria', label: 'Cafeteria', icon: <Coffee className="w-4 h-4" />, color: 'text-brown-500' },
  { id: 'campus-map', label: 'Campus Map', icon: <Navigation className="w-4 h-4" />, color: 'text-blue-500' },
  { id: 'emergency', label: 'Emergency', icon: <AlertTriangle className="w-4 h-4" />, color: 'text-red-500' },
];

const SERVICES_DATA: ServiceContact[] = [
  // Faculty Directory
  { id: 'f1', name: 'Dr. Sunita Rao', category: 'faculty', description: 'HOD – Information Science & Engineering', phone: '+91 98440 XXXXX', email: 'hod.ise@atria.edu', location: 'CS Block, Room 305', hours: 'Mon–Fri, 10:00 AM–4:00 PM', highlight: 'HOD' },
  { id: 'f2', name: 'Prof. Ramesh Kumar', category: 'faculty', description: 'Professor – Big Data Analytics & Cloud Computing', phone: '+91 99720 XXXXX', email: 'ramesh.k@atria.edu', location: 'CS Block, Room 310', hours: 'Mon–Fri, 9:00 AM–5:00 PM' },
  { id: 'f3', name: 'Prof. Anitha Sharma', category: 'faculty', description: 'Asst. Professor – Information Security & Cryptography', phone: '+91 97400 XXXXX', email: 'anitha.s@atria.edu', location: 'CS Block, Room 308', hours: 'Mon–Sat, 9:30 AM–4:30 PM' },
  { id: 'f4', name: 'Prof. Vijay Nair', category: 'faculty', description: 'Asst. Professor – Blockchain & Web Technologies', email: 'vijay.n@atria.edu', location: 'CS Block, Room 312' },
  // Department Contacts
  { id: 'd1', name: 'ISE Department', category: 'dept', description: 'Department of Information Science & Engineering', phone: '+91 80 2345 6789', email: 'ise@atria.edu', location: 'CS Block – 3rd Floor', hours: 'Mon–Sat, 9:00 AM–5:00 PM', highlight: 'Main Dept' },
  { id: 'd2', name: 'CSE Department', category: 'dept', description: 'Department of Computer Science & Engineering', phone: '+91 80 2345 6790', email: 'cse@atria.edu', location: 'CS Block – 2nd Floor', hours: 'Mon–Sat, 9:00 AM–5:00 PM' },
  { id: 'd3', name: 'ISE Lab Coordinator', category: 'dept', description: 'CS Lab 1, 2, 3 – Bookings & Access', phone: '+91 98441 XXXXX', email: 'lab.ise@atria.edu', location: 'CS Block – Lab Wing', hours: 'Mon–Sat, 8:00 AM–6:00 PM' },
  // Office Contacts
  { id: 'o1', name: "Principal's Office", category: 'office', description: 'Dr. G.V. Subba Reddy - Principal, Atria Institute of Technology', phone: '+91 80 2345 6700', email: 'principal@atria.edu', location: 'Admin Block - Ground Floor', hours: 'Mon-Sat, 9:00 AM-5:00 PM', highlight: 'Principal' },
  { id: 'o2', name: 'Academic Section', category: 'office', description: 'Student Records, Bonafide, Transcripts', phone: '+91 80 2345 6710', email: 'academic@atria.edu', location: 'Admin Block – Room 101', hours: 'Mon–Sat, 9:30 AM–4:30 PM' },
  { id: 'o3', name: 'Accounts & Fee', category: 'office', description: 'Fee Payment, Receipts, Scholarships', phone: '+91 80 2345 6720', email: 'accounts@atria.edu', location: 'Admin Block – Room 104', hours: 'Mon–Fri, 10:00 AM–3:30 PM' },
  { id: 'o4', name: 'Student Welfare Office', category: 'office', description: 'Grievances, Anti-Ragging Cell, Student Support', phone: '+91 80 2345 6730', email: 'welfare@atria.edu', location: 'Admin Block – Room 106' },
  // Exam Cell
  { id: 'e1', name: 'Atria Exam Cell', category: 'exam', description: 'Internal Assessment, Hall Tickets, Result Processing', phone: '+91 80 2345 6740', email: 'examcell@atria.edu', location: 'Admin Block – Room 201', hours: 'Mon–Sat, 9:00 AM–4:30 PM', highlight: 'VTU Exams' },
  { id: 'e2', name: 'VTU Coordination Office', category: 'exam', description: 'VTU Revaluation, Supplementary Exams, Results', email: 'vtu.coord@atria.edu', location: 'Admin Block – Room 203' },
  // Library
  { id: 'l1', name: 'Atria Central Library', category: 'library', description: 'Physical & Digital Library – IEEE, Springer, Elsevier Access', phone: '+91 80 2345 6750', email: 'library@atria.edu', location: 'Library Block – All Floors', hours: 'Mon–Sat, 8:00 AM–8:00 PM', highlight: 'Open Now', website: 'https://library.atria.edu' },
  { id: 'l2', name: 'Digital Library Portal', category: 'library', description: 'Online e-Resources: NPTEL, VTU e-Learning, DELNET', email: 'digital.lib@atria.edu', website: 'https://vtucircle.com', hours: '24/7 Online Access' },
  // Placement Cell
  { id: 'p1', name: 'Atria Placement Cell', category: 'placement', description: 'Training & Placement Officer – Campus Drives & Internships', phone: '+91 80 2345 6760', email: 'placement@atria.edu', location: 'Placement Block – Ground Floor', hours: 'Mon–Sat, 9:00 AM–5:30 PM', highlight: '95+ Companies', website: 'https://placement.atria.edu' },
  { id: 'p2', name: 'Mr. Kiran Shetty – TPO', category: 'placement', description: 'Training & Placement Officer', phone: '+91 99720 XXXXX', email: 'tpo@atria.edu' },
  // NSS
  { id: 'nss1', name: 'NSS Unit – Atria', category: 'nss', description: 'National Service Scheme – Community & Social Activities', email: 'nss@atria.edu', location: 'Student Activity Center', hours: 'Wed & Sat, 3:00 PM–5:00 PM', highlight: 'Active' },
  // NCC
  { id: 'ncc1', name: 'NCC Unit – 5 KAR BN', category: 'ncc', description: 'National Cadet Corps – Army Wing, Atria', email: 'ncc@atria.edu', location: 'NCC Room, Ground Floor', hours: 'Mon, Wed, Fri – 7:00 AM', highlight: '5 KAR BN' },
  // Innovation Cell
  { id: 'ic1', name: 'Atria Innovation Cell', category: 'innovation', description: 'AICTE Idea Lab, Startup Incubation, Project Funding', phone: '+91 80 2345 6780', email: 'innovation@atria.edu', location: 'Innovation Hub – Block D', hours: 'Mon–Fri, 10:00 AM–6:00 PM', highlight: 'AICTE Funded' },
  // Student Clubs
  { id: 'club1', name: 'IEEE Student Branch', category: 'clubs', description: 'Technical Events, Paper Presentations, Workshops', email: 'ieee.atria@gmail.com', location: 'CS Block – Club Room', highlight: 'IEEE' },
  { id: 'club2', name: 'Atria Coding Club', category: 'clubs', description: 'Competitive Programming, Hackathons, DSA Sessions', email: 'codingclub@atria.edu', location: 'CS Lab 2', highlight: 'Active' },
  { id: 'club3', name: 'Cognition TechFest Team', category: 'clubs', description: "Organizers of Atria's Annual Technical Festival", email: 'cognition@atria.edu', highlight: 'Sept 2026' },
  // Hostel
  { id: 'h1', name: "Boys' Hostel – AIT", category: 'hostel', description: 'On-Campus Hostel, Warden Contact', phone: '+91 80 2345 6800', email: 'hostel.boys@atria.edu', location: 'Hostel Block A', hours: 'Curfew: 10:00 PM' },
  { id: 'h2', name: "Girls' Hostel – AIT", category: 'hostel', description: 'On-Campus Girls Hostel, Lady Warden', phone: '+91 80 2345 6801', email: 'hostel.girls@atria.edu', location: 'Hostel Block B', hours: 'Curfew: 9:00 PM' },
  // Transport
  { id: 't1', name: 'Atria Bus Service', category: 'transport', description: 'Routes: KR Puram, Yeshwanthpur, Electronic City, Bannerghatta', phone: '+91 80 2345 6810', email: 'transport@atria.edu', location: 'Main Gate – Bus Stand', hours: 'Departs: 7:45 AM & 4:30 PM', highlight: '12 Routes' },
  // Cafeteria
  { id: 'caf1', name: 'Atria Main Canteen', category: 'cafeteria', description: "South Indian & North Indian meals, Snacks, Beverages", location: 'Ground Floor – Block A', hours: 'Mon–Sat, 7:30 AM–8:30 PM', highlight: 'Today: Thali ₹60' },
  { id: 'caf2', name: 'Mini Cafe – CS Block', category: 'cafeteria', description: 'Quick snacks, Coffee, Sandwiches', location: 'CS Block – Ground Floor', hours: 'Mon–Sat, 8:00 AM–5:30 PM' },
  // Campus Map
  { id: 'map1', name: 'Atria Campus Navigation', category: 'campus-map', description: 'Interactive campus map – Labs, Dept Blocks, Library, Hostels', location: 'Anandanagar, Bengaluru – 560024', highlight: '12 Acres Campus', website: 'https://maps.google.com/?q=Atria+Institute+of+Technology+Bangalore' },
  // Emergency
  { id: 'em1', name: '🚨 Medical Center', category: 'emergency', description: 'On-campus medical room with nurse on duty', phone: '+91 80 2345 6900', location: 'Admin Block – Ground Floor', hours: '9:00 AM – 5:00 PM', urgent: true, highlight: 'On-Campus' },
  { id: 'em2', name: '🚑 Ambulance (Emergency)', category: 'emergency', description: '24/7 Emergency Medical Support', phone: '108', urgent: true },
  { id: 'em3', name: '🚒 Fire Safety', category: 'emergency', description: 'Campus Fire Safety Officer', phone: '101 / +91 80 2345 6901', urgent: true },
  { id: 'em4', name: '🔒 Anti-Ragging Helpline', category: 'emergency', description: 'UGC Anti-Ragging Helpline – Confidential', phone: '1800-180-5522', urgent: true, highlight: 'Toll Free' },
  { id: 'em5', name: '👮 Campus Security', category: 'emergency', description: '24/7 Security Control Room – Atria Campus', phone: '+91 80 2345 6950', location: 'Main Gate', hours: '24/7', urgent: true },
];

const CAT_COLORS: Record<string, string> = {
  faculty: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600 dark:text-indigo-400',
  dept: 'bg-purple-500/10 border-purple-500/20 text-purple-600 dark:text-purple-400',
  office: 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  exam: 'bg-amber-500/10 border-amber-500/20 text-amber-600 dark:text-amber-400',
  library: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-600 dark:text-emerald-400',
  placement: 'bg-rose-500/10 border-rose-500/20 text-rose-600 dark:text-rose-400',
  nss: 'bg-pink-500/10 border-pink-500/20 text-pink-600 dark:text-pink-400',
  ncc: 'bg-orange-500/10 border-orange-500/20 text-orange-600 dark:text-orange-400',
  innovation: 'bg-yellow-500/10 border-yellow-500/20 text-yellow-600 dark:text-yellow-400',
  clubs: 'bg-cyan-500/10 border-cyan-500/20 text-cyan-600 dark:text-cyan-400',
  hostel: 'bg-teal-500/10 border-teal-500/20 text-teal-600 dark:text-teal-400',
  transport: 'bg-violet-500/10 border-violet-500/20 text-violet-600 dark:text-violet-400',
  cafeteria: 'bg-amber-500/10 border-amber-500/20 text-amber-700 dark:text-amber-400',
  'campus-map': 'bg-blue-500/10 border-blue-500/20 text-blue-600 dark:text-blue-400',
  emergency: 'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400',
};

export const StudentServices: React.FC = () => {
  const { currentUser, setCurrentView } = useApp();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    let list = SERVICES_DATA;
    if (selectedCategory !== 'all') list = list.filter((s) => s.category === selectedCategory);
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (s) =>
          s.name.toLowerCase().includes(q) ||
          s.description.toLowerCase().includes(q) ||
          (s.email || '').toLowerCase().includes(q) ||
          (s.location || '').toLowerCase().includes(q) ||
          s.category.toLowerCase().includes(q)
      );
    }
    // Emergency always first
    return list.sort((a, b) => (b.urgent ? 1 : 0) - (a.urgent ? 1 : 0));
  }, [selectedCategory, searchQuery]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
  };
  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 22 } },
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#08080a]">
      {/* ── Hero Header ─────────────────────────────────────── */}
      <div
        className="relative px-4 sm:px-6 pt-6 pb-8"
        style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 70% 30%, #3b82f6 0%, transparent 50%), radial-gradient(circle at 20% 70%, #6366f1 0%, transparent 40%)' }} />
        <div className="relative z-10 max-w-7xl mx-auto space-y-5">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/15 text-white/90 text-[11px] font-bold border border-white/20">
                🏛️ Atria Institute of Technology
              </span>
              <span className="text-[10px] text-white/50 font-mono">Student Services Portal</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">Student Services</h1>
            <p className="text-xs text-white/60">
              All contacts, services, clubs, and campus resources in one place
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search faculty, placement, library, hostel, emergency..."
              className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm font-medium backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-white/30 focus:bg-white/15 transition-all"
            />
            {searchQuery && (
              <button onClick={() => setSearchQuery('')} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 text-lg leading-none">×</button>
            )}
          </div>

          {/* Emergency Quick-Buttons */}
          <div className="flex items-center space-x-2 overflow-x-auto no-scrollbar pb-1">
            <span className="text-[10px] text-white/40 font-bold shrink-0">QUICK:</span>
            {[
              { label: '🚑 Ambulance', value: '108' },
              { label: '🚒 Fire', value: '101' },
              { label: '🔒 Anti-Ragging', value: '1800-180-5522' },
              { label: '👮 Security', value: '+91 80 2345 6950' },
            ].map((em) => (
              <a
                key={em.label}
                href={`tel:${em.value}`}
                className="flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-red-500/20 border border-red-500/30 text-white text-[11px] font-bold whitespace-nowrap hover:bg-red-500/30 transition-all"
              >
                <span>{em.label}</span>
                <span className="text-red-300 font-mono">{em.value}</span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 space-y-5">
        {/* ── Category Chips ─────────────────────────────────── */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-2 no-scrollbar">
          {SERVICES_CATEGORIES.map((cat) => {
            const count = cat.id === 'all' ? SERVICES_DATA.length : SERVICES_DATA.filter((s) => s.category === cat.id).length;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap border transition-all ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                    : 'bg-white dark:bg-zinc-900 border-slate-200 dark:border-zinc-800 text-slate-600 dark:text-zinc-400 hover:border-indigo-400/50'
                }`}
              >
                <span className={cat.color}>{cat.icon}</span>
                <span>{cat.label}</span>
                <span className={`text-[9px] font-black px-1 py-0.5 rounded ${selectedCategory === cat.id ? 'bg-white/20' : 'bg-slate-100 dark:bg-zinc-800'}`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* ── Results Count ──────────────────────────────────── */}
        <div className="flex items-center justify-between">
          <span className="text-xs text-slate-500 dark:text-zinc-500 font-medium">
            {filtered.length} service{filtered.length !== 1 ? 's' : ''} found
          </span>
          {searchQuery && (
            <span className="text-xs text-indigo-500 font-semibold">Results for "{searchQuery}"</span>
          )}
        </div>

        {/* ── Service Cards ──────────────────────────────────── */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <div className="text-4xl">🏛️</div>
            <p className="text-sm font-bold text-slate-600 dark:text-zinc-400">No services found</p>
            <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="text-xs font-bold text-indigo-500 hover:underline">Clear search</button>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          >
            {filtered.map((svc) => {
              const catConfig = SERVICES_CATEGORIES.find((c) => c.id === svc.category) || SERVICES_CATEGORIES[0];
              const colorClass = CAT_COLORS[svc.category] || CAT_COLORS['office'];

              return (
                <motion.div
                  key={svc.id}
                  variants={itemVariants}
                  className={`p-4 rounded-2xl bg-white dark:bg-zinc-900 border transition-all hover:shadow-md cursor-default space-y-3 ${
                    svc.urgent
                      ? 'border-red-500/40 hover:border-red-500/60'
                      : 'border-slate-200 dark:border-zinc-800 hover:border-indigo-400/40'
                  }`}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between gap-2">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center border shrink-0 ${colorClass}`}>
                      {catConfig.icon}
                    </div>
                    <div className="flex items-center space-x-1.5 flex-wrap gap-1">
                      {svc.urgent && (
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-red-500/10 border border-red-500/30 text-red-600 dark:text-red-400">
                          URGENT
                        </span>
                      )}
                      {svc.highlight && (
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded border ${colorClass}`}>
                          {svc.highlight}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Name & Description */}
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">{svc.name}</h3>
                    <p className="text-[11px] text-slate-500 dark:text-zinc-500 mt-0.5 leading-relaxed">{svc.description}</p>
                  </div>

                  {/* Contact Details */}
                  <div className="space-y-1.5">
                    {svc.phone && (
                      <a href={`tel:${svc.phone}`} className="flex items-center space-x-2 text-[11px] font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors">
                        <Phone className="w-3 h-3 text-emerald-500 shrink-0" />
                        <span className="font-mono">{svc.phone}</span>
                      </a>
                    )}
                    {svc.email && (
                      <a href={`mailto:${svc.email}`} className="flex items-center space-x-2 text-[11px] font-semibold text-slate-700 dark:text-zinc-300 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors truncate">
                        <Mail className="w-3 h-3 text-indigo-400 shrink-0" />
                        <span className="truncate">{svc.email}</span>
                      </a>
                    )}
                    {svc.location && (
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-zinc-500">
                        <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                        <span>{svc.location}</span>
                      </div>
                    )}
                    {svc.hours && (
                      <div className="flex items-center space-x-2 text-[11px] text-slate-500 dark:text-zinc-500">
                        <Clock className="w-3 h-3 text-amber-400 shrink-0" />
                        <span>{svc.hours}</span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  {(svc.phone || svc.email || svc.website) && (
                    <div className="flex items-center space-x-2 pt-2 border-t border-slate-100 dark:border-zinc-800">
                      {svc.phone && (
                        <a
                          href={`tel:${svc.phone}`}
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-all"
                        >
                          <Phone className="w-3 h-3" />
                          <span>Call</span>
                        </a>
                      )}
                      {svc.email && (
                        <a
                          href={`mailto:${svc.email}`}
                          className="flex-1 flex items-center justify-center space-x-1.5 py-2 rounded-xl bg-slate-100 dark:bg-zinc-800 hover:bg-slate-200 dark:hover:bg-zinc-700 text-slate-700 dark:text-zinc-300 text-[11px] font-bold transition-all"
                        >
                          <Mail className="w-3 h-3" />
                          <span>Email</span>
                        </a>
                      )}
                      {svc.website && (
                        <a
                          href={svc.website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-bold transition-all"
                        >
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </div>
  );
};
