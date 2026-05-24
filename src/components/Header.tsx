/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ShoppingCart, Star, Clock, MapPin, Gift } from 'lucide-react';
import { LOGO_URL, BUSINESS_INFO } from '../data';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cartCount: number;
  openCart: () => void;
}

export default function Header({ activeTab, setActiveTab, cartCount, openCart }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [alertVisible, setAlertVisible] = useState(true);

  const navItems = [
    { id: 'menu', label: 'MENU' },
    { id: 'about', label: 'ABOUT' },
    { id: 'ordering', label: 'ONLINE ORDERING' },
    { id: 'giftcards', label: 'GIFT CARDS' },
    { id: 'contact', label: 'CONTACT' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full transition-all duration-300">
      {/* Top Bar Alert */}
      <AnimatePresence>
        {alertVisible && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-brand-charcoal text-brand-cream text-xs py-2 px-4 flex justify-between items-center relative z-50 font-sans tracking-wide border-b border-white/5"
          >
            <div className="flex items-center gap-2 mx-auto justify-center text-center">
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-brand-gold animate-pulse"></span>
              <span><strong>New Walk Up Window Hours:</strong> Monday–Thursday 11am–Close | Friday–Sunday 8am–Close</span>
            </div>
            <button
              onClick={() => setAlertVisible(false)}
              className="absolute right-4 hover:text-brand-gold transition-colors focus:outline-none p-1"
              aria-label="Close notification"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Navbar */}
      <nav className="bg-brand-forest/95 backdrop-blur-md shadow-lg border-b border-emerald-900/40 relative z-40 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            
            {/* Logo */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => setActiveTab('menu')}>
              <img
                src={LOGO_URL}
                alt="Colleen's Kitchen Logo"
                className="h-16 w-auto object-contain transition-transform hover:scale-102"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  id={`nav-item-${item.id}`}
                  onClick={() => setActiveTab(item.id)}
                  className={`text-sm font-sans tracking-widest font-medium py-2 px-1 relative transition-all duration-300 focus:outline-none ${
                    activeTab === item.id ? 'text-brand-gold font-semibold' : 'text-brand-cream/80 hover:text-brand-cream'
                  }`}
                >
                  {item.label}
                  {activeTab === item.id && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-brand-gold"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <div className="flex items-center gap-4">
              <button
                id="header-cart-btn"
                onClick={openCart}
                className="relative bg-brand-moss/80 hover:bg-brand-moss border border-emerald-800/60 p-3 rounded-full text-brand-cream hover:text-brand-gold transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-gold/50 cursor-pointer"
                title="View Order Cart"
              >
                <ShoppingCart size={20} className="w-5 h-5" />
                <AnimatePresence>
                  {cartCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      className="absolute -top-1 -right-1 bg-brand-gold text-brand-forest text-xs font-bold font-sans rounded-full w-5 h-5 flex items-center justify-center shadow-md"
                    >
                      {cartCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </button>

              {/* Mobile Menu Button */}
              <button
                id="mobile-menu-toggle"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-md text-brand-cream hover:text-brand-gold focus:outline-none transition-colors"
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>

          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="md:hidden bg-brand-forest border-t border-emerald-900/60 overflow-hidden"
            >
              <div className="px-4 pt-4 pb-6 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    id={`mobile-nav-item-${item.id}`}
                    onClick={() => {
                      setActiveTab(item.id);
                      setMobileMenuOpen(false);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-md text-base font-sans font-medium tracking-wider transition-colors ${
                      activeTab === item.id
                        ? 'bg-brand-moss text-brand-gold'
                        : 'text-brand-cream hover:bg-emerald-950/40 hover:text-brand-gold'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
