import React, { useState } from 'react';
import { ArtworkId } from '../types';

interface DishArtworkProps {
  artworkId: ArtworkId;
  className?: string;
}

const PHOTO_MAP: Record<ArtworkId, { src: string; alt: string }> = {
  mini_thali: {
    src: '/assets/aistudio/screen_8f9069aa.png',
    alt: 'Mini Thali with rotis, dal tadka, paneer curry, rice, and salad',
  },
  veg_sandwich: {
    src: '/assets/aistudio/screen_8c141c73.png',
    alt: 'Toasted Veg Sandwich with green chutney',
  },
  masala_dosa: {
    src: '/assets/aistudio/screen_84577380.png',
    alt: 'Crispy Masala Dosa served with sambhar and coconut chutney',
  },
  samosa: {
    src: '/assets/aistudio/screen_4e2df3c1.png',
    alt: 'Golden crispy Samosas with mint and tamarind chutney',
  },
  cold_coffee: {
    src: '/assets/aistudio/screen_ab36c075.png',
    alt: 'Creamy Cold Coffee topped with ice cream and chocolate drizzle',
  },
  paneer_tikka_roll: {
    src: '/assets/aistudio/screen_bd3e5683.png',
    alt: 'Tandoori Paneer Tikka Roll wrapped in flaky paratha',
  },
};

export const DishArtwork: React.FC<DishArtworkProps> = ({ artworkId, className = '' }) => {
  const [imgError, setImgError] = useState(false);
  const photo = PHOTO_MAP[artworkId];

  if (!imgError) {
    return (
      <img
        src={photo.src}
        alt={photo.alt}
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={`w-full h-full object-cover ${className}`}
      />
    );
  }

  return (
    <div
      className={`w-full h-full bg-gradient-to-br from-[#FFF4EC] to-[#F1F5F9] flex items-center justify-center text-xs font-bold text-[#172554] p-4 text-center ${className}`}
    >
      {photo.alt}
    </div>
  );
};
