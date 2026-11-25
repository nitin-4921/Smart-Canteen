import React, { useState } from 'react';
import {
  Check,
  ChefHat,
  Store,
  Clock,
  QrCode,
  Receipt,
  ArrowRight,
  UtensilsCrossed,
  RotateCcw,
} from 'lucide-react';
import { OrderStage, OrderTicket } from '../types';

interface MyOrdersViewProps {
  orders: OrderTicket[];
  onOpenQrPass: (order: OrderTicket) => void;
  onReorder: (order: OrderTicket) => void;
  onBackToMenu: () => void;
}

const STATUS_STYLE: Record<
  OrderStage,
  { label: string; badgeClass: string }
> = {
  confirmed: {
    label: 'Confirmed',
    badgeClass: 'bg-[#172554]/10 text-[#172554]',
  },
  preparing: {
    label: 'Preparing',
    badgeClass: 'bg-[#F59E0B]/15 text-[#B45309]',
  },
  ready: {
    label: 'Ready',
    badgeClass: 'bg-[#10B981] text-white',
  },
  collected: {
    label: 'Collected',
    badgeClass: 'bg-[#10B981]/12 text-[#047857]',
  },
  cancelled: {
    label: 'Cancelled',
    badgeClass: 'bg-[#EF4444]/12 text-[#B91C1C]',
  },
};

export const MyOrdersView: React.FC<MyOrdersViewProps> = ({
  orders,
  onOpenQrPass,
  onReorder,
  onBackToMenu,
}) => {
  const myOrders = orders.filter((o) => o.isMyOrder);
  const activeOrders = myOrders.filter(
    (o) => o.stage === 'confirmed' || o.stage === 'preparing' || o.stage === 'ready'
  );
  const previousOrders = myOrders.filter(
    (o) => o.stage === 'collected' || o.stage === 'cancelled'
  );

  const [selectedActiveId, setSelectedActiveId] = useState<string>(
    activeOrders[0]?.id ?? ''
  );

  const activeOrder =
    activeOrders.find((o) => o.id === selectedActiveId) ?? activeOrders[0];

  const isReady = activeOrder?.stage === 'ready';

  return (
    <div className="space-y-8 pb-20 md:pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#FF7A30]">
            Real-Time Order Tracking
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight mt-0.5">
            My Orders & Pickup Passes
          </h1>
        </div>

        {activeOrders.length > 1 && (
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
            {activeOrders.map((ord) => (
              <button
                key={ord.id}
                type="button"
                onClick={() => setSelectedActiveId(ord.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold tnum border whitespace-nowrap shrink-0 cursor-pointer ${
                  ord.id === activeOrder?.id
                    ? 'bg-[#172554] text-white border-[#172554]'
                    : 'bg-white text-[#64748B] border-[#E2E8F0] hover:text-[#172554]'
                }`}
              >
                {ord.token} • {ord.slotLabel}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Active Order Spotlight */}
      {activeOrder ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          <div className="lg:col-span-7">
            <div
              style={{ backgroundColor: '#172554' }}
              className={`rounded-3xl p-6 sm:p-8 bg-[#172554] text-white transition-all ${
                isReady
                  ? 'token-ready-glow'
                  : 'shadow-[0_12px_28px_-4px_rgba(23,37,84,0.22)]'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.05em] text-slate-200">
                    {activeOrder.counterName}
                  </p>
                  <p className="text-xs text-slate-300 mt-0.5 tnum">
                    Placed at {activeOrder.placedAt} • Pickup Slot: {activeOrder.slotLabel}
                  </p>
                </div>

                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold ${
                    isReady ? 'bg-[#10B981] text-white' : 'bg-[#FF7A30] text-white'
                  }`}
                >
                  {STATUS_STYLE[activeOrder.stage].label}
                </span>
              </div>

              <div className="mt-6 pb-6 border-b border-white/15 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#FFB693]">
                    Active Digital Token
                  </span>
                  <div className="text-[48px] font-extrabold tracking-tight leading-none mt-1 tnum text-white">
                    {activeOrder.token}
                  </div>
                  <p className="mt-3 text-xs sm:text-sm text-white/90 flex items-center gap-1.5 tnum">
                    <Clock className="w-4 h-4 text-[#FF7A30]" />
                    {isReady
                      ? `Ready now at ${activeOrder.counterShort}!`
                      : `Estimated Ready: ${activeOrder.estimatedReady} (~${activeOrder.minsRemaining} mins wait)`}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenQrPass(activeOrder)}
                  className="px-4 py-3 rounded-2xl bg-white text-[#172554] hover:bg-slate-100 text-xs font-bold inline-flex items-center gap-2 shrink-0 cursor-pointer self-start sm:self-center shadow-sm"
                >
                  <QrCode className="w-4 h-4 text-[#FF7A30]" />
                  <span>Pickup QR Pass</span>
                </button>
              </div>

              {/* 3-Step Timeline */}
              <div className="mt-6 grid grid-cols-3 gap-3">
                <div className="flex items-center gap-2">
                  <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center shrink-0">
                    <Check className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Confirmed</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isReady
                        ? 'bg-[#10B981] text-white'
                        : activeOrder.stage === 'preparing'
                        ? 'bg-[#FF7A30] text-white'
                        : 'bg-white/15 text-slate-300'
                    }`}
                  >
                    <ChefHat className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Preparing</span>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                      isReady
                        ? 'bg-[#10B981] text-white'
                        : 'bg-white/15 text-slate-300'
                    }`}
                  >
                    <Store className="w-4 h-4" />
                  </span>
                  <span className="text-xs font-bold text-white">Ready</span>
                </div>
              </div>

              {/* Read-only live sync status for student */}
              <div className="mt-6 pt-4 border-t border-white/15 flex items-center justify-between gap-3 flex-wrap">
                <span className="text-xs text-slate-200 font-medium">
                  {isReady
                    ? `Please collect your tray at ${activeOrder.counterShort} using your QR Pass.`
                    : `Live updates from Kitchen Display — we'll notify you as soon as ${activeOrder.token} is ready.`}
                </span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="card-elevation-1 rounded-2xl p-6 space-y-4">
              <div className="flex items-center gap-2.5 pb-3 border-b border-[#E2E8F0]">
                <Receipt className="w-4 h-4 text-[#FF7A30]" />
                <h2 className="text-base font-extrabold text-[#172554]">Order Details</h2>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                {activeOrder.items.map((item, i) => (
                  <div key={i} className="py-3 first:pt-0 last:pb-0 flex justify-between gap-3 text-xs">
                    <div>
                      <p className="font-bold text-[#172554]">
                        <span className="text-[#FF7A30] tnum mr-1">{item.quantity}×</span>
                        {item.name}
                      </p>
                      {item.addOnsLabel && (
                        <p className="text-[#64748B] mt-0.5">+ {item.addOnsLabel}</p>
                      )}
                    </div>
                    <span className="font-bold text-[#172554] tnum">
                      ₹{item.unitPrice * item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#E2E8F0] space-y-1.5 text-xs">
                <div className="flex justify-between text-[#64748B]">
                  <span>Item Total</span>
                  <span className="font-bold text-[#172554] tnum">₹{activeOrder.subtotal}</span>
                </div>
                <div className="flex justify-between text-[#047857] font-semibold">
                  <span>Student Subsidy</span>
                  <span className="font-bold tnum">-₹{activeOrder.subsidy}</span>
                </div>
                <div className="flex justify-between pt-2 border-t border-[#F1F5F9] text-sm font-extrabold text-[#172554]">
                  <span>Total Paid</span>
                  <span className="text-[#FF7A30] tnum">₹{activeOrder.total}</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onBackToMenu}
                className="w-full h-11 rounded-xl border-[1.5px] border-[#E2E8F0] hover:bg-[#F8FAFC] text-xs font-bold text-[#172554] cursor-pointer"
              >
                Order More Dishes
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-elevation-1 rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#FFF4EC] text-[#FF7A30] flex items-center justify-center shrink-0">
              <UtensilsCrossed className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-[#172554]">No active pickup token right now</h2>
              <p className="text-xs text-[#64748B]">
                Order from the menu or reorder a favorite meal below.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBackToMenu}
            className="h-10 px-5 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold inline-flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Browse Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Previous Orders History */}
      <section className="space-y-4">
        <h2 className="text-lg font-extrabold text-[#172554]">Previous Orders</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {previousOrders.map((ord) => {
            const st = STATUS_STYLE[ord.stage];
            return (
              <article
                key={ord.id}
                className="card-elevation-1 rounded-2xl p-5 flex flex-col justify-between gap-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-base font-extrabold text-[#172554] tnum">
                      {ord.token}
                    </span>
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold ${st.badgeClass}`}
                    >
                      {st.label}
                    </span>
                  </div>

                  <p className="text-xs text-[#64748B] tnum">
                    {ord.placedAt} • {ord.counterShort}
                  </p>

                  <div className="space-y-1 text-xs text-[#172554] pt-2 border-t border-[#F1F5F9]">
                    {ord.items.map((item, idx) => (
                      <p key={idx} className="font-semibold">
                        <span className="text-[#FF7A30] tnum mr-1">{item.quantity}×</span>
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-[#F1F5F9] flex items-center justify-between">
                  <span className="text-sm font-extrabold text-[#172554] tnum">
                    ₹{ord.total}
                  </span>

                  <button
                    type="button"
                    onClick={() => onReorder(ord)}
                    className="h-9 px-3.5 rounded-xl bg-[#F8FAFC] hover:bg-[#172554] text-[#172554] hover:text-white border border-[#E2E8F0] text-xs font-bold inline-flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reorder</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      </section>
    </div>
  );
};
