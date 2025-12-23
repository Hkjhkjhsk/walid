
import React from 'react';
import { PRIZES } from '../constants';

interface SelectionViewProps {
  onSelect: (label: string) => void;
  onBack: () => void;
}

const SelectionView: React.FC<SelectionViewProps> = ({ onSelect, onBack }) => {
  return (
    <div className="animate-fadeIn space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">اختر جائزتك المفضلة</h2>
        <p className="text-white/70">يمكنك الحصول على جائزة واحدة فقط لكل حساب</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {PRIZES.map((prize) => (
          <button
            key={prize.id}
            onClick={() => onSelect(prize.label)}
            className="group custom-glass p-6 rounded-2xl flex items-center space-x-6 space-x-reverse text-right transition-all hover:bg-white/20 hover:scale-105 active:scale-95"
          >
            <div className={`w-16 h-16 rounded-xl bg-black/40 flex items-center justify-center text-3xl ${prize.color}`}>
              <i className={`fa-solid ${prize.icon}`}></i>
            </div>
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white">{prize.label}</h3>
              <p className="text-sm text-white/50">متوفر الآن لفترة محدودة</p>
            </div>
            <i className="fa-solid fa-chevron-left text-white/20 group-hover:text-white transition-colors"></i>
          </button>
        ))}
      </div>

      <button 
        onClick={onBack}
        className="mx-auto block text-white/60 hover:text-white underline underline-offset-4 transition-colors"
      >
        العودة للخلف
      </button>
    </div>
  );
};

export default SelectionView;
