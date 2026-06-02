import mongoose, { Schema, Document } from 'mongoose';

export interface IDonation extends Document {
  title: string;
  description: string;
  itemsNeeded: string[];
  location: string;
  images: string[];
  date: Date;
  status: 'active' | 'completed' | 'cancelled';
  collectedItems: {
    item: string;
    quantity: number;
    unit: string;
  }[];
  impactGenerated: string;
  targetQuantity: number;
  collectedQuantity: number;
  createdAt: Date;
  updatedAt: Date;
}

const DonationSchema = new Schema<IDonation>(
  {
    title: {
      type: String,
      required: [true, 'Please provide a campaign title'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Please provide a campaign description'],
    },
    itemsNeeded: [
      {
        type: String,
        trim: true,
      },
    ],
    location: {
      type: String,
      required: [true, 'Please provide a location'],
    },
    images: [
      {
        type: String,
      },
    ],
    date: {
      type: Date,
      required: [true, 'Please provide a campaign date'],
    },
    status: {
      type: String,
      enum: ['active', 'completed', 'cancelled'],
      default: 'active',
    },
    collectedItems: [
      {
        item: String,
        quantity: Number,
        unit: String,
      },
    ],
    impactGenerated: {
      type: String,
    },
    targetQuantity: {
      type: Number,
      default: 0,
    },
    collectedQuantity: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const Donation =
  mongoose.models.Donation || mongoose.model<IDonation>('Donation', DonationSchema);
