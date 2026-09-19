import React from 'react';
import { X, BookOpen, Sparkles, Moon, Layers } from 'lucide-react';

interface RulesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="rules-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div
        id="rules-modal-content"
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto rounded-xl p-6 bg-gradient-to-b from-[#1E1430] to-[#0E0818] border border-[#D4AF37]/40 shadow-2xl text-[#F0E6D2]"
      >
        {/* Close Button */}
        <button
          id="btn-close-rules"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-[#A0937D] hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-5 border-b border-[#D4AF37]/20 pb-4">
          <BookOpen className="w-6 h-6 text-[#D4AF37]" />
          <div>
            <h2 className="text-xl font-bold font-mystic text-[#E5D3A3]">
              A Cartomante — Regras D&D 5e Homebrew
            </h2>
            <p className="text-xs text-[#A0937D] font-serif-card">
              Guia rápido de funcionamento mecânico do baralho
            </p>
          </div>
        </div>

        {/* Modal Body */}
        <div className="space-y-4 font-serif-card text-sm leading-relaxed text-[#DDD3C1]">
          <section className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5">
            <h3 className="text-base font-bold font-mystic text-[#D4AF37] mb-1 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              O Baralho Como Grimório
            </h3>
            <p>
              A Cartomante canaliza suas magias através dos arcanos do tarô. Em vez de possuir "espaços de magia" tradicionais, a classe utiliza seu baralho de cartas místicas. Cada carta sacada dita as magias que podem ser conjuradas. Ficar sem cartas na mão esgota seus recursos mágicos imediatos!
            </p>
          </section>

          <section className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5">
            <h3 className="text-base font-bold font-mystic text-[#D4AF37] mb-1 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Tamanho do Baralho e Progressão
            </h3>
            <p>
              No 1º nível, o baralho possui apenas duas cartas (<strong className="text-amber-200">0 - O Louco</strong> e <strong className="text-amber-200">I - O Mago</strong>). Novas cartas são desbloqueadas gradualmente conforme seu nível aumenta até o 20º nível (<strong className="text-amber-200">XXI - O Mundo</strong>).
            </p>
          </section>

          <section className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5">
            <h3 className="text-base font-bold font-mystic text-[#D4AF37] mb-1 flex items-center gap-2">
              <Moon className="w-4 h-4" />
              Descanso Longo & Bônus de Proficiência
            </h3>
            <p>
              Após concluir um <em>Descanso Longo</em>, todas as cartas descartadas e a mão atual são reembaralhadas de volta ao deck principal. O conjurador saca então uma quantidade de cartas igual ao seu <strong>Bônus de Proficiência (+2 a +6)</strong>.
            </p>
          </section>

          <section className="p-3.5 rounded-lg bg-white/[0.03] border border-white/5">
            <h3 className="text-base font-bold font-mystic text-[#D4AF37] mb-1">
              Descarte de Cartas (Invocar)
            </h3>
            <p>
              Ao conjurar a magia de uma carta, clique em <strong>Invocar</strong> para enviá-la para a Pilha de Descarte. A carta fica inacessível até o próximo Descanso Longo.
            </p>
          </section>
        </div>

        {/* Modal Footer */}
        <div className="mt-6 pt-4 border-t border-[#D4AF37]/20 flex justify-end">
          <button
            id="btn-understand-rules"
            onClick={onClose}
            className="px-5 py-2 rounded-lg bg-[#D4AF37]/20 border border-[#D4AF37] hover:bg-[#D4AF37]/30 text-[#E5D3A3] text-sm font-mystic font-bold transition-all cursor-pointer"
          >
            Entendido
          </button>
        </div>
      </div>
    </div>
  );
};
