
import React, { useState } from 'react';

interface HomeViewProps {
  onStart: () => void;
  onCodeSubmit: (code: string) => void;
}

const HomeView: React.FC<HomeViewProps> = ({ onStart, onCodeSubmit }) => {
  const [code, setCode] = useState('');

  return (
    <div className="flex flex-col items-center justify-center space-y-8 animate-fadeIn">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-extrabold text-white drop-shadow-lg leading-tight">
          جوائز بمناسبة <span className="text-green-500">كاس افريقيا</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-bold text-blue-400">
          روبوكس مجاني لجميع اللاعبين!
        </h2>
      </div>

      <div className="w-full max-w-md space-y-4">
        <div className="custom-glass p-6 rounded-2xl shadow-2xl">
          <label className="block text-white mb-2 text-center text-lg">ادخل كود الجائزة</label>
          <div className="flex gap-2">
            <input 
              type="text" 
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="كود الخصم أو الجائزة..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-blue-500 text-right"
            />
            <button 
              onClick={() => onCodeSubmit(code)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all active:scale-95"
            >
              تحقق
            </button>
          </div>
        </div>

        <button 
          onClick={onStart}
          className="w-full py-5 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 text-white text-2xl font-black rounded-2xl shadow-[0_10px_30px_rgba(16,185,129,0.3)] transition-all transform hover:-translate-y-1 active:scale-95 border-b-4 border-green-800"
        >
          ابدأ الآن
        </button>
      </div>

      <div className="flex items-center space-x-4 space-x-reverse opacity-70">
        <i className="fa-solid fa-shield-halved text-green-400 text-2xl"></i>
        <p className="text-white text-sm">موقع آمن وموثق من شركة روبلوكس العالمية</p>
      </div>
    </div>
  );
};

export default HomeView;
