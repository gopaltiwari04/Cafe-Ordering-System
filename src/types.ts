export type ProductCategory =
  | 'Coffee'
  | 'Tea'
  | 'Breakfast'
  | 'Sandwiches'
  | 'Burgers'
  | 'Pizza'
  | 'Pasta'
  | 'Snacks'
  | 'Desserts'
  | 'Cold Beverages';

export interface CustomizationOptionItem {
  id: string;
  name: string;
  price: number;
}

export interface CustomizationGroup {
  id: string;
  title: string;
  type: 'single' | 'multiple';
  required?: boolean;
  options: CustomizationOptionItem[];
}

export interface MenuItem {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price: number;
  image: string;
  isVeg: boolean;
  isVegan?: boolean;
  isSpicy?: boolean;
  isBestseller?: boolean;
  rating: number;
  reviewCount: number;
  prepTime: string; // e.g. "8-10 mins"
  calories?: number;
  isAvailable: boolean;
  customizationGroups?: CustomizationGroup[];
}

export interface SelectedCustomization {
  groupId: string;
  groupTitle: string;
  selectedOptionIds: string[];
  selectedOptionNames: string[];
  additionalPrice: number;
}

export interface CartItem {
  cartItemId: string;
  menuItem: MenuItem;
  quantity: number;
  selectedCustomizations: SelectedCustomization[];
  specialInstructions?: string;
  itemPrice: number; // unit price + customizations
  totalPrice: number; // itemPrice * quantity
}

export type OrderType = 'pickup' | 'dine_in' | 'delivery';

export type OrderStatus =
  | 'placed'
  | 'confirmed'
  | 'preparing'
  | 'ready'
  | 'completed'
  | 'cancelled';

export type PaymentMethod = 'upi' | 'card' | 'cash' | 'counter';

export interface CustomerInfo {
  name: string;
  phone: string;
  email: string;
}

export interface DeliveryDetails {
  address: string;
  landmark?: string;
  pincode?: string;
  instructions?: string;
}

export interface DineInDetails {
  tableNumber: number;
  guestCount?: number;
}

export interface PickupDetails {
  pickupTimeType: 'asap' | 'scheduled';
  scheduledTime?: string;
}

export interface Order {
  id: string; // e.g. "BB1024"
  createdAt: string; // ISO or formatted
  customer: CustomerInfo;
  items: CartItem[];
  orderType: OrderType;
  tableDetails?: DineInDetails;
  deliveryDetails?: DeliveryDetails;
  pickupDetails?: PickupDetails;
  subtotal: number;
  discount: number;
  tax: number;
  packagingFee: number;
  deliveryFee: number;
  total: number;
  promoCodeApplied?: string;
  paymentMethod: PaymentMethod;
  paymentStatus: 'paid' | 'pending' | 'failed';
  status: OrderStatus;
  estimatedReadyTime: string;
  elapsedSeconds?: number;
  rating?: number;
  feedback?: string;
}

export interface TableItem {
  id: number;
  name: string;
  capacity: number;
  status: 'available' | 'occupied' | 'reserved';
  currentOrderId?: string;
  occupiedSince?: string;
  guestCount?: number;
  hasStaffCall?: boolean;
}

export interface InventoryItem {
  id: string;
  name: string;
  category: string;
  stock: number;
  minStock: number;
  unit: string;
  status: 'good' | 'low' | 'critical';
  lastRestocked: string;
}

export interface RewardItem {
  id: string;
  title: string;
  pointsRequired: number;
  discountValue: number;
  discountType: 'fixed' | 'free_item' | 'percentage';
  description: string;
  iconName: string;
  unlocked?: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  title: string;
  description: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minOrder: number;
  maxDiscount?: number;
  expiryDate: string;
  isActive: boolean;
  usageCount: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: 'order' | 'offer' | 'reward' | 'system' | 'staff_call';
  orderId?: string;
  targetRole: 'customer' | 'admin' | 'all';
}

export interface CustomerCRM {
  id: string;
  name: string;
  phone: string;
  email: string;
  ordersCount: number;
  totalSpent: number;
  loyaltyPoints: number;
  lastOrderDate: string;
  favoriteItem: string;
}

export type DemoView = 'customer' | 'admin' | 'kitchen' | 'qr_table';
