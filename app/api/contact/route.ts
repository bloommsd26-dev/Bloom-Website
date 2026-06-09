import { Contact } from '@/models/Contact';
import { validationError, successResponse } from '@/utils/api-response';
import { apiHandler } from '@/lib/api/handler';
import { contactSchema } from '@/lib/validations';

async function postContact(request: Request) {
  const body = await request.json();
  const result = contactSchema.safeParse(body);

  if (!result.success) {
    return validationError(result.error.issues[0].message);
  }

  const { name, email, subject, message } = result.data;

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
