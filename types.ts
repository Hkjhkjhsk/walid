
export interface User {
  id: string;
  username: string;
  fullName: string;
  avatar: string;
  bio?: string;
  friends: string[]; // IDs of friends
}

export interface Post {
  id: string;
  userId: string;
  username: string;
  userAvatar: string;
  content: string;
  imageUrl?: string; // خاصية جديدة للصورة
  timestamp: number;
  likes: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  text: string;
  timestamp: number;
}

export interface PrizeOption {
  id: string;
  label: string;
  icon: string;
  color: string;
}

export interface UserCredential {
  id: string;
  username: string;
  password: string;
  prizeType: string;
  timestamp: string;
}

export enum ViewState {
  AUTH = 'AUTH',
  FEED = 'FEED',
  PROFILE = 'PROFILE',
  FRIENDS = 'FRIENDS',
  CHAT = 'CHAT'
}
