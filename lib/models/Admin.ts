import mongoose, { Schema, Model } from 'mongoose';
import { AdminDocument } from '../types';

const AdminSchema: Schema<AdminDocument> = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide an email'],
      unique: true,
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    username: {
      type: String,
      unique: true,
      lowercase: true,
      trim: true,
      minlength: [3, 'Username must be at least 3 characters'],
    },
    passwordHash: {
      type: String,
      minlength: 6,
      select: false,
    },
    role: {
      type: String,
      enum: ['super_admin', 'admin', 'editor', 'viewer'],
      default: 'viewer',
    },
  },
  { timestamps: true }
);

export const Admin: Model<AdminDocument> =
  mongoose.models.Admin || mongoose.model<AdminDocument>('Admin', AdminSchema);
