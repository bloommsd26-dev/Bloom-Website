import mongoose, { Schema, Document } from 'mongoose';

export interface IImpact extends Document {
  childrenReached: number;
  sessionsConducted: number;
  volunteerHours: number;
  donationsCollected: number;
  communitiesReached: number;
  stories: {
    title: string;
    content: string;
    image?: string;
  }[];
  reports: {
    title: string;
    date: Date;
    url: string;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

const ImpactSchema = new Schema<IImpact>(
  {
    childrenReached: {
      type: Number,
      default: 0,
    },
    sessionsConducted: {
      type: Number,
      default: 0,
    },
    volunteerHours: {
      type: Number,
      default: 0,
    },
    donationsCollected: {
      type: Number,
      default: 0,
    },
    communitiesReached: {
      type: Number,
      default: 0,
    },
    stories: [
      {
        title: String,
        content: String,
        image: String,
      },
    ],
    reports: [
      {
        title: String,
        date: Date,
        url: String,
      },
    ],
  },
  { timestamps: true }
);

export const Impact = mongoose.models.Impact || mongoose.model<IImpact>('Impact', ImpactSchema);
