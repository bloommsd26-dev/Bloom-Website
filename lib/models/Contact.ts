import mongoose, { Schema, Model } from 'mongoose';
import { ContactDocument } from '../types';

const ContactSchema: Schema<ContactDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: [true, 'Subject is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Message is required'],
      trim: true,
    },
    status: {
      type: String,
      enum: ['new', 'read', 'replied', 'archived'],
      default: 'new',
    },
  },
  { timestamps: true }
);

export const Contact: Model<ContactDocument> =
  mongoose.models.Contact || mongoose.model<ContactDocument>('Contact', ContactSchema);
