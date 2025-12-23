
import React, { useState, useEffect, useRef } from 'react';
import { User, Post } from '../types';

interface FeedProps {
  user: User;
}

const Feed: React.FC<FeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPostContent, setNewPostContent] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedPosts = localStorage.getItem('dw_posts');
    if (savedPosts) {
      setPosts(JSON.parse(savedPosts));
    }
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostContent.trim() && !selectedImage) return;

    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      userId: user.id,
      username: user.fullName, // نستخدم الاسم الكامل بدلاً من اليوزركي يظهر بشكل أجمل
      userAvatar: user.avatar,
      content: newPostContent,
      imageUrl: selectedImage || undefined,
      timestamp: Date.now(),
      likes: 0
    };

    const updatedPosts = [newPost, ...posts];
    setPosts(updatedPosts);
    localStorage.setItem('dw_posts', JSON.stringify(updatedPosts));
    setNewPostContent('');
    setSelectedImage(null);
  };

  return (
    <div className="space-y-6">
      {/* Create Post */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 animate-fadeIn">
        <div className="flex gap-4">
          <img src={user.avatar} alt={user.username} className="w-12 h-12 rounded-full object-cover border-2 border-blue-50" />
          <form onSubmit={handlePostSubmit} className="flex-1 space-y-3">
            <textarea 
              value={newPostContent}
              onChange={(e) => setNewPostContent(e.target.value)}
              placeholder={`بماذا تفكر يا ${user.fullName}؟`}
              className="w-full p-3 bg-gray-50 rounded-xl border-none focus:ring-2 focus:ring-blue-100 outline-none resize-none min-h-[80px] text-gray-800"
            ></textarea>
            
            {selectedImage && (
              <div className="relative group rounded-xl overflow-hidden border border-gray-200">
                <img src={selectedImage} alt="Preview" className="w-full h-auto max-h-64 object-cover" />
                <button 
                  type="button"
                  onClick={() => setSelectedImage(null)}
                  className="absolute top-2 left-2 bg-black/50 text-white w-8 h-8 rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                >
                  <i className="fa-solid fa-xmark"></i>
                </button>
              </div>
            )}

            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-2">
                <input 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  ref={fileInputRef} 
                  onChange={handleImageChange}
                />
                <button 
                  type="button" 
                  onClick={() => fileInputRef.current?.click()}
                  className="text-gray-600 hover:text-blue-600 px-4 py-2 rounded-lg bg-gray-100 hover:bg-blue-50 transition-colors text-sm font-bold flex items-center gap-2"
                >
                  <i className="fa-solid fa-image text-lg"></i>
                  <span>إضافة صورة</span>
                </button>
              </div>
              <button 
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2.5 rounded-xl font-bold transition-all disabled:opacity-50 shadow-md shadow-blue-200"
                disabled={!newPostContent.trim() && !selectedImage}
              >
                نشر الآن
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Post List */}
      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map(post => (
            <div key={post.id} className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-3 mb-4">
                <img src={post.userAvatar} alt={post.username} className="w-10 h-10 rounded-full object-cover border border-gray-100" />
                <div>
                  <div className="font-bold text-gray-900 leading-none">{post.username}</div>
                  <div className="text-[10px] text-gray-400 mt-1">{new Date(post.timestamp).toLocaleString('ar-EG')}</div>
                </div>
              </div>
              
              {post.content && (
                <p className="text-gray-800 leading-relaxed mb-4 whitespace-pre-wrap">{post.content}</p>
              )}
              
              {post.imageUrl && (
                <div className="mb-4 rounded-xl overflow-hidden border border-gray-50 bg-gray-50">
                  <img src={post.imageUrl} alt="Post content" className="w-full h-auto object-contain max-h-[500px]" />
                </div>
              )}

              <div className="border-t pt-3 flex items-center justify-between text-gray-500">
                <button className="hover:text-red-500 flex items-center gap-2 px-3 py-1.5 hover:bg-red-50 rounded-lg transition-colors font-medium">
                  <i className="fa-regular fa-heart text-lg"></i> 
                  <span>أعجبني</span>
                </button>
                <button className="hover:text-blue-500 flex items-center gap-2 px-3 py-1.5 hover:bg-blue-50 rounded-lg transition-colors font-medium">
                  <i className="fa-regular fa-comment text-lg"></i> 
                  <span>تعليق</span>
                </button>
                <button className="hover:text-green-500 flex items-center gap-2 px-3 py-1.5 hover:bg-green-50 rounded-lg transition-colors font-medium">
                  <i className="fa-regular fa-share-from-square text-lg"></i> 
                  <span>مشاركة</span>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-dashed border-gray-200">
             <i className="fa-solid fa-feather-pointed text-4xl text-gray-200 mb-4 block"></i>
             <p className="text-gray-400 italic">لا توجد منشورات حتى الآن. شارك أفكارك وصورك مع الجميع!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed;
