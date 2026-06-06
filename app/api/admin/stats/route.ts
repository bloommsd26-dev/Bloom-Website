import { apiHandler } from '@/lib/api/handler';
import { withAuth } from '@/lib/middleware/auth';
import { successResponse } from '@/utils/api-response';
import { Blog } from '@/models/Blog';
import { Contact } from '@/models/Contact';
import { Volunteer } from '@/models/Volunteer';
import { Program } from '@/models/Program';

async function getAdminStats() {
  const [totalBlogs, draftBlogs, totalMessages, newMessages, totalVolunteers, totalPrograms] =
    await Promise.all([
      Blog.countDocuments({}),
      Blog.countDocuments({ status: 'draft' }),
      Contact.countDocuments({}),
      Contact.countDocuments({ status: 'new' }),
      Volunteer.countDocuments({}),
      Program.countDocuments({}),
    ]);

  return successResponse({
    blogs: {
      total: totalBlogs,
      published: totalBlogs - draftBlogs,
      drafts: draftBlogs,
    },
    messages: {
      total: totalMessages,
      unread: newMessages,
    },
    volunteers: {
      total: totalVolunteers,
    },
    programs: {
      total: totalPrograms,
    },
  });
}

export const GET = apiHandler(withAuth(getAdminStats));
