/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, ArrowRight, Heart, Star, Flame, UtensilsCrossed } from 'lucide-react';
import { MENU_ITEMS, BUSINESS_INFO } from '../data';
import { MenuItem } from '../types';

interface MenuSectionProps {
  onAddToOrder: (item: MenuItem) => void;
  onNavigateToOrdering: () => void;
}

export default function MenuSection({ onAddToOrder, onNavigateToOrdering }: MenuSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'supper' | 'lunch' | 'brunch' | 'sweets' | 'beverage' | 'happy hour' | 'kiddos'>('all');
  const [favorites, setFavorites] = useState<string[]>([]);

  const categories = [
    { id: 'all', label: 'FULL MENU' },
    { id: 'supper', label: 'SUPPER' },
    { id: 'lunch', label: 'LUNCH' },
    { id: 'brunch', label: 'BRUNCH' },
    { id: 'sweets', label: 'SWEETS' },
    { id: 'beverage', label: 'BEVERAGE' },
    { id: 'happy hour', label: 'HAPPY HOUR' },
    { id: 'kiddos', label: 'KIDDOS' },
  ];

  const filteredItems = selectedCategory === 'all'
    ? MENU_ITEMS
    : MENU_ITEMS.filter(item => item.category === selectedCategory);

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(favId => favId !== id) : [...prev, id]
    );
  };

  return (
    <div className="w-full">
      {/* Premium Hero Banner for MENU */}
      <section className="relative h-[65vh] min-h-[450px] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        {/* Ambient Darkened Image Overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1543007630-9710e4a00a20?w=1600&auto=format&fit=crop&q=80"
            alt="Southern fried chicken macro meal photography"
            className="w-full h-full object-cover opacity-60 scale-105 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-forest/40 to-brand-charcoal/90 mix-blend-multiply" />
        </div>

        {/* Content of Hero */}
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-gold font-serif italic text-xl sm:text-2xl tracking-widest mb-3 hover:text-white transition-colors duration-300">
              {BUSINESS_INFO.tagline}
            </span>
            <div className="h-0.5 w-16 bg-brand-gold my-2" />
            <h1 className="font-display font-medium text-5xl sm:text-7xl lg:text-8xl tracking-tight text-white mb-6 uppercase">
              The Menu
            </h1>
            <p className="font-serif italic text-brand-cream/90 text-md sm:text-lg max-w-2xl leading-relaxed">
              &ldquo;Southern-inspired hospitality delivering refined, yet uncomplicated fare reminiscent of your favorite family recipes.&rdquo;
            </p>
          </motion.div>
        </div>
      </section>

      {/* Philosophy Introductory Section */}
      <section className="py-20 bg-brand-cream px-4 text-center select-none">
        <div className="max-w-3xl mx-auto">
          <div className="flex justify-center mb-4">
            <UtensilsCrossed size={32} className="text-brand-moss opacity-70" />
          </div>
          <h2 className="font-display font-medium text-3xl sm:text-4xl text-brand-forest mb-6 uppercase tracking-wider relative inline-block">
            Every Day Deserves Celebration
            <span className="absolute left-1/4 right-1/4 bottom-0 h-0.5 bg-brand-gold mt-1" />
          </h2>
          <p className="font-sans text-brand-charcoal/80 text-base sm:text-lg leading-relaxed mb-6">
            {BUSINESS_INFO.description}
          </p>
          <p className="text-xs font-mono uppercase tracking-widest text-brand-gold font-semibold">
            Mueller &bull; Austin, Texas
          </p>
        </div>
      </section>

      {/* Tabs / Filter Navigation Section */}
      <section className="bg-white/40 backdrop-blur-sm border-t border-b border-brand-gold/15 py-6 sticky top-24 z-30 shadow-xs" id="menu-tabs">
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto scrollbar-none scroll-smooth">
          <div className="flex md:justify-center items-center gap-3 sm:gap-4 md:flex-wrap pb-2 md:pb-0 min-w-max md:min-w-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                id={`cat-btn-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`py-2 px-5 text-xs font-sans tracking-widest rounded-full transition-all duration-300 focus:outline-none cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-brand-forest text-brand-gold font-bold shadow-md transform scale-102 border border-brand-gold'
                    : 'bg-white hover:bg-brand-cream text-brand-charcoal/80 hover:text-brand-forest border border-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Active Grid Section */}
      <section className="py-16 bg-[#FDFBF7] px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h3 className="font-display text-2xl sm:text-3xl text-brand-forest uppercase tracking-medium font-semibold flex items-center gap-2">
              <span className="inline-block w-2.5 h-2.5 bg-brand-gold rounded-full" />
              {selectedCategory === 'all' ? 'All Southern Delicacies' : `${selectedCategory} options`}
            </h3>
            <p className="text-xs text-neutral-500 font-sans mt-1">
              Showing {filteredItems.length} curated recipes
            </p>
          </div>

          <button
            onClick={onNavigateToOrdering}
            className="hidden sm:flex items-center gap-2 text-xs font-sans tracking-wider font-semibold text-brand-moss hover:text-brand-gold uppercase group transition-colors focus:outline-none"
          >
            ORDER ONLINE DIRECTLY
            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Bento/Card Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                layout
                key={item.id}
                id={`menu-card-${item.id}`}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="bg-white rounded-2xl border border-neutral-150 overflow-hidden shadow-xs hover:shadow-lg transition-all duration-300 group flex flex-col h-full"
              >
                {/* Photo space */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-65" />
                  
                  {/* Action row on photo */}
                  <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
                    {/* Tags */}
                    <div className="flex gap-1.5 flex-wrap">
                      {item.tags?.map((tag, idx) => (
                        <span
                          key={idx}
                          className="text-[9px] font-sans font-bold tracking-widest text-brand-forest uppercase px-2 py-1 bg-brand-cream/95 backdrop-blur-xs rounded-md shadow-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Favorite Love */}
                    <button
                      onClick={(e) => toggleFavorite(item.id, e)}
                      className="bg-white/9w backdrop-blur-xs hover:bg-white text-rose-500 hover:scale-108 p-2 rounded-full shadow-xs transition-all focus:outline-none"
                      title={favorites.includes(item.id) ? 'Remove from favorites' : 'Add to favorites'}
                    >
                      <Heart size={15} fill={favorites.includes(item.id) ? 'currentColor' : 'none'} />
                    </button>
                  </div>

                  {/* Absolute Price inside Image frame for modern card design */}
                  <div className="absolute bottom-4 right-4 bg-brand-forest text-brand-gold text-sm font-semibold px-3 py-1.5 rounded-lg shadow-sm border border-brand-gold/30">
                    ${item.price.toFixed(2)}
                  </div>
                </div>

                {/* Info and action area */}
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <div>
                    <span className="text-[10px] font-mono tracking-widest font-bold text-brand-gold uppercase block mb-1">
                      {item.category}
                    </span>
                    <h4 className="font-display font-medium text-lg lg:text-xl text-brand-charcoal tracking-tight group-hover:text-brand-forest transition-colors mb-3">
                      {item.name}
                    </h4>
                    <p className="text-neutral-600 font-sans text-xs sm:text-sm leading-relaxed mb-6">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-dotted border-neutral-200 mt-auto flex items-center justify-between">
                    <span className="text-xs text-neutral-400 font-mono">
                      Prepared fresh daily
                    </span>
                    <button
                      onClick={() => onAddToOrder(item)}
                      className="text-xs font-sans font-bold tracking-widest text-brand-forest hover:text-brand-gold uppercase flex items-center gap-1 group/btn focus:outline-none focus:underline"
                    >
                      ADD TO ORDER
                      <ArrowRight size={13} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Beautiful High-end Quote Banner */}
      <section className="bg-brand-forest py-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#1e3a1f_1px,transparent_1px)] [background-size:16px_16px] opacity-10" />
        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <span className="text-brand-gold text-xs font-sans tracking-widest font-bold uppercase mb-4 block">Southern Comfort & Refined Flavors</span>
          <p className="font-display font-medium text-2xl sm:text-4xl text-brand-cream/95 leading-snug mb-8 max-w-3xl italic">
            &ldquo;We wanted a place where our guests can gather for an afternoon sweet tea, or sit down and share our amazing signature fried chicken with family.&rdquo;
          </p>
          <div className="h-0.5 w-12 bg-brand-gold/50 my-2" />
          <p className="text-xs font-sans tracking-wide text-brand-gold/90 mt-2">THE COLLEEN'S KITCHEN PHILOSOPHY</p>
        </div>
      </section>
    </div>
  );
}
