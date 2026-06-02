import mongoose, { Schema, Document } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: string;
  tags: string[];
  category: string;
  seoTitle: string;
  seoDescription: string;
  status: 'draft' | 'published';
  readingTime: number;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema<IBlog>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a blog title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Please provide a blog excerpt'],
      maxlength: 300,
    },
    content: {
      type: String,
      required: [true, 'Please provide blog content'],
    },
    coverImage: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: [true, 'Please provide author name'],
    },
    tags: [
      {
        type: String,
        trim: true,
      },
    ],
    category: {
      type: String,
      enum: [
        'education',
        'mentorship',
        'inspiration',
        'updates',
        'impact',
        'volunteering',
      ],
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

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
