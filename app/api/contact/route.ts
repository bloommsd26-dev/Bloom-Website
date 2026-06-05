import { connectDB } from '@/db/connect';
import { Contact } from '@/models/Contact';
import { validationError, errorResponse, successResponse } from '@/utils/api-response';
import { validateEmail } from '@/utils/helpers';

export async function POST(request: Request) {
  try {
    await connectDB();

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
  } catch (error) {
    console.error('Error processing contact form:', error);
    return errorResponse('Failed to process contact form', 500);
  }
}
