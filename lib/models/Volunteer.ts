import mongoose, { Schema, Model } from 'mongoose';
import { VolunteerDocument } from '../types';

const VolunteerSchema: Schema<VolunteerDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, 'Phone number is required'],
      trim: true,
    },
    interests: [
      {
        type: String,
        trim: true,
      },
    ],
    skills: [
      {
        type: String,
        trim: true,
      },
    ],
    availability: {
      type: String,
      default: 'flexible',
    },
    message: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'accepted', 'rejected'],
      default: 'pending',
    },
  },
  { timestamps: true }
);

export const Volunteer: Model<VolunteerDocument> =
  mongoose.models.Volunteer || mongoose.model<VolunteerDocument>('Volunteer', VolunteerSchema);
