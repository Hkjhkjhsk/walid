
import React, { useState, useEffect } from 'react';
import { User } from '../types';

interface FriendsProps {
  currentUser: User;
  onUpdateUser: (user: User) => void;
  onStartChat: (targetUser: User) => void;
}

const Friends: React.FC<FriendsProps> = ({ currentUser, onUpdateUser, onStartChat }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [allUsers, setAllUsers] = useState<User[]>([]);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem('dw_users') || '[]');
    setAllUsers(users.filter((u: User) => u.id !== currentUser.id));
  }, [currentUser]);

  const toggleFriend = (targetId: string) => {
    let updatedFriends = [...currentUser.friends];
    if (updatedFriends.includes(targetId)) {
      updatedFriends = updatedFriends.filter(id => id !== targetId);
    } else {
      updatedFriends.push(targetId);
    }
    onUpdateUser({ ...currentUser, friends: updatedFriends });
  };

  const filteredUsers = allUsers.filter(u => 
    u.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || 
    u.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const friendsList = allUsers.filter(u => currentUser.friends.includes(u.id));

  return (
    <div className="space-y-8 animate-fadeIn">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">ابحث عن أصدقاء</h2>
        <div className="relative">
          <i className="fa-solid fa-magnifying-glass absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input 
            type="text" 
            placeholder="ابحث بالاسم أو اسم المستخدم..."
            className="w-full pr-12 pl-4 py-3 bg-gray-50 rounded-xl outline-none focus:ring-2 focus:ring-blue-100 border border-transparent transition-all"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="mt-6 space-y-3">
          {searchTerm && filteredUsers.map(u => (
            <div key={u.id} className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl transition-colors border border-transparent hover:border-gray-200">
              <div className="flex items-center gap-3">
                <img src={u.avatar} className="w-10 h-10 rounded-full border" />
                <div>
                  <div className="font-bold text-sm text-gray-900">{u.fullName}</div>
                  <div className="text-xs text-gray-400">@{u.username}</div>
                </div>
              </div>
              <button 
                onClick={() => toggleFriend(u.id)}
                className={`px-4 py-1.5 rounded-lg text-sm font-bold transition-all ${
                  currentUser.friends.includes(u.id) 
                    ? 'bg-red-50 text-red-600 hover:bg-red-100' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {currentUser.friends.includes(u.id) ? 'إزالة الصديق' : 'إضافة صديق'}
              </button>
            </div>
          ))}
          {searchTerm && filteredUsers.length === 0 && (
            <div className="text-center text-gray-400 py-4 italic text-sm">لا يوجد نتائج لهذا البحث.</div>
          )}
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-6">قائمة الأصدقاء ({friendsList.length})</h2>
        {friendsList.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {friendsList.map(friend => (
              <div key={friend.id} className="p-4 border rounded-xl flex items-center justify-between hover:border-blue-200 transition-all group">
                <div className="flex items-center gap-3">
                  <img src={friend.avatar} className="w-12 h-12 rounded-full border border-gray-100" />
                  <div>
                    <div className="font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{friend.fullName}</div>
                    <div className="text-xs text-gray-400">@{friend.username}</div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onStartChat(friend)}
                    className="p-2 text-blue-600 bg-blue-50 rounded-full hover:bg-blue-100 transition-colors"
                    title="بدء دردشة"
                  >
                    <i className="fa-solid fa-message"></i>
                  </button>
                  <button 
                    onClick={() => toggleFriend(friend.id)}
                    className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                    title="إزالة"
                  >
                    <i className="fa-solid fa-user-minus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-10">
            <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fa-solid fa-user-group text-gray-300 text-2xl"></i>
            </div>
            <p className="text-gray-400 italic">ليس لديك أصدقاء بعد. ابحث عن أصدقاء لإضافتهم!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
