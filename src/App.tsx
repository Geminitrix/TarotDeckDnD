import { useState, useEffect, useCallback } from 'react';
import { Card, GameState } from './types';
import {
  ALL_MAJOR_ARCANA,
  getCardsForLevel,
  getProficiencyBonus,
  shuffleDeck,
} from './data/cards';
import { HandCard, GrimorioCard } from './components/CardItem';
import { HeaderControls } from './components/HeaderControls';
import { StatusPanel } from './components/StatusPanel';
import { RulesModal } from './components/RulesModal';
import { AnimatePresence, motion } from 'motion/react';
import { AlertCircle, CheckCircle2, Sparkles } from 'lucide-react';

const STORAGE_KEY = 'cartomante_save';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'success';
}

export function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed.level === 'number') {
          return {
            level: parsed.level,
            deck: parsed.deck || [],
            hand: parsed.hand || [],
            discardPile: parsed.discardPile || [],
          };
        }
      }
    } catch (e) {
      console.warn('Erro ao carregar estado salvo:', e);
    }

    // Default initial state (level 1)
    const initialCards = getCardsForLevel(1);
    return {
      level: 1,
      deck: shuffleDeck(initialCards),
      hand: [],
      discardPile: [],
    };
  });

  const [toasts, setToasts] = useState<Toast[]>([]);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  // Helper to trigger toast notification
  const addToast = useCallback((message: string, type: 'info' | 'warning' | 'success' = 'info') => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  // Save to localStorage whenever state changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
    } catch (e) {
      console.warn('Erro ao salvar estado:', e);
    }
  }, [gameState]);

  // Change Level
  const handleLevelChange = (newLevel: number) => {
    setGameState((prev) => {
      const allowedCards = getCardsForLevel(newLevel);
      // Evita duplicar cartas caso você aumente de nível e a carta já esteja na mão ou descarte
      const newDeck = allowedCards.filter(
        (c) =>
          !prev.hand.some((h) => h.id === c.id) &&
          !prev.discardPile.some((d) => d.id === c.id)
      );

      return {
        ...prev,
        level: newLevel,
        deck: shuffleDeck(newDeck),
      };
    });

    addToast(`Nível de conjurador ajustado para ${newLevel}. Grimório atualizado!`, 'info');
  };

  // Draw single card helper
  const drawCard = () => {
    if (gameState.deck.length === 0) {
      addToast('O Grimório está sem cartas! Faça um Descanso Longo.', 'warning');
      return;
    }

    setGameState((prev) => {
      if (prev.deck.length === 0) return prev;
      const nextCard = prev.deck[0];
      const remainingDeck = prev.deck.slice(1);
      return {
        ...prev,
        deck: remainingDeck,
        hand: [...prev.hand, nextCard],
      };
    });
  };

  // Long Rest
  const handleLongRest = () => {
    const allowedCards = getCardsForLevel(gameState.level);
    const shuffled = shuffleDeck(allowedCards);
    const pb = getProficiencyBonus(gameState.level);

    // Draw up to PB cards
    const initialHand = shuffled.slice(0, pb);
    const remainingDeck = shuffled.slice(pb);

    setGameState((prev) => ({
      ...prev,
      deck: remainingDeck,
      hand: initialHand,
      discardPile: [],
    }));

    addToast(
      `Descanso Longo concluído! Baralho reembaralhado e ${initialHand.length} cartas sacadas (Bônus de Proficiência +${pb}).`,
      'success'
    );
  };

  // Play (Invocar) Card
  const handlePlayCard = (cardToPlay: Card) => {
    setGameState((prev) => ({
      ...prev,
      hand: prev.hand.filter((c) => c.id !== cardToPlay.id),
      discardPile: [...prev.discardPile, cardToPlay],
    }));
    addToast(`${cardToPlay.name} invocada e enviada para o descarte!`, 'info');
  };

  // Reset Game
  const handleReset = () => {
    if (window.confirm('Deseja reiniciar a mesa para o estado padrão do Nível 1?')) {
      const initialCards = getCardsForLevel(1);
      setGameState({
        level: 1,
        deck: shuffleDeck(initialCards),
        hand: [],
        discardPile: [],
      });
      addToast('Mesa reiniciada com sucesso.', 'info');
    }
  };

  const proficiencyBonus = getProficiencyBonus(gameState.level);
  const currentGrimorioCards = getCardsForLevel(gameState.level);

  return (
    <div className="min-h-screen flex flex-col justify-between py-6 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Toast Notification Container */}
      <div className="fixed top-5 right-5 z-50 flex flex-col gap-2 max-w-sm pointer-events-none">
        <AnimatePresence>
          {toasts.map((toast) => (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.9 }}
              className={`p-3.5 rounded-lg border shadow-xl flex items-start gap-2.5 backdrop-blur-md pointer-events-auto text-sm font-serif-card ${
                toast.type === 'warning'
                  ? 'bg-[#291208]/95 border-amber-500/60 text-amber-200'
                  : toast.type === 'success'
                  ? 'bg-[#0E2319]/95 border-emerald-500/60 text-emerald-200'
                  : 'bg-[#181124]/95 border-[#D4AF37]/50 text-[#F0E6D2]'
              }`}
            >
              {toast.type === 'warning' && <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />}
              {toast.type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />}
              {toast.type === 'info' && <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0 mt-0.5" />}
              <span className="leading-snug">{toast.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div>
        {/* Top Controls */}
        <HeaderControls
          level={gameState.level}
          onLevelChange={handleLevelChange}
          onLongRest={handleLongRest}
          onDrawCard={drawCard}
          onReset={handleReset}
          onToggleRules={() => setIsRulesOpen(true)}
          deckCount={gameState.deck.length}
        />

        {/* Sua Mão (Hand Section) */}
        <section id="hand-section" className="mb-6">
          <div className="text-center mb-3">
            <h2 className="text-2xl font-bold font-mystic text-[#D4AF37] tracking-wider drop-shadow">
              ~ Sua Mão ~
            </h2>
            <p className="text-xs text-[#A0937D] font-serif-card">
              {gameState.hand.length === 0
                ? 'Nenhuma carta na mão. Clique em "Comprar Carta" ou faça um "Descanso Longo".'
                : `${gameState.hand.length} carta${gameState.hand.length > 1 ? 's' : ''} pronta${gameState.hand.length > 1 ? 's' : ''} para invocar`}
            </p>
          </div>

          <div className="min-h-[290px] rounded-xl bg-black/20 border border-white/5 p-4 flex items-center justify-center overflow-x-auto">
            {gameState.hand.length === 0 ? (
              <div className="text-center py-10 px-4">
                <span className="text-4xl block mb-2 opacity-50">🃏</span>
                <p className="text-sm text-[#8A7E68] font-serif-card">
                  Sua mão está vazia.
                </p>
                <button
                  id="btn-quick-draw"
                  onClick={drawCard}
                  disabled={gameState.deck.length === 0}
                  className="mt-3 px-4 py-1.5 rounded text-xs font-mystic text-[#E5D3A3] border border-[#8C794C]/60 hover:border-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors cursor-pointer disabled:opacity-40"
                >
                  Comprar Carta
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 py-2 px-1">
                <AnimatePresence mode="popLayout">
                  {gameState.hand.map((card, idx) => (
                    <HandCard
                      key={`hand-${card.id}`}
                      card={card}
                      onPlay={handlePlayCard}
                      index={idx}
                    />
                  ))}
                </AnimatePresence>
              </div>
            )}
          </div>
        </section>

        {/* Grimório (Cartas Disponíveis no Nível) */}
        <section id="grimorio-section" className="mb-6 bg-white/[0.02] border-y border-white/10 py-4 px-2 sm:px-4 rounded-lg">
          <div className="flex items-center justify-between mb-3 px-2">
            <div>
              <h2 className="text-base font-bold font-mystic text-[#C8BC9D] tracking-wide">
                Cartas Disponíveis Neste Nível (O Grimório)
              </h2>
              <span className="text-xs text-[#8A7E68] font-serif-card">
                {currentGrimorioCards.length} de {ALL_MAJOR_ARCANA.length} cartas desbloqueadas no Nível {gameState.level}
              </span>
            </div>
            <span className="text-xs text-[#D4AF37] font-mono px-2 py-0.5 rounded bg-[#D4AF37]/10 border border-[#D4AF37]/20">
              Nv. {gameState.level}
            </span>
          </div>

          <div className="overflow-x-auto pb-2 -mx-1 px-1">
            <div className="flex items-center gap-2.5">
              {ALL_MAJOR_ARCANA.map((card) => {
                const isUnlocked = card.minLevel <= gameState.level;
                return (
                  <GrimorioCard
                    key={`grimorio-${card.id}`}
                    card={card}
                    isUnlocked={isUnlocked}
                  />
                );
              })}
            </div>
          </div>
        </section>

        {/* Painel Inferior (Status da Mesa & Descarte) */}
        <StatusPanel
          deckCount={gameState.deck.length}
          proficiencyBonus={proficiencyBonus}
          discardPile={gameState.discardPile}
        />
      </div>

      {/* Footer */}
      <footer className="mt-8 text-center text-xs text-[#6A6050] font-serif-card border-t border-white/5 pt-4">
        <span>Cartomante D&D 5e • Baralho de Tarô Homebrew Automatizado</span>
      </footer>

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesOpen}
        onClose={() => setIsRulesOpen(false)}
      />
    </div>
  );
}

export default App;
