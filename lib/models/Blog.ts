import mongoose, { Schema, Model } from 'mongoose';
import { BlogDocument } from '../types';

const BlogSchema: Schema<BlogDocument> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Please provide a title'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide an excerpt'],
    },
    content: {
      type: String,
      required: [true, 'Please provide content'],
    },
    coverImage: {
      type: String,
      default: '',
    },
    author: {
      type: String,
      required: [true, 'Please provide an author'],
      default: 'Bloom Team',
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      default: 'updates',
    },
    seoTitle: {
      type: String,
      maxlength: 60,
    },
    seoDescription: {
      type: String,
      maxlength: 160,
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    readingTime: {
      type: Number,
      default: 5,
    },
  },
  { timestamps: true }
);

// Create text index for search
BlogSchema.index({ title: 'text', content: 'text', tags: 'text' });

export const Blog: Model<BlogDocument> = 
  mongoose.models.Blog || mongoose.model<BlogDocument>('Blog', BlogSchema);
