import mongoose, { Schema, Document } from 'mongoose';

export interface IVolunteer extends Document {
  name: string;
  email: string;
  phone: string;
  interests: string[];
  skills: string[];
  availability: string;
  applicationStatus: 'pending' | 'approved' | 'rejected';
  message?: string;
  hoursContributed: number;
  createdAt: Date;
  updatedAt: Date;
}

const VolunteerSchema = new Schema<IVolunteer>(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      lowercase: true,
      match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email'],
    },
    phone: {
      type: String,
      required: [true, 'Please provide your phone number'],
    },
    interests: [
      {
        type: String,
        enum: [
          'education',
          'mentorship',
          'creative',
          'community',
          'women_empowerment',
          'awareness',
        ],
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
      enum: ['weekdays', 'weekends', 'flexible'],
      default: 'flexible',
    },
    applicationStatus: {
      type: String,
      enum: ['pending', 'approved', 'rejected'],
      default: 'pending',
    },
    message: {
      type: String,
      maxlength: 1000,
    },
    hoursContributed: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Volunteer =
  mongoose.models.Volunteer || mongoose.model<IVolunteer>('Volunteer', VolunteerSchema);
