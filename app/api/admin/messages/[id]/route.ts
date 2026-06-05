import { connectDB } from '@/db/connect';
import { Contact } from '@/models/Contact';
import { successResponse, errorResponse, notFoundError } from '@/utils/api-response';
import { withRole } from '@/lib/middleware/auth';

async function updateMessage(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
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
  } catch (error) {
    console.error('Error updating message:', error);
    return errorResponse('Failed to update message', 500);
  }
}

async function deleteMessage(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();
    const { id } = await params;
    const message = await Contact.findByIdAndDelete(id);

    if (!message) {
      return notFoundError('Message not found');
    }

    return successResponse(null, 'Message deleted successfully');
  } catch (error) {
    console.error('Error deleting message:', error);
    return errorResponse('Failed to delete message', 500);
  }
}

export const PATCH = withRole('super_admin', 'admin', 'editor')(updateMessage);
export const DELETE = withRole('super_admin', 'admin', 'editor')(deleteMessage);
