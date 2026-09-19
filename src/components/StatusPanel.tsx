import React from 'react';
import { Card } from '../types';
import { DiscardCard } from './CardItem';
import { Layers, Shield, Trash2 } from 'lucide-react';

interface StatusPanelProps {
  deckCount: number;
  proficiencyBonus: number;
  discardPile: Card[];
}

export const StatusPanel: React.FC<StatusPanelProps> = ({
  deckCount,
  proficiencyBonus,
  discardPile,
}) => {
  return (
    <section
      id="status-discard-panel"
      className="bg-[#0A0510]/90 border border-[#2A1A3F] rounded-xl p-5 shadow-2xl backdrop-blur-sm"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left side: Table Status */}
        <div className="lg:col-span-4 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-[#2A1A3F] pb-4 lg:pb-0 lg:pr-6">
          <div className="flex items-center gap-2 mb-3">
            <Layers className="w-5 h-5 text-[#D4AF37]" />
            <h2 className="text-lg font-bold font-mystic text-[#E5D3A3] tracking-wide">
              Status da Mesa
            </h2>
          </div>

          <div className="space-y-3 font-serif-card">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-sm text-[#BDBDBD] flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#D4AF37]" />
                Cartas no Baralho:
              </span>
              <span className="text-base font-bold text-[#F0E6D2] font-mono">
                {deckCount}
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-white/[0.03] border border-white/5">
              <span className="text-sm text-[#BDBDBD] flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#8C794C]" />
                Bônus de Proficiência:
              </span>
              <span className="text-base font-bold text-[#E5D3A3] font-mono">
                +{proficiencyBonus}
              </span>
            </div>

            <div className="text-[12px] text-[#8A7E68] italic pt-1">
              * Cartas na mão e descarte retornam ao baralho no Descanso Longo.
            </div>
          </div>
        </div>

        {/* Right side: Discard Pile */}
        <div className="lg:col-span-8 flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Trash2 className="w-4 h-4 text-[#8B0000]" />
              <h3 className="text-base font-bold font-mystic text-[#A83232] tracking-wide">
                Pilha de Descarte ({discardPile.length})
              </h3>
            </div>
            {discardPile.length > 0 && (
              <span className="text-xs text-[#8A7E68] font-serif-card">
                Cartas já invocadas nesta sessão
              </span>
            )}
          </div>

          {discardPile.length === 0 ? (
            <div className="h-36 rounded-lg border border-dashed border-[#8B0000]/20 flex flex-col items-center justify-center p-4 text-center bg-black/20">
              <p className="text-xs font-serif-card text-[#8A7E68] italic">
                Nenhuma carta descartada ainda. Ao "Invocar" da sua mão, a carta virá para esta pilha.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto pb-2 -mx-1 px-1">
              <div className="flex items-center gap-3">
                {discardPile.map((card) => (
                  <DiscardCard key={`discard-${card.id}`} card={card} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
