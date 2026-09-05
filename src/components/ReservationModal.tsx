import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Calendar, Clock, Users, Utensils, CheckCircle2, AlertCircle, Phone, Mail, User, Sparkles } from 'lucide-react';
import { Reservation, SeatingPreference } from '../types';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onMakeReservation: (reservation: Omit<Reservation, 'id' | 'createdAt' | 'status'>) => Reservation;
}

const TIME_SLOTS = [
  '12:30', '13:00', '13:30', '14:00', '14:30',
  '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00', '22:30'
];

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  onMakeReservation
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [guestsCount, setGuestsCount] = useState(2);
  const [date, setDate] = useState('2026-09-05');
  const [time, setTime] = useState('19:30');
  const [seatingPreference, setSeatingPreference] = useState<SeatingPreference>('indoor');
  const [specialRequests, setSpecialRequests] = useState('');
  const [confirmedBooking, setConfirmedBooking] = useState<Reservation | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!customerName.trim()) {
      setErrorMessage('Please enter your name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a contact phone number for confirmation.');
      return;
    }

    const created = onMakeReservation({
      customerName: customerName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      guestsCount,
      date,
      time,
      seatingPreference,
      specialRequests: specialRequests.trim() || undefined
    });

    setConfirmedBooking(created);
  };

  const handleCloseAndReset = () => {
    setConfirmedBooking(null);
    setCustomerName('');
    setPhone('');
    setEmail('');
    setSpecialRequests('');
    setGuestsCount(2);
    setErrorMessage('');
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="reservation-modal-overlay"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleCloseAndReset}
            className="fixed inset-0 bg-[#0C0806]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="relative w-full max-w-xl bg-[#211812] border border-[#DCCBB5]/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#F8F3EA] max-h-[92vh] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reservation-modal-title"
          >
            {/* Close Button */}
            <button
              id="close-reservation-modal-btn"
              onClick={handleCloseAndReset}
              className="absolute top-5 right-5 p-2 rounded-full text-[#DCCBB5]/70 hover:text-[#F8F3EA] hover:bg-[#17110D] transition-colors focus:outline-none focus:ring-2 focus:ring-[#C9A35B]"
              aria-label="Close reservation dialog"
            >
              <X className="w-5 h-5" />
            </button>

            {confirmedBooking ? (
              /* Success Confirmation Screen */
              <div className="py-6 text-center flex flex-col items-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 15 }}
                  className="w-16 h-16 rounded-full bg-[#A84E32] text-white flex items-center justify-center mb-5 shadow-xl"
                >
                  <CheckCircle2 className="w-9 h-9 stroke-[2.5]" />
                </motion.div>

                <span className="text-xs uppercase tracking-[0.25em] text-[#C9A35B] font-semibold mb-1">
                  Reservation Received
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EA] mb-3">
                  Your Table is Requested!
                </h3>
                <p className="text-sm text-[#DCCBB5]/80 max-w-md mb-6 leading-relaxed">
                  Thank you, <strong className="text-[#F8F3EA]">{confirmedBooking.customerName}</strong>. Our hosting team at JAL’S Restaurant & Cafe will prepare your table.
                </p>

                {/* Booking summary ticket */}
                <div className="w-full bg-[#17110D] border border-[#DCCBB5]/15 rounded-2xl p-5 mb-6 text-left space-y-3">
                  <div className="flex items-center justify-between border-b border-[#DCCBB5]/10 pb-3">
                    <span className="text-xs text-[#DCCBB5]/60 uppercase tracking-wider">Booking Ref</span>
                    <span className="font-mono text-sm font-bold text-[#C9A35B]">{confirmedBooking.id}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div>
                      <span className="text-[#DCCBB5]/60 block mb-0.5">Date & Time</span>
                      <strong className="text-[#F8F3EA] text-sm">
                        {confirmedBooking.date} at {confirmedBooking.time}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#DCCBB5]/60 block mb-0.5">Party Size</span>
                      <strong className="text-[#F8F3EA] text-sm">{confirmedBooking.guestsCount} Guests</strong>
                    </div>
                    <div>
                      <span className="text-[#DCCBB5]/60 block mb-0.5">Seating</span>
                      <strong className="text-[#F8F3EA] capitalize">
                        {confirmedBooking.seatingPreference.replace('-', ' ')}
                      </strong>
                    </div>
                    <div>
                      <span className="text-[#DCCBB5]/60 block mb-0.5">Status</span>
                      <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                        Pending Confirmation
                      </span>
                    </div>
                  </div>

                  {confirmedBooking.specialRequests && (
                    <div className="pt-2 border-t border-[#DCCBB5]/10 text-xs">
                      <span className="text-[#DCCBB5]/60 block mb-0.5">Special Requests:</span>
                      <span className="text-[#DCCBB5]/90 italic">{confirmedBooking.specialRequests}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-3 w-full">
                  <button
                    type="button"
                    onClick={handleCloseAndReset}
                    className="w-full py-3 px-6 rounded-xl bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs font-bold uppercase tracking-wider shadow-lg transition-all"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              /* Booking Form */
              <div>
                <div className="mb-6">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#17110D] border border-[#C9A35B]/30 mb-2.5 text-xs font-semibold uppercase tracking-wider text-[#C9A35B]">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Table Reservation</span>
                  </div>
                  <h2
                    id="reservation-modal-title"
                    className="font-serif text-2xl sm:text-3xl font-bold text-[#F8F3EA] tracking-tight"
                  >
                    Book Your Table at JAL’S
                  </h2>
                  <p className="text-xs sm:text-sm text-[#DCCBB5]/70 mt-1">
                    Reserve a spot for lunch, evening dining, or coffee in Ras Al Khaimah.
                  </p>
                </div>

                {errorMessage && (
                  <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Guest Name & Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Full Name <span className="text-[#A84E32]">*</span>
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Tariq Al-Mansoor"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/35 text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Phone Number <span className="text-[#A84E32]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="tel"
                          required
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+971 50 123 4567"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/35 text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B]"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Email & Party Size */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Email Address <span className="text-[#DCCBB5]/40 text-[10px]">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="name@example.com"
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/35 text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Number of Guests <span className="text-[#A84E32]">*</span>
                      </label>
                      <div className="flex items-center gap-2">
                        {[1, 2, 3, 4, 5, 6, 8].map((count) => (
                          <button
                            type="button"
                            key={count}
                            onClick={() => setGuestsCount(count)}
                            className={`flex-1 py-2 rounded-lg text-xs font-bold border transition-colors ${
                              guestsCount === count
                                ? 'bg-[#C9A35B] text-[#17110D] border-[#C9A35B]'
                                : 'bg-[#17110D] text-[#DCCBB5]/80 border-[#DCCBB5]/15 hover:border-[#C9A35B]/50'
                            }`}
                          >
                            {count}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Date & Time Slot */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Date <span className="text-[#A84E32]">*</span>
                      </label>
                      <div className="relative">
                        <Calendar className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <input
                          type="date"
                          required
                          value={date}
                          min="2026-09-05"
                          onChange={(e) => setDate(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                        Time Slot <span className="text-[#A84E32]">*</span>
                      </label>
                      <div className="relative">
                        <Clock className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                        <select
                          value={time}
                          onChange={(e) => setTime(e.target.value)}
                          className="w-full pl-9 pr-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B]"
                        >
                          {TIME_SLOTS.map((slot) => (
                            <option key={slot} value={slot} className="bg-[#17110D] text-[#F8F3EA]">
                              {slot} ({parseInt(slot.split(':')[0]) >= 12 ? 'PM' : 'AM'})
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                      Seating Preference
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {[
                        { id: 'indoor', label: 'Main Indoor Dining' },
                        { id: 'terrace', label: 'Outdoor Terrace' },
                        { id: 'family-booth', label: 'Family Booth' },
                        { id: 'any', label: 'First Available' }
                      ].map((seat) => (
                        <button
                          type="button"
                          key={seat.id}
                          onClick={() => setSeatingPreference(seat.id as SeatingPreference)}
                          className={`p-2 rounded-xl text-xs font-medium border text-center transition-all ${
                            seatingPreference === seat.id
                              ? 'bg-[#A84E32] text-[#F8F3EA] border-[#A84E32] shadow-sm'
                              : 'bg-[#17110D]/70 text-[#DCCBB5]/80 border-[#DCCBB5]/15 hover:border-[#C9A35B]/40'
                          }`}
                        >
                          {seat.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Special Requests */}
                  <div>
                    <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/90 mb-1.5">
                      Special Requests / Notes <span className="text-[#DCCBB5]/40 text-[10px]">(Optional)</span>
                    </label>
                    <textarea
                      rows={2}
                      value={specialRequests}
                      onChange={(e) => setSpecialRequests(e.target.value)}
                      placeholder="e.g. High chair needed, celebrating a birthday, dietary preferences..."
                      className="w-full px-3.5 py-2.5 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/35 text-xs sm:text-sm focus:outline-none focus:border-[#C9A35B] resize-none"
                      maxLength={250}
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleCloseAndReset}
                      className="flex-1 py-3 px-4 rounded-xl border border-[#DCCBB5]/20 text-[#DCCBB5] hover:text-[#F8F3EA] hover:bg-[#17110D] text-xs font-semibold uppercase tracking-wider transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      id="confirm-reservation-btn"
                      className="flex-2 py-3 px-6 rounded-xl bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs font-bold uppercase tracking-wider shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-0.5"
                    >
                      Confirm Reservation
                    </button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
