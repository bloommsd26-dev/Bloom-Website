import { Contact } from '@/models/Contact';
import { validationError, successResponse } from '@/utils/api-response';
import { validateEmail } from '@/utils/helpers';
import { apiHandler } from '@/lib/api/handler';

async function postContact(request: Request) {
  const body = await request.json();
  const { name, email, subject, message } = body;

  // Validation
  if (!name || !email || !subject || !message) {
    return validationError('All fields are required');
  }

  if (!validateEmail(email)) {
    return validationError('Please provide a valid email address');
  }

  if (message.length < 10) {
    return validationError('Message must be at least 10 characters');
  }

  const contact = await Contact.create({
    name,
    email,
    subject,
    message,
  });

  return successResponse(
    { messageId: contact._id },
    'Thank you for your message. We will get back to you soon!',
    201
  );
}

export const POST = apiHandler(postContact);
