import React from 'react';
import { Moon, PlusCircle, HelpCircle, RotateCcw } from 'lucide-react';

interface HeaderControlsProps {
  level: number;
  onLevelChange: (level: number) => void;
  onLongRest: () => void;
  onDrawCard: () => void;
  onReset: () => void;
  onToggleRules: () => void;
  deckCount: number;
}

export const HeaderControls: React.FC<HeaderControlsProps> = ({
  level,
  onLevelChange,
  onLongRest,
  onDrawCard,
  onReset,
  onToggleRules,
  deckCount,
}) => {
  return (
    <header
      id="main-header-controls"
      className="bg-white/[0.04] backdrop-blur-md border border-white/10 rounded-xl p-4 shadow-xl mb-6"
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Title & Level Selection */}
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2">
            <span className="text-2xl select-none">🔮</span>
            <div>
              <h1 className="text-xl font-bold font-mystic text-[#E5D3A3] tracking-wide">
                Cartomante <span className="text-xs font-normal text-[#D4AF37]/80 uppercase px-1.5 py-0.5 border border-[#D4AF37]/30 rounded ml-1 font-mono">D&D 5e</span>
              </h1>
              <p className="text-xs text-[#A0937D] font-serif-card">
                O Grimório Arcano & Gestão de Cartas
              </p>
            </div>
          </div>

          <div className="h-8 w-[1px] bg-white/10 hidden sm:block" />

          {/* Level Selector */}
          <div className="flex items-center gap-2">
            <label htmlFor="cbo-level" className="text-sm font-mystic text-[#E5D3A3]">
              Nível do Conjurador:
            </label>
            <select
              id="cbo-level"
              value={level}
              onChange={(e) => onLevelChange(Number(e.target.value))}
              className="bg-[#181124] text-[#F0E6D2] border border-[#8C794C] rounded-md px-3 py-1.5 text-sm font-mystic focus:outline-none focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] cursor-pointer"
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((lvl) => (
                <option key={lvl} value={lvl} className="bg-[#1A112C] text-[#F0E6D2]">
                  Nível {lvl}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          {/* Long Rest Button */}
          <button
            id="btn-long-rest"
            onClick={onLongRest}
            className="group relative px-4 py-2 rounded-lg bg-gradient-to-r from-[#241738] to-[#1a112c] border border-[#8C794C] hover:border-[#D4AF37] text-[#E5D3A3] hover:text-white text-sm font-mystic tracking-wider transition-all duration-200 shadow-md hover:shadow-[0_0_15px_rgba(212,175,55,0.25)] active:scale-95 flex items-center gap-2 cursor-pointer"
            title="Embaralha todo o descarte e mão de volta no baralho e compra cartas iguais ao Bônus de Proficiência"
          >
            <Moon className="w-4 h-4 text-[#D4AF37] group-hover:rotate-12 transition-transform duration-300" />
            <span>Descanso Longo</span>
          </button>

          {/* Draw Card Button */}
          <button
            id="btn-draw-card"
            onClick={onDrawCard}
            disabled={deckCount === 0}
            className={`px-4 py-2 rounded-lg border text-sm font-mystic tracking-wider transition-all duration-200 shadow-md flex items-center gap-2 cursor-pointer active:scale-95 ${
              deckCount > 0
                ? 'bg-[#15FFFFFF] border-[#8C794C] hover:border-[#D4AF37] hover:bg-[#D4AF37]/20 text-[#E5D3A3] hover:text-white hover:shadow-[0_0_15px_rgba(212,175,55,0.25)]'
                : 'bg-white/5 border-white/10 text-white/40 cursor-not-allowed opacity-60'
            }`}
            title={deckCount > 0 ? 'Compra a próxima carta do topo do baralho' : 'Baralho vazio! Faça um Descanso Longo.'}
          >
            <PlusCircle className="w-4 h-4 text-[#D4AF37]" />
            <span>Comprar Carta</span>
          </button>

          {/* Rules / Help Button */}
          <button
            id="btn-rules-help"
            onClick={onToggleRules}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#A0937D] hover:text-[#E5D3A3] hover:border-[#8C794C] transition-colors cursor-pointer"
            title="Ver Regras da Cartomante"
            aria-label="Ver Regras da Cartomante"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Reset Table Button */}
          <button
            id="btn-reset-game"
            onClick={onReset}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-[#A0937D] hover:text-red-400 hover:border-red-500/50 transition-colors cursor-pointer"
            title="Reiniciar Mesa"
            aria-label="Reiniciar Mesa"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
