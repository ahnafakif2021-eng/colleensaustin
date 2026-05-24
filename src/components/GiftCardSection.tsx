/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Mail, Phone, Calendar, Heart, MessageSquare, ShieldCheck, Sparkles, AlertCircle, ShoppingCart } from 'lucide-react';
import { BUSINESS_INFO, LOGO_URL } from '../data';

interface GiftCardSectionProps {
  onAddGiftCardToCart: (amount: number, details: any) => void;
}

export default function GiftCardSection({ onAddGiftCardToCart }: GiftCardSectionProps) {
  // Option Selectors
  const [selectedPreset, setSelectedPreset] = useState<number | 'custom'>(25);
  const [customAmount, setCustomAmount] = useState('');
  const [deliveryOption, setDeliveryOption] = useState<'email' | 'text' | 'me'>('email');
  const [deliveryDateType, setDeliveryDateType] = useState<'today' | 'later'>('today');
  
  // Custom inputs
  const [recipientEmail, setRecipientEmail] = useState('');
  const [confirmEmail, setConfirmEmail] = useState('');
  const [recipientPhone, setRecipientPhone] = useState('');
  const [confirmPhone, setConfirmPhone] = useState('');
  
  const [deliveryDateValue, setDeliveryDateValue] = useState('');
  
  // Personalization
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [customMessage, setCustomMessage] = useState('');

  // Cart Status Simulators
  const [balanceInquiryValue, setBalanceInquiryValue] = useState('');
  const [balanceResult, setBalanceResult] = useState<string | null>(null);
  const [balanceInquiryOpen, setBalanceInquiryOpen] = useState(false);
  const [addedPopupOpen, setAddedPopupOpen] = useState(false);
  
  const getGiftValue = () => {
    if (selectedPreset === 'custom') {
      const num = parseFloat(customAmount);
      return isNaN(num) ? 0 : num;
    }
    return selectedPreset;
  };

  const handleCustomAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedPreset('custom');
    setCustomAmount(value);
  };

  const handleValidateBalance = (e: React.FormEvent) => {
    e.preventDefault();
    if (!balanceInquiryValue.trim()) {
      alert('Please enter a gift card number to check.');
      return;
    }
    // Simulate lookup
    const randomAmount = (Math.random() * 120 + 5).toFixed(2);
    setBalanceResult(`Card details validated. Active Balance: $${randomAmount}`);
  };

  const handleCreateGiftOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const finalAmount = getGiftValue();
    
    // Validations
    if (finalAmount < 5 || finalAmount > 500) {
      alert('Gift card amount must be between $5.00 and $500.00.');
      return;
    }

    if (deliveryOption === 'email') {
      if (!recipientEmail || recipientEmail !== confirmEmail) {
        alert('Please make sure recipient email addresses match.');
        return;
      }
    } else if (deliveryOption === 'text') {
      if (!recipientPhone || recipientPhone !== confirmPhone) {
        alert('Please make sure phone numbers match.');
        return;
      }
    }

    if (deliveryDateType === 'later' && !deliveryDateValue) {
      alert('Please select a future delivery date.');
      return;
    }

    if (!recipientName || !senderName) {
      alert("Please provide the Recipient's and Sender's names.");
      return;
    }

    // Call success
    const giftCardDetails = {
      amount: finalAmount,
      deliveryOption,
      recipientEmail,
      recipientPhone,
      deliveryDate: deliveryDateType,
      deliveryDateValue: deliveryDateType === 'later' ? deliveryDateValue : 'Immediately',
      recipientName,
      senderName,
      customMessage
    };

    onAddGiftCardToCart(finalAmount, giftCardDetails);
    setAddedPopupOpen(true);
    
    // Reset state
    setRecipientEmail('');
    setConfirmEmail('');
    setRecipientPhone('');
    setConfirmPhone('');
    setRecipientName('');
    setSenderName('');
    setCustomMessage('');
    setCustomAmount('');
    setSelectedPreset(25);
  };

  return (
    <div className="w-full bg-[#FCFBF8] min-h-screen">
      {/* Top Banner Feature Bar */}
      <div className="bg-white border-b border-brand-gold/15 py-4 px-4 sticky top-24 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="bg-brand-cream text-brand-moss p-2 rounded-lg border border-brand-gold/20">
              <Gift size={16} />
            </span>
            <div>
              <h2 className="text-xs font-sans font-bold tracking-widest text-[#9c8464] uppercase">Colleen's Digital Vault</h2>
              <p className="text-[10px] text-neutral-500 font-sans">Share the southern celebration joy with family</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setBalanceInquiryOpen(true);
                setBalanceResult(null);
                setBalanceInquiryValue('');
              }}
              className="text-xs font-sans font-bold tracking-wider text-brand-forest hover:text-brand-gold uppercase underline"
            >
              Check Balance
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid Pane */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Frame: Live dynamic preview (5 columns) */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-40">
            
            {/* Elegant 3D Interactive Card Mockup */}
            <motion.div
              whileHover={{ scale: 1.02, rotateY: 2, rotateX: -2 }}
              style={{ transformStyle: 'preserve-3d' }}
              className="w-full aspect-[1.6/1] rounded-2xl p-8 relative overflow-hidden bg-[#FEDFD0] border border-orange-100 shadow-xl flex flex-col justify-between"
            >
              {/* Monogram bottle details inside background with custom absolute design */}
              <div className="absolute right-8 bottom-8 top-8 w-24 opacity-95 pointer-events-none flex flex-col justify-end items-center">
                {/* Custom CSS bottle representation mimicking screenshot illustration of champagne with letters */}
                <div className="w-10 h-32 bg-[#2d502f] rounded-t-lg rounded-b-xl relative border border-emerald-950 flex flex-col items-center justify-center p-1 shadow-md">
                  {/* Neck of bottle */}
                  <div className="absolute -top-6 w-4 h-8 bg-[#2d502f] rounded-t-xs border-t-2 border-brand-gold">
                    {/* Gold foil wire */}
                    <div className="w-full h-2 bg-brand-gold mt-1" />
                  </div>
                  {/* Monogram text letter 'c' */}
                  <div className="text-brand-gold font-serif italic text-3xl font-light transform -rotate-12 mb-2 select-none select-none">
                    e
                  </div>
                  {/* Black label dot */}
                  <div className="w-2.5 h-2.5 bg-black rounded-full border border-brand-gold" />
                </div>
              </div>

              {/* Logo / Script wordmark */}
              <div className="space-y-1 relative z-10 max-w-[60%]">
                <p className="font-serif italic text-[#63291d] text-lg lg:text-xl font-medium tracking-wide">
                  Colleen's
                </p>
                <p className="text-[10px] uppercase font-mono tracking-widest text-[#7c4438] font-bold">
                  kitchen
                </p>
              </div>

              {/* Dynamic Live Card Pricing Info */}
              <div className="relative z-10">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#9e5242] font-semibold block">
                  DIGITAL GIFT CARD
                </span>
                <h4 id="gift-preview-amount" className="font-display font-medium text-4xl text-[#4a1c13] mt-1">
                  ${getGiftValue() > 0 ? getGiftValue().toFixed(2) : '0.00'}
                </h4>
              </div>

              {/* Ambient sparkles/borders decoration */}
              <div className="absolute inset-0 border border-white/20 rounded-2xl pointer-events-none" />
              <div className="absolute top-4 right-4 text-brand-gold/40 animate-pulse">
                <Sparkles size={24} />
              </div>
            </motion.div>

            {/* Design elements features box */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 space-y-4 shadow-xs">
              <h4 className="text-xs uppercase tracking-widest font-bold text-brand-forest font-sans">Why Gift Colleen's?</h4>
              <ul className="space-y-3 font-sans text-xs text-neutral-600">
                <li className="flex items-start gap-2.5">
                  <ShieldCheck size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Instant Delivery:</strong> Choose scheduled email, text, or instant receipt layout, directly to the recipient's phone or desktop perfectly.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <Heart size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span><strong>Personalized Experience:</strong> Every single card allows customized notes, special event milestones, or custom sender coordinates.</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <AlertCircle size={14} className="text-brand-gold flex-shrink-0 mt-0.5" />
                  <span>No hidden processing fees, no expirations, fully compatible with both Walk-up orders and in-person table service.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Right Frame: Reconstructed Purchase Form (7 columns) */}
          <div className="lg:col-span-7 bg-white rounded-2xl border border-neutral-200 shadow-md p-8">
            <h1 className="font-display font-medium text-2xl lg:text-3xl text-brand-forest uppercase tracking-wide border-b border-neutral-100 pb-4 mb-6">
              Colleen's Kitchen Gift Card
            </h1>

            <form onSubmit={handleCreateGiftOrder} className="space-y-6">
              
              {/* 1. Gift Amount */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-neutral-700 tracking-wider uppercase font-sans">
                  * Gift Amount
                </label>
                
                {/* Preset buttons */}
                <div className="grid grid-cols-4 gap-3">
                  {[25, 50, 100, 200].map((amount) => (
                    <button
                      key={amount}
                      type="button"
                      id={`preset-btn-${amount}`}
                      onClick={() => {
                        setSelectedPreset(amount);
                        setCustomAmount('');
                      }}
                      className={`py-3 px-1 text-center rounded-xl text-xs sm:text-sm font-semibold font-mono border transition-all cursor-pointer ${
                        selectedPreset === amount
                          ? 'bg-brand-forest text-brand-gold border-brand-gold shadow-xs'
                          : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                      }`}
                    >
                      ${amount.toFixed(2)}
                    </button>
                  ))}
                </div>

                {/* Custom Amount form element */}
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400 font-mono text-sm pointer-events-none">
                    $
                  </span>
                  <input
                    type="number"
                    min="5"
                    max="500"
                    placeholder="Customize amount ($5.00 - $500.00)"
                    value={customAmount}
                    onChange={handleCustomAmountChange}
                    className="w-full bg-neutral-50 hover:bg-neutral-100/40 focus:bg-white text-sm text-neutral-805 pl-8 pr-4 py-3 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none transition-all font-mono"
                  />
                </div>
              </div>

              {/* 2. Delivery Options */}
              <div className="space-y-4">
                <label className="block text-xs font-bold text-neutral-700 tracking-wider uppercase font-sans">
                  * Delivery Options
                </label>

                <div className="space-y-3">
                  {/* Option A: Send via Email */}
                  <label className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 cursor-pointer hover:border-brand-gold/40 transition-all">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'email'}
                      onChange={() => setDeliveryOption('email')}
                      className="accent-brand-moss h-4 w-4"
                    />
                    <div className="flex items-center gap-2 text-xs font-sans text-neutral-750 font-medium select-none">
                      <Mail size={14} className="text-brand-moss" />
                      <span>Send this card via Email</span>
                    </div>
                  </label>

                  {/* Option B: Send via Text */}
                  <label className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 cursor-pointer hover:border-brand-gold/40 transition-all">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'text'}
                      onChange={() => setDeliveryOption('text')}
                      className="accent-brand-moss h-4 w-4"
                    />
                    <div className="flex items-center gap-2 text-xs font-sans text-neutral-750 font-medium select-none">
                      <Phone size={14} className="text-brand-moss" />
                      <span>Send this card via Text</span>
                    </div>
                  </label>

                  {/* Option C: Send to Sender self */}
                  <label className="flex items-center gap-3 bg-neutral-50 p-3 rounded-xl border border-neutral-200 cursor-pointer hover:border-brand-gold/40 transition-all">
                    <input
                      type="radio"
                      name="deliveryOption"
                      checked={deliveryOption === 'me'}
                      onChange={() => setDeliveryOption('me')}
                      className="accent-brand-moss h-4 w-4"
                    />
                    <div className="flex items-center gap-2 text-xs font-sans text-neutral-750 font-medium select-none">
                      <Gift size={14} className="text-brand-moss" />
                      <span>Send this card To Me first</span>
                    </div>
                  </label>
                </div>

                {/* Conditional Sub-fields */}
                <AnimatePresence mode="wait">
                  {deliveryOption === 'email' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Recipient Email *</label>
                        <input
                          type="email"
                          required
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="e.g. friend@example.com"
                          className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Confirm Email *</label>
                        <input
                          type="email"
                          required
                          value={confirmEmail}
                          onChange={(e) => setConfirmEmail(e.target.value)}
                          placeholder="Verify recipient email"
                          className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                    </motion.div>
                  )}

                  {deliveryOption === 'text' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1"
                    >
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Recipient Phone *</label>
                        <input
                          type="tel"
                          required
                          value={recipientPhone}
                          onChange={(e) => setRecipientPhone(e.target.value)}
                          placeholder="e.g. 512-555-0101"
                          className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="block text-[10px] font-sans font-semibold text-neutral-700">Confirm Phone *</label>
                        <input
                          type="tel"
                          required
                          value={confirmPhone}
                          onChange={(e) => setConfirmPhone(e.target.value)}
                          placeholder="Verify phone number"
                          className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* 3. Delivery Date and Time */}
              <div className="space-y-3">
                <label className="block text-xs font-bold text-neutral-700 tracking-wider uppercase font-sans">
                  * Delivery Date and Time
                </label>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setDeliveryDateType('today')}
                    className={`flex-1 py-3 px-1 rounded-xl text-xs font-semibold font-sans border transition-all cursor-pointer ${
                      deliveryDateType === 'today'
                        ? 'bg-brand-moss text-brand-gold border-brand-gold shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    Today
                  </button>

                  <button
                    type="button"
                    onClick={() => setDeliveryDateType('later')}
                    className={`flex-1 py-3 px-1 rounded-xl text-xs font-semibold font-sans border transition-all cursor-pointer ${
                      deliveryDateType === 'later'
                        ? 'bg-brand-moss text-brand-gold border-brand-gold shadow-xs'
                        : 'bg-neutral-50 hover:bg-neutral-100 text-neutral-700 border-neutral-200'
                    }`}
                  >
                    Later
                  </button>
                </div>

                <AnimatePresence>
                  {deliveryDateType === 'later' && (
                    <motion.div
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -5 }}
                      className="space-y-1"
                    >
                      <label className="block text-[10px] font-sans font-semibold text-neutral-700">Select Date *</label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-neutral-400 pointer-events-none">
                          <Calendar size={13} />
                        </span>
                        <input
                          type="date"
                          required
                          value={deliveryDateValue}
                          onChange={(e) => setDeliveryDateValue(e.target.value)}
                          className="w-full bg-neutral-50 font-sans text-xs text-neutral-850 pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <p className="text-[11px] text-neutral-400 font-sans leading-snug">
                  {deliveryDateType === 'today' 
                    ? "We'll send the digital card immediately after you complete the order."
                    : `We'll schedule the digital card dispatch on ${deliveryDateValue || 'your selected future date'}.`
                  }
                </p>
              </div>

              {/* 4. Personalize Your Card */}
              <div className="space-y-4 pt-2 border-t border-dotted border-neutral-200">
                <h4 className="text-xs uppercase tracking-widest font-bold text-brand-forest font-sans">
                  Personalize Your Card
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-[10px] font-sans font-semibold text-neutral-700">Recipient's Name *</label>
                    <input
                      type="text"
                      required
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      placeholder="e.g. Olivia Vance"
                      className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="block text-[10px] font-sans font-semibold text-neutral-700">Sender's Name *</label>
                    <input
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Arthur Cook"
                      className="w-full bg-neutral-50 text-xs text-neutral-800 p-2.5 rounded-lg border border-neutral-350 outline-none focus:border-brand-gold font-sans"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center text-[10px] font-sans font-semibold text-neutral-700">
                    <label>Add a custom message *</label>
                    <span className={customMessage.length > 255 ? 'text-rose-600' : 'text-neutral-450'}>
                      {customMessage.length} / 255
                    </span>
                  </div>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-neutral-400 pointer-events-none">
                      <MessageSquare size={13} />
                    </span>
                    <textarea
                      rows={3}
                      maxLength={255}
                      required
                      placeholder="Write your beautiful greeting card message..."
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      className="w-full bg-neutral-50 text-xs text-neutral-850 pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 focus:border-brand-gold focus:ring-1 focus:ring-brand-gold outline-none font-sans"
                    />
                  </div>
                </div>
              </div>

              {/* Add to Cart checkout action */}
              <button
                type="submit"
                id="add-giftcard-button"
                className="w-full text-center py-4 bg-brand-forest hover:bg-brand-moss text-brand-gold font-sans font-bold text-xs tracking-widest uppercase rounded-xl shadow-md hover:scale-101 border border-brand-gold/30 cursor-pointer transition-all"
              >
                Add to Cart
              </button>
            </form>
          </div>

        </div>
      </div>

      {/* DIALOG A: Balance Checker Modal */}
      <AnimatePresence>
        {balanceInquiryOpen && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-2xl max-w-sm w-full border border-neutral-200 shadow-2xl p-6 relative font-sans text-neutral-800"
            >
              <button
                onClick={() => setBalanceInquiryOpen(false)}
                className="absolute top-4 right-4 text-neutral-400 hover:text-black p-1.5 focus:outline-none"
              >
                close x
              </button>

              <div className="flex flex-col items-center text-center space-y-4">
                <div className="bg-brand-cream text-brand-gold p-3 rounded-full">
                  <ShieldCheck size={26} />
                </div>
                <div>
                  <h3 className="font-display font-medium text-lg text-brand-forest uppercase">Check Card Balance</h3>
                  <p className="text-[11px] text-neutral-500 mt-1">Provide your 16-digit digital gift card identifier below to look up real-time balances.</p>
                </div>

                <form onSubmit={handleValidateBalance} className="w-full space-y-3">
                  <input
                    type="text"
                    required
                    placeholder="e.g. 5039-4402-1920-8022"
                    value={balanceInquiryValue}
                    onChange={(e) => setBalanceInquiryValue(e.target.value)}
                    className="w-full bg-neutral-50 text-xs text-center p-3 rounded-xl border border-neutral-300 outline-none focus:border-brand-gold font-mono tracking-widest"
                  />
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-brand-forest hover:bg-brand-moss text-brand-gold font-sans font-semibold text-xs tracking-widest uppercase rounded-xl border border-brand-gold/30 cursor-pointer"
                  >
                    Check Balance
                  </button>
                </form>

                {balanceResult && (
                  <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 p-3 rounded-xl text-xs w-full text-center">
                    <span className="font-medium">{balanceResult}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DIALOG B: Gift Card added popup alert */}
      <AnimatePresence>
        {addedPopupOpen && (
          <div className="fixed inset-x-0 bottom-8 z-50 flex justify-center px-4">
            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="bg-brand-forest text-brand-cream px-6 py-4 rounded-xl shadow-2xl border border-brand-gold/20 flex items-center justify-between gap-6 max-w-lg w-full"
            >
              <div className="flex items-center gap-3">
                <span className="bg-brand-moss text-brand-gold p-2 rounded-full">
                  <ShoppingCart size={15} />
                </span>
                <div className="text-xs font-sans text-left">
                  <span className="font-bold text-white block">Gift Card Added!</span>
                  <span>Your custom gift voucher has been logged in your checkout basket successfully.</span>
                </div>
              </div>
              <button
                onClick={() => setAddedPopupOpen(false)}
                className="text-xs uppercase font-sans tracking-wider text-brand-gold font-bold hover:underline cursor-pointer"
              >
                Acknowledge
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
