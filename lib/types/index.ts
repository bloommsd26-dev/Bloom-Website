import { Document, Types } from 'mongoose';
import { BlogStatus, MessageStatus, AdminRole } from '@/app/admin/types';

/**
 * UTILITY TYPES
 */
export type Serialized<T> = {
  [K in keyof T]: T[K] extends Date
    ? string
    : T[K] extends Types.ObjectId
      ? string
      : T[K] extends object
        ? Serialized<T[K]>
        : T[K];
};

export type ApiResponse<T> = {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
};

/**
 * BLOG TYPES
 */
export interface IBlog {
  _id: Types.ObjectId;
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
  createdAt: Date;
  updatedAt: Date;
}

export type BlogDocument = IBlog & Document;
export type BlogDTO = Serialized<IBlog>;

/**
 * CONTACT TYPES
 */
export interface IContact {
  _id: Types.ObjectId;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: MessageStatus;
  createdAt: Date;
  updatedAt: Date;
}

export type ContactDocument = IContact & Document;
export type ContactDTO = Serialized<IContact>;

/**
 * ADMIN TYPES
 */
export interface IAdmin {
  _id: Types.ObjectId;
  name: string;
  email: string;
  username: string;
  passwordHash?: string;
  role: AdminRole;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export type AdminDocument = IAdmin & Document;
export type AdminDTO = Serialized<IAdmin>;

/**
 * VOLUNTEER TYPES
 */
export interface IVolunteer {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  interests: string[];
  skills: string[];
  availability: string;
  message: string;
  status: 'pending' | 'reviewed' | 'accepted' | 'rejected';
  createdAt: Date;
  updatedAt: Date;
}

export type VolunteerDocument = IVolunteer & Document;
export type VolunteerDTO = Serialized<IVolunteer>;

/**
 * PROGRAM TYPES
 */
export interface IProgram {
  _id: Types.ObjectId;
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  focusArea: 'education' | 'personality' | 'creative' | 'women' | 'community';
  image: string;
  activities: string[];
  impact: string;
  createdAt: Date;
  updatedAt: Date;
}

export type ProgramDocument = IProgram & Document;
export type ProgramDTO = Serialized<IProgram>;
