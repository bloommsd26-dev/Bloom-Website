export type BlogStatus = 'draft' | 'published';
export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

export type AdminAccount = {
  _id: string;
  name: string;
  email: string;
  username: string;
  role: AdminRole;
  permissions: string[];
  createdAt?: string;
};

export type AdminForm = {
  name: string;
  email: string;
  username: string;
  password?: string;
  role: AdminRole;
  permissions: string[];
};

export type MessageStatus = 'new' | 'read' | 'replied' | 'archived';

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
