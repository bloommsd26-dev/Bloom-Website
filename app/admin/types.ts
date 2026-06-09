import { BlogStatus, AdminRole, MessageStatus } from '@/lib/constants';

export type { BlogStatus, AdminRole, MessageStatus };

export interface AdminAccount {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: AdminRole;
  createdAt: string;
}

export interface AdminForm {
  name: string;
  email: string;
  username: string;
  password?: string;
  role: AdminRole;
}

export type Message = {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: string;
};

export type BlogPost = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  author: string;
  tags: string[];
  category: string;
  seoTitle?: string;
  seoDescription?: string;
  status: BlogStatus;
  readingTime?: number;
  updatedAt?: string;
};

export type BlogForm = {
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string;
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: BlogStatus;
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};
