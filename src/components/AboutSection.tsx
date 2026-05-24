/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Heart, Star, Sparkles, Award, Coffee, BookOpen, Utensils, ArrowRight } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

interface AboutSectionProps {
  onNavigateToMenu: () => void;
  onNavigateToContact: () => void;
}

export default function AboutSection({ onNavigateToMenu, onNavigateToContact }: AboutSectionProps) {
  const pillars = [
    {
      icon: <Heart className="text-brand-gold w-6 h-6" />,
      title: "Southern Hospitality",
      description: "Down-home Austin friendliness blended with traditional Southern poise. We treat every guest like close family gathering around the home dinner table."
    },
    {
      icon: <Utensils className="text-brand-gold w-6 h-6" />,
      title: "Refined Yet Simple Fare",
      description: "Fine, high-end culinary execution of standard favorite family recipes. We celebrate clean flavors without unnecessary complexity."
    },
    {
      icon: <Award className="text-brand-gold w-6 h-6" />,
      title: "Austin Mueller Local Roots",
      description: "Proudly nestled in the heart of Mueller, Austin, TX. We source our buttermilk, Texas grain flour, and fresh freestone peaches from local family gardens."
    }
  ];

  const milestones = [
    {
      year: "2016",
      title: "Drafting the Dream",
      desc: "Inspired by traditional family recipes from southern kitchens, the concept of Colleen's Kitchen is finalized over hot sweet tea in Austin."
    },
    {
      year: "2018",
      title: "Opening Mueller Doors",
      desc: "Colleen's Kitchen officially unlocks on Aldrich Street. Quickly attracts foodies loving the signature fried chicken & biscuits."
    },
    {
      year: "2021",
      title: "Best Walk-up Window Award",
      desc: "Responding to contemporary dining evolutions, our Walk-up window becomes an iconic landmark for morning coffee and savory lunches."
    },
    {
      year: "Today",
      title: "A Vibrant Southern Gathering Spot",
      desc: "Delivering unmatched comfort food everyday, remaining Austin's premium destination for supper, weekend mimosas, and happy hours."
    }
  ];

  return (
    <div className="w-full bg-[#FCFBF8]">
      
      {/* Immersive Beautiful Story Header */}
      <section className="relative h-[60vh] min-h-[400px] w-full bg-slate-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1600&auto=format&fit=crop&q=80"
            alt="Warm Southern family dinner gathering"
            className="w-full h-full object-cover opacity-50 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-forest/30 to-brand-charcoal/90 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-gold font-serif italic text-lg tracking-widest mb-3 uppercase">
              ABOUT COLLEEN'S
            </span>
            <div className="h-0.5 w-16 bg-brand-gold my-2" />
            <h1 className="font-display font-medium text-4xl sm:text-6xl tracking-tight text-white mb-4 uppercase">
              OUR STORY
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#d8c7a9] uppercase">
              Every day deserves celebration &bull; Mueller Austin
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Philosophy storytelling with elegant floating visual grids */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Narrative */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase block">The Pillars of Hospitality</span>
            <h2 className="font-display font-medium text-3xl sm:text-4xl text-brand-forest leading-tight uppercase">
              REFINED SOUTHERN HOSPITALITY
            </h2>
            <div className="h-1 w-12 bg-brand-gold rounded-full" />
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans font-light">
              Colleen's Kitchen is a Southern-inspired destination delivering refined, yet uncomplicated fare. We believe that family recipes hold a certain kind of magic — connecting past generations with future memories.
            </p>
            <p className="text-sm sm:text-base text-neutral-600 leading-relaxed font-sans font-light">
              Our culinary team elevates classic comfort foods by selecting top-shelf ingredients and applying modern culinary techniques, whilst keeping the dining environment warm, approachable, and deeply relaxing.
            </p>

            <div className="pt-4 flex gap-4">
              <button
                onClick={onNavigateToMenu}
                className="py-3 px-6 bg-brand-forest hover:bg-brand-moss text-brand-gold text-xs font-sans tracking-widest font-bold uppercase rounded-xl border border-brand-gold transition-all"
              >
                EXPLORE CURATED MENUS
              </button>
              <button
                onClick={onNavigateToContact}
                className="py-3 px-6 hover:bg-[#eae6db]/40 text-brand-forest text-xs font-sans tracking-widest font-bold uppercase rounded-xl border border-neutral-300 transition-all font-semibold"
              >
                Inquire Catering
              </button>
            </div>
          </div>

          {/* Right gorgeous side elements mockup */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <img
                src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop&q=80"
                alt="Scratch biscuit prep"
                className="rounded-2xl shadow-md aspect-[3/4] object-cover hover:scale-101 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="bg-brand-forest text-brand-gold p-6 rounded-2xl border border-brand-gold/20 flex flex-col justify-center items-center text-center">
                <span className="font-display font-bold text-4xl block">100%</span>
                <span className="text-[10px] font-sans tracking-widest font-bold text-brand-cream/80 uppercase block mt-1">Scratch Kitchen</span>
              </div>
            </div>

            <div className="space-y-4 pt-10">
              <div className="bg-brand-cream border border-brand-gold/30 p-6 rounded-2xl text-left">
                <span className="font-display text-2xl text-brand-forest block font-semibold">Mueller, ATX</span>
                <p className="text-xs text-neutral-500 font-sans mt-2">Serving neighbors with walk-up convenience daily.</p>
              </div>
              <img
                src="https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=600&auto=format&fit=crop&q=80"
                alt="Chicken thighs close-up"
                className="rounded-2xl shadow-lg aspect-[3/4] object-cover hover:scale-101 transition-transform"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>

        </div>
      </section>

      {/* Pillars highlights section */}
      <section className="bg-brand-forest text-brand-cream py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
            <span className="text-brand-gold text-xs font-sans tracking-widest font-bold uppercase">Crafted With Intent</span>
            <h3 className="font-display font-medium text-2xl sm:text-3xl text-white uppercase tracking-wide">WHAT WE STAND BY DAILY</h3>
            <p className="text-xs text-brand-cream/70 font-sans">Every element of our Mueller Bistro is tuned for sensory perfection</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="bg-brand-moss/40 border border-emerald-800/40 p-8 rounded-2xl space-y-4 hover:border-brand-gold/40 transition-all hover:bg-brand-moss/60"
              >
                <div className="bg-brand-cream/10 p-3.5 rounded-xl inline-block">
                  {pillar.icon}
                </div>
                <h4 className="font-display font-semibold text-lg text-brand-gold tracking-wide">{pillar.title}</h4>
                <p className="text-xs text-brand-cream/80 font-sans leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Story Process */}
      <section className="py-24 max-w-4xl mx-auto px-4 select-none">
        <div className="text-center space-y-4 mb-16">
          <span className="text-brand-gold text-xs font-sans tracking-widest font-bold uppercase">Our History</span>
          <h3 className="font-display font-medium text-3xl text-brand-forest uppercase tracking-wide">THE JOURNEY OF COLLEEN'S</h3>
          <div className="h-0.5 w-12 bg-brand-gold mx-auto" />
        </div>

        <div className="relative border-l-2 border-brand-gold/30 ml-4 md:ml-32 py-4 space-y-12">
          {milestones.map((stone, idx) => (
            <div key={idx} className="relative pl-8 sm:pl-12">
              {/* Dot bullet */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 bg-brand-forest border-2 border-brand-gold rounded-full" />
              
              {/* Floating year bubble */}
              <div className="md:absolute md:-left-36 md:-translate-x-4 md:top-0 text-left md:text-right font-display font-bold text-2xl text-brand-gold">
                {stone.year}
              </div>

              <div className="bg-white rounded-xl border border-neutral-150 p-6 shadow-xs hover:shadow-md transition-shadow">
                <h4 className="font-display font-semibold text-base text-brand-forest uppercase tracking-wide">
                  {stone.title}
                </h4>
                <p className="text-xs text-neutral-550 leading-relaxed font-sans mt-2">
                  {stone.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
