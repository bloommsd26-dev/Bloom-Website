import { Volunteer } from '@/models/Volunteer';
import { successResponse, validationError } from '@/utils/api-response';
import { parsePaginationParams } from '@/utils/helpers';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { volunteerSchema } from '@/lib/validations';

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

  // Normalize skills if it's a string
  if (typeof body.skills === 'string') {
    body.skills = body.skills
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean);
  }

  const result = volunteerSchema.safeParse(body);

  if (!result.success) {
    return validationError(result.error.issues[0].message);
  }

  const { name, email, phone, interests, skills, availability, message } = result.data;

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
    skills,
    availability,
    message,
  });

  return successResponse(
    { volunteerId: volunteer._id },
    'Thank you for your interest! We will be in touch soon.',
    201
  );
}

export const GET = apiHandler(withRole('super_admin', 'admin', 'editor')(getVolunteers));
export const POST = apiHandler(postVolunteer);
