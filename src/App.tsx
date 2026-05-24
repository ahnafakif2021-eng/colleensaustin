/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShoppingCart, Trash2, ArrowRight, X, Sparkles, CheckCircle, Gift } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import MenuSection from './components/MenuSection';
import AboutSection from './components/AboutSection';
import OrderingSection from './components/OrderingSection';
import GiftCardSection from './components/GiftCardSection';
import ContactSection from './components/ContactSection';

import { MenuItem, CartItem } from './types';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('menu');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOverlayOpen, setIsCartOverlayOpen] = useState(false);

  // Scroll to top whenever tab changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  // Cart Operations
  const handleAddItemToOrder = (item: MenuItem, customization?: string) => {
    setCart((prev) => {
      // Find if item with same ID AND same customization exists
      const existingIdx = prev.findIndex(
        (ci) => ci.menuItem.id === item.id && ci.customization === customization
      );

      if (existingIdx > -1) {
        const newCart = [...prev];
        newCart[existingIdx] = {
          ...newCart[existingIdx],
          quantity: newCart[existingIdx].quantity + 1,
        };
        return newCart;
      }

      return [
        ...prev,
        {
          id: `${item.id}-${customization || 'none'}-${Date.now()}`,
          menuItem: item,
          quantity: 1,
          customization,
        },
      ];
    });

    // Provide a little soft visual vibration and feedback
    // By default, open cart slideover so they see feedback!
    setIsCartOverlayOpen(true);
  };

  const handleUpdateCartQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return { ...item, quantity: newQty };
          }
          return item;
        })
        .filter((item) => item.quantity > 0)
    );
  };

  const handleRemoveFromCart = (id: string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Dedicated support for buying a gift card and placing in cart
  const handleAddGiftCardToCart = (amount: number, details: any) => {
    const giftCardItem: MenuItem = {
      id: `giftcard-${amount}-${Date.now()}`,
      name: `Digital Gift Card - $${amount.toFixed(2)}`,
      price: amount,
      description: `E-Delivery Gift Voucher for ${details.recipientName} from ${details.senderName}. Msg: "${details.customMessage}"`,
      category: 'sweets', // Categorize as sweet treat!
      image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?w=400&auto=format&fit=crop&q=80',
    };

    handleAddItemToOrder(giftCardItem, `To: ${details.recipientName} | Email/Phone: ${details.recipientEmail || details.recipientPhone}`);
  };

  // Calculations for Slideover Basket
  const totalCartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const cartSubtotal = cart.reduce((total, item) => total + item.menuItem.price * item.quantity, 0);

  return (
    <div className="min-h-screen bg-brand-cream text-brand-charcoal font-sans flex flex-col justify-between" id="app-root">
      
      {/* 1. Branded Navigation Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        cartCount={totalCartCount}
        openCart={() => setIsCartOverlayOpen(true)}
      />

      {/* 2. Main Page Render Blocks */}
      <main className="flex-grow pt-24 min-h-[75vh]" id="primary-content-frame">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
          >
            {activeTab === 'menu' && (
              <MenuSection
                onAddToOrder={(item) => handleAddItemToOrder(item)}
                onNavigateToOrdering={() => setActiveTab('ordering')}
              />
            )}

            {activeTab === 'about' && (
              <AboutSection
                onNavigateToMenu={() => setActiveTab('menu')}
                onNavigateToContact={() => setActiveTab('contact')}
              />
            )}

            {activeTab === 'ordering' && (
              <OrderingSection
                cart={cart}
                onUpdateQuantity={handleUpdateCartQuantity}
                onRemoveItem={handleRemoveFromCart}
                onClearCart={handleClearCart}
                onAddItem={handleAddItemToOrder}
              />
            )}

            {activeTab === 'giftcards' && (
              <GiftCardSection
                onAddGiftCardToCart={handleAddGiftCardToCart}
              />
            )}

            {activeTab === 'contact' && (
              <ContactSection />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Branded Forest Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* 4. Elegant Overlay: Cart Slide-over Drawer */}
      <AnimatePresence>
        {isCartOverlayOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="slideover-cart">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOverlayOpen(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-xs cursor-pointer"
            />

            {/* Panel */}
            <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-screen max-w-md bg-white border-l border-neutral-200 shadow-2xl flex flex-col justify-between"
              >
                {/* Drawer Header */}
                <div className="bg-brand-forest text-brand-cream py-6 px-6 flex justify-between items-center border-b border-emerald-950">
                  <div className="flex items-center gap-2">
                    <span className="bg-brand-moss p-2 rounded-full text-brand-gold">
                      <ShoppingCart size={16} />
                    </span>
                    <h3 className="font-display font-medium text-lg text-white uppercase tracking-wider">Your Basket</h3>
                  </div>
                  <button
                    onClick={() => setIsCartOverlayOpen(false)}
                    className="p-1 px-2 border border-brand-gold/20 hover:border-brand-gold hover:text-brand-gold text-[10px] uppercase font-sans font-bold tracking-widest text-[#d8c7a9] rounded-lg transition-colors focus:outline-none"
                    title="Close"
                  >
                    Close x
                  </button>
                </div>

                {/* Basket List */}
                <div className="flex-grow overflow-y-auto py-6 px-6 divide-y divide-neutral-100 scrollbar-none">
                  {cart.map((item) => (
                    <div key={item.id} className="py-4 space-y-1.5" id={`slide-cart-row-${item.id}`}>
                      <div className="flex justify-between items-start gap-4">
                        <div className="flex-grow">
                          <h4 className="text-sm font-sans font-medium text-brand-charcoal leading-snug">
                            {item.menuItem.name}
                          </h4>
                          {item.customization && (
                            <p className="text-[10px] text-[#9c8464] italic font-mono mt-1 bg-neutral-50 px-2 py-0.5 rounded-md inline-block border border-neutral-150">
                              Note: {item.customization}
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

                      <div className="flex justify-between items-center pt-2">
                        {/* Quantity controls */}
                        <div className="flex items-center gap-1.5 border border-neutral-250 rounded-lg p-1 scale-90 origin-left">
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, -1)}
                            className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                          >
                            <span className="text-xs">&minus;</span>
                          </button>
                          <span className="font-mono text-xs font-bold px-1.5 text-neutral-800">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleUpdateCartQuantity(item.id, 1)}
                            className="p-1 hover:text-brand-gold transition-colors focus:outline-none"
                          >
                            <span className="text-xs">+</span>
                          </button>
                        </div>

                        {/* Delete Trash */}
                        <button
                          onClick={() => handleRemoveFromCart(item.id)}
                          className="text-neutral-400 hover:text-rose-600 transition-colors scale-90"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </div>
                  ))}

                  {cart.length === 0 && (
                    <div className="py-20 text-center flex flex-col items-center justify-center space-y-4">
                      <ShoppingCart size={48} className="text-neutral-300 stroke-1" />
                      <p className="text-neutral-500 text-sm font-sans">Your order basket is currently empty.</p>
                      <button
                        onClick={() => {
                          setIsCartOverlayOpen(false);
                          setActiveTab('menu');
                        }}
                        className="py-2 px-5 bg-neutral-100 hover:bg-brand-cream/80 text-brand-forest font-sans font-bold text-[10px] tracking-widest text-[#a88d6c] uppercase rounded-lg transition-all"
                      >
                        BROWSE SOUTHERN FLAVORS
                      </button>
                    </div>
                  )}
                </div>

                {/* Subtotal and checkout details */}
                <div className="border-t border-neutral-200 p-6 bg-stone-50 space-y-4 font-sans text-xs">
                  <div className="flex justify-between items-center text-sm font-medium text-neutral-600">
                    <span>Subtotal</span>
                    <span className="font-mono font-bold text-neutral-900">${cartSubtotal.toFixed(2)}</span>
                  </div>
                  <p className="text-[10px] text-zinc-400 leading-snug">
                    Taxes, custom discounts, and secure options will be processed during receipt layout on checkout page.
                  </p>

                  <button
                    disabled={cart.length === 0}
                    onClick={() => {
                      setIsCartOverlayOpen(false);
                      setActiveTab('ordering');
                    }}
                    className={`w-full py-4 text-center rounded-xl font-sans tracking-widest font-bold text-xs uppercase flex items-center justify-center gap-2 mt-2 cursor-pointer transition-all ${
                      cart.length > 0
                        ? 'bg-brand-forest hover:bg-brand-moss text-brand-gold shadow-md border border-brand-gold'
                        : 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
                    }`}
                  >
                    <span>GO TO CHECKOUT ONLINE</span>
                    <ArrowRight size={14} />
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
