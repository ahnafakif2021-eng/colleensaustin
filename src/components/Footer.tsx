/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Facebook, Instagram, Mail, Phone, MapPin, Clock, Star } from 'lucide-react';
import { BUSINESS_INFO, LOGO_URL } from '../data';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-brand-forest text-brand-cream border-t border-emerald-950" id="app-footer">
      {/* Decorative top border */}
      <div className="h-1.5 bg-gradient-to-r from-brand-gold via-emerald-800 to-brand-gold" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          
          {/* Logo and Brand column */}
          <div className="md:col-span-4 flex flex-col items-center md:items-start text-center md:text-left">
            <span className="cursor-pointer" onClick={() => setActiveTab('menu')}>
              <img
                src={LOGO_URL}
                alt="Colleen's House Logo"
                className="h-20 w-auto object-contain mb-6 hover:scale-102 transition-transform"
                referrerPolicy="no-referrer"
              />
            </span>
            <p className="text-brand-cream/70 text-sm leading-relaxed font-sans max-w-sm mb-6">
              {BUSINESS_INFO.description}
            </p>
            <div className="flex gap-4">
              <a
                href={BUSINESS_INFO.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-moss border border-emerald-800/40 p-3 rounded-full hover:bg-brand-gold hover:text-brand-forest transition-all"
                title="Follow Colleen's Kitchen on Facebook"
                id="social-fb"
              >
                <Facebook size={18} />
              </a>
              <a
                href={BUSINESS_INFO.socials.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-brand-moss border border-emerald-800/40 p-3 rounded-full hover:bg-brand-gold hover:text-brand-forest transition-all"
                title="Follow Colleen's Kitchen on Instagram"
                id="social-ig"
              >
                <Instagram size={18} />
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.emails.general}`}
                className="bg-brand-moss border border-emerald-800/40 p-3 rounded-full hover:bg-brand-gold hover:text-brand-forest transition-all"
                title="Send an Email"
                id="social-email"
              >
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Quick Info & Hours column */}
          <div className="md:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-8 text-center sm:text-left">
            <div>
              <h3 className="font-display font-medium text-lg text-brand-gold tracking-wide mb-4 flex items-center justify-center sm:justify-start gap-2">
                <Clock size={16} /> Hours
              </h3>
              <ul className="space-y-4 font-sans text-xs text-brand-cream/80">
                <li>
                  <span className="block font-semibold uppercase tracking-widest text-[#d8c7a9]">Walk-Up Window</span>
                  <span className="leading-snug">{BUSINESS_INFO.hours.walkUp}</span>
                </li>
                <li>
                  <span className="block font-semibold uppercase tracking-widest text-[#d8c7a9]">Lunch</span>
                  <span>{BUSINESS_INFO.hours.lunch}</span>
                </li>
                <li>
                  <span className="block font-semibold uppercase tracking-widest text-[#d8c7a9]">Weekend Brunch</span>
                  <span>{BUSINESS_INFO.hours.brunch}</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-display font-medium text-lg text-brand-gold tracking-wide mb-4 invisible sm:visible">
                &nbsp;
              </h3>
              <ul className="space-y-4 font-sans text-xs text-brand-cream/80">
                <li>
                  <span className="block font-semibold uppercase tracking-widest text-[#d8c7a9]">Dinner</span>
                  <span>{BUSINESS_INFO.hours.dinner}</span>
                </li>
                <li>
                  <span className="block font-semibold uppercase tracking-widest text-[#d8c7a9]">Happy Hour</span>
                  <span>{BUSINESS_INFO.hours.happyHour}</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Location column */}
          <div className="md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="font-display font-medium text-lg text-brand-gold tracking-wide mb-4 flex items-center gap-2">
              <MapPin size={16} /> VISIT US IN MUELLER
            </h3>
            <p className="text-brand-cream/90 text-sm leading-relaxed font-sans mb-4">
              {BUSINESS_INFO.address}
            </p>
            <div className="space-y-3 font-sans text-xs text-brand-cream/80">
              <a
                href={`tel:${BUSINESS_INFO.phoneRaw}`}
                className="flex items-center gap-2 hover:text-brand-gold justify-center md:justify-start transition-colors"
                id="footer-call"
              >
                <Phone size={14} className="text-brand-gold" />
                <span>{BUSINESS_INFO.phone}</span>
              </a>
              <a
                href={`mailto:${BUSINESS_INFO.emails.general}`}
                className="flex items-center gap-2 hover:text-brand-gold justify-center md:justify-start transition-colors"
                id="footer-mail"
              >
                <Mail size={14} className="text-brand-gold" />
                <span>{BUSINESS_INFO.emails.general}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-emerald-950/80 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-brand-cream/50 gap-4 text-center">
          <p>© {new Date().getFullYear()} Colleen's Kitchen. All rights reserved.</p>
          <div className="flex gap-6">
            <button onClick={() => setActiveTab('menu')} className="hover:text-brand-gold transition-colors">Menu</button>
            <button onClick={() => setActiveTab('ordering')} className="hover:text-brand-gold transition-colors">Order Online</button>
            <button onClick={() => setActiveTab('giftcards')} className="hover:text-brand-gold transition-colors">Gift Cards</button>
            <button onClick={() => setActiveTab('contact')} className="hover:text-brand-gold transition-colors">Contact</button>
          </div>
          <p className="text-brand-cream/30">powered by toast & elite design agency</p>
        </div>
      </div>
    </footer>
  );
}
