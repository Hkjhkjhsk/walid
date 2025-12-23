
import React, { useState, useEffect, useRef } from 'react';
import { User, Message } from '../types';

interface ChatProps {
  currentUser: User;
  targetUser: User | null;
  onBack: () => void;
}

const Chat: React.FC<ChatProps> = ({ currentUser, targetUser, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!targetUser) return;
    const allMessages = JSON.parse(localStorage.getItem('dw_messages') || '[]');
    const filteredMessages = allMessages.filter((m: Message) => 
      (m.senderId === currentUser.id && m.receiverId === targetUser.id) ||
      (m.senderId === targetUser.id && m.receiverId === currentUser.id)
    );
    setMessages(filteredMessages);
  }, [targetUser, currentUser]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !targetUser) return;

    const newMessage: Message = {
      id: Math.random().toString(36).substr(2, 9),
      senderId: currentUser.id,
      receiverId: targetUser.id,
      text: inputText,
      timestamp: Date.now()
    };

    const allMessages = JSON.parse(localStorage.getItem('dw_messages') || '[]');
    const updatedMessages = [...allMessages, newMessage];
    localStorage.setItem('dw_messages', JSON.stringify(updatedMessages));
    
    setMessages([...messages, newMessage]);
    setInputText('');
  };

  if (!targetUser) {
    return (
      <div className="flex flex-col items-center justify-center h-96 bg-white rounded-2xl shadow-sm border border-gray-100 text-gray-400 italic">
        يرجى اختيار صديق لبدء الدردشة
        <button onClick={onBack} className="mt-4 text-blue-600 font-bold not-italic hover:underline">العودة لقائمة الأصدقاء</button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg border border-gray-100 flex flex-col h-[600px] max-h-[80vh]">
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="text-gray-400 hover:text-gray-900 sm:hidden">
            <i className="fa-solid fa-arrow-right"></i>
          </button>
          <img src={targetUser.avatar} className="w-10 h-10 rounded-full border" />
          <div>
            <div className="font-bold text-gray-900">{targetUser.fullName}</div>
            <div className="text-xs text-green-500 font-medium">نشط الآن</div>
          </div>
        </div>
        <div className="flex gap-4 text-gray-400">
          <i className="fa-solid fa-phone hover:text-blue-600 cursor-pointer"></i>
          <i className="fa-solid fa-video hover:text-blue-600 cursor-pointer"></i>
          <i className="fa-solid fa-circle-info hover:text-blue-600 cursor-pointer"></i>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
        {messages.length > 0 ? (
          messages.map(m => (
            <div 
              key={m.id} 
              className={`flex ${m.senderId === currentUser.id ? 'justify-start' : 'justify-end'}`}
            >
              <div 
                className={`max-w-[75%] p-3 rounded-2xl text-sm shadow-sm ${
                  m.senderId === currentUser.id 
                    ? 'bg-blue-600 text-white rounded-tr-none' 
                    : 'bg-white text-gray-800 border rounded-tl-none'
                }`}
              >
                {m.text}
                <div className={`text-[10px] mt-1 opacity-70 ${m.senderId === currentUser.id ? 'text-left' : 'text-right'}`}>
                  {new Date(m.timestamp).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 text-xs py-10 italic">لا توجد رسائل سابقة. ابدأ المحادثة الآن!</div>
        )}
        <div ref={scrollRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSend} className="p-4 border-t flex items-center gap-2">
        <button type="button" className="text-blue-600 hover:bg-blue-50 w-10 h-10 rounded-full transition-colors">
          <i className="fa-solid fa-plus"></i>
        </button>
        <input 
          type="text" 
          value={inputText}
          onChange={e => setInputText(e.target.value)}
          placeholder="اكتب رسالتك..."
          className="flex-1 bg-gray-100 rounded-full px-5 py-2.5 outline-none focus:ring-2 focus:ring-blue-100 transition-all border border-transparent focus:bg-white focus:border-gray-200"
        />
        <button 
          type="submit"
          disabled={!inputText.trim()}
          className="bg-blue-600 hover:bg-blue-700 text-white w-10 h-10 rounded-full flex items-center justify-center transition-all disabled:opacity-50 disabled:cursor-not-allowed transform active:scale-95 shadow-md"
        >
          <i className="fa-solid fa-paper-plane rotate-180"></i>
        </button>
      </form>
    </div>
  );
};

export default Chat;
