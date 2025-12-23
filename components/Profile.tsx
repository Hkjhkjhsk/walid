
import React, { useState, useRef } from 'react';
import { User } from '../types';

interface ProfileProps {
  user: User;
  onUpdate: (user: User) => void;
}

const Profile: React.FC<ProfileProps> = ({ user, onUpdate }) => {
  const [fullName, setFullName] = useState(user.fullName);
  const [bio, setBio] = useState(user.bio || '');
  const [isEditing, setIsEditing] = useState(false);
  const avatarInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    onUpdate({
      ...user,
      fullName,
      bio
    });
    setIsEditing(false);
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onUpdate({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-fadeIn">
      {/* Cover Area */}
      <div className="h-48 bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-700 relative">
        <div className="absolute inset-0 opacity-20" style={{backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
      </div>
      
      <div className="px-8 pb-8">
        <div className="relative -mt-20 mb-6 flex justify-center sm:justify-start">
          <div className="relative group">
            <img 
              src={user.avatar} 
              alt={user.username} 
              className="w-40 h-40 rounded-full border-4 border-white object-cover bg-gray-100 shadow-xl" 
            />
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={avatarInputRef} 
              onChange={handleAvatarChange}
            />
            <button 
              onClick={() => avatarInputRef.current?.click()}
              className="absolute inset-0 bg-black/40 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-1 backdrop-blur-[2px]"
            >
              <i className="fa-solid fa-camera text-2xl"></i>
              <span className="text-[10px] font-bold">تغيير الصورة</span>
            </button>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
          <div className="space-y-1">
            {isEditing ? (
              <input 
                value={fullName} 
                onChange={e => setFullName(e.target.value)}
                className="text-3xl font-bold text-gray-900 border-b-2 border-blue-500 outline-none w-full bg-transparent"
                autoFocus
              />
            ) : (
              <h1 className="text-3xl font-bold text-gray-900">{user.fullName}</h1>
            )}
            <div className="flex items-center gap-2 text-gray-500">
              <span className="bg-gray-100 px-2 py-0.5 rounded text-sm font-mono">@{user.username}</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={() => isEditing ? handleSave() : setIsEditing(true)}
              className={`px-8 py-2.5 rounded-xl font-bold transition-all shadow-sm flex items-center gap-2 ${
                isEditing 
                  ? 'bg-green-600 text-white hover:bg-green-700' 
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100'
              }`}
            >
              <i className={`fa-solid ${isEditing ? 'fa-check' : 'fa-pen-to-square'}`}></i>
              {isEditing ? 'حفظ التغييرات' : 'تعديل الملف الشخصي'}
            </button>
            {isEditing && (
              <button 
                onClick={() => setIsEditing(false)}
                className="px-4 py-2.5 rounded-xl font-bold text-gray-400 hover:text-gray-600 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                إلغاء
              </button>
            )}
          </div>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-2 text-gray-400">
            <i className="fa-solid fa-id-card"></i>
            <h2 className="text-sm font-bold uppercase tracking-wider">نبذة تعريفية</h2>
          </div>
          
          {isEditing ? (
            <textarea 
              value={bio}
              onChange={e => setBio(e.target.value)}
              className="w-full p-4 bg-gray-50 rounded-2xl outline-none border border-gray-200 focus:border-blue-500 min-h-[120px] text-gray-700"
              placeholder="أخبرنا بالمزيد عنك..."
            />
          ) : (
            <p className="text-gray-700 leading-relaxed text-lg bg-gray-50 p-6 rounded-2xl italic">
              {user.bio || 'لا توجد نبذة تعريفية مضافة حالياً. كن ملهماً وأضف واحدة!'}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-6 mt-10 border-t pt-8">
          <Stat label="منشورات" value="0" icon="fa-newspaper" color="text-blue-500" />
          <Stat label="أصدقاء" value={user.friends.length.toString()} icon="fa-user-group" color="text-green-500" />
          <Stat label="متابعين" value="0" icon="fa-star" color="text-yellow-500" />
        </div>
      </div>
    </div>
  );
};

const Stat = ({ label, value, icon, color }: { label: string, value: string, icon: string, color: string }) => (
  <div className="text-center group p-4 rounded-xl hover:bg-gray-50 transition-colors">
    <div className={`${color} mb-1 text-xl`}>
      <i className={`fa-solid ${icon}`}></i>
    </div>
    <div className="text-2xl font-black text-gray-900 group-hover:scale-110 transition-transform inline-block">{value}</div>
    <div className="text-[10px] text-gray-400 font-bold uppercase mt-1">{label}</div>
  </div>
);

export default Profile;
