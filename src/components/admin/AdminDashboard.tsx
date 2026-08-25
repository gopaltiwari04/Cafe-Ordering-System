import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  LayoutDashboard,
  ShoppingBag,
  UtensilsCrossed,
  Grid,
  Package,
  BarChart3,
  Coffee,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  QrCode,
  DollarSign,
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  Eye,
  Receipt,
  Printer,
  ChevronRight,
  Filter,
  ArrowUpRight,
  Sparkles,
  X,
  Check,
  Percent,
} from 'lucide-react';
import { useApp, AdminPage } from '../../context/AppContext';
import { Order, OrderStatus, MenuItem, ProductCategory, TableItem } from '../../types';

export const AdminDashboard: React.FC = () => {
  const {
    adminPage,
    setAdminPage,
    setCurrentView,
    orders,
    menuItems,
    toggleItemAvailability,
    saveMenuItem,
    tables,
    updateTableStatus,
    dismissStaffCall,
    inventory,
    restockInventory,
    updateOrderStatus,
    setReceiptOrderId,
    showToast,
  } = useApp();

  const tableCalls = tables.filter((t) => t.hasStaffCall).map((t) => t.id);

  // Filter & Search states
  const [orderSearch, setOrderSearch] = useState('');
  const [orderStatusFilter, setOrderStatusFilter] = useState<'all' | OrderStatus>('all');
  const [menuSearch, setMenuSearch] = useState('');
  const [selectedQRTable, setSelectedQRTable] = useState<TableItem | null>(null);
  const [isAddItemModalOpen, setIsAddItemModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);

  // New item form
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<ProductCategory>('Coffee');
  const [formPrice, setFormPrice] = useState(199);
  const [formDescription, setFormDescription] = useState('');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=600&q=80');
  const [formIsVeg, setFormIsVeg] = useState(true);
  const [formIsBestseller, setFormIsBestseller] = useState(false);

  // KPI calculations
  const totalRevenue = orders.reduce((sum, o) => (o.status !== 'cancelled' ? sum + o.total : sum), 0);
  const totalOrdersCount = orders.length;
  const activeOrdersCount = orders.filter((o) => o.status !== 'completed' && o.status !== 'cancelled').length;
  const avgOrderValue = totalOrdersCount > 0 ? totalRevenue / totalOrdersCount : 0;
  const occupiedTables = tables.filter((t) => t.status === 'occupied').length;
  const tableOccupancyRate = Math.round((occupiedTables / tables.length) * 100);

  const handleSaveItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName) return;

    if (editingItem) {
      saveMenuItem({
        ...editingItem,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDescription,
        image: formImage,
        isVeg: formIsVeg,
        isBestseller: formIsBestseller,
      });
      setEditingItem(null);
    } else {
      saveMenuItem({
        id: `m_${Date.now()}`,
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        description: formDescription,
        image: formImage,
        isVeg: formIsVeg,
        isBestseller: formIsBestseller,
        isAvailable: true,
        rating: 4.8,
        reviewCount: 1,
        prepTime: '10-12 mins',
      });
    }

    setIsAddItemModalOpen(false);
    // Reset
    setFormName('');
    setFormDescription('');
  };

  const openEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormDescription(item.description);
    setFormImage(item.image);
    setFormIsVeg(item.isVeg);
    setFormIsBestseller(item.isBestseller || false);
    setIsAddItemModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#F4EFEA] flex flex-col lg:flex-row font-sans">
      {/* 1. Admin Sidebar Navigation */}
      <aside className="w-full lg:w-64 bg-[#1E130D] text-[#FBF8F4] shrink-0 flex flex-col justify-between border-r border-[#3D2518]">
        <div>
          {/* Brand Header */}
          <div className="p-6 border-b border-[#3D2518] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-[#E28743] text-[#1E130D] flex items-center justify-center font-bold shadow-md">
                <Coffee className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif font-bold text-base text-white tracking-wide">
                  BREW &amp; BITE
                </h2>
                <span className="text-[10px] text-[#D4A373] uppercase font-bold tracking-wider">
                  Café Manager OS
                </span>
              </div>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="p-4 space-y-1.5">
            {[
              { id: 'overview' as AdminPage, label: 'Overview & Metrics', icon: <LayoutDashboard className="w-4 h-4" /> },
              { id: 'orders' as AdminPage, label: 'Live Orders', icon: <ShoppingBag className="w-4 h-4" />, count: activeOrdersCount },
              { id: 'menu' as AdminPage, label: 'Menu Catalog', icon: <UtensilsCrossed className="w-4 h-4" /> },
              { id: 'tables' as AdminPage, label: 'Tables & QR Map', icon: <Grid className="w-4 h-4" />, alert: tableCalls.length > 0 },
              { id: 'inventory' as AdminPage, label: 'Stock & Inventory', icon: <Package className="w-4 h-4" /> },
              { id: 'analytics' as AdminPage, label: 'Sales Analytics', icon: <BarChart3 className="w-4 h-4" /> },
            ].map((tab) => {
              const isActive = adminPage === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setAdminPage(tab.id)}
                  className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-[#E28743] text-white shadow-md font-bold'
                      : 'text-[#D4C3B3] hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {tab.icon}
                    <span>{tab.label}</span>
                  </div>

                  {tab.count !== undefined && tab.count > 0 && (
                    <span className="bg-white/20 text-white px-2 py-0.5 rounded-full text-[10px] font-mono font-bold">
                      {tab.count}
                    </span>
                  )}
                  {tab.alert && (
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Quick Switchers */}
        <div className="p-4 border-t border-[#3D2518] space-y-2">
          <button
            onClick={() => setCurrentView('kitchen')}
            className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-bold flex items-center justify-center gap-2 transition-colors"
          >
            <Clock className="w-4 h-4 text-[#E28743]" />
            <span>Open Kitchen KDS</span>
          </button>

          <button
            onClick={() => setCurrentView('customer')}
            className="w-full py-2 px-3 rounded-xl border border-white/20 hover:bg-white/10 text-stone-300 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Exit to Customer Menu</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Admin Workspace */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header Status Bar */}
        <header className="p-4 sm:p-6 bg-white border-b border-[#E8DFD5] flex flex-wrap items-center justify-between gap-4 sticky top-0 z-20 shadow-xs">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-[#8B5A2B]">
              Store #101 • Indiranagar Flagship
            </span>
            <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#2C1810]">
              {adminPage === 'overview' && 'Café Performance Overview'}
              {adminPage === 'orders' && 'Real-Time Order Pipeline'}
              {adminPage === 'menu' && 'Digital Menu & Availability'}
              {adminPage === 'tables' && 'Dine-In Floor & QR Management'}
              {adminPage === 'inventory' && 'Ingredient Inventory & Restock'}
              {adminPage === 'analytics' && 'Sales & Demand Analytics'}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-1.5 rounded-xl border border-[#E8DFD5] text-xs text-[#2C1810]">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Café Status: <strong>Open &amp; Taking Orders</strong></span>
            </div>

            {adminPage === 'menu' && (
              <button
                onClick={() => {
                  setEditingItem(null);
                  setFormName('');
                  setFormDescription('');
                  setIsAddItemModalOpen(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold shadow-sm transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add New Dish</span>
              </button>
            )}
          </div>
        </header>

        {/* Dynamic Sub-Page Content */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
          {/* TAB 1: OVERVIEW & METRICS */}
          {adminPage === 'overview' && (
            <div className="space-y-6">
              {/* KPI Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>Today's Total Sales</span>
                    <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
                      <DollarSign className="w-4 h-4" />
                    </div>
                  </div>
                  <strong className="text-2xl font-serif font-bold text-[#2C1810] block font-mono">
                    ₹{totalRevenue.toFixed(2)}
                  </strong>
                  <span className="text-[11px] text-emerald-700 font-bold flex items-center gap-1">
                    <TrendingUp className="w-3.5 h-3.5" /> +18.4% vs last Tuesday
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>Total Orders Placed</span>
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600">
                      <ShoppingBag className="w-4 h-4" />
                    </div>
                  </div>
                  <strong className="text-2xl font-serif font-bold text-[#2C1810] block font-mono">
                    {totalOrdersCount}
                  </strong>
                  <span className="text-[11px] text-stone-500">
                    {activeOrdersCount} in active preparation
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>Average Ticket Size</span>
                    <div className="p-2 rounded-xl bg-amber-50 text-[#E28743]">
                      <Percent className="w-4 h-4" />
                    </div>
                  </div>
                  <strong className="text-2xl font-serif font-bold text-[#2C1810] block font-mono">
                    ₹{avgOrderValue.toFixed(2)}
                  </strong>
                  <span className="text-[11px] text-stone-500">
                    ~2.4 items per ticket
                  </span>
                </div>

                <div className="bg-white p-5 rounded-2xl border border-[#E8DFD5] shadow-xs space-y-2">
                  <div className="flex items-center justify-between text-xs text-stone-500 font-medium">
                    <span>Table Occupancy</span>
                    <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
                      <Users className="w-4 h-4" />
                    </div>
                  </div>
                  <strong className="text-2xl font-serif font-bold text-[#2C1810] block font-mono">
                    {tableOccupancyRate}%
                  </strong>
                  <span className="text-[11px] text-stone-500">
                    {occupiedTables} of {tables.length} tables seated
                  </span>
                </div>
              </div>

              {/* Real-time Activity Feed & Quick Actions */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Live orders preview */}
                <div className="lg:col-span-2 bg-white rounded-3xl border border-[#E8DFD5] p-5 shadow-xs space-y-4">
                  <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
                    <h3 className="font-serif font-bold text-base text-[#2C1810]">
                      Recent Live Orders
                    </h3>
                    <button
                      onClick={() => setAdminPage('orders')}
                      className="text-xs text-[#E28743] hover:underline font-bold"
                    >
                      View All Orders →
                    </button>
                  </div>

                  <div className="space-y-2.5">
                    {orders.slice(0, 5).map((ord) => (
                      <div
                        key={ord.id}
                        className="p-3 bg-[#FAF6F0] rounded-xl border border-[#E8DFD5] flex items-center justify-between gap-3 text-xs"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#2C1810]">
                            #{ord.id}
                          </span>
                          <div>
                            <strong className="block text-[#2C1810]">
                              {ord.customer.name}
                            </strong>
                            <span className="text-[11px] text-stone-500">
                              {ord.items.length} items • {ord.orderType.toUpperCase()}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className="font-mono font-bold text-[#2C1810]">
                            ₹{ord.total.toFixed(2)}
                          </span>
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              ord.status === 'ready'
                                ? 'bg-emerald-100 text-emerald-800'
                                : ord.status === 'preparing'
                                ? 'bg-amber-100 text-amber-800'
                                : 'bg-blue-100 text-blue-800'
                            }`}
                          >
                            {ord.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Selling Items Mini Box */}
                <div className="bg-white rounded-3xl border border-[#E8DFD5] p-5 shadow-xs space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#2C1810] pb-3 border-b border-[#F2ECE4]">
                    Today's Top Sellers
                  </h3>

                  <div className="space-y-3">
                    {menuItems.filter((m) => m.isBestseller).slice(0, 4).map((item, idx) => (
                      <div key={item.id} className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-[#FAF6F0] border border-[#E8DFD5] text-[#8B5A2B] font-mono font-bold flex items-center justify-center text-[10px]">
                            {idx + 1}
                          </span>
                          <div>
                            <strong className="block text-[#2C1810] leading-tight">
                              {item.name}
                            </strong>
                            <span className="text-[10px] text-stone-500">
                              {item.category}
                            </span>
                          </div>
                        </div>
                        <span className="font-mono font-bold text-[#2C1810]">
                          ₹{item.price}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LIVE ORDERS MANAGEMENT */}
          {adminPage === 'orders' && (
            <div className="space-y-4 bg-white rounded-3xl border border-[#E8DFD5] p-5 shadow-xs">
              {/* Filter controls */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pb-4 border-b border-[#F2ECE4]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={orderSearch}
                    onChange={(e) => setOrderSearch(e.target.value)}
                    placeholder="Search Order ID, Customer name..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  />
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                  {(['all', 'placed', 'preparing', 'ready', 'completed', 'cancelled'] as const).map((st) => (
                    <button
                      key={st}
                      onClick={() => setOrderStatusFilter(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-colors ${
                        orderStatusFilter === st
                          ? 'bg-[#2C1810] text-white'
                          : 'bg-[#FAF6F0] text-stone-600 hover:bg-[#E8DFD5]'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

              {/* Orders Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF6F0] text-stone-600 font-bold uppercase text-[10px] border-b border-[#E8DFD5]">
                    <tr>
                      <th className="p-3">Ticket ID</th>
                      <th className="p-3">Customer</th>
                      <th className="p-3">Type</th>
                      <th className="p-3">Items Summary</th>
                      <th className="p-3">Total</th>
                      <th className="p-3">Status</th>
                      <th className="p-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F2ECE4]">
                    {orders
                      .filter((o) => {
                        if (orderStatusFilter !== 'all' && o.status !== orderStatusFilter) return false;
                        if (orderSearch.trim()) {
                          const q = orderSearch.toLowerCase();
                          return o.id.toLowerCase().includes(q) || o.customer.name.toLowerCase().includes(q);
                        }
                        return true;
                      })
                      .map((ord) => (
                        <tr key={ord.id} className="hover:bg-[#FAF6F0]/60 transition-colors">
                          <td className="p-3 font-mono font-bold text-[#2C1810]">
                            #{ord.id}
                          </td>
                          <td className="p-3">
                            <strong className="block text-[#2C1810]">{ord.customer.name}</strong>
                            <span className="text-[10px] text-stone-500">{ord.customer.phone}</span>
                          </td>
                          <td className="p-3">
                            <span className="px-2 py-0.5 rounded bg-stone-100 font-medium text-[10px]">
                              {ord.orderType === 'dine_in'
                                ? `Table ${ord.tableDetails?.tableNumber || 12}`
                                : ord.orderType.toUpperCase()}
                            </span>
                          </td>
                          <td className="p-3 text-[#5C4033] max-w-xs truncate">
                            {ord.items.map((it) => `${it.quantity}x ${it.menuItem.name}`).join(', ')}
                          </td>
                          <td className="p-3 font-mono font-bold text-[#2C1810]">
                            ₹{ord.total.toFixed(2)}
                          </td>
                          <td className="p-3">
                            <select
                              value={ord.status}
                              onChange={(e) => updateOrderStatus(ord.id, e.target.value as OrderStatus)}
                              className="text-[11px] p-1.5 rounded-lg border border-[#E8DFD5] bg-white font-bold"
                            >
                              <option value="placed">Placed</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="preparing">Preparing</option>
                              <option value="ready">Ready</option>
                              <option value="completed">Completed</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                          </td>
                          <td className="p-3 text-right">
                            <button
                              onClick={() => setReceiptOrderId(ord.id)}
                              className="p-1.5 rounded-lg bg-[#FAF6F0] hover:bg-[#E8DFD5] text-[#2C1810] transition-colors"
                              title="Print Receipt"
                            >
                              <Receipt className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 3: MENU MANAGEMENT & 86 OUT-OF-STOCK TOGGLES */}
          {adminPage === 'menu' && (
            <div className="space-y-4 bg-white rounded-3xl border border-[#E8DFD5] p-5 shadow-xs">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-[#F2ECE4]">
                <div className="relative w-full sm:w-80">
                  <Search className="w-4 h-4 text-stone-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    value={menuSearch}
                    onChange={(e) => setMenuSearch(e.target.value)}
                    placeholder="Search menu dishes..."
                    className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  />
                </div>
                <span className="text-xs text-stone-500">
                  Total Items: <strong>{menuItems.length}</strong>
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {menuItems
                  .filter((m) => m.name.toLowerCase().includes(menuSearch.toLowerCase()))
                  .map((item) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border flex items-start gap-3 transition-all ${
                        item.isAvailable
                          ? 'bg-white border-[#E8DFD5]'
                          : 'bg-stone-100 border-stone-300 opacity-60'
                      }`}
                    >
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-xl object-cover bg-stone-200 shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-1">
                          <h4 className="font-bold text-xs text-[#2C1810] truncate">
                            {item.name}
                          </h4>
                          <span className="font-mono font-bold text-xs text-[#2C1810]">
                            ₹{item.price}
                          </span>
                        </div>
                        <span className="text-[10px] text-stone-500 block mb-2">
                          {item.category}
                        </span>

                        <div className="flex items-center justify-between pt-2 border-t border-stone-100">
                          {/* 86 Toggle */}
                          <label className="flex items-center gap-1.5 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={item.isAvailable}
                              onChange={() => toggleItemAvailability(item.id)}
                              className="rounded text-[#E28743] focus:ring-0"
                            />
                            <span className="text-[11px] font-semibold text-stone-700">
                              {item.isAvailable ? 'In Stock' : 'Out of Stock (86)'}
                            </span>
                          </label>

                          <button
                            onClick={() => openEditModal(item)}
                            className="p-1 text-stone-400 hover:text-[#2C1810]"
                            title="Edit Item"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* TAB 4: TABLE MANAGEMENT & QR FLOOR MAP */}
          {adminPage === 'tables' && (
            <div className="space-y-6">
              {/* Staff Calls notification */}
              {tableCalls.length > 0 && (
                <div className="p-4 bg-amber-500 text-black rounded-2xl flex items-center justify-between font-bold text-xs shadow-md">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 animate-bounce" />
                    <span>
                      ACTIVE WAITER CALLS: Tables {tableCalls.join(', ')} require service!
                    </span>
                  </div>
                  <div className="flex gap-2">
                    {tableCalls.map((tNum) => (
                      <button
                        key={tNum}
                        onClick={() => dismissStaffCall(tNum)}
                        className="bg-black text-white px-3 py-1 rounded-lg text-[11px] hover:bg-stone-800"
                      >
                        Clear Table {tNum}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Tables Floor Map Grid */}
              <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
                  <div>
                    <h3 className="font-serif font-bold text-lg text-[#2C1810]">
                      Interactive Dining Floor Layout
                    </h3>
                    <p className="text-xs text-stone-500">
                      Manage seated parties, take bills, and print/scan QR codes for individual tables.
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-emerald-500" /> Available
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-3 h-3 rounded-full bg-amber-500" /> Occupied
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                  {tables.map((table) => {
                    const isCalling = tableCalls.includes(table.id);
                    return (
                      <div
                        key={table.id}
                        className={`p-4 rounded-2xl border flex flex-col justify-between space-y-3 transition-all ${
                          table.status === 'occupied'
                            ? 'bg-[#FAF6F0] border-amber-300 shadow-xs'
                            : 'bg-white border-[#E8DFD5]'
                        } ${isCalling ? 'ring-2 ring-red-500 animate-pulse' : ''}`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-lg text-[#2C1810]">
                              Table {table.id}
                            </span>
                            <span
                              className={`text-[10px] uppercase px-2 py-0.5 rounded-full font-bold ${
                                table.status === 'occupied'
                                  ? 'bg-amber-100 text-amber-800'
                                  : 'bg-emerald-100 text-emerald-800'
                              }`}
                            >
                              {table.status}
                            </span>
                          </div>

                          <button
                            onClick={() => setSelectedQRTable(table)}
                            className="p-1.5 rounded-lg bg-white border border-[#E8DFD5] hover:bg-[#FAF6F0] text-stone-700"
                            title="View Table QR Code"
                          >
                            <QrCode className="w-4 h-4" />
                          </button>
                        </div>

                        <div className="text-xs text-stone-600 space-y-1">
                          <p>Capacity: <strong>{table.capacity} Guests</strong></p>
                          <p>Section: <strong>{table.name}</strong></p>
                          {table.status === 'occupied' && (
                            <p className="text-[#E28743] font-mono font-bold">
                              Seated: {table.occupiedSince || 'Active'}
                            </p>
                          )}
                        </div>

                        <div className="pt-2 border-t border-stone-200 flex gap-2">
                          {table.status === 'available' ? (
                            <button
                              onClick={() => updateTableStatus(table.id, 'occupied')}
                              className="w-full py-1.5 bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold rounded-lg transition-colors"
                            >
                              Seat Guests
                            </button>
                          ) : (
                            <button
                              onClick={() => updateTableStatus(table.id, 'available')}
                              className="w-full py-1.5 bg-stone-200 hover:bg-stone-300 text-[#2C1810] text-xs font-bold rounded-lg transition-colors"
                            >
                              Vacate / Settle
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: STOCK & INVENTORY RESTOCK */}
          {adminPage === 'inventory' && (
            <div className="space-y-4 bg-white rounded-3xl border border-[#E8DFD5] p-5 shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#F2ECE4]">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2C1810]">
                    Raw Material &amp; Pantry Inventory
                  </h3>
                  <p className="text-xs text-stone-500">
                    Real-time stock tracking with automatic low-threshold alerts.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {inventory.map((inv) => {
                  const isLow = inv.stock <= inv.minStock;

                  return (
                    <div
                      key={inv.id}
                      className={`p-4 rounded-2xl border flex items-center justify-between gap-3 ${
                        isLow
                          ? 'bg-amber-50/70 border-amber-300'
                          : 'bg-[#FAF6F0] border-[#E8DFD5]'
                      }`}
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-[#2C1810]">
                            {inv.name}
                          </h4>
                          {isLow && (
                            <span className="text-[10px] bg-red-100 text-red-700 px-1.5 py-0.2 rounded font-bold">
                              Low Stock
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-stone-500 block">
                          Stock: <strong>{inv.stock} {inv.unit}</strong> (Min: {inv.minStock} {inv.unit})
                        </span>
                      </div>

                      <button
                        onClick={() => restockInventory(inv.id, 20)}
                        className="px-3 py-1.5 rounded-lg bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold transition-colors"
                      >
                        + Restock
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 6: SALES & REVENUE ANALYTICS */}
          {adminPage === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Revenue Breakdown */}
                <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 shadow-xs space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#2C1810]">
                    Category Sales Distribution
                  </h3>

                  <div className="space-y-3">
                    {[
                      { name: 'Coffee & Espresso Bar', share: 42, color: 'bg-[#2C1810]' },
                      { name: 'Breakfast & Toasties', share: 24, color: 'bg-[#E28743]' },
                      { name: 'Pizzas & Pastas', share: 20, color: 'bg-[#8B5A2B]' },
                      { name: 'Bakery & Desserts', share: 14, color: 'bg-[#D4A373]' },
                    ].map((cat) => (
                      <div key={cat.name} className="space-y-1">
                        <div className="flex justify-between text-xs text-[#2C1810]">
                          <span>{cat.name}</span>
                          <strong className="font-mono">{cat.share}%</strong>
                        </div>
                        <div className="w-full bg-[#FAF6F0] h-2 rounded-full overflow-hidden">
                          <div
                            className={`${cat.color} h-full rounded-full`}
                            style={{ width: `${cat.share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Peak Hours Rush Pattern */}
                <div className="bg-white rounded-3xl border border-[#E8DFD5] p-6 shadow-xs space-y-4">
                  <h3 className="font-serif font-bold text-base text-[#2C1810]">
                    Hourly Demand &amp; Customer Rush
                  </h3>

                  <div className="grid grid-cols-5 gap-2 items-end h-40 pt-4">
                    {[
                      { hour: '8 AM', height: '60%' },
                      { hour: '11 AM', height: '95%' },
                      { hour: '2 PM', height: '70%' },
                      { hour: '5 PM', height: '85%' },
                      { hour: '8 PM', height: '90%' },
                    ].map((bar) => (
                      <div key={bar.hour} className="flex flex-col items-center gap-1.5 h-full justify-end">
                        <div
                          className="w-full bg-[#E28743] rounded-t-lg hover:opacity-80 transition-opacity"
                          style={{ height: bar.height }}
                        />
                        <span className="text-[10px] text-stone-500 font-mono">
                          {bar.hour}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* TABLE QR CODE MODAL */}
      <AnimatePresence>
        {selectedQRTable && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-sm rounded-3xl p-6 border border-[#E8DFD5] shadow-2xl text-center space-y-4 relative"
            >
              <button
                onClick={() => setSelectedQRTable(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-1">
                <span className="text-xs font-bold uppercase tracking-widest text-[#E28743]">
                  Digital Dine-In QR
                </span>
                <h3 className="text-2xl font-serif font-bold text-[#2C1810]">
                  Table {selectedQRTable.id}
                </h3>
                <p className="text-xs text-[#6F4E37]">
                  {selectedQRTable.name} • Capacity {selectedQRTable.capacity} Seats
                </p>
              </div>

              <div className="p-6 bg-[#FAF6F0] rounded-2xl border border-[#E8DFD5] inline-block shadow-inner">
                <QrCode className="w-36 h-36 text-[#2C1810] mx-auto" />
              </div>

              <p className="text-[11px] text-stone-500 font-mono">
                URL: https://brewandbite.cafe/table/{selectedQRTable.id}
              </p>

              <button
                onClick={() => {
                  setSelectedQRTable(null);
                  setCurrentView('qr_table');
                }}
                className="w-full py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white text-xs font-bold transition-colors"
              >
                Simulate Guest Scanning Table {selectedQRTable.id} QR
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD/EDIT DISH MODAL */}
      <AnimatePresence>
        {isAddItemModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white w-full max-w-md rounded-3xl p-6 border border-[#E8DFD5] shadow-2xl space-y-4 relative"
            >
              <button
                onClick={() => setIsAddItemModalOpen(false)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-700"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif font-bold text-xl text-[#2C1810]">
                {editingItem ? 'Edit Menu Item' : 'Add New Menu Item'}
              </h3>

              <form onSubmit={handleSaveItem} className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#2C1810] uppercase mb-1">
                    Dish / Drink Name *
                  </label>
                  <input
                    type="text"
                    value={formName}
                    onChange={(e) => setFormName(e.target.value)}
                    required
                    placeholder="e.g. Pistachio Matcha Latte"
                    className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                  />
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block font-bold text-[#2C1810] uppercase mb-1">
                      Category
                    </label>
                    <select
                      value={formCategory}
                      onChange={(e) => setFormCategory(e.target.value as ProductCategory)}
                      className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                    >
                      <option value="Coffee">Coffee</option>
                      <option value="Tea">Tea</option>
                      <option value="Breakfast">Breakfast</option>
                      <option value="Sandwiches">Sandwiches</option>
                      <option value="Burgers">Burgers</option>
                      <option value="Pizza">Pizza</option>
                      <option value="Pasta">Pasta</option>
                      <option value="Snacks">Snacks</option>
                      <option value="Desserts">Desserts</option>
                      <option value="Cold Beverages">Cold Beverages</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-[#2C1810] uppercase mb-1">
                      Price (₹) *
                    </label>
                    <input
                      type="number"
                      value={formPrice}
                      onChange={(e) => setFormPrice(Number(e.target.value))}
                      required
                      className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C1810] uppercase mb-1">
                    Description
                  </label>
                  <textarea
                    rows={2}
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    placeholder="Tasting notes and ingredients..."
                    className="w-full p-2.5 rounded-xl border border-[#E8DFD5] bg-[#FBF8F4] resize-none"
                  />
                </div>

                <div className="flex gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsVeg}
                      onChange={(e) => setFormIsVeg(e.target.checked)}
                      className="rounded text-emerald-600"
                    />
                    <span>Vegetarian</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formIsBestseller}
                      onChange={(e) => setFormIsBestseller(e.target.checked)}
                      className="rounded text-[#E28743]"
                    />
                    <span>Bestseller Badge</span>
                  </label>
                </div>

                <div className="flex gap-2 pt-3">
                  <button
                    type="button"
                    onClick={() => setIsAddItemModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-[#E8DFD5] font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-[#2C1810] hover:bg-[#E28743] text-white font-bold transition-colors"
                  >
                    {editingItem ? 'Save Updates' : 'Add to Menu'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
