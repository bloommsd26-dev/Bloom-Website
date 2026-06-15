/**
 * AUTH CONSTANTS
 */
export const AUTH_COOKIE_NAME = 'bloom_admin_token';
export const ADMIN_ROLES = ['super_admin', 'admin', 'editor', 'viewer'] as const;
export type AdminRole = (typeof ADMIN_ROLES)[number];

/**
 * BLOG CONSTANTS
 */
export const BLOG_STATUSES = ['draft', 'published'] as const;
export type BlogStatus = (typeof BLOG_STATUSES)[number];

export const BLOG_CATEGORIES = [
  'updates',
  'education',
  'mentorship',
  'inspiration',
  'impact',
  'volunteering',
  'stories',
  'creative',
] as const;
export type BlogCategory = (typeof BLOG_CATEGORIES)[number];

/**
 * MESSAGE CONSTANTS
 */
export const MESSAGE_STATUSES = ['new', 'read', 'replied', 'archived'] as const;
export type MessageStatus = (typeof MESSAGE_STATUSES)[number];

/**
 * VOLUNTEER CONSTANTS
 */
export const VOLUNTEER_STATUSES = ['pending', 'reviewed', 'accepted', 'rejected'] as const;
export type VolunteerStatus = (typeof VOLUNTEER_STATUSES)[number];

/**
 * PROGRAM CONSTANTS
 */
export const PROGRAM_FOCUS_AREAS = [
  'education',
  'personality',
  'creative',
  'women',
  'community',
] as const;
export type ProgramFocusArea = (typeof PROGRAM_FOCUS_AREAS)[number];

/**
 * DEMO CONTENT
 */
export const DEMO_BLOG_SLUGS = [
  'introducing-bloom',
  'tutoring-changes-lives',
  'power-of-platform',
];
