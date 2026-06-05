import { Volunteer } from '@/models/Volunteer';
import { successResponse, validationError } from '@/utils/api-response';
import { parsePaginationParams, validateEmail, validatePhone } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';

async function getVolunteers(request: Request) {
  const { searchParams } = new URL(request.url);
  const { page, limit, skip } = parsePaginationParams(searchParams);

  const volunteers = await Volunteer.find().skip(skip).limit(limit).sort({ createdAt: -1 });

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
}

async function postVolunteer(request: Request) {
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

  if (!Array.isArray(interests) || interests.length === 0) {
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
    interests,
    skills:
      typeof skills === 'string'
        ? skills
            .split(',')
            .map((skill) => skill.trim())
            .filter(Boolean)
        : [],
    availability: availability || 'flexible',
    message: message || '',
  });

  return successResponse(
    { volunteerId: volunteer._id },
    'Thank you for your interest! We will be in touch soon.',
    201
  );
}

export const GET = apiHandler(withRole('super_admin', 'admin', 'editor')(getVolunteers));
export const POST = apiHandler(postVolunteer);
