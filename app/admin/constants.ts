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
  permissions: [],
};

export const permissionsList = [
  'manage_blogs',
  'manage_programs',
  'manage_donations',
  'manage_volunteers',
  'manage_impact',
  'manage_admins',
  'manage_settings',
];

export const rolesList: AdminRole[] = ['super_admin', 'admin', 'editor', 'viewer'];

export const categories = [
  'updates',
  'education',
  'mentorship',
  'inspiration',
  'impact',
  'volunteering',
];
