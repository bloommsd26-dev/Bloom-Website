import { BlogForm, AdminForm, AdminRole } from './types';

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

export const rolesList: AdminRole[] = ['super_admin', 'admin', 'editor', 'viewer'];

export const categories = [
  'updates',
  'education',
  'mentorship',
  'inspiration',
  'impact',
  'volunteering',
];
