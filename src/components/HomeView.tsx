import React, { useMemo, useState } from 'react';
import {
  Search,
  Clock,
  Zap,
  Sparkles,
  Check,
  CheckCircle2,
  ChefHat,
  Store,
  QrCode,
  ShoppingBag,
  Plus,
  Minus,
  Star,
  Flame,
  Snowflake,
  Trash2,
  AlertCircle,
  Lock,
  X,
} from 'lucide-react';
import {
  CartItem,
  CategoryFilter,
  MenuItem,
  OrderTicket,
  PickupSlot,
  QuickFilter,
} from '../types';
import { DishArtwork } from './DishArtwork';

interface HomeViewProps {
  menuItems: MenuItem[];
  cart: CartItem[];
  pickupSlots: PickupSlot[];
  selectedSlotId: string;
  onSelectSlot: (slotId: string) => void;
  activeOrder?: OrderTicket;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  activeCategory: CategoryFilter;
  onSelectCategory: (cat: CategoryFilter) => void;
  activeQuickFilters: QuickFilter[];
  onToggleQuickFilter: (qf: QuickFilter) => void;
  onQuickAdd: (item: MenuItem) => void;
  onUpdateCartQty: (cartKey: string, delta: number) => void;
  onRemoveCartItem: (cartKey: string) => void;
  onClearCart: () => void;
  onOpenDishModal: (item: MenuItem) => void;
  onProceedToOrder: () => void;
  onOpenQrPass: (order: OrderTicket) => void;
  onOpenOrdersTab: () => void;
  kitchenStatus: 'OPEN' | 'BUSY' | 'PAUSED';
}

const CATEGORIES: CategoryFilter[] = [
  'All Items',
  'Snacks & Quick Bites',
  'Full Meals',
  'Beverages',
  'Healthy Bowls',
];

export const HomeView: React.FC<HomeViewProps> = ({
  menuItems,
  cart,
  pickupSlots,
  selectedSlotId,
  onSelectSlot,
  activeOrder,
  searchQuery,
  onSearchChange,
  searchInputRef,
  activeCategory,
  onSelectCategory,
  activeQuickFilters,
  onToggleQuickFilter,
  onQuickAdd,
  onUpdateCartQty,
  onRemoveCartItem,
  onClearCart,
  onOpenDishModal,
  onProceedToOrder,
  onOpenQrPass,
  onOpenOrdersTab,
  kitchenStatus,
}) => {
  const [fullSlotWarning, setFullSlotWarning] = useState<string | null>(null);
  const [mobileCartOpen, setMobileCartOpen] = useState(false);

  const filteredItems = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return menuItems.filter((item) => {
      if (activeCategory !== 'All Items' && item.category !== activeCategory) return false;
      if (activeQuickFilters.includes('under60') && item.price >= 60) return false;
      if (activeQuickFilters.includes('ready5') && item.prepMins > 5) return false;
      if (activeQuickFilters.includes('pureVeg') && !item.isVeg) return false;
      if (activeQuickFilters.includes('chefsSpecial') && !item.isChefsSpecial) return false;
      if (q) {
        const hay = `${item.name} ${item.stallName} ${item.description} ${item.category}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [menuItems, searchQuery, activeCategory, activeQuickFilters]);

  const itemTotal = cart.reduce((sum, c) => sum + c.unitPrice * c.quantity, 0);
  const subsidy = itemTotal >= 40 ? 15 : 0;
  const finalTotal = Math.max(0, itemTotal - subsidy);
  const totalCartQty = cart.reduce((sum, c) => sum + c.quantity, 0);

  const recommendedSlot = pickupSlots.find((s) => s.recommended) ?? pickupSlots.find((s) => s.status !== 'full');
  const activeSelectedSlot = pickupSlots.find((s) => s.id === selectedSlotId && s.status !== 'full');
  const hasAvailableSlot = pickupSlots.some((s) => s.status !== 'full');

  const handleSlotClick = (slot: PickupSlot) => {
    if (slot.status === 'full') {
      setFullSlotWarning(
        `${slot.timeRange} is full (0 slots left). We recommend ${recommendedSlot?.timeRange ?? 'the next open slot'} with <2m wait.`
      );
      return;
    }
    setFullSlotWarning(null);
    onSelectSlot(slot.id);
  };

  const renderBadgeIcon = (variant: MenuItem['badgeVariant']) => {
    if (variant === 'bestseller') return <Flame className="w-3 h-3" />;
    if (variant === 'instant') return <Zap className="w-3 h-3 text-[#FF7A30]" />;
    if (variant === 'cold') return <Snowflake className="w-3 h-3 text-[#0284C7]" />;
    return <Clock className="w-3 h-3 text-[#FF7A30]" />;
  };

  const renderCartContent = () => (
    <div className="space-y-5">
      {/* Cart Header */}
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-[#FF7A30]" />
          <h2 className="text-base font-extrabold text-[#172554]">Your Cart</h2>
          <span className="px-2 py-0.5 rounded-full bg-[#FF7A30]/12 text-[#FF7A30] text-[11px] font-bold tnum">
            {totalCartQty} {totalCartQty === 1 ? 'Item' : 'Items'}
          </span>
        </div>

        <div className="flex items-center gap-3">
          {cart.length > 0 && (
            <button
              type="button"
              onClick={onClearCart}
              className="text-xs font-semibold text-[#64748B] hover:text-[#EF4444] cursor-pointer"
            >
              Clear
            </button>
          )}
          {mobileCartOpen && (
            <button
              type="button"
              onClick={() => setMobileCartOpen(false)}
              aria-label="Close mobile cart"
              className="lg:hidden w-8 h-8 rounded-full bg-[#F8FAFC] flex items-center justify-center text-[#172554]"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Cart Items */}
      {cart.length === 0 ? (
        <div className="py-5 text-center rounded-xl bg-[#F8FAFC] border border-dashed border-[#E2E8F0] space-y-1">
          <p className="text-xs font-bold text-[#172554]">Your cart is empty</p>
          <p className="text-[11px] text-[#64748B]">Tap + on any dish to start your order</p>
        </div>
      ) : (
        <div className="divide-y divide-[#F1F5F9] max-h-48 overflow-y-auto pr-1">
          {cart.map((c) => (
            <div key={c.cartKey} className="py-2.5 first:pt-0 last:pb-0 flex items-center justify-between gap-2">
              <div className="min-w-0 flex-1">
                <p className="text-xs font-bold text-[#172554] truncate">{c.name}</p>
                <p className="text-[11px] text-[#64748B] tnum">
                  ₹{c.unitPrice} × {c.quantity} = <strong className="text-[#172554]">₹{c.unitPrice * c.quantity}</strong>
                </p>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <div className="inline-flex items-center rounded-full bg-[#F8FAFC] border border-[#E2E8F0] p-0.5">
                  <button
                    type="button"
                    onClick={() => onUpdateCartQty(c.cartKey, -1)}
                    aria-label={`Decrease ${c.name}`}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#172554] hover:bg-white cursor-pointer"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-5 text-center text-[11px] font-extrabold text-[#172554] tnum">
                    {c.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => onUpdateCartQty(c.cartKey, 1)}
                    aria-label={`Increase ${c.name}`}
                    className="w-6 h-6 rounded-full flex items-center justify-center text-[#172554] hover:bg-white cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => onRemoveCartItem(c.cartKey)}
                  aria-label={`Remove ${c.name}`}
                  className="w-7 h-7 rounded-full hover:bg-[#FEF2F2] text-[#94A3B8] hover:text-[#EF4444] flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Smart Pickup Slot Selection */}
      <div className="pt-3 border-t border-[#F1F5F9] space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#172554]">
            <Clock className="w-3.5 h-3.5 text-[#FF7A30]" />
            Smart Pickup Slot
          </span>
          <span className="text-[10px] font-extrabold uppercase tracking-[0.05em] text-[#047857]">
            SKIP QUEUE
          </span>
        </div>

        {fullSlotWarning && (
          <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-3 text-[11px] text-[#B91C1C] space-y-1.5">
            <div className="flex items-start gap-1.5 font-semibold">
              <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{fullSlotWarning}</span>
            </div>
            {recommendedSlot && (
              <button
                type="button"
                onClick={() => {
                  onSelectSlot(recommendedSlot.id);
                  setFullSlotWarning(null);
                }}
                className="font-extrabold text-[#047857] hover:underline cursor-pointer"
              >
                Switch to {recommendedSlot.timeRange} →
              </button>
            )}
          </div>
        )}

        <div className="space-y-2">
          {pickupSlots.map((slot) => {
            const isFull = slot.status === 'full';
            const isSelected = !isFull && selectedSlotId === slot.id;

            return (
              <button
                key={slot.id}
                type="button"
                disabled={isFull}
                aria-disabled={isFull}
                onClick={() => handleSlotClick(slot)}
                className={`w-full text-left rounded-xl px-3.5 py-2.5 border flex items-center justify-between gap-2 transition-all ${
                  isFull
                    ? 'bg-[#FEF2F2] border-[#FECACA] opacity-75 cursor-not-allowed'
                    : isSelected && slot.status === 'available'
                    ? 'bg-[#ECFDF5] border-[#10B981] ring-1 ring-[#10B981] cursor-pointer'
                    : isSelected
                    ? 'bg-[#FFFBEB] border-[#F59E0B] ring-1 ring-[#F59E0B] cursor-pointer'
                    : slot.status === 'almost_full'
                    ? 'bg-[#FFFBEB]/70 border-[#FDE68A] hover:border-[#F59E0B] cursor-pointer'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#10B981] cursor-pointer'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  {isFull ? (
                    <span className="w-4 h-4 rounded-full bg-[#FECACA]/70 text-[#B91C1C] flex items-center justify-center shrink-0">
                      <Lock className="w-2.5 h-2.5" />
                    </span>
                  ) : (
                    <span
                      className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                        isSelected
                          ? slot.status === 'available'
                            ? 'border-[#2563EB] bg-[#2563EB]'
                            : 'border-[#F59E0B] bg-[#F59E0B]'
                          : 'border-[#CBD5E1] bg-white'
                      }`}
                    >
                      {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </span>
                  )}

                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`text-xs font-extrabold tnum ${
                          isFull ? 'text-[#94A3B8] line-through' : 'text-[#172554]'
                        }`}
                      >
                        {slot.timeRange}
                      </span>
                      {slot.recommended && !isFull && (
                        <span className="px-1.5 py-0.5 rounded bg-[#10B981] text-white text-[9px] font-extrabold uppercase tracking-[0.04em]">
                          RECOMMENDED
                        </span>
                      )}
                    </div>
                    <p
                      className={`text-[10px] font-bold mt-0.5 tnum ${
                        isFull
                          ? 'text-[#B91C1C]'
                          : slot.status === 'almost_full'
                          ? 'text-[#D97706]'
                          : 'text-[#047857]'
                      }`}
                    >
                      {isFull ? 'BLOCKED • 0 slots left' : slot.subtitle}
                    </p>
                  </div>
                </div>

                {isFull ? (
                  <span className="px-2 py-0.5 rounded-full bg-[#EF4444]/12 text-[10px] font-extrabold uppercase tracking-[0.04em] text-[#B91C1C] shrink-0">
                    BLOCKED
                  </span>
                ) : (
                  isSelected &&
                  slot.status === 'available' && (
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                  )
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Totals Breakdown */}
      <div className="pt-3 border-t border-[#F1F5F9] space-y-1.5 text-xs">
        <div className="flex items-center justify-between text-[#64748B]">
          <span>Item Total</span>
          <span className="font-bold text-[#172554] tnum">₹{itemTotal}</span>
        </div>
        <div className="flex items-center justify-between text-[#047857] font-semibold">
          <span>Student Subsidy</span>
          <span className="font-bold tnum">-₹{subsidy}</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-[#F1F5F9]">
          <span className="text-sm font-extrabold text-[#172554]">Total</span>
          <span className="text-lg font-extrabold text-[#FF7A30] tnum">₹{finalTotal}</span>
        </div>
      </div>

      {/* Selected Slot Summary */}
      {activeSelectedSlot && cart.length > 0 && (
        <div className="rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 flex items-center justify-between text-[11px]">
          <span className="font-semibold text-[#64748B]">Booking Slot</span>
          <span className="font-extrabold text-[#172554] tnum">
            {activeSelectedSlot.timeRange} ({activeSelectedSlot.remaining} left)
          </span>
        </div>
      )}

      {/* Paused or Full Slots Notice */}
      {kitchenStatus === 'PAUSED' ? (
        <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-3 text-[11px] font-semibold text-[#B91C1C]">
          Kitchen is temporarily paused to clear the rush. New orders will resume shortly.
        </div>
      ) : (
        !hasAvailableSlot && (
          <div className="rounded-xl bg-[#FEF2F2] border border-[#FECACA] p-3 text-[11px] font-semibold text-[#B91C1C]">
            All upcoming pickup slots are currently full and blocked. Next 15-min slot opens soon.
          </div>
        )
      )}

      {/* Primary Checkout CTA */}
      <button
        type="button"
        disabled={cart.length === 0 || kitchenStatus === 'PAUSED' || !hasAvailableSlot}
        onClick={() => {
          setMobileCartOpen(false);
          onProceedToOrder();
        }}
        className="w-full h-11 px-5 rounded-xl bg-[#FF7A30] hover:bg-[#EA661E] disabled:bg-[#CBD5E1] disabled:cursor-not-allowed text-white text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-sm"
      >
        <Zap className="w-4 h-4 fill-white" />
        <span className="tnum">
          {kitchenStatus === 'PAUSED'
            ? 'Kitchen Paused • Orders Held'
            : !hasAvailableSlot
            ? 'All Slots Full • Blocked'
            : `Proceed to Checkout • ₹${finalTotal}`}
        </span>
      </button>
    </div>
  );

  return (
    <div className="space-y-6 pb-32 lg:pb-12">
      {/* Live Pickup Token Status Strip */}
      {activeOrder && (
        <section
          aria-label="Active Pickup Token"
          className="bg-white rounded-2xl border border-[#E2E8F0] p-4 sm:px-5 shadow-[0_1px_3px_rgba(23,37,84,0.04)] flex flex-col lg:flex-row lg:items-center justify-between gap-5"
        >
          <div className="flex items-center gap-4 min-w-0">
            <button
              type="button"
              onClick={onOpenOrdersTab}
              className="bg-[#172554] hover:bg-[#1E3A8A] text-white rounded-xl px-4 py-2.5 text-center shrink-0 transition-colors cursor-pointer"
            >
              <span className="block text-[9px] font-bold uppercase tracking-[0.08em] text-slate-300">
                PICKUP TOKEN
              </span>
              <span className="block text-lg font-extrabold tracking-tight tnum leading-tight mt-0.5">
                {activeOrder.token}
              </span>
            </button>

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border bg-[#10B981]/10 text-[#047857] border-[#10B981]/25">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                  {activeOrder.stage === 'ready'
                    ? 'Ready for Pickup'
                    : activeOrder.stage === 'preparing'
                    ? 'In Kitchen Prep'
                    : 'Confirmed'}
                </span>
                <span className="text-xs text-[#64748B] tnum">
                  Placed at {activeOrder.placedAt}
                </span>
              </div>

              <p className="text-sm font-bold text-[#172554] truncate">
                {activeOrder.counterName}
              </p>

              <p className="text-xs font-semibold text-[#64748B] flex items-center gap-1 tnum">
                <Clock className="w-3.5 h-3.5 text-[#FF7A30]" />
                <span>Estimated Ready:</span>
                <strong className="text-[#172554]">
                  {activeOrder.stage === 'ready'
                    ? 'Ready Now!'
                    : `${activeOrder.estimatedReady} (~${activeOrder.minsRemaining} mins)`}
                </strong>
              </p>
            </div>
          </div>

          {/* 3-Step Timeline */}
          <div className="flex items-center justify-between sm:justify-center gap-2 sm:gap-4 shrink-0">
            <div className="flex flex-col items-center gap-1">
              <span className="w-8 h-8 rounded-full bg-[#10B981] text-white flex items-center justify-center">
                <Check className="w-4 h-4" />
              </span>
              <span className="text-[11px] font-bold text-[#047857] whitespace-nowrap">
                Confirmed
              </span>
            </div>

            <div className="w-10 sm:w-14 h-[2px] bg-[#10B981] -mt-4" />

            <div className="flex flex-col items-center gap-1">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeOrder.stage === 'ready'
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#FF7A30]/15 text-[#FF7A30] border border-[#FF7A30]/35'
                }`}
              >
                {activeOrder.stage === 'ready' ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <ChefHat className="w-4 h-4" />
                )}
              </span>
              <span
                className={`text-[11px] font-bold whitespace-nowrap ${
                  activeOrder.stage === 'ready' ? 'text-[#047857]' : 'text-[#FF7A30]'
                }`}
              >
                Kitchen Prep
              </span>
            </div>

            <div
              className={`w-10 sm:w-14 h-[2px] -mt-4 ${
                activeOrder.stage === 'ready' ? 'bg-[#10B981]' : 'bg-[#E2E8F0]'
              }`}
            />

            <div className="flex flex-col items-center gap-1">
              <span
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  activeOrder.stage === 'ready'
                    ? 'bg-[#10B981] text-white'
                    : 'bg-[#F1F5F9] text-[#94A3B8] border border-[#E2E8F0]'
                }`}
              >
                <Store className="w-4 h-4" />
              </span>
              <span
                className={`text-[11px] font-semibold whitespace-nowrap ${
                  activeOrder.stage === 'ready' ? 'text-[#047857] font-bold' : 'text-[#64748B]'
                }`}
              >
                Ready at {activeOrder.counterShort}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => onOpenQrPass(activeOrder)}
            className="h-11 px-4 rounded-xl bg-[#172554] hover:bg-[#1E3A8A] text-white text-xs font-bold inline-flex items-center justify-center gap-2 shrink-0 cursor-pointer transition-colors"
          >
            <QrCode className="w-4 h-4" />
            <span>Pickup QR Pass</span>
          </button>
        </section>
      )}

      {/* Welcome & Search Header */}
      <section className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3">
          <div>
            <p
              className={`inline-flex items-center gap-1.5 text-[11px] font-extrabold uppercase tracking-[0.06em] ${
                kitchenStatus === 'PAUSED'
                  ? 'text-[#B91C1C]'
                  : kitchenStatus === 'BUSY'
                  ? 'text-[#B45309]'
                  : 'text-[#FF7A30]'
              }`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${
                  kitchenStatus === 'PAUSED'
                    ? 'bg-[#EF4444]'
                    : kitchenStatus === 'BUSY'
                    ? 'bg-[#F59E0B]'
                    : 'bg-[#10B981]'
                }`}
              />
              {kitchenStatus === 'PAUSED'
                ? 'KITCHEN PAUSED • EXISTING PICKUPS ONLY'
                : kitchenStatus === 'BUSY'
                ? 'PEAK RUSH • +5 MIN PREP TIME'
                : 'FAST-PASS ORDERING ACTIVE • HEY AARAV! 👋'}
            </p>
            <h1 className="text-3xl sm:text-[36px] font-extrabold text-[#172554] tracking-tight leading-tight mt-1">
              What would you like to eat today?
            </h1>
            <p className="text-sm text-[#64748B] mt-1">
              {kitchenStatus === 'PAUSED'
                ? 'Kitchen staff are clearing active trays right now. New checkout is briefly paused.'
                : kitchenStatus === 'BUSY'
                ? 'Lunch rush is high—orders include an extra 5 minutes of kitchen buffer.'
                : 'Good food, zero waiting. Order now and skip the queue.'}
            </p>
          </div>

          <div className="inline-flex items-center gap-2 self-start md:self-end px-3.5 py-2 rounded-full bg-white border border-[#E2E8F0] text-xs font-semibold text-[#172554] tnum shrink-0">
            <Zap
              className={`w-3.5 h-3.5 ${
                kitchenStatus === 'PAUSED'
                  ? 'text-[#EF4444]'
                  : kitchenStatus === 'BUSY'
                  ? 'text-[#F59E0B]'
                  : 'text-[#10B981]'
              }`}
            />
            <span>
              Avg. Pickup Wait:{' '}
              <strong className="font-extrabold">
                {kitchenStatus === 'PAUSED'
                  ? 'Paused'
                  : kitchenStatus === 'BUSY'
                  ? '6m 40s'
                  : '1m 40s'}
              </strong>
            </span>
          </div>
        </div>

        {/* Search + Quick Filters */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              ref={searchInputRef}
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search masala dosa, paneer roll, veg sandwich, cold coffee..."
              aria-label="Search campus menu"
              className="w-full h-11 pl-10 pr-14 rounded-xl bg-white border-[1.5px] border-[#E2E8F0] text-sm text-[#172554] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF7A30] focus:ring-[3px] focus:ring-[#FF7A30]/15"
            />
            <span className="hidden sm:inline-flex items-center justify-center px-1.5 py-0.5 rounded-md bg-[#F1F5F9] border border-[#E2E8F0] text-[11px] font-bold text-[#64748B] absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none">
              ⌘K
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1 lg:pb-0 shrink-0">
            <button
              type="button"
              onClick={() => onToggleQuickFilter('under60')}
              className={`h-10 px-3.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeQuickFilters.includes('under60')
                  ? 'bg-[#172554] text-white border-[#172554]'
                  : 'bg-white text-[#172554] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              Under ₹60
            </button>

            <button
              type="button"
              onClick={() => onToggleQuickFilter('ready5')}
              className={`h-10 px-3.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeQuickFilters.includes('ready5')
                  ? 'bg-[#172554] text-white border-[#172554]'
                  : 'bg-white text-[#172554] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-[#FF7A30]" />
              Ready in 5 min
            </button>

            <button
              type="button"
              onClick={() => onToggleQuickFilter('pureVeg')}
              className={`h-10 px-3.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeQuickFilters.includes('pureVeg')
                  ? 'bg-[#172554] text-white border-[#172554]'
                  : 'bg-white text-[#172554] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#10B981]" />
              Pure Veg
            </button>

            <button
              type="button"
              onClick={() => onToggleQuickFilter('chefsSpecial')}
              className={`h-10 px-3.5 rounded-full text-xs font-semibold border whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition-colors cursor-pointer ${
                activeQuickFilters.includes('chefsSpecial')
                  ? 'bg-[#172554] text-white border-[#172554]'
                  : 'bg-white text-[#172554] border-[#E2E8F0] hover:bg-[#F8FAFC]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F59E0B]" />
              Chef&apos;s Special
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pt-1">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => onSelectCategory(category)}
                className={`h-9 px-4 rounded-xl text-xs font-bold border whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
                  active
                    ? 'bg-[#172554] text-white border-[#172554]'
                    : 'bg-white text-[#172554] border-[#E2E8F0] hover:bg-[#F1F5F9]'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main 12-Col Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
        {/* Left: Menu Catalog */}
        <div className="lg:col-span-8 space-y-4">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-baseline gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-[#172554]">
                Campus Menu
              </h2>
              <span className="text-xs font-medium text-[#64748B] tnum">
                ({filteredItems.length} items available)
              </span>
            </div>

            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#047857]">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Live Kitchen Sync
            </span>
          </div>

          {filteredItems.length === 0 ? (
            <div className="card-elevation-1 rounded-2xl p-10 text-center space-y-3">
              <p className="text-base font-bold text-[#172554]">No menu items match your filter</p>
              <p className="text-xs text-[#64748B]">
                Clear your search or try switching categories to see all dishes.
              </p>
              <button
                type="button"
                onClick={() => {
                  onSelectCategory('All Items');
                  onSearchChange('');
                }}
                className="px-5 py-2 rounded-full bg-[#FF7A30] text-white text-xs font-bold cursor-pointer"
              >
                Show All Items
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {filteredItems.map((item) => {
                const simpleCartItem = cart.find(
                  (c) => c.menuItemId === item.id && c.selectedAddOns.length === 0 && !c.note
                );
                const totalItemCount = cart
                  .filter((c) => c.menuItemId === item.id)
                  .reduce((sum, c) => sum + c.quantity, 0);

                return (
                  <article
                    key={item.id}
                    className="card-elevation-1 rounded-2xl p-3.5 flex flex-col justify-between transition-transform hover:-translate-y-0.5"
                  >
                    <div>
                      <button
                        type="button"
                        onClick={() => onOpenDishModal(item)}
                        className="w-full text-left cursor-pointer group focus-visible:outline-none"
                      >
                        <div className="aspect-[16/10] w-full rounded-xl overflow-hidden bg-[#F8FAFC] relative">
                          <DishArtwork
                            artworkId={item.artworkId}
                            className="transition-transform duration-200 group-hover:scale-[1.03]"
                          />

                          <span
                            className={`absolute top-2.5 left-2.5 px-2.5 py-1 rounded-full text-[11px] font-bold inline-flex items-center gap-1 shadow-xs ${
                              item.badgeVariant === 'bestseller'
                                ? 'bg-[#FF7A30] text-white'
                                : 'bg-white/95 text-[#172554]'
                            }`}
                          >
                            {renderBadgeIcon(item.badgeVariant)}
                            {item.prepBadge}
                          </span>

                          <span
                            title={item.isVeg ? 'Pure Vegetarian' : 'Non-Vegetarian'}
                            className="absolute top-2.5 right-2.5 w-6 h-6 rounded-md bg-white/95 shadow-xs flex items-center justify-center"
                          >
                            <span
                              className={`w-3.5 h-3.5 rounded-[3px] border-[1.5px] flex items-center justify-center ${
                                item.isVeg ? 'border-[#16A34A]' : 'border-[#EF4444]'
                              }`}
                            >
                              <span
                                className={`w-1.5 h-1.5 rounded-full ${
                                  item.isVeg ? 'bg-[#16A34A]' : 'bg-[#EF4444]'
                                }`}
                              />
                            </span>
                          </span>
                        </div>

                        <div className="mt-3 flex items-center justify-between gap-2 text-[11px] font-semibold text-[#64748B]">
                          <span className="tnum">
                            {item.calories} kcal • {item.stallName}
                          </span>
                          <span className="inline-flex items-center gap-1 text-[#172554] font-bold tnum">
                            <Star className="w-3 h-3 fill-[#FF7A30] text-[#FF7A30]" />
                            {item.rating.toFixed(1)}
                          </span>
                        </div>

                        <h3 className="mt-1 text-[15px] font-bold text-[#172554] group-hover:text-[#FF7A30] transition-colors">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-xs text-[#64748B] line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </button>
                    </div>

                    <div className="mt-3.5 pt-2.5 border-t border-[#F1F5F9] flex items-center justify-between gap-3">
                      <span className="text-base font-extrabold text-[#172554] tnum">
                        ₹{item.price}
                      </span>

                      {totalItemCount > 0 && simpleCartItem ? (
                        <div className="inline-flex items-center rounded-full bg-[#FFF4EC] border border-[#FF7A30]/35 p-0.5">
                          <button
                            type="button"
                            onClick={() => onUpdateCartQty(simpleCartItem.cartKey, -1)}
                            aria-label={`Remove one ${item.name}`}
                            className="w-7 h-7 rounded-full flex items-center justify-center text-[#172554] hover:bg-white cursor-pointer"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </button>
                          <span className="w-6 text-center text-xs font-extrabold text-[#172554] tnum">
                            {totalItemCount}
                          </span>
                          <button
                            type="button"
                            onClick={() => onQuickAdd(item)}
                            aria-label={`Add one more ${item.name}`}
                            className="w-7 h-7 rounded-full bg-[#FF7A30] text-white flex items-center justify-center hover:bg-[#EA661E] cursor-pointer"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => onQuickAdd(item)}
                          className="h-8 px-3.5 rounded-full bg-[#FF7A30] hover:bg-[#EA661E] text-white text-xs font-bold inline-flex items-center gap-1 shadow-xs transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>

        {/* Desktop Sticky Cart Sidebar */}
        <aside className="hidden lg:block lg:col-span-4 sticky top-20">
          <div className="card-elevation-1 rounded-2xl p-5">{renderCartContent()}</div>
        </aside>
      </div>

      {/* Mobile Sticky Bottom Cart Bar */}
      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-16 left-4 right-4 z-30">
          <button
            type="button"
            onClick={() => setMobileCartOpen(true)}
            className="w-full h-12 px-4 rounded-2xl bg-[#172554] text-white shadow-lg flex items-center justify-between text-xs font-bold cursor-pointer"
          >
            <span className="inline-flex items-center gap-2 tnum">
              <ShoppingBag className="w-4 h-4 text-[#FF7A30]" />
              {totalCartQty} {totalCartQty === 1 ? 'Item' : 'Items'} • ₹{finalTotal}
            </span>
            <span className="px-3 py-1 rounded-full bg-[#FF7A30] text-white">
              View Cart & Slot →
            </span>
          </button>
        </div>
      )}

      {/* Mobile Slide-Up Cart Drawer */}
      {mobileCartOpen && (
        <div
          className="lg:hidden fixed inset-0 z-50 flex items-end bg-[#172554]/50 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Cart Drawer"
        >
          <div className="w-full bg-white rounded-t-3xl p-5 max-h-[85vh] overflow-y-auto card-elevation-2">
            {renderCartContent()}
          </div>
        </div>
      )}
    </div>
  );
};
