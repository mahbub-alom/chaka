import React, { useState, useMemo } from 'react';
import { VehicleListing, AdvertisementSlot, VehicleType, VehicleCondition, FuelType } from '@/types';
import { 
  Shield, 
  Eye, 
  ShieldAlert, 
  BadgeCheck, 
  Landmark, 
  Percent, 
  Bell, 
  Trash2, 
  Edit, 
  Check, 
  X, 
  Search, 
  Filter, 
  Activity, 
  Settings, 
  AlertCircle, 
  Calendar, 
  User, 
  MapPin, 
  Flag,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  Phone,
  Layers,
  Sliders,
  Database,
  Terminal,
  TrendingUp,
  SlidersHorizontal,
  FolderLock
} from 'lucide-react';

interface DashboardAdminProps {
  listings: VehicleListing[];
  adSlots: AdvertisementSlot[];
  onToggleAdSlot: (id: string) => void;
  onUpdateAdSlot?: (updated: AdvertisementSlot) => void;
  onApproveAd: (id: string) => void;
  onRejectAd: (id: string) => void;
  onDeleteListing?: (id: string) => void;
  onUpdateListing?: (updated: VehicleListing) => void;
  isDarkMode: boolean;
}

interface ListedReport {
  id: string;
  listingId: string;
  listingTitle: string;
  reporterName: string;
  reporterPhone: string;
  reason: string;
  details: string;
  timestamp: string;
  status: 'Pending' | 'Resolved' | 'Actioned';
  severity: 'low' | 'medium' | 'high';
}

interface PerformanceMetric {
  cpu: string;
  memory: string;
  connections: number;
}

export default function DashboardAdmin({
  listings,
  adSlots,
  onToggleAdSlot,
  onUpdateAdSlot,
  onApproveAd,
  onRejectAd,
  onDeleteListing,
  onUpdateListing,
  isDarkMode
}: DashboardAdminProps) {
  
  // Tab control inside admin panel
  const [activeAdminTab, setActiveAdminTab] = useState<'listings' | 'reports' | 'ads' | 'settings'>('listings');

  // Search and Advanced filters for Master Vehicle Directory
  const [adminSearch, setAdminSearch] = useState('');
  const [adminTypeFilter, setAdminTypeFilter] = useState<'all' | VehicleType>('all');
  const [adminConditionFilter, setAdminConditionFilter] = useState<'all' | VehicleCondition>('all');
  const [adminStatusFilter, setAdminStatusFilter] = useState<'all' | 'Approved' | 'Pending' | 'Rejected'>('all');
  const [adminFeaturedFilter, setAdminFeaturedFilter] = useState<'all' | 'featured' | 'standard'>('all');

  // Interactive Live Performance metrics simulator
  const [perfMetrics, setPerfMetrics] = useState<PerformanceMetric>({
    cpu: '1.8%',
    memory: '144 MB / 1024 MB',
    connections: 112
  });

  // Security audit trail logs
  const [auditLogs, setAuditLogs] = useState<string[]>([
    'System initialization successful. Ingress port 3000 mapped.',
    'IP 192.168.1.18 checked for token auth, granted Admin role.',
    'Automated compliance scans executed: 0 malicious links detected.',
    'System sync with Chaka.BD database verified. All indexes online.',
    'Google AdSense top-banner placement activated.'
  ]);

  // Handle manual log generation
  const handleSimulateLog = (text: string) => {
    const time = new Date().toLocaleTimeString();
    setAuditLogs(prev => [`[${time}] ${text}`, ...prev.slice(0, 8)]);
  };

  // Simulated server stats refresher
  const handleRefreshStats = () => {
    const randCpu = (Math.random() * 4 + 1).toFixed(1) + '%';
    const randMem = Math.floor(Math.random() * 50 + 130) + ' MB / 1024 MB';
    const randConn = Math.floor(Math.random() * 40 + 95);
    setPerfMetrics({ cpu: randCpu, memory: randMem, connections: randConn });
    handleSimulateLog('Fitted system diagnostic parameters refreshed successfully.');
  };

  // Flagged user reports state
  const [reports, setReports] = useState<ListedReport[]>([
    {
      id: 'rpt_1',
      listingId: 'car_2',
      listingTitle: 'Honda Civic VTEC Turbo 2021',
      reporterName: 'Mominul Huq',
      reporterPhone: '01811554422',
      reason: 'Fake Price Claim',
      details: 'On calling, the seller demands BDT 4,20,000 extra charge because of "unregistered paperwork." Please review.',
      timestamp: '2026-06-08T14:32:00Z',
      status: 'Pending',
      severity: 'medium'
    },
    {
      id: 'rpt_2',
      listingId: 'pending_1',
      listingTitle: 'Suzuki Gixxer SF Used 2018',
      reporterName: 'Zayed Khan',
      reporterPhone: '01712003344',
      reason: 'Stolen vehicle query',
      details: 'This registration docket matches my missing vehicle tracking index. Checking legal authorities.',
      timestamp: '2026-06-09T03:15:00Z',
      status: 'Pending',
      severity: 'high'
    },
    {
      id: 'rpt_3',
      listingId: 'car_3',
      listingTitle: 'Toyota Premio F EX 2017',
      reporterName: 'Tasnia Farin',
      reporterPhone: '01915994433',
      reason: 'Inaccurate Condition',
      details: 'Listed as fresh reconditioned but standard auction sheets show major chassis weld history.',
      timestamp: '2026-06-07T08:20:00Z',
      status: 'Resolved',
      severity: 'low'
    }
  ]);

  // Global Admin configs
  const [globalSettings, setGlobalSettings] = useState({
    maintenanceMode: false,
    autoApproveAds: false,
    spamThreshold: 75,
    checkedServiceFee: 650,
    systemAlerts: true
  });

  // State to manage edit form overlay modal
  const [editingListing, setEditingListing] = useState<VehicleListing | null>(null);
  
  // State to manage edit form overlay modal for ad slots
  const [editingAdSlot, setEditingAdSlot] = useState<AdvertisementSlot | null>(null);

  // Filtered listings list for directory search
  const filteredAdminListings = useMemo(() => {
    return listings.filter(item => {
      // Search text matches
      const text = adminSearch.toLowerCase();
      const matchesSearch = 
        item.title.toLowerCase().includes(text) ||
        item.brand.toLowerCase().includes(text) ||
        item.model.toLowerCase().includes(text) ||
        item.sellerName.toLowerCase().includes(text);

      if (!matchesSearch) return false;

      // Type Filter
      if (adminTypeFilter !== 'all' && item.type !== adminTypeFilter) return false;

      // Condition Filter
      if (adminConditionFilter !== 'all' && item.condition !== adminConditionFilter) return false;

      // Status Filter
      if (adminStatusFilter !== 'all' && item.status !== adminStatusFilter) return false;

      // Featured Filter
      if (adminFeaturedFilter === 'featured' && !item.isFeatured) return false;
      if (adminFeaturedFilter === 'standard' && item.isFeatured) return false;

      return true;
    });
  }, [listings, adminSearch, adminTypeFilter, adminConditionFilter, adminStatusFilter, adminFeaturedFilter]);

  // Moderation Controls on reports
  const handleResolveReport = (reportId: string, actionType: 'dismiss' | 'actioned') => {
    setReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return { ...r, status: actionType === 'dismiss' ? 'Resolved' : 'Actioned' };
      }
      return r;
    }));
    handleSimulateLog(`Report #${reportId} updated to ${actionType.toUpperCase()}`);
  };

  // Delete vehicle with local action tracking then upstream trigger
  const handleOnDeleteListingLocal = (id: string) => {
    if (confirm('Are you absolute sure you want to permanently delete this listing off Chaka index? This operation cannot be reversed.')) {
      if (onDeleteListing) {
        onDeleteListing(id);
      }
      handleSimulateLog(`Listing index identifier [${id}] permanently deleted.`);
    }
  };

  // Toggle Featured status
  const handleToggleFeaturedLocal = (item: VehicleListing) => {
    if (onUpdateListing) {
      const updated = { ...item, isFeatured: !item.isFeatured };
      onUpdateListing(updated);
      handleSimulateLog(`Listing [${item.id}] featured set to ${updated.isFeatured}`);
    }
  };

  // Handle edit form save
  const handleSaveListingEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingListing && onUpdateListing) {
      onUpdateListing(editingListing);
      handleSimulateLog(`Edited parameters of vehicle listing [${editingListing.id}] saved successfully.`);
      setEditingListing(null);
    }
  };

  // Update listing status
  const handleUpdateStatusLocal = (item: VehicleListing, newStatus: 'Approved' | 'Pending' | 'Rejected') => {
    if (onUpdateListing) {
      const updated = { ...item, status: newStatus };
      onUpdateListing(updated);
      handleSimulateLog(`Status of vehicle [${item.id}] changed to [${newStatus}]`);
      if (newStatus === 'Approved' && onApproveAd) {
        onApproveAd(item.id);
      } else if (newStatus === 'Rejected' && onRejectAd) {
        onRejectAd(item.id);
      }
    }
  };

  return (
    <div id="admin-panel-premium" className="space-y-6 select-none animate-fadeIn">
      
      {/* Premium Dashboard Frame Banner */}
      <div className={`p-6 rounded-2.5xl border relative overflow-hidden ${
        isDarkMode 
          ? 'bg-gradient-to-r from-orange-950/20 via-slate-900 to-slate-900 border-slate-800' 
          : 'bg-gradient-to-r from-orange-50/40 via-white to-white border-slate-200 shadow-md shadow-slate-100/40'
      }`}>
        <div className="absolute top-0 right-0 w-80 h-full bg-radial-gradient from-primary/10 to-transparent opacity-60 pointer-events-none" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 z-10 relative">
          <div className="flex items-center gap-3.5">
            <div className={`w-13 h-13 rounded-2xl flex items-center justify-center border ${
              isDarkMode ? 'bg-primary/10 border-primary/30 text-orange-400' : 'bg-orange-50 border-orange-100 text-primary'
            }`}>
              <Shield className="w-6.5 h-6.5 fill-current/15" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className={`text-lg md:text-xl font-black font-sans leading-tight ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>
                  Chaka BD Global Admin Console
                </h2>
                <span className="text-[9.5px] uppercase tracking-widest bg-rose-600 text-white font-heavy px-2 py-0.5 rounded-full font-sans">
                  Root Access
                </span>
              </div>
              <p className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
                <Database className="w-3.5 h-3.5 text-primary" /> System IP: <span className="font-mono text-slate-450">127.0.0.1 (Node Engine Port 3000)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefreshStats}
              title="Refresh System Health Parameters"
              className={`p-2.5 rounded-xl border flex items-center gap-2 text-xs font-bold transition-all hover:scale-103 active:scale-97 cursor-pointer ${
                isDarkMode 
                  ? 'bg-slate-950/80 hover:bg-slate-900 text-slate-350 border-slate-800' 
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200'
              }`}
            >
              <RefreshCw className="w-4 h-4 text-primary" />
              <span>Diagnostic Sync</span>
            </button>
            <span className={`bg-orange-500/10 text-primary dark:text-orange-400 text-[10px] font-extrabold px-3.5 py-2 rounded-xl uppercase tracking-widest border border-orange-500/25 flex items-center gap-1.5`}>
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              {listings.filter(l => l.status === 'Pending').length} Pending Audits
            </span>
          </div>
        </div>
      </div>

      {/* Analytics Insight Core Dashboard Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric Card - Site Hits */}
        <div className={`p-4.5 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-sans">Site Traffic Load</span>
              <Activity className="w-4 h-4 text-orange-500" />
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className={`text-xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>49,215</span>
              <span className="text-[10px] text-orange-500 font-extrabold">+14.2%</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[10px] text-slate-450 block mb-1">Simulated load distribution</span>
            <div className="w-full bg-slate-800 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-gradient-to-r from-orange-500 to-orange-400 h-full rounded-full" style={{ width: '74%' }} />
            </div>
          </div>
        </div>

        {/* Metric Card - Active Ads */}
        <div className={`p-4.5 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-sans">Active Listings</span>
              <Layers className="w-4 h-4 text-sky-500" />
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className={`text-xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>{listings.length} Ads</span>
              <span className="text-[10px] text-teal-500 font-extrabold">Online</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex justify-between text-[9px] text-slate-450 mb-1">
              <span>Approved: {listings.filter(l => l.status === 'Approved').length}</span>
              <span>Pending: {listings.filter(l => l.status === 'Pending').length}</span>
            </div>
            <div className="w-full bg-slate-800 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-primary h-full" style={{ width: `${(listings.filter(l => l.status === 'Approved').length / listings.length) * 100}%` }} />
              <div className="bg-amber-500 h-full" style={{ width: `${(listings.filter(l => l.status === 'Pending').length / listings.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Metric Card - Safety flags */}
        <div className={`p-4.5 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-sans">Safety Indexes</span>
              <ShieldAlert className="w-4 h-4 text-rose-500" />
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className={`text-xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>
                {reports.filter(r => r.status === 'Pending').length} Pending
              </span>
              <span className="text-[9.5px] bg-rose-500/10 text-rose-500 px-1.5 py-0.5 rounded font-bold uppercase">Critical</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[10px] text-slate-450 block mb-1">Resolution progress scale</span>
            <div className="w-full bg-slate-800 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden flex">
              <div className="bg-orange-500 h-full" style={{ width: `${(reports.filter(r => r.status === 'Resolved').length / reports.length) * 100}%` }} />
              <div className="bg-rose-500 h-full" style={{ width: `${(reports.filter(r => r.status === 'Pending').length / reports.length) * 100}%` }} />
            </div>
          </div>
        </div>

        {/* Metric Card - Ad click scale */}
        <div className={`p-4.5 rounded-2xl border flex flex-col justify-between relative overflow-hidden transition-all duration-300 hover:shadow-md ${
          isDarkMode ? 'bg-slate-900/40 border-slate-800/80 hover:border-slate-700' : 'bg-white border-slate-200 shadow-sm hover:border-slate-300'
        }`}>
          <div>
            <div className="flex items-center justify-between text-slate-400">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 font-sans">Partner Ads Tracker</span>
              <Landmark className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex items-baseline gap-1.5 mt-2">
              <span className={`text-xl font-black ${isDarkMode ? 'text-slate-100' : 'text-slate-950'}`}>BDT 19,480.00</span>
              <span className="text-[10px] text-amber-500 font-extrabold">Active</span>
            </div>
          </div>
          <div className="mt-4">
            <span className="text-[10px] text-slate-455 block truncate mb-1">CTR: 4.88% • Slots Online: {adSlots.filter(s => s.isActive).length} / {adSlots.length}</span>
            <div className="w-full bg-slate-800 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
              <div className="bg-[#f4b830] h-full rounded-full" style={{ width: '65%' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostic Cluster and Active Logs */}
      <div className={`p-4 rounded-2xl border ${
        isDarkMode ? 'bg-slate-950 border-slate-850' : 'bg-slate-50 border-slate-200 shadow-inner'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 text-primary rounded-xl shrink-0">
              <Terminal className="w-4.5 h-4.5 animate-pulse" />
            </div>
            <div>
              <span className="text-[9.5px] uppercase tracking-wider font-extrabold text-slate-500 block">Performance Core Info</span>
              <span className={`text-xs ml-0.5 font-bold font-mono ${isDarkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                CPU: {perfMetrics.cpu} | RAM: {perfMetrics.memory} | SOCKETS: {perfMetrics.connections} Active
              </span>
            </div>
          </div>

          {/* Audit trail preview ticker */}
          <div className="md:col-span-2">
            <div className={`p-2.5 rounded-xl text-[10.5px] font-mono flex items-center justify-between border ${
              isDarkMode ? 'bg-slate-900/60 border-slate-800/80 text-orange-500' : 'bg-white border-slate-150 text-slate-650'
            }`}>
              <div className="flex items-center gap-2 overflow-hidden truncate">
                <span className="bg-primary/10 text-primary font-black text-[8px] px-1.5 py-0.5 rounded tracking-wide uppercase">Audit Trial</span>
                <span className="truncate">{auditLogs[0] || 'Idle listening on system notifications.'}</span>
              </div>
              <span className="text-[8.5px] text-slate-400 select-none shrink-0 border-l pl-2 border-slate-800/20 lowercase">
                just now
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Segment Switcher Tabs */}
      <div className="flex border-b border-slate-800/10 dark:border-slate-800 gap-2.5 overflow-x-auto pb-1 select-none">
        <button
          onClick={() => setActiveAdminTab('listings')}
          className={`flex items-center gap-2 pb-2.5 pt-1 px-3 text-xs font-black tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
            activeAdminTab === 'listings' 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
          }`}
        >
          <Sliders className="w-4.5 h-4.5" />
          <span>Master Vehicle Directory ({listings.length})</span>
          {activeAdminTab === 'listings' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('reports')}
          className={`flex items-center gap-2 pb-2.5 pt-1 px-3 text-xs font-black tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
            activeAdminTab === 'reports' 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
          }`}
        >
          <Flag className="w-4.5 h-4.5" />
          <span>User Flagged Reports ({reports.length})</span>
          {reports.filter(r => r.status === 'Pending').length > 0 && (
            <span className="text-[8px] bg-rose-600 text-white px-2 py-0.5 font-bold rounded-full animate-bounce">
              {reports.filter(r => r.status === 'Pending').length}
            </span>
          )}
          {activeAdminTab === 'reports' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('ads')}
          className={`flex items-center gap-2 pb-2.5 pt-1 px-3 text-xs font-black tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
            activeAdminTab === 'ads' 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
          }`}
        >
          <Landmark className="w-4.5 h-4.5" />
          <span>Sponsored Ad slots</span>
          {activeAdminTab === 'ads' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveAdminTab('settings')}
          className={`flex items-center gap-2 pb-2.5 pt-1 px-3 text-xs font-black tracking-wider uppercase transition-all relative cursor-pointer shrink-0 ${
            activeAdminTab === 'settings' 
              ? 'text-primary' 
              : 'text-slate-500 hover:text-slate-700 dark:hover:text-slate-355'
          }`}
        >
          <Settings className="w-4.5 h-4.5" />
          <span>System Settings</span>
          {activeAdminTab === 'settings' && (
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* --- TAB CONTENT 1: MASTER VEHICLE DIRECTORY --- */}
      {activeAdminTab === 'listings' && (
        <div className="space-y-4">
          
          {/* Advanced Master Panel Filters bar */}
          <div className={`p-4 rounded-2xl border ${
            isDarkMode ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
              {/* Search input */}
              <div className="relative col-span-1 sm:col-span-2">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input 
                  type="text"
                  placeholder="Search listings by title, brand, model, seller or showroom..."
                  value={adminSearch}
                  onChange={(e) => setAdminSearch(e.target.value)}
                  className={`w-full text-xs font-semibold pl-9 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                    isDarkMode 
                      ? 'bg-slate-950/80 border-slate-800 text-slate-100 placeholder-slate-500' 
                      : 'bg-slate-50 border-slate-200 text-slate-900 placeholder-slate-400'
                  }`}
                />
              </div>

              {/* Status filter dropdown */}
              <div>
                <select
                  value={adminStatusFilter}
                  onChange={(e) => setAdminStatusFilter(e.target.value as any)}
                  className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                  }`}
                >
                  <option value="all">📁 All Audit Status</option>
                  <option value="Approved">🟢 Approved/Live</option>
                  <option value="Pending">🟡 Pending Review</option>
                  <option value="Rejected">🔴 Rejected/Suspended</option>
                </select>
              </div>

              {/* Condition Filter */}
              <div>
                <select
                  value={adminConditionFilter}
                  onChange={(e) => setAdminConditionFilter(e.target.value as any)}
                  className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                  }`}
                >
                  <option value="all">🚗 All Conditions</option>
                  <option value="New">New Models</option>
                  <option value="Used">Used Condition</option>
                  <option value="Reconditioned">Reconditioned</option>
                </select>
              </div>

              {/* Featured Filter */}
              <div>
                <select
                  value={adminFeaturedFilter}
                  onChange={(e) => setAdminFeaturedFilter(e.target.value as any)}
                  className={`w-full text-xs font-bold px-3 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-850'
                  }`}
                >
                  <option value="all">✨ Featured Selection</option>
                  <option value="featured">Pinned / Premium Ads</option>
                  <option value="standard">Standard Ads</option>
                </select>
              </div>
            </div>

            {/* Quick type chips */}
            <div className="flex flex-wrap items-center mt-3 gap-2 border-t pt-3 border-slate-800/10 dark:border-slate-800">
              <span className="text-[10px] font-extrabold uppercase text-slate-450 tracking-wider">Vehicle segment:</span>
              {(['all', 'car', 'bike', 'commercial', 'ev', 'parts', 'service'] as const).map(type => (
                <button
                  key={type}
                  onClick={() => setAdminTypeFilter(type)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-black capitalize tracking-wide transition-all cursor-pointer ${
                    adminTypeFilter === type
                      ? 'bg-primary text-white'
                      : isDarkMode 
                        ? 'bg-slate-950 text-slate-400 border border-slate-850 hover:bg-slate-900' 
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-150'
                  }`}
                >
                  {type === 'all' ? 'All Vehicles' : type}
                </button>
              ))}
            </div>
          </div>

          {/* Directory Listings Grid */}
          <div className={`border rounded-2.5xl overflow-hidden ${
            isDarkMode ? 'bg-slate-900/30 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[700px]">
                <thead className={`text-[10px] uppercase font-black tracking-widest border-b select-none select-none ${
                  isDarkMode ? 'bg-slate-950/80 border-slate-800 text-slate-500' : 'bg-slate-50 border-slate-200 text-slate-500'
                }`}>
                  <tr>
                    <th className="px-5 py-3">Vehicle / Listing Details</th>
                    <th className="px-5 py-3">Type / Condition</th>
                    <th className="px-5 py-3">Listing Owner</th>
                    <th className="px-5 py-3">Pricing (BDT)</th>
                    <th className="px-5 py-3">Site Status</th>
                    <th className="px-4 py-3 text-center">Core Moderation Controls</th>
                  </tr>
                </thead>
                <tbody className={`divide-y ${isDarkMode ? 'divide-slate-800/60' : 'divide-slate-100'}`}>
                  {filteredAdminListings.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="text-center py-12 text-slate-500">
                        <AlertCircle className="w-10 h-10 mx-auto opacity-30 text-amber-500 mb-2" />
                        <p className="font-bold text-slate-400 text-xs">No active listings match your administrative guidelines.</p>
                        <button 
                          onClick={() => { setAdminSearch(''); setAdminStatusFilter('all'); setAdminConditionFilter('all'); setAdminTypeFilter('all'); }}
                          className="mt-2 text-xs font-black text-primary hover:underline"
                        >
                          Reset Filters
                        </button>
                      </td>
                    </tr>
                  ) : (
                    filteredAdminListings.map(item => (
                      <tr key={item.id} className={`group transition-all ${
                        isDarkMode ? 'hover:bg-slate-900/30' : 'hover:bg-slate-50/50'
                      }`}>
                        {/* Vehicle Title & Info */}
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <img 
                              referrerPolicy="no-referrer"
                              src={item.images[0] || 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&q=80&w=150'} 
                              alt="car"
                              className="w-11 h-11 object-cover rounded-lg shrink-0 border border-slate-200/10 shadow-sm" 
                            />
                            <div className="min-w-0">
                              <div className="flex items-center gap-1.5 flex-wrap">
                                <h4 className={`font-black tracking-tight truncate max-w-[200px] leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`} title={item.title}>
                                  {item.title}
                                </h4>
                                {item.isFeatured && (
                                  <span className="bg-amber-505/10 text-amber-500 text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider animate-pulse border border-amber-500/20">
                                    Pin
                                  </span>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-450 mt-1 flex items-center gap-1">
                                <Calendar className="w-3 h-3 shrink-0" /> {item.year} • 
                                <MapPin className="w-3 h-3 shrink-0 text-slate-500" /> {item.location} ({item.division})
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Type & Condition */}
                        <td className="px-5 py-3 shrink-0">
                          <span className={`inline-block text-[9.5px] font-bold px-2 py-0.5 rounded-full capitalize border ${
                            isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-350' : 'bg-slate-50 border-slate-200 text-slate-700'
                          }`}>
                            {item.type}
                          </span>
                          <span className={`block text-[10px] mt-1 font-bold ${
                            item.condition === 'Reconditioned' 
                              ? 'text-orange-500' 
                              : item.condition === 'New' ? 'text-blue-500' : 'text-slate-500'
                          }`}>
                            {item.condition}
                          </span>
                        </td>

                        {/* User Seller */}
                        <td className="px-5 py-3">
                          <div className="text-[11px] font-black text-slate-700 dark:text-slate-300">
                            {item.showroomName || item.sellerName}
                          </div>
                          <span className="text-[9.5px] text-slate-500 block truncate max-w-[120px] font-mono select-all">
                            {item.sellerPhone}
                          </span>
                        </td>

                        {/* Price */}
                        <td className="px-5 py-3 font-black text-slate-900 dark:text-white">
                          {item.priceFormatted || `${item.price.toLocaleString()} BDT`}
                        </td>

                        {/* Site Status */}
                        <td className="px-5 py-3">
                          <select
                            value={item.status || 'Pending'}
                            onChange={(e) => handleUpdateStatusLocal(item, e.target.value as any)}
                            className={`text-[10.5px] font-black px-2 py-1 rounded-lg border focus:outline-none cursor-pointer ${
                              item.status === 'Approved' 
                                ? isDarkMode ? 'bg-orange-950/40 text-orange-400 border-orange-500/20' : 'bg-orange-50 text-orange-700 border-orange-200'
                                : item.status === 'Rejected'
                                  ? isDarkMode ? 'bg-rose-950/40 text-rose-450 border-rose-500/20' : 'bg-rose-50 text-rose-700 border-rose-200'
                                  : isDarkMode ? 'bg-amber-95/30 text-amber-500 border-amber-500/10' : 'bg-amber-50 text-amber-700 border-amber-200'
                            }`}
                          >
                            <option value="Approved">Live (Approved)</option>
                            <option value="Pending">Queue (Pending)</option>
                            <option value="Rejected">Suspended (Rejected)</option>
                          </select>
                        </td>

                        {/* Controls */}
                        <td className="px-4 py-3 select-none">
                          <div className="flex items-center justify-center gap-1.5">
                            
                            {/* Toggle Featured Status Pin */}
                            <button
                              onClick={() => handleToggleFeaturedLocal(item)}
                              title={item.isFeatured ? 'Demote from Featured Spot' : 'Feature Ad on Prime Slides'}
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                item.isFeatured 
                                  ? 'bg-[#f4b830]/20 border-[#f4b830] text-[#f4b830]' 
                                  : isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>

                            {/* Edit parameters button */}
                            <button
                              onClick={() => setEditingListing(item)}
                              title="Audit vehicle variables / Complete Edit"
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                              }`}
                            >
                              <Edit className="w-3.5 h-3.5" />
                            </button>

                            {/* Permanently delete listing */}
                            <button
                              onClick={() => handleOnDeleteListingLocal(item.id)}
                              title="Delete permanently from Database"
                              className={`p-1.5 rounded-lg border transition-colors cursor-pointer ${
                                isDarkMode ? 'bg-slate-950 border-slate-800 hover:border-rose-900 text-slate-400 hover:text-rose-500' : 'bg-white border-slate-201 text-slate-605 hover:bg-rose-50 hover:text-rose-600'
                              }`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination / Table footer */}
            <div className={`p-4 border-t text-[10.5px] font-black text-slate-500 flex justify-between items-center bg-slate-950/20 ${
              isDarkMode ? 'border-slate-800' : 'border-slate-200'
            }`}>
              <span>Showing {filteredAdminListings.length} of {listings.length} vehicle logs catalogued.</span>
              <span className="font-sans text-stone-400 italic">Security Checkpoint: Authorized audit trails verified.</span>
            </div>
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 2: USER COMPLAINTS / FLAG REPORTS --- */}
      {activeAdminTab === 'reports' && (
        <div className="space-y-4">
          
          <div className={`p-4.5 rounded-2.5xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-xs font-black uppercase tracking-wider text-primary flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-primary" /> Active Compliance Reports Queue
              </h3>
              <span className="text-[10px] text-slate-450 uppercase">Secured directly from customer report forms</span>
            </div>
            
            <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
              Users on Chaka.BD can flag listings if they suspect fake prices, stolen equipment, mislabeled auction sheets, or dent paint manipulations. Verify and action them accordingly below to keep our marketplace trustworthy.
            </p>

            <div className="space-y-4">
              {reports.map((report) => {
                // Find matching listing in systems if available
                const matchedLog = listings.find(l => l.id === report.listingId);
                
                return (
                  <div 
                    key={report.id}
                    className={`p-4.5 rounded-xl border relative transition-all duration-300 hover:scale-[1.005] ${
                      report.status === 'Resolved'
                        ? isDarkMode ? 'bg-slate-950/30 border-slate-900 opacity-70' : 'bg-slate-50/50 border-slate-150 opacity-70'
                        : report.severity === 'high' 
                          ? isDarkMode ? 'bg-rose-950/10 border-rose-900/60' : 'bg-rose-50/40 border-rose-200'
                          : isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-2.5">
                      <div className="flex items-center gap-2 flex-wrap text-xs">
                        <span className={`text-[8.5px] uppercase font-black px-2 py-0.5 rounded tracking-wide ${
                          report.severity === 'high' 
                            ? 'bg-rose-600 text-white animate-pulse' 
                            : report.severity === 'medium' ? 'bg-amber-600 text-white' : 'bg-slate-550 text-white'
                        }`}>
                          {report.severity} severity
                        </span>
                        
                        <h4 className={`font-black uppercase tracking-tight font-sans ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>
                          {report.reason}
                        </h4>
                        <span className="text-slate-500 font-bold">• REPORT ID: #{report.id}</span>
                      </div>

                      <span className="text-[10px] text-slate-500 font-mono">
                        {new Date(report.timestamp).toLocaleString()}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4.5 pt-1 border-t border-dashed border-slate-800/10 dark:border-slate-800">
                      {/* Report descriptions */}
                      <div className="col-span-2 space-y-2">
                        <p className={`text-[11px] leading-relaxed italic p-2.5 rounded-lg font-medium border ${
                          isDarkMode ? 'bg-slate-900 text-slate-300 border-slate-800' : 'bg-slate-50 text-slate-700 border-slate-200'
                        }`}>
                          "{report.details}"
                        </p>

                        <div className="flex gap-4 text-[10px] text-slate-450">
                          <span>👤 Reporter: <strong>{report.reporterName}</strong></span>
                          <span>📞 Phone: <strong className="select-all">{report.reporterPhone}</strong></span>
                        </div>
                      </div>

                      {/* Associated Listing summary */}
                      <div className={`p-3 rounded-lg border flex flex-col justify-between ${
                        isDarkMode ? 'bg-slate-900/50 border-slate-800' : 'bg-slate-50/50 border-slate-200'
                      }`}>
                        <div>
                          <span className="text-[9px] font-black text-rose-500 block uppercase mb-1">Target vehicle log</span>
                          {matchedLog ? (
                            <>
                              <h5 className={`font-black text-xs truncate ${isDarkMode ? 'text-slate-200' : 'text-slate-855'}`}>{matchedLog.title}</h5>
                              <p className="text-[10px] text-slate-500 my-0.5">Seller: {matchedLog.sellerName} ({matchedLog.sellerType})</p>
                              <span className={`inline-block text-[9px] px-1.5 py-0.2 rounded font-mono font-bold mt-1 ${
                                matchedLog.status === 'Approved' ? 'text-orange-500' : 'text-amber-500'
                              }`}>
                                current status: {matchedLog.status}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs text-rose-500 italic block">Listing with ID [{report.listingId}] has been deleted off Chaka.</span>
                          )}
                        </div>

                        {/* Mod buttons for linking straight to list */}
                        {matchedLog && (
                          <button
                            onClick={() => {
                              setAdminSearch(matchedLog.title);
                              setActiveAdminTab('listings');
                            }}
                            className="mt-3 text-[10px] font-heavy px-2 py-1 bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors w-full"
                          >
                            Locate listing entry
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Execution Controls for Report */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 mt-3.5 border-t border-slate-800/10 dark:border-slate-800">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-450 font-bold">Resolution State:</span>
                        <strong className={`text-[10px] uppercase ${
                          report.status === 'Pending' ? 'text-rose-500 animate-pulse' : 'text-orange-500'
                        }`}>
                          {report.status}
                        </strong>
                      </div>

                      {report.status === 'Pending' ? (
                        <div className="flex gap-2.5">
                          <button
                            onClick={() => handleResolveReport(report.id, 'dismiss')}
                            className="inline-flex items-center gap-1.5 text-[10px] font-black px-3.5 py-1.5 bg-primary/10 text-primary hover:bg-primary/20 transition-all rounded-lg cursor-pointer"
                          >
                            <Check className="w-3.5 h-3.5" /> Dismiss Complaints
                          </button>

                          {matchedLog && (
                            <button
                              onClick={() => {
                                handleUpdateStatusLocal(matchedLog, 'Rejected');
                                handleResolveReport(report.id, 'actioned');
                              }}
                              className="inline-flex items-center gap-1.5 text-[10px] font-black px-3.5 py-1.5 bg-rose-600 text-white hover:bg-rose-500 transition-all rounded-lg cursor-pointer shadow-red-950/10 shadow-sm"
                            >
                              <AlertTriangle className="w-3.5 h-3.5" /> Suspend Listing
                            </button>
                          )}
                        </div>
                      ) : (
                        <span className="text-[10.5px] font-bold text-slate-500">Report audit completed and signed off.</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* --- TAB CONTENT 3: SPONSORED AD SPOT BANNER --- */}
      {activeAdminTab === 'ads' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Ad Placements List */}
            <div className="lg:col-span-3 space-y-4">
              <div className={`p-5 rounded-2.5xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className="flex justify-between items-center mb-4 border-b pb-3 dark:border-slate-800">
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider flex items-center gap-1.5 text-primary">
                      <Landmark className="w-4 h-4 text-amber-500" /> Active Site Ad Placements
                    </h3>
                    <p className="text-[10px] text-slate-500 mt-1">Configure and load ad campaigns across the main web frames.</p>
                  </div>
                  <span className="text-[10.5px] px-2.5 py-1 bg-primary/10 text-primary font-black rounded-lg">
                    {adSlots.length} Registered Slots
                  </span>
                </div>

                <div className="space-y-3.5">
                  {adSlots.map((ad) => (
                    <div 
                      key={ad.id}
                      className={`p-4 rounded-xl border transition-all ${
                        editingAdSlot?.id === ad.id
                          ? 'border-primary bg-primary/5'
                          : isDarkMode ? 'bg-slate-950 border-slate-900 hover:border-slate-800' : 'bg-white border-slate-200 shadow-sm hover:border-slate-350'
                      }`}
                    >
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <div className="min-w-0 flex items-start gap-3">
                          <div className="p-2 bg-amber-500/10 text-[#f4b830] rounded-lg shrink-0 mt-0.5">
                            <Percent className="w-4.5 h-4.5" />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <h5 className={`font-black uppercase tracking-wide leading-tight text-xs ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                                {ad.title || 'Untitled Banner Campaign'}
                              </h5>
                              <span className="bg-slate-800 text-[8.5px] font-mono font-black text-slate-400 px-1.5 py-0.2 rounded uppercase">
                                {ad.placement}
                              </span>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium line-clamp-1 mt-1">
                              {ad.description || 'No description configured for this placement slot.'}
                            </p>
                            <p className="text-[9.5px] text-slate-400 mt-1 font-mono">
                              Redirect: <span className="text-sky-500 truncate inline-block max-w-[200px] align-bottom select-all">{ad.targetUrl}</span>
                            </p>
                          </div>
                        </div>

                        <div className="flex sm:flex-col items-end gap-3 justify-between sm:justify-start border-t sm:border-0 pt-2 sm:pt-0 border-slate-800">
                          {/* Active / Offline Switch */}
                          <div className="flex items-center gap-3.5 select-none">
                            <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded font-mono ${
                              ad.isActive ? 'text-orange-500 bg-orange-500/10' : 'text-slate-500 bg-slate-500/10'
                            }`}>
                              {ad.isActive ? 'Active' : 'Offline'}
                            </span>
                            <button
                              onClick={() => {
                                onToggleAdSlot(ad.id);
                                handleSimulateLog(`Campain banner ad slot [${ad.id}] status toggled.`);
                              }}
                              className="flex items-center focus:outline-none cursor-pointer"
                              title={ad.isActive ? 'Deactivate Spot' : 'Activate Spot'}
                            >
                              <div className={`relative w-11 h-6 rounded-full transition-colors duration-300 ease-in-out p-1 ${
                                ad.isActive 
                                  ? 'bg-gradient-to-r from-amber-500 to-primary' 
                                  : isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                              }`}>
                                <div className={`w-4 h-4 bg-white rounded-full transition-transform duration-300 ease-in-out shadow ${
                                  ad.isActive ? 'translate-x-5' : 'translate-x-0'
                                }`} />
                              </div>
                            </button>
                          </div>

                          {/* Trigger manual fields modifier */}
                          <button
                            onClick={() => {
                              setEditingAdSlot(ad);
                              handleSimulateLog(`Ad slot editing frame opened for campaign [${ad.id}].`);
                            }}
                            className={`text-[10px] font-black px-3.5 py-1.5 rounded-lg border transition-all cursor-pointer ${
                              editingAdSlot?.id === ad.id
                                ? 'bg-primary border-primary text-white'
                                : isDarkMode
                                  ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300 hover:text-white'
                                  : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 shadow-xs'
                            }`}
                          >
                            Configure Campaign
                          </button>
                        </div>
                      </div>

                      {/* Display image thumbnail if exists */}
                      {ad.imageUrl && (
                        <div className="mt-3.5 flex items-center gap-3 bg-slate-950/20 dark:bg-slate-950/40 p-2 rounded-lg border dark:border-slate-920">
                          <img 
                            referrerPolicy="no-referrer"
                            src={ad.imageUrl} 
                            alt="thumb" 
                            className="w-12 h-9 object-cover rounded border border-slate-700/15"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="text-[8.5px] font-black text-rose-500 uppercase block">Configured Banner Asset URL</span>
                            <span className="text-[9.5px] font-mono text-slate-450 block truncate select-all">{ad.imageUrl}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Campaign Variables & Custom Image Uploader Panel */}
            <div className="lg:col-span-2 space-y-4">
              
              {/* Variable Modifier Form */}
              {editingAdSlot ? (
                <div className={`p-5 rounded-2.5xl border ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                  <div className="flex justify-between items-center mb-4 border-b pb-3 dark:border-slate-800">
                    <div>
                      <h4 className="text-xs font-black uppercase text-amber-500">Campaign Editor</h4>
                      <p className="text-[9px] text-slate-500 mt-0.5">Custom variables for <strong className="font-mono text-primary">{editingAdSlot.placement}</strong></p>
                    </div>
                    <button
                      onClick={() => setEditingAdSlot(null)}
                      className="text-[10px] text-slate-400 hover:text-white px-2 py-1 rounded bg-slate-800 hover:bg-slate-755 font-bold"
                    >
                      Close Card
                    </button>
                  </div>

                  <form onSubmit={(e) => {
                    e.preventDefault();
                    if (onUpdateAdSlot) {
                      onUpdateAdSlot(editingAdSlot);
                      handleSimulateLog(`Custom parameters and campaign details updated on ad slot [${editingAdSlot.id}].`);
                      setEditingAdSlot(null);
                    }
                  }} className="space-y-4">
                    {/* Variable 1: Banner Title */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-450 block mb-1">Ad Title / Campaign Banner Slogan</label>
                      <input 
                        type="text"
                        value={editingAdSlot.title}
                        onChange={(e) => setEditingAdSlot({...editingAdSlot, title: e.target.value})}
                        className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        placeholder="e.g. Premium Auto Accessories Discount"
                        required
                      />
                    </div>

                    {/* Variable 2: ad description */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-450 block mb-1">Ad Description / Custom Sub-text</label>
                      <textarea 
                        rows={2}
                        value={editingAdSlot.description}
                        onChange={(e) => setEditingAdSlot({...editingAdSlot, description: e.target.value})}
                        className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        placeholder="e.g. Get up to 35% discount on reconditioned spares, Japanese lubricants and genuine detailing kits for all Toyota car models."
                        required
                      />
                    </div>

                    {/* Variable 3: Image URL config with preset buttons */}
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-450 block">Loaded Campaign Banner Image Path (URL)</label>
                      <input 
                        type="url"
                        value={editingAdSlot.imageUrl}
                        onChange={(e) => setEditingAdSlot({...editingAdSlot, imageUrl: e.target.value})}
                        className={`w-full text-xs font-mono px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        placeholder="e.g. https://images.unsplash.com/..."
                        required
                      />

                      {/* Hot swap quick presets image database */}
                      <div>
                        <span className="text-[8.5px] font-black text-slate-500 uppercase block mb-1.5">1-Click Premium Banner Preset Images:</span>
                        <div className="grid grid-cols-4 gap-2">
                          {[
                            { name: 'SUV Carbon', url: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=350' },
                            { name: 'Red Sedan', url: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=350' },
                            { name: 'Sports Bike', url: 'https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&q=80&w=350' },
                            { name: 'EV Supercharger', url: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=350' }
                          ].map((preset, pIdx) => (
                            <button
                              type="button"
                              key={pIdx}
                              onClick={() => {
                                setEditingAdSlot({...editingAdSlot, imageUrl: preset.url});
                                handleSimulateLog(`Banner preset "${preset.name}" hot-swapped into editor.`);
                              }}
                              className={`p-1 rounded border overflow-hidden hover:opacity-100 cursor-pointer transition-all ${
                                editingAdSlot.imageUrl === preset.url 
                                  ? 'border-primary opacity-100 scale-102 bg-primary/10' 
                                  : 'border-slate-800 opacity-60 hover:border-slate-500'
                              }`}
                              title={preset.name}
                            >
                              <img src={preset.url} alt="preset" className="w-full h-8 object-cover rounded" />
                              <span className="text-[7.5px] font-bold block truncate text-center mt-0.5 text-slate-400">{preset.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Variable 4: Action Redirect URL */}
                    <div>
                      <label className="text-[9px] font-black uppercase tracking-wider text-slate-450 block mb-1">Click Destination URL / Call Phone Number</label>
                      <input 
                        type="text"
                        value={editingAdSlot.targetUrl}
                        onChange={(e) => setEditingAdSlot({...editingAdSlot, targetUrl: e.target.value})}
                        className={`w-full text-xs font-semibold px-3 py-2 rounded-lg border focus:outline-none focus:ring-1 focus:ring-primary ${
                          isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200 text-slate-900'
                        }`}
                        placeholder="e.g. tel:01319075810, or https://chaka.bd/promo"
                        required
                      />
                    </div>

                    {/* Submit panel */}
                    <div className="flex gap-2.5 pt-2">
                      <button
                        type="submit"
                        className="flex-1 bg-primary hover:bg-primary-hover text-white text-xs font-black py-2.5 px-4 rounded-xl transition-all cursor-pointer shadow-md shadow-orange-500/5 hover:-translate-y-0.5"
                      >
                        Push Changes Live
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingAdSlot(null);
                          handleSimulateLog(`Ad slot editor cancelled.`);
                        }}
                        className={`text-xs font-black py-2.5 px-4 rounded-xl transition-all border cursor-pointer ${
                          isDarkMode ? 'bg-slate-905 hover:bg-slate-800 border-slate-800 text-slate-300' : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className={`p-5 rounded-2.5xl border ${isDarkMode ? 'bg-slate-900/10 border-slate-800/60' : 'bg-slate-50 border-slate-200 shadow-sm'} text-center py-10`}>
                  <Percent className="w-10 h-10 mx-auto opacity-30 text-amber-500 mb-2.5" />
                  <h4 className={`text-xs font-black uppercase ${isDarkMode ? 'text-slate-300' : 'text-slate-700'}`}>No Active Campaign Selected</h4>
                  <p className="text-[10.5px] text-slate-500 leading-relaxed max-w-sm mx-auto mt-1.5">
                    Click "Configure Campaign" on any registered ad slot to live modify the banner assets, loaded Unsplash images, call targets, and push changes dynamically to Chaka.BD.
                  </p>
                </div>
              )}

              {/* Dynamic Preview Box */}
              <div className={`p-5 rounded-2.5xl border ${isDarkMode ? 'bg-[#017a52]/10 border-orange-800' : 'bg-orange-50/20 border-orange-100 shadow-xs'}`}>
                <h4 className="text-xs font-black uppercase text-[#019463] mb-1">Simulated Live Workspace Preview</h4>
                <p className="text-[10px] text-slate-500 mb-3 block">
                  See how current variable values looks directly on customers viewports:
                </p>

                {editingAdSlot ? (
                  <div className={`border rounded-xl overflow-hidden p-3.5 ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-slate-200 shadow-sm'} space-y-2.5`}>
                    <div className="flex justify-between items-center text-[9px] border-b pb-1.5 dark:border-slate-900 font-extrabold text-slate-500 uppercase tracking-wide">
                      <span>Placement: {editingAdSlot.placement}</span>
                      <span className="text-rose-500">AdX Sandbox</span>
                    </div>

                    <div className="flex gap-3">
                      {editingAdSlot.imageUrl && (
                        <img 
                          referrerPolicy="no-referrer"
                          src={editingAdSlot.imageUrl} 
                          alt="preview" 
                          className="w-16 h-12 object-cover rounded border dark:border-slate-800"
                        />
                      )}
                      <div className="min-w-0">
                        <h5 className={`font-black text-xs truncate ${isDarkMode ? 'text-slate-100' : 'text-slate-900'}`}>{editingAdSlot.title || 'Untitled Campaign'}</h5>
                        <p className="text-[10px] text-slate-400 line-clamp-2 leading-tight mt-0.5">{editingAdSlot.description || 'No campaign descriptions loaded.'}</p>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1.5 border-t dark:border-slate-900">
                      <span>CTR Target: 1.25%</span>
                      <span className="text-primary">Onclick: {editingAdSlot.targetUrl || 'none'}</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 bg-[#019463] text-white rounded-xl relative overflow-hidden flex flex-col justify-between min-h-[95px] shadow-sm shadow-[#019463]/18">
                    <div className="absolute -top-6 left-[35%] w-16 h-10 bg-[#f4b830] opacity-95 rounded-full pointer-events-none" />
                    <div className="absolute -bottom-8 -right-4 w-28 h-16 bg-[#f4b830] rounded-full pointer-events-none" />
                    
                    <div className="z-10">
                      <h5 className="font-extrabold text-[12px] uppercase tracking-wide leading-none">বিজ্ঞাপন দেয়ার জন্য যোগাযোগ</h5>
                      <p className="text-[8.5px] text-orange-100/90 mt-1">হাজারো ক্রেতার সামনে তুলুন আপনার বিজ্ঞাপন</p>
                    </div>
                    
                    <div className="flex justify-between items-end z-10 pt-2 border-t border-orange-500/10 mt-1.5">
                      <span className="font-heavy text-[12.5px] tracking-tight text-white flex items-center gap-1.5">
                        📞 01319075810
                      </span>
                      <span className="text-[7.5px] bg-[#f4b830] text-slate-900 font-extrabold px-1.5 py-0.5 rounded uppercase">Default Ad</span>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* --- TAB CONTENT 4: GLOBAL SYSTEM CONTROL SETTINGS --- */}
      {activeAdminTab === 'settings' && (
        <div className="space-y-4">
          <div className={`p-5 rounded-2.5xl border ${isDarkMode ? 'bg-slate-900/40 border-slate-800' : 'bg-white border-slate-200'}`}>
            <h3 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-1.5 text-stone-300 dark:text-stone-100">
              <Settings className="w-4.5 h-4.5 text-amber-505" /> General Platform Behavior Rules
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-6 border-b border-slate-800/10 dark:border-slate-800">
              
              {/* Settings Toggle Sliders */}
              <div className="space-y-4">
                {/* Switch 1: Maintenance lock */}
                <div className="flex justify-between items-center text-xs py-1 border-b pb-3 dark:border-slate-800">
                  <div>
                    <h5 className={`font-black font-sans leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      Platform Maintenance Lock (গর্ভনমেন্ট রেস্ট্রিকশন)
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1">Locks site features, allowing only administrative access audits.</p>
                  </div>
                  <button
                    onClick={() => {
                      setGlobalSettings(e => ({ ...e, maintenanceMode: !e.maintenanceMode }));
                      handleSimulateLog(`Maintenance mode variable toggled to ${!globalSettings.maintenanceMode}`);
                    }}
                    className="flex items-center cursor-pointer ml-3 shift-y-1 select-none"
                  >
                    <div className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 ease-in-out p-1 ${
                      globalSettings.maintenanceMode 
                        ? 'bg-rose-500 ring-1 ring-rose-500/20' 
                        : isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                    }`}>
                      <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ease-in-out shadow ${
                        globalSettings.maintenanceMode ? 'translate-x-5.5' : 'translate-x-0'
                      }`} />
                    </div>
                  </button>
                </div>

                {/* Switch 2: Auto approve */}
                <div className="flex justify-between items-center text-xs py-1 border-b pb-3 dark:border-slate-800">
                  <div>
                    <h5 className={`font-black font-sans leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      Auto-Approve User Vehicle Ads
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1">If enabled, new posts instantly go live without the pending queue.</p>
                  </div>
                  <button
                    onClick={() => {
                      setGlobalSettings(e => ({ ...e, autoApproveAds: !e.autoApproveAds }));
                      handleSimulateLog(`Auto approve ads toggled to ${!globalSettings.autoApproveAds}`);
                    }}
                    className="flex items-center cursor-pointer ml-3 shift-y-1 select-none"
                  >
                    <div className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 ease-in-out p-1 ${
                      globalSettings.autoApproveAds 
                        ? 'bg-primary' 
                        : isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                    }`}>
                      <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ease-in-out shadow-md ${
                        globalSettings.autoApproveAds ? 'translate-x-5.5' : 'translate-x-0'
                      }`} />
                    </div>
                  </button>
                </div>

                {/* Switch 3: Enable alerts */}
                <div className="flex justify-between items-center text-xs pb-1 select-none">
                  <div>
                    <h5 className={`font-black font-sans leading-tight ${isDarkMode ? 'text-slate-100' : 'text-slate-800'}`}>
                      Send Automated Alerts on Flagged Reports
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-1">Notifies staff and email indexes on high severity complaints.</p>
                  </div>
                  <button
                    onClick={() => {
                      setGlobalSettings(e => ({ ...e, systemAlerts: !e.systemAlerts }));
                      handleSimulateLog(`System alerts setting toggled to ${!globalSettings.systemAlerts}`);
                    }}
                    className="flex items-center cursor-pointer ml-3 shift-y-1"
                  >
                    <div className={`relative w-12 h-6.5 rounded-full transition-colors duration-300 ease-in-out p-1 ${
                      globalSettings.systemAlerts 
                        ? 'bg-primary' 
                        : isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
                    }`}>
                      <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-300 ease-in-out shadow-md ${
                        globalSettings.systemAlerts ? 'translate-x-5.5' : 'translate-x-0'
                      }`} />
                    </div>
                  </button>
                </div>
              </div>

              {/* Settings parameters inputs */}
              <div className="space-y-4">
                {/* Numeric Input: Verification Checked service charge */}
                <div className="space-y-1">
                  <label className="text-[10.5px] font-black uppercase text-slate-450 tracking-wider">
                    Showroom Verified Service Charge (BDT)
                  </label>
                  <div className="relative">
                    <span className="text-xs font-black text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2">BDT</span>
                    <input 
                      type="number"
                      value={globalSettings.checkedServiceFee}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setGlobalSettings(prev => ({ ...prev, checkedServiceFee: val }));
                        handleSimulateLog(`Service charge edited to ${val} BDT`);
                      }}
                      className={`w-full text-xs font-bold pl-12 pr-4 py-2.5 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                        isDarkMode ? 'bg-slate-950 border-slate-800 text-slate-100' : 'bg-slate-50 border-slate-200'
                      }`} 
                    />
                  </div>
                  <span className="text-[9px] text-slate-500 block">The tariff charged to showrooms for verifying physical papers.</span>
                </div>

                {/* Range Slider spam threshold */}
                <div className="space-y-1 pb-3">
                  <div className="flex justify-between items-center text-[10.5px] font-black text-slate-500 uppercase tracking-wider">
                    <span>Audit Spam Filter Weight</span>
                    <span className="text-primary font-black text-xs font-mono">{globalSettings.spamThreshold}%</span>
                  </div>
                  <input 
                    type="range"
                    min="10"
                    max="100"
                    value={globalSettings.spamThreshold}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setGlobalSettings(prev => ({ ...prev, spamThreshold: val }));
                    }}
                    className="w-full text-primary bg-slate-800 h-1.5 rounded-lg cursor-pointer" 
                  />
                  <span className="text-[9px] text-slate-500 block">AI probability calculation weight to auto-flag suspicious description terms.</span>
                </div>
              </div>
            </div>

            {/* Super Admin Diagnostics & Event Simulators panel */}
            <div className="mt-8 pt-6 border-t border-slate-800/10 dark:border-slate-850">
              <h3 className="text-xs font-black uppercase tracking-wider mb-4 flex items-center gap-1.5 text-stone-300 dark:text-stone-100">
                <Terminal className="w-4.5 h-4.5 text-orange-500 animate-pulse" /> Super Admin Diagnostics & Event Simulators
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Simulator Action Knobs */}
                <div className="md:col-span-1 space-y-3.5">
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Trigger Simulated Activities</span>
                  
                  <button
                    onClick={() => {
                      const id = Math.floor(Math.random() * 900 + 100);
                      const complaintsList = [
                        { buyer: 'Rahat Islam', reason: 'Odometer altered', details: 'Claimed odometer is 42,000 km, but on OBD-scanner analysis, odometer showed 124,000 km' },
                        { buyer: 'Samiya Sultana', reason: 'Chassis rust covered', details: 'Fresh body wash applied but chassis mounts have deep structural oxidation' },
                        { buyer: 'Mashrafe Bin', reason: 'Missing documents', details: 'Seller does not hold authentic tax token sheets and requested money first' }
                      ];
                      const comp = complaintsList[Math.floor(Math.random() * complaintsList.length)];
                      const newRpt: ListedReport = {
                        id: `rpt_${id}`,
                        listingId: `car_${Math.floor(Math.random() * 5 + 1)}`,
                        listingTitle: 'Toyota / Honda Premium Verified',
                        reporterName: comp.buyer,
                        reporterPhone: `01712${Math.floor(Math.random() * 900000 + 100000)}`,
                        reason: comp.reason,
                        details: comp.details,
                        timestamp: new Date().toISOString(),
                        status: 'Pending',
                        severity: Math.random() > 0.5 ? 'high' : 'medium'
                      };
                      setReports(prev => [newRpt, ...prev]);
                      handleSimulateLog(`⚠️ Alert generated: Simulated report of ${comp.reason} by ${comp.buyer} logged.`);
                    }}
                    className="w-full text-left text-[11px] font-bold p-3 rounded-xl border border-rose-500/10 bg-rose-500/5 hover:bg-rose-500/10 text-rose-500 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>⚠️ Simul. Compliance Report</span>
                    <span className="text-[9px] bg-rose-500/10 px-1 rounded uppercase font-mono">Run</span>
                  </button>

                  <button
                    onClick={() => {
                      handleSimulateLog(`🔍 SEO Crawler sweep: Indexed 24 new car model variants from Dhaka & Chittagong showrooms.`);
                    }}
                    className="w-full text-left text-[11px] font-bold p-3 rounded-xl border border-sky-500/10 bg-sky-500/5 hover:bg-sky-500/10 text-sky-400 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>🔍 Run SEO Indexes Crawler</span>
                    <span className="text-[9px] bg-sky-500/10 px-1 rounded uppercase font-mono">Run</span>
                  </button>

                  <button
                    onClick={() => {
                      const uptime = (Math.random() * 10 + 90).toFixed(2);
                      handleSimulateLog(`♻️ Memory Sweeper completed. Freed 142MB heap leakage. Server health: ${uptime}% optimal.`);
                    }}
                    className="w-full text-left text-[11px] font-bold p-3 rounded-xl border border-orange-500/10 bg-primary/5 hover:bg-primary/10 text-orange-400 transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>♻️ Run Garbage Collector Sweep</span>
                    <span className="text-[9px] bg-orange-500/10 px-1 rounded uppercase font-mono">Run</span>
                  </button>
                </div>

                {/* Audit Console Terminal */}
                <div className="md:col-span-2 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-wider block">Live Audit Trial logs terminal</span>
                    <button
                      onClick={() => {
                        setAuditLogs([`[${new Date().toLocaleTimeString()}] Diagnostics terminal log stack flushed.`]);
                      }}
                      className="text-[9px] font-heavy text-primary bg-primary/10 hover:bg-primary/20 px-2 py-0.5 rounded cursor-pointer"
                    >
                      Clear Logs
                    </button>
                  </div>
                  
                  <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 font-mono text-[10px] text-orange-400 space-y-2 max-h-[160px] overflow-y-auto shadow-inner selection:bg-orange-500/30">
                    <div className="text-slate-500 text-[9.5px] border-b border-slate-900 pb-1.5 flex justify-between">
                      <span>CHAKA_BD CENTRAL ENGINE // VERSION 2.8.5</span>
                      <span>STATUS: ONLINE</span>
                    </div>
                    {auditLogs.map((logStr, lIdx) => (
                      <div key={lIdx} className="flex gap-2">
                        <span className="text-slate-600 select-none">[{auditLogs.length - lIdx}]</span>
                        <span className="break-all">{logStr}</span>
                      </div>
                    ))}
                    {auditLogs.length === 0 && (
                      <div className="text-slate-600 text-center py-4">Logs stack is empty. Trigger simulated activities above.</div>
                    )}
                  </div>
                </div>

              </div>
            </div>

            {/* Quick config reset actions */}
            <div className="flex justify-between items-center pt-6 mt-6 border-t dark:border-slate-800">
              <span className="text-[10px] text-slate-500 italic block">Platform configurations are persisted runtime in root session store.</span>
              <button
                onClick={() => {
                  setGlobalSettings({
                    maintenanceMode: false,
                    autoApproveAds: false,
                    spamThreshold: 75,
                    checkedServiceFee: 650,
                    systemAlerts: true
                  });
                  handleSimulateLog('Platform configurations reset to default safe parameters.');
                }}
                className="text-[11px] font-black tracking-wide bg-rose-600 hover:bg-rose-500 transition-colors text-white px-3.5 py-1.5 rounded-xl flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <FolderLock className="w-3.5 h-3.5" /> Revert Configs
              </button>
            </div>
          </div>
        </div>
      )}

      {/* --- FLOATING DETAILED EDIT FORM OVERLAY MODAL --- */}
      {editingListing && (
        <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4 select-none">
          <div 
            className={`w-full max-w-2xl rounded-2.5xl shadow-2xl border flex flex-col max-h-[85vh] overflow-hidden animate-slideUp ${
              isDarkMode ? 'bg-slate-900 border-slate-800 text-slate-100' : 'bg-white border-slate-200 text-slate-800'
            }`}
          >
            {/* Modal Header */}
            <div className={`p-4.5 border-b flex items-center justify-between shrink-0 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <div className="flex items-center gap-2.5">
                <div className="w-8.5 h-8.5 rounded-full bg-primary/10 text-primary flex items-center justify-center">
                  <Edit className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-sans font-black text-[13.5px] leading-tight">
                    Audit Vehicle Parameter Logs
                  </h3>
                  <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">Listing Index Reference: {editingListing.id}</span>
                </div>
              </div>

              <button
                onClick={() => setEditingListing(null)}
                className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-slate-800/10 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Form body */}
            <form onSubmit={handleSaveListingEdit} className="overflow-y-auto p-5 space-y-4">
              {/* Alert message */}
              <div className="p-3.5 rounded-xl bg-primary/10 border border-primary/20 text-[11px] text-primary leading-relaxed font-bold flex items-center gap-2">
                <AlertCircle className="w-4.5 h-4.5 text-primary shrink-0" />
                <span>As a root moderator, saving modifications will instantly publish changes live across standard user browse indexes. Double-check price and mileage parameters.</span>
              </div>

              {/* Title parameter */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Vehicle Title (Bengali/English Mixed)</label>
                <input 
                  type="text" 
                  required
                  value={editingListing.title}
                  onChange={(e) => setEditingListing({ ...editingListing, title: e.target.value })}
                  className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                  }`}
                />
              </div>

              {/* Brand and Model Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Brand Maker</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.brand}
                    onChange={(e) => setEditingListing({ ...editingListing, brand: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Vehicle Model Name</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.model}
                    onChange={(e) => setEditingListing({ ...editingListing, model: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Year and Condition */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Model Year</label>
                  <input 
                    type="number" 
                    required
                    value={editingListing.year}
                    onChange={(e) => setEditingListing({ ...editingListing, year: Number(e.target.value) })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Condition</label>
                  <select
                    value={editingListing.condition}
                    onChange={(e) => setEditingListing({ ...editingListing, condition: e.target.value as any })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="New">New</option>
                    <option value="Used">Used</option>
                    <option value="Reconditioned">Reconditioned</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Fuel Engine Type</label>
                  <select
                    value={editingListing.fuelType}
                    onChange={(e) => setEditingListing({ ...editingListing, fuelType: e.target.value as any })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary cursor-pointer ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  >
                    <option value="Octane">Octane</option>
                    <option value="Petrol">Petrol</option>
                    <option value="Diesel">Diesel</option>
                    <option value="CNG">CNG</option>
                    <option value="LPG">LPG</option>
                    <option value="Hybrid">Hybrid</option>
                    <option value="Electric">Electric</option>
                  </select>
                </div>
              </div>

              {/* Price and Format Tag Row */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Pricing In Taka (BDT)</label>
                  <input 
                    type="number" 
                    required
                    value={editingListing.price}
                    onChange={(e) => setEditingListing({ ...editingListing, price: Number(e.target.value) })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Formatted Price Label (e.g. BDT 2,650,000)</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.priceFormatted}
                    onChange={(e) => setEditingListing({ ...editingListing, priceFormatted: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-primary'
                    }`}
                  />
                </div>
              </div>

              {/* Mileage and Engine capacity */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Mileage Record (KM)</label>
                  <input 
                    type="number" 
                    required
                    value={editingListing.mileage}
                    onChange={(e) => setEditingListing({ ...editingListing, mileage: Number(e.target.value) })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Engine displacement/Capacity (cc)</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.engineCapacity}
                    onChange={(e) => setEditingListing({ ...editingListing, engineCapacity: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Location and Seller Contact */}
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Physical Location Area</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.location}
                    onChange={(e) => setEditingListing({ ...editingListing, location: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Seller Name</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.sellerName}
                    onChange={(e) => setEditingListing({ ...editingListing, sellerName: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Seller Phone number</label>
                  <input 
                    type="text" 
                    required
                    value={editingListing.sellerPhone}
                    onChange={(e) => setEditingListing({ ...editingListing, sellerPhone: e.target.value })}
                    className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary ${
                      isDarkMode ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-200 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Description parameter */}
              <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-wider text-slate-450 block">Vehicle Description / Remarks block</label>
                <textarea 
                  value={editingListing.description}
                  required
                  rows={3}
                  onChange={(e) => setEditingListing({ ...editingListing, description: e.target.value })}
                  className={`w-full text-xs font-bold px-3 py-2 rounded-xl border focus:outline-none focus:ring-1 focus:ring-primary leading-relaxed resize-none ${
                    isDarkMode ? 'bg-slate-950 border-slate-800 text-stone-100' : 'bg-slate-50 border-slate-200 text-slate-800'
                  }`}
                />
              </div>
            </form>

            {/* Modal footer */}
            <div className={`p-4 border-t flex justify-end gap-3 shrink-0 ${
              isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
            }`}>
              <button
                type="button"
                onClick={() => setEditingListing(null)}
                className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all hover:bg-slate-800/10 dark:hover:bg-slate-800 cursor-pointer ${
                  isDarkMode ? 'border-slate-800 text-slate-350' : 'border-slate-300 text-slate-700'
                }`}
              >
                Cancel Audit
              </button>
              
              <button
                type="button"
                onClick={handleSaveListingEdit}
                className="px-5 py-2 rounded-xl text-xs font-extrabold bg-primary hover:bg-primary-hover active:scale-95 text-white flex items-center gap-1.5 cursor-pointer shadow-md"
              >
                <Check className="w-4 h-4" /> Save Core Changes
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
export {};
