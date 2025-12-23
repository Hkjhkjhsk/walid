
import React, { useState, useEffect } from 'react';
import { User, Post, Message, ViewState } from './types';
import Auth from './components/Auth';
import Navbar from './components/Navbar';
import Feed from './components/Feed';
import Profile from './components/Profile';
import Friends from './components/Friends';
import Chat from './components/Chat';

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [view, setView] = useState<ViewState>(ViewState.AUTH);
  const [selectedChatUser, setSelectedChatUser] = useState<User | null>(null);

  // Initialize data from localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('dw_current_user');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
      setView(ViewState.FEED);
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    localStorage.setItem('dw_current_user', JSON.stringify(user));
    setView(ViewState.FEED);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('dw_current_user');
    setView(ViewState.AUTH);
  };

  const updateCurrentUser = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    localStorage.setItem('dw_current_user', JSON.stringify(updatedUser));
    
    // Update in the global users list too
    const users: User[] = JSON.parse(localStorage.getItem('dw_users') || '[]');
    const index = users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem('dw_users', JSON.stringify(users));
    }
  };

  if (!currentUser && view !== ViewState.AUTH) {
    setView(ViewState.AUTH);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      {currentUser && (
        <Navbar 
          user={currentUser} 
          currentView={view} 
          setView={setView} 
          onLogout={handleLogout} 
        />
      )}

      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {view === ViewState.AUTH && <Auth onAuthSuccess={handleLogin} />}
        
        {currentUser && (
          <>
            {view === ViewState.FEED && <Feed user={currentUser} />}
            {view === ViewState.PROFILE && (
              <Profile user={currentUser} onUpdate={updateCurrentUser} />
            )}
            {view === ViewState.FRIENDS && (
              <Friends 
                currentUser={currentUser} 
                onUpdateUser={updateCurrentUser} 
                onStartChat={(u) => {
                  setSelectedChatUser(u);
                  setView(ViewState.CHAT);
                }}
              />
            )}
            {view === ViewState.CHAT && (
              <Chat 
                currentUser={currentUser} 
                targetUser={selectedChatUser} 
                onBack={() => setView(ViewState.FRIENDS)}
              />
            )}
          </>
        )}
      </main>
      
      <footer className="bg-white border-t py-4 text-center text-gray-500 text-xs">
        &copy; 2024 دردشويب - تواصل، شارك، دردش
      </footer>
    </div>
  );
};

export default App;
