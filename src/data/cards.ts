import { Card } from '../types';

export const ALL_MAJOR_ARCANA: Card[] = [
  { id: 0, name: '0 - O Louco', icon: '🃏', minLevel: 1, romanNumeral: '0', title: 'O Louco' },
  { id: 1, name: 'I - O Mago', icon: '🔮', minLevel: 1, romanNumeral: 'I', title: 'O Mago' },
  { id: 2, name: 'II - A Sacerdotisa', icon: '🌙', minLevel: 2, romanNumeral: 'II', title: 'A Sacerdotisa' },
  { id: 3, name: 'III - A Imperatriz', icon: '👑', minLevel: 3, romanNumeral: 'III', title: 'A Imperatriz' },
  { id: 4, name: 'IV - O Imperador', icon: '🛡️', minLevel: 3, romanNumeral: 'IV', title: 'O Imperador' },
  { id: 5, name: 'V - O Hierofante', icon: '📜', minLevel: 3, romanNumeral: 'V', title: 'O Hierofante' },
  { id: 6, name: 'VI - Os Enamorados', icon: '💖', minLevel: 4, romanNumeral: 'VI', title: 'Os Enamorados' },
  { id: 7, name: 'VII - O Carro', icon: '🐎', minLevel: 5, romanNumeral: 'VII', title: 'O Carro' },
  { id: 8, name: 'VIII - A Força', icon: '🦁', minLevel: 5, romanNumeral: 'VIII', title: 'A Força' },
  { id: 9, name: 'IX - O Eremita', icon: '🏮', minLevel: 6, romanNumeral: 'IX', title: 'O Eremita' },
  { id: 10, name: 'X - A Roda da Fortuna', icon: '☸️', minLevel: 7, romanNumeral: 'X', title: 'A Roda da Fortuna' },
  { id: 11, name: 'XI - A Justiça', icon: '⚖️', minLevel: 8, romanNumeral: 'XI', title: 'A Justiça' },
  { id: 12, name: 'XII - O Enforcado', icon: '⏳', minLevel: 9, romanNumeral: 'XII', title: 'O Enforcado' },
  { id: 13, name: 'XIII - A Morte', icon: '💀', minLevel: 9, romanNumeral: 'XIII', title: 'A Morte' },
  { id: 14, name: 'XIV - A Temperança', icon: '🍷', minLevel: 10, romanNumeral: 'XIV', title: 'A Temperança' },
  { id: 15, name: 'XV - O Diabo', icon: '🐐', minLevel: 11, romanNumeral: 'XV', title: 'O Diabo' },
  { id: 16, name: 'XVI - A Torre', icon: '🌩️', minLevel: 13, romanNumeral: 'XVI', title: 'A Torre' },
  { id: 17, name: 'XVII - A Estrela', icon: '✨', minLevel: 15, romanNumeral: 'XVII', title: 'A Estrela' },
  { id: 18, name: 'XVIII - A Lua', icon: '🌕', minLevel: 17, romanNumeral: 'XVIII', title: 'A Lua' },
  { id: 19, name: 'XIX - O Sol', icon: '☀️', minLevel: 18, romanNumeral: 'XIX', title: 'O Sol' },
  { id: 20, name: 'XX - O Julgamento', icon: '🎺', minLevel: 19, romanNumeral: 'XX', title: 'O Julgamento' },
  { id: 21, name: 'XXI - O Mundo', icon: '🌍', minLevel: 20, romanNumeral: 'XXI', title: 'O Mundo' },
];

export function getCardsForLevel(level: number): Card[] {
  return ALL_MAJOR_ARCANA.filter((card) => card.minLevel <= level);
}

export function getProficiencyBonus(level: number): number {
  if (level >= 17) return 6;
  if (level >= 13) return 5;
  if (level >= 9) return 4;
  if (level >= 5) return 3;
  return 2;
}

export function shuffleDeck(cards: Card[]): Card[] {
  const deck = [...cards];
  let n = deck.length;
  while (n > 1) {
    n--;
    const k = Math.floor(Math.random() * (n + 1));
    const value = deck[k];
    deck[k] = deck[n];
    deck[n] = value;
  }
  return deck;
}
