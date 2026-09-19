export interface Card {
  id: number;
  name: string;
  icon: string;
  minLevel: number;
  romanNumeral: string;
  title: string;
  spellLevelEquivalent?: number;
}

export interface GameState {
  level: number;
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
}
