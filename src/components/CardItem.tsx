import React from 'react';
import { Card } from '../types';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface HandCardProps {
  card: Card;
  onPlay: (card: Card) => void;
  index: number;
}

export const HandCard: React.FC<HandCardProps> = ({ card, onPlay, index }) => {
  return (
    <motion.div
      id={`hand-card-${card.id}`}
      layout
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8, y: -20 }}
      transition={{ duration: 0.25, delay: Math.min(index * 0.05, 0.3) }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="relative flex-shrink-0 w-44 h-64 rounded-xl p-[2px] shadow-2xl transition-shadow hover:shadow-[0_0_25px_rgba(212,175,55,0.35)]"
      style={{
        background: 'linear-gradient(145deg, #D4AF37 0%, #5C4D24 50%, #8C794C 100%)',
      }}
    >
      <div className="w-full h-full rounded-[10px] bg-gradient-to-b from-[#1F1533] to-[#120A1F] flex flex-col justify-between p-3 relative overflow-hidden">
        {/* Inner subtle gold border */}
        <div className="absolute inset-[4px] border border-[#D4AF37]/25 rounded-lg pointer-events-none" />

        {/* Card Title */}
        <div className="relative z-10 text-center pt-1 px-1">
          <span className="block text-sm font-semibold tracking-wide text-[#F0E6D2] font-serif-card truncate drop-shadow-sm">
            {card.name}
          </span>
          <div className="h-[1px] w-12 bg-gradient-to-r from-transparent via-[#D4AF37]/50 to-transparent mx-auto mt-1" />
        </div>

        {/* Center Icon */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center my-2">
          <div className="relative">
            <div className="absolute inset-0 blur-lg bg-[#D4AF37]/20 rounded-full scale-125" />
            <span className="relative text-6xl select-none filter drop-shadow-[0_4px_12px_rgba(0,0,0,0.8)]">
              {card.icon}
            </span>
          </div>
        </div>

        {/* Invocar Button */}
        <div className="relative z-10 pb-1">
          <button
            id={`btn-invocar-${card.id}`}
            onClick={() => onPlay(card)}
            className="w-full py-2 px-3 rounded text-sm font-medium font-mystic text-[#E5D3A3] bg-white/5 border border-[#8C794C] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 hover:text-white transition-all duration-200 active:scale-95 flex items-center justify-center gap-1.5 shadow-md cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Invocar</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

interface GrimorioCardProps {
  card: Card;
  isUnlocked: boolean;
}

export const GrimorioCard: React.FC<GrimorioCardProps> = ({ card, isUnlocked }) => {
  return (
    <div
      id={`grimorio-card-${card.id}`}
      className={`relative flex-shrink-0 w-28 h-40 rounded-lg p-[1px] transition-all duration-200 ${
        isUnlocked
          ? 'opacity-90 hover:opacity-100 hover:scale-105 shadow-md'
          : 'opacity-40 grayscale contrast-75'
      }`}
      style={{
        background: isUnlocked
          ? 'linear-gradient(135deg, rgba(212,175,55,0.4) 0%, rgba(92,77,36,0.3) 100%)'
          : 'rgba(255,255,255,0.05)',
      }}
    >
      <div className="w-full h-full rounded-[7px] bg-[#140D22]/80 flex flex-col justify-between p-2 text-center relative overflow-hidden border border-white/5">
        <div className="pt-1">
          <span className="block text-[11px] font-medium text-[#BDBDBD] font-serif-card truncate px-0.5">
            {card.name}
          </span>
        </div>
        <div className="my-auto py-1">
          <span className="text-3xl select-none filter drop-shadow">
            {card.icon}
          </span>
        </div>
        <div className="pb-0.5">
          <span className="text-[10px] text-[#A0937D] font-mono">
            Nv. {card.minLevel}
          </span>
        </div>
      </div>
    </div>
  );
};

interface DiscardCardProps {
  card: Card;
}

export const DiscardCard: React.FC<DiscardCardProps> = ({ card }) => {
  return (
    <div
      id={`discard-card-${card.id}`}
      className="relative flex-shrink-0 w-24 h-36 rounded-md p-[1px] shadow-sm transition-all duration-200 hover:scale-105"
      style={{
        background: 'linear-gradient(135deg, rgba(139,0,0,0.6) 0%, rgba(42,8,8,0.4) 100%)',
      }}
    >
      <div className="w-full h-full rounded-[5px] bg-gradient-to-b from-[#2A0808] to-[#120202] flex flex-col justify-between p-2 text-center border border-[#8B0000]/40">
        <div className="pt-0.5">
          <span className="block text-[11px] text-[#A9A9A9] font-serif-card truncate px-0.5">
            {card.name}
          </span>
        </div>
        <div className="my-auto">
          <span className="text-2xl select-none opacity-60 filter grayscale-[30%]">
            {card.icon}
          </span>
        </div>
        <div className="pb-0.5">
          <span className="text-[9px] uppercase tracking-wider text-red-400/70 font-mono">
            Usada
          </span>
        </div>
      </div>
    </div>
  );
};
