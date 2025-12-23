
import { PrizeOption } from './types';

export const ADMIN_CODE = 'walidbou666';

export const PRIZES: PrizeOption[] = [
  { id: '500r', label: '500 روبوكس', icon: 'fa-gem', color: 'text-blue-400' },
  { id: '100r', label: '100 روبوكس', icon: 'fa-coins', color: 'text-yellow-400' },
  { id: 'korblox', label: 'رجل مقطوعة', icon: 'fa-skull', color: 'text-red-400' },
  { id: 'rare_outfit', label: 'ملابس نادرة عشوائية', icon: 'fa-shirt', color: 'text-purple-400' }
];

// Placeholder background if '1.png' is not found locally. 
// In a real scenario, the user provides 1.png in the same directory.
export const BACKGROUND_IMAGE = '1.png';
export const FALLBACK_BACKGROUND = 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=1920';
