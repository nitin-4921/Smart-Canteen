import React from 'react';
import { X, QrCode, MapPin, Clock } from 'lucide-react';
import { OrderTicket } from '../types';

interface QrPassModalProps {
  order: OrderTicket | null;
  onClose: () => void;
}

export const QrPassModal: React.FC<QrPassModalProps> = ({ order, onClose }) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#172554]/50 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="qr-modal-title"
    >
      <div className="w-full max-w-sm bg-white rounded-3xl p-6 card-elevation-2 space-y-5 relative">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close QR Pass"
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-[#F8FAFC] hover:bg-[#E2E8F0] text-[#172554] flex items-center justify-center cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="text-center space-y-1 pt-1">
          <span className="inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#FF7A30]">
            <QrCode className="w-3.5 h-3.5" />
            Express Counter Pass
          </span>
          <h2 id="qr-modal-title" className="text-3xl font-extrabold text-[#172554] tnum">
            {order.token}
          </h2>
          <p className="text-xs text-[#64748B] font-medium">
            Scan at counter kiosk to collect your tray
          </p>
        </div>

        <div className="mx-auto w-48 h-48 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0]">
          <svg viewBox="0 0 100 100" className="w-full h-full" role="img" aria-label={`QR Code for ${order.token}`}>
            <rect width="100" height="100" fill="#FFFFFF" rx="6" />
            <rect x="8" y="8" width="26" height="26" rx="4" fill="none" stroke="#172554" strokeWidth="6" />
            <rect x="15" y="15" width="12" height="12" rx="2" fill="#172554" />
            <rect x="66" y="8" width="26" height="26" rx="4" fill="none" stroke="#172554" strokeWidth="6" />
            <rect x="73" y="15" width="12" height="12" rx="2" fill="#172554" />
            <rect x="8" y="66" width="26" height="26" rx="4" fill="none" stroke="#172554" strokeWidth="6" />
            <rect x="15" y="73" width="12" height="12" rx="2" fill="#FF7A30" />
            <rect x="44" y="10" width="8" height="8" fill="#172554" />
            <rect x="44" y="26" width="12" height="8" fill="#172554" />
            <rect x="10" y="44" width="12" height="8" fill="#172554" />
            <rect x="30" y="44" width="18" height="8" fill="#FF7A30" />
            <rect x="56" y="44" width="12" height="16" fill="#172554" />
            <rect x="76" y="44" width="14" height="8" fill="#172554" />
            <rect x="44" y="62" width="10" height="14" fill="#172554" />
            <rect x="62" y="68" width="14" height="10" fill="#172554" />
            <rect x="82" y="64" width="8" height="26" fill="#172554" />
            <rect x="46" y="84" width="24" height="8" fill="#FF7A30" />
          </svg>
        </div>

        <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-3.5 space-y-2 text-xs">
          <div className="flex items-center gap-2 font-bold text-[#172554]">
            <MapPin className="w-4 h-4 text-[#FF7A30] shrink-0" />
            <span>{order.counterName}</span>
          </div>
          <div className="flex items-center gap-2 text-[#64748B] font-medium tnum">
            <Clock className="w-4 h-4 text-[#10B981] shrink-0" />
            <span>
              {order.stage === 'ready'
                ? 'Ready right now for pickup'
                : `Estimated Ready: ${order.estimatedReady} (~${order.minsRemaining} mins)`}
            </span>
          </div>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-11 rounded-full bg-[#172554] hover:bg-[#1E3A8A] text-white text-sm font-bold cursor-pointer transition-colors"
        >
          Done
        </button>
      </div>
    </div>
  );
};
