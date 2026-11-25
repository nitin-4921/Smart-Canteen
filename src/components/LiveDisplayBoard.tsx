import React, { useEffect, useState } from 'react';
import { CheckCircle2, Clock, Megaphone, QrCode, ArrowRight } from 'lucide-react';
import { getLiveBulletins } from '../data/canteenData';
import { OrderTicket, PickupSlot } from '../types';

interface LiveDisplayBoardProps {
  orders: OrderTicket[];
  pickupSlots: PickupSlot[];
  kitchenStatus: 'OPEN' | 'BUSY' | 'PAUSED';
  onGoToOrder: () => void;
}

export const LiveDisplayBoard: React.FC<LiveDisplayBoardProps> = ({
  orders,
  pickupSlots,
  kitchenStatus,
  onGoToOrder,
}) => {
  const [clock, setClock] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [bulletinIdx, setBulletinIdx] = useState<number>(0);

  useEffect(() => {
    const t = window.setInterval(() => {
      setClock(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => window.clearInterval(t);
  }, []);

  const bulletins = getLiveBulletins(pickupSlots);

  useEffect(() => {
    const b = window.setInterval(() => {
      setBulletinIdx((i) => (i + 1) % bulletins.length);
    }, 4500);
    return () => window.clearInterval(b);
  }, [bulletins.length]);

  const readyTokens = orders.filter((o) => o.stage === 'ready');
  const upcomingTokens = orders.filter(
    (o) => o.stage === 'preparing' || o.stage === 'confirmed'
  );
  const completedToday = orders.filter((o) => o.stage === 'collected').length + 412;

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* TV Kiosk Display Header */}
      <section className="rounded-3xl bg-[#172554] text-white p-6 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4 card-elevation-2">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.08em] text-[#FFB693]">
            NORTH QUAD DINING HALL • TV KIOSK BOARD
          </p>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight mt-1">
            SmartCanteen Live Pickup
          </h1>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <div className="px-4 py-2 rounded-2xl bg-white/10 border border-white/15 text-right">
            <span className="block text-[10px] font-bold uppercase tracking-[0.06em] text-slate-300">
              Current Time
            </span>
            <span className="block text-xl font-extrabold tnum">{clock}</span>
          </div>

          <span
            className={`px-4 py-2.5 rounded-2xl text-xs font-extrabold uppercase tracking-[0.06em] ${
              kitchenStatus === 'OPEN'
                ? 'bg-[#10B981] text-white'
                : kitchenStatus === 'BUSY'
                ? 'bg-[#F59E0B] text-[#172554]'
                : 'bg-[#EF4444] text-white'
            }`}
          >
            Canteen {kitchenStatus}
          </span>
        </div>
      </section>

      {/* Live Canteen Statistics Strip */}
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-elevation-1 rounded-2xl p-5">
          <p className="text-xs font-bold text-[#64748B]">Current Queue Occupancy</p>
          <p className="mt-1 text-3xl font-extrabold text-[#172554] tnum">58%</p>
          <p className="text-[11px] font-semibold text-[#047857] mt-0.5">Optimal slot flow</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5">
          <p className="text-xs font-bold text-[#64748B]">Avg. Pickup Waiting Time</p>
          <p className="mt-1 text-3xl font-extrabold text-[#10B981] tnum">2.5 mins</p>
          <p className="text-[11px] font-semibold text-[#047857] mt-0.5">SmartCanteen Fast-Pass</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5">
          <p className="text-xs font-bold text-[#64748B]">Traditional Queue Wait</p>
          <p className="mt-1 text-3xl font-extrabold text-[#94A3B8] line-through tnum">25 mins</p>
          <p className="text-[11px] font-semibold text-[#FF7A30] mt-0.5">22.5 mins saved per student</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5">
          <p className="text-xs font-bold text-[#64748B]">Meals Completed Today</p>
          <p className="mt-1 text-3xl font-extrabold text-[#FF7A30] tnum">{completedToday}</p>
          <p className="text-[11px] font-semibold text-[#64748B] mt-0.5">Synced live from KDS</p>
        </div>
      </section>

      {/* Token Call Board (Large, readable from yards away) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* READY FOR PICKUP */}
        <section className="lg:col-span-7 card-elevation-1 rounded-3xl overflow-hidden">
          <div className="px-6 py-4 bg-[#10B981] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <CheckCircle2 className="w-6 h-6" />
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight uppercase">
                Ready for Pickup
              </h2>
            </div>
            <span className="text-sm font-extrabold tnum">{readyTokens.length} Ready</span>
          </div>

          <div className="p-6">
            {readyTokens.length === 0 ? (
              <p className="text-base text-[#64748B] py-12 text-center font-semibold">
                Next batch of tokens arriving shortly.
              </p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {readyTokens.map((ord) => (
                  <div
                    key={ord.id}
                    className="rounded-2xl p-5 bg-[#ECFDF5] border-2 border-[#10B981] text-center token-ready-glow"
                  >
                    <p className="text-xs font-extrabold uppercase tracking-[0.06em] text-[#047857]">
                      {ord.counterShort}
                    </p>
                    <p className="mt-1 text-4xl font-extrabold text-[#172554] tracking-tight tnum">
                      {ord.token}
                    </p>
                    <p className="mt-1.5 text-xs font-bold text-[#047857] truncate">
                      {ord.studentName}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* UPCOMING / PREPARING */}
        <section className="lg:col-span-5 card-elevation-1 rounded-3xl overflow-hidden">
          <div className="px-6 py-4 bg-[#172554] text-white flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Clock className="w-5 h-5 text-[#FF7A30]" />
              <h2 className="text-lg font-extrabold tracking-tight uppercase">
                Upcoming & Preparing
              </h2>
            </div>
            <span className="text-sm font-extrabold text-[#FFB693] tnum">
              {upcomingTokens.length} In Queue
            </span>
          </div>

          <div className="p-5 divide-y divide-[#F1F5F9]">
            {upcomingTokens.length === 0 ? (
              <p className="text-sm text-[#64748B] py-10 text-center">
                No upcoming orders in queue.
              </p>
            ) : (
              upcomingTokens.map((ord) => (
                <div
                  key={ord.id}
                  className="py-3.5 first:pt-0 last:pb-0 flex items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3.5">
                    <span className="px-3.5 py-2 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-2xl font-extrabold text-[#172554] tnum">
                      {ord.token}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-[#172554]">{ord.counterShort}</p>
                      <p className="text-xs text-[#64748B]">
                        {ord.stage === 'preparing' ? 'Preparing now' : 'Confirmed in slot'}
                      </p>
                    </div>
                  </div>

                  <span className="text-sm font-extrabold text-[#FF7A30] tnum">
                    ~{ord.minsRemaining}m
                  </span>
                </div>
              ))
            )}
          </div>
        </section>
      </div>

      {/* Bottom Row: Live Slot Schedule + QR Code Ordering + Rotating Bulletin */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Live Slot Schedule */}
        <section className="lg:col-span-5 card-elevation-1 rounded-2xl p-5 space-y-3">
          <h2 className="text-sm font-extrabold uppercase tracking-[0.04em] text-[#172554]">
            Live Pickup Slot Schedule
          </h2>
          <div className="space-y-2">
            {pickupSlots.map((slot) => (
              <div
                key={slot.id}
                className="flex items-center justify-between px-3.5 py-2.5 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs"
              >
                <span className="font-bold text-[#172554] tnum">{slot.timeRange}</span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                    slot.status === 'full'
                      ? 'bg-[#EF4444]/12 text-[#B91C1C]'
                      : slot.status === 'almost_full'
                      ? 'bg-[#F59E0B]/15 text-[#B45309]'
                      : 'bg-[#10B981]/15 text-[#047857]'
                  }`}
                >
                  {slot.status === 'full'
                    ? 'FULL • BLOCKED'
                    : slot.status === 'almost_full'
                    ? `ALMOST FULL (${slot.remaining} left)`
                    : slot.recommended
                    ? `OPEN (${slot.remaining} left)`
                    : `AVAILABLE (${slot.remaining} left)`}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Live Bulletin */}
        <section className="lg:col-span-4 card-elevation-1 rounded-2xl p-5 flex flex-col justify-between gap-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 text-xs font-extrabold uppercase tracking-[0.05em] text-[#FF7A30]">
                <Megaphone className="w-4 h-4" />
                Live Kitchen Bulletin
              </span>
              <span className="text-[11px] font-bold text-[#64748B] tnum">
                {bulletinIdx + 1}/{bulletins.length}
              </span>
            </div>

            <div className="rounded-xl bg-[#FFF4EC] border border-[#FF7A30]/25 p-4">
              <p className="text-base font-extrabold text-[#172554] leading-snug">
                {bulletins[bulletinIdx % bulletins.length]}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {bulletins.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setBulletinIdx(idx)}
                aria-label={`Show announcement ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  idx === bulletinIdx ? 'w-8 bg-[#FF7A30]' : 'w-2 bg-[#CBD5E1]'
                }`}
              />
            ))}
          </div>
        </section>

        {/* QR Code Ordering */}
        <section className="lg:col-span-3 rounded-2xl bg-[#172554] text-white p-5 flex flex-col items-center justify-between text-center gap-3">
          <div className="bg-white p-2.5 rounded-2xl w-24 h-24 flex items-center justify-center">
            <QrCode className="w-20 h-20 text-[#172554]" />
          </div>
          <div>
            <p className="text-sm font-extrabold text-white">Scan. Order. Skip the Queue.</p>
            <p className="text-[11px] text-slate-300 mt-0.5">Order in 3 taps on mobile</p>
          </div>
          <button
            type="button"
            onClick={onGoToOrder}
            className="w-full h-9 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold inline-flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Open Student Menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </section>
      </div>
    </div>
  );
};
