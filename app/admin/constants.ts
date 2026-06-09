import { BlogForm, AdminForm } from './types';
import { BLOG_CATEGORIES, ADMIN_ROLES } from '@/lib/constants';

export const emptyForm: BlogForm = {
  title: '',
  excerpt: '',
  content: '',
  coverImage: '',
  author: 'Bloom Team',
  tags: '',
  category: 'updates',
  seoTitle: '',
  seoDescription: '',
  status: 'draft',
};

export const emptyAccountForm: AdminForm = {
  name: '',
  email: '',
  username: '',
  password: '',
  role: 'viewer',
};

export const rolesList = [...ADMIN_ROLES];

export const categories = [...BLOG_CATEGORIES];
