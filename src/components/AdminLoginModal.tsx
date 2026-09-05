import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, KeyRound, X, AlertCircle, ArrowRight, Check } from 'lucide-react';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const DEFAULT_PIN = '1234';

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({
  isOpen,
  onClose,
  onSuccess
}) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin.trim() === DEFAULT_PIN || pin.trim().toLowerCase() === 'admin') {
      setError('');
      setPin('');
      onSuccess();
    } else {
      setError('Incorrect passcode. Use demo PIN: 1234');
    }
  };

  const handleQuickDemoLogin = () => {
    setError('');
    setPin('');
    onSuccess();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div
          id="admin-login-modal"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
        >
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#0C0806]/85 backdrop-blur-md"
            aria-hidden="true"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md bg-[#211812] border border-[#DCCBB5]/20 rounded-3xl p-6 sm:p-8 shadow-2xl z-10 text-[#F8F3EA]"
          >
            <button
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full text-[#DCCBB5]/70 hover:text-[#F8F3EA] hover:bg-[#17110D] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-14 h-14 rounded-2xl bg-[#A84E32]/20 border border-[#A84E32]/40 text-[#C9A35B] flex items-center justify-center mb-4">
                <Shield className="w-7 h-7 text-[#C9A35B]" />
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#F8F3EA]">
                Staff & Admin Portal
              </h2>
              <p className="text-xs text-[#DCCBB5]/70 mt-1 max-w-xs">
                Access the management dashboard to moderate guest reviews and confirm reservations.
              </p>
            </div>

            {error && (
              <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-[#DCCBB5]/80 mb-2 text-left">
                  Staff Passcode
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#DCCBB5]/40 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    autoFocus
                    value={pin}
                    onChange={(e) => setPin(e.target.value)}
                    placeholder="Enter PIN (Demo: 1234)"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#17110D] border border-[#DCCBB5]/20 text-[#F8F3EA] placeholder-[#DCCBB5]/30 text-sm focus:outline-none focus:border-[#C9A35B]"
                  />
                </div>
                <div className="flex items-center justify-between mt-2 text-[11px] text-[#DCCBB5]/60">
                  <span>Demo PIN: <strong className="text-[#C9A35B]">1234</strong></span>
                  <button
                    type="button"
                    onClick={handleQuickDemoLogin}
                    className="text-[#C9A35B] hover:underline font-semibold"
                  >
                    1-Click Demo Login
                  </button>
                </div>
              </div>

              <button
                type="submit"
                id="submit-admin-pin-btn"
                className="w-full py-3.5 px-6 rounded-xl bg-[#A84E32] hover:bg-[#914028] text-[#F7F1E7] text-xs font-bold uppercase tracking-wider shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Enter Dashboard</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
