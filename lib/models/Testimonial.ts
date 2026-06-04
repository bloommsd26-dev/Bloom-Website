import mongoose, { Schema, Document } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  role: string;
  image: string;
  quote: string;
  category: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema<ITestimonial>(
  {
    name: {
      type: String,
      required: [true, 'Please provide a name'],
      trim: true,
    },
    role: {
      type: String,
      required: [true, 'Please provide a role'],
      trim: true,
    },
    image: {
      type: String,
      required: false,
    },
    quote: {
      type: String,
      required: [true, 'Please provide a testimonial quote'],
    },
    category: {
      type: String,
      enum: ['volunteer', 'donor', 'student', 'parent'],
      default: 'volunteer',
    },
  },
  { timestamps: true }
);

export const Testimonial =
  mongoose.models.Testimonial || mongoose.model<ITestimonial>('Testimonial', TestimonialSchema);
