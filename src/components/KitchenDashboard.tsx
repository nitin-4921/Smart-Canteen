import React, { useEffect, useMemo, useState } from 'react';
import {
  ChefHat,
  Volume2,
  VolumeX,
  Search,
  Printer,
  Clock,
  CheckCircle2,
  Flame,
  AlertTriangle,
  Plus,
  BellRing,
  X,
} from 'lucide-react';
import { CookAheadItem, OrderStage, OrderTicket } from '../types';

interface KitchenDashboardProps {
  orders: OrderTicket[];
  cookAheadItems: CookAheadItem[];
  onAdvanceStage: (orderId: string, nextStage: OrderStage) => void;
  onMarkBatchPrepared: () => void;
  onResetBatch: () => void;
  onSimulateIncomingOrder: () => void;
  kitchenStatus: 'OPEN' | 'BUSY' | 'PAUSED';
  onChangeKitchenStatus: (status: 'OPEN' | 'BUSY' | 'PAUSED') => void;
}

export const KitchenDashboard: React.FC<KitchenDashboardProps> = ({
  orders,
  cookAheadItems,
  onAdvanceStage,
  onMarkBatchPrepared,
  onResetBatch,
  onSimulateIncomingOrder,
  kitchenStatus,
  onChangeKitchenStatus,
}) => {
  const [nowStr, setNowStr] = useState<string>(() =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  );
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [tokenSearch, setTokenSearch] = useState<string>('');
  const [slotFilter, setSlotFilter] = useState<string>('all');
  const [printTicket, setPrintTicket] = useState<OrderTicket | null>(null);

  useEffect(() => {
    const id = window.setInterval(() => {
      setNowStr(
        new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    }, 1000);
    return () => window.clearInterval(id);
  }, []);

  const playChime = () => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(660, ctx.currentTime);
      osc.frequency.setValueAtTime(880, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.25);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.25);
    } catch {
      // Ignore audio restriction if browser blocks autoplay
    }
  };

  const activeKitchenOrders = useMemo(() => {
    const q = tokenSearch.trim().toLowerCase();
    return orders.filter((o) => {
      if (o.stage === 'cancelled') return false;
      if (slotFilter !== 'all' && o.slotLabel !== slotFilter) return false;
      if (q) {
        const hay = `${o.token} ${o.studentName} ${o.items.map((i) => i.name).join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [orders, tokenSearch, slotFilter]);

  const newOrders = activeKitchenOrders.filter((o) => o.stage === 'confirmed');
  const preparingOrders = activeKitchenOrders.filter((o) => o.stage === 'preparing');
  const readyOrders = activeKitchenOrders.filter((o) => o.stage === 'ready');
  const completedCount = orders.filter((o) => o.stage === 'collected').length + 412;

  const allBatchPrepared = cookAheadItems.every((c) => c.prepared);

  const formatTimer = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
  };

  const uniqueSlots = Array.from(new Set(orders.map((o) => o.slotLabel)));

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* KDS Top Header */}
      <section className="card-elevation-1 rounded-2xl p-5 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-2xl bg-[#172554] text-white flex items-center justify-center shrink-0">
            <ChefHat className="w-5 h-5 text-[#FF7A30]" />
          </div>
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl sm:text-2xl font-extrabold text-[#172554] tracking-tight">
                Kitchen Dashboard
              </h1>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[11px] font-extrabold uppercase tracking-[0.04em] ${
                  kitchenStatus === 'OPEN'
                    ? 'bg-[#10B981]/15 text-[#047857]'
                    : kitchenStatus === 'BUSY'
                    ? 'bg-[#F59E0B]/15 text-[#B45309]'
                    : 'bg-[#EF4444]/15 text-[#B91C1C]'
                }`}
              >
                Kitchen Status: {kitchenStatus}
              </span>
            </div>
            <p className="text-xs text-[#64748B] mt-0.5 tnum">
              Live Clock: <strong className="text-[#172554]">{nowStr}</strong> • Staff: Chef Vikram (Head Line)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="inline-flex items-center rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] p-1">
            {(['OPEN', 'BUSY', 'PAUSED'] as const).map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => onChangeKitchenStatus(st)}
                className={`px-3 py-1.5 rounded-lg text-[11px] font-bold cursor-pointer transition-colors ${
                  kitchenStatus === st
                    ? st === 'OPEN'
                      ? 'bg-[#10B981] text-white'
                      : st === 'BUSY'
                      ? 'bg-[#F59E0B] text-[#172554]'
                      : 'bg-[#EF4444] text-white'
                    : 'text-[#64748B] hover:text-[#172554]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => {
              setSoundEnabled((prev) => !prev);
              if (!soundEnabled) playChime();
            }}
            className={`h-10 px-3.5 rounded-xl border text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer transition-colors ${
              soundEnabled
                ? 'bg-[#172554] text-white border-[#172554]'
                : 'bg-white text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-[#10B981]" /> : <VolumeX className="w-4 h-4" />}
            <span>{soundEnabled ? 'Sound On' : 'Muted'}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              playChime();
              onSimulateIncomingOrder();
            }}
            className="h-10 px-4 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Simulate Order</span>
          </button>
        </div>
      </section>

      {/* 5 Executive Kitchen KPI Cards */}
      <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="card-elevation-1 rounded-2xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#64748B]">
            Total Incoming
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#172554] tnum">
            {orders.filter((o) => o.stage !== 'cancelled').length + 410}
          </p>
          <p className="text-[11px] text-[#047857] font-semibold mt-0.5">Today&apos;s lunch rush</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#64748B]">
            Pending Orders
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#FF7A30] tnum">
            {newOrders.length}
          </p>
          <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Awaiting kitchen accept</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#64748B]">
            Preparing Now
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#F59E0B] tnum">
            {preparingOrders.length}
          </p>
          <p className="text-[11px] text-[#64748B] font-medium mt-0.5">Active on burners</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-4">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#64748B]">
            Completed Today
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#10B981] tnum">
            {completedCount}
          </p>
          <p className="text-[11px] text-[#047857] font-semibold mt-0.5">98.4% on-time rate</p>
        </div>

        <div className="card-elevation-1 rounded-2xl p-4 col-span-2 sm:col-span-1">
          <p className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#64748B]">
            Avg Prep Time
          </p>
          <p className="mt-1.5 text-2xl font-extrabold text-[#172554] tnum">4.2 min</p>
          <p className="text-[11px] text-[#047857] font-semibold mt-0.5">Target ≤ 5.0 min</p>
        </div>
      </section>

      {/* Cook-Ahead Batch Helper */}
      <section className="rounded-2xl bg-[#172554] text-white p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
        <div className="space-y-3 flex-1">
          <div className="flex items-center gap-2">
            <Flame className="w-4 h-4 text-[#FF7A30]" />
            <h2 className="text-sm font-extrabold uppercase tracking-[0.05em] text-[#FFB693]">
              Cook-Ahead Batch Helper • Upcoming 20-Minute Demand
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {cookAheadItems.map((batch) => (
              <div
                key={batch.id}
                className={`rounded-xl px-3.5 py-2.5 border ${
                  batch.prepared
                    ? 'bg-[#10B981]/20 border-[#10B981]/40'
                    : 'bg-white/10 border-white/15'
                }`}
              >
                <p className="text-xl font-extrabold tnum leading-tight">
                  {batch.quantity}
                </p>
                <p className="text-xs font-semibold text-slate-200 mt-0.5">{batch.label}</p>
                {batch.prepared && (
                  <p className="text-[10px] font-bold text-[#6FFBE0] mt-1">Batch Ready ✓</p>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          {allBatchPrepared ? (
            <button
              type="button"
              onClick={onResetBatch}
              className="h-11 px-5 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-bold cursor-pointer transition-colors"
            >
              Load Next 20m Batch
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                playChime();
                onMarkBatchPrepared();
              }}
              className="h-11 px-5 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold inline-flex items-center gap-2 cursor-pointer transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Mark Batch as Prepared</span>
            </button>
          )}
        </div>
      </section>

      {/* Filter & Token Search Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="search"
            value={tokenSearch}
            onChange={(e) => setTokenSearch(e.target.value)}
            placeholder="Search token (TK-142) or dish..."
            className="w-full h-10 pl-10 pr-4 rounded-xl bg-white border border-[#E2E8F0] text-xs font-medium text-[#172554] focus:outline-none focus:border-[#FF7A30]"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar">
          <button
            type="button"
            onClick={() => setSlotFilter('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 cursor-pointer ${
              slotFilter === 'all'
                ? 'bg-[#172554] text-white border-[#172554]'
                : 'bg-white text-[#64748B] border-[#E2E8F0]'
            }`}
          >
            All Slots
          </button>
          {uniqueSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => setSlotFilter(slot)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 cursor-pointer tnum ${
                slotFilter === slot
                  ? 'bg-[#172554] text-white border-[#172554]'
                  : 'bg-white text-[#64748B] border-[#E2E8F0]'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
      </div>

      {/* Three-Column Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Column 1: New Orders */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF7A30]" />
              <h3 className="text-sm font-extrabold text-[#172554]">New Orders</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#FF7A30]/12 text-[#FF7A30] text-xs font-extrabold tnum">
              {newOrders.length}
            </span>
          </div>

          {newOrders.length === 0 ? (
            <p className="text-xs text-[#64748B] py-10 text-center">
              No pending incoming tickets.
            </p>
          ) : (
            <div className="space-y-3">
              {newOrders.map((ord) => {
                const isDelayed = ord.elapsedSeconds > 420;
                return (
                  <div
                    key={ord.id}
                    className={`rounded-xl p-4 border space-y-3 ${
                      isDelayed
                        ? 'bg-[#FEF2F2] border-[#EF4444]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xl font-extrabold text-[#172554] tnum">
                        {ord.token}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {isDelayed && (
                          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#EF4444] text-white text-[10px] font-bold">
                            <AlertTriangle className="w-3 h-3" />
                            DELAYED
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={() => setPrintTicket(ord)}
                          aria-label={`Print ticket ${ord.token}`}
                          className="w-7 h-7 rounded-lg bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#172554] flex items-center justify-center cursor-pointer"
                        >
                          <Printer className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[11px] font-semibold text-[#64748B] tnum">
                      Slot: {ord.slotLabel} • {ord.minsRemaining}m remaining
                    </p>

                    <div className="space-y-1 text-xs text-[#172554] bg-white rounded-lg p-2.5 border border-[#E2E8F0]">
                      {ord.items.map((item, idx) => (
                        <p key={idx} className="font-bold">
                          <span className="text-[#FF7A30] tnum mr-1.5">{item.quantity}×</span>
                          {item.name}
                        </p>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playChime();
                        onAdvanceStage(ord.id, 'preparing');
                      }}
                      className="w-full h-10 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      Accept / Start Preparing
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Column 2: Preparing Now */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#F59E0B]" />
              <h3 className="text-sm font-extrabold text-[#172554]">Preparing Now</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#F59E0B]/15 text-[#B45309] text-xs font-extrabold tnum">
              {preparingOrders.length}
            </span>
          </div>

          {preparingOrders.length === 0 ? (
            <p className="text-xs text-[#64748B] py-10 text-center">
              Nothing currently cooking on the line.
            </p>
          ) : (
            <div className="space-y-3">
              {preparingOrders.map((ord) => {
                const isDelayed = ord.elapsedSeconds > 360;
                return (
                  <div
                    key={ord.id}
                    className={`rounded-xl p-4 border space-y-3 ${
                      isDelayed
                        ? 'bg-[#FFFBEB] border-[#F59E0B]'
                        : 'bg-[#F8FAFC] border-[#E2E8F0]'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-xl font-extrabold text-[#172554] tnum">
                        {ord.token}
                      </span>
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold tnum ${
                          isDelayed
                            ? 'bg-[#EF4444]/15 text-[#B91C1C]'
                            : 'bg-[#F59E0B]/15 text-[#B45309]'
                        }`}
                      >
                        <Clock className="w-3.5 h-3.5" />
                        {formatTimer(ord.elapsedSeconds)}
                      </span>
                    </div>

                    <p className="text-[11px] font-semibold text-[#64748B]">
                      Assigned: <strong className="text-[#172554]">{ord.assignedChef ?? 'Chef Vikram'}</strong> • {ord.counterShort}
                    </p>

                    <div className="space-y-1 text-xs text-[#172554] bg-white rounded-lg p-2.5 border border-[#E2E8F0]">
                      {ord.items.map((item, idx) => (
                        <p key={idx} className="font-bold">
                          <span className="text-[#FF7A30] tnum mr-1.5">{item.quantity}×</span>
                          {item.name}
                        </p>
                      ))}
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        playChime();
                        onAdvanceStage(ord.id, 'ready');
                      }}
                      className="w-full h-10 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white text-xs font-bold cursor-pointer transition-colors"
                    >
                      Mark Ready
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* Column 3: Ready for Pickup */}
        <section className="bg-white rounded-2xl border border-[#E2E8F0] p-4 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#10B981]" />
              <h3 className="text-sm font-extrabold text-[#172554]">Ready for Pickup</h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#047857] text-xs font-extrabold tnum">
              {readyOrders.length}
            </span>
          </div>

          {readyOrders.length === 0 ? (
            <p className="text-xs text-[#64748B] py-10 text-center">
              Pickup counter shelf is clear.
            </p>
          ) : (
            <div className="space-y-3">
              {readyOrders.map((ord) => (
                <div
                  key={ord.id}
                  className="rounded-xl p-4 bg-[#ECFDF5] border border-[#10B981]/35 space-y-3"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xl font-extrabold text-[#172554] tnum">
                      {ord.token}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-[#10B981] text-white text-[10px] font-bold">
                      {ord.counterShort}
                    </span>
                  </div>

                  <p className="text-[11px] font-semibold text-[#047857] inline-flex items-center gap-1.5">
                    <BellRing className="w-3.5 h-3.5" />
                    Student notified ({ord.studentName})
                  </p>

                  <div className="space-y-1 text-xs text-[#172554] bg-white rounded-lg p-2.5 border border-[#10B981]/25">
                    {ord.items.map((item, idx) => (
                      <p key={idx} className="font-bold">
                        <span className="text-[#047857] tnum mr-1.5">{item.quantity}×</span>
                        {item.name}
                      </p>
                    ))}
                  </div>

                  <button
                    type="button"
                    onClick={() => onAdvanceStage(ord.id, 'collected')}
                    className="w-full h-10 rounded-xl bg-[#172554] hover:bg-[#1E3A8A] text-white text-xs font-bold cursor-pointer transition-colors"
                  >
                    Complete Handover
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      {/* Print Ticket Modal */}
      {printTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#172554]/50 backdrop-blur-sm p-4"
          role="dialog"
          aria-modal="true"
        >
          <div className="w-full max-w-sm bg-white rounded-2xl p-6 card-elevation-2 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-dashed border-[#CBD5E1]">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.06em] text-[#64748B]">
                  KITCHEN ORDER TICKET
                </p>
                <h3 className="text-2xl font-extrabold text-[#172554] tnum">
                  {printTicket.token}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setPrintTicket(null)}
                className="w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#172554] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#64748B] space-y-1 tnum">
              <p>Student: <strong className="text-[#172554]">{printTicket.studentName}</strong></p>
              <p>Counter: <strong className="text-[#172554]">{printTicket.counterShort}</strong></p>
              <p>Pickup Slot: <strong className="text-[#172554]">{printTicket.slotLabel}</strong></p>
            </div>

            <div className="py-3 border-y border-dashed border-[#CBD5E1] space-y-1.5 text-sm font-bold text-[#172554]">
              {printTicket.items.map((item, i) => (
                <p key={i}>
                  <span className="text-[#FF7A30] tnum mr-2">{item.quantity}×</span>
                  {item.name}
                </p>
              ))}
            </div>

            <button
              type="button"
              onClick={() => {
                window.print();
                setPrintTicket(null);
              }}
              className="w-full h-10 rounded-xl bg-[#172554] text-white text-xs font-bold inline-flex items-center justify-center gap-2 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Send to Thermal Printer</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
