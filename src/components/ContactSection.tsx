/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Phone, Mail, Clock, Calendar, Check, Send, AlertCircle } from 'lucide-react';
import { BUSINESS_INFO } from '../data';

export default function ContactSection() {
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !subject || !message) {
      alert('Please fill out all required fields.');
      return;
    }
    
    setSubmitting(true);
    
    // Simulate inquiry dispatch
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  return (
    <div className="w-full bg-[#FCFBF8]">
      {/* Contact Beautiful Top Hero */}
      <section className="relative h-[55vh] min-h-[380px] w-full bg-stone-900 overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1600&auto=format&fit=crop&q=80"
            alt="Colleen's Kitchen Dining Room Mueller Austin"
            className="w-full h-full object-cover opacity-50 scale-102"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-cream via-brand-forest/30 to-brand-charcoal/90 mix-blend-multiply" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <span className="text-brand-gold font-serif italic text-lg sm:text-xl tracking-widest mb-3 uppercase">
              VISIT US IN MUELLER
            </span>
            <div className="h-0.5 w-16 bg-brand-gold my-2" />
            <h1 className="font-display font-medium text-4xl sm:text-6xl tracking-tight text-white mb-4 uppercase">
              HEY Y'ALL
            </h1>
            <p className="text-xs sm:text-sm font-mono tracking-widest text-[#d8c7a9] uppercase">
              1911 Aldrich Street, Suite 100 &bull; Austin, Texas
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout Pane */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          
          {/* Left Side: General Outreach coordinates & information (5 columns) */}
          <div className="lg:col-span-5 space-y-12">
            
            <div className="space-y-4">
              <span className="text-xs font-mono font-bold tracking-widest text-brand-gold uppercase block">
                Colleen's Kitchen Address
              </span>
              <h2 className="font-display font-medium text-3xl sm:text-4xl text-brand-forest uppercase leading-tight tracking-wide">
                HELLO AUSTIN
              </h2>
              <div className="h-1 w-12 bg-brand-gold rounded-full" />
              
              <div className="pt-4 space-y-4 font-sans text-neutral-600">
                <div className="flex items-start gap-3">
                  <MapPin className="text-brand-gold mt-1 flex-shrink-0" size={18} />
                  <div>
                    <span className="block font-bold text-neutral-800">MUELLER BISTRO</span>
                    <span>{BUSINESS_INFO.address}</span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="text-brand-gold mt-1 flex-shrink-0" size={18} />
                  <div>
                    <span className="block font-bold text-neutral-800">TELEPHONE ENQUIRIES</span>
                    <a href={`tel:${BUSINESS_INFO.phoneRaw}`} className="text-brand-forest hover:text-brand-gold transition-colors font-semibold">
                      {BUSINESS_INFO.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Event inquiries & Employment details */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8 pt-4 border-t border-dotted border-neutral-200">
              
              <div className="space-y-3">
                <h3 className="font-display font-semibold text-lg text-brand-forest uppercase tracking-medium">
                  EVENT INQUIRIES
                </h3>
                <p className="text-xs text-neutral-550 leading-relaxed font-sans">
                  Dreaming of hosting birthdays, southern corporate lunches, or custom celebrations? Connect with our dedicated event coordinator:
                </p>
                <a
                  href={`mailto:${BUSINESS_INFO.emails.events}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-gold bg-brand-forest hover:bg-brand-moss py-2 px-4 rounded-lg shadow-sm border border-brand-gold/30 transition-all"
                  id="mail-events-btn"
                >
                  <Mail size={12} />
                  <span>{BUSINESS_INFO.emails.events}</span>
                </a>
              </div>

              <div className="space-y-3">
                <h3 className="font-display font-semibold text-lg text-brand-forest uppercase tracking-medium">
                  EMPLOYMENT
                </h3>
                <p className="text-xs text-neutral-550 leading-relaxed font-sans">
                  We are always seeking passionate hospitality minds, chefs, and servers who love honest kitchen crafts. Pitch your portfolio:
                </p>
                <a
                  href={`mailto:${BUSINESS_INFO.emails.general}`}
                  className="inline-flex items-center gap-2 text-xs font-mono font-bold text-brand-gold bg-brand-forest hover:bg-brand-moss py-2 px-4 rounded-lg shadow-sm border border-brand-gold/30 transition-all"
                  id="mail-general-btn"
                >
                  <Mail size={12} />
                  <span>{BUSINESS_INFO.emails.general}</span>
                </a>
              </div>

            </div>

            {/* Note alert */}
            <div className="bg-brand-cream/60 border border-brand-gold/15 p-4 rounded-xl text-xs font-sans text-neutral-500 leading-relaxed">
              * For immediate support, table reservations, or customized allergens queries, please dial our concierge desk directly at **{BUSINESS_INFO.phone}**. Otherwise, routes are cleared on the right.
            </div>

          </div>

          {/* Right Side: Reconstructed Direct Message form (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 shadow-md p-8 sm:p-10">
            <h3 className="font-display font-medium text-xl text-brand-forest uppercase tracking-wide border-b border-neutral-100 pb-4 mb-6">
              Send us a Message
            </h3>

            <AnimatePresence mode="wait">
              {!success ? (
                <motion.form
                  key="contact-form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 font-sans">
                      Email Address <span className="text-brand-moss">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. yourname@example.com"
                      className="w-full bg-neutral-50 hover:bg-neutral-100/40 focus:bg-white text-xs text-neutral-800 p-3 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 font-sans">
                      Subject <span className="text-brand-moss">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Catering Enquiry / Dining Reservation Room"
                      className="w-full bg-neutral-50 hover:bg-neutral-100/40 focus:bg-white text-xs text-neutral-800 p-3 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-sans"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-semibold text-neutral-700 font-sans">
                      Message <span className="text-brand-moss">*</span>
                    </label>
                    <textarea
                      rows={5}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Write your beautiful southern note in detail..."
                      className="w-full bg-neutral-50 hover:bg-neutral-100/40 focus:bg-white text-xs text-neutral-800 p-3 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-sans"
                    />
                  </div>

                  {/* Actions Submit */}
                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      id="submit-contact-btn"
                      className={`w-full py-3.5 rounded-xl font-sans tracking-widest font-bold text-xs uppercase flex items-center justify-center gap-2 transition-all cursor-pointer ${
                        submitting
                          ? 'bg-neutral-100 text-neutral-400 cursor-wait border border-neutral-200'
                          : 'bg-brand-forest hover:bg-brand-moss text-brand-gold shadow-md hover:scale-101 border border-brand-gold'
                      }`}
                    >
                      {submitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-neutral-300 border-t-brand-gold rounded-full animate-spin" />
                          <span>SENDING TO DISPATCH...</span>
                        </>
                      ) : (
                        <>
                          <Send size={13} />
                          <span>SUBMIT DIRECT INQUIRY</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.form>
              ) : (
                <motion.div
                  key="success-prompt"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-12 text-center space-y-6"
                >
                  <div className="flex justify-center">
                    <div className="bg-emerald-50 text-emerald-600 p-4 rounded-full border border-emerald-100">
                      <Check size={36} className="stroke-2" />
                    </div>
                  </div>
                  <div className="space-y-1.5 max-w-sm mx-auto">
                    <h4 className="font-display font-medium text-xl text-brand-forest">Inquiry Dispatched Successfully!</h4>
                    <p className="text-xs text-neutral-500 font-sans leading-relaxed">
                      Thank you so much! Your southern inquiry is logged. A dispatcher will analyze and reach back to your inbox within 24 working hours.
                    </p>
                  </div>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-xs font-sans font-bold tracking-widest text-brand-forest hover:text-brand-gold uppercase hover:underline"
                  >
                    Send Another Note
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

        {/* Reconstructed Mock Maps view at Mueller */}
        <div className="mt-16 bg-neutral-200 rounded-3xl h-96 overflow-hidden relative shadow-lg">
          {/* Unsplash beautiful Austin aerial landscape for a premium mockup maps look */}
          <img
            src="https://images.unsplash.com/photo-1531219572328-a0171b4448a3?w=1600&auto=format&fit=crop&q=80"
            alt="Mueller Austin Neighborhood Aerial Draft"
            className="w-full h-full object-cover opacity-85 select-none"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-brand-forest/10 mix-blend-color" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/40 to-transparent" />

          {/* Centered address tag banner */}
          <div className="absolute inset-x-4 bottom-8 flex justify-center">
            <div className="bg-white/95 backdrop-blur-md border border-brand-gold/20 p-5 rounded-2xl shadow-xl max-w-md w-full flex gap-4 select-none animate-bounce-short">
              <span className="bg-brand-cream text-brand-forest p-3 rounded-xl flex-shrink-0 flex items-center justify-center">
                <MapPin size={22} />
              </span>
              <div className="text-left">
                <span className="block text-xs font-sans font-bold text-brand-forest uppercase tracking-wider">COLLEN'S KITCHEN MUELLER</span>
                <span className="block text-xs text-neutral-600 font-sans mt-0.5">{BUSINESS_INFO.address}</span>
                <span className="text-[10px] font-semibold text-brand-gold uppercase tracking-widest mt-1.5 block">Austin Gateway &bull; Next to Alamo Drafthouse</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
