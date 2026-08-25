import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  MenuItem,
  Order,
  OrderStatus,
  CartItem,
  SelectedCustomization,
  OrderType,
  PaymentMethod,
  CustomerInfo,
  DeliveryDetails,
  PickupDetails,
  DineInDetails,
  TableItem,
  InventoryItem,
  RewardItem,
  Coupon,
  NotificationItem,
  CustomerCRM,
  DemoView,
} from '../types';
import {
  INITIAL_MENU_ITEMS,
  INITIAL_ORDERS,
  INITIAL_TABLES,
  INITIAL_INVENTORY,
  INITIAL_COUPONS,
  INITIAL_REWARDS,
  INITIAL_CUSTOMERS,
  INITIAL_NOTIFICATIONS,
} from '../data/initialData';

export type CustomerPage = 'home' | 'menu' | 'offers' | 'orders' | 'rewards' | 'about' | 'account' | 'cart';
export type AdminPage =
  | 'overview'
  | 'orders'
  | 'menu'
  | 'tables'
  | 'kitchen'
  | 'customers'
  | 'inventory'
  | 'analytics'
  | 'offers'
  | 'settings';

export interface ToastMessage {
  id: string;
  message: string;
  type?: 'success' | 'info' | 'warning' | 'error';
}

interface AppContextType {
  // Navigation & View
  currentView: DemoView;
  setCurrentView: (view: DemoView) => void;
  customerPage: CustomerPage;
  setCustomerPage: (page: CustomerPage) => void;
  adminPage: AdminPage;
  setAdminPage: (page: AdminPage) => void;

  // Selected Category & Search in Menu
  selectedCategory: string;
  setSelectedCategory: (cat: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Modals & Drawers
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  customizingItem: MenuItem | null;
  setCustomizingItem: (item: MenuItem | null) => void;
  trackingOrderId: string | null;
  setTrackingOrderId: (id: string | null) => void;
  receiptOrderId: string | null;
  setReceiptOrderId: (id: string | null) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  confirmedOrderId: string | null;
  setConfirmedOrderId: (id: string | null) => void;

  // State collections
  menuItems: MenuItem[];
  orders: Order[];
  tables: TableItem[];
  inventory: InventoryItem[];
  coupons: Coupon[];
  rewards: RewardItem[];
  customers: CustomerCRM[];
  notifications: NotificationItem[];
  favorites: string[];

  // Customer Profile & Cart
  customerProfile: CustomerInfo;
  setCustomerProfile: React.Dispatch<React.SetStateAction<CustomerInfo>>;
  loyaltyPoints: number;
  cart: CartItem[];
  appliedCoupon: Coupon | null;
  appliedReward: RewardItem | null;
  orderType: OrderType;
  setOrderType: (type: OrderType) => void;
  tableDetails: DineInDetails;
  setTableDetails: React.Dispatch<React.SetStateAction<DineInDetails>>;
  deliveryDetails: DeliveryDetails;
  setDeliveryDetails: React.Dispatch<React.SetStateAction<DeliveryDetails>>;
  pickupDetails: PickupDetails;
  setPickupDetails: React.Dispatch<React.SetStateAction<PickupDetails>>;

  // Computed Cart values
  cartSubtotal: number;
  cartDiscount: number;
  cartTax: number;
  cartPackaging: number;
  cartDelivery: number;
  cartGrandTotal: number;
  freeDeliveryDistance: number; // e.g. amount remaining for free delivery (threshold ₹499)

  // Actions: Cart
  addToCart: (
    item: MenuItem,
    customizations: SelectedCustomization[],
    quantity: number,
    specialInstructions?: string
  ) => void;
  removeFromCart: (cartItemId: string) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  redeemReward: (reward: RewardItem) => boolean;
  removeReward: () => void;
  toggleFavorite: (itemId: string) => void;

  // Actions: Orders
  placeOrder: (paymentMethod: PaymentMethod) => Order;
  updateOrderStatus: (orderId: string, status: OrderStatus) => void;
  reorderItems: (order: Order) => void;
  rateOrder: (orderId: string, rating: number, feedback?: string) => void;

  // Actions: Tables
  updateTableStatus: (tableId: number, status: 'available' | 'occupied' | 'reserved') => void;
  callStaff: (tableNumber: number) => void;
  dismissStaffCall: (tableNumber: number) => void;

  // Actions: Admin & Menu
  toggleItemAvailability: (itemId: string) => void;
  saveMenuItem: (item: MenuItem) => void;
  deleteMenuItem: (itemId: string) => void;
  restockInventory: (itemId: string, amount: number) => void;
  toggleCouponStatus: (couponId: string) => void;
  saveCoupon: (coupon: Coupon) => void;
  markNotificationRead: (id: string) => void;
  clearAllNotifications: () => void;

  // Demo helpers
  simulateAutoAdvanceOrder: (orderId: string) => void;
  resetToDefaultData: () => void;
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const LOCAL_STORAGE_KEY = 'brew_and_bite_demo_store_v1';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Views & Pages
  const [currentView, setCurrentView] = useState<DemoView>('customer');
  const [customerPage, setCustomerPage] = useState<CustomerPage>('home');
  const [adminPage, setAdminPage] = useState<AdminPage>('overview');

  // Menu Navigation
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Modals
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);
  const [customizingItem, setCustomizingItem] = useState<MenuItem | null>(null);
  const [trackingOrderId, setTrackingOrderId] = useState<string | null>(null);
  const [receiptOrderId, setReceiptOrderId] = useState<string | null>(null);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [confirmedOrderId, setConfirmedOrderId] = useState<string | null>(null);

  // Core Data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_menu`);
    return saved ? JSON.parse(saved) : INITIAL_MENU_ITEMS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_orders`);
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [tables, setTables] = useState<TableItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_tables`);
    return saved ? JSON.parse(saved) : INITIAL_TABLES;
  });

  const [inventory, setInventory] = useState<InventoryItem[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_inventory`);
    return saved ? JSON.parse(saved) : INITIAL_INVENTORY;
  });

  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem(`${LOCAL_STORAGE_KEY}_coupons`);
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [rewards] = useState<RewardItem[]>(INITIAL_REWARDS);
  const [customers, setCustomers] = useState<CustomerCRM[]>(INITIAL_CUSTOMERS);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  const [favorites, setFavorites] = useState<string[]>(['m_cappuccino', 'm_avocado_toast', 'm_chocolate_brownie']);

  // Customer Profile
  const [customerProfile, setCustomerProfile] = useState<CustomerInfo>({
    name: 'Rohan Sharma',
    phone: '+91 98765 43210',
    email: 'rohan.sharma@example.com',
  });

  const [loyaltyPoints, setLoyaltyPoints] = useState<number>(1280);

  // Cart & Fulfillment
  const [cart, setCart] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [appliedReward, setAppliedReward] = useState<RewardItem | null>(null);
  const [orderType, setOrderType] = useState<OrderType>('dine_in');

  const [tableDetails, setTableDetails] = useState<DineInDetails>({
    tableNumber: 12,
    guestCount: 2,
  });

  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    address: 'Flat 402, Green Glen Residency, Indiranagar',
    landmark: 'Near Metro Pillar 84',
    pincode: '560038',
    instructions: 'Please call on arrival',
  });

  const [pickupDetails, setPickupDetails] = useState<PickupDetails>({
    pickupTimeType: 'asap',
  });

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_menu`, JSON.stringify(menuItems));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_orders`, JSON.stringify(orders));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_tables`, JSON.stringify(tables));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_inventory`, JSON.stringify(inventory));
      localStorage.setItem(`${LOCAL_STORAGE_KEY}_coupons`, JSON.stringify(coupons));
    } catch (e) {
      console.error('Failed to sync to localStorage', e);
    }
  }, [menuItems, orders, tables, inventory, coupons]);

  const showToast = (message: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 4);
    setToasts((prev) => [...prev.slice(-4), { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart computations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);

  // Discount computation
  let computedDiscount = 0;
  if (appliedCoupon) {
    if (appliedCoupon.discountType === 'percentage') {
      const discount = (cartSubtotal * appliedCoupon.discountValue) / 100;
      computedDiscount = appliedCoupon.maxDiscount ? Math.min(discount, appliedCoupon.maxDiscount) : discount;
    } else {
      computedDiscount = appliedCoupon.discountValue;
    }
  } else if (appliedReward) {
    computedDiscount = appliedReward.discountValue;
  }
  const cartDiscount = Math.min(computedDiscount, cartSubtotal);

  // Taxes: 5% GST
  const taxableAmount = Math.max(0, cartSubtotal - cartDiscount);
  const cartTax = Number((taxableAmount * 0.05).toFixed(2));

  // Packaging fee: ₹0 for dine in, ₹15 for pickup/delivery
  const cartPackaging = cart.length > 0 && orderType !== 'dine_in' ? 15 : 0;

  // Delivery fee: ₹0 if subtotal >= 499 or not delivery, else ₹30
  const freeDeliveryThreshold = 499;
  const cartDelivery = orderType === 'delivery' && cartSubtotal > 0 ? (cartSubtotal >= freeDeliveryThreshold ? 0 : 30) : 0;
  const freeDeliveryDistance = Math.max(0, freeDeliveryThreshold - cartSubtotal);

  const cartGrandTotal = Number((taxableAmount + cartTax + cartPackaging + cartDelivery).toFixed(2));

  // Cart Handlers
  const addToCart = (
    item: MenuItem,
    customizations: SelectedCustomization[],
    quantity: number,
    specialInstructions?: string
  ) => {
    const extraPrice = customizations.reduce((acc, c) => acc + c.additionalPrice, 0);
    const itemPrice = item.price + extraPrice;
    const totalPrice = itemPrice * quantity;
    const cartItemId = `${item.id}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`;

    const newCartItem: CartItem = {
      cartItemId,
      menuItem: item,
      quantity,
      selectedCustomizations: customizations,
      specialInstructions,
      itemPrice,
      totalPrice,
    };

    setCart((prev) => [...prev, newCartItem]);
    showToast(`Added "${item.name}" to cart ✓`, 'success');
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    showToast('Item removed from cart', 'info');
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            if (newQty <= 0) return null;
            return {
              ...item,
              quantity: newQty,
              totalPrice: item.itemPrice * newQty,
            };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
    setAppliedReward(null);
  };

  const applyCoupon = (code: string): boolean => {
    const found = coupons.find((c) => c.code.toUpperCase() === code.trim().toUpperCase() && c.isActive);
    if (!found) {
      showToast('Invalid or expired promo code', 'error');
      return false;
    }
    if (cartSubtotal < found.minOrder) {
      showToast(`Minimum order of ₹${found.minOrder} required for ${found.code}`, 'warning');
      return false;
    }
    setAppliedReward(null); // remove any reward voucher if coupon applied
    setAppliedCoupon(found);
    showToast(`Promo code ${found.code} applied successfully! 🎉`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Promo code removed', 'info');
  };

  const redeemReward = (reward: RewardItem): boolean => {
    if (loyaltyPoints < reward.pointsRequired) {
      showToast(`Insufficient Brew Points (Requires ${reward.pointsRequired} pts)`, 'error');
      return false;
    }
    setAppliedCoupon(null);
    setAppliedReward(reward);
    showToast(`Reward "${reward.title}" applied! ₹${reward.discountValue} saved`, 'success');
    return true;
  };

  const removeReward = () => {
    setAppliedReward(null);
    showToast('Reward voucher removed', 'info');
  };

  const toggleFavorite = (itemId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(itemId);
      const updated = exists ? prev.filter((id) => id !== itemId) : [...prev, itemId];
      showToast(exists ? 'Removed from favorites' : 'Added to favorites ❤️', 'info');
      return updated;
    });
  };

  // Place Order
  const placeOrder = (paymentMethod: PaymentMethod): Order => {
    const nextOrderNum = 1025 + orders.length;
    const orderId = `BB${nextOrderNum}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: customerProfile,
      items: [...cart],
      orderType,
      tableDetails: orderType === 'dine_in' ? tableDetails : undefined,
      deliveryDetails: orderType === 'delivery' ? deliveryDetails : undefined,
      pickupDetails: orderType === 'pickup' ? pickupDetails : undefined,
      subtotal: cartSubtotal,
      discount: cartDiscount,
      tax: cartTax,
      packagingFee: cartPackaging,
      deliveryFee: cartDelivery,
      total: cartGrandTotal,
      promoCodeApplied: appliedCoupon?.code || (appliedReward ? appliedReward.title : undefined),
      paymentMethod,
      paymentStatus: 'paid',
      status: 'placed',
      estimatedReadyTime: orderType === 'dine_in' ? '10-12 mins' : orderType === 'pickup' ? '15 mins' : '25-30 mins',
      elapsedSeconds: 0,
    };

    // Update orders list
    setOrders((prev) => [newOrder, ...prev]);

    // If points redeemed, deduct them; else award 1 point per ₹10 spent
    if (appliedReward) {
      setLoyaltyPoints((pts) => Math.max(0, pts - appliedReward.pointsRequired));
    } else {
      const earned = Math.floor(cartGrandTotal / 10);
      setLoyaltyPoints((pts) => pts + earned);
    }

    // If dine in, mark table as occupied
    if (orderType === 'dine_in' && tableDetails.tableNumber) {
      setTables((prev) =>
        prev.map((tbl) =>
          tbl.id === tableDetails.tableNumber
            ? {
                ...tbl,
                status: 'occupied',
                currentOrderId: orderId,
                occupiedSince: 'Just now',
                guestCount: tableDetails.guestCount || 2,
              }
            : tbl
        )
      );
    }

    // Add Admin & Customer notifications
    const newAdminNotif: NotificationItem = {
      id: `notif_${Date.now()}_admin`,
      title: `New Order Received (#${orderId})`,
      message: `${orderType.toUpperCase()}: ₹${cartGrandTotal} by ${customerProfile.name}`,
      timestamp: 'Just now',
      read: false,
      type: 'order',
      orderId: orderId,
      targetRole: 'admin',
    };
    const newCustNotif: NotificationItem = {
      id: `notif_${Date.now()}_cust`,
      title: 'Order Confirmed! 🎉',
      message: `Order #${orderId} has been placed and received by the kitchen.`,
      timestamp: 'Just now',
      read: false,
      type: 'order',
      orderId: orderId,
      targetRole: 'customer',
    };
    setNotifications((prev) => [newAdminNotif, newCustNotif, ...prev]);

    // Clear cart
    clearCart();
    setIsCheckoutOpen(false);
    setIsCartDrawerOpen(false);
    setConfirmedOrderId(orderId);
    setTrackingOrderId(orderId);

    // Fire celebratory confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#E28743', '#6F4E37', '#40534C', '#D4A373', '#FFFFFF'],
      });
    } catch {
      // ignore
    }

    showToast(`Order #${orderId} placed successfully! 🎉`, 'success');
    return newOrder;
  };

  // Status transitions
  const updateOrderStatus = (orderId: string, status: OrderStatus) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, status } : ord))
    );

    // If marked ready or completed, add notification
    if (status === 'ready') {
      setNotifications((prev) => [
        {
          id: `notif_${Date.now()}`,
          title: 'Order is Ready! ☕',
          message: `Order #${orderId} is fresh, hot, and ready for you!`,
          timestamp: 'Just now',
          read: false,
          type: 'order',
          orderId,
          targetRole: 'customer',
        },
        ...prev,
      ]);
      showToast(`Order #${orderId} is now READY!`, 'success');
    } else if (status === 'preparing') {
      showToast(`Order #${orderId} moved to PREPARING 🍳`, 'info');
    } else if (status === 'completed') {
      showToast(`Order #${orderId} marked COMPLETED ✓`, 'success');
    }
  };

  // Reorder previous order
  const reorderItems = (order: Order) => {
    order.items.forEach((item) => {
      setCart((prev) => [
        ...prev,
        {
          ...item,
          cartItemId: `reorder_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        },
      ]);
    });
    setIsCartDrawerOpen(true);
    showToast(`Re-added ${order.items.length} items from #${order.id} to cart!`, 'success');
  };

  const rateOrder = (orderId: string, rating: number, feedback?: string) => {
    setOrders((prev) =>
      prev.map((ord) => (ord.id === orderId ? { ...ord, rating, feedback } : ord))
    );
    showToast('Thank you for your rating & feedback! ⭐', 'success');
  };

  // Table management
  const updateTableStatus = (tableId: number, status: 'available' | 'occupied' | 'reserved') => {
    setTables((prev) =>
      prev.map((tbl) =>
        tbl.id === tableId
          ? {
              ...tbl,
              status,
              currentOrderId: status === 'available' ? undefined : tbl.currentOrderId,
              occupiedSince: status === 'available' ? undefined : tbl.occupiedSince || 'Just now',
              hasStaffCall: false,
            }
          : tbl
      )
    );
    showToast(`Table ${tableId} is now marked ${status.toUpperCase()}`, 'info');
  };

  const callStaff = (tableNumber: number) => {
    setTables((prev) =>
      prev.map((tbl) => (tbl.id === tableNumber ? { ...tbl, hasStaffCall: true } : tbl))
    );
    setNotifications((prev) => [
      {
        id: `call_${Date.now()}`,
        title: `Staff Assistance Requested: Table ${tableNumber}`,
        message: `Customer at Table ${tableNumber} has requested a team member.`,
        timestamp: 'Just now',
        read: false,
        type: 'staff_call',
        targetRole: 'admin',
      },
      ...prev,
    ]);
    showToast(`Staff has been notified for Table ${tableNumber}. Someone will be with you shortly.`, 'success');
  };

  const dismissStaffCall = (tableNumber: number) => {
    setTables((prev) =>
      prev.map((tbl) => (tbl.id === tableNumber ? { ...tbl, hasStaffCall: false } : tbl))
    );
    showToast(`Staff call cleared for Table ${tableNumber}`, 'info');
  };

  // Menu Admin
  const toggleItemAvailability = (itemId: string) => {
    setMenuItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const next = !item.isAvailable;
          showToast(`"${item.name}" is now ${next ? 'AVAILABLE' : 'OUT OF STOCK'}`, next ? 'success' : 'warning');
          return { ...item, isAvailable: next };
        }
        return item;
      })
    );
  };

  const saveMenuItem = (item: MenuItem) => {
    setMenuItems((prev) => {
      const exists = prev.some((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) => (i.id === item.id ? item : i));
      }
      return [item, ...prev];
    });
    showToast(`Menu item "${item.name}" saved!`, 'success');
  };

  const deleteMenuItem = (itemId: string) => {
    setMenuItems((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Menu item deleted', 'info');
  };

  const restockInventory = (itemId: string, amount: number) => {
    setInventory((prev) =>
      prev.map((inv) => {
        if (inv.id === itemId) {
          const newStock = Number((inv.stock + amount).toFixed(1));
          const status = newStock <= inv.minStock ? (newStock <= inv.minStock * 0.5 ? 'critical' : 'low') : 'good';
          return {
            ...inv,
            stock: newStock,
            status,
            lastRestocked: 'Just now',
          };
        }
        return inv;
      })
    );
    showToast(`Inventory restocked (+${amount})`, 'success');
  };

  const toggleCouponStatus = (couponId: string) => {
    setCoupons((prev) =>
      prev.map((c) => (c.id === couponId ? { ...c, isActive: !c.isActive } : c))
    );
    showToast('Promo coupon status updated', 'info');
  };

  const saveCoupon = (coupon: Coupon) => {
    setCoupons((prev) => {
      const exists = prev.some((c) => c.id === coupon.id);
      return exists ? prev.map((c) => (c.id === coupon.id ? coupon : c)) : [coupon, ...prev];
    });
    showToast(`Coupon ${coupon.code} saved!`, 'success');
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    showToast('All notifications cleared', 'info');
  };

  // Demo simulation helper: advance order step
  const simulateAutoAdvanceOrder = (orderId: string) => {
    const target = orders.find((o) => o.id === orderId);
    if (!target) return;

    const nextMap: Record<OrderStatus, OrderStatus> = {
      placed: 'confirmed',
      confirmed: 'preparing',
      preparing: 'ready',
      ready: 'completed',
      completed: 'placed',
      cancelled: 'placed',
    };
    const nextStatus = nextMap[target.status];
    updateOrderStatus(orderId, nextStatus);
  };

  const resetToDefaultData = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_menu`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_orders`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_tables`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_inventory`);
    localStorage.removeItem(`${LOCAL_STORAGE_KEY}_coupons`);

    setMenuItems(INITIAL_MENU_ITEMS);
    setOrders(INITIAL_ORDERS);
    setTables(INITIAL_TABLES);
    setInventory(INITIAL_INVENTORY);
    setCoupons(INITIAL_COUPONS);
    setNotifications(INITIAL_NOTIFICATIONS);
    setCart([]);
    setAppliedCoupon(null);
    setAppliedReward(null);
    setLoyaltyPoints(1280);
    setConfirmedOrderId(null);
    setTrackingOrderId(null);
    showToast('Demo data reset to fresh defaults!', 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        setCurrentView,
        customerPage,
        setCustomerPage,
        adminPage,
        setAdminPage,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        customizingItem,
        setCustomizingItem,
        trackingOrderId,
        setTrackingOrderId,
        receiptOrderId,
        setReceiptOrderId,
        isCheckoutOpen,
        setIsCheckoutOpen,
        confirmedOrderId,
        setConfirmedOrderId,
        menuItems,
        orders,
        tables,
        inventory,
        coupons,
        rewards,
        customers,
        notifications,
        favorites,
        customerProfile,
        setCustomerProfile,
        loyaltyPoints,
        cart,
        appliedCoupon,
        appliedReward,
        orderType,
        setOrderType,
        tableDetails,
        setTableDetails,
        deliveryDetails,
        setDeliveryDetails,
        pickupDetails,
        setPickupDetails,
        cartSubtotal,
        cartDiscount,
        cartTax,
        cartPackaging,
        cartDelivery,
        cartGrandTotal,
        freeDeliveryDistance,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        applyCoupon,
        removeCoupon,
        redeemReward,
        removeReward,
        toggleFavorite,
        placeOrder,
        updateOrderStatus,
        reorderItems,
        rateOrder,
        updateTableStatus,
        callStaff,
        dismissStaffCall,
        toggleItemAvailability,
        saveMenuItem,
        deleteMenuItem,
        restockInventory,
        toggleCouponStatus,
        saveCoupon,
        markNotificationRead,
        clearAllNotifications,
        simulateAutoAdvanceOrder,
        resetToDefaultData,
        toasts,
        showToast,
        removeToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

export const AppContextProvider = AppProvider;
