import { validationError, errorResponse, successResponse } from '@/utils/api-response';
import { validateEmail } from '@/utils/helpers';

export async function POST(request: Request) {
  try {
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

    // In production, you would send an email here or store in database
    console.log('Contact form submission:', { name, email, subject, message });

    return successResponse(
      { messageId: Math.random().toString(36).substr(2, 9) },
      'Thank you for your message. We will get back to you soon!',
      201
    );
  } catch (error) {
    console.error('Error processing contact form:', error);
    return errorResponse('Failed to process contact form', 500);
  }
}
