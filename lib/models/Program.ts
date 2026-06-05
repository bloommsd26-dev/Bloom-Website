import mongoose, { Schema, Model } from 'mongoose';
import { ProgramDocument } from '../types';

const ProgramSchema: Schema<ProgramDocument> = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Short description is required'],
    },
    longDescription: {
      type: String,
      required: [true, 'Long description is required'],
    },
    focusArea: {
      type: String,
      enum: ['education', 'personality', 'creative', 'women', 'community'],
      required: [true, 'Focus area is required'],
    },
    image: {
      type: String,
      required: [true, 'Image URL is required'],
    },
    activities: [
      {
        type: String,
        trim: true,
      },
    ],
    impact: {
      type: String,
      required: [true, 'Impact description is required'],
    },
  },
  { timestamps: true }
);

export const Program: Model<ProgramDocument> =
  mongoose.models.Program || mongoose.model<ProgramDocument>('Program', ProgramSchema);
