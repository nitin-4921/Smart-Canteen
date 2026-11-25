import React, { useState } from 'react';
import {
  TrendingUp,
  IndianRupee,
  Leaf,
  Clock,
  Sparkles,
  Calendar,
  CheckCircle2,
  Send,
} from 'lucide-react';
import { ANALYTICS_BY_RANGE } from '../data/canteenData';
import { AnalyticsRange, ForecastInsight, SlotDensityPoint } from '../types';

interface AdminDashboardProps {
  insights: ForecastInsight[];
  onSendInsightToKitchen: (insightId: string) => void;
}

const RANGE_OPTIONS: { id: AnalyticsRange; label: string }[] = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: 'Last 7 Days' },
  { id: '30d', label: 'Last 30 Days' },
  { id: 'custom', label: 'Custom Range' },
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  insights,
  onSendInsightToKitchen,
}) => {
  const [range, setRange] = useState<AnalyticsRange>('today');
  const [customStart, setCustomStart] = useState<string>('2026-11-21');
  const [customEnd, setCustomEnd] = useState<string>('2026-11-25');
  const [hoveredSlot, setHoveredSlot] = useState<SlotDensityPoint | null>(null);

  const dataset = ANALYTICS_BY_RANGE[range];
  const maxOrders = Math.max(...dataset.slots.map((s) => s.orders));

  return (
    <div className="space-y-6 pb-20 md:pb-12">
      {/* Header + Date Filters */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-[0.06em] text-[#FF7A30]">
            Operations Intelligence • North Quad Canteen
          </p>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#172554] tracking-tight mt-0.5">
            Admin Analytics Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1">
            Monitor lunch-hour order density, waste reduction, and AI cook-ahead demand insights.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="inline-flex items-center rounded-xl bg-white border border-[#E2E8F0] p-1">
            {RANGE_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => {
                  setRange(opt.id);
                  setHoveredSlot(null);
                }}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                  range === opt.id
                    ? 'bg-[#172554] text-white'
                    : 'text-[#64748B] hover:text-[#172554]'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>

          {range === 'custom' && (
            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-xl px-3 py-1.5 text-xs">
              <Calendar className="w-3.5 h-3.5 text-[#FF7A30]" />
              <input
                type="date"
                value={customStart}
                onChange={(e) => setCustomStart(e.target.value)}
                aria-label="Start date"
                className="text-xs font-semibold text-[#172554] focus:outline-none tnum"
              />
              <span className="text-[#64748B]">–</span>
              <input
                type="date"
                value={customEnd}
                onChange={(e) => setCustomEnd(e.target.value)}
                aria-label="End date"
                className="text-xs font-semibold text-[#172554] focus:outline-none tnum"
              />
            </div>
          )}
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-elevation-1 rounded-2xl p-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#64748B]">Daily Orders</p>
            <p className="mt-1.5 text-3xl font-extrabold text-[#172554] tnum">
              {dataset.kpis.dailyOrders}
            </p>
            <p className="mt-1 text-xs font-bold text-[#047857]">{dataset.kpis.ordersDelta}</p>
          </div>
          <span className="w-10 h-10 rounded-xl bg-[#FF7A30]/12 text-[#FF7A30] flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5" />
          </span>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#64748B]">Gross Revenue</p>
            <p className="mt-1.5 text-3xl font-extrabold text-[#172554] tnum">
              {dataset.kpis.grossRevenue}
            </p>
            <p className="mt-1 text-xs font-bold text-[#047857]">{dataset.kpis.revenueDelta}</p>
          </div>
          <span className="w-10 h-10 rounded-xl bg-[#172554]/10 text-[#172554] flex items-center justify-center shrink-0">
            <IndianRupee className="w-5 h-5" />
          </span>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#64748B]">Food Waste Prevented</p>
            <p className="mt-1.5 text-3xl font-extrabold text-[#10B981] tnum">
              {dataset.kpis.wastePrevented}
            </p>
            <p className="mt-1 text-xs font-bold text-[#047857]">{dataset.kpis.wasteDelta}</p>
          </div>
          <span className="w-10 h-10 rounded-xl bg-[#10B981]/12 text-[#10B981] flex items-center justify-center shrink-0">
            <Leaf className="w-5 h-5" />
          </span>
        </div>

        <div className="card-elevation-1 rounded-2xl p-5 flex items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold text-[#64748B]">Queue Wait Reduction</p>
            <p className="mt-1.5 text-3xl font-extrabold text-[#FF7A30] tnum">
              {dataset.kpis.queueReduction}
            </p>
            <p className="mt-1 text-xs font-bold text-[#64748B]">{dataset.kpis.queueDelta}</p>
          </div>
          <span className="w-10 h-10 rounded-xl bg-[#F59E0B]/15 text-[#B45309] flex items-center justify-center shrink-0">
            <Clock className="w-5 h-5" />
          </span>
        </div>
      </section>

      {/* Middle Split: Peak 15-Min Slot Bar Chart + Top 5 Food Items */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Peak 15-Minute Slot Analysis */}
        <section className="lg:col-span-7 card-elevation-1 rounded-2xl p-6 space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-base font-extrabold text-[#172554]">
                Peak 15-Minute Slot Analysis (11:30 AM – 3:00 PM)
              </h2>
              <p className="text-xs text-[#64748B]">
                Hover or tap any bar to inspect slot order density and capacity.
              </p>
            </div>
            <div className="text-xs font-bold text-[#FF7A30] tnum">
              {hoveredSlot
                ? `${hoveredSlot.slot}: ${hoveredSlot.orders} orders (${hoveredSlot.capacityPct}%)`
                : 'Peak: 12:45–1:00 PM (100%)'}
            </div>
          </div>

          <div className="h-56 flex items-end gap-1.5 sm:gap-2.5 pt-6 pb-2 border-b border-[#E2E8F0]">
            {dataset.slots.map((point) => {
              const heightPct = Math.max(12, Math.round((point.orders / maxOrders) * 100));
              const isPeak = point.level === 'high';
              const isSelected = hoveredSlot?.slot === point.slot;

              return (
                <button
                  key={point.slot}
                  type="button"
                  onMouseEnter={() => setHoveredSlot(point)}
                  onClick={() => setHoveredSlot(point)}
                  className="flex-1 h-full flex flex-col items-center justify-end gap-1.5 group cursor-pointer focus-visible:outline-none"
                >
                  <span
                    className={`text-[10px] font-extrabold tnum transition-opacity ${
                      isSelected ? 'opacity-100 text-[#172554]' : 'opacity-0 group-hover:opacity-100 text-[#64748B]'
                    }`}
                  >
                    {point.orders}
                  </span>
                  <div
                    style={{ height: `${heightPct}%` }}
                    className={`w-full rounded-t-lg transition-all duration-200 ${
                      isSelected
                        ? 'bg-[#172554]'
                        : isPeak
                        ? 'bg-[#FF7A30] group-hover:bg-[#EA661E]'
                        : point.level === 'medium'
                        ? 'bg-[#F59E0B]/80 group-hover:bg-[#F59E0B]'
                        : 'bg-[#CBD5E1] group-hover:bg-[#94A3B8]'
                    }`}
                  />
                  <span className="text-[9px] sm:text-[10px] font-semibold text-[#64748B] tnum">
                    {point.shortLabel}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="flex items-center gap-5 text-[11px] font-semibold text-[#64748B]">
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#FF7A30]" />
              Peak Lunch Rush (≥80%)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#F59E0B]/80" />
              Moderate (50–79%)
            </span>
            <span className="inline-flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-[#CBD5E1]" />
              Off-Peak (&lt;50%)
            </span>
          </div>
        </section>

        {/* Top 5 Food Items */}
        <section className="lg:col-span-5 card-elevation-1 rounded-2xl p-6 space-y-4">
          <div>
            <h2 className="text-base font-extrabold text-[#172554]">Top 5 Food Items</h2>
            <p className="text-xs text-[#64748B]">Ranked by order volume and revenue share</p>
          </div>

          <div className="space-y-4">
            {dataset.topItems.map((item, idx) => (
              <div key={item.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#172554]">
                    <span className="text-[#FF7A30] tnum mr-1.5">0{idx + 1}.</span>
                    {item.name}
                  </span>
                  <span className="font-extrabold text-[#172554] tnum">
                    ₹{item.revenue.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="h-2 rounded-full bg-[#F1F5F9] overflow-hidden">
                  <div
                    style={{ width: `${Math.min(100, item.demandPct * 3)}%` }}
                    className="h-full rounded-full bg-[#FF7A30]"
                  />
                </div>
                <div className="flex items-center justify-between text-[11px] text-[#64748B] tnum">
                  <span>{item.ordersSold} orders sold</span>
                  <span className="font-bold text-[#047857]">{item.demandPct}% demand share</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Bottom Split: AI Cook-Ahead Forecasting + Slot Occupancy Heatmap */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* AI Demand Forecasting */}
        <section className="lg:col-span-6 card-elevation-1 rounded-2xl p-6 space-y-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF7A30]" />
            <h2 className="text-base font-extrabold text-[#172554]">
              AI Cook-Ahead Demand Forecasting
            </h2>
          </div>

          <div className="space-y-3">
            {insights.map((ins) => (
              <div
                key={ins.id}
                className="rounded-xl p-4 bg-[#F8FAFC] border border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="space-y-1">
                  <p className="text-xs sm:text-sm font-bold text-[#172554]">{ins.title}</p>
                  <p className="text-xs text-[#64748B]">{ins.detail}</p>
                  <span className="inline-block text-[11px] font-extrabold text-[#047857]">
                    {ins.impactLabel}
                  </span>
                </div>

                {ins.sentToKitchen ? (
                  <span className="px-3.5 py-2 rounded-xl bg-[#10B981]/15 text-[#047857] text-xs font-bold inline-flex items-center gap-1.5 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Sent to KDS
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={() => onSendInsightToKitchen(ins.id)}
                    className="h-9 px-3.5 rounded-xl bg-[#172554] hover:bg-[#1E3A8A] text-white text-xs font-bold inline-flex items-center gap-1.5 shrink-0 cursor-pointer transition-colors"
                  >
                    <Send className="w-3.5 h-3.5 text-[#FF7A30]" />
                    <span>Send to Kitchen</span>
                  </button>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Slot Occupancy Heatmap */}
        <section className="lg:col-span-6 card-elevation-1 rounded-2xl p-6 space-y-4">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div>
              <h2 className="text-base font-extrabold text-[#172554]">
                Slot Occupancy Heatmap (11:30 AM – 3:00 PM)
              </h2>
              <p className="text-xs text-[#64748B]">15-minute pickup capacity utilization</p>
            </div>

            <div className="flex items-center gap-3 text-[11px] font-bold">
              <span className="text-[#047857]">● Low</span>
              <span className="text-[#D97706]">● Medium</span>
              <span className="text-[#B91C1C]">● High</span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5">
            {dataset.slots.map((slot) => {
              const colorStyle =
                slot.level === 'low'
                  ? 'bg-[#ECFDF5] border-[#10B981]/35 text-[#047857]'
                  : slot.level === 'medium'
                  ? 'bg-[#FFFBEB] border-[#F59E0B]/40 text-[#B45309]'
                  : 'bg-[#FEF2F2] border-[#EF4444]/40 text-[#B91C1C]';

              return (
                <div key={slot.slot} className={`rounded-xl p-3 border ${colorStyle}`}>
                  <p className="text-[11px] font-bold tnum">{slot.slot}</p>
                  <div className="mt-1.5 flex items-baseline justify-between">
                    <span className="text-lg font-extrabold tnum">{slot.capacityPct}%</span>
                    <span className="text-[10px] font-semibold tnum">{slot.orders} ord</span>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
