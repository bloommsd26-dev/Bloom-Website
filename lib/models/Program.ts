import mongoose, { Schema, Document } from 'mongoose';

export interface IProgram extends Document {
  title: string;
  slug: string;
  description: string;
  longDescription: string;
  focusArea:
    | 'education'
    | 'personality'
    | 'creative'
    | 'women'
    | 'community';
  activities: string[];
  goals: string[];
  impact: string;
  images: string[];
  impactMetrics: {
    childrenReached: number;
    sessionsConducetd: number;
    volunteerHours: number;
  };
  seoTitle: string;
  seoDescription: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProgramSchema = new Schema<IProgram>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a program title'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Slug is required'],
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a short description'],
    },
    longDescription: {
      type: String,
      required: [true, 'Please provide a detailed description'],
    },
    focusArea: {
      type: String,
      enum: ['education', 'personality', 'creative', 'women', 'community'],
      required: true,
    },
    activities: [
      {
        type: String,
        trim: true,
      },
    ],
    goals: [
      {
        type: String,
        trim: true,
      },
    ],
    impact: {
      type: String,
    },
    images: [
      {
        type: String,
      },
    ],
    impactMetrics: {
      childrenReached: {
        type: Number,
        default: 0,
      },
      sessionsConducetd: {
        type: Number,
        default: 0,
      },
      volunteerHours: {
        type: Number,
        default: 0,
      },
    },
    seoTitle: {
      type: String,
      maxlength: 60,
    },
    seoDescription: {
      type: String,
      maxlength: 160,
    },
  },
  { timestamps: true }
);

export const Program =
  mongoose.models.Program || mongoose.model<IProgram>('Program', ProgramSchema);
