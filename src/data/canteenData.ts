import {
  AnalyticsRange,
  CartItem,
  CookAheadItem,
  ForecastInsight,
  MenuItem,
  OrderTicket,
  PickupSlot,
  SlotDensityPoint,
  TopFoodMetric,
} from '../types';

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'item-dosa',
    name: 'Crispy Masala Dosa',
    stallName: 'South Hut',
    counterLabel: 'Counter B — Quick Bites & South Indian',
    category: 'Snacks & Quick Bites',
    description:
      'Golden fermented crepe stuffed with spiced potato mash, served with warm sambhar & coconut dip.',
    price: 60,
    calories: 320,
    prepMins: 5,
    prepBadge: '5m prep',
    badgeVariant: 'default',
    rating: 4.8,
    isVeg: true,
    isChefsSpecial: true,
    artworkId: 'masala_dosa',
    addOns: [
      { id: 'ghee', label: 'Pure Ghee Roast', price: 15 },
      { id: 'cheese', label: 'Extra Cheese', price: 20 },
      { id: 'chutney', label: 'Extra Gunpowder & Chutney', price: 10 },
    ],
  },
  {
    id: 'item-paneer-roll',
    name: 'Paneer Tikka Roll',
    stallName: 'The Paratha Co.',
    counterLabel: 'Counter A — Wraps & Rolls',
    category: 'Full Meals',
    description:
      'Tandoor grilled cottage cheese cubes layered with mint chutney inside a crisp flaky paratha.',
    price: 80,
    calories: 380,
    prepMins: 8,
    prepBadge: 'Bestseller',
    badgeVariant: 'bestseller',
    rating: 4.9,
    isVeg: true,
    isChefsSpecial: true,
    artworkId: 'paneer_tikka_roll',
    addOns: [
      { id: 'double-paneer', label: 'Extra Paneer Cubes', price: 25 },
      { id: 'mint-dip', label: 'Mint Yogurt Dip', price: 10 },
    ],
  },
  {
    id: 'item-sandwich',
    name: 'Veg Sandwich',
    stallName: 'Healthy Bite',
    counterLabel: 'Counter C — Fresh Sandwiches & Bowls',
    category: 'Healthy Bowls',
    description:
      'Toasted multigrain bread layered with cucumber, tomato, bell peppers, and house herb spread.',
    price: 45,
    calories: 240,
    prepMins: 4,
    prepBadge: '4m prep',
    badgeVariant: 'instant',
    rating: 4.6,
    isVeg: true,
    artworkId: 'veg_sandwich',
    addOns: [
      { id: 'cheese-slice', label: 'Cheddar Slice', price: 15 },
      { id: 'peri-fries', label: 'Peri-Peri Side Fries', price: 25 },
    ],
  },
  {
    id: 'item-samosa',
    name: 'Samosa',
    stallName: 'Snack Shack',
    counterLabel: 'Counter B — Quick Bites & South Indian',
    category: 'Snacks & Quick Bites',
    description:
      'Golden crispy pastry stuffed with spiced potatoes and green peas, served with tamarind chutney.',
    price: 15,
    calories: 180,
    prepMins: 2,
    prepBadge: 'Instant (2m)',
    badgeVariant: 'instant',
    rating: 4.7,
    isVeg: true,
    artworkId: 'samosa',
    addOns: [
      { id: 'chole-top', label: 'Chole Ragda Topping', price: 20 },
      { id: 'extra-chutney', label: 'Sweet Tamarind & Mint Dip', price: 5 },
    ],
  },
  {
    id: 'item-cold-coffee',
    name: 'Cold Coffee',
    stallName: 'Brews & Bakes',
    counterLabel: 'Counter D — Campus Bean Bar',
    category: 'Beverages',
    description:
      'Thick creamy arabica blend whipped with chilled milk and topped with chocolate drizzle.',
    price: 40,
    calories: 210,
    prepMins: 3,
    prepBadge: '3m prep',
    badgeVariant: 'cold',
    rating: 4.9,
    isVeg: true,
    artworkId: 'cold_coffee',
    addOns: [
      { id: 'ice-cream', label: 'Vanilla Scoop Floater', price: 20 },
      { id: 'espresso', label: 'Extra Espresso Shot', price: 15 },
    ],
  },
  {
    id: 'item-mini-thali',
    name: 'Mini Thali',
    stallName: 'Meal Central',
    counterLabel: 'Counter A — Hot Kitchens',
    category: 'Full Meals',
    description:
      'Wholesome campus meal: 2 soft rotis, yellow dal tadka, paneer curry, steamed rice & salad.',
    price: 90,
    calories: 540,
    prepMins: 10,
    prepBadge: '10m prep',
    badgeVariant: 'default',
    rating: 4.7,
    isVeg: true,
    isChefsSpecial: true,
    artworkId: 'mini_thali',
    addOns: [
      { id: 'raita', label: 'Boondi Raita Cup', price: 15 },
      { id: 'gulab', label: 'Warm Gulab Jamun (1 pc)', price: 20 },
    ],
  },
];

export const INITIAL_CART: CartItem[] = [
  {
    cartKey: 'item-dosa::::',
    menuItemId: 'item-dosa',
    name: 'Crispy Masala Dosa',
    stallName: 'South Hut',
    unitPrice: 60,
    quantity: 1,
    selectedAddOns: [],
  },
  {
    cartKey: 'item-cold-coffee::::',
    menuItemId: 'item-cold-coffee',
    name: 'Cold Coffee',
    stallName: 'Brews & Bakes',
    unitPrice: 40,
    quantity: 1,
    selectedAddOns: [],
  },
];

export function formatTime12h(date: Date): string {
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  });
}

export function getSlotWindowStart(now: Date = new Date()): Date {
  const start = new Date(now);
  start.setSeconds(0, 0);
  start.setMinutes(Math.floor(start.getMinutes() / 15) * 15);
  return start;
}

function addMinutes(base: Date, mins: number): Date {
  return new Date(base.getTime() + mins * 60000);
}

export function buildPickupSlots(
  now: Date = new Date(),
  bookedCounts: Record<string, number> = {}
): PickupSlot[] {
  const baseStart = getSlotWindowStart(now);

  const configs: Array<{
    id: string;
    offsetMins: number;
    baseRemaining: number;
    recommended?: boolean;
    baseWait: string;
  }> = [
    { id: 'slot-1', offsetMins: 0, baseRemaining: 0, baseWait: 'FULL' },
    { id: 'slot-2', offsetMins: 15, baseRemaining: 4, baseWait: '~5m wait' },
    {
      id: 'slot-3',
      offsetMins: 30,
      baseRemaining: 28,
      baseWait: '<2m wait',
      recommended: true,
    },
    { id: 'slot-4', offsetMins: 45, baseRemaining: 35, baseWait: '<1m wait' },
  ];

  return configs.map((cfg) => {
    const start = addMinutes(baseStart, cfg.offsetMins);
    const end = addMinutes(start, 15);
    const timeRange = `${formatTime12h(start)} – ${formatTime12h(end)}`;
    const booked = bookedCounts[timeRange] ?? 0;
    const remaining = Math.max(0, cfg.baseRemaining - booked);

    let status: PickupSlot['status'] = 'available';
    let waitLabel = cfg.baseWait;
    let subtitle = `AVAILABLE (${remaining} left • ${waitLabel})`;

    if (remaining === 0) {
      status = 'full';
      waitLabel = 'FULL';
      subtitle = 'FULL (0 slots left)';
    } else if (remaining <= 6) {
      status = 'almost_full';
      waitLabel = '~5m wait';
      subtitle = `ALMOST FULL (${remaining} left • ${waitLabel})`;
    }

    return {
      id: cfg.id,
      timeRange,
      status,
      remaining,
      waitLabel,
      subtitle,
      recommended: cfg.recommended && status !== 'full',
    };
  });
}

export const PICKUP_SLOTS: PickupSlot[] = buildPickupSlots(new Date());

export function createInitialOrders(now: Date = new Date()): OrderTicket[] {
  const slots = buildPickupSlots(now);
  const slot1 = slots[0]?.timeRange ?? 'Current Slot';
  const slot2 = slots[1]?.timeRange ?? 'Next Slot';
  const slot3 = slots[2]?.timeRange ?? 'Upcoming Slot';
  const slot4 = slots[3]?.timeRange ?? 'Later Slot';

  return [
    {
      id: 'ord-tk142',
      token: 'TK-142',
      studentName: 'Aarav Kulkarni',
      counterName: 'Pickup Counter B — Quick Bites & South Indian',
      counterShort: 'Counter B',
      placedAt: formatTime12h(addMinutes(now, -4)),
      estimatedReady: formatTime12h(addMinutes(now, 5)),
      minsRemaining: 5,
      elapsedSeconds: 215,
      stage: 'preparing',
      slotLabel: slot2,
      subtotal: 75,
      subsidy: 15,
      total: 60,
      assignedChef: 'Chef Vikram',
      notifiedStudent: false,
      isMyOrder: true,
      items: [
        { menuItemId: 'item-dosa', name: 'Crispy Masala Dosa', quantity: 1, unitPrice: 60 },
        { menuItemId: 'item-samosa', name: 'Samosa', quantity: 1, unitPrice: 15 },
      ],
    },
    {
      id: 'ord-tk148',
      token: 'TK-148',
      studentName: 'Riya Sharma',
      counterName: 'Pickup Counter A — Hot Kitchens',
      counterShort: 'Counter A',
      placedAt: formatTime12h(addMinutes(now, -12)),
      estimatedReady: formatTime12h(addMinutes(now, -2)),
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'ready',
      slotLabel: slot1,
      subtotal: 90,
      subsidy: 15,
      total: 75,
      assignedChef: 'Chef Ananya',
      notifiedStudent: true,
      isMyOrder: false,
      items: [{ menuItemId: 'item-mini-thali', name: 'Mini Thali', quantity: 1, unitPrice: 90 }],
    },
    {
      id: 'ord-tk151',
      token: 'TK-151',
      studentName: 'Kabir Mehta',
      counterName: 'Pickup Counter B — Quick Bites & South Indian',
      counterShort: 'Counter B',
      placedAt: formatTime12h(addMinutes(now, -10)),
      estimatedReady: formatTime12h(addMinutes(now, -1)),
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'ready',
      slotLabel: slot1,
      subtotal: 80,
      subsidy: 15,
      total: 65,
      assignedChef: 'Chef Vikram',
      notifiedStudent: true,
      isMyOrder: false,
      items: [
        { menuItemId: 'item-cold-coffee', name: 'Cold Coffee', quantity: 2, unitPrice: 40 },
      ],
    },
    {
      id: 'ord-tk155',
      token: 'TK-155',
      studentName: 'Neha Verma',
      counterName: 'Pickup Counter A — Wraps & Rolls',
      counterShort: 'Counter A',
      placedAt: formatTime12h(addMinutes(now, -8)),
      estimatedReady: formatTime12h(now),
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'ready',
      slotLabel: slot1,
      subtotal: 80,
      subsidy: 15,
      total: 65,
      assignedChef: 'Chef Kabir',
      notifiedStudent: true,
      isMyOrder: false,
      items: [
        { menuItemId: 'item-paneer-roll', name: 'Paneer Tikka Roll', quantity: 1, unitPrice: 80 },
      ],
    },
    {
      id: 'ord-tk160',
      token: 'TK-160',
      studentName: 'Siddharth Nair',
      counterName: 'Pickup Counter C — Fresh Sandwiches',
      counterShort: 'Counter C',
      placedAt: formatTime12h(addMinutes(now, -6)),
      estimatedReady: formatTime12h(addMinutes(now, 6)),
      minsRemaining: 6,
      elapsedSeconds: 390,
      stage: 'preparing',
      slotLabel: slot2,
      subtotal: 85,
      subsidy: 15,
      total: 70,
      assignedChef: 'Chef Ananya',
      notifiedStudent: false,
      isMyOrder: false,
      items: [
        { menuItemId: 'item-sandwich', name: 'Veg Sandwich', quantity: 1, unitPrice: 45 },
        { menuItemId: 'item-cold-coffee', name: 'Cold Coffee', quantity: 1, unitPrice: 40 },
      ],
    },
    {
      id: 'ord-tk162',
      token: 'TK-162',
      studentName: 'Anjali Iyer',
      counterName: 'Pickup Counter B — Quick Bites',
      counterShort: 'Counter B',
      placedAt: formatTime12h(addMinutes(now, -3)),
      estimatedReady: formatTime12h(addMinutes(now, 8)),
      minsRemaining: 8,
      elapsedSeconds: 510,
      stage: 'confirmed',
      slotLabel: slot3,
      subtotal: 105,
      subsidy: 15,
      total: 90,
      notifiedStudent: false,
      isMyOrder: false,
      items: [
        { menuItemId: 'item-dosa', name: 'Crispy Masala Dosa', quantity: 1, unitPrice: 60 },
        { menuItemId: 'item-sandwich', name: 'Veg Sandwich', quantity: 1, unitPrice: 45 },
      ],
    },
    {
      id: 'ord-tk165',
      token: 'TK-165',
      studentName: 'Rohan Joshi',
      counterName: 'Pickup Counter A — Hot Kitchens',
      counterShort: 'Counter A',
      placedAt: formatTime12h(addMinutes(now, -2)),
      estimatedReady: formatTime12h(addMinutes(now, 10)),
      minsRemaining: 10,
      elapsedSeconds: 180,
      stage: 'confirmed',
      slotLabel: slot3,
      subtotal: 105,
      subsidy: 15,
      total: 90,
      notifiedStudent: false,
      isMyOrder: false,
      items: [
        { menuItemId: 'item-mini-thali', name: 'Mini Thali', quantity: 1, unitPrice: 90 },
        { menuItemId: 'item-samosa', name: 'Samosa', quantity: 1, unitPrice: 15 },
      ],
    },
    // Aarav's previous historical orders for Page 2
    {
      id: 'ord-tk118',
      token: 'TK-118',
      studentName: 'Aarav Kulkarni',
      counterName: 'Pickup Counter A — Wraps & Rolls',
      counterShort: 'Counter A',
      placedAt: 'Yesterday, 1:10 PM',
      estimatedReady: '1:18 PM',
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'collected',
      slotLabel: slot3,
      subtotal: 120,
      subsidy: 15,
      total: 105,
      isMyOrder: true,
      items: [
        { menuItemId: 'item-paneer-roll', name: 'Paneer Tikka Roll', quantity: 1, unitPrice: 80 },
        { menuItemId: 'item-cold-coffee', name: 'Cold Coffee', quantity: 1, unitPrice: 40 },
      ],
    },
    {
      id: 'ord-tk094',
      token: 'TK-094',
      studentName: 'Aarav Kulkarni',
      counterName: 'Pickup Counter A — Hot Kitchens',
      counterShort: 'Counter A',
      placedAt: 'Nov 23, 12:52 PM',
      estimatedReady: '1:02 PM',
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'collected',
      slotLabel: slot2,
      subtotal: 90,
      subsidy: 15,
      total: 75,
      isMyOrder: true,
      items: [{ menuItemId: 'item-mini-thali', name: 'Mini Thali', quantity: 1, unitPrice: 90 }],
    },
    {
      id: 'ord-tk071',
      token: 'TK-071',
      studentName: 'Aarav Kulkarni',
      counterName: 'Pickup Counter C — Fresh Sandwiches',
      counterShort: 'Counter C',
      placedAt: 'Nov 21, 1:32 PM',
      estimatedReady: '1:38 PM',
      minsRemaining: 0,
      elapsedSeconds: 0,
      stage: 'cancelled',
      slotLabel: slot4,
      subtotal: 45,
      subsidy: 15,
      total: 30,
      isMyOrder: true,
      items: [{ menuItemId: 'item-sandwich', name: 'Veg Sandwich', quantity: 1, unitPrice: 45 }],
    },
  ];
}

export const INITIAL_ORDERS: OrderTicket[] = createInitialOrders(new Date());
    // previous orders moved into createInitialOrders above

export const INITIAL_COOK_AHEAD: CookAheadItem[] = [
  { id: 'ca-1', label: 'Masala Dosas', quantity: 18, prepared: false },
  { id: 'ca-2', label: 'Paneer Rolls', quantity: 12, prepared: false },
  { id: 'ca-3', label: 'Mini Thalis', quantity: 15, prepared: false },
  { id: 'ca-4', label: 'Cold Coffees', quantity: 20, prepared: false },
];

export const ANALYTICS_BY_RANGE: Record<
  AnalyticsRange,
  {
    kpis: {
      dailyOrders: string;
      ordersDelta: string;
      grossRevenue: string;
      revenueDelta: string;
      wastePrevented: string;
      wasteDelta: string;
      queueReduction: string;
      queueDelta: string;
    };
    slots: SlotDensityPoint[];
    topItems: TopFoodMetric[];
  }
> = {
  today: {
    kpis: {
      dailyOrders: '418',
      ordersDelta: '+14% vs avg',
      grossRevenue: '₹28,640',
      revenueDelta: '+11.8% today',
      wastePrevented: '34.5 kg',
      wasteDelta: 'Cook-ahead active',
      queueReduction: '84%',
      queueDelta: '2.5m avg wait',
    },
    slots: [
      { slot: '11:30–11:45 AM', shortLabel: '11:30', orders: 14, capacityPct: 28, level: 'low' },
      { slot: '11:45–12:00 PM', shortLabel: '11:45', orders: 22, capacityPct: 44, level: 'low' },
      { slot: '12:00–12:15 PM', shortLabel: '12:00', orders: 34, capacityPct: 68, level: 'medium' },
      { slot: '12:15–12:30 PM', shortLabel: '12:15', orders: 41, capacityPct: 82, level: 'high' },
      { slot: '12:30–12:45 PM', shortLabel: '12:30', orders: 48, capacityPct: 96, level: 'high' },
      { slot: '12:45–1:00 PM', shortLabel: '12:45', orders: 50, capacityPct: 100, level: 'high' },
      { slot: '1:00–1:15 PM', shortLabel: '1:00', orders: 46, capacityPct: 92, level: 'high' },
      { slot: '1:15–1:30 PM', shortLabel: '1:15', orders: 36, capacityPct: 72, level: 'medium' },
      { slot: '1:30–1:45 PM', shortLabel: '1:30', orders: 31, capacityPct: 62, level: 'medium' },
      { slot: '1:45–2:00 PM', shortLabel: '1:45', orders: 27, capacityPct: 54, level: 'medium' },
      { slot: '2:00–2:15 PM', shortLabel: '2:00', orders: 24, capacityPct: 48, level: 'low' },
      { slot: '2:15–2:30 PM', shortLabel: '2:15', orders: 21, capacityPct: 42, level: 'low' },
      { slot: '2:30–2:45 PM', shortLabel: '2:30', orders: 18, capacityPct: 36, level: 'low' },
      { slot: '2:45–3:00 PM', shortLabel: '2:45', orders: 16, capacityPct: 32, level: 'low' },
    ],
    topItems: [
      { name: 'Crispy Masala Dosa', ordersSold: 112, revenue: 6720, demandPct: 27 },
      { name: 'Mini Thali', ordersSold: 88, revenue: 7920, demandPct: 21 },
      { name: 'Cold Coffee', ordersSold: 84, revenue: 3360, demandPct: 20 },
      { name: 'Paneer Tikka Roll', ordersSold: 72, revenue: 5760, demandPct: 17 },
      { name: 'Samosa (2 pcs)', ordersSold: 62, revenue: 1860, demandPct: 15 },
    ],
  },
  '7d': {
    kpis: {
      dailyOrders: '2,840',
      ordersDelta: '+9.2% vs last wk',
      grossRevenue: '₹1,94,520',
      revenueDelta: '+12.4% vs last wk',
      wastePrevented: '228.0 kg',
      wasteDelta: '94% accuracy',
      queueReduction: '82%',
      queueDelta: '2.7m avg wait',
    },
    slots: [
      { slot: '11:30–11:45 AM', shortLabel: '11:30', orders: 96, capacityPct: 27, level: 'low' },
      { slot: '11:45–12:00 PM', shortLabel: '11:45', orders: 145, capacityPct: 41, level: 'low' },
      { slot: '12:00–12:15 PM', shortLabel: '12:00', orders: 224, capacityPct: 64, level: 'medium' },
      { slot: '12:15–12:30 PM', shortLabel: '12:15', orders: 280, capacityPct: 80, level: 'high' },
      { slot: '12:30–12:45 PM', shortLabel: '12:30', orders: 322, capacityPct: 92, level: 'high' },
      { slot: '12:45–1:00 PM', shortLabel: '12:45', orders: 342, capacityPct: 98, level: 'high' },
      { slot: '1:00–1:15 PM', shortLabel: '1:00', orders: 315, capacityPct: 90, level: 'high' },
      { slot: '1:15–1:30 PM', shortLabel: '1:15', orders: 245, capacityPct: 70, level: 'medium' },
      { slot: '1:30–1:45 PM', shortLabel: '1:30', orders: 210, capacityPct: 60, level: 'medium' },
      { slot: '1:45–2:00 PM', shortLabel: '1:45', orders: 185, capacityPct: 53, level: 'medium' },
      { slot: '2:00–2:15 PM', shortLabel: '2:00', orders: 150, capacityPct: 43, level: 'low' },
      { slot: '2:15–2:30 PM', shortLabel: '2:15', orders: 132, capacityPct: 38, level: 'low' },
      { slot: '2:30–2:45 PM', shortLabel: '2:30', orders: 112, capacityPct: 32, level: 'low' },
      { slot: '2:45–3:00 PM', shortLabel: '2:45', orders: 82, capacityPct: 24, level: 'low' },
    ],
    topItems: [
      { name: 'Crispy Masala Dosa', ordersSold: 745, revenue: 44700, demandPct: 26 },
      { name: 'Mini Thali', ordersSold: 618, revenue: 55620, demandPct: 22 },
      { name: 'Cold Coffee', ordersSold: 560, revenue: 22400, demandPct: 20 },
      { name: 'Paneer Tikka Roll', ordersSold: 492, revenue: 39360, demandPct: 17 },
      { name: 'Samosa', ordersSold: 425, revenue: 12750, demandPct: 15 },
    ],
  },
  '30d': {
    kpis: {
      dailyOrders: '11,920',
      ordersDelta: '+18.5% this month',
      grossRevenue: '₹8,12,480',
      revenueDelta: '+16.2% this month',
      wastePrevented: '940.2 kg',
      wasteDelta: 'Zero stockouts',
      queueReduction: '85%',
      queueDelta: '2.3m avg wait',
    },
    slots: [
      { slot: '11:30–11:45 AM', shortLabel: '11:30', orders: 390, capacityPct: 26, level: 'low' },
      { slot: '11:45–12:00 PM', shortLabel: '11:45', orders: 610, capacityPct: 40, level: 'low' },
      { slot: '12:00–12:15 PM', shortLabel: '12:00', orders: 940, capacityPct: 63, level: 'medium' },
      { slot: '12:15–12:30 PM', shortLabel: '12:15', orders: 1180, capacityPct: 79, level: 'high' },
      { slot: '12:30–12:45 PM', shortLabel: '12:30', orders: 1360, capacityPct: 91, level: 'high' },
      { slot: '12:45–1:00 PM', shortLabel: '12:45', orders: 1470, capacityPct: 98, level: 'high' },
      { slot: '1:00–1:15 PM', shortLabel: '1:00', orders: 1330, capacityPct: 89, level: 'high' },
      { slot: '1:15–1:30 PM', shortLabel: '1:15', orders: 1020, capacityPct: 68, level: 'medium' },
      { slot: '1:30–1:45 PM', shortLabel: '1:30', orders: 890, capacityPct: 59, level: 'medium' },
      { slot: '1:45–2:00 PM', shortLabel: '1:45', orders: 770, capacityPct: 51, level: 'medium' },
      { slot: '2:00–2:15 PM', shortLabel: '2:00', orders: 640, capacityPct: 43, level: 'low' },
      { slot: '2:15–2:30 PM', shortLabel: '2:15', orders: 530, capacityPct: 35, level: 'low' },
      { slot: '2:30–2:45 PM', shortLabel: '2:30', orders: 450, capacityPct: 30, level: 'low' },
      { slot: '2:45–3:00 PM', shortLabel: '2:45', orders: 350, capacityPct: 23, level: 'low' },
    ],
    topItems: [
      { name: 'Crispy Masala Dosa', ordersSold: 3140, revenue: 188400, demandPct: 26 },
      { name: 'Mini Thali', ordersSold: 2620, revenue: 235800, demandPct: 22 },
      { name: 'Cold Coffee', ordersSold: 2380, revenue: 95200, demandPct: 20 },
      { name: 'Paneer Tikka Roll', ordersSold: 2060, revenue: 164800, demandPct: 17 },
      { name: 'Samosa', ordersSold: 1720, revenue: 51600, demandPct: 15 },
    ],
  },
  custom: {
    kpis: {
      dailyOrders: '1,640',
      ordersDelta: 'Selected window',
      grossRevenue: '₹1,12,880',
      revenueDelta: '4-day span',
      wastePrevented: '132.4 kg',
      wasteDelta: 'Avg 33.1 kg/day',
      queueReduction: '84%',
      queueDelta: '2.4m avg wait',
    },
    slots: [
      { slot: '11:30–11:45 AM', shortLabel: '11:30', orders: 54, capacityPct: 27, level: 'low' },
      { slot: '11:45–12:00 PM', shortLabel: '11:45', orders: 84, capacityPct: 42, level: 'low' },
      { slot: '12:00–12:15 PM', shortLabel: '12:00', orders: 132, capacityPct: 66, level: 'medium' },
      { slot: '12:15–12:30 PM', shortLabel: '12:15', orders: 162, capacityPct: 81, level: 'high' },
      { slot: '12:30–12:45 PM', shortLabel: '12:30', orders: 188, capacityPct: 94, level: 'high' },
      { slot: '12:45–1:00 PM', shortLabel: '12:45', orders: 196, capacityPct: 98, level: 'high' },
      { slot: '1:00–1:15 PM', shortLabel: '1:00', orders: 178, capacityPct: 89, level: 'high' },
      { slot: '1:15–1:30 PM', shortLabel: '1:15', orders: 142, capacityPct: 71, level: 'medium' },
      { slot: '1:30–1:45 PM', shortLabel: '1:30', orders: 120, capacityPct: 60, level: 'medium' },
      { slot: '1:45–2:00 PM', shortLabel: '1:45', orders: 104, capacityPct: 52, level: 'medium' },
      { slot: '2:00–2:15 PM', shortLabel: '2:00', orders: 88, capacityPct: 44, level: 'low' },
      { slot: '2:15–2:30 PM', shortLabel: '2:15', orders: 74, capacityPct: 37, level: 'low' },
      { slot: '2:30–2:45 PM', shortLabel: '2:30', orders: 64, capacityPct: 32, level: 'low' },
      { slot: '2:45–3:00 PM', shortLabel: '2:45', orders: 56, capacityPct: 28, level: 'low' },
    ],
    topItems: [
      { name: 'Crispy Masala Dosa', ordersSold: 430, revenue: 25800, demandPct: 26 },
      { name: 'Mini Thali', ordersSold: 360, revenue: 32400, demandPct: 22 },
      { name: 'Cold Coffee', ordersSold: 328, revenue: 13120, demandPct: 20 },
      { name: 'Paneer Tikka Roll', ordersSold: 282, revenue: 22560, demandPct: 17 },
      { name: 'Samosa', ordersSold: 240, revenue: 7200, demandPct: 15 },
    ],
  },
};

export function createInitialForecastInsights(
  now: Date = new Date()
): ForecastInsight[] {
  const baseStart = getSlotWindowStart(now);
  const slot1Label = `${formatTime12h(baseStart)}–${formatTime12h(addMinutes(baseStart, 15))}`;
  const slot2Start = formatTime12h(addMinutes(baseStart, 15));
  const slot3Start = formatTime12h(addMinutes(baseStart, 30));

  return [
    {
      id: 'fc-1',
      title: `Prepare 30 additional samosas for ${slot1Label}`,
      detail: `${slot1Label} slot is at 100% capacity with 18% higher snack add-on velocity.`,
      impactLabel: 'Prevents 12m stockout',
      sentToKitchen: false,
    },
    {
      id: 'fc-2',
      title: `Increase dosa batter preparation before ${slot2Start}`,
      detail: `Predicted 42 dosa orders between ${slot2Start} and ${slot3Start} (+22% vs baseline).`,
      impactLabel: '+₹2,520 revenue capture',
      sentToKitchen: false,
    },
    {
      id: 'fc-3',
      title: 'Prepare additional paneer marinade for upcoming rush',
      detail: `Paneer Tikka Roll & Mini Thali combo demand rising sharply for ${slot3Start} slot.`,
      impactLabel: '-4.2 kg prep waste',
      sentToKitchen: false,
    },
  ];
}

export const INITIAL_FORECAST_INSIGHTS: ForecastInsight[] =
  createInitialForecastInsights(new Date());

export function getLiveBulletins(pickupSlots: PickupSlot[]): string[] {
  const openSlot =
    pickupSlots.find((s) => s.recommended) ??
    pickupSlots.find((s) => s.status === 'available') ??
    pickupSlots[2];

  return [
    'Fresh samosa batch available at Counter B.',
    'Dosa counter is active — average wait under 4 mins.',
    'Counter B is ready for pickup for TK-148 & TK-151.',
    openSlot
      ? `${openSlot.timeRange} pickup slot has ${openSlot.remaining} express spots open.`
      : 'Express pickup slots open for fast-pass ordering.',
  ];
}

export const LIVE_BULLETINS: string[] = getLiveBulletins(PICKUP_SLOTS);
