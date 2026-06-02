import { connectDB } from '@/db/connect';
import { Volunteer } from '@/models/Volunteer';
import { successResponse, errorResponse, validationError } from '@/utils/api-response';
import { validateEmail, validatePhone } from '@/utils/helpers';

export async function GET(request: Request) {
  try {
    await connectDB();

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const volunteers = await Volunteer.find()
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await Volunteer.countDocuments();

    return successResponse({
      volunteers,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching volunteers:', error);
    return errorResponse('Failed to fetch volunteers', 500);
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();

    const body = await request.json();
    const { name, email, phone, interests, skills, availability, message } = body;

    // Validation
    if (!name || !email || !phone) {
      return validationError('Name, email, and phone are required');
    }

    if (!validateEmail(email)) {
      return validationError('Please provide a valid email address');
    }

    if (!validatePhone(phone)) {
      return validationError('Please provide a valid phone number');
    }

    if (interests && interests.length === 0) {
      return validationError('Please select at least one area of interest');
    }

    // Check if email already exists
    const existingVolunteer = await Volunteer.findOne({ email });
    if (existingVolunteer) {
      return validationError('This email address is already registered');
    }

    // Create volunteer
    const volunteer = await Volunteer.create({
      name,
      email,
      phone,
      interests: interests || [],
      skills: skills || '',
      availability: availability || 'flexible',
      message: message || '',
    });

    return successResponse(
      { volunteerId: volunteer._id },
      'Thank you for your interest! We will be in touch soon.',
      201
    );
  } catch (error) {
    console.error('Error creating volunteer:', error);
    return errorResponse('Failed to submit volunteer application', 500);
  }
}
