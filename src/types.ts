export type AppPage = 'home' | 'menu' | 'orders' | 'kitchen' | 'admin' | 'display' | 'login';

export type UserRole = 'student' | 'kitchen' | 'admin';

export type CategoryFilter =
  | 'All Items'
  | 'Snacks & Quick Bites'
  | 'Full Meals'
  | 'Beverages'
  | 'Healthy Bowls';

export type QuickFilter = 'under60' | 'ready5' | 'pureVeg' | 'chefsSpecial';

export type OrderStage = 'confirmed' | 'preparing' | 'ready' | 'collected' | 'cancelled';

export type ArtworkId =
  | 'masala_dosa'
  | 'paneer_tikka_roll'
  | 'veg_sandwich'
  | 'samosa'
  | 'cold_coffee'
  | 'mini_thali';

export interface AddOnOption {
  id: string;
  label: string;
  price: number;
}

export interface MenuItem {
  id: string;
  name: string;
  stallName: string;
  counterLabel: string;
  category: Exclude<CategoryFilter, 'All Items'>;
  description: string;
  price: number;
  calories: number;
  prepMins: number;
  prepBadge: string;
  badgeVariant: 'default' | 'bestseller' | 'instant' | 'cold';
  rating: number;
  isVeg: boolean;
  isChefsSpecial?: boolean;
  artworkId: ArtworkId;
  addOns: AddOnOption[];
}

export interface CartItem {
  cartKey: string;
  menuItemId: string;
  name: string;
  stallName: string;
  unitPrice: number;
  quantity: number;
  selectedAddOns: AddOnOption[];
  note?: string;
}

export interface PickupSlot {
  id: string;
  timeRange: string;
  status: 'full' | 'almost_full' | 'available';
  remaining: number;
  waitLabel: string;
  subtitle: string;
  recommended?: boolean;
}

export interface OrderLineItem {
  menuItemId?: string;
  name: string;
  quantity: number;
  unitPrice: number;
  addOnsLabel?: string;
}

export interface OrderTicket {
  id: string;
  token: string;
  studentName: string;
  counterName: string;
  counterShort: string;
  placedAt: string;
  estimatedReady: string;
  minsRemaining: number;
  elapsedSeconds: number;
  stage: OrderStage;
  slotLabel: string;
  subtotal: number;
  subsidy: number;
  total: number;
  assignedChef?: string;
  notifiedStudent?: boolean;
  isMyOrder: boolean;
  items: OrderLineItem[];
}

export interface CookAheadItem {
  id: string;
  label: string;
  quantity: number;
  prepared: boolean;
}

export type AnalyticsRange = 'today' | '7d' | '30d' | 'custom';

export interface SlotDensityPoint {
  slot: string;
  shortLabel: string;
  orders: number;
  capacityPct: number;
  level: 'low' | 'medium' | 'high';
}

export interface TopFoodMetric {
  name: string;
  ordersSold: number;
  revenue: number;
  demandPct: number;
}

export interface ForecastInsight {
  id: string;
  title: string;
  detail: string;
  impactLabel: string;
  sentToKitchen: boolean;
}
