import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar,
  Clock,
  Users,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Eye,
  EyeOff,
  MessageSquare,
  Phone,
  Search,
  Filter,
  Plus,
  ArrowLeft,
  LogOut,
  ShieldCheck,
  Send,
  Trash2,
  Utensils,
  Download,
  RotateCcw,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { Reservation, ReservationStatus, Review, SeatingPreference } from '../types';

interface AdminDashboardProps {
  reservations: Reservation[];
  onUpdateReservation: (updated: Reservation) => void;
  onDeleteReservation: (id: string) => void;
  onAddReservation: (res: Reservation) => void;
  onResetReservations: () => void;
  reviews: Review[];
  onUpdateReview: (updated: Review) => void;
  onDeleteReview: (id: string) => void;
  onExitAdmin: () => void;
  onLogout: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  reservations,
  onUpdateReservation,
  onDeleteReservation,
  onAddReservation,
  onResetReservations,
  reviews,
  onUpdateReview,
  onDeleteReview,
  onExitAdmin,
  onLogout
}) => {
  const [activeTab, setActiveTab] = useState<'reservations' | 'reviews' | 'new-booking'>('reservations');
  const [reservationFilter, setReservationFilter] = useState<ReservationStatus | 'all' | 'today'>('all');
  const [reservationSearch, setReservationSearch] = useState('');
  
  // Reviews state
  const [reviewFilter, setReviewFilter] = useState<'all' | 'guest' | '5star' | 'low' | 'unanswered'>('all');
  const [reviewSearch, setReviewSearch] = useState('');
  const [replyingReviewId, setReplyingReviewId] = useState<string | null>(null);
  const [replyText, setReplyText] = useState('');

  // Online bookings switch
  const [isAcceptingBookings, setIsAcceptingBookings] = useState(true);

  // New Booking Form state (for staff phone/walk-in entry)
  const [newCustName, setNewCustName] = useState('');
  const [newCustPhone, setNewCustPhone] = useState('');
  const [newCustGuests, setNewCustGuests] = useState(2);
  const [newCustDate, setNewCustDate] = useState('2026-09-05');
  const [newCustTime, setNewCustTime] = useState('19:30');
  const [newCustSeat, setNewCustSeat] = useState<SeatingPreference>('indoor');
  const [newCustTable, setNewCustTable] = useState('Table T-05');
  const [newCustNotes, setNewCustNotes] = useState('');
  const [newBookingSuccess, setNewBookingSuccess] = useState(false);

  // KPI Calculations
  const todayStr = '2026-09-05';
  const todayReservations = useMemo(() => {
    return reservations.filter((r) => r.date === todayStr);
  }, [reservations, todayStr]);

  const todayGuestsTotal = useMemo(() => {
    return todayReservations
      .filter((r) => r.status !== 'cancelled')
      .reduce((acc, r) => acc + r.guestsCount, 0);
  }, [todayReservations]);

  const pendingCount = useMemo(() => {
    return reservations.filter((r) => r.status === 'pending').length;
  }, [reservations]);

  const avgReviewRating = useMemo(() => {
    if (reviews.length === 0) return '4.8';
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / reviews.length).toFixed(1);
  }, [reviews]);

  const unrepliedCount = useMemo(() => {
    return reviews.filter((r) => !r.managementResponse).length;
  }, [reviews]);

  // Filtered reservations
  const filteredReservations = useMemo(() => {
    return reservations.filter((r) => {
      if (reservationFilter === 'today' && r.date !== todayStr) return false;
      if (reservationFilter !== 'all' && reservationFilter !== 'today' && r.status !== reservationFilter) {
        return false;
      }
      if (reservationSearch.trim()) {
        const q = reservationSearch.toLowerCase();
        const matchesName = r.customerName.toLowerCase().includes(q);
        const matchesPhone = r.phone.toLowerCase().includes(q);
        const matchesId = r.id.toLowerCase().includes(q);
        const matchesTable = r.tableNumber?.toLowerCase().includes(q);
        return matchesName || matchesPhone || matchesId || matchesTable;
      }
      return true;
    });
  }, [reservations, reservationFilter, reservationSearch, todayStr]);

  // Filtered reviews
  const filteredReviews = useMemo(() => {
    return reviews.filter((r) => {
      if (reviewFilter === 'guest' && !r.isUserSubmitted) return false;
      if (reviewFilter === '5star' && r.rating < 5) return false;
      if (reviewFilter === 'low' && r.rating > 3) return false;
      if (reviewFilter === 'unanswered' && !!r.managementResponse) return false;

      if (reviewSearch.trim()) {
        const q = reviewSearch.toLowerCase();
        const matchesAuthor = r.author.toLowerCase().includes(q);
        const matchesText = r.text.toLowerCase().includes(q);
        const matchesDish = r.favoriteDish?.toLowerCase().includes(q);
        return matchesAuthor || matchesText || matchesDish;
      }
      return true;
    });
  }, [reviews, reviewFilter, reviewSearch]);

  // Reservation Status quick-update helper
  const handleStatusChange = (res: Reservation, newStatus: ReservationStatus) => {
    onUpdateReservation({
      ...res,
      status: newStatus
    });
  };

  const handleTableChange = (res: Reservation, table: string) => {
    onUpdateReservation({
      ...res,
      tableNumber: table
    });
  };

  const handleNotesChange = (res: Reservation, notes: string) => {
    onUpdateReservation({
      ...res,
      staffNotes: notes
    });
  };

  // Review reply submit
  const handleSubmitReply = (review: Review) => {
    if (!replyText.trim()) return;
    onUpdateReview({
      ...review,
      managementResponse: {
        message: replyText.trim(),
        respondedAt: 'Just now',
        respondedBy: 'JAL’S Management'
      }
    });
    setReplyingReviewId(null);
    setReplyText('');
  };

  // Export reservations to JSON/CSV format
  const handleExportCSV = () => {
    const headers = ['Booking ID', 'Customer Name', 'Phone', 'Date', 'Time', 'Guests', 'Seating', 'Status', 'Table', 'Special Requests'];
    const rows = reservations.map((r) => [
      r.id,
      `"${r.customerName}"`,
      r.phone,
      r.date,
      r.time,
      r.guestsCount,
      r.seatingPreference,
      r.status,
      r.tableNumber || '',
      `"${(r.specialRequests || '').replace(/"/g, '""')}"`
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `jals-reservations-${todayStr}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle staff manual walk-in / phone reservation creation
  const handleCreateWalkIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCustName.trim() || !newCustPhone.trim()) return;

    const newRes: Reservation = {
      id: `JAL-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: newCustName.trim(),
      phone: newCustPhone.trim(),
      guestsCount: newCustGuests,
      date: newCustDate,
      time: newCustTime,
      seatingPreference: newCustSeat,
      status: 'confirmed',
      tableNumber: newCustTable.trim() || undefined,
      staffNotes: newCustNotes.trim() ? `[Phone/Walk-in] ${newCustNotes.trim()}` : '[Phone/Walk-in Booking]',
      createdAt: new Date().toISOString()
    };

    onAddReservation(newRes);
    setNewBookingSuccess(true);
    setTimeout(() => {
      setNewBookingSuccess(false);
      setNewCustName('');
      setNewCustPhone('');
      setNewCustNotes('');
      setActiveTab('reservations');
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-[#110C09] text-[#F8F3EA] selection:bg-[#A84E32] selection:text-[#F7F1E7]">
      {/* Top Admin Header Bar */}
      <header className="sticky top-0 z-40 bg-[#1C140F]/95 border-b border-[#DCCBB5]/15 backdrop-blur-md px-4 sm:px-8 py-3.5 shadow-xl">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          {/* Brand & Portal Title */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#A84E32] text-white flex items-center justify-center font-serif font-bold text-lg shadow-sm">
                J
              </div>
              <div>
                <h1 className="font-serif text-lg font-bold text-[#F8F3EA] tracking-wide flex items-center gap-2">
                  <span>JAL’S RESTAURANT & CAFE</span>
                  <span className="text-[10px] font-sans uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#A84E32]/25 text-[#C9A35B] border border-[#C9A35B]/30">
                    Admin Portal
                  </span>
                </h1>
                <p className="text-[11px] text-[#DCCBB5]/60">
                  Manager Dashboard • Ras Al Khaimah (Saturday, Sept 5, 2026)
                </p>
              </div>
            </div>

            {/* Quick Online Bookings Toggle */}
            <button
              onClick={() => setIsAcceptingBookings(!isAcceptingBookings)}
              className={`md:hidden px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border transition-colors ${
                isAcceptingBookings
                  ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40'
                  : 'bg-red-950/60 text-red-300 border-red-500/40'
              }`}
            >
              {isAcceptingBookings ? 'Bookings Active' : 'Bookings Paused'}
            </button>
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-end">
            <button
              onClick={() => setIsAcceptingBookings(!isAcceptingBookings)}
              className={`hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${
                isAcceptingBookings
                  ? 'bg-emerald-950/50 text-emerald-300 border-emerald-500/30'
                  : 'bg-red-950/50 text-red-300 border-red-500/30'
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${isAcceptingBookings ? 'bg-emerald-400 animate-pulse' : 'bg-red-400'}`} />
              <span>{isAcceptingBookings ? 'Kitchen & Bookings Open' : 'Bookings Paused'}</span>
            </button>

            <button
              id="admin-view-website-btn"
              onClick={onExitAdmin}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#291D16] hover:bg-[#38281E] text-[#F8F3EA] border border-[#DCCBB5]/20 text-xs font-semibold uppercase tracking-wider transition-colors shadow-sm"
            >
              <Eye className="w-4 h-4 text-[#C9A35B]" />
              <span>View Website</span>
            </button>

            <button
              id="admin-logout-btn"
              onClick={onLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-950/40 border border-red-500/20 text-xs font-semibold transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-8">
        {/* KPI Scorecard Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8">
          {/* Card 1: Today's Bookings */}
          <div className="p-5 rounded-2xl bg-[#1D1510] border border-[#DCCBB5]/15 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#DCCBB5]/70 uppercase tracking-wider font-semibold mb-2">
              <span>Today's Bookings</span>
              <Calendar className="w-4 h-4 text-[#C9A35B]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3EA]">
                {todayReservations.length}
              </span>
              <span className="text-xs text-[#DCCBB5]/60">({todayGuestsTotal} guests)</span>
            </div>
            <button
              onClick={() => {
                setActiveTab('reservations');
                setReservationFilter('today');
              }}
              className="mt-3 text-[11px] text-[#C9A35B] hover:underline flex items-center gap-1 font-semibold text-left"
            >
              <span>View today's tables</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 2: Pending Confirmations */}
          <div className="p-5 rounded-2xl bg-[#1D1510] border border-[#DCCBB5]/15 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#DCCBB5]/70 uppercase tracking-wider font-semibold mb-2">
              <span>Needs Confirmation</span>
              <Clock className="w-4 h-4 text-amber-400" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className={`font-serif text-3xl sm:text-4xl font-bold ${pendingCount > 0 ? 'text-amber-400' : 'text-[#F8F3EA]'}`}>
                {pendingCount}
              </span>
              <span className="text-xs text-[#DCCBB5]/60">pending requests</span>
            </div>
            <button
              onClick={() => {
                setActiveTab('reservations');
                setReservationFilter('pending');
              }}
              className="mt-3 text-[11px] text-amber-400 hover:underline flex items-center gap-1 font-semibold text-left"
            >
              <span>Review pending requests</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 3: Guest Reviews & Rating */}
          <div className="p-5 rounded-2xl bg-[#1D1510] border border-[#DCCBB5]/15 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#DCCBB5]/70 uppercase tracking-wider font-semibold mb-2">
              <span>Customer Rating</span>
              <Star className="w-4 h-4 text-[#C9A35B] fill-[#C9A35B]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3EA]">
                {avgReviewRating}
              </span>
              <span className="text-xs text-[#DCCBB5]/60">/ 5.0 ({reviews.length} total)</span>
            </div>
            <button
              onClick={() => {
                setActiveTab('reviews');
                setReviewFilter('all');
              }}
              className="mt-3 text-[11px] text-[#C9A35B] hover:underline flex items-center gap-1 font-semibold text-left"
            >
              <span>Manage & moderate</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {/* Card 4: Unanswered Feedback */}
          <div className="p-5 rounded-2xl bg-[#1D1510] border border-[#DCCBB5]/15 shadow-lg flex flex-col justify-between">
            <div className="flex items-center justify-between text-xs text-[#DCCBB5]/70 uppercase tracking-wider font-semibold mb-2">
              <span>Awaiting Response</span>
              <MessageSquare className="w-4 h-4 text-[#A84E32]" />
            </div>
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-3xl sm:text-4xl font-bold text-[#F8F3EA]">
                {unrepliedCount}
              </span>
              <span className="text-xs text-[#DCCBB5]/60">reviews without reply</span>
            </div>
            <button
              onClick={() => {
                setActiveTab('reviews');
                setReviewFilter('unanswered');
              }}
              className="mt-3 text-[11px] text-[#A84E32] hover:underline flex items-center gap-1 font-semibold text-left"
            >
              <span>Reply to guests</span>
              <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </section>

        {/* Tab Navigation */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCCBB5]/15 pb-4 mb-8">
          <div className="flex items-center gap-2">
            <button
              id="admin-tab-reservations"
              onClick={() => setActiveTab('reservations')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'reservations'
                  ? 'bg-[#A84E32] text-[#F7F1E7] shadow-md'
                  : 'bg-[#1D1510] text-[#DCCBB5]/70 hover:text-[#F8F3EA] border border-[#DCCBB5]/10'
              }`}
            >
              <Calendar className="w-4 h-4" />
              <span>Reservations ({reservations.length})</span>
            </button>

            <button
              id="admin-tab-reviews"
              onClick={() => setActiveTab('reviews')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'reviews'
                  ? 'bg-[#A84E32] text-[#F7F1E7] shadow-md'
                  : 'bg-[#1D1510] text-[#DCCBB5]/70 hover:text-[#F8F3EA] border border-[#DCCBB5]/10'
              }`}
            >
              <Star className="w-4 h-4" />
              <span>Reviews Moderation ({reviews.length})</span>
            </button>

            <button
              id="admin-tab-new-booking"
              onClick={() => setActiveTab('new-booking')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold uppercase tracking-wider transition-all ${
                activeTab === 'new-booking'
                  ? 'bg-[#C9A35B] text-[#17110D] shadow-md'
                  : 'bg-[#1D1510] text-[#DCCBB5]/70 hover:text-[#F8F3EA] border border-[#DCCBB5]/10'
              }`}
            >
              <Plus className="w-4 h-4" />
              <span>New Walk-in / Phone Booking</span>
            </button>
          </div>

          {/* Secondary Tools */}
          {activeTab === 'reservations' && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#1D1510] hover:bg-[#2B1F17] text-[#DCCBB5] hover:text-[#F8F3EA] border border-[#DCCBB5]/20 text-xs font-semibold transition-colors"
                title="Download CSV"
              >
                <Download className="w-3.5 h-3.5 text-[#C9A35B]" />
                <span>Export CSV</span>
              </button>

              <button
                onClick={onResetReservations}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#1D1510] hover:bg-[#2B1F17] text-[#DCCBB5]/60 hover:text-[#DCCBB5] border border-[#DCCBB5]/15 text-xs transition-colors"
                title="Reset to default showcase reservations"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset Demo</span>
              </button>
            </div>
          )}
        </div>

        {/* TAB 1: RESERVATIONS MANAGER */}
        {activeTab === 'reservations' && (
          <div>
            {/* Filter and Search Bar */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              {/* Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { id: 'all', label: `All (${reservations.length})` },
                  { id: 'today', label: `Today (${todayReservations.length})` },
                  { id: 'pending', label: `Pending (${pendingCount})` },
                  { id: 'confirmed', label: 'Confirmed' },
                  { id: 'seated', label: 'Seated' },
                  { id: 'completed', label: 'Completed' },
                  { id: 'cancelled', label: 'Cancelled' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setReservationFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      reservationFilter === tab.id
                        ? 'bg-[#C9A35B] text-[#17110D]'
                        : 'bg-[#1D1510] text-[#DCCBB5]/70 hover:text-[#F8F3EA] border border-[#DCCBB5]/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reservationSearch}
                  onChange={(e) => setReservationSearch(e.target.value)}
                  placeholder="Search guest, phone, table..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1D1510] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/30 text-xs focus:outline-none focus:border-[#C9A35B]"
                />
              </div>
            </div>

            {/* Reservations Cards List */}
            {filteredReservations.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-[#1D1510]/60 border border-[#DCCBB5]/10">
                <Calendar className="w-10 h-10 text-[#DCCBB5]/30 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#F8F3EA] mb-1">
                  No reservations found
                </h3>
                <p className="text-xs text-[#DCCBB5]/60 mb-4">
                  No bookings match the selected filter criteria.
                </p>
                <button
                  onClick={() => {
                    setReservationFilter('all');
                    setReservationSearch('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#A84E32] text-xs font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {filteredReservations.map((res) => {
                  const isToday = res.date === todayStr;

                  return (
                    <div
                      key={res.id}
                      className="p-6 rounded-2xl bg-[#1D1510] border border-[#DCCBB5]/15 hover:border-[#C9A35B]/40 transition-all shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        {/* Top Line: Ref, Date & Status */}
                        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-bold text-[#C9A35B] bg-[#110C09] px-2.5 py-1 rounded-md border border-[#C9A35B]/30">
                              {res.id}
                            </span>
                            {isToday && (
                              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#A84E32] text-white">
                                TODAY
                              </span>
                            )}
                          </div>

                          {/* Status Badge */}
                          <div className="flex items-center gap-1.5">
                            <select
                              value={res.status}
                              onChange={(e) => handleStatusChange(res, e.target.value as ReservationStatus)}
                              className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border focus:outline-none transition-colors ${
                                res.status === 'confirmed'
                                  ? 'bg-emerald-950/70 text-emerald-300 border-emerald-500/40'
                                  : res.status === 'pending'
                                  ? 'bg-amber-950/70 text-amber-300 border-amber-500/40'
                                  : res.status === 'seated'
                                  ? 'bg-blue-950/70 text-blue-300 border-blue-500/40'
                                  : res.status === 'completed'
                                  ? 'bg-zinc-800 text-zinc-300 border-zinc-600'
                                  : 'bg-red-950/70 text-red-300 border-red-500/40'
                              }`}
                            >
                              <option value="pending" className="bg-[#1D1510] text-[#F8F3EA]">Pending</option>
                              <option value="confirmed" className="bg-[#1D1510] text-[#F8F3EA]">Confirmed</option>
                              <option value="seated" className="bg-[#1D1510] text-[#F8F3EA]">Seated</option>
                              <option value="completed" className="bg-[#1D1510] text-[#F8F3EA]">Completed</option>
                              <option value="cancelled" className="bg-[#1D1510] text-[#F8F3EA]">Cancelled</option>
                            </select>
                          </div>
                        </div>

                        {/* Guest Details */}
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="font-serif text-lg sm:text-xl font-bold text-[#F8F3EA]">
                              {res.customerName}
                            </h3>
                            <div className="flex flex-wrap items-center gap-3 text-xs text-[#DCCBB5]/80 mt-1">
                              <a
                                href={`tel:${res.phone}`}
                                className="flex items-center gap-1.5 text-[#C9A35B] hover:underline"
                              >
                                <Phone className="w-3.5 h-3.5" />
                                <span>{res.phone}</span>
                              </a>
                              {res.email && (
                                <span className="text-[#DCCBB5]/50">• {res.email}</span>
                              )}
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm font-bold text-[#F8F3EA] flex items-center gap-1.5 justify-end">
                              <Users className="w-4 h-4 text-[#C9A35B]" />
                              <span>{res.guestsCount} Guests</span>
                            </div>
                            <span className="text-[11px] capitalize text-[#DCCBB5]/60 block mt-0.5">
                              {res.seatingPreference.replace('-', ' ')}
                            </span>
                          </div>
                        </div>

                        {/* Date, Time & Table Slot Row */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 p-3 rounded-xl bg-[#110C09] border border-[#DCCBB5]/10 text-xs mb-3">
                          <div>
                            <span className="text-[10px] text-[#DCCBB5]/50 uppercase tracking-wider block">Booking Date</span>
                            <span className="font-semibold text-[#F8F3EA]">{res.date}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#DCCBB5]/50 uppercase tracking-wider block">Time Slot</span>
                            <span className="font-semibold text-[#F8F3EA]">{res.time}</span>
                          </div>
                          <div>
                            <span className="text-[10px] text-[#DCCBB5]/50 uppercase tracking-wider block">Table Assigned</span>
                            <input
                              type="text"
                              value={res.tableNumber || ''}
                              onChange={(e) => handleTableChange(res, e.target.value)}
                              placeholder="Assign Table..."
                              className="w-full bg-transparent border-b border-[#DCCBB5]/20 text-[#C9A35B] font-semibold text-xs focus:outline-none focus:border-[#C9A35B]"
                            />
                          </div>
                        </div>

                        {/* Special Requests */}
                        {res.specialRequests && (
                          <div className="p-2.5 rounded-xl bg-[#A84E32]/10 border border-[#A84E32]/25 text-xs text-[#F8F3EA] mb-3">
                            <span className="font-bold text-[#C9A35B] block text-[10px] uppercase tracking-wider">Guest Request:</span>
                            <p className="italic text-[#DCCBB5]/90 mt-0.5">{res.specialRequests}</p>
                          </div>
                        )}

                        {/* Staff Notes */}
                        <div className="mb-4">
                          <label className="text-[10px] uppercase tracking-wider text-[#DCCBB5]/50 block mb-1">
                            Staff Internal Notes
                          </label>
                          <input
                            type="text"
                            value={res.staffNotes || ''}
                            onChange={(e) => handleNotesChange(res, e.target.value)}
                            placeholder="Add note (e.g., cake requested, high chair set)..."
                            className="w-full px-3 py-1.5 rounded-lg bg-[#110C09] border border-[#DCCBB5]/15 text-xs text-[#F8F3EA] placeholder-[#DCCBB5]/30 focus:outline-none focus:border-[#C9A35B]"
                          />
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="pt-3 border-t border-[#DCCBB5]/10 flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          {res.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(res, 'confirmed')}
                              className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Confirm</span>
                            </button>
                          )}

                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(res, 'seated')}
                              className="px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-colors flex items-center gap-1.5 shadow-sm"
                            >
                              <Utensils className="w-3.5 h-3.5" />
                              <span>Seat Guests</span>
                            </button>
                          )}

                          {res.status === 'seated' && (
                            <button
                              onClick={() => handleStatusChange(res, 'completed')}
                              className="px-3.5 py-1.5 rounded-lg bg-zinc-700 hover:bg-zinc-600 text-white text-xs font-bold transition-colors flex items-center gap-1.5"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Mark Complete</span>
                            </button>
                          )}

                          {res.status !== 'cancelled' && (
                            <button
                              onClick={() => handleStatusChange(res, 'cancelled')}
                              className="px-3 py-1.5 rounded-lg text-red-400 hover:bg-red-950/40 text-xs font-medium transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => onDeleteReservation(res.id)}
                          className="p-1.5 rounded-lg text-[#DCCBB5]/40 hover:text-red-400 hover:bg-[#110C09] transition-colors"
                          title="Delete booking record"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: REVIEWS MODERATION */}
        {activeTab === 'reviews' && (
          <div>
            {/* Filter and Search */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
              <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
                {[
                  { id: 'all', label: `All Reviews (${reviews.length})` },
                  { id: 'guest', label: 'Community (Submitted)' },
                  { id: '5star', label: '5-Stars' },
                  { id: 'low', label: 'Critical (≤3★)' },
                  { id: 'unanswered', label: `Awaiting Reply (${unrepliedCount})` }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setReviewFilter(tab.id as any)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                      reviewFilter === tab.id
                        ? 'bg-[#C9A35B] text-[#17110D]'
                        : 'bg-[#1D1510] text-[#DCCBB5]/70 hover:text-[#F8F3EA] border border-[#DCCBB5]/10'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>

              <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={reviewSearch}
                  onChange={(e) => setReviewSearch(e.target.value)}
                  placeholder="Search reviewer or dish..."
                  className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#1D1510] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/30 text-xs focus:outline-none focus:border-[#C9A35B]"
                />
              </div>
            </div>

            {/* Reviews Cards List */}
            {filteredReviews.length === 0 ? (
              <div className="text-center py-16 px-4 rounded-3xl bg-[#1D1510]/60 border border-[#DCCBB5]/10">
                <Star className="w-10 h-10 text-[#DCCBB5]/30 mx-auto mb-3" />
                <h3 className="font-serif text-lg font-bold text-[#F8F3EA] mb-1">
                  No reviews match filters
                </h3>
                <p className="text-xs text-[#DCCBB5]/60 mb-4">
                  Try adjusting the moderation filters or search terms.
                </p>
                <button
                  onClick={() => {
                    setReviewFilter('all');
                    setReviewSearch('');
                  }}
                  className="px-4 py-2 rounded-xl bg-[#A84E32] text-xs font-semibold text-white"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredReviews.map((review) => {
                  const isHidden = review.status === 'hidden';

                  return (
                    <div
                      key={review.id}
                      className={`p-6 rounded-2xl bg-[#1D1510] border transition-all ${
                        isHidden
                          ? 'border-red-500/30 opacity-60'
                          : 'border-[#DCCBB5]/15 hover:border-[#C9A35B]/40'
                      }`}
                    >
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-[#A84E32]/30 border border-[#A84E32] flex items-center justify-center font-bold text-[#F8F3EA] text-sm">
                            {review.author.charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <h4 className="font-bold text-[#F8F3EA] text-sm">{review.author}</h4>
                              {review.isUserSubmitted && (
                                <span className="text-[10px] font-bold text-[#C9A35B] bg-[#110C09] px-2 py-0.5 rounded-full border border-[#C9A35B]/30">
                                  Community
                                </span>
                              )}
                              {isHidden && (
                                <span className="text-[10px] font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded-full border border-red-500/40">
                                  Hidden from Public
                                </span>
                              )}
                            </div>
                            <span className="text-xs text-[#DCCBB5]/60">
                              {review.date || 'Customer review'} • {review.source}
                            </span>
                          </div>
                        </div>

                        {/* Star Rating & Moderation Controls */}
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-1 text-[#C9A35B]">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? 'fill-[#C9A35B] text-[#C9A35B]' : 'text-[#DCCBB5]/20'
                                }`}
                              />
                            ))}
                            <span className="ml-1 text-xs font-bold text-[#F8F3EA]">
                              {review.rating}.0
                            </span>
                          </div>

                          {/* Visibility Toggle Button */}
                          <button
                            onClick={() =>
                              onUpdateReview({
                                ...review,
                                status: isHidden ? 'published' : 'hidden'
                              })
                            }
                            className={`p-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border transition-colors ${
                              isHidden
                                ? 'bg-zinc-800 text-zinc-300 border-zinc-600'
                                : 'bg-[#110C09] text-emerald-400 border-emerald-500/30 hover:bg-[#1C140F]'
                            }`}
                            title={isHidden ? 'Publish review on website' : 'Hide review from website'}
                          >
                            {isHidden ? (
                              <>
                                <EyeOff className="w-3.5 h-3.5" />
                                <span>Hidden</span>
                              </>
                            ) : (
                              <>
                                <Eye className="w-3.5 h-3.5" />
                                <span>Published</span>
                              </>
                            )}
                          </button>

                          {/* Delete */}
                          <button
                            onClick={() => onDeleteReview(review.id)}
                            className="p-2 rounded-xl text-[#DCCBB5]/40 hover:text-red-400 hover:bg-[#110C09] transition-colors"
                            title="Delete review permanently"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Review Text & Favorite Dish */}
                      {review.favoriteDish && (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#A84E32]/15 border border-[#A84E32]/30 text-xs text-[#F8F3EA] mb-2 font-medium">
                          <Utensils className="w-3 h-3 text-[#C9A35B]" />
                          <span>Dish Recommended: <strong className="text-[#C9A35B]">{review.favoriteDish}</strong></span>
                        </div>
                      )}

                      <p className="text-sm text-[#F8F3EA] leading-relaxed italic mb-4 bg-[#110C09]/60 p-3.5 rounded-xl border border-[#DCCBB5]/10">
                        "{review.text}"
                      </p>

                      {/* Management Response Section */}
                      {review.managementResponse ? (
                        <div className="p-3.5 rounded-xl bg-[#291D16] border border-[#C9A35B]/30 text-xs text-[#F8F3EA]">
                          <div className="flex items-center justify-between mb-1.5">
                            <span className="font-bold text-[#C9A35B] flex items-center gap-1.5">
                              <ShieldCheck className="w-3.5 h-3.5" />
                              <span>Management Response ({review.managementResponse.respondedBy})</span>
                            </span>
                            <button
                              onClick={() => {
                                setReplyingReviewId(review.id);
                                setReplyText(review.managementResponse?.message || '');
                              }}
                              className="text-[11px] text-[#DCCBB5]/60 hover:text-[#C9A35B] underline"
                            >
                              Edit Reply
                            </button>
                          </div>
                          <p className="text-[#DCCBB5]/90 leading-relaxed">
                            {review.managementResponse.message}
                          </p>
                        </div>
                      ) : replyingReviewId === review.id ? (
                        <div className="p-3.5 rounded-xl bg-[#110C09] border border-[#C9A35B]/40 space-y-2">
                          <label className="text-xs font-bold text-[#C9A35B] block">
                            Write Official Response (will appear publicly under this review):
                          </label>
                          <textarea
                            rows={3}
                            value={replyText}
                            onChange={(e) => setReplyText(e.target.value)}
                            placeholder="e.g., Thank you for dining with us! We are thrilled you enjoyed the Tico Crispy..."
                            className="w-full p-2.5 rounded-lg bg-[#1D1510] border border-[#DCCBB5]/20 text-xs text-[#F8F3EA] placeholder-[#DCCBB5]/30 focus:outline-none focus:border-[#C9A35B]"
                          />
                          <div className="flex items-center gap-2 justify-end">
                            <button
                              onClick={() => setReplyingReviewId(null)}
                              className="px-3 py-1.5 rounded-lg text-xs text-[#DCCBB5]/70 hover:text-[#F8F3EA]"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => handleSubmitReply(review)}
                              className="px-4 py-1.5 rounded-lg bg-[#A84E32] hover:bg-[#914028] text-xs font-bold text-white flex items-center gap-1.5"
                            >
                              <Send className="w-3 h-3" />
                              <span>Post Response</span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => {
                            setReplyingReviewId(review.id);
                            setReplyText('');
                          }}
                          className="text-xs font-semibold text-[#C9A35B] hover:text-[#e4be74] inline-flex items-center gap-1.5"
                        >
                          <MessageSquare className="w-3.5 h-3.5" />
                          <span>Reply as Management</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 3: NEW WALK-IN / PHONE BOOKING */}
        {activeTab === 'new-booking' && (
          <div className="max-w-2xl mx-auto p-6 sm:p-8 rounded-3xl bg-[#1D1510] border border-[#DCCBB5]/20 shadow-2xl">
            <div className="mb-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#C9A35B]">
                Staff Fast Booking Entry
              </span>
              <h3 className="font-serif text-2xl font-bold text-[#F8F3EA] mt-1">
                Enter Walk-in or Phone Reservation
              </h3>
              <p className="text-xs text-[#DCCBB5]/70 mt-1">
                Directly add guest bookings into the reservations register with instant table assignment.
              </p>
            </div>

            {newBookingSuccess ? (
              <div className="py-12 text-center flex flex-col items-center">
                <div className="w-14 h-14 rounded-full bg-emerald-600 text-white flex items-center justify-center mb-3">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="font-serif text-xl font-bold text-[#F8F3EA]">
                  Booking Saved & Confirmed!
                </h4>
                <p className="text-xs text-[#DCCBB5]/70 mt-1">
                  Redirecting to the reservations list...
                </p>
              </div>
            ) : (
              <form onSubmit={handleCreateWalkIn} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Guest Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newCustName}
                      onChange={(e) => setNewCustName(e.target.value)}
                      placeholder="e.g. Sultan Al-Nuaimi"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] placeholder-[#DCCBB5]/30 focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={newCustPhone}
                      onChange={(e) => setNewCustPhone(e.target.value)}
                      placeholder="+971 50 123 4567"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] placeholder-[#DCCBB5]/30 focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Party Size
                    </label>
                    <input
                      type="number"
                      min={1}
                      max={25}
                      value={newCustGuests}
                      onChange={(e) => setNewCustGuests(parseInt(e.target.value) || 1)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Date
                    </label>
                    <input
                      type="date"
                      value={newCustDate}
                      onChange={(e) => setNewCustDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Time Slot
                    </label>
                    <input
                      type="time"
                      value={newCustTime}
                      onChange={(e) => setNewCustTime(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Seating Preference
                    </label>
                    <select
                      value={newCustSeat}
                      onChange={(e) => setNewCustSeat(e.target.value as SeatingPreference)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] focus:outline-none focus:border-[#C9A35B]"
                    >
                      <option value="indoor">Main Indoor Dining</option>
                      <option value="terrace">Outdoor Terrace</option>
                      <option value="family-booth">Family Booth</option>
                      <option value="any">First Available</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                      Assign Table
                    </label>
                    <input
                      type="text"
                      value={newCustTable}
                      onChange={(e) => setNewCustTable(e.target.value)}
                      placeholder="e.g. Table T-05"
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] focus:outline-none focus:border-[#C9A35B]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-1">
                    Special Notes / Requests
                  </label>
                  <input
                    type="text"
                    value={newCustNotes}
                    onChange={(e) => setNewCustNotes(e.target.value)}
                    placeholder="e.g. Birthday candles, quiet table, VIP guest..."
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#110C09] border border-[#DCCBB5]/20 text-xs sm:text-sm text-[#F8F3EA] placeholder-[#DCCBB5]/30 focus:outline-none focus:border-[#C9A35B]"
                  />
                </div>

                <div className="pt-3">
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl bg-[#A84E32] hover:bg-[#914028] text-white text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                  >
                    Save & Confirm Booking
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
