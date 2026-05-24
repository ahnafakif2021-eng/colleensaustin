/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface MenuItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'supper' | 'lunch' | 'brunch' | 'sweets' | 'beverage' | 'happy hour' | 'kiddos';
  image: string;
  tags?: string[];
}

export interface CartItem {
  id: string;
  menuItem: MenuItem;
  quantity: number;
  customization?: string;
}

export interface GiftCardOrder {
  id: string;
  amount: number;
  customAmount?: string;
  deliveryOption: 'email' | 'text' | 'me';
  recipientEmail?: string;
  confirmEmail?: string;
  recipientPhone?: string;
  confirmPhone?: string;
  deliveryDate: 'today' | 'later';
  deliveryDateValue?: string;
  recipientName: string;
  senderName: string;
  customMessage: string;
}

export interface InquiryFormState {
  email: string;
  subject: string;
  message: string;
}
