import React from 'react';
import { X, Check, ChefHat, Store, QrCode, ArrowRight } from 'lucide-react';
import { OrderTicket } from '../types';

interface OrderConfirmModalProps {
  order: OrderTicket | null;
  onClose: () => void;
  onTrackOrder: () => void;
}

export const OrderConfirmModal: React.FC<OrderConfirmModalProps> = ({
  order,
  onClose,
  onTrackOrder,
}) => {
  if (!order) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#172554]/55 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="order-confirmed-title"
    >
      <div className="w-full max-w-md bg-white rounded-3xl overflow-hidden card-elevation-2 relative">
        {/* Top Navy Token Pass Header */}
        <div className="bg-[#172554] text-white p-6 text-center relative">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close confirmation"
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#10B981] text-white text-[11px] font-extrabold uppercase tracking-[0.05em]">
            <Check className="w-3.5 h-3.5" />
            Order Confirmed
          </span>

          <p className="mt-4 text-[11px] font-bold uppercase tracking-[0.08em] text-[#FFB693]">
            Digital Pickup Token
          </p>
          <h2
            id="order-confirmed-title"
            className="text-5xl font-extrabold tracking-tight mt-1 tnum"
          >
            {order.token}
          </h2>
          <p className="mt-2 text-xs text-slate-300 font-medium">
            {order.counterShort} • Slot {order.slotLabel}
          </p>
        </div>

        <div className="p-6 space-y-5">
          {/* 3-Step Order Status Timeline */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#10B981] text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold text-[#047857]">Confirmed</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#FF7A30]/15 text-[#FF7A30] border border-[#FF7A30]/40 flex items-center justify-center">
                <ChefHat className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-bold text-[#FF7A30]">Kitchen Preparing</p>
            </div>
            <div className="space-y-1.5">
              <div className="w-8 h-8 mx-auto rounded-full bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0] flex items-center justify-center">
                <Store className="w-4 h-4" />
              </div>
              <p className="text-[11px] font-semibold text-[#64748B]">Ready for Pickup</p>
            </div>
          </div>

          {/* Itemized Summary + Mini QR */}
          <div className="rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] p-4 flex items-center justify-between gap-4">
            <div className="space-y-1.5 flex-1 min-w-0">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex justify-between text-xs gap-2">
                  <span className="font-bold text-[#172554] truncate">
                    <span className="text-[#FF7A30] tnum mr-1">{item.quantity}×</span>
                    {item.name}
                  </span>
                  <span className="font-bold text-[#172554] tnum shrink-0">
                    ₹{item.unitPrice * item.quantity}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-[#E2E8F0] flex justify-between text-xs font-extrabold text-[#172554]">
                <span>Total Paid</span>
                <span className="text-[#FF7A30] tnum">₹{order.total}</span>
              </div>
            </div>

            <div className="w-16 h-16 rounded-xl bg-white border border-[#E2E8F0] p-1.5 shrink-0 flex items-center justify-center">
              <QrCode className="w-12 h-12 text-[#172554]" />
            </div>
          </div>

          <button
            type="button"
            onClick={onTrackOrder}
            className="w-full h-11 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-sm font-bold flex items-center justify-center gap-2 cursor-pointer transition-colors"
          >
            <span>Track Live Order</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
