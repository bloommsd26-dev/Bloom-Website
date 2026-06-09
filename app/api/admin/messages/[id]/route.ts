import { Contact } from '@/models/Contact';
import { successResponse, notFoundError, validationError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';
import { messageUpdateSchema } from '@/lib/validations';

async function updateMessage(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const result = messageUpdateSchema.safeParse(body);

  if (!result.success) {
    return validationError(result.error.issues[0].message);
  }

  const { status } = result.data;

  const message = await Contact.findByIdAndUpdate(
    id,
    { status },
    { new: true, runValidators: true }
  );

  if (!message) {
    return notFoundError('Message not found');
  }

  return successResponse(message, 'Message updated successfully');
}

async function deleteMessage(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const message = await Contact.findByIdAndDelete(id);

  if (!message) {
    return notFoundError('Message not found');
  }

  return successResponse(null, 'Message deleted successfully');
}

export const PATCH = apiHandler(withRole('super_admin', 'admin')(updateMessage));
export const DELETE = apiHandler(withRole('super_admin', 'admin')(deleteMessage));
