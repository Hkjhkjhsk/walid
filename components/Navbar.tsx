
import React from 'react';
import { User, ViewState } from '../types';

interface NavbarProps {
  user: User;
  currentView: ViewState;
  setView: (view: ViewState) => void;
  onLogout: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ user, currentView, setView, onLogout }) => {
  return (
    <nav className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-4xl flex items-center justify-between h-16">
        <div 
          className="text-2xl font-black cursor-pointer tracking-tighter"
          onClick={() => setView(ViewState.FEED)}
        >
          دردشويب
        </div>

        <div className="hidden md:flex items-center space-x-6 space-x-reverse">
          <NavItem 
            active={currentView === ViewState.FEED} 
            onClick={() => setView(ViewState.FEED)} 
            icon="fa-house" 
            label="الرئيسية" 
          />
          <NavItem 
            active={currentView === ViewState.FRIENDS} 
            onClick={() => setView(ViewState.FRIENDS)} 
            icon="fa-user-group" 
            label="الأصدقاء" 
          />
          <NavItem 
            active={currentView === ViewState.PROFILE} 
            onClick={() => setView(ViewState.PROFILE)} 
            icon="fa-user" 
            label="ملفي" 
          />
        </div>

        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 cursor-pointer hover:bg-white/10 p-1 rounded-lg transition-colors"
            onClick={() => setView(ViewState.PROFILE)}
          >
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-8 h-8 rounded-full border border-white/20 object-cover" 
            />
            <span className="hidden sm:inline font-medium text-sm">{user.fullName}</span>
          </div>
          <button 
            onClick={onLogout}
            className="text-white/80 hover:text-white transition-colors"
            title="تسجيل الخروج"
          >
            <i className="fa-solid fa-right-from-bracket"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ active, onClick, icon, label }: { active: boolean, onClick: () => void, icon: string, label: string }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-md transition-all font-medium ${active ? 'bg-white/20' : 'hover:bg-white/10 text-white/80 hover:text-white'}`}
  >
    <i className={`fa-solid ${icon}`}></i>
    <span>{label}</span>
  </button>
);

export default Navbar;
