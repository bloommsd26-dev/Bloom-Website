import { Contact } from '@/models/Contact';
import { successResponse, notFoundError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';
import { apiHandler } from '@/lib/api/handler';

async function updateMessage(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await request.json();
  const { status } = body;

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
