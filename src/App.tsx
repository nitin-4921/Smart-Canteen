import { useEffect, useMemo, useRef, useState } from 'react';
import {
  AddOnOption,
  AppPage,
  CartItem,
  CategoryFilter,
  CookAheadItem,
  ForecastInsight,
  MenuItem,
  OrderStage,
  OrderTicket,
  QuickFilter,
  UserRole,
} from './types';
import {
  INITIAL_CART,
  INITIAL_COOK_AHEAD,
  MENU_ITEMS,
  buildPickupSlots,
  createInitialForecastInsights,
  createInitialOrders,
  formatTime12h,
  getSlotWindowStart,
} from './data/canteenData';
import { Header } from './components/Header';
import { HomeView } from './components/HomeView';
import { MyOrdersView } from './components/MyOrdersView';
import { KitchenDashboard } from './components/KitchenDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { LiveDisplayBoard } from './components/LiveDisplayBoard';
import { LoginView } from './components/LoginView';
import { DishModal } from './components/DishModal';
import { QrPassModal } from './components/QrPassModal';
import { OrderConfirmModal } from './components/OrderConfirmModal';

export default function App() {
  const [activePage, setActivePage] = useState<AppPage>('home');
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [cart, setCart] = useState<CartItem[]>(INITIAL_CART);
  const [selectedSlotId, setSelectedSlotId] = useState<string>('slot-3');
  const [orders, setOrders] = useState<OrderTicket[]>(() =>
    createInitialOrders(new Date())
  );
  const [cookAheadItems, setCookAheadItems] =
    useState<CookAheadItem[]>(INITIAL_COOK_AHEAD);
  const [insights, setInsights] = useState<ForecastInsight[]>(() =>
    createInitialForecastInsights(new Date())
  );
  const [slotAnchorTime, setSlotAnchorTime] = useState<Date>(() =>
    getSlotWindowStart(new Date())
  );
  const [slotBookings, setSlotBookings] = useState<Record<string, number>>({});
  const [kitchenStatus, setKitchenStatus] = useState<'OPEN' | 'BUSY' | 'PAUSED'>(
    'OPEN'
  );

  const pickupSlots = useMemo(
    () => buildPickupSlots(slotAnchorTime, slotBookings),
    [slotAnchorTime, slotBookings]
  );

  // Automatically switch away from a slot if it reaches 0 remaining (blocked)
  useEffect(() => {
    const current = pickupSlots.find((s) => s.id === selectedSlotId);
    if (!current || current.status === 'full') {
      const nextOpen =
        pickupSlots.find((s) => s.recommended && s.status !== 'full') ??
        pickupSlots.find((s) => s.status !== 'full');
      if (nextOpen && nextOpen.id !== selectedSlotId) {
        setSelectedSlotId(nextOpen.id);
      } else if (!nextOpen && selectedSlotId !== '') {
        setSelectedSlotId('');
      }
    }
  }, [pickupSlots, selectedSlotId]);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] =
    useState<CategoryFilter>('All Items');
  const [activeQuickFilters, setActiveQuickFilters] = useState<QuickFilter[]>([]);

  const [modalItem, setModalItem] = useState<MenuItem | null>(null);
  const [qrModalOrder, setQrModalOrder] = useState<OrderTicket | null>(null);
  const [confirmModalOrder, setConfirmModalOrder] = useState<OrderTicket | null>(
    null
  );
  const [tokenCounter, setTokenCounter] = useState<number>(166);
  const [toast, setToast] = useState<string | null>(null);

  const searchInputRef = useRef<HTMLInputElement | null>(null);

  // Live ticking timers for orders in Preparing state + real-time 15-min slot rollover
  useEffect(() => {
    const interval = window.setInterval(() => {
      setOrders((prev) =>
        prev.map((o) =>
          o.stage === 'preparing'
            ? { ...o, elapsedSeconds: o.elapsedSeconds + 1 }
            : o
        )
      );
      const nextWindow = getSlotWindowStart(new Date());
      setSlotAnchorTime((prev) =>
        prev.getTime() !== nextWindow.getTime() ? nextWindow : prev
      );
    }, 1000);
    return () => window.clearInterval(interval);
  }, []);

  // Cmd+K / Ctrl+K shortcut for Student Menu Search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setActivePage('home');
        window.setTimeout(() => searchInputRef.current?.focus(), 40);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (!toast) return;
    const t = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(t);
  }, [toast]);

  const showToast = (msg: string) => setToast(msg);

  const addToCart = (
    item: MenuItem,
    quantity: number,
    selectedAddOns: AddOnOption[],
    note: string
  ) => {
    const addOnKey = selectedAddOns
      .map((a) => a.id)
      .sort()
      .join(',');
    const cartKey = `${item.id}::${addOnKey}::${note}`;
    const unitPrice =
      item.price + selectedAddOns.reduce((sum, a) => sum + a.price, 0);

    setCart((prev) => {
      const existing = prev.find((c) => c.cartKey === cartKey);
      if (existing) {
        return prev.map((c) =>
          c.cartKey === cartKey ? { ...c, quantity: c.quantity + quantity } : c
        );
      }
      return [
        ...prev,
        {
          cartKey,
          menuItemId: item.id,
          name: item.name,
          stallName: item.stallName,
          unitPrice,
          quantity,
          selectedAddOns,
          note: note || undefined,
        },
      ];
    });

    showToast(`Added ${item.name} to cart`);
  };

  const handleQuickAdd = (item: MenuItem) => {
    addToCart(item, 1, [], '');
  };

  const handleUpdateCartQty = (cartKey: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) =>
          c.cartKey === cartKey ? { ...c, quantity: c.quantity + delta } : c
        )
        .filter((c) => c.quantity > 0)
    );
  };

  const handleRemoveCartItem = (cartKey: string) => {
    setCart((prev) => prev.filter((c) => c.cartKey !== cartKey));
  };

  const handleClearCart = () => {
    setCart([]);
    showToast('Cart cleared');
  };

  const handleToggleQuickFilter = (qf: QuickFilter) => {
    setActiveQuickFilters((prev) =>
      prev.includes(qf) ? prev.filter((x) => x !== qf) : [...prev, qf]
    );
  };

  const handleProceedToOrder = () => {
    if (cart.length === 0 || kitchenStatus === 'PAUSED') return;

    const slot =
      pickupSlots.find((s) => s.id === selectedSlotId && s.status !== 'full') ??
      pickupSlots.find((s) => s.recommended && s.status !== 'full') ??
      pickupSlots.find((s) => s.status !== 'full');

    if (!slot) {
      showToast('All pickup slots are full right now. Please wait for the next slot.');
      return;
    }
    const subtotal = cart.reduce((sum, c) => sum + c.unitPrice * c.quantity, 0);
    const subsidy = subtotal >= 40 ? 15 : 0;
    const total = Math.max(0, subtotal - subsidy);

    const prepBuffer = kitchenStatus === 'BUSY' ? 11 : 6;

    const newNum = tokenCounter;
    setTokenCounter((n) => n + 1);

    const now = new Date();
    const placedAt = formatTime12h(now);
    const estDate = new Date(now.getTime() + prepBuffer * 60000);
    const estimatedReady = formatTime12h(estDate);

    const newOrder: OrderTicket = {
      id: `ord-tk${newNum}`,
      token: `TK-${newNum}`,
      studentName: 'Aarav Kulkarni',
      counterName: `Pickup Counter B — ${cart[0].stallName}`,
      counterShort: 'Counter B',
      placedAt,
      estimatedReady,
      minsRemaining: prepBuffer,
      elapsedSeconds: 0,
      stage: 'confirmed',
      slotLabel: slot.timeRange,
      subtotal,
      subsidy,
      total,
      assignedChef: 'Chef Vikram',
      notifiedStudent: false,
      isMyOrder: true,
      items: cart.map((c) => ({
        menuItemId: c.menuItemId,
        name: c.name,
        quantity: c.quantity,
        unitPrice: c.unitPrice,
        addOnsLabel:
          c.selectedAddOns.length > 0
            ? c.selectedAddOns.map((a) => a.label).join(', ')
            : undefined,
      })),
    };

    setSlotBookings((prev) => ({
      ...prev,
      [slot.timeRange]: (prev[slot.timeRange] ?? 0) + 1,
    }));
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setConfirmModalOrder(newOrder);
    showToast(`Order confirmed! Token ${newOrder.token} sent to Kitchen.`);
  };

  const handleAdvanceOrderStage = (orderId: string, nextStage: OrderStage) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              stage: nextStage,
              minsRemaining:
                nextStage === 'ready' || nextStage === 'collected'
                  ? 0
                  : o.minsRemaining,
              notifiedStudent: nextStage === 'ready' ? true : o.notifiedStudent,
            }
          : o
      )
    );
  };

  const handleReorder = (pastOrder: OrderTicket) => {
    const newCartItems: CartItem[] = [];
    pastOrder.items.forEach((line) => {
      const menu = MENU_ITEMS.find(
        (m) => m.id === line.menuItemId || m.name === line.name
      );
      if (menu) {
        newCartItems.push({
          cartKey: `${menu.id}::::`,
          menuItemId: menu.id,
          name: menu.name,
          stallName: menu.stallName,
          unitPrice: menu.price,
          quantity: line.quantity,
          selectedAddOns: [],
        });
      }
    });
    if (newCartItems.length > 0) {
      setCart(newCartItems);
      setActivePage('home');
      showToast(`Loaded items from ${pastOrder.token} into your cart`);
    }
  };

  const handleSimulateIncomingOrder = () => {
    const nextNum = tokenCounter;
    setTokenCounter((n) => n + 1);
    const sampleDish = MENU_ITEMS[nextNum % MENU_ITEMS.length];
    const now = new Date();
    const placedAt = formatTime12h(now);
    const estimatedReady = formatTime12h(
      new Date(now.getTime() + sampleDish.prepMins * 60000)
    );
    const targetSlot =
      pickupSlots.find((s) => s.recommended && s.status !== 'full') ??
      pickupSlots.find((s) => s.status !== 'full') ??
      pickupSlots[2] ??
      pickupSlots[0];

    const simOrder: OrderTicket = {
      id: `ord-tk${nextNum}`,
      token: `TK-${nextNum}`,
      studentName: 'Ishaan Patel',
      counterName: sampleDish.counterLabel,
      counterShort: 'Counter B',
      placedAt,
      estimatedReady,
      minsRemaining: sampleDish.prepMins,
      elapsedSeconds: 0,
      stage: 'confirmed',
      slotLabel: targetSlot.timeRange,
      subtotal: sampleDish.price,
      subsidy: 15,
      total: Math.max(0, sampleDish.price - 15),
      assignedChef: 'Chef Ananya',
      isMyOrder: false,
      items: [
        {
          menuItemId: sampleDish.id,
          name: sampleDish.name,
          quantity: 1,
          unitPrice: sampleDish.price,
        },
      ],
    };

    if (targetSlot.status !== 'full') {
      setSlotBookings((prev) => ({
        ...prev,
        [targetSlot.timeRange]: (prev[targetSlot.timeRange] ?? 0) + 1,
      }));
    }
    setOrders((prev) => [simOrder, ...prev]);
    showToast(`New incoming order ${simOrder.token} (${sampleDish.name})`);
  };

  const handleMarkBatchPrepared = () => {
    setCookAheadItems((prev) => prev.map((c) => ({ ...c, prepared: true })));
    showToast('Cook-ahead batch marked prepared');
  };

  const handleResetBatch = () => {
    setCookAheadItems((prev) =>
      prev.map((c) => ({ ...c, prepared: false, quantity: c.quantity + 2 }))
    );
    showToast('Loaded next 20-minute prep batch');
  };

  const handleSendInsightToKitchen = (insightId: string) => {
    setInsights((prev) =>
      prev.map((ins) =>
        ins.id === insightId ? { ...ins, sentToKitchen: true } : ins
      )
    );
    const insight = insights.find((i) => i.id === insightId);
    if (insight) {
      setCookAheadItems((prev) => [
        ...prev,
        {
          id: `ca-${insightId}`,
          label: insight.title.replace('Prepare ', '').slice(0, 26),
          quantity: 30,
          prepared: false,
        },
      ]);
      showToast('Forecast recommendation pushed to Kitchen Batch Helper');
    }
  };

  const handleSwitchRole = (role: UserRole) => {
    setUserRole(role);
    if (role === 'student') setActivePage('home');
    if (role === 'kitchen') setActivePage('kitchen');
    if (role === 'admin') setActivePage('admin');
    showToast(
      `Switched to ${
        role === 'student'
          ? 'Student'
          : role === 'kitchen'
          ? 'Kitchen Staff'
          : 'Admin'
      } workspace`
    );
  };

  const handleLogin = (role: UserRole) => {
    handleSwitchRole(role);
  };

  const myLiveOrders = useMemo(
    () =>
      orders.filter(
        (o) =>
          o.isMyOrder &&
          (o.stage === 'confirmed' ||
            o.stage === 'preparing' ||
            o.stage === 'ready')
      ),
    [orders]
  );

  const primaryActiveOrder = myLiveOrders[0];

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#172554]">
      <Header
        activePage={activePage}
        onNavigate={setActivePage}
        userRole={userRole}
        onSwitchRole={handleSwitchRole}
        liveOrdersCount={myLiveOrders.length}
        onTriggerSearchFocus={() =>
          window.setTimeout(() => searchInputRef.current?.focus(), 40)
        }
        latestOrder={primaryActiveOrder}
      />

      <main className="flex-1 w-full max-w-[1280px] mx-auto px-4 sm:px-8 pt-5 sm:pt-6">
        {(activePage === 'home' || activePage === 'menu') && (
          <HomeView
            menuItems={MENU_ITEMS}
            cart={cart}
            pickupSlots={pickupSlots}
            selectedSlotId={selectedSlotId}
            onSelectSlot={setSelectedSlotId}
            activeOrder={primaryActiveOrder}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            searchInputRef={searchInputRef}
            activeCategory={activeCategory}
            onSelectCategory={setActiveCategory}
            activeQuickFilters={activeQuickFilters}
            onToggleQuickFilter={handleToggleQuickFilter}
            onQuickAdd={handleQuickAdd}
            onUpdateCartQty={handleUpdateCartQty}
            onRemoveCartItem={handleRemoveCartItem}
            onClearCart={handleClearCart}
            onOpenDishModal={setModalItem}
            onProceedToOrder={handleProceedToOrder}
            onOpenQrPass={setQrModalOrder}
            onOpenOrdersTab={() => setActivePage('orders')}
            kitchenStatus={kitchenStatus}
          />
        )}

        {activePage === 'orders' && (
          <MyOrdersView
            orders={orders}
            onOpenQrPass={setQrModalOrder}
            onReorder={handleReorder}
            onBackToMenu={() => setActivePage('home')}
          />
        )}

        {activePage === 'kitchen' && (
          <KitchenDashboard
            orders={orders}
            cookAheadItems={cookAheadItems}
            onAdvanceStage={handleAdvanceOrderStage}
            onMarkBatchPrepared={handleMarkBatchPrepared}
            onResetBatch={handleResetBatch}
            onSimulateIncomingOrder={handleSimulateIncomingOrder}
            kitchenStatus={kitchenStatus}
            onChangeKitchenStatus={setKitchenStatus}
          />
        )}

        {activePage === 'admin' && (
          <AdminDashboard
            insights={insights}
            onSendInsightToKitchen={handleSendInsightToKitchen}
          />
        )}

        {activePage === 'display' && (
          <LiveDisplayBoard
            orders={orders}
            pickupSlots={pickupSlots}
            kitchenStatus={kitchenStatus}
            onGoToOrder={() => setActivePage('home')}
          />
        )}

        {activePage === 'login' && (
          <LoginView currentRole={userRole} onLogin={handleLogin} />
        )}
      </main>

      <DishModal
        item={modalItem}
        onClose={() => setModalItem(null)}
        onConfirmAdd={addToCart}
      />

      <QrPassModal
        order={qrModalOrder}
        onClose={() => setQrModalOrder(null)}
      />

      <OrderConfirmModal
        order={confirmModalOrder}
        onClose={() => setConfirmModalOrder(null)}
        onTrackOrder={() => {
          setConfirmModalOrder(null);
          setActivePage('orders');
        }}
      />

      {toast && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-20 md:bottom-6 right-4 sm:right-8 z-50 px-5 py-3 rounded-full bg-[#172554] text-white text-xs font-bold card-elevation-2"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
