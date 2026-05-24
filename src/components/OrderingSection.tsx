/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, Search, Plus, Minus, Trash2, ArrowRight, CheckCircle, 
  MapPin, Clock, Tag, CreditCard, Sparkles, Receipt, X 
} from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO } from '../data';
import { MenuItem, CartItem } from '../types';

interface OrderingSectionProps {
  cart: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onAddItem: (item: MenuItem, customization?: string) => void;
}

export default function OrderingSection({ 
  cart, onUpdateQuantity, onRemoveItem, onClearCart, onAddItem 
}: OrderingSectionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'supper' | 'lunch' | 'brunch' | 'sweets' | 'beverage' | 'happy hour' | 'kiddos'>('all');
  const [promoCode, setPromoCode] = useState('');
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [discountPercent, setDiscountPercent] = useState(0);
  const [customizationText, setCustomizationText] = useState('');
  const [selectedItemToConfigure, setSelectedItemToConfigure] = useState<MenuItem | null>(null);
  const [configQuantity, setConfigQuantity] = useState(1);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<'form' | 'processing' | 'confirmed'>('form');
  const [deliveryType, setDeliveryType] = useState<'pickup' | 'curbside'>('pickup');
  const [pickupTime, setPickupTime] = useState('20 mins (Earliest)');
  
  // Checkout fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [orderId, setOrderId] = useState('');

  const categories = [
    { id: 'all', label: 'All Items' },
    { id: 'supper', label: 'Supper' },
    { id: 'lunch', label: 'Lunch' },
    { id: 'brunch', label: 'Brunch' },
    { id: 'sweets', label: 'Sweets' },
    { id: 'beverage', label: 'Beverages' },
    { id: 'happy hour', label: 'Happy Hour' },
    { id: 'kiddos', label: 'Kiddos' },
  ];

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'SAYYALL') {
      setAppliedPromo('SAYYALL');
      setDiscountPercent(15);
      setPromoCode('');
    } else {
      alert('Invalid promo code. Hint: Use code SAYYALL for 15% off!');
    }
  };

  const filteredItems = MENU_ITEMS.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const subtotal = cart.reduce((sum, item) => sum + (item.menuItem.price * item.quantity), 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const taxRate = 0.0825; // 8.25% Austin Austin Tax
  const taxAmount = (subtotal - discountAmount) * taxRate;
  const grandTotal = subtotal - discountAmount + taxAmount;

  const handleOpenConfigure = (item: MenuItem) => {
    setSelectedItemToConfigure(item);
    setConfigQuantity(1);
    setCustomizationText('');
  };

  const handleAddConfiguredItem = () => {
    if (selectedItemToConfigure) {
      for (let i = 0; i < configQuantity; i++) {
        onAddItem(selectedItemToConfigure, customizationText);
      }
      setSelectedItemToConfigure(null);
    }
  };

  const handleStartCheckout = () => {
    if (cart.length === 0) return;
    setCheckoutStep('form');
    setCheckoutModalOpen(true);
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerPhone || !customerEmail) {
      alert('Please fill out all required fields.');
      return;
    }
    setCheckoutStep('processing');
    
    // Simulate API delay
    setTimeout(() => {
      setOrderId('CK-' + Math.floor(100000 + Math.random() * 900000));
      setCheckoutStep('confirmed');
    }, 1800);
  };

  const handleFinishCheckout = () => {
    setCheckoutModalOpen(false);
    onClearCart();
  };

  return (
    <div className="w-full bg-[#fcf9f4]">
      {/* Mini banner context */}
      <div className="bg-brand-forest py-12 text-center text-brand-cream relative overflow-hidden mt-20">
        <div className="max-w-4xl mx-auto z-10 relative px-4">
          <h1 className="font-display font-medium text-4xl uppercase tracking-wider text-white">Online Ordering Portal</h1>
          <p className="text-brand-gold font-serif italic text-sm mt-1">Refined Southern Comfort &bull; Prepared For Pick Up</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Menu catalog list (8 columns) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Search and Quick Filters banner */}
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/60 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                {/* Search input */}
                <div className="relative w-full sm:w-72">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-neutral-400 pointer-events-none">
                    <Search size={16} />
                  </span>
                  <input
                    type="text"
                    placeholder="Search dishes, ingredients..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-neutral-50 hover:bg-neutral-100/50 focus:bg-white text-sm text-neutral-800 pl-9 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-sans"
                  />
                  {searchTerm && (
                    <button 
                      onClick={() => setSearchTerm('')}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-neutral-400 hover:text-neutral-600 focus:outline-none"
                    >
                      Clear
                    </button>
                  )}
                </div>

                {/* Subtitle count */}
                <span className="text-xs font-mono text-neutral-500 uppercase tracking-wider">
                  Select item to customize &bull; {filteredItems.length} available
                </span>
              </div>

              {/* Categorical Buttons inside Ordering Portal */}
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    id={`order-cat-btn-${cat.id}`}
                    onClick={() => setActiveCategory(cat.id as any)}
                    className={`py-2 px-4 rounded-xl text-xs font-sans tracking-wider font-semibold border transition-all cursor-pointer whitespace-nowrap ${
                      activeCategory === cat.id
                        ? 'bg-brand-moss text-brand-gold border-brand-gold shadow-sm'
                        : 'bg-neutral-50 text-neutral-700 hover:text-black hover:bg-neutral-150 border-neutral-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Menu Catalog Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredItems.map(item => (
                <div
                  key={item.id}
                  id={`ordering-item-card-${item.id}`}
                  className="bg-white rounded-2xl border border-neutral-200/60 p-4 transition-all hover:border-brand-gold/60 hover:shadow-md flex gap-4 group cursor-pointer"
                  onClick={() => handleOpenConfigure(item)}
                >
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden flex-shrink-0 bg-neutral-100">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-102"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{item.category}</span>
                        <span className="text-sm font-semibold font-mono text-brand-forest">${item.price.toFixed(2)}</span>
                      </div>
                      <h3 className="font-display font-medium text-sm sm:text-base text-brand-charcoal leading-tight mt-1 group-hover:text-brand-forest transition-colors">
                        {item.name}
                      </h3>
                      <p className="text-xs text-neutral-500 line-clamp-2 mt-1 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="flex justify-end pt-2">
                      <span className="text-[10px] py-1 px-2 rounded-lg bg-neutral-100 hover:bg-brand-cream font-sans tracking-wider font-bold text-brand-moss flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                        BUILD &bull; ADD <Plus size={10} />
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              {filteredItems.length === 0 && (
                <div className="col-span-full py-16 text-center bg-white rounded-2xl border border-dashed border-neutral-300">
                  <p className="text-neutral-500 font-sans text-sm">No items match your search. Try resetting filters.</p>
                  <button 
                    onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
                    className="mt-3 text-xs text-brand-forest font-bold tracking-wider underline hover:text-brand-gold"
                  >
                    RESET SELECTION
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Right: Smart Order Checkout Dashboard (4 columns) */}
          <div className="lg:col-span-4 bg-white rounded-2xl border border-neutral-200/80 shadow-md p-6 sticky top-36">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-100">
              <h2 className="font-display font-medium text-lg text-brand-forest flex items-center gap-2">
                <ShoppingBag size={20} className="text-brand-gold" />
                <span>My Basket</span>
              </h2>
              <span className="bg-brand-cream text-brand-moss font-semibold font-mono text-xs py-1 px-2.5 rounded-full">
                {cart.length} unique items
              </span>
            </div>

            {/* Cart items list */}
            <div className="divide-y divide-neutral-100 max-h-[350px] overflow-y-auto pt-2 scrollbar-none">
              {cart.map((item) => (
                <div key={item.id} className="py-4 space-y-1.5" id={`cart-row-${item.id}`}>
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-grow">
                      <h4 className="text-sm font-sans font-medium text-brand-charcoal leading-tight">
                        {item.menuItem.name}
                      </h4>
                      {item.customization && (
                        <p className="text-[10px] text-zinc-500 italic font-mono mt-0.5 bg-neutral-50 px-2 py-0.5 rounded-md border border-neutral-100 inline-block">
                          Note Detail: &ldquo;{item.customization}&rdquo;
                        </p>
                      )}
                      <div className="text-xs font-mono text-zinc-500 mt-1">
                        ${item.menuItem.price.toFixed(2)} each
                      </div>
                    </div>
                    <span className="font-semibold font-mono text-sm text-brand-forest">
                      ${(item.menuItem.price * item.quantity).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-1.5">
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 border border-neutral-200 rounded-lg p-1 bg-neutral-50 scale-90 origin-left">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                        title="Reduce Quantity"
                      >
                        <Minus size={12} />
                      </button>
                      <span className="font-mono text-xs font-bold px-2 text-neutral-800">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                        title="Increase Quantity"
                      >
                        <Plus size={12} />
                      </button>
                    </div>

                    {/* Trash remove button */}
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-neutral-400 hover:text-rose-600 transition-colors scale-90"
                      title="Delete Item"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}

              {cart.length === 0 && (
                <div className="py-12 text-center flex flex-col items-center justify-center space-y-3">
                  <ShoppingBag size={40} className="text-neutral-300 stroke-1" />
                  <p className="text-neutral-400 text-xs font-sans">Your order basket is currently empty.</p>
                  <p className="text-[10px] text-brand-moss font-sans">Click on any southern dish on the left to start customizing your meal!</p>
                </div>
              )}
            </div>

            {/* Pricing calculations details */}
            <div className="border-t border-neutral-100 pt-4 mt-4 space-y-3 font-sans text-xs text-neutral-600">
              {/* Promo input */}
              {cart.length > 0 && (
                <div className="flex gap-2">
                  <div className="relative flex-grow">
                    <span className="absolute inset-y-0 left-0 pl-2.5 flex items-center text-neutral-400 pointer-events-none">
                      <Tag size={12} />
                    </span>
                    <input
                      type="text"
                      placeholder="Promo Code"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full bg-neutral-50 text-[11px] pl-7 pr-4 py-2 border border-neutral-300 rounded-lg outline-none focus:border-brand-gold"
                    />
                  </div>
                  <button
                    onClick={handleApplyPromo}
                    className="py-1.5 px-3 bg-brand-forest hover:bg-brand-moss text-[11px] font-sans tracking-wider text-brand-gold font-bold rounded-lg transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </div>
              )}

              {appliedPromo && (
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-200 p-2 rounded-lg flex justify-between items-center">
                  <span className="font-semibold text-[10px] tracking-wide">PROMO APPLIED (SAYYALL):</span>
                  <span className="font-mono text-xs font-bold">-15% OFF</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {discountPercent > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Loyalty Discount ({discountPercent}%)</span>
                  <span className="font-mono font-medium">-${discountAmount.toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span>Estimated Austin Sales Tax (8.25%)</span>
                <span className="font-mono font-medium">${taxAmount.toFixed(2)}</span>
              </div>

              <div className="flex justify-between text-brand-charcoal text-base font-semibold pt-2 border-t border-dashed border-neutral-200">
                <span>Estimated Total</span>
                <span className="font-mono text-brand-forest text-lg">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Quick delivery instructions checklist before primary order checkout */}
            {cart.length > 0 && (
              <div className="mt-6 space-y-3 bg-brand-cream/40 p-4 border border-brand-gold/20 rounded-xl text-xs font-sans">
                <div className="flex justify-around items-center border-b border-brand-gold/15 pb-2.5">
                  <button 
                    onClick={() => setDeliveryType('pickup')}
                    className={`pb-1 px-2 font-bold tracking-wider relative ${deliveryType === 'pickup' ? 'text-brand-moss' : 'text-neutral-400'}`}
                  >
                    Walk-up Pickup
                    {deliveryType === 'pickup' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />}
                  </button>
                  <button 
                    onClick={() => setDeliveryType('curbside')}
                    className={`pb-1 px-2 font-bold tracking-wider relative ${deliveryType === 'curbside' ? 'text-brand-moss' : 'text-neutral-400'}`}
                  >
                    Curbside Service
                    {deliveryType === 'curbside' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold" />}
                  </button>
                </div>

                <div className="space-y-2 text-neutral-600">
                  <div className="flex items-center gap-2">
                    <MapPin size={13} className="text-brand-gold" />
                    <span>Mueller: {BUSINESS_INFO.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock size={13} className="text-brand-gold" />
                    <span>Pickup Estimation: <strong>{pickupTime}</strong></span>
                  </div>
                </div>
              </div>
            )}

            {/* Primary Order Checkout button */}
            <button
              id="basket-checkout-btn"
              disabled={cart.length === 0}
              onClick={handleStartCheckout}
              className={`w-full text-center py-4 rounded-xl font-sans tracking-widest font-bold text-xs uppercase flex items-center justify-center gap-2 mt-6 cursor-pointer transition-all ${
                cart.length > 0
                  ? 'bg-brand-forest hover:bg-brand-moss text-brand-gold shadow-md hover:scale-101 border border-brand-gold'
                  : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
              }`}
            >
              <span>INSPECT & PLACE ORDER</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </div>

      {/* MODAL 1: Individual Configuration details */}
      <AnimatePresence>
        {selectedItemToConfigure && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-neutral-200 shadow-2xl relative"
            >
              <button
                onClick={() => setSelectedItemToConfigure(null)}
                className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-neutral-600 hover:text-black p-2 rounded-full shadow-md focus:outline-none"
              >
                <X size={16} />
              </button>

              <div className="h-56 relative bg-neutral-100">
                <img
                  src={selectedItemToConfigure.image}
                  alt={selectedItemToConfigure.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest">{selectedItemToConfigure.category}</span>
                  <h3 className="font-display font-medium text-xl leading-tight">{selectedItemToConfigure.name}</h3>
                </div>
              </div>

              <div className="p-6 space-y-4">
                <p className="text-sm text-neutral-600 leading-relaxed font-sans">
                  {selectedItemToConfigure.description}
                </p>

                <div className="flex justify-between items-center py-2 bg-neutral-50 px-4 rounded-xl">
                  <span className="text-xs font-semibold text-neutral-500 font-sans">Single Price</span>
                  <span className="font-mono font-bold text-brand-forest">${selectedItemToConfigure.price.toFixed(2)}</span>
                </div>

                {/* Configuration notes */}
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-neutral-700 tracking-wider uppercase font-sans">
                    Special Custom Preparation Instructions
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Extra hot honey / dressing on the side / no pickles / crisp fries..."
                    value={customizationText}
                    onChange={(e) => setCustomizationText(e.target.value)}
                    className="w-full bg-neutral-50 text-xs text-neutral-800 p-3 rounded-lg border border-neutral-300 focus:border-brand-gold outline-none font-sans"
                  />
                  <span className="text-[10px] text-neutral-400 font-sans">We always do our absolute best to accommodate all guest requests!</span>
                </div>

                {/* Quantity in modal */}
                <div className="flex justify-between items-center pt-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-sans font-bold text-neutral-700">Quantity</span>
                    <div className="flex items-center gap-3 border border-neutral-200 rounded-lg p-1.5 bg-neutral-50">
                      <button
                        onClick={() => setConfigQuantity(prev => Math.max(1, prev - 1))}
                        className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-mono text-sm font-bold text-neutral-800 px-1">
                        {configQuantity}
                      </span>
                      <button
                        onClick={() => setConfigQuantity(prev => prev + 1)}
                        className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  <span className="font-mono font-bold text-brand-forest text-lg">
                    Total: ${(selectedItemToConfigure.price * configQuantity).toFixed(2)}
                  </span>
                </div>

                {/* Confirm button */}
                <button
                  onClick={handleAddConfiguredItem}
                  className="w-full text-center py-3 bg-brand-forest hover:bg-brand-moss text-brand-gold font-sans font-semibold text-xs tracking-widest uppercase rounded-xl shadow-lg hover:scale-101 border border-brand-gold/30 cursor-pointer transition-all"
                >
                  ADD TO BASKET &bull; ${(selectedItemToConfigure.price * configQuantity).toFixed(2)}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* MODAL 2: Full Interactive Checkout Drawer */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-xl w-full border border-neutral-200 shadow-2xl overflow-hidden text-neutral-850"
            >
              <div className="bg-brand-forest text-brand-cream py-5 px-6 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Receipt size={18} className="text-brand-gold" />
                  <h3 className="font-display font-medium text-lg text-white">Review & Complete Order</h3>
                </div>
                {checkoutStep !== 'processing' && (
                  <button onClick={() => setCheckoutModalOpen(false)} className="text-brand-cream/80 hover:text-white">
                    <X size={18} />
                  </button>
                )}
              </div>

              {/* Form Input Step */}
              {checkoutStep === 'form' && (
                <form onSubmit={handlePlaceOrder} className="p-6 space-y-5">
                  <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                    You are placing a simulated pickup order for **Colleen's Kitchen** at the Austin Mueller location. Please fill out your details to generate your authentic receipt.
                  </p>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-forest font-sans">Contact Details</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Your Full Name *</label>
                        <input
                          type="text"
                          required
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          placeholder="e.g. Taylor Miller"
                          className="w-full bg-neutral-50 text-xs text-neutral-850 p-2.5 rounded-lg border border-neutral-300 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Telephone *</label>
                        <input
                          type="tel"
                          required
                          value={customerPhone}
                          onChange={(e) => setCustomerPhone(e.target.value)}
                          placeholder="e.g. 512-555-0199"
                          className="w-full bg-neutral-50 text-xs text-neutral-850 p-2.5 rounded-lg border border-neutral-300 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <label className="block text-[10px] font-sans font-semibold text-neutral-700">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        placeholder="e.g. taylor@gmail.com"
                        className="w-full bg-neutral-50 text-xs text-neutral-850 p-2.5 rounded-lg border border-neutral-300 outline-none focus:border-brand-gold font-sans"
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-xs uppercase tracking-widest font-bold text-brand-forest font-sans">Payment Method</h4>
                    <div className="border border-brand-gold/30 bg-brand-cream/30 p-3 rounded-xl flex items-center gap-3">
                      <CreditCard className="text-brand-gold" size={18} />
                      <div className="text-xs font-sans text-neutral-600">
                        <span className="font-semibold block text-brand-forest">Simulate Secure Sandbox Checkout</span>
                        <span>This is a prototype checkout. No actual money will be transacted.</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing brief */}
                  <div className="border-t border-neutral-100 pt-4 flex justify-between items-center text-sm">
                    <span className="font-sans text-neutral-600">Order Subtotal:</span>
                    <span className="font-mono font-bold text-brand-forest text-base">${grandTotal.toFixed(2)}</span>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 bg-brand-forest hover:bg-brand-moss text-brand-gold font-sans font-bold text-xs tracking-widest uppercase rounded-xl border border-brand-gold cursor-pointer"
                  >
                    Simulate Payment &bull; ${grandTotal.toFixed(2)}
                  </button>
                </form>
              )}

              {/* Running Loading Loop Step */}
              {checkoutStep === 'processing' && (
                <div className="py-20 flex flex-col items-center justify-center p-6 space-y-4 text-center">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-neutral-200 rounded-full" />
                    <div className="absolute inset-0 border-4 border-t-brand-gold rounded-full animate-spin" />
                  </div>
                  <h4 className="font-display font-medium text-lg text-brand-forest">Securing Connection...</h4>
                  <p className="text-xs text-neutral-550 max-w-sm font-sans">
                    Please hold on while we process your request and connect with Colleen's Kitchen Austin order dispatcher.
                  </p>
                </div>
              )}

              {/* Order Confirmed Receipt Receipt Step */}
              {checkoutStep === 'confirmed' && (
                <div className="p-6 text-center space-y-6">
                  <div className="flex justify-center">
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full">
                      <CheckCircle size={40} className="stroke-1.5" />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-bold text-brand-gold uppercase tracking-widest font-sans">Muller Location Recieved</span>
                    <h3 className="font-display font-semibold text-2xl text-brand-forest">Order Recieved!</h3>
                    <p className="text-xs text-neutral-500 font-sans">
                      Thank you so much, **{customerName}**. Your southern culinary escape is booked!
                    </p>
                  </div>

                  {/* Real receipt table */}
                  <div className="bg-neutral-50 border border-neutral-200 rounded-xl p-4 font-sans text-left text-xs space-y-2 max-w-sm mx-auto">
                    <div className="flex justify-between font-mono text-[10px] text-neutral-400 border-b border-neutral-200 pb-1">
                      <span>Receipt: {orderId}</span>
                      <span>Now (simulated check)</span>
                    </div>
                    <div className="space-y-1.5 font-medium text-neutral-700 py-1 border-b border-neutral-100">
                      {cart.map(c => (
                        <div key={c.id} className="flex justify-between font-mono">
                          <span>{c.quantity}x {c.menuItem.name}</span>
                          <span>${(c.menuItem.price * c.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex justify-between text-brand-forest font-bold pt-1">
                      <span>TOTAL SECURED:</span>
                      <span className="font-mono">${grandTotal.toFixed(2)}</span>
                    </div>
                    <div className="pt-2 text-[10px] text-zinc-500 flex flex-col gap-1 select-none">
                      <div>🕒 Estimated Ready Date: <strong>{pickupTime}</strong></div>
                      <div>📍 Pick up at walk-up counter: <strong>1911 Aldrich Street, Suite 100</strong></div>
                    </div>
                  </div>

                  <p className="text-[10px] text-neutral-400 font-sans">
                    A mock ticket confirmation receipt copy has been routed successfully to **{customerEmail}**.
                  </p>

                  <button
                    onClick={handleFinishCheckout}
                    className="w-full py-3 bg-brand-forest hover:bg-brand-moss text-brand-gold font-sans font-bold text-xs tracking-widest uppercase rounded-xl border border-brand-gold cursor-pointer"
                  >
                    RETURN TO MENU CATALOG
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
